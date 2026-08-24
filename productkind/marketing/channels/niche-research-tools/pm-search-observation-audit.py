import json
import pathlib
import urllib.parse
import urllib.request

HERE = pathlib.Path(__file__).resolve().parent
SEEDS = HERE / "pm-technical-fluency-seeds.txt"
REPORT = (
    HERE.parents[2]
    / "ai-research"
    / "pm-technical-fluency"
    / "pm-technical-fluency-observed-search-phrases-2026-08.md"
)


def suggestions(query, *, dataset=None, country="gb"):
    params = {
        "client": "firefox",
        "hl": "en-GB",
        "gl": country,
        "q": query,
    }
    if dataset:
        params["ds"] = dataset
    url = "https://suggestqueries.google.com/complete/search?" + urllib.parse.urlencode(params)
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(request, timeout=15) as response:
        return json.loads(response.read().decode("latin-1"))[1]


seed_lines = [line.strip() for line in SEEDS.read_text().splitlines() if line.strip()]
google = set()
youtube_gb = set()
youtube_us = set()

for seed in seed_lines:
    google.update(item.casefold() for item in suggestions(seed, country="gb"))
    youtube_gb.update(item.casefold() for item in suggestions(seed, dataset="yt", country="gb"))
    youtube_us.update(item.casefold() for item in suggestions(seed, dataset="yt", country="us"))

youtube = youtube_gb | youtube_us
missing = []
checked_google = 0
checked_youtube = 0

for line in REPORT.read_text().splitlines():
    if not line.startswith("| ") or "---" in line:
        continue
    fields = [field.strip() for field in line.strip("|").split("|")]
    if len(fields) != 7 or fields[1] == "Exact search phrase":
        continue
    phrase, source = fields[1].casefold(), fields[2]
    if "Google autocomplete" in source:
        checked_google += 1
        if phrase not in google:
            missing.append((fields[1], "Google autocomplete"))
    if "YouTube autocomplete" in source:
        checked_youtube += 1
        if phrase not in youtube:
            missing.append((fields[1], "YouTube autocomplete"))

print(f"Google autocomplete phrases checked: {checked_google}")
print(f"YouTube autocomplete phrases checked: {checked_youtube}")
print(f"Missing observations: {len(missing)}")
for phrase, source in missing:
    print(f"- {source}: {phrase}")
