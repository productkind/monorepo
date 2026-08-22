# Little Parrot — SEO Research & Course-Catalogue Strategy

**Research date:** August 2026 · **Data source:** Semrush (US, UK, CA, AU databases; FR/DE where previously pulled) + live crawl of littleparrot.app · **Audience lens:** women with professional/domain expertise using AI practically; for vibe-coding courses, women building a customer-facing app with AI without a technical cofounder.

---

## 1. Executive verdict

**The catalogue is useful, but its search opportunity is concentrated, not evenly spread.** Of nine published courses, three have a credible organic-search path today (Save Lovable Credits, Build Your First App With Lovable, Launch And Grow), two have real but article-led demand (Build Your Business, Hand Off the Mental Load), and four should not rely on search as their primary acquisition channel (Fix Bugs with Confidence, Basics of Software, Build a Valuable Product, Write Better With AI).

The winnable niche, confirmed across two large Semrush studies (~285 keywords, 4–6 countries):

1. **Lovable tool-choice & comparisons** — ~4,000/mo qualified 4-country volume at KD 13–27. Nobody serves the non-technical founder perspective.
2. **Lovable credits / cost / code-ownership** — ~1,400/mo 4-country at KD 0–19. An active pain with a weak, forum-and-docs SERP. This is the single best course-to-search fit in the catalogue.
3. **Vibe-coding security for non-technical founders** — ~350/mo at KD 0–23 with a SERP written entirely for security professionals. Clear content gap, but no dedicated course exists to sell into it (catalogue gap).
4. **Course-intent modifiers** — ~1,700/mo 4-country at KD 0–38 (`vibe coding course`, `lovable certification`, `vibe coding bootcamp`…). Highest purchase proximity in the research.

**On €5,000/month:** the arithmetic supports a path, but not quickly and not from SEO alone. Total qualified, deduplicated 4-country demand is ~9,500–11,000 searches/month across all winnable clusters. At a realistic mid-case (15% click share, 2% visitor→customer conversion) that is ~30 new customers/month — €1,470–€2,970 in first-value terms, or ~€720 in new MRR. Reaching €5,000/month needs 9–14 months of compounding subscription MRR after rankings are achieved (rankings themselves take 4–9 months at KD 13–38), supplemented by non-search channels. It does **not** require ranking for the KD-77 `vibe coding` head term. SEO should be treated as one acquisition channel alongside community, partnerships and the existing referral/social loops — not the sole engine.

**Distinctions the conclusion rests on:**
- *Useful course* ≠ *course with search demand*: Fix Bugs with Confidence is clearly useful, but every debugging query phrasing returns near-zero volume in four countries.
- *Search demand* ≠ *SEO revenue*: Write Better With AI sits under head terms (`ai for product managers`, 1,900/mo) whose SERPs are career-change/certification intent (Coursera, Pragmatic Institute), not writing-help intent.
- *Cluster size* ≠ *material revenue*: only the tool-choice and course-intent clusters are large and close enough to purchase to move €5k/month meaningfully.

---

## 2. Existing catalogue scorecard

Crawled 2026-08-22. All 9 course overview pages are live, indexable, prerendered (SSR), with canonical URLs, unique titles, meta descriptions, and single H1s. **One defect found:** the prerendered HTML contains only `Organization` JSON-LD — the `Course` structured data is injected client-side after the Supabase fetch, so crawlers that don't execute JavaScript never see it. Fix: bake Course schema into the prerendered output (or render it from the prerender cache).

| # | Course | URL | Title tag | H1 | Meta desc | Canonical | Indexable | JSON-LD (prerendered) |
|---|---|---|---|---|---|---|---|---|
| 1 | Hand Off the Mental Load | /55dfd25b-b9a5-4f04-860d-ef5c1d1e20b9/course-overview | ✓ | ✓ (includes "Free until 30 August" badge text — pollutes H1) | ✓ | ✓ | ✓ | Organization only ⚠ |
| 2 | Save Lovable Credits | /7171137b-9461-425f-8737-ad3400d56fd8/course-overview | ✓ | ✓ | ✓ | ✓ | ✓ | Organization only ⚠ |
| 3 | Build Your Business | /b7455f5a-166c-4614-a4ca-be83369ff7f1/course-overview | ✓ | ✓ | ✓ | ✓ | ✓ | Organization only ⚠ |
| 4 | Build a Valuable Product | /e16d932e-ac1f-4514-b5da-42629acf39ae/course-overview | ✓ | ✓ | ✓ | ✓ | ✓ | Organization only ⚠ |
| 5 | Fix Bugs with Confidence | /aaab45b7-209a-4578-a515-3e55687f0c53/course-overview | ✓ | ✓ | ✓ | ✓ | ✓ | Organization only ⚠ |
| 6 | Build Your First App With Lovable | /5e86e580-264c-442c-8cc4-be5645f13e87/course-overview | ✓ | ✓ | ✓ | ✓ | ✓ | Organization only ⚠ |
| 7 | Launch And Grow Your Lovable App | /ff736c4f-8ccc-41b6-96c6-68806804c5d8/course-overview | ✓ | ✓ | ✓ | ✓ | ✓ | Organization only ⚠ |
| 8 | Basics of Software for Vibe Coding | /4794366d-b807-4804-8fd5-64c3a5a03472/course-overview | ✓ | ✓ | ✓ | ✓ | ✓ | Organization only ⚠ |
| 9 | Write Better With AI | /550e8400-e29b-41d4-a716-446655440000/course-overview | ✓ | ✓ | ✓ | ✓ | ✓ | Organization only ⚠ |

