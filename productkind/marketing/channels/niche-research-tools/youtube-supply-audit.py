import sys, json, re, urllib.parse, subprocess

def search(q):
    url = "https://www.youtube.com/results?search_query=" + urllib.parse.quote(q)
    html = subprocess.run(["curl","-s","-m","25","-H","Accept-Language: en-GB,en;q=0.9",
        "-H","User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        url], capture_output=True, text=True).stdout
    m = re.search(r"var ytInitialData = (\{.*?\});</script>", html)
    if not m:
        m = re.search(r'ytInitialData"\]\s*=\s*(\{.*?\});', html)
    if not m:
        return None
    return json.loads(m.group(1))

def walk(o, key):
    if isinstance(o, dict):
        for k,v in o.items():
            if k==key: yield v
            yield from walk(v,key)
    elif isinstance(o,list):
        for v in o: yield from walk(v,key)

def txt(n):
    if not n: return ""
    if "simpleText" in n: return n["simpleText"]
    return "".join(r.get("text","") for r in n.get("runs",[]))

for q in sys.argv[1:]:
    d = search(q)
    print("="*100)
    print("QUERY:", q)
    if not d:
        print("  <no data>"); continue
    n=0
    for vr in walk(d, "videoRenderer"):
        title = txt(vr.get("title"))
        ch = txt(vr.get("ownerText")) or txt(vr.get("longBylineText"))
        views = txt(vr.get("viewCountText"))
        pub = txt(vr.get("publishedTimeText"))
        length = txt(vr.get("lengthText"))
        print(f"{n+1:2d}. {title[:95]}")
        print(f"     ch={ch[:35]:35s} views={views[:18]:18s} pub={pub[:16]:16s} len={length}")
        n+=1
        if n>=12: break
