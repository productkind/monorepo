# Content gap inventory — productkind, August 2026

**Method:** Analytics → Trends → search bar → each term entered individually → "Top searches for this topic" →
**Show all** → **Content gaps** filter. Collected 19 Aug 2026. Companion to `studio-signal-b-2026-08.md`.

**Result: 64 gap cards across the ten terms, which reduce to 44 distinct queries.** Every value below is the label
Studio printed. Two things Studio does **not** provide, so they are absent here rather than guessed:

- **No gap kind.** The label is a flat `· Content gap`. Studio never distinguishes no-results / weak-results /
  outdated-results in this build.
- **No region.** There is no country filter, so this is one unfiltered pass — not a UK set and a US set.

Studio *does* separate `· Content gap` from `· Content gap for Shorts`, so the format column below is real.

> **Verbatim capture, kept unedited.** Collected in the browser against the live Studio UI and the raw record behind section 6 of `positioning-2026-08.md`. `check-banned.py` will report em dashes here; ignore them. A bare `—` in a table cell means Studio displayed nothing, which is a reading rather than punctuation, and normalising it would edit the record.

---

---

## Gaps per term

| Term | Gap cards | Shorts | Long-form |
|---|---|---|---|
| ai automation | 24 | 3 | 21 |
| ai for product managers | 20 | 4 | 16 |
| automate my work with ai | 9 | 4 | 5 |
| lovable | 8 | 1 | 7 |
| vibe coding | 1 | 0 | 1 |
| lovable credits | 1 | 0 | 1 |
| n8n for beginners | 1 | 0 | 1 |
| how to publish lovable app | 0 | — | — |
| lovable github | 0 | — | — |
| vibe coding for product managers | 0 | — | — |
| **Total** | **64** | **12** | **52** |

Three terms return **zero** gaps. Studio signals this by removing the All / Content gaps filter row entirely rather
than showing an empty state — so it is a real zero, not a loading failure. All three still have healthy related-search
lists (`vibe coding for product managers` lists 40 related searches with no gap among them). Read that as
*already well served*, not as no demand.

---

## The 44 distinct gaps, grouped by how usable they look

### Group A — on-topic and directly actionable (11)

These match what this channel actually covers: AI/product workflow for non-technical people.

| Gap query | Volume | Format | Surfaced under | Comment |
|---|---|---|---|---|
| lovable unlimited credits | High | Long-form | lovable credits | Best single opportunity in the pull: High volume, on-topic, gap-flagged, and the only clean gap out of the whole Lovable cluster. |
| ai in everyday life | High | Long-form | ai automation, automate my work with ai | High volume, appears under two terms. Broad, but squarely in the channel's register. |
| how to create product mockups with ai | Medium | **Shorts** | ai for product managers | The only PM-specific gap in the entire pull, and it is flagged for Shorts — which matches this channel's existing format. |
| ai coding assistant | Medium | Long-form | ai automation, automate my work with ai, ai for product managers | Appears under three separate terms — the most cross-cutting gap here. |
| ai work flow | Medium | Long-form | ai automation, automate my work with ai | |
| n8n crm automation | Medium | Long-form | n8n for beginners | The single gap against the strongest demand signal in the pull (`n8n tutorial for beginners` is High volume). |
| integrate generative ai into your data workflow | Medium | Long-form | automate my work with ai, ai for product managers | |
| automate business processes for a recruiting app | High | **Shorts** | automate my work with ai | See the caution below on this cluster. |
| automate data capture at scale with document ai | High | **Shorts** | automate my work with ai | See caution below. |
| develop ai-powered prototypes in google ai studio | High | **Shorts** | ai automation, automate my work with ai | See caution below. |
| explore generative ai in agent platform | High | **Shorts** | ai for product managers | See caution below. |

> **Caution on the last four.** These read like Google Cloud Skills Boost / course-catalogue lesson titles, not
> phrases a person types into YouTube — and all four are flagged High volume *and* Shorts, which is an odd pairing for
> enterprise topics. I cannot verify their origin from inside Studio; flagging the pattern so they are not treated as
> equivalent to the organic queries above.

