#!/usr/bin/env python3
"""Check that a video definition's section texts are the approved script, word for word.

The narration is generated from the definition's section texts, so any drift from script.md ships
copy the critics never saw. Usage:

    python3 check-text.py <definition.ts> <script.md>

Compares spoken text only: whitespace is collapsed, and curly and straight quotes count as the
same character (they read the same aloud; the difference is reported as a warning). ElevenLabs
tags such as [pause] must match exactly. Exits 1 on a mismatch.
"""
import re
import sys


def section_texts(ts: str) -> list[str]:
    """Every `text:` string literal in the definition, in order."""
    out = []
    for m in re.finditer(r"\btext:\s*", ts):
        i = m.end()
        if i >= len(ts) or ts[i] not in "'\"`":
            continue
        quote, j, buf = ts[i], i + 1, []
        while j < len(ts) and ts[j] != quote:
            if ts[j] == "\\" and j + 1 < len(ts):
                j += 1
            buf.append(ts[j])
            j += 1
        out.append("".join(buf))
    return out


def script_narration(md: str) -> str:
    """The narration of script.md: its `## Script` section if it has one, else the body."""
    md = re.sub(r"^---\n.*?\n---\n", "", md, flags=re.S)
    m = re.search(r"^## Script\s*\n(.*?)(?=^## |\Z)", md, flags=re.S | re.M)
    body = m.group(1) if m else md
    lines = [l for l in body.splitlines() if not l.startswith("#") and not l.startswith("<")]
    return "\n".join(lines)


QUOTES = str.maketrans({"’": "'", "‘": "'", "“": '"', "”": '"'})


def spoken(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__)
        return 64
    ts = open(sys.argv[1], encoding="utf-8").read()
    md = open(sys.argv[2], encoding="utf-8").read()
    texts = section_texts(ts)
    if not texts:
        print("No section texts found. Sections built in a shared module (hook variants) have to be checked there.")
        return 1
    got, want = spoken(" ".join(texts)), spoken(script_narration(md))
    if got == want:
        print(f"OK: {len(texts)} sections match the script exactly.")
        return 0
    if got.translate(QUOTES) == want.translate(QUOTES):
        print(f"OK with a warning: {len(texts)} sections match, but quote styles differ (curly vs straight).")
        return 0
    a, b = got.translate(QUOTES), want.translate(QUOTES)
    i = next((k for k in range(min(len(a), len(b))) if a[k] != b[k]), min(len(a), len(b)))
    print("MISMATCH between the definition and the script, first difference:")
    print(f"  definition: ...{a[max(0, i - 40):i + 40]}...")
    print(f"  script.md:  ...{b[max(0, i - 40):i + 40]}...")
    return 1


if __name__ == "__main__":
    sys.exit(main())
