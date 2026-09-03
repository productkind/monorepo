---
status: drafted
channels: [linkedin, tiktok, instagram, youtube-shorts]
account: little-parrot
---

# Four questions before you commit

**Runs:** about 86 seconds. **Search phrase:** "what is technical debt".
**Learning path step:** 6, technical debt, feasibility and build versus buy.

**Treatment:** narration over a screen recording of one feature request being
taken apart, then the four questions on screen.

| Beat | Narration | Visual | On-screen text |
|---|---|---|---|
| Hook (0-6s) | "Someone calls a feature simple. You agree a date. Three weeks later engineering finds a data migration nobody costed." | Screen recording: a one-line feature request in a ticket | **"It's just a small change"** |
| The situation (6-22s) | "We read two years of product manager discussions, and this came up again and again: product managers finding the hard part of a feature after they'd already promised it. The estimate was usually fine. Nobody had asked the questions that would have found the migration." | The ticket, then a roadmap with a slipped date | Found the hard part too late |
| The four questions (22-47s) | "There are four, and you can ask all of them without knowing how any of it is built. What does this rely on that we don't control? What happens when this fails halfway through? Does this change who's allowed to see something, or data that already exists? And can we undo it? If you can undo it, you can say yes with less information. If you can't, you need to be sure before you commit." | Each question appearing as a card, the ticket behind them | What does it rely on? · What if it fails? · Does it change permissions or existing data? · Can we undo it? |
| Why the third one earns its place (47-64s) | "The third question finds the work nobody costed. A new field on a form sounds like screen work, until somebody asks what happens to the two hundred thousand records that don't have it. That's a data migration, changing data that already exists, and it's usually why the deadline can't be met." | Screen recording: a form field, then a table of existing rows with an empty column | One new field, 200,000 existing rows |
| Technical debt (64-78s) | "If the answer is 'we can do it faster the rough way', that's technical debt: a shortcut in the code that makes every later change slower. Sometimes it's the right call. It's only a bad one when nobody wrote it down." | A note being added to the ticket | Technical debt: a shortcut that slows every later change |
| CTA (78-86s) | "Step six of our learning path is a technical decision review on your own product. Link's in the comments for when it opens." | Waitlist page, step 6 in frame | littleparrot.app/guides/technical-product-manager |

## Short cut for TikTok, Reels and Shorts (about 50 seconds)

Keep the hook and the four questions, which is the save-worthy part, and hold
all four on screen together at the end. Drop "The situation" and "Technical
debt", and keep the 200,000 records example, because it's the one concrete
thing that makes the third question make sense.

## Production notes

- **Screen recording needed:** a ticket and a table with an empty column. Both
  can be made in a Little Parrot test project.
- **The four questions are the asset.** They should be readable in one frame,
  which is also what makes this the natural companion carousel for Instagram.
- **Don't claim the questions come from anywhere they don't.** They're drawn
  from the scope and trade-off evidence in the
  [needs research](../../../../../ai-research/pm-technical-fluency/non-technical-pm-technical-needs-2024-2026.md#2-pressure-test-feasibility-scope-dependencies-and-trade-offs-before-commitment),
  and the video says "there are four" rather than attributing them to a source.