Catalogue vs. expected list: all 8 expected courses present and accessible. **One additional course** (Hand Off the Mental Load — the mums course). No duplicates, none inaccessible. `/courses` and `/guides` hubs are indexable with clean titles. Course URLs are UUID-based (not slugs) — acceptable, but titles/H1s carry the full keyword weight; keep them keyword-rich.

Challenge/module inventory (from the database):

| Course | Challenges |
|---|---|
| Hand Off the Mental Load | The Brain Dump · Share the Load · The Baby Log · Make It Effortless |
| Save Lovable Credits | Why Edit on Your Own Computer · Set Up Your Workspace · Run Your App on Your Computer · Change Your Website Copy · Change an Icon · Make a Bigger Change with Copilot · Your Workflow |
| Build Your Business | Craft Your Value Proposition · Choose Your Domain · Build Your Audience Before You Launch · Set Up Analytics Before Your First Visitors Arrive · Get Your First Visitors · Listen to Your First Users · Decide What to Charge · Build a Sustainable Business |
| Build a Valuable Product | Craft a Problem Statement · Define Your Target User · Storyboard · Break Down Your Idea Into Buildable Steps · Define Your MVP · Create a Prompt to Build Your MVP with AI · Get Feedback |
| Fix Bugs with Confidence | The Anatomy of a Bug · Preventing Bugs · How Developers Investigate Bugs · Lovable's Debugging Toolkit · Escaping Bug Loops · How to Guide Lovable to Fix Bugs · Handling Security Errors and Warnings |
| Build Your First App With Lovable | Your First Prompt · Iterate and Improve · Save Data with Lovable Cloud · Make Quick Changes · Experiment and Undo Mistakes Safely · Plan, Test, and Connect Services · Publish and Share Your App |
| Launch And Grow | Go Live · Connect a Custom Domain · Build Trust: Legal Pages · Get Found: SEO and Discoverability · Know Your Users: Metrics, Feedback, Distribution · Launch Early, Grow Steadily |
| Basics of Software | Building Blocks of an Application · Design Elements · Frontend · Backend · Databases |
| Write Better With AI | High-pressure communication · Internal product updates · LinkedIn posts · Learning with AI |

Pricing (live, /pricing): **€24/month subscription** (loaded dynamically from Stripe) and **€950 lifetime** (with 2× €500 coaching sessions). First challenge of every course free. Mums course currently free until 30 August.

---

## 3. Current Little Parrot organic performance

Semrush, August 2026:

| Database | Ranking keywords | Est. organic traffic | Rankings |
|---|---|---|---|
| US | 3 | ~21/mo | `little parrot` #2 (260/mo) · `parrot software` #36 · `pinparrot` #40 (both irrelevant spillover) |
| UK | 1 | ~14/mo | `little parrot` **#1** (110/mo) |

- **Position bands:** 1 keyword in positions 1–3 (brand). Zero keywords in 4–10, 11–20 or 21–50 on any non-brand term.
- **Striking-distance keywords:** none — there is nothing at positions 11–30 to nudge. Every gain must come from new content or newly optimised pages.
- **Indexed course/guide pages:** no course overview or guide page ranks in the top 100 for any tracked keyword in US/UK. Pages are indexable and technically sound; they simply have no rankings yet (young domain, no topical authority).
- **Cannibalisation / wrong-page rankings:** none detected (nothing ranks).
- **Backlinks / referring domains:** not exposed by the available tools — marked unavailable, not estimated.
- **Organic competitors:** not exposed for a domain this small; inferred competitors from SERP work are nocode.mba, Codecademy, classcentral, Coursera, Medium listicles and vendor docs.

Interpretation: the site is a blank slate with a clean technical base. There is no existing equity to protect, and no quick-win rankings — the 30-day plan below is built on lowest-KD, highest-fit terms for that reason.

---

## 4. Validated keyword clusters

Qualified = audience fit A, deduplicated within Semrush cluster groups. Volumes = searches/month, 4-country (US+UK+CA+AU). KD/CPC from US database.

