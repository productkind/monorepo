---
name: carousel
description: Create a social media carousel (LinkedIn, Instagram, TikTok, Threads, YouTube Shorts) end to end, either Little Parrot or productkind branded, using the shared design system in productkind/carousel-design/. Drafts the per-slide copy spec, waits for approval, implements the design, runs the copy/banned-word check, and exports PNGs + PDF. Channel captions are NOT part of this skill; once the carousel is final, the captions skill writes them. Triggers include "create a carousel", "carousel for this article/course/post", "design slides for Instagram/LinkedIn/TikTok/Threads/YouTube Shorts", or any carousel task.
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

**A carousel is a teaser for the article or course, not a summary of it.** Its job is 
to give the reader one genuinely useful idea per slide and make them want
the full story, then send them to the newsletter or course for it. Hold
things back on purpose: name a lesson and show enough that the swipe is
worth it, but leave the detail, the how, and the nuance in the article. If
someone could comfortably skip the article after reading the carousel, the
carousel gave too much away. Aim for "I want to read the rest", not "now I
don't need to".

**Restructure for the reader; don't mirror the article's shape.** A good
carousel is a summary written for the audience, not the author's own notes
compressed onto slides. The article's section order, its opening, its way of
building up to a point are for a reader who has committed to the whole
piece; a swiping reader needs a different order. So decide what the reader
should walk away able to do or understand, then build the slides around
that, leading with the payoff idea rather than the article's warm-up.
Walking down the article paragraph by paragraph is the tell-tale sign of a
carousel built the author's way instead of the reader's.

**Tell one connected story, not a list of moments.** The slides are a
sequence the reader swipes through, so they should read like a small
narrative, not a set of interchangeable cards. Give it an arc: a setup that
opens a question or tension, a turn, a payoff, then the invitation. Each
slide should follow from the one before and set up the next, using natural
connective tissue in Kinga's voice ("So,", "But,", "Like this:", "A year
in,"). For a personal retrospective the arc is usually: honest situation →
what went wrong → the turn → what worked → invitation.

**Ground the story in the source; never invent the thread.** The narrative,
and any pattern, moral, or realisation a slide states, must be one the
author actually makes. Do not manufacture a tidy thesis to make the slides
cohere, e.g. summing up a set of separate lessons as "the safe things
failed, the brave things worked" when the article never says that. That is
fabrication, even when it sounds good. Many strong pieces are honest
retrospectives with no single thesis; then the throughline is the candid
telling itself, the sequence and the honesty, not an added moral. Coherence
comes from ordering the real moments well and from voice, not from inventing
a lesson. If a true thread would be modest and a false one would be neat,
use the modest true one. If you can't find the connecting idea in the
source, don't add one.

Test before finalising: read only the display copy, slide 1 to N, as one
passage. It should hold together as a story, and every claim in it should
be traceable to the source. If any two slides could swap places without the
reader noticing, the arc is too flat, tighten it, but only with material
that is actually there.

**Move one step at a time, in a repeating rhythm.** Each slide should change
one thing from the slide before it: introduce the next idea, or give the
example for the idea just named, but not both at once and not three new
things. A slide that jumps two or three steps ahead loses the reader; a
sequence where every slide moves by a single, predictable step is the one
people finish. Give the idea slides a repeating shape too (for example,
every idea slide names the point, then the next slide shows it), because a
recognisable rhythm makes the whole sequence easier to follow and to
remember. This is the same instinct as one job per slide, applied to the
gaps between slides.

**Very little text per slide.** Think flashcard, not paragraph. Target one
short sentence or a fragment of display copy per slide (the cover headline
≤ ~12 words). Around 20-25 words is a ceiling, not a target; most slides
should sit well under it. If a slide needs a paragraph to make sense, the
idea is too big: cut it, or split it across two slides. A slide that reads
as a block of body copy has failed, even if every word is good.

**Show every idea, don't just state it.** An abstract point on its own
teaches far less than the same point with a concrete example beside it: the
specific message someone typed, the before and after, the real moment it
happened. When a slide makes a general claim, the next slide (or the same
one) should show it in the concrete. This is where the carousel earns its
"genuinely useful", and it is also what makes it practical: the reader can
picture doing the thing, not just agree with the idea.

**Give the reader one thing to do or decide.** A carousel that only tells
is weaker than one that also asks. Somewhere before the CTA, put a beat that
asks the reader to take part rather than only watch: a question they answer
in their head, a "which of these is you?", a tiny step they could take
today. It makes the idea stick and it makes the piece feel practical rather
than a highlight reel. Keep it light and in Kinga's voice, never a quiz for
its own sake.

**Write the copy fresh, in Kinga's voice.** The on-slide words are original
teaser copy, not sentences lifted from the article. Do not paste article
phrasing onto slides; rewrite each idea as its own short, spoken line.
Write every slide with the **personal-tone-of-voice** skill so it sounds
like Kinga talking to a friend, not like the article's prose. Use
productkind-tone / little-parrot-ai-skill-gap for brand context.

