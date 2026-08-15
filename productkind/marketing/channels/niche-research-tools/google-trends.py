#!/usr/bin/env python3
"""Google Trends: interest over time + related/rising queries. No account needed.
Usage: google-trends.py [--geo GB] [--property youtube] [--time "today 12-m"] "kw1" "kw2" ...
`--property youtube` = YouTube Search. Empty = Google web search."""
import sys, json, time, subprocess, urllib.parse, argparse

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
JAR = "/tmp/.gtrends_cookies"

def boot():
    subprocess.run(["curl","-s","-c",JAR,"-m","20","-A",UA,
        "https://trends.google.com/trends/explore","-o","/dev/null"], capture_output=True)

def get(url):
    for attempt in range(5):
        r = subprocess.run(["curl","-s","-b",JAR,"-c",JAR,"-m","25","-A",UA,
            "-H","Referer: https://trends.google.com/trends/explore", url],
            capture_output=True, text=True).stdout
        if r.startswith(")]}'"):
            return json.loads(r[5:])
        time.sleep(3 + attempt*4)
    return None

def explore(kws, geo, prop, tf):
    req = {"comparisonItem":[{"keyword":k,"geo":geo,"time":tf} for k in kws],
           "category":0,"property":prop}
    u = ("https://trends.google.com/trends/api/explore?hl=en-GB&tz=0&req="
         + urllib.parse.quote(json.dumps(req)))
    return get(u)

def widget_data(w, kind):
    base = {"TIMESERIES":"multiline","RELATED_QUERIES":"relatedsearches",
            "GEO_MAP":"comparedgeo"}[kind]
    u = (f"https://trends.google.com/trends/api/widgetdata/{base}?hl=en-GB&tz=0"
         f"&req={urllib.parse.quote(json.dumps(w['request']))}&token={urllib.parse.quote(w['token'])}")
    return get(u)

p = argparse.ArgumentParser()
p.add_argument("--geo", default="GB"); p.add_argument("--property", default="")
p.add_argument("--time", default="today 12-m"); p.add_argument("kw", nargs="+")
a = p.parse_args()

boot()
ex = explore(a.kw, a.geo, a.property, a.time)
if not ex:
    print("FAILED: rate limited. Wait a minute and retry."); sys.exit(1)

src = "YouTube Search" if a.property == "youtube" else "Google Search"
print(f"### {src} | geo={a.geo or 'worldwide'} | {a.time}")
print(f"### keywords: {', '.join(a.kw)}\n")

for w in ex["widgets"]:
    if w["id"] == "TIMESERIES":
        d = widget_data(w, "TIMESERIES")
        if not d: print("  timeseries: rate limited"); continue
        rows = d["default"]["timelineData"]
        vals = list(zip(*[r["value"] for r in rows]))
        print("INTEREST OVER TIME (0-100, relative)")
        for i, k in enumerate(a.kw):
            v = [x for x in vals[i]]
            n = len(v); third = max(1, n//3)
            print(f"  {k!r}: peak={max(v)} mean={sum(v)/n:.1f} "
                  f"first-third avg={sum(v[:third])/third:.1f} "
                  f"last-third avg={sum(v[-third:])/third:.1f}")
        print()
    elif w["id"].startswith("RELATED_QUERIES"):
        d = widget_data(w, "RELATED_QUERIES")
        if not d: print("  related: rate limited"); continue
        for rank in d["default"]["rankedList"]:
            items = rank["rankedKeyword"]
            label = "RISING" if any(i.get("value",0) > 100 for i in items) else "TOP"
            print(f"{label} RELATED QUERIES")
            for i in items[:15]:
                print(f"  {i['value']:>6}  {i['query']}")
            print()