| Cluster | Anchor keywords | Raw 4-country vol | Dedup. qualified vol | KD range | CPC | Proximity | Verdict |
|---|---|---|---|---|---|---|---|
| **A. Lovable tool choice** | lovable vs replit (720 US; `replit vs lovable` 1,300 same cluster), lovable alternatives 590, lovable vs base44 480, lovable vs bolt 390, lovable competitors 320, lovable vs v0 140, lovable review 110, lovable vs bubble 70 | ~6,000 | **~4,000** | 13–27 | $4.36–7.42 | 2 | Strongest volume opportunity; TOFU/MOFU |
| **B. Course-intent modifiers** | vibe coding course 480, vibe coding tutorial 260, vibe coding bootcamp 110, vibe coding training 90, vibe coding for beginners 90, lovable certification 70, lovable tutorial 110, lovable workshop 40, lovable training 30, lovable course 20 | ~2,300 | **~1,700** | 0–38 | $1.90–14.89 | 5 | Highest purchase proximity; courses rank on this SERP |
| **C. Credits, cost & code ownership** | lovable credits 260 + question cluster ~350 US (`how do lovable credits work` 90, `do lovable credits roll over` 30…), can i export lovable 260, lovable import from github 260, lovable github 140, export lovable code 20, connect lovable to github 20, lovable credit usage 20, vibe coding technical debt 40 | ~2,200 | **~1,400** | 0–19 (lovable github 46) | $0–12.18 | 3–4 | Best course fit in catalogue (Save Lovable Credits) |
| **D. First build / how-to** | how to use lovable 170, lovable templates 170, build an app with ai 390 (KD 56), what can you build with lovable 20, lovable app examples 30, ai saas builder 140, no code saas builder 90 | ~1,300 | **~900** | 0–42 (excl. KD 56 anchor) | $3.07–16.93 | 2–3 | Feeds Build Your First App |
| **E. Supabase & backend** | lovable supabase 170, lovable backend 170, how to connect supabase to lovable 140, lovable database 20, supabase authentication 1,600 (fit B, excluded) | ~640 | **~500** | 0–52 | $4.11–6.65 | 3 | Vendor-docs SERP; tutorial gap |
| **F. Security & customer data** | vibe coding security 140 (+`vibe coding security risks` 140, likely same cluster), lovable security ~200 across countries, lovable data privacy 50, is lovable secure ~100 | ~600 | **~350** | 0–23 | $10.49–11.91 | 4 | Best content gap; no matching course yet |
| **G. Hosting, launch & domain** | lovable hosting 170 + questions ~110, deploy lovable app 60, publish lovable app 40, lovable custom domain 50, saas launch checklist ~90, mvp launch checklist 30 | ~600 | **~450** | 0–28 | $5.18–6.94 | 4 | Reddit-outranks-docs SERP; feeds Launch And Grow |
| **H. Payments** | lovable stripe integration 40, lovable stripe 30, stripe supabase integration 20 (B) | ~130 | **~90** | 0–24 | $7.17 | 4 | Small, real, high-intent |
| **I. Validation & first customers** | product validation 590, customer discovery 720, saas go to market 70, mvp validation 50, how to launch a saas 40, validate app idea 20, validate saas idea 20, how to get first customers 20 | ~2,200 | **~1,100** (50% haircut: PM-glossary SERP intent) | 0–22 | $3.45–13.41 | 2–3 | Real demand, corporate-PM-flavoured SERP — winnable with founder framing |
| **J. Mental load / mums** | mental load checklist 170, ai for moms 40, chatgpt for moms 30, mental load 2,400 (informational), invisible labor 1,300 (informational), brain dump template 720 (fit B — printable-template SERP) | ~4,700 | **~500** | 0–42 | $0–6.68 | 2–3 | Article-led; already partially published |
| **K. AI writing for PMs** | ai prompts for product managers 40, chatgpt for product managers 50, prompt engineering for product managers 30, product management prompts 30, write better with ai 20, ai tools for product managers 590 (related) | ~760 | **~350** | 0–29 | $0–6.81 | 2–3 | Small but nearly uncontested |

**Total qualified, deduplicated, 4-country: ≈ 9,500–11,000 searches/month.**

---

## 5. Rejected and misleading keyword clusters

| Keyword / cluster | Raw volume | Why rejected |
|---|---|---|
| `vibe coding` (head) | 90,500 US | KD 77, developer-skewed mixed SERP. Brand/authority play for year 2+, not a target now. Fit B. |
| `lovable login` / `lovable signup` | 880+ US | Navigational — users signing into Lovable itself. Fit C. |
| `lovable` / `lovable ai` / `loveable ai` spillover | 110,000 / 40,500 / 27,100 | Brand-navigational + English-word spillover (`loveable`, `lovely ai`). Excluded. |
| `lovable pricing` | 2,400 US | Existing-user/comparison intent for Lovable's own purchase decision, not a learning need. Fit B. Mention inside credit/pricing content, never a target page. |
| `saas security checklist` | 260 US, KD 12, CPC $79.72 | IT-procurement intent (Stanford IT, CrowdStrike, Oracle). The CPC is B2B security-software money. Fit B — do not chase despite low KD. |
| "Production ready" phrasings (`make lovable app production ready`, `is lovable production ready`, ~20 variants) | 0 everywhere | Hypothesis not supported by data. Demand is phrased as hosting/deploy/domain instead. |
| "Maintenance" phrasings (`maintain lovable app`, `lovable app maintenance`, ~20 variants) | 0 everywhere | Ownership demand exists only as export/GitHub/backup phrasing (cluster C). |
| Testing phrasings (`test lovable app`, `debug lovable app`, `lovable app not working`…) | 0–10 | Near-zero in all four countries. Fold debugging/testing into other content; not a standalone target. |
| `vibe coding github` | 210 US | Developer intent (Copilot docs, awesome-lists, MS Learn). Fit B. |
| Identity modifiers (`vibe coding for women`, `ai app builder for entrepreneurs`, 13 variants) | 0 everywhere | Confirmed across 6 countries. Identity is brand/conversion copy, never an SEO target. |
| `saas testing checklist` | 20 | B-fit, negligible. |
| `brain dump` / `mental load` (heads) | 4,400 / 2,400 | Informational definitional intent; usable only as article support, not targets. |
| `supabase backup` | 70 | Fit B (developer ops); supports a backup section in ownership content only. |
| `find first customers`, `get first paying customers`, `market a new app` | 0/— | No tracked demand as phrased; intent lives in `customer discovery`/`product validation`. |
| `prompt engineering course` / `ai prompting course` | 3,600 / 590 | KD 59–70, generic prompt-engineering audience (not PMs). Later-opportunity only. |

