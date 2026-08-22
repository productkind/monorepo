#!/usr/bin/env python3
"""Atlassian Marketplace supply audit.

Finds slots where demand is measured and supply is weak: an app with a large
installed base and a poor rating, and no credible third-party alternative in
the same slot.

The Marketplace REST API is public and needs no key. Install counts are the
demand proxy that matters here, because the purchase happens inside the
Marketplace rather than through search.

Usage:
    python3 marketplace-supply-audit.py pull          # cache the catalogue
    python3 marketplace-supply-audit.py screen        # high installs, low stars
    python3 marketplace-supply-audit.py vacancies     # stale Connect-era apps
    python3 marketplace-supply-audit.py slot <token>  # who owns one slot

Caveat that cost us a false result once: the API text search ranks on general
relevance, so it will return unrelated apps as matches. Every slot query below
filters to apps whose name or tagline actually contains the token. Without that
filter the tool reports empty slots that are not empty.
"""
import json
import sys
import time
import urllib.parse
import urllib.request
import datetime
import os

BASE = "https://marketplace.atlassian.com"
CACHE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "marketplace-cache.json")
HEADERS = {"Accept": "application/json", "User-Agent": "productkind-research/1.0"}


def get(path):
    req = urllib.request.Request(BASE + path, headers=HEADERS)
    return json.load(urllib.request.urlopen(req, timeout=30))


def flatten(addon):
    e = addon.get("_embedded", {}) or {}
    dist = e.get("distribution", {}) or {}
    rev = e.get("reviews", {}) or {}
    ver = e.get("version", {}) or {}
    return dict(
        name=addon.get("name") or "",
        key=addon.get("key"),
        vendor=(e.get("vendor") or {}).get("name", ""),
        tagline=((addon.get("tagLine") or "") + " " + (addon.get("summary") or "")),
        installs=dist.get("totalInstalls") or 0,
        stars=rev.get("averageStars"),
        reviews=rev.get("count") or 0,
        connect=(ver.get("deployment") or {}).get("connect"),
        released=(ver.get("release") or {}).get("date", ""),
    )


def pull(application="jira", pages=24):
    rows, path, seen = [], f"/rest/2/addons?application={application}&hosting=cloud&withVersion=true&limit=50", 0
    while path and seen < pages:
        d = get(path)
        rows += [flatten(a) for a in d["_embedded"]["addons"]]
        nxt = d["_links"].get("next")
        if isinstance(nxt, list):
            nxt = [n for n in nxt if n.get("type") == "application/json"]
            path = nxt[0]["href"] if nxt else None
        else:
            path = nxt["href"] if nxt else None
        seen += 1
        time.sleep(0.2)
    json.dump(rows, open(CACHE, "w"))
    print(f"cached {len(rows)} apps to {CACHE}")
    return rows


def load():
    if not os.path.exists(CACHE):
        return pull()
    return json.load(open(CACHE))


def pricing(key):
    """Per-user monthly tiers. Free apps have no live pricing resource."""
    try:
        p = get(f"/rest/2/addons/{key}/pricing/cloud/live")
    except Exception:
        return None
    return [(i.get("unitCount"), i.get("amount"), i.get("monthsValid"))
            for i in (p.get("items") or []) if i.get("amount") is not None]


def reviews(key, limit=75):
    out, off = [], 0
    while len(out) < limit:
        try:
            d = get(f"/rest/2/addons/{key}/reviews?limit=25&offset={off}&sort=recent")
        except Exception:
            break
        rv = (d.get("_embedded") or {}).get("reviews") or []
        if not rv:
            break
        out += [(r.get("stars"), " ".join((r.get("review") or "").split()), (r.get("date") or "")[:7]) for r in rv]
        off += 25
        time.sleep(0.15)
    return out


def screen(min_installs=2000, min_reviews=25, max_stars=3.8):
    rows = [x for x in load()
            if x["installs"] >= min_installs and x["reviews"] >= min_reviews and (x["stars"] or 5) < max_stars]
    rows.sort(key=lambda y: -y["installs"])
    print(f"{'installs':>8} {'stars':>5} {'revs':>5} {'connect':>7} {'released':>10}  name | vendor")
    for x in rows:
        print(f"{x['installs']:>8} {x['stars']:>5.2f} {x['reviews']:>5} {str(x['connect']):>7} "
              f"{x['released']:>10}  {x['name'][:42]:42} | {x['vendor'][:24]}")
    print(f"\n{len(rows)} slots with proven demand and documented dissatisfaction")


def vacancies(min_installs=800, stale_days=450, today=None):
    """Connect-era apps the vendor stopped maintaining. Connect revenue share
    reaches 25% on 1 July 2026 and support is ending, so these are dated gaps.
    Check pricing before believing the demand: the large ones are usually free
    vendor-built integrations, which measures demand at a price of zero."""
    today = today or datetime.date.today()
    rows = []
    for x in load():
        try:
            age = (today - datetime.date.fromisoformat(x["released"])).days
        except Exception:
            continue
        if x["connect"] and x["installs"] >= min_installs and age >= stale_days:
            rows.append((x, age))
    rows.sort(key=lambda t: -t[0]["installs"])
    for x, age in rows:
        stars = f"{x['stars']:.2f}" if x["stars"] else " n/a"
        print(f"{x['installs']:>7} {stars:>5} {x['reviews']:>4}rev stale={age:>5}d  "
              f"{x['name'][:40]:40} | {x['vendor'][:24]}")
    print(f"\n{len(rows)} apps, {sum(x['installs'] for x, _ in rows)} installs total")


def slot(token, min_installs=200, min_stars=4.2, min_reviews=5):
    """Who owns one slot. Only counts apps that genuinely mention the token."""
    path = (f"/rest/2/addons?application=jira&hosting=cloud"
            f"&text={urllib.parse.quote(token)}&withVersion=true&limit=50")
    apps = [flatten(a) for a in (get(path).get("_embedded") or {}).get("addons") or []]
    tok = token.lower()
    inslot = [x for x in apps if tok in (x["name"] + " " + x["tagline"]).lower()]
    if not inslot:
        print(f"no apps found in slot '{token}'")
        return
    inslot.sort(key=lambda x: -x["installs"])
    biggest = inslot[0]
    alts = [x for x in inslot[1:]
            if x["installs"] >= min_installs and (x["stars"] or 0) >= min_stars and x["reviews"] >= min_reviews]
    print(f"slot '{token}', {len(inslot)} apps genuinely in it\n")
    stars = f"{biggest['stars']:.2f}" if biggest["stars"] else "n/a"
    print(f"  biggest: {biggest['name']} | {biggest['vendor']}")
    print(f"           {biggest['installs']} installs, {stars} stars, {biggest['reviews']} reviews, "
          f"connect={biggest['connect']}, released {biggest['released']}")
    print(f"\n  credible alternatives (>={min_installs} installs, >={min_stars} stars):")
    if not alts:
        print("    none. nobody has fixed this one.")
    for a in alts:
        print(f"    {a['installs']:>6} {a['stars']:.2f} {a['reviews']:>4}rev  {a['name'][:40]} | {a['vendor'][:20]}")


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "screen"
    if cmd == "pull":
        pull()
    elif cmd == "screen":
        screen()
    elif cmd == "vacancies":
        vacancies()
    elif cmd == "slot":
        slot(" ".join(sys.argv[2:]) or "slack")
    elif cmd == "reviews":
        for s, t, d in reviews(sys.argv[2]):
            if t:
                print(f"[{s} star {d}] {t[:200]}")
    elif cmd == "pricing":
        print(pricing(sys.argv[2]))
    else:
        print(__doc__)
