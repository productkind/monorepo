#!/usr/bin/env python3
"""Check drafts against the language-rules closed list.

Scans the given files for the three mechanical rule sets:

  1. Every exact-match phrase in section 2 of language-rules/SKILL.md.
     The list is parsed from that file at run time, so adding a phrase
     there is the only step needed for it to be checked here.
  2. Em dashes.
  3. Common American spellings, with markup suppression so CSS such as
     `color:` and `background-color` in HTML emails does not false-positive.

It does NOT cover the judgement rules in section 3, AI dressing, or
register. Those stay with the critics.

Usage:  check-banned.py <file> [file ...]
Exit:   0 clean, 1 hits found, 2 usage error.

Matching is case-insensitive, tolerant of curly apostrophes, and treats a
line break inside a phrase as a space, so hard-wrapped text cannot hide a
banned phrase.
"""
import re
import sys
import pathlib

RULES = pathlib.Path(__file__).resolve().parent.parent / "SKILL.md"

# American spelling -> flagged with the British fix shown.
AMERICANISMS = [
    (r"organiz\w+", "organise / organisation"),
    (r"behavior\w*", "behaviour"),
    (r"color\w*", "colour"),
    (r"favorite\w*", "favourite"),
    (r"center\w*", "centre"),
    (r"prioritiz\w+", "prioritise"),
    (r"recogniz\w+", "recognise"),
    (r"realiz\w+", "realise"),
    (r"analyz\w+", "analyse"),
    (r"apologiz\w+", "apologise"),
    (r"customiz\w+", "customise"),
    (r"optimiz\w+", "optimise"),
    (r"summariz\w+", "summarise"),
    (r"emphasiz\w+", "emphasise"),
    (r"minimiz\w+", "minimise"),
    (r"maximiz\w+", "maximise"),
    (r"capitaliz\w+", "capitalise"),
    (r"personaliz\w+", "personalise"),
    (r"visualiz\w+", "visualise"),
    (r"travel(?:ed|ing)\b", "travelled / travelling"),
    (r"cancel(?:ed|ing)\b", "cancelled / cancelling"),
    (r"label(?:ed|ing)\b", "labelled / labelling"),
    (r"practic(?:ed|ing)\b", "practised / practising"),
    (r"defense\w*", "defence"),
    (r"offense\w*", "offence"),
    (r"fulfill\w*", "fulfil"),
    (r"gray\w*", "grey"),
    (r"dialog(?:s|ed|ing)?\b", "dialogue"),  # no "ue": "dialogue(s)" is the British form and must not match
    (r"catalog(?:s|ed|ing)?\b", "catalogue"),
]

# A match immediately touching one of these characters is markup, not prose
# (CSS properties, HTML attributes/tags, snake_case identifiers, URLs).
# AFTER holds only characters that are markup-specific in that position
# (`color:`, `class=`, `color-scheme`, `snake_case`). Prose punctuation
# (`)`, `;`, closing quotes) must NOT be here: "my favorite color)" and
# "Her behavior;" are prose, and markup such as ="color" or 'Inter' is
# already suppressed by its LEADING delimiter via SUPPRESS_BEFORE.
SUPPRESS_BEFORE = set('-<"\'=/_.#&')
SUPPRESS_AFTER = set(':=-_')


def norm(s: str) -> str:
    return s.replace("’", "'").replace("‘", "'")


# CSS never carries reader-facing copy, so it is masked out of the scan
# wholesale: property VALUES ("text-align: center;") have no leading markup
# delimiter and would otherwise read as prose. Other attribute values
# (alt="...", title="...") DO carry copy and stay scanned.
CSS_REGIONS = [
    re.compile(r"<style\b[^>]*>.*?</style>", re.IGNORECASE | re.DOTALL),
    re.compile(r"""style\s*=\s*("[^"]*"|'[^']*')""", re.IGNORECASE),
]


def mask_css(flat: str) -> str:
    """Blank CSS regions with spaces of equal length, so offsets into the
    original text stay aligned."""
    for rx in CSS_REGIONS:
        flat = rx.sub(lambda m: " " * (m.end() - m.start()), flat)
    return flat


def load_phrases() -> list:
    """Parse the closed list out of SKILL.md section 2."""
    phrases = []
    in_section2 = False
    after_h3 = False
    for line in norm(RULES.read_text(encoding="utf-8")).split("\n"):
        if line.startswith("## "):
            in_section2 = line.startswith("## 2.")
            after_h3 = False
            continue
        if not in_section2:
            continue
        if line.startswith("### "):
            after_h3 = True
            continue
        if after_h3 and line.strip():
            phrases += [p.strip() for p in line.split(",") if p.strip()]
    return phrases


def phrase_pattern(phrase: str):
    # Flexible whitespace inside the phrase, hard word boundaries around it.
    inner = re.escape(phrase).replace(r"\ ", r"\s+")
    return re.compile(rf"(?<!\w){inner}(?!\w)", re.IGNORECASE)


def line_of(text: str, offset: int) -> int:
    return text.count("\n", 0, offset) + 1


def excerpt(flat: str, start: int, end: int) -> str:
    return flat[max(0, start - 25):end + 25].strip()


def check_file(path: pathlib.Path, phrase_pats: list) -> list:
    original = path.read_text(encoding="utf-8")
    # Flatten newlines to spaces; offsets stay aligned with the original,
    # and phrases wrapped across lines still match. Then mask CSS so its
    # property values are never scanned as prose.
    flat = mask_css(norm(original).replace("\n", " "))
    hits = []

    for m in re.finditer("—", flat):  # em dash
        hits.append((line_of(original, m.start()), "em dash",
                     excerpt(flat, m.start(), m.end()), "comma, colon, parentheses, or spaced en dash"))

    for phrase, pat in phrase_pats:
        for m in pat.finditer(flat):
            hits.append((line_of(original, m.start()), "banned phrase",
                         excerpt(flat, m.start(), m.end()), f'remove or replace "{phrase}"'))

    for raw, fix in AMERICANISMS:
        for m in re.finditer(rf"\b{raw}", flat, re.IGNORECASE):
            before = flat[m.start() - 1] if m.start() > 0 else " "
            after = flat[m.end()] if m.end() < len(flat) else " "
            if before in SUPPRESS_BEFORE or after in SUPPRESS_AFTER:
                continue  # markup, not prose
            hits.append((line_of(original, m.start()), "American spelling",
                         excerpt(flat, m.start(), m.end()), fix))

    return sorted(hits)


def main(argv: list) -> int:
    if not argv:
        print(__doc__.strip(), file=sys.stderr)
        return 2
    phrase_pats = [(p, phrase_pattern(p)) for p in load_phrases()]
    if not phrase_pats:
        print(f"error: no phrases parsed from {RULES}", file=sys.stderr)
        return 2

    total = 0
    for name in argv:
        path = pathlib.Path(name)
        if not path.is_file():
            print(f"error: not a file: {name}", file=sys.stderr)
            return 2
        for line, category, text, fix in check_file(path, phrase_pats):
            total += 1
            print(f"{name}:{line}  [{category}]  ...{text}...")
            print(f"{' ' * len(f'{name}:{line}')}  fix: {fix}")

    if total:
        print(f"\n{total} hit(s). One is enough to block shipping.")
        return 1
    print("clean: no banned phrases, em dashes or American spellings")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