---

## 6. Search-demand and revenue model

Live pricing used: **€24/mo subscription**, **€950 lifetime**. Modelled first-value scenarios: €49 (≈2 months of subscription), €79, €99, €149 (≈6-month subscriber LTV).

Funnel maths (per month, at steady rankings): `qualified volume × click share × conversion = customers`.

| Scenario | Click share | Conversion | Monthly customers | Revenue @ €49 | @ €79 | @ €99 | @ €149 |
|---|---|---|---|---|---|---|---|
| Conservative | 5% | 1% | ~5 | €245 | €395 | €495 | €745 |
| Base | 15% | 2% | ~30 | €1,470 | €2,370 | €2,970 | €4,470 |
| Strong | 30% | 3% | ~90 | €4,410 | €7,110 | €8,910 | €13,410 |

(Using ~10,000/mo qualified 4-country volume; assumes top-3 rankings across the KD 0–38 winnable set, not the KD 77 head term.)

**Path to €5,000/month — subscription-MRR view (the honest one):** €5,000 MRR ≈ 208 subscribers at €24. At the base scenario (~30 new customers/mo, all on subscription) with 8%/mo churn, MRR crosses €5,000 in **month 9–10 of full-rankings run-rate**. Add 4–9 months to achieve those rankings at KD 13–38 with a new domain, and the realistic timeline is **13–19 months** — shorter if lifetime sales (€950 each; 2/month ≈ €1,900) and non-search channels (community, referral, waitlist) run in parallel.

**Dependency check:** the model does not require any KD >40 term. Removing cluster A (tool choice, the largest) drops qualified volume to ~6,000/mo and pushes the base scenario to ~18 customers/month — still viable, slower. The model is most sensitive to conversion rate and to ranking in positions 1–3 (not 4–10) on clusters B and C.

**Verdict:** organic search can contribute materially to €5,000/month within ~12–18 months, but cannot carry it alone within 12 months. Treat SEO as the compounding channel beside community, partnerships and lifecycle email.

---

## 7. Top five articles for the first 30 days

Selection criteria: KD 0–25, audience fit A, purchase proximity ≥3, weak/technical SERP, direct course link. (No existing rankings exist to improve — §3.)

| # | Article | Primary keyword (US vol, KD) | Dedup. cluster vol (4-country) | Proximity | Class | Linked course |
|---|---|---|---|---|---|---|
| 1 | Lovable credits explained: how they work, and how to stop burning through them | lovable credits (260, KD 19) | ~1,400 (incl. question cluster) | 4 | BOFU | Save Lovable Credits |
| 2 | Can you export your Lovable code? Ownership, GitHub and backups for non-technical founders | can i export lovable (260, KD 0–19) | ~700 (shares cluster C) | 3 | MOFU | Save Lovable Credits |
| 3 | Vibe coding security, in plain English: a checklist for your first real users | vibe coding security (140, KD 23) | ~350 | 4 | BOFU | Fix Bugs with Confidence (security challenge) — until a dedicated course exists |
| 4 | Lovable vs Replit vs Bolt: which AI app builder if you can't code? | lovable vs replit (720, KD 27) | ~4,000 (cluster A) | 2 | MOFU | Build Your First App With Lovable |
| 5 | The mental load checklist: every invisible task, finally in one place | mental load checklist (170, KD 6) | ~500 (cluster J) | 3 | MOFU | Hand Off the Mental Load — **retarget the existing `/guides/mental-load-list` article rather than writing a new one** |

---

## 8. Full 90-day article roadmap

**Days 31–90 (next 10, in publication order):**

