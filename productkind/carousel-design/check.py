#!/usr/bin/env python3
"""Verify a carousel implementation against its campaign spec md.

Usage: ./check.py <carousel-folder> <spec-md-file>

Two checks, so that once the md's messaging is approved, the slides can't
drift from it:

1. COVERAGE - every piece of visible on-slide text in carousel.html must
   appear verbatim in the spec md (whitespace-normalised). Standing page
   furniture (handle, page numbers, avatars, timestamps) is allowlisted.
2. BANNED   - no banned words/phrases in on-slide text. Elements marked
   data-parody="true" (deliberate parody content, noted as exempt in the
   spec) are skipped. The closed banned list, em dashes and American
   spellings are checked by delegating the non-parody text to
   .claude/skills/language-rules/scripts/check-banned.py, which parses the
   list from language-rules/SKILL.md at run time, so this script never
   holds its own copy. A few judgement-rule heuristics tuned for short
   slide copy are additionally grepped here; the full judgement pass stays
   with the tone-of-voice-critic on the md itself.

Exit code 0 = both checks pass.
"""
import re
import subprocess
import sys
import tempfile
import unicodedata
from html.parser import HTMLParser
from pathlib import Path

CHECK_BANNED = Path(__file__).resolve().parents[2] / ".claude/skills/language-rules/scripts/check-banned.py"

# --- what counts as a checkable text unit -----------------------------------
UNIT_TAGS = {"h1", "h2", "h3", "p", "pre", "li"}
UNIT_CLASSES = {"promptlabel", "msgbody", "copy"}

# Standing furniture that never needs to be in the spec md.
ALLOW_EXACT = {
    # brand handles (header row + CTA badge)
    "LittleParrot.app", "LITTLEPARROT.APP",
    "PRODUCTKIND.SUBSTACK.COM", "productkind.substack.com",
    "YOUR PROMPT", "SWIPE →", "↑", "vs", "you", "dev team",
    "AI", "K", "D", "S",
}
ALLOW_PATTERNS = [
    re.compile(r"^\d{2} / \d{2}$"),          # page numbers 01 / 07
    re.compile(r"^\d{1,2}:\d{2}$"),          # timestamps 9:41
    re.compile(r"^[^\w\s]{1,3}\s?\d*$"),     # emoji chips / reactions (👍 2)
]

# Judgement-rule heuristics (language-rules section 3) grepped conservatively
# because slide copy is short; the closed list itself is NOT duplicated here,
# it is checked by delegating to check-banned.py (see banned_scan below).
HEURISTICS = [
    (re.compile(r"\bmatter(s|ed)?\b", re.I), '"matters" as importance claim'),
    (re.compile(r"\bland(s|ed)?\b(?! page)", re.I), 'figurative "lands"'),
    (re.compile(r"\blanding\b(?! page)", re.I), 'figurative "landing"'),
    # "actually" is explicitly NOT banned (language-rules Not faults: an
    # honest hedge); whether a use is filler is for the critic pass on the
    # md, so it is not grepped here.
    (re.compile(r"\bgenuinely\b", re.I), '"genuinely"'),
    (re.compile(r"\bquietly\b", re.I), '"quietly"'),
    (re.compile(r"that's the whole", re.I), "manufactured payoff"),
]


def norm(s: str) -> str:
    s = unicodedata.normalize("NFC", s)
    s = s.replace("’", "'").replace("‘", "'")
    s = s.replace("“", '"').replace("”", '"')
    s = s.replace("`", " ")  # backticks are md formatting, not slide content
    s = re.sub(r"<br\s*/?>", " ", s, flags=re.I)  # literal <br> in spec tables
    s = s.replace('"', "").replace("'", "")  # quote styles vary; compare without
    return re.sub(r"\s+", " ", s).strip()


def norm_scan(s: str) -> str:
    """Like norm() but keeps quotes/apostrophes: the banned scan must see
    "here's the thing" with its apostrophe intact, or it can never match."""
    s = unicodedata.normalize("NFC", s)
    s = s.replace("’", "'").replace("‘", "'")
    s = s.replace("“", '"').replace("”", '"')
    return re.sub(r"\s+", " ", s).strip()


