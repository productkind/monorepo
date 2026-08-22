# YouTube Studio signal pull — August 2026

**Channel:** productkind (`UCr_1t7ZSO-foOJ8tZi_D_gg`)
**Collected:** 19 Aug 2026
**Source:** studio.youtube.com — Analytics → Advanced mode (Part 1), Analytics → Trends (Part 2)

> **Note on channel identity.** The brief referred to the "Little Parrot" channel. The channel signed in on this
> tab is **productkind**. Everything below is productkind data.

> **This is a verbatim capture, kept unedited.** It was generated in the browser against the live Studio UI and is the raw record behind section 6 of `positioning-2026-08.md`. `check-banned.py` reports about 57 em dashes and one American spelling here, and they should be ignored: the spelling sits inside a YouTube channel name quoted as data, and a bare `—` inside a table cell means "Studio displayed nothing", which is a reading rather than punctuation. Normalising it would edit the record. Conclusions drawn from this file live in the positioning doc, which is written to house style and passes clean.

---

## What Studio did *not* display

Recorded here first, because several requested fields do not exist in this Studio build. Nothing below has been
inferred, estimated, or filled in from outside Studio.

| Requested field | Status |
|---|---|
| Country / region filter (UK vs US) | **Does not exist.** No region control on the Trends tab, on a topic result page, on the "Show all" view, or in Studio Settings (Settings → General offers only Currency). The whole of Part 2 is therefore a single unfiltered pass, not two. |
| Audience interest level, "very low → very high", for the searched term | **Not displayed for the searched term.** The term's own header card carries no rating at all. Ratings appear only on the *related* searches under "Top searches for this topic", and the scale observed is **Low / Medium / High volume** — labelled "volume", not "interest". No "very low" or "very high" value was observed on any card in this pull. |
| Content-gap *kind* (no results / weak results / outdated results) | **Not displayed.** Gaps carry a flat `· Content gap` label with no kind. |
| Shorts vs long-form | **Partially available.** Studio distinguishes `· Content gap` from `· Content gap for Shorts`. That signal exists **only on gap cards** — non-gap searches and the "What people are watching" videos carry no format flag. |
| Trends cards: Top searches, Breakout videos, Recent videos, Content gaps for Shorts | **Not present.** The Trends tab has **two** cards only (see Part 2A). |

---

## PART 1 — Reach → Traffic source → YouTube search, last 365 days

Path: Analytics → Advanced mode → Date **Last 365 days** (19 Aug 2025 – 18 Aug 2026) → Breakdown **Traffic source** → drill into **YouTube search**.

Channel totals for the period, all traffic sources: 2,835 views. YouTube search accounted for **91 views (3.2%)** and **1,674 impressions**.

**The list is not empty.** Ten search terms are listed:

| # | Search term | Views | % of search views | Impressions | Watch time (h) | Avg view duration |
|---|---|---|---|---|---|---|
| 1 | vibe coding | 3 | 3.3% | 0 | 0,0 | 0:13 |
| 2 | kars theme | 1 | 1.1% | 0 | 0,0 | 0:41 |
| 3 | japan rental boyfriend | 1 | 1.1% | 0 | 0,0 | — |
| 4 | business ideas for women | 1 | 1.1% | 0 | 0,0 | — |
| 5 | new ai tools | 1 | 1.1% | 0 | 0,0 | — |
| 6 | knot the series ep 5 eng sub | 1 | 1.1% | 0 | 0,0 | — |
| 7 | michel jackson bad | 1 | 1.1% | 0 | 0,0 | — |
| 8 | bleach tokinada | 1 | 1.1% | 0 | 0,0 | — |
| 9 | katyusha remix | 1 | 1.1% | 0 | 0,0 | — |
| 10 | randy cock magic | 1 | 1.1% | 0 | 0,0 | — |
| | **Total (YouTube search)** | **91** | | **1 674** | **2,9** | **3:20** |