| # | Article | Primary keyword (US vol, KD) | Class | Links to |
|---|---|---|---|---|
| 6 | How to connect Supabase to Lovable (and when you actually need to) | how to connect supabase to lovable (140, KD 0) | MOFU | Courses 6, 7 |
| 7 | How Lovable hosting works: where your app lives and what it costs | lovable hosting (170, KD 28) | MOFU | Course 7 |
| 8 | Lovable certification: what exists, what's worth it, and what actually proves skill | lovable certification (70, KD 20) | BOFU | Course 6 + certificates feature |
| 9 | Lovable templates: when to use one, when to prompt from scratch | lovable templates (170, KD 21) | MOFU | Course 6 |
| 10 | How to add payments to your Lovable app with Stripe | lovable stripe integration (40, KD 24) | BOFU | Course 3 (pricing challenge) |
| 11 | SaaS launch checklist for vibe coders | saas launch checklist (20, KD 0) | BOFU | Course 7 (downloadable checklist) |
| 12 | Vibe coding course: how to choose one that teaches skills, not certificates | vibe coding course (480, KD 38) | BOFU | /courses hub — this doubles as the course-hub landing copy |
| 13 | How to validate your app idea before you build anything | how to validate an app idea (cluster ~60, KD 0) | MOFU | Course 4 |
| 14 | AI tools for product managers: what to use for writing, research and updates | ai tools for product managers (590, est. KD ~30) | MOFU | Course 9 |
| 15 | Brain dump template + how AI turns it into an organised list | brain dump template (720, KD 22 — fit B SERP, attack with AI-angle differentiation) | MOFU | Course 1 (mums) — extends existing `/guides/brain-dump-template` |

**Later opportunities (authority-gated, revisit at month 6+):** `vibe coding` (KD 77), `ai app builder` (61), `build an app with ai` (56), `ai for product managers` (59), `prompt engineering course` (59), `frontend vs backend` (51), `api explained` (56), `how to use lovable` (42), `mental load` (42), `vibe coding tools` (43), `how does lovable work` (55). Also FR/DE localisation of cluster B and C pages (both show real demand: e.g. `lovable import from github` FR 260, `vibe coding saas` FR 50).

**Internal-link structure:** every article links up to its cluster hub (`/courses` or a new `/guides/vibe-coding` hub), sideways to 1–2 sibling articles, and down to one course CTA. Course overview pages link back to their cluster's articles ("Read: How Lovable hosting works").

---

## 9. Detailed article briefs (top 5)

### Article 1 — Lovable credits explained
- **Reader:** woman mid-build in Lovable, watching credits burn, no dev background. **Situation:** task/failure-aware ("why did my credits run out").
- **Primary:** `lovable credits` (US 260, UK 70, CA 30, AU 20; KD 19; CPC $5.71). **Secondary:** `how do lovable credits work` (90), `do lovable credits roll over` (30), `when do lovable daily credits reset` (30), `does lovable chat mode use credits` (20), `lovable credit usage` (20).
- **Dedup. cluster:** ~1,400/mo 4-country. **Proximity 4** (active cost pain on a paid tool). **SERP weakness:** #1 is Lovable's own docs; then Reddit, a dev.to post and a Medium "stop burning credits" post — nothing structured, nothing for non-developers.
- **Format:** explainer + FAQ block (FAQPage schema) + cost-saving checklist. **Slug:** `/guides/lovable-credits`. **Course CTA:** "Save Lovable Credits: Edit Your App Like a Developer — first challenge free." **Internal links:** to article 2 (export/GitHub), course 2 overview, from course 2 overview back. **Downloadable:** one-page credit-saving checklist (yes). **Why LP wins:** the only resource written for non-technical builders, with a course behind it. **Updates:** quarterly — Lovable changes credit mechanics often (medium-high volatility).

