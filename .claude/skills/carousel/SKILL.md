---
name: carousel
description: Create a social media carousel (LinkedIn, Instagram, TikTok) end to end, either Little Parrot or productkind branded, using the shared design system in productkind/carousel-design/. Drafts the per-slide copy spec, waits for approval, implements the design, runs the copy/banned-word check, and exports PNGs + PDF. Triggers include "create a carousel", "carousel for this article/course/post", "design slides for Instagram/LinkedIn/TikTok", or any carousel task.
---

# Carousel workflow

Take a topic, article, or campaign post and produce a finished, exportable
carousel in the shared design system at `productkind/carousel-design/`
(read its README before starting; it is the authority on the design
system, folder layout, and conventions).

The workflow is spec-first with a hard human gate in the middle: every
word on every slide is approved in a markdown spec BEFORE any design work,
and the design may never contain text that is not in the spec (`check.py`
enforces this).

## What a carousel is (copy principles)

These come first because they are the easiest thing to get wrong.

**A carousel is a teaser for the article, not a summary of it.** Its job is
to give the reader one genuinely useful idea per slide and make them want
the full story, then send them to the newsletter or course for it. Hold
things back on purpose: name a lesson and show enough that the swipe is
worth it, but leave the detail, the how, and the nuance in the article. If
someone could comfortably skip the article after reading the carousel, the
carousel gave too much away. Aim for "I want to read the rest", not "now I
don't need to".

**Very little text per slide.** Think flashcard, not paragraph. Target one
short sentence or a fragment of display copy per slide (the cover headline
≤ ~12 words). Around 20-25 words is a ceiling, not a target; most slides
should sit well under it. If a slide needs a paragraph to make sense, the
idea is too big: cut it, or split it across two slides. A slide that reads
as a block of body copy has failed, even if every word is good.

**Write the copy fresh, in Kinga's voice.** The on-slide words are original
teaser copy, not sentences lifted from the article. Do not paste article
phrasing onto slides; rewrite each idea as its own short, spoken line.
Write every slide (and every caption) with the **personal-tone-of-voice**
skill so it sounds like Kinga talking to a friend, not like the article's
prose. Use productkind-tone / little-parrot-ai-skill-gap for brand context.

**What "verbatim" means.** The full-fidelity rule binds the HTML to the
spec, not the spec to the source article. `check.py` only checks that the
design adds no text the spec doesn't have. The spec copy itself is written
fresh under the three principles above.

## Inputs to establish first

1. **Brand**: `little-parrot` or `productkind`. If not stated, infer from
   the source material (Little Parrot course/campaign → little-parrot;
   Thoughts by productkind article → productkind) and confirm in one line.
2. **Source material**: the article, course, campaign post md, or topic.
3. **Platforms**: default is all three (LinkedIn gets the PDF as a
   document post; Instagram and TikTok get the PNGs). Only matters for the
   caption(s) and the TikTok centre-square crop check.
4. **Slide count**: typically 7-9. Cover + one idea per slide + CTA. Pick
   the few strongest ideas from the source and tease those; do not try to
   fit every section of the article onto a slide.

## Step 1 — Draft the spec (Claude)

Write the spec md with:

- **Header**: pillar/goal, research trace or source reference.
- **Format block**: slide count, dimensions (1080x1350), the spec key for
  prompt snippets (any text the reader literally types renders verbatim in
  monospace inside the prompt-window mockup), and the full-fidelity rule
  ("every word that appears on a slide is in this table, verbatim;
  `check.py` enforces it"). "Verbatim" binds the HTML to the spec, not the
  spec to the article (see the copy principles above).
- **The slide table**: `| Slide | Visual | Display copy (verbatim) |
  Prompt window / mockup content (verbatim) |`. ALL on-slide text:
  headlines, kickers, labels, footnotes, card text, badges. Parody content
  (deliberately bad example messages) is marked "(parody; banned-list
  exempt)".
- **Alt text** for the post.
- **Caption(s)** for the target platforms (Instagram caption with
  hashtags; LinkedIn caption if requested).

Where the spec lives:
- Course post: the post md in
  `productkind/marketing/content/courses/<course>/post-N-*.md` (existing
  format examples there; follow them).
- Article or other piece: `spec.md` inside the piece folder under
  `productkind/marketing/content/<type>/<piece-slug>/`.

Voice: write the on-slide copy and captions with the
**personal-tone-of-voice** skill so they sound like Kinga (spoken, warm,
understated), not like the article. Use productkind-tone /
little-parrot-ai-skill-gap for brand context. Do a deliberate
phrase-by-phrase banned-list pass on the draft before showing it. British
English, no em dashes.

Design-quality bar (from
`productkind/marketing/channels/instagram/carousel-research.md`, plus the
copy principles above):
- **Teaser, not summary**: one useful idea per slide, detail held back for
  the article.
- **Very little text**: one short sentence or fragment per slide; ~20-25
  words is a ceiling, not a target; cover ≤ ~12 words.
- **Fresh copy in Kinga's voice**: no sentences lifted from the article.
- A concrete payoff by slide 2-3, and a CTA with a share-ask that drives to
  the full article.

Before showing the spec, reread each slide's copy and cut it down: if it
reads as a paragraph, trim to the one line that earns the swipe.

## Step 2 — Approval gate (Kinga)

STOP and show the spec. Do not start the design until the messaging is
approved. All copy edits happen in the md, never directly in the HTML;
this stays true after approval too.

## Step 3 — Implement (Claude)

1. Create the piece folder next to its spec: for a course post, turn
   `post-N-<slug>.md` into `post-N-<slug>/spec.md` in the same course
   folder; for other pieces, `productkind/marketing/content/<type>/<piece-slug>/`.
   Add `uploads/` for any post-specific images. The piece folder must be
   fully self-contained so it can be moved anywhere.
2. Build `carousel.html` by copying
   `productkind/carousel-design/templates/<brand>.html`, then make it
   self-contained: inline the brand css (replace the `<link>` to
   `brands/<brand>.css` with a `<style>` block holding its contents),
   keep/adapt only the slide layouts you need, and fill them using ONLY
   text from the spec. (The finished carousels in
   `productkind/marketing/content/` follow this pattern.)
3. Recurring devices: prompt window for typed text (markdown symbols are
   typed text, never decoration), Slack mockup for message results, frames
   for photos/charts/quotes, `.hl` for one key phrase per slide.
4. Mark parody elements `data-parody="true"`.
5. Mascots: copy the needed brand assets from
   `productkind/carousel-design/assets/<brand>/` into the piece's
   `uploads/`; end the carousel with the brand CTA slide (mascot/logo,
   URL badge, offer line, share-ask).

## Step 4 — Check and export (Claude)

From `productkind/carousel-design/` (both scripts take any path):

```
./check.py <path-to-piece-folder> <path-to-spec-md>  # must pass (coverage + banned words)
./export.sh <path-to-piece-folder>                   # PNGs + PDF into <piece>/export/
```

Never export before `check.py` passes. If coverage fails because copy
changed during design, that's a spec change: go back to step 2.

## Step 5 — Visual QA

Read the exported PNGs and check layout: nothing clipped or overflowing,
spacing consistent, text sizes balanced, one `.hl` per key phrase, and
(for TikTok) essentials inside the 1080x1080 centre square (`?crop=1`
shows the guides). Fix layout in the HTML and re-export; copy fixes go
back to the md and re-approval. Then hand the exports to Kinga for final
review.