*(Terms are reproduced exactly as Studio spells them, including "michel jackson bad".)*

Three things worth flagging, all read straight off the table:

- **Impressions are 0 on every individual row** while the YouTube-search total reads 1,674. Studio attributes impressions
  at the traffic-source level here but not down to the term. The 1,674 cannot be allocated to any term shown.
- **The ten listed rows account for 12 of the 91 search views.** The remaining 79 views come from terms Studio does not
  surface. This is the whole visible search-term list — there is no "show more" control and no eleventh row.
- **Only two of the ten terms are on-topic** for this channel — `vibe coding` (the single highest, at 3 views) and
  `new ai tools`. The rest are anime, music and unrelated queries that reached Shorts incidentally.

---

## PART 2A — The Trends tab itself

The Trends tab (Analytics → Trends) presents **two** cards, not four. There are no Breakout videos, Recent videos,
or Content-gaps-for-Shorts cards in this build.

**Card 1 — "What people are looking for"** (3 shown; a "Show all" control exists). No volume or interest label on any
of these; they are bare terms. As expected for a 9-subscriber channel, they are not obviously audience-derived:

- robotics engineering podcast
- self awareness in leadership
- how to add screenshot shortcut in iphone

**Card 2 — "New videos to inspire you"** (3 shown):

| Video | Channel | Views | Age | Duration |
|---|---|---|---|---|
| Cathay: Building AI-ready foundation that makes innovation take flight | AWS 全球中文 | 247.9k | 3 weeks | 3:37 |
| How to Teach Yourself Business & Entrepreneurship | Analyzing Finance with Nick | 53.1k | 1 week | 36:12 |
| 7 Boring Businesses With ZERO Competition (Because Everyone Thinks They're Too Ugly) | SUCCESSFUL ENTREPRENEUR | 44.8k | 2 weeks | 25:32 |

Both cards look generic rather than audience-scoped — a Chinese-language AWS video and two business-hustle videos
have no evident relationship to this channel's content. Consistent with the channel being too small to scope from.

Also on the tab: a **Saved (3)** collection, pre-existing. Nothing was added to it during this pull (verified: still 3).

---

## PART 2B — The ten terms

**Region: single unfiltered pass for every row** — see the "not displayed" table above. There is no UK view and no US view to separate.

**Reading the Interest column:** "term itself: not displayed" is literal — Studio shows no rating for the term you
searched. The values given are the volume labels on its three surfaced related searches, top to bottom.

| Term | Region | Interest | Content gap? | Shorts or long-form | Notes |
|---|---|---|---|---|---|
| vibe coding | Unfiltered (no region control) | Term itself: not displayed. Related: Medium / Medium / Low | **Yes — 1.** `vibe trailer` (High volume · Content gap). Kind not displayed. | Long-form (no "for Shorts" flag) | The one gap Studio offers is **off-topic** — "vibe trailer" is a film-trailer query, not vibe coding. Related searches are strong though: `vibe coding with claude code` and `vibe coding course` both High volume. Top videos: Zinho Automates 14.2k/6d (11:38); Matthew Berman 472.5k/1yr (0:59); Mikey No Code 46.9k/4mo (31:39). **The video list changed between two loads of the same page minutes apart** — Kole Jain (1.3k, 3 hours old) and Tech With Tim appeared on the first load and dropped on the second. Treat "top videos" as volatile. |
| ai automation | Unfiltered | Term itself: not displayed. Related: Medium / Medium / Medium | **Yes — 24**, the largest gap set in this pull. Kind not displayed. | **Mixed: 21 long-form, 3 Shorts.** Shorts gaps: `develop ai-powered prototypes in google ai studio`, `best ai seo tools`, `ai agents in 38 minutes` | Gaps skew to course/agency framings: `ai agency full course` (High), `ai course creator` (High), `ai trading bot` (High), `learn ai agents no framework` (High), `agentic ai playlist` (High). Surprising in the top videos: Liam Ottley holds two of three slots (130.8k/11mo at 32:42; 1.0m/1yr at 1:50:23) — a near-2-hour video is a top result, so length is no barrier here. |
| lovable | Unfiltered | Term itself: not displayed. Related: High / Medium / High | **Yes — 8.** Kind not displayed. | Mixed: 7 long-form, 1 Shorts (`ballet lover`) | **Studio has mis-parsed this term.** It reads "lovable" as the English adjective, so every related search is a love-song query — `what is love`, `lovely song`, `romantic lovely song` — and *all eight* content gaps are junk: `love a life`, `love h love`, `lovea`, `lovo love`, `love memory`, `calm love`, `love sony`, `ballet lover`. None relate to the Lovable AI tool. Yet the videos are correctly about Lovable-the-tool: Mikey No Code 18.6k/1wk; Max Max 9.9k/1wk; Lovable (official) 170.6k/7mo. Search-term data and video data disagree about what the word means — do not act on the gap list for this term. |
| lovable credits | Unfiltered | Term itself: not displayed. Related: Low / Medium / High | **Yes — 1.** `lovable unlimited credits` (High volume · Content gap). Kind not displayed. | Long-form | Same parsing problem, milder. The one on-topic gap is genuinely interesting — `lovable unlimited credits` at High volume with a gap flag. But the related-search list is heavily polluted by film/TV end-credits queries: `beauty and the beast 1991 end credits` (High), `living single end credits` (High), `liv and maddie credits`, `bambi end credits`. Videos are correct and on-topic: Esther 3.1k/4mo; Nuno Tavares 51.4k/9mo; Julian Weber 5.8k/1mo. |
| how to publish lovable app | Unfiltered | Term itself: not displayed. Related: Medium / Medium / Medium | **No — 0.** The All/Content-gaps filter row is absent entirely, which is how Studio renders a topic with no gaps. | n/a — no gap cards, so no format signal | Cleanest match in the pull: every related search is on-topic (`how to publish lovable website`, `how to deploy a website from lovable`, `how to build an app with lovable`, `how to convert lovable app into apk`, `lovable website tutorial` at High). Well served already, hence no gaps. Top videos are all short and all directly on-query: Santrel Clips 10.3k/1yr (0:53); Tutorials With Charles 1.3k/5mo (3:14); Success Minder 2.2k/3mo (6:42). Note how low the view counts are — 1–10k, vs the 100k–1m on the broader AI terms. |
| lovable github | Unfiltered | Term itself: not displayed. Related: Medium / Medium / Low | **No — 0.** Filter row absent. | n/a | Also cleanly parsed and well covered. Related searches include `how to use lovable ai for free` (High) and a long tail of deployment queries (`how to deploy lovable app to netlify`, `how to deploy lovable project on vercel`, `how to get lovable api key`). Videos: NoCode ProCode 10.5k/8mo (11:45); Tutorialytics 1.1k/5mo (2:30); Matt Paige 17.5k/1yr (2:54). Modest view counts again. |
| automate my work with ai | Unfiltered | Term itself: not displayed. Related: Medium / Medium / Medium | **Yes — 9.** Kind not displayed. | **Mixed: 5 long-form, 4 Shorts** — the highest Shorts share of any term here. Shorts gaps: `automate business processes for a recruiting app`, `automate data capture at scale with document ai`, `develop ai-powered prototypes in google ai studio`, `ai agents in 38 minutes` | The Shorts-flagged gaps are oddly enterprise-flavoured (document AI, recruiting-app process automation, Google AI Studio) — not the format you'd expect those topics in. Overlaps heavily with the `ai automation` gap set. Surprising top video: Collaboration Simplified at **645.6k views** for "NEW Copilot Workflows Agent Will Automate Your Job" — a Microsoft-ecosystem video far outperforming the AI-influencer content beside it. Also Roboverse at 14.5k with a **1-day-old** video already ranking. |
| n8n for beginners | Unfiltered | Term itself: not displayed. Related: **High** / Medium / Medium | **Yes — 1.** `n8n crm automation` (Medium volume · Content gap). Kind not displayed. | Long-form | `n8n tutorial for beginners` is the only High-volume first-position related search across all ten terms — the strongest single demand signal in this pull, and almost fully served (just one gap). Studio also surfaces `nx 8 tutorial for beginners` as a related search, i.e. it is partially mis-hearing "n8n". Top videos are large and mature: Charlie Chang 701.2k/1yr (19:15); CodeHead 256.6k/11mo (2:05); Tom Crawshaw 260.0k/10mo (6:49) — note that a 2-minute explainer sits alongside a 19-minute tutorial at comparable scale, so format is not the differentiator here. |
| ai for product managers | Unfiltered | Term itself: not displayed. Related: **Low / Low** / Medium | **Yes — 20**, second-largest set. Kind not displayed. | **Mixed: 16 long-form, 4 Shorts.** Shorts gaps: `how to create product mockups with ai`, `explore generative ai in agent platform`, `best ai seo tools`, `ai agents in 38 minutes` | The interesting contradiction in this pull: the PM-specific related searches are **Low volume** (`using ai as a product manager`, `best ai course for product managers`), yet the term still generates 20 content gaps — and nearly all of those gaps are *generic AI* queries (`complete agentic ai course`, `ai tools for academic writing`, `best ai writing detectors`, `ai coding assistant`), not PM queries. Studio is widening to the general AI topic rather than finding PM-specific gaps. Also notable: two of the three top videos are **3 years old** (Darius Koohmarey 62.1k, 57:26; Anthony Saltarelli 24.6k, 4:53) — the freshest is Exponent at 32.6k/4mo. Ageing top results, but Studio does not label them "outdated". |
| vibe coding for product managers | Unfiltered | Term itself: not displayed. Related: **Low** / Medium / Medium | **No — 0.** Filter row absent, despite 40 related searches being listed. | n/a | Returns plenty — 40 related searches — so this is not an empty term, but zero of them are flagged as gaps. The PM-specific tail is consistently **Low volume**: `ai projects for product managers` (Low), `ai vibe coding full course` (Low), against `ai tools for product managers` (Medium). Top videos are strong and on-point: Y Combinator Startup School 354.2k/1yr (16:40); Grace Leung 29.3k/11mo (17:54); Exponent 7.7k/8mo — the Exponent one is a **1:18:59 mock interview**, an unusual format to rank for this query. |

### Gap counts at a glance

| Term | Gaps | of which Shorts |
|---|---|---|
| ai automation | 24 | 3 |
| ai for product managers | 20 | 4 |
| automate my work with ai | 9 | 4 |
| lovable | 8 | 1 |
| vibe coding | 1 | 0 |
| lovable credits | 1 | 0 |
| n8n for beginners | 1 | 0 |
| how to publish lovable app | 0 | — |
| lovable github | 0 | — |
| vibe coding for product managers | 0 | — |

---

## Caveats on reading this

- **No term returned nothing at all.** All ten produced a topic page with related searches and videos.
- **Zero gaps ≠ no demand.** For `how to publish lovable app`, `lovable github` and `vibe coding for product managers`,
  Studio removes the gap filter entirely rather than showing an empty state. Those three have healthy related-search
  lists — they are *well-served*, not dead.
- **Low volume ≠ no demand.** Per the brief: interest data is built only from videos watched more than 1,000 times a
  week over the last 28 days, so a real but small niche registers as Low or as nothing. The PM-facing terms sit
  exactly in that zone.
- **The two broad terms are where the gaps are, and they are the least specific.** `ai automation` and
  `ai for product managers` generate 44 of the 64 gaps in this pull, largely by drifting toward generic AI queries.
- **"What people are watching" is volatile** — verified changing between two loads of the same page minutes apart.
