---
status: draft
channels: [linkedin, instagram, tiktok, threads]
account: kinga
---

# Carousel: Building is cheaper, but distribution is still expensive

**Source article:** `thoughts/assets/articles/022-building-is-cheaper-but-distribution-is-still-expensive.md`
**Brand:** productkind (Thoughts by productkind article)
**Channels:** LinkedIn (PDF document post), Instagram, TikTok (PNGs), Threads (PNGs, productkind profile)
**Date:** July 2026 (article scheduled 2026-07-21)

**Story arc:** the claim everyone's heard, building is cheap now, with the
honest counter that distribution still isn't (slide 1), building is only a
quarter of the job (2), what the rest of the job is (3), where we honestly
are with Little Parrot and how we're testing without paid ads (4), the
Instagram lesson, with a wink at the medium (5), the LinkedIn surprise from
EU-INC (6), a beat that turns the question on the reader (7), the turn: AI's
real superpower is faster learning (8), the invitation, teasing the two
experiments the slides hold back (9). A fellow-learner build-in-public
piece; the throughline is the article's own argument, no added moral.

## Format

**Carousel, 9 slides, 1080 x 1350 (4:5 portrait).** productkind editorial
style: warm palette, generous whitespace, Kim mascot on the cover and CTA.
A big-number treatment for the 25%, a numbered list card for the other 75%,
a warm gradient statement card for the payoff.

**Export note:** the same 1080 x 1350 export works on all channels. TikTok
photo mode pads the sides; keep all essential text inside the 1080 x 1080
centre square.

**Spec key:** any text the reader literally types renders verbatim in
monospace inside the prompt-window mockup (no prompt snippets in this
carousel).

**Full-fidelity rule:** every word that appears on a slide is in this
table, verbatim. The implemented carousel may not add copy; `check.py` in
`productkind/carousel-design/` enforces it.

| Slide | Visual | Display copy (verbatim) | Prompt window / mockup content (verbatim) |
| --- | --- | --- | --- |
| 1 (cover) | Brand cover with Kim mascot; calm, editorial | Kicker: "NOTES FROM BUILDING LITTLE PARROT". Headline: "Building is cheaper now, but distribution is still expensive." Runner: "SWIPE →" | – |
| 2 | Big-number treatment: oversized "25%" doing the visual work | Headline: "Building the product is about", then big number: "25%", under it "of the job." | – |
| 3 | Numbered list card, four rows | Lead: "The other 75%:". Card rows: "01 A problem worth solving", "02 Distribution", "03 Driving behaviour change", "04 Revenue". | – |
| 4 | Copy + black statement card, honest | "With Little Parrot, we've validated the problem and our solution for it. Distribution is the bit we haven't cracked yet." Black card: "So, no paid ads yet. First we're finding which organic channels work for us." | – |
| 5 | Instagram carousel mockup in a frame + copy | "Instagram taught us carousels barely reach people who don't follow you." Aside: "Yes, I see the irony." | – |
| 6 | Copy + statement card, the surprise | "A 10-person team rallied Europe's best-known startup founders behind one petition. Their channel? LinkedIn." Body: "Ours too. And I still find posting hard." | – |
| 7 | Large question card, turned on the reader | "So, where does your audience actually hang out?" Aside: "We're still figuring ours out." | – |
| 8 | Warm gradient statement card, the payoff | "The real superpower of AI is speeding up learning. Build less, learn faster, find your people." | – |
| 9 (CTA) | Brand card: Thoughts logo, URL badge, offer line, share-ask | "What each experiment taught us is in the article." Badge: "PRODUCTKIND.SUBSTACK.COM" · "Full article on Substack 💜" · "Know someone building a product that hasn't got traction yet? Send them this." | – |

**Alt text (for the post):** A carousel about why building software got
cheaper but distribution is still the expensive part: building is about
25% of the job, the other 75% is a problem worth solving, distribution,
behaviour change and revenue. With Little Parrot the problem is validated
but distribution isn't figured out yet, so we're testing organic channels
without paid ads: Instagram taught us carousels barely reach non-followers,
LinkedIn helped a 10-person team rally Europe's best-known startup founders
behind one petition and is our strongest channel too. The payoff: AI's real
superpower is speeding up learning, so build less, learn faster, and find
your people. The full article on productkind.substack.com covers the
conference and community experiments too.

## Posting notes

- Captions are written after the carousel is final, with the captions
  skill (`captions.md` in this folder).
- Slide 2-3 source: the article's "25% of the job" list. Slide 4:
  "we've validated... the bit we haven't figured out yet" + "intentionally
  avoided paid marketing". Slide 5: "Instagram" experiment section. Slide 6:
  "LinkedIn" section (EU-INC). Slide 7: the article's "finding your people"
  thread, turned into a reader beat. Slide 8: "Accelerate learning, not
  delivery speed" closing.