### Article 2 — Can you export your Lovable code?
- **Reader:** founder who built on Lovable and is asking "do I actually own this?" **Situation:** outcome/ownership anxiety before scaling or hiring help.
- **Primary:** `can i export lovable` (US 260, KD ~0). **Secondary:** `lovable import from github` (260), `lovable github` (140, KD 46 — mention, don't target), `connect lovable to github` (20), `export lovable code` (20), `how to backup a supabase project` (210, fit B — cover briefly).
- **Dedup. cluster:** ~700/mo. **Proximity 3.** **SERP weakness:** docs + dev.to + Reddit; no founder-perspective ownership guide.
- **Format:** Q&A explainer with a decision tree (stay / sync to GitHub / export). **Slug:** `/guides/export-lovable-code`. **CTA:** course 2 (the GitHub/local-editing workflow is exactly its content). **Links:** article 1, cluster G articles. **Downloadable:** no. **Updates:** twice yearly.

### Article 3 — Vibe coding security in plain English
- **Reader:** founder about to give real users access to her app; saw a scary headline about vibe-coded apps leaking data.
- **Primary:** `vibe coding security` (US 140, UK 40, CA 30, AU 20; KD 23; CPC $10.49). **Secondary:** `vibe coding security risks` (140), `lovable security` (~200 across countries), `is lovable secure` (~100), `lovable data privacy` (50), `row level security explained` (30, fit B).
- **Dedup. cluster:** ~350/mo. **Proximity 4** (customer data = urgent). **SERP weakness:** quality 4 — every top-10 result (Checkmarx, Wiz, Invicti, CSA) is written for security professionals; the Reddit #1 is a alarmist thread. Nothing answers "is MY app safe, and what do I check today?"
- **Format:** plain-English explainer + 10-point checklist (downloadable, FAQPage schema). **Slug:** `/guides/vibe-coding-security`. **CTA:** Fix Bugs with Confidence (contains the security-warnings challenge) — flag: a dedicated security course is the clearest catalogue gap (§12). **Links:** articles 6, 7. **Updates:** twice yearly.

### Article 4 — Lovable vs Replit vs Bolt
- **Reader:** professional woman choosing her first AI builder; comparison-shopping before committing.
- **Primary:** `lovable vs replit` (US 720, KD 27). **Secondary:** `replit vs lovable` (1,300, same cluster), `lovable vs bolt` (390, KD 26), `bolt.new vs lovable` (480), `lovable alternatives` (590, KD 22), `lovable vs base44` (480, KD 15), `lovable competitors` (320), `lovable vs v0` (140), `lovable vs bubble` (70, KD 13), `lovable vs cursor` (480, fit B-leaning — cover in a "if you can code" aside).
- **Dedup. cluster:** ~4,000/mo 4-country. **Proximity 2** (tool choice precedes purchase by weeks). **SERP weakness:** vendor listicles, Reddit, Medium; zero learner-perspective comparisons.
- **Format:** honest comparison table + "who each tool is for" + verdict. **Slug:** `/guides/lovable-vs-replit-vs-bolt`. **CTA:** Build Your First App With Lovable. **Links:** article 12 (course chooser), course 6. **Downloadable:** no. **Updates:** quarterly (tools change fast — high volatility). **Note:** one page covering all comparison variants — do NOT split per-vs-page, they share the cluster.

### Article 5 — The mental load checklist (retarget existing)
- **Action:** retarget `/guides/mental-load-list` to `mental load checklist` (US 170, UK 20, CA 20, AU 30; **KD 6**) rather than publishing a new URL — same intent, existing page equity.
- **Secondary:** `mental load` (2,400 — mention in intro/H2, not target), `invisible labor` (1,300 — already has its own article; interlink). **Proximity 3.** **SERP weakness:** KD 6; top results are blogs, a Reddit thread, PDFs and an Instagram post — a definitive, downloadable checklist wins.
- **Format:** interactive/downloadable checklist + FAQ. **CTA:** Hand Off the Mental Load course. **Links:** `/guides/working-mums` hub, `brain-dump-template`, `invisible-labor`. **Updates:** yearly.

---

## 10. Internal-link and site-architecture plan

**Verdict: one site, separate topical hubs — do not split brands or domains.** The three content areas (vibe-coding courses, AI-writing/PM content, working-mums guides) share one audience identity (professional women using AI practically) but not one search identity. That's fine: topical authority is built per-hub via internal linking, not domain-wide. A split would halve a young domain's already-small authority. The working-mums cluster is not "unrelated traffic" — it is the same person in a different life context, and the mums course is the platform's clearest product-market proof.

**Architecture:**
- Create `/guides/vibe-coding` (hub for articles 1–4, 6–12) alongside the existing `/guides/working-mums` hub. The `/guides` index becomes a two-hub directory.
- Bidirectional links: every course overview → its cluster articles ("Guides: How Lovable hosting works…"); every article → exactly one primary course CTA + hub link + 1–2 siblings.
- Add `BreadcrumbList` schema on guides (Home → Guides → Hub → Article) and visible breadcrumbs.
- Canonicals: already correct per page; keep the UUID course URLs stable and never 301 them — instead, if slug URLs are ever wanted, add them as new canonical pages with redirects from UUIDs (not recommended now).
- **Fix the JSON-LD gap (§2):** get `Course` schema into prerendered HTML — currently only `Organization` ships to non-JS crawlers. Add `FAQPage` on articles, `ItemList` on `/courses`.
- Catalogue-page titles: `/courses` title is "Courses — Little Parrot" — change to "Vibe Coding Courses for Non-Technical Founders — Little Parrot" with a meta description carrying `vibe coding course` + `lovable course` phrasing (cluster B, ~1,700/mo qualified). This page is the natural hub for the highest-proximity cluster.
- Cannibalisation prevention: one page per cluster (the comparison article covers ALL `vs` variants; the credits article covers ALL credit questions). Keep a keyword→URL registry.

---

## 11. Course positioning changes

| Course | Change |
|---|---|
| Save Lovable Credits | **None — model course.** Title already matches the searched problem. Add "credits" FAQ to its overview page targeting the question cluster (FAQPage schema). |
| Build Your First App With Lovable | Add "tutorial" language to meta description (`lovable tutorial`, `vibe coding tutorial` cluster). Keep title. |
| Launch And Grow | Reposition copy toward searched phrasing: "hosting", "custom domain", "launch checklist" (current copy says "publish to production" — a phrasing with zero search demand). Title → "Launch and Host Your Lovable App: Domain, Legal, SEO and Growth". |
| Fix Bugs with Confidence | No search demand under any debugging phrasing. Keep the course (clear learner value, supports retention) but **acquire via in-product prompts, email and the security article** — not SEO. Consider folding its security challenge into a future security course. |
| Build Your Business | Anchor to cluster I phrasing: value proposition → validation → first customers. Title candidate: "From Vibe Coded App to First Paying Customers". Add FAQ targeting `how to get first customers`/`validate saas idea`. |
| Build a Valuable Product | Overlaps Build Your Business on validation. Keep as the pre-build entry point, but position explicitly as "before you build" (problem statement, MVP) and hand off to Build Your Business for "after you build". Cross-link the two overviews to avoid cannibalising each other's validation keywords. |
| Basics of Software for Vibe Coding | Keep as supporting/upsell course. Its searchable terms (`frontend vs backend`, `api explained`) are KD 51–56 and fit-B — not worth chasing now. Non-search channel: bundle messaging ("the vocabulary course") on other course pages. |
| Write Better With AI | Head terms are career-cert intent, not writing-help intent. Target the small but uncontested long tail (`ai prompts for product managers` KD 8, `product management prompts` KD 0, `prompt engineering for product managers` KD 11) in meta/FAQ. Consider broadening audience framing beyond PMs ("for product people" already helps). |
| Hand Off the Mental Load | Search demand lives in articles, not the course page. Keep course page as-is; drive traffic from the guides cluster. Fix the H1 pollution ("Free until 30 August" badge text is inside the H1). |

---

## 12. Catalogue gaps supported by search evidence

1. **Security course** — cluster F (~350/mo, proximity 4, quality-4 SERP) has no dedicated course. The strongest evidence-backed new-course candidate. Working title: "Secure Your Vibe Coded App: Protect Your Users' Data".
2. **Supabase/backend mini-course** — cluster E (~500/mo) currently maps only to single challenges inside courses 6–7. A short "Lovable + Supabase" course or premium guide would own the vendor-docs-dominated SERP.
3. **Payments/monetisation module** — cluster H (~90/mo, proximity 4) is served by one challenge in Build Your Business. Small; a dedicated challenge or toolkit item suffices — not a full course.
4. No evidence supports new courses for testing, maintenance-as-phrased, or generic "AI for business" (all zero/misfit demand).

---

## 13. Courses that require non-search acquisition

- **Fix Bugs with Confidence** — zero-volume cluster. Channels: in-product triggers (error moments), community, lifecycle email, the security article's CTA.
- **Basics of Software for Vibe Coding** — B-fit/high-KD terms only. Channels: bundle/upsell from other course pages, onboarding email sequence.
- **Write Better With AI** — long-tail SEO helps marginally; primary channels: LinkedIn (audience-native), partnerships with PM communities, newsletter.
- **Build a Valuable Product** — partial article support possible; primary: onboarding path entry point and bundle framing.

---

## 14. Raw keyword table (this session's pulls — 43 keywords × 4 countries)

Volumes = searches/month. KD/CPC/Comp from US database. `—` = no data in Semrush.

| Keyword | US | UK | CA | AU | KD | CPC | Comp |
|---|---|---|---|---|---|---|---|
| ai prompts for product managers | 40 | 20 | 10 | 10 | 8 | $6.00 | 0.34 |
| chatgpt for product managers | 50 | 10 | 10 | 10 | 29 | $0 | 0.01 |
| write better with ai | 20 | 10 | — | 20 | 0 | $1.54 | 0.59 |
| prompt engineering for product managers | 30 | 20 | 20 | 20 | 11 | $3.99 | 0.67 |
| product management prompts | 30 | 10 | 30 | 0 | 0 | $0 | 0.57 |
| ai writing course | 10 | 10 | 10 | 10 | 0 | $4.06 | 0.62 |
| ai prompting course | 590 | 140 | 70 | 40 | 70 | $5.83 | 0.78 |
| chatgpt writing prompts | 210 | 20 | 30 | 20 | 63 | $1.12 | 0.06 |
| ai for product managers | 1,900 | 320 | 260 | 170 | 59 | $4.65 | 0.57 |
| prompt engineering course | 3,600 | 1,000 | 720 | 480 | 59 | $4.91 | 0.66 |
| validate app idea | 20 | 20 | 20 | 10 | 0 | $5.09 | 0.54 |
| validate saas idea | 20 | 20 | 20 | 0 | 0 | $3.45 | 0.22 |
| product validation | 590 | 50 | 40 | 40 | 22 | $4.87 | 0.04 |
| customer discovery | 720 | 90 | 70 | 20 | 21 | $8.20 | 0.09 |
| find first customers | 0 | — | — | — | 0 | $0 | 0 |
| get first paying customers | — | — | — | — | — | — | — |
| saas go to market | 70 | 20 | 10 | 0 | 13 | $13.41 | 0.14 |
| market a new app | — | — | — | — | — | — | — |
| how to launch a saas | 40 | 20 | 20 | 10 | 0 | $4.68 | 0.79 |
| mvp validation | 50 | 20 | 20 | 20 | 19 | $0 | 0.09 |
| how web apps work | 20 | 20 | 20 | 20 | 0 | $0 | 0.04 |
| frontend vs backend | 590 | 50 | 70 | 30 | 51 | $0.18 | 0.01 |
| api explained | 590 | 90 | 20 | 20 | 56 | $9.19 | 0.12 |
| database explained | 70 | 0 | 20 | 10 | 45 | $0 | 0 |
| software development for non technical founders | — | — | — | — | — | — | — |
| technical concepts for product managers | 20 | 0 | 0 | 0 | 0 | $0 | 0.86 |
| software architecture for beginners | 20 | 20 | 20 | 20 | 0 | $2.26 | 0.83 |
| software basics for beginners | 20 | 0 | 10 | 10 | 0 | $0 | 0.14 |
| how does a web app work | 10 | 10 | 10 | 20 | 0 | $0 | 0.09 |
| ai for moms | 40 | 20 | 20 | 10 | 11 | $6.68 | 0.07 |
| brain dump template | 720 | 140 | 140 | 110 | 22 | $0.64 | 1.0 |
| mental load checklist | 170 | 20 | 20 | 30 | 6 | $0 | 0.15 |
| mental load | 2,400 | 720 | 390 | 390 | 42 | $0.19 | 0.01 |
| invisible labor | 1,300 | 30 | 40 | 40 | 29 | $0.84 | 0.01 |
| brain dump | 4,400 | 1,600 | 480 | 480 | 36 | $2.43 | 0.14 |
| ai for mums | — | — | — | 0 | — | — | — |
| chatgpt for moms | 30 | 0 | 20 | — | 0 | $0 | 0.33 |
| lovable credits | 260 | 70 | 30 | 20 | 19 | $5.71 | 0.19 |
| save lovable credits | — | — | — | — | — | — | — |
| lovable credit usage | 20 | — | — | — | 0 | $0 | 0.04 |
| edit lovable code | — | — | — | — | — | — | — |
| how to get first customers | 20 | 20 | 20 | 20 | 0 | $0 | 0.33 |
| first paying customers | — | — | — | — | — | — | — |

The 242-keyword × 6-country dataset (clusters: market discovery, Lovable-specific, launch, auth, payments, security, testing, Supabase, maintenance, course modifiers, identity) was delivered in the 2026-08-22 research session and is incorporated throughout §4–§5.

**Notable related/question finds:** `replit vs lovable` 1,300 · `bolt.new vs lovable` 480 · `lovable competitors` 320 · `is lovable free` 480 · `supabase authentication` 1,600 (B) · `how to connect supabase to lovable` 140 · `how to backup a supabase project` 210 · `how do lovable credits work` 90 · `what is vibe coding` 49,500 (TOFU definitional) · `how to vibe code` 1,600 · `ai product manager` 2,900 (career intent) · `ai tools for product managers` 590 · `ai product manager certification` 720.

---

## 15. Deduplicated keyword table

Semrush clusters overlapping phrasings; raw sums overstate demand. Qualified = fit A only, deduplicated.

| Cluster | Raw 4-country | Deduplicated | Qualified (A-fit) |
|---|---|---|---|
| A Tool choice | ~6,000 | ~4,200 | ~4,000 |
| B Course intent | ~2,300 | ~1,800 | ~1,700 |
| C Credits/ownership | ~2,200 | ~1,500 | ~1,400 |
| D First build | ~1,300 | ~1,000 | ~900 |
| E Supabase/backend | ~640 | ~520 | ~500 |
| F Security | ~600 | ~370 | ~350 |
| G Hosting/launch | ~600 | ~460 | ~450 |
| H Payments | ~130 | ~100 | ~90 |
| I Validation/customers | ~2,200 | ~1,500 | ~1,100 (50% intent haircut) |
| J Mums/mental load | ~4,700 | ~2,900 | ~500 |
| K AI writing PM | ~760 | ~400 | ~350 |
| **Total** | **~21,700** | **~14,800** | **~10,300** |

Excluded from all totals: `vibe coding` head (fit B, KD 77), `lovable login` (navigational), `lovable pricing` (existing-user), `saas security checklist` (IT-buyer), `brain dump`/`mental load` heads (definitional), identity modifiers (zero volume), all "production ready"/"maintenance"/"testing" phrasings (zero volume).

---

## 16. Limitations and unavailable metrics

- **Intent and trend columns** are not exposed by the Semrush tools used; intent was inferred from SERP inspection and marked accordingly. Trend/seasonality: unavailable.
- **Backlinks and referring domains** for littleparrot.app: not exposed by the available tools. Organic-competitor overlap report: unavailable for a domain with 3 ranking keywords.
- **Traffic estimates** are Semrush models (volume × CTR over top-100 visible keywords) and a lower bound vs. real analytics.
- **Global volume** is not directly available; 4-country sums are used as the qualified-market proxy. FR/DE data exists for the 242-keyword study but was not pulled for the 43 new keywords (English-market focus per brief).
- **Keyword→cluster deduplication** is judgment-based (Semrush cluster grouping inferred from SERP overlap and phrasing), so deduplicated figures carry ±20% uncertainty.
- **Revenue model** uses stated assumptions (click share 5/15/30%, conversion 1/2/3%, 8%/mo churn); these are planning parameters, not measurements. No claim of €5,000/month from SEO alone is supported within 12 months.
- Live SERPs change; KD values are point-in-time (August 2026). The Lovable-ecosystem clusters are young and volatile — re-validate quarterly.