**Keep the pronoun the source uses.** If the article says "we" about
something (a productkind or two-person activity, e.g. the Instagram
account), keep it "we"; if it says "I", keep "I". Don't switch between them
for flow or to sound more personal. The same moment should carry the same
pronoun it has in the article.

**What "verbatim" means.** The full-fidelity rule binds the HTML to the
spec, not the spec to the source article. `check.py` only checks that the
design adds no text the spec doesn't have. The spec copy itself is written
fresh under the copy principles above.

## Captions live in the captions skill

This skill produces the carousel itself: the approved spec, the designed
slides, and the exports. It does not write channel captions. Once the
carousel is final (after Step 5), run the **captions** skill on the piece:
it writes one `captions.md` for all target platforms into the piece
folder, with the per-platform rules, founder comments, and posting
checklist.

## Inputs to establish first

1. **Brand**: `little-parrot` or `productkind`. If not stated, infer from
   the source material (Little Parrot course/campaign → little-parrot;
   Thoughts by productkind article → productkind) and confirm in one line.
2. **Source material**: the article, course, campaign post md, or topic.
3. **Platforms**: default is LinkedIn (the PDF as a document post),
   Instagram and TikTok (the PNGs), Threads (the PNGs, from the productkind
   profile), and YouTube Shorts (the slides as a video slideshow) when
   asked. Within this skill it only matters for the TikTok centre-square
   crop check; pass the platform list on to the **captions** skill
   afterwards. Expectations: Instagram is the carousel's home turf and the
   platform to judge performance by; LinkedIn rewards tight decks people
   finish; TikTok and Threads are low-cost cross-posts, so never optimise
   for them (see `productkind/ai-research/carousel-research.md`).
4. **Slide count**: typically 7-9. Cover + one idea per slide + CTA. Pick
   the few strongest ideas from the source and tease those; do not try to
   fit every section of the article onto a slide.
5. **The one takeaway**: settle this before drafting, because it drives
   what you select and how you order it. In a sentence, what should the
   reader be able to do or understand after the carousel that they
   couldn't before? Everything on the slides serves that one takeaway;
   anything that doesn't, however interesting, gets cut. If two ideas
   compete to be the takeaway, that is usually two carousels.

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

No captions in the spec: channel captions are written after the carousel
is final, with the **captions** skill.

Where the spec lives:
- Course post: the post md in
  `productkind/marketing/content/courses/<course>/post-N-*.md` (existing
  format examples there; follow them).
- Article or other piece: `spec.md` inside the piece folder under
  `productkind/marketing/content/<type>/<piece-slug>/`.

Voice: write the on-slide copy with the
**personal-tone-of-voice** skill so it sounds like Kinga (spoken, warm,
understated), not like the article. Use productkind-tone /
little-parrot-ai-skill-gap for brand context. Do a deliberate
phrase-by-phrase banned-list pass on the draft before showing it. British
English, no em dashes.

Design-quality bar (from
`productkind/ai-research/carousel-research.md` and
`productkind/ai-research/carousel-content-design-research.md`, plus the
copy principles above):
- **Built around the one takeaway**: every slide serves it; the order is
  the reader's, not the article's, leading with the payoff idea.
- **One connected story**: the display copy reads as a single narrative arc
  from slide 1 to the CTA, not a list of moments.
- **Teaser, not summary**: one useful idea per slide, detail held back for
  the article.
- **Shown, not just stated**: each abstract point has a concrete example
  beside it (a real message, a before/after, the actual moment).
- **One change per slide, in a repeating rhythm**: each slide moves a
  single step from the last; idea slides share a recognisable shape.
- **A do-this-or-decide beat** before the CTA: a question, a "which is
  you?", or a small step the reader could take today.
- **Very little text**: one short sentence or fragment per slide; ~20-25
  words is a ceiling, not a target; cover ≤ ~12 words.
- **Fresh copy in Kinga's voice**: no sentences lifted from the article.
- **Visuals that explain, never decorate**: every image carries part of
  the idea (a diagram, the prompt window, a before/after); a picture that
  is only pretty adds nothing and can distract.
- A concrete payoff by slide 2-3, and a CTA with a share-ask that drives to
  the full article.

Before showing the spec, run this quick gate and fix anything that fails:
- Reread each slide's copy and cut it down: if it reads as a paragraph,
  trim to the one line that earns the swipe.
- Name the one takeaway in a sentence, then check every slide serves it;
  cut any slide that doesn't, however good it is.
- Check that each abstract point has a concrete example near it. A run of
  claim-slides with no example is the most common way a carousel stays
  vague instead of useful.
- Check there is a do-this-or-decide beat before the CTA.
- Read the display copy slide 1 to N: does it move one step at a time, and
  is the last idea clearly ahead of the first? If two slides could swap
  without the reader noticing, tighten the order.

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

## Step 6 — Captions (captions skill)

Once Kinga signs off the exports, run the **captions** skill on the piece
folder to write `captions.md` for all target platforms. The captions
follow the carousel's teaser principle: expand the tease in the reader's
search language, hold the detail back for the article.
