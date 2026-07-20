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
   spec) are skipped. The banned list here is the greppable subset of the
   personal-tone-of-voice skill; the full list still needs the human pass
   on the md itself.

Exit code 0 = both checks pass.
"""
import re
import sys
import unicodedata
from html.parser import HTMLParser

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

BANNED = [
    (re.compile(r"—"), "em dash"),
    (re.compile(r"\bmatter(s|ed)?\b", re.I), '"matters" as importance claim'),
    (re.compile(r"\bland(s|ed)?\b(?! page)", re.I), 'figurative "lands"'),
    (re.compile(r"\blanding\b(?! page)", re.I), 'figurative "landing"'),
    # "actually" is explicitly NOT banned (personal-tone-of-voice: it is one
    # of Kinga's natural hedges); whether a use is filler is for the human
    # pass on the md, so it is not grepped here.
    (re.compile(r"\bgenuinely\b", re.I), '"genuinely"'),
    (re.compile(r"\bquietly\b", re.I), '"quietly"'),
    (re.compile(r"here's the thing", re.I), "pseudo punchline"),
    (re.compile(r"that's the whole", re.I), "manufactured payoff"),
    (re.compile(r"game.chang", re.I), "hyperbole"),
    (re.compile(r"\bhack\b", re.I), "drama word"),
    (re.compile(r"\bchaos\b", re.I), "drama word"),
    (re.compile(r"\bhype\b", re.I), "drama word"),
    (re.compile(r"\bno fluff\b", re.I), "drama word"),
    (re.compile(r"plain english|plain language", re.I), "announcing clarity"),
    (re.compile(r"\bmakes? a real difference\b", re.I), "empty filler"),
]


def norm(s: str) -> str:
    s = unicodedata.normalize("NFC", s)
    s = s.replace("’", "'").replace("‘", "'")
    s = s.replace("“", '"').replace("”", '"')
    s = s.replace("`", " ")  # backticks are md formatting, not slide content
    s = re.sub(r"<br\s*/?>", " ", s, flags=re.I)  # literal <br> in spec tables
    s = s.replace('"', "").replace("'", "")  # quote styles vary; compare without
    return re.sub(r"\s+", " ", s).strip()


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
            units.append((t, node))
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
    for t, node in units:
        if allowed(t):
            continue
        if t not in spec_text:
            failures.append(f"NOT IN SPEC: {t[:110]!r}")
        if not node.has_ancestor_attr("data-parody"):
            for rx, label in BANNED:
                m = rx.search(t)
                if m:
                    failures.append(f"BANNED ({label}): ...{t[max(0,m.start()-30):m.end()+30]!r}...")

    print(f"checked {len(units)} text units against {spec}")
    if failures:
        print("\n".join(failures))
        sys.exit(1)
    print("coverage OK, banned-list OK")


if __name__ == "__main__":
    main()