def banned_scan(units):
    """Delegate the closed list, em dashes and American spellings to
    check-banned.py (single source: parsed from language-rules at run time).
    units: list of (scan_text, unit_index). Returns failure strings."""
    if not CHECK_BANNED.is_file():
        sys.exit(f"error: cannot find {CHECK_BANNED}; the banned-word check "
                 "delegates to it, so the carousel cannot be checked without it.")
    with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False, encoding="utf-8") as tf:
        tf.write("\n".join(t for t, _ in units) + "\n")
        tmp = tf.name
    res = subprocess.run([sys.executable, str(CHECK_BANNED), tmp],
                         capture_output=True, text=True)
    Path(tmp).unlink(missing_ok=True)
    if res.returncode == 0:
        return []
    if res.returncode != 1:
        sys.exit(f"error: check-banned.py failed unexpectedly:\n{res.stderr or res.stdout}")
    failures = []
    for line in res.stdout.splitlines():
        m = re.match(rf"^{re.escape(tmp)}:(\d+)\s+\[([^\]]+)\]\s+(.*)$", line)
        if m:
            idx = int(m.group(1)) - 1
            src = units[idx][0] if 0 <= idx < len(units) else "?"
            failures.append(f"BANNED ({m.group(2)}): {m.group(3)}  [in unit: {src[:90]!r}]")
        elif line.strip().startswith("fix:"):
            failures.append(f"    {line.strip()}")
    return failures


class Node:
    def __init__(self, tag, attrs, parent):
        self.tag = tag
        self.attrs = dict(attrs)
        self.parent = parent
        self.children = []   # Nodes and strings
        if parent is not None:
            parent.children.append(self)

    def classes(self):
        return set((self.attrs.get("class") or "").split())

    def has_ancestor_attr(self, name):
        n = self
        while n is not None:
            if n.attrs.get(name):
                return True
            n = n.parent
        return False

    def text(self):
        out = []
        for c in self.children:
            out.append(c if isinstance(c, str) else c.text())
        return "".join(out)


class TreeBuilder(HTMLParser):
    VOID = {"img", "br", "meta", "link", "hr", "input"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("root", [], None)
        self.stack = [self.root]
        self.skip_depth = 0

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style"):
            self.skip_depth += 1
            return
        if self.skip_depth:
            return
        if tag == "br":
            self.stack[-1].children.append(" ")
            return
        node = Node(tag, attrs, self.stack[-1])
        if tag not in self.VOID:
            self.stack.append(node)

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self.skip_depth = max(0, self.skip_depth - 1)
            return
        if self.skip_depth:
            return
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        if not self.skip_depth and data.strip():
            self.stack[-1].children.append(data)


def collect_units(node, units):
    is_unit = node.tag in UNIT_TAGS or (node.classes() & UNIT_CLASSES)
    if not is_unit:
        # leaf elements holding only text are units too (labels, card titles)
        kids_are_text = node.children and all(isinstance(c, str) for c in node.children)
        is_unit = kids_are_text and node.tag in ("div", "span", "b", "strong")
    if is_unit:
        t = norm(node.text())
        if t:
            units.append((t, norm_scan(node.text()), node))
        return  # don't descend into a unit; its text is captured whole
    for c in node.children:
        if not isinstance(c, str):
            collect_units(c, units)


def allowed(t):
    return t in ALLOW_EXACT or any(p.match(t) for p in ALLOW_PATTERNS)


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    folder, spec = sys.argv[1].rstrip("/"), sys.argv[2]
    html = open(f"{folder}/carousel.html", encoding="utf-8").read()
    spec_text = norm(open(spec, encoding="utf-8").read())

    tb = TreeBuilder()
    tb.feed(html)
    units = []
    collect_units(tb.root, units)

    failures = []
    scannable = []
    for t, ts, node in units:
        if allowed(t):
            continue
        if t not in spec_text:
            failures.append(f"NOT IN SPEC: {t[:110]!r}")
        if not node.has_ancestor_attr("data-parody"):
            scannable.append((ts, node))
            for rx, label in HEURISTICS:
                m = rx.search(ts)
                if m:
                    failures.append(f"HEURISTIC ({label}): ...{ts[max(0,m.start()-30):m.end()+30]!r}...")

    failures += banned_scan(scannable)

    print(f"checked {len(units)} text units against {spec}")
    if failures:
        print("\n".join(failures))
        sys.exit(1)
    print("coverage OK, banned-list OK")


if __name__ == "__main__":
    main()
