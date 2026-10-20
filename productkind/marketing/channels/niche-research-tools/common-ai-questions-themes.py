#!/usr/bin/env python3
"""Sort autocomplete suggestions into question themes and count them per source.

Usage:
    python3 common-ai-questions-themes.py RAW_DIR [--show THEME] [--unsorted N]

RAW_DIR holds the autocomplete output files (<google|youtube>-autocomplete-<gl>-*.txt).
A suggestion can land in more than one theme. Counts are of distinct suggestions.
"""
import argparse
import collections
import pathlib
import re

THEMES = {
    "prompting": r"prompt|better answers|best answers|good answers|good responses|best results|effectively|properly|instructions|tips",
    "is it allowed, can people tell": r"is it ok|is it okay|is it bad to use|is it ethical|is it unethical|cheating|can (employers?|interviewers?|teachers?|universit\w*|recruiters?) (tell|see|detect|check)|check if you use ai|detect",
    "sound human / detect ai": r"sound (more )?human|like a human|human responses|detect ai|ai detector|undetectable|humani[sz]e|em dash",
    "which tool": r"\bvs\b|better than|which ai|best ai|what ai should|or claude|or gemini|or copilot|or chatgpt|which is better",
    "free vs paid": r"\bfree\b|worth it|\bplus\b|\bpro\b|\bgo\b|cost|price|discount|subscription|have a limit|\blimits?\b",
    "privacy and safety": r"\bsafe|privacy|private|my data|your data|confidential|employer|company see|sensitive|upload|store|sell|history",
    "accuracy": r"accurate|wrong|make (things|stuff) up|making things up|hallucinat|\blie|trust|reliable|always agree",
    "memory": r"remember|memory|forget",
    "environment": r"water(?!mark)|environment|energy|electricity|data cent",
    "jobs at risk": r"replace|take (my|over|your) .*job|take my job|jobs ai|bubble|learn to code|worth learning to code",
    "job search": r"resume|\bcv\b|cover letter|interview|job search|linkedin",
    "learning and studying": r"\blearn|study|exam|student|homework|teacher|language|spanish|english|french",
    "coding and building": r"\bcode|coding|\bapp\b|website|program|developer|vibe|roblox|game",
    "images, video, design": r"image|photo|picture|video|draw|\bart\b|design|interior|flyer|logo|gif|powerpoint|ppt|edit",
    "making money": r"money|income|passive|business|side hustle|trad(e|ing)|stocks",
    "agents and new features": r"agent|codex|work mode|chatgpt work|chat or work|astra|\bdots?\b|cowork|skills|deep research|voice|notebook|claude code",
    "how it works": r"how does .*work|what is (an? )?(llm|ai|prompt|token|agent|chatgpt)|get its information|in simple terms|meaning",
    "risks to society": r"dangerous|take over the world|take over humanity|kill us|evil|conscious|demonic|is ai bad",
    "tool not working": r"\bdown\b|not working|slow|crash|freez|lag|not responding",
}
NOISE = r"air ?fryer|airpods?|airtag|airdrop|airplay|airport|airline|air force|air traffic|aids|aioli|aipac|airbnb|lettuce|mpesa|aizen|air dry clay"

LINE = re.compile(r"^(?P<q>.{40})\s*\[(?P<n>\d+|ERR)\]\s?(?P<s>.*)$")


def load(raw_dir):
    seen = collections.defaultdict(set)
    for f in sorted(pathlib.Path(raw_dir).glob("*-autocomplete-*.txt")):
        engine, _, gl = f.name.split("-")[:3]
        for line in f.read_text().splitlines():
            m = LINE.match(line)
            if not m or not m["s"]:
                continue
            for s in m["s"].split(" | "):
                s = s.strip().lower()
                if s and not re.search(NOISE, s):
                    seen[s].add(f"{engine}-{gl}")
    return seen


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("raw_dir")
    ap.add_argument("--show")
    ap.add_argument("--unsorted", type=int, default=0)
    args = ap.parse_args()

    seen = load(args.raw_dir)
    sources = sorted({src for v in seen.values() for src in v})
    counts = {t: collections.Counter() for t in THEMES}
    unsorted = []
    for s, srcs in seen.items():
        hits = [t for t, rx in THEMES.items() if re.search(rx, s)]
        if not hits:
            unsorted.append(s)
        for t in hits:
            counts[t]["all"] += 1
            for src in srcs:
                counts[t][src] += 1

    print(f"{len(seen)} distinct suggestions after noise filter\n")
    print(f"{'theme':26}{'all':>6}" + "".join(f"{s:>12}" for s in sources))
    for t in sorted(THEMES, key=lambda t: -counts[t]["all"]):
        print(f"{t:26}{counts[t]['all']:>6}" + "".join(f"{counts[t][s]:>12}" for s in sources))
    print(f"{'(unsorted)':26}{len(unsorted):>6}")

    if args.show:
        rx = THEMES[args.show]
        print(f"\n--- {args.show}")
        for s in sorted(x for x in seen if re.search(rx, x)):
            print(f"  {s}  [{', '.join(sorted(seen[s]))}]")
    if args.unsorted:
        print("\n--- unsorted sample")
        for s in sorted(unsorted)[: args.unsorted]:
            print("  " + s)


if __name__ == "__main__":
    main()