### Group B — generic AI, real but off this channel's positioning (21)

Gap-flagged and mostly High volume, but these are broad-AI-channel territory. They arrive because Studio widens
`ai automation` and `ai for product managers` toward the general AI topic rather than finding niche-specific gaps.

| Gap query | Volume | Format |
|---|---|---|
| ai agency full course | High | Long-form |
| ai course creator | High | Long-form |
| ai trading bot | High | Long-form |
| learn ai agents no framework | High | Long-form |
| agentic ai playlist | High | Long-form |
| ai finance | High | Long-form |
| ai agent 2026 | High | Long-form |
| complete agentic ai course | High | Long-form |
| ai tools for academic writing | High | Long-form |
| best ai seo tools | High | **Shorts** |
| ai agents in 38 minutes | High | **Shorts** |
| future of artificial intelligence | Medium | Long-form |
| ai project tutorial | Medium | Long-form |
| agentic ai courses | Medium | Long-form |
| ai full stack project | Medium | Long-form |
| ai tools review | Medium | Long-form |
| secure ai app | Medium | Long-form |
| best ai writing detectors | Medium | Long-form |
| guide to agentic ai | Medium | Long-form |
| complete agentic ai | Medium | Long-form |
| ai tracker | Medium | Long-form |

### Group C — junk, malformed, or mis-parsed (12)

Gap-flagged by Studio but not usable. Recorded so the 64 total reconciles.

**The `lovable` cluster — all 8 gaps are unusable.** Studio parsed "lovable" as the English adjective, so it returned
love-song queries. The video results on the same page correctly showed Lovable-the-tool, so Studio's search-term data
and its video data disagree about what the word means. Do not act on any of these:

`love a life` (High) · `love h love` (High) · `lovea` (High) · `love memory` (High) · `calm love` (High) ·
`love sony` (Medium) · `lovo love` (Medium) · `ballet lover` (Medium, Shorts)

**Others:**

| Gap query | Volume | Surfaced under | Why unusable |
|---|---|---|---|
| vibe trailer | High | vibe coding | Film-trailer query. The *only* gap Studio offers for `vibe coding` is off-topic. |
| aaai | High | ai automation | Academic conference acronym, or a typo. |
| ai form | High | ai automation | Ambiguous — could be "AI form builder" or a truncation. |
| in ai | Medium | ai automation | Fragment, not a query. |

---

## What the gap data actually says

- **Where the gaps are is the inverse of where the fit is.** The two broadest terms — `ai automation` and
  `ai for product managers` — produce 44 of the 64 cards, and nearly all of those are Group B generic-AI queries.
  The three terms that fit this channel most precisely (`how to publish lovable app`, `lovable github`,
  `vibe coding for product managers`) produce **zero** gaps because that content already exists.
- **The PM angle is underserved but under-measured.** `ai for product managers` throws 20 gaps, yet its own
  PM-specific related searches are **Low volume** (`using ai as a product manager`, `best ai course for product
  managers`), and `vibe coding for product managers` is Low volume throughout with no gaps at all. Per the interest
  threshold caveat — interest is built only from videos watched 1,000+ times a week over 28 days — Low here is
  consistent with a real but small niche. It is not evidence of no demand.
- **Only one gap is both PM-specific and Shorts-flagged:** `how to create product mockups with ai`. Given this
  channel's existing output is Shorts, that is the closest thing to a direct format-and-topic match in the data.
- **`lovable unlimited credits` and `n8n crm automation` are the two cleanest on-topic gaps** — narrow, correctly
  parsed, and attached to terms with genuine demand.
- **12 of 64 cards are Shorts-flagged**, and 8 of those 12 sit in Group A or the Google-Cloud-flavoured subset.
  Shorts gaps are scarce relative to long-form ones across the board.
