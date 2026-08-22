# SaaS niche arbitration: three candidates, measured demand, one recommendation

**Date:** 22 August 2026
**Question asked:** settle which of the three existing candidates to build, applying a demand gate for the first time, and reopen the field rather than only ranking what was already on the table.
**Status:** evidence and a recommendation. Not a validated niche decision. Validation plan in section 9.

**Verbatim note.** Sections 3 and 6 quote Atlassian Marketplace reviews exactly as written, which
means American spellings, typos and punctuation we do not use ourselves. Per the folder convention,
`check-banned.py` hits on those quotes should be ignored.

---

## 1. Why this document exists

Three earlier documents answered the same three questions on the same day and reached three different
answers:

| Document | Niche | Product |
|---|---|---|
| `niche-research-codex/little-parrot-target-niche-and-saas-opportunity.md` | Non-technical women shipping customer-facing AI apps | App Steward: know what your AI changed |
| `saas-niche-search-2026-08.md` (deleted 22 Aug 2026, see appendix A) | Jira Cloud admins, 100 to 2,000 seats | Forge-native "what breaks if I change this" |
| `broad-saas-niche-research-2026-08-22.md` | Independent software and AI educators | Course-freshness monitor |

None was validated. All three named the same missing piece: no demand gate had ever been run, because
Reddit was unreachable and neither Keyword Planner nor a paid SEO tool was available.

This pass closed that gap and, in closing it, changed the answer.

## 2. Method and its limits

Three instruments:

1. **A search-demand gate.** Semrush volume, keyword difficulty, CPC and competitive density on the
   commercial-intent terms for each candidate. Recorded in
   `semrush-keyword-research-jira-2026-08.md`. CPC was read as the primary signal, because what an
   advertiser pays per click is the cheapest honest proxy for money in a market.
2. **A marketplace supply audit.** The Atlassian Marketplace REST API is public and needs no key. It
   returns install counts, review counts, average stars, Connect or Forge deployment, release dates
   and live pricing. That allows demand and supply to be measured rather than inferred. The script is
   at `../marketing/channels/niche-research-tools/marketplace-supply-audit.py`.
3. **Review-text reading.** For any app with a large installed base and a poor rating, the reviews say
   what specifically fails, which is the difference between a product opportunity and a neglected bug.

**Limits, stated plainly.**

- **Keyword Planner was unavailable.** The Google Ads account (Little Parrot, CID 101-948-9215) is
  stuck at "Setup in progress", and Keyword Planner stays locked until billing is added. Ahrefs is on
  the free tier, where Keywords Explorer is paywalled and the free generator only buckets volume as
  above or below 100 a month. All volume figures therefore come from Semrush.
- **Semrush has no global database.** Figures are US, UK and Germany. KD, CPC and competitive density
  are US.
- **Install counts are not active users.** A large installed base on an abandoned app overstates live
  demand by an unknown factor. This is the single biggest measurement weakness in section 6.
- **The catalogue pull covers the 1,200 most popular Jira Cloud apps**, not all 5,083. The long tail
  below that is not measured, which is acceptable because nothing there is a business.
- **The field was reopened inside the marketplace channel, not across all verticals.** A systematic
  sweep of non-marketplace verticals was not run. See section 10.

### One instrument error worth recording

The first version of the slot audit filtered results on the first word of the search token, so
"google chat" matched every Google app. It reported empty slots that were not empty, and full slots
that were not full. The fixed version matches the whole token. Anyone rerunning this should confirm
that fix is still in place, because the API text search ranks on general relevance and will happily
return unrelated apps as matches.

## 3. Verdict on candidate A: Jira admin change-safety

**Downgraded. The differentiation claim does not survive contact with the data.**

The now-deleted `saas-niche-search-2026-08.md` proposed a Forge-native app answering one question,
"what breaks if I change this", and argued that the category was not yet won, citing Salto
Configuration Manager at 182 installs with no reviews. Appendix A holds what was worth keeping from
it.

Salto is the wrong competitor to measure against. Measured on 22 August 2026:

| App | Vendor | Installs | Stars | Reviews |
|---|---|---:|---:|---:|
| Configuration Manager for Jira (CMJ) | Appfire | 4,400 | 4.6 | 145 |
| Project Configurator for Jira | Appfire | 1,800 | 4.8 | 115 |
| Revyz Command Center | Revyz | 945 | 5.0 | 19 |
| Smart Configuration: Documentation | Eisonesoft | 838 | 4.9 | 46 |
| Doctor Pro: Audit, Optimize & Manage Configuration | AppForge.ai | 192 | 5.0 | 10 |
| Salto Configuration Manager | Salto Labs | 183 | 4.1 | 4 |

CMJ's own description is "Compare, validate, and safely deploy Jira configuration changes across
sandbox, production, and other Cloud environments". Doctor Pro's is "#1 Jira CONTROL CENTER for
admins: audit, optimize, clean up configuration". The broad category belongs to a consolidator with
145 reviews behind it.

More decisive: **the narrow wedge is already shipped.** "Impact Analysis for Jira" by Stable Point IO
is tagged RISING STAR and RUNS ON ATLASSIAN, rates 5.0 from 8 reviews, is free up to 10 users, and its
description reads "Visualize Jira configuration impacts across workflows, automations, users,
permissions, and custom fields before making changes". It has **20 installs**.

Both readings hurt. If 20 installs means the wedge is too new to judge, we would be entering against a
better-positioned incumbent with the same badge strategy. If it means a purpose-built, well-reviewed,
free-tier app answering exactly this question cannot find users, then the pain does not convert into
purchase.

The search gate agrees. `jira impact analysis` runs 20 a month in the US at **CPC $0.00**, and
`jira governance` 20 a month at **CPC $0.00**. No advertiser bids on either. `jira configuration
management` is the only term with money attached, 110 a month at $9.12, and its keyword cluster leans
towards asset management and CMDB intent rather than configuration hygiene.

**One correction to the prior document's reassurance.** It stated that EUR 5,000 a month sits "deep in
the long tail of this marketplace". Measured across the 1,200 most popular Jira Cloud apps, the median
app has **231 installs** and the 90th percentile has **2,048**. Needing 14 to 54 paying mid-size
customers puts the target in the upper quartile of the marketplace, not the long tail.

## 4. Verdict on candidate B: course-freshness monitor

**Rejected on demand, not on problem quality.**

The problem is probably real. The evidence in `broad-saas-niche-research-2026-08-22.md` about vendor
releases invalidating lessons is sound, and Continuity Intelligence existing proves a category. What
is missing is any way for a buyer to find us.

| Term | US volume | CPC |
|---|---:|---:|
| outdated course content | no data | no data |
| update online course | no data | no data |
| course content audit | no data | no data |
| keep course up to date | no data | no data |
| course maintenance | 90 | $4.40 |

Four of five terms return no data in Semrush, which means effectively zero. The Keyword Magic run on
`outdated course content` returned nothing at all, and the fallback root `course content` is intent
noise: students asking how to download course content from Canvas and Blackboard.

Set that against the prior document's own admission that Little Parrot's 900 registrations are
learners rather than education-business owners, and there is no channel: no search demand, no existing
audience, no marketplace. For a two-person self-serve business that needs buyers to arrive without
being sold to, that is disqualifying. Its own plan called for 30 to 40 highly qualified direct
approaches, which is the cold outbound the operating constraint rules out.

Nobody searching for a problem is not proof that nobody has it. It is proof that search cannot be the
channel, and no other channel was identified.

## 5. Verdict on candidate C: App Steward

**Keep as a content asset. Reject as the SaaS.**

This is the only candidate whose search data shows money:

| Term | US volume | KD | CPC |
|---|---:|---:|---:|
| vibe coding security | 140 | 23 | **$10.49** |
| lovable app security | 10 | 0 | $0 |
| deploy lovable app | 20 | 0 | $0 |

`vibe coding security` at 140 a month with a $10.49 CPC and easy difficulty is a genuine signal:
advertisers are paying real money for that click. The question cluster around it (`is lovable secure`,
`are lovable apps secure`, `is lovable secure enough for sensitive data`) totals about 30 a month at
near-zero difficulty.

That is a few hundred searches a month. It cannot carry EUR 5,000 a month of subscription revenue on
its own, and `broad-saas-niche-research-2026-08-22.md` was right that Lovable already tests apps and
scans security, which makes the product substitutable.

What it is good for: those questions are ideal, near-uncontested pages for Little Parrot. Low
difficulty, high commercial intent, exactly on the existing audience. That is a marketing finding, not
a product one.

### Update, later on 22 August 2026: a 242-keyword pull confirms this and sharpens it

`semrush-keyword-research-production-ready-2026-08.md` ran 242 keywords across six country databases
on exactly this niche, with SERP quality reads on an 18-keyword shortlist. It settles the verdict
above on far better evidence than the three keywords it was originally based on.

**The App Steward product vocabulary is empty.** Every phrasing of the thing the product would do
returns no data in all six databases: maintain lovable app, lovable app maintenance, update lovable
app, lovable version control, lovable rollback, lovable backup, maintain vibe coded app, ai app
developer handoff. The same holds for the launch-readiness framing (lovable production ready, is
lovable production ready, make lovable app production ready, production ready ai app) and for testing
(test lovable app, test vibe coded app, ai app testing checklist). Three whole clusters of the
product's own language have no demand under any phrasing.

**Two adjacent phrasings do have demand**, which is worth knowing because it says what the job is
actually called: ownership rather than maintenance. `can i export lovable` runs 260 a month,
`lovable import from github` 260, `lovable github` 140 to 260, and `vibe coding technical debt` 40 at
KD 0. People do not ask how to maintain the app. They ask whether they can get their code out.

**The content opportunity is larger than first thought**, and it is a marketing finding, not a product
one. The strongest gap is security: `vibe coding security` at 140 a month, KD 23, CPC $10.49, where the
entire top ten is security vendors writing for security professionals. Also winnable on low difficulty:
`lovable alternatives` 590 at KD 22, `replit vs lovable` 1,300 as a related term, `lovable vs base44`
480 at KD 15, `lovable vs bolt` 390 at KD 26, `lovable hosting` 170 at KD 28 where a Reddit question
outranks everything, and `how to connect supabase to lovable` 140 at KD 0. The course-intent cluster
combines to roughly 900 a month in the US at KD 0 to 38.

**One trap the pull correctly avoided**, and it is the same trap as section 11 of this document.
`saas security checklist` shows a CPC of **$79.72** at KD 12, which looks irresistible until the SERP
is read: Stanford IT, CrowdStrike, Oracle. That is IT procurement money for evaluating vendors, not a
founder securing their own app. High CPC belonging to a different buyer is a mirage, exactly as with
`asset and configuration management` at $50.63. Always read the SERP before believing a CPC.

**Identity framing is confirmed dead as an SEO target.** All 13 identity keywords return zero volume
in all six databases, including vibe coding for women, women building apps, female founders building
apps and ai tools for female founders. That is brand and conversion copy, never a search target.

## 6. Recommended niche and product

> **Organisations running Jira Cloud alongside Google Workspace, whose Google Chat, Drive, Calendar and
> Gmail connections to Jira are broken, abandoned or missing.**

### The finding

Compare two ecosystems inside the same marketplace.

**Microsoft to Jira is owned.** yasoon's "Microsoft 365 for Jira & JSM (Teams & Outlook)" has **7,100
installs at 4.62 stars from 196 reviews**, priced at **$3,800 a year for 100 users**, which is $3.17
per user per month. A specialist vendor built a real business by being the good Microsoft bridge, and
did it while Microsoft maintained its own first-party presence.

**Google Workspace to Jira is owned by nobody.** The largest app in the slot is broken:

| App | Vendor | Installs | Stars | Reviews | Deployment | Last release |
|---|---|---:|---:|---:|---|---|
| Google Chat for Jira Cloud | Google LLC | **10,990** | **2.30** | 109 | Connect (1.1.0-AC) | **11 Nov 2021** |
| Google Drive Connector for Jira Automation | ikuTeam | 1,854 | 4.73 | 14 | Forge | Aug 2026 |
| Google Drive & Docs for Jira | Bilith | 1,258 | 4.04 | 35 | Connect | Mar 2026 |
| Issue Events: Google Calendar integration | Appfire | 1,136 | 3.52 | 22 | Forge | May 2026 |
| Google to Jira (Gmail, Calendar, Drive, Chat) | Futurate | 1,088 | 3.85 | 63 | Connect | Oct 2022 |

Running the slot audit with the corrected whole-token filter returns 6 apps genuinely in the Google
Chat slot and **no credible alternative** at the threshold of 200 installs and 4.2 stars. Nobody has
fixed it.

### The reviews say what is wrong

Spanning July 2024 to August 2026, and the most recent is from this month:

> "Doesn't work. Impossible to set up. Requires me to turn off security settings in order to enable."
> (1 star, August 2026)

> "It does not work. Integration fails with no indication on why or how to fix it." (1 star, June 2025)

> "Doesn't work. Error in last step. There was an error processing your request." (1 star, April 2025)

And, unprompted, the users name the benchmark and the missing features themselves:

> "Please provide the same fucntion as the slack integration at least" (1 star, July 2024)

> "I would only like to look at notifications whereever I'm tagged, watching, assigned or reportee of"
> (1 star, August 2025)

> "there was no way to configure it to only receive notifications when a Jira card is changed from
> status A to status B" (2 stars, July 2024)

Setup failing at the final step recurs across two years on an app with no public release since
November 2021. The feature requests are specific, small and buildable.

### Why the price is not zero

The obvious objection is that this app is free, so its 10,990 installs measure demand at a price of
zero. Three comparables say otherwise:

| Paid app | Installs | Stars | Price per user per month |
|---|---:|---:|---:|
| Microsoft 365 for Jira & JSM (yasoon) | 7,100 | 4.62 | $3.17 |
| Slack Integration+ for Jira (Appfire) | 2,745 | 4.64 | $1.27 |
| Slack Connector for Jira (WISOFT) | 1,195 | 3.38 | $4.00 at 10 users |

The WISOFT line is the most useful. A mediocre paid Slack connector, rated 3.38, with no release for
640 days, still holds 1,195 installs. Paid chat bridges coexist with Atlassian's own free Slack
integration by being better at filtering and two-way actions, which is precisely what the Google Chat
reviewers are asking for.

### The product

> **The Google Workspace bridge for Jira. Start with Chat notifications people can actually control.**

First sellable version, deliberately one slot wide:

1. A Forge-native Jira to Google Chat connection whose setup completes without disabling security
   settings, which is the single most repeated complaint.
2. Notification rules that answer the stated requests: only when I am assignee, reporter, watcher or
   mentioned; only on a named status transition; only for chosen projects, issue types or priorities.
3. Two-way actions from the Chat card: comment, transition, assign.
4. Digest instead of firehose, per space and per person.

Then, and only then, extend along the slot: Drive and Docs attachments, Calendar, Gmail to issue. Each
extension is a slot where the current best app rates under 4.1 or has not been released since 2022.

The AI extension is deferred and designed for: a Rovo agent that summarises an issue thread into the
Chat card and drafts a reply. The customer's pooled Rovo credits pay for that inference, not us, which
removes the margin problem that kills most standalone AI products.

### Verified platform economics

All figures below were read directly from Atlassian's own pages on 22 August 2026. See appendix A for
the one claim that could not be verified.

**Revenue share**, from "Updates to Marketplace Revenue Share: 2026":

- From 1 January 2026, partners pay **0% revenue share on eligible Forge earnings up to $1 million**
  lifetime, aggregated across all of a partner's eligible Forge apps.
- Connect rose to 20% on 1 January 2026 and **rises to 25% on 1 July 2026**.
- Standard Forge went to 16% on 1 January 2026 and 17% on 1 July 2026.
- Eligibility requires Forge modules, Forge authentication and Forge UI. An app using a Forge manifest
  that still contains Connect modules gets the Connect rate.

**Who pays for the AI**, quoted from the Forge platform pricing page:

> "Rovo billing is managed at the customer organization level, so Marketplace partners are not
> responsible for the AI usage costs of their Rovo agents. Every paid Jira, Confluence, or Jira
> Service Management subscription includes a pooled allowance of Rovo credits and indexed objects."

This is the fact that removes the margin problem which kills most standalone AI products.

**Forge runtime limits**, from the invocation limits page:

| Limit | Value |
|---|---|
| Synchronous runtime, including UI modules | 25 seconds |
| Async events and scheduled triggers | 900 seconds, default 55, extended via `timeoutSeconds` |
| Web-trigger, action and `rovo:agentConnector` modules | 55 seconds |
| Invocations per user, per install, per app, each per minute | 1,200 / 5,000 / 30,000 |

**Forge platform costs.** Forge is now consumption-billed, with invoices from 1 February 2026 for
January usage. Free monthly allowance per app: 200,000 GB-seconds of compute, 730 GB-hours of SQL
storage, 1 GB of log writes and 0.1 GB each of key-value reads and writes. Overage runs at $0.000025
per GB-second of compute and $1.09 per GB of key-value writes, so writes are the line to watch.

A notification bridge sits comfortably inside all of these, which is a far lower technical risk than
the configuration dependency graph candidate A required. The incumbent here is Connect, so it faces
25% revenue share from 1 July 2026 while we would be eligible for 0% and the Runs on Atlassian badge.

## 7. What the niche will pay for, ranked

Ranked by how often it appears in the review corpus and how directly it blocks work.

| # | Pain | Evidence | Product implication |
|---:|---|---|---|
| 1 | **Setup does not complete.** | "Error in last step", "configuration fails", "requires me to turn off security settings", recurring 2024 to 2026 | Installation is the product. A setup that finishes is the whole first release |
| 2 | **Notification firehose with no filter.** | Users ask for assignee, watcher, mention and reportee filters by name | Rule builder, per person and per space |
| 3 | **No status-transition targeting.** | "only receive notifications when a Jira card is changed from status A to status B" | Transition-scoped rules |
| 4 | **Parity with the Slack experience.** | "Please provide the same fucntion as the slack integration" | Two-way actions from the card, not read-only alerts |
| 5 | **Field selection.** | "wish we could update the fields we are notified with" | Configurable card payload |
| 6 | **The app is dying.** | Connect, no release since Nov 2021, revenue share to 25% on 1 July 2026, support ending | Runs on Atlassian badge as the visible trust answer |
| 7 | **Nothing joins Drive, Calendar and Gmail.** | Best-in-slot apps rate 3.52 to 4.04, or last shipped Oct 2022 | The roadmap after Chat |

The underlying desire is not notifications. It is for the two systems a company already pays for to
stop being separate.

## 8. Route to EUR 5,000 a month

Priced at yasoon's demonstrated rate of $3.17 per user per month:

| Customer size | Monthly revenue each | Customers needed for ~EUR 5,000 |
|---|---:|---:|
| 100 users | $317 | **17** |
| 50 users | $158 | **34** |
| 25 users | $79 | **68** |

Against a measured pool of 10,990 organisations that already installed something for exactly this job,
17 to 68 paying customers is a conversion of roughly 0.15% to 0.6%. This is the first time in these
four documents that the required customer count has been set against a measured pool rather than an
estimated market.

At 0% revenue share up to $1 million lifetime, that is EUR 5,000 gross and EUR 5,000 net. The plan
must still survive 17%, which it does at 20 to 80 customers.

## 9. Validation plan

Do not build the full product first. In order:

1. **Size the pool, week 1.** The weakest number here is how many of those 10,990 installs are live.
   Cross-check the Jira app's install count on the Google Workspace Marketplace, which is a second
   independent counter. Then ask directly in the Atlassian Community and in Google Workspace admin
   communities: are you running Jira Cloud with Google Chat, and does the integration work.
2. **Ship the thinnest working bridge, weeks 2 to 4.** Notifications only, filters only, free, listed
   in the marketplace. Marketplace review takes 10 to 15 business days, so start it early. **In a
   marketplace, install velocity is the demand test**, and it costs nothing but the review queue. This
   is the cheapest real test available in any of the four documents, and it is available precisely
   because the channel is a marketplace rather than cold outbound.
3. **Add the paid tier, weeks 5 to 8.** Two-way actions and advanced rules behind $2 to $3 per user
   per month, free up to 10 users to match the category norm. Free installs measure demand; paid
   conversion measures willingness to pay.

**Continue if:** the free app passes roughly 200 installs in its first eight weeks, reviews name the
setup fix as the reason, and paid conversion clears 3% of installs.

**Reject if:** installs stall under 50, which would mean the 10,990 are dormant; or Google announces a
Forge rebuild; or the Google Chat API cannot support the setup flow without the security exception
users complain about, since that would mean the top complaint is unfixable by anyone.

## 10. Risks, honestly

1. **Google could rebuild it.** The Connect sunset forces a decision on them, and if they rebuild it
   will be free and we are finished. This is the biggest risk and it is not eliminated. What softens
   it: they have left it untouched for four years and nine months, and the Microsoft precedent shows a
   specialist reaching 7,100 installs at 4.62 stars while the platform vendor maintained its own
   first-party app. The roadmap beyond Chat is also ground where Google ships nothing.
2. **Install counts are not active users.** 10,990 installs of a broken app overstates live demand by
   an unknown factor. Step 1 of section 9 exists only to correct this.
3. **Google Chat is smaller than Slack or Teams** inside the Atlassian customer base, and by how much
   is not measured anywhere in this document. It is the largest unknown after risk 2.
4. **A second gatekeeper.** Publishing a Google Chat app needs a Google Cloud project and Google's own
   review, on top of Atlassian's 10 to 15 day queue.
5. **Free-baseline expectations.** Atlassian's own Slack integration is free, which anchors some
   buyers at zero. The three paid comparables in section 6 are the counter-evidence, not a guarantee.
6. **Double platform concentration.** The business would sit on Atlassian's marketplace terms and
   Google's Chat API at the same time. That is a conscious choice, and it is a worse concentration
   than candidate A carried.
7. **The 0% incentive is temporary** and revocable on six months' notice. The plan survives 17%.

## 11. Runner-up, and one unexpected signal

**Runner-up: the same audit applied to the other unserved slots.** The instrument found nine slots
with proven demand, a poor official app and no credible alternative: Sentry (16,359 installs, 2.47
stars), Zendesk (13,073, 3.36), Miro (12,456, 3.89), TestRail (10,523, 3.78), Clockify (9,147, 3.94),
Zeplin (4,753, 3.89), PagerDuty (4,083, 3.62), CircleCI (3,898, 2.85). Sentry is the loudest and the
weakest business: its reviews are two years of the configuration page failing to load because of an
ad-blocker conflict, which is neglect rather than an unmet need. Zendesk to Jira is the one worth a
second look, because the support to engineering handoff is a workflow with budget behind it.

**Unexpected signal, worth its own pass.** The Keyword Magic run on `jira configuration management`
did not return configuration-hygiene intent. It returned IT asset management and CMDB intent, at CPCs
far above anything else measured in this document:

| Term | US volume | CPC |
|---|---:|---:|
| jira asset management | 390 | $5.93 |
| jira cmdb | 140 | $9.48 |
| asset service management | 110 | $11.72 |
| it asset and configuration management | 50 | $10.94 |
| asset and configuration management | 70 | **$50.63** |

A $50.63 CPC is the strongest willingness-to-pay signal anywhere in this research. It was found by
accident, sits next to a native Atlassian feature (JSM Assets) and an established app category, and
was not investigated. It should not be acted on from this document, and it should not be forgotten.

## 12. What was not done

- **Keyword Planner was never reached.** All volume data is Semrush, single-source.
- **The field was reopened inside the Atlassian Marketplace, not across all verticals.** The audit was
  systematic within one channel. A comparable sweep of monday.com, HubSpot, Slack, Notion or Figma
  marketplaces was not run, and the non-marketplace verticals set aside in
  the deleted `saas-niche-search-2026-08.md` were not revisited, and are listed in appendix A. The
  instrument in section 2 is
  channel-agnostic in method but currently coded for Atlassian.
- **No buyer has been spoken to.** Every conclusion here is desk research against public counters.
- **The ITAM and CMDB signal in section 11 is unexamined.**

## Sources

Platform terms, verified 22 August 2026:

- [Updates to Marketplace Revenue Share: 2026, Atlassian](https://www.atlassian.com/blog/development/updates-to-marketplace-revenue-share-2026)
- [Forge platform pricing](https://developer.atlassian.com/platform/forge/forge-platform-pricing/)
- [Runs on Atlassian](https://developer.atlassian.com/platform/marketplace/runs-on-atlassian/)

Measured data, Atlassian Marketplace REST API, 22 August 2026, via
`../marketing/channels/niche-research-tools/marketplace-supply-audit.py`:

- Catalogue: 1,200 most popular Jira Cloud apps, install counts, ratings, deployment type, release
  dates and live pricing
- [Google Chat for Jira Cloud](https://marketplace.atlassian.com/apps/1218638/google-chat-for-jira-cloud) and its review corpus
- [Microsoft 365 for Jira & JSM, yasoon](https://marketplace.atlassian.com/apps/1215035/microsoft-365-for-jira-jsm-teams-outlook)
- [Impact Analysis for Jira, Stable Point IO](https://marketplace.atlassian.com/apps/4251492671/impact-analysis-for-jira)
- [Configuration Manager for Jira, Appfire](https://marketplace.atlassian.com/search?query=configuration%20manager&product=jira)
- [Git Integration for Jira, GitKraken](https://marketplace.atlassian.com/search?query=git%20integration&product=jira), 8,698 installs at 4.41 stars, the proof that a third party can monetise a badly served slot

Search demand:

- `semrush-keyword-research-jira-2026-08.md`, this folder

Prior passes arbitrated here:

- `broad-saas-niche-research-2026-08-22.md`,
  `niche-research-codex/little-parrot-target-niche-and-saas-opportunity.md`
- `saas-niche-search-2026-08.md`, deleted on 22 August 2026 at the founders' request. It had never
  been committed, so it is **not recoverable from git**. Everything kept from it is in appendix A;
  everything else is gone.

---

## Appendix A: material rescued from the deleted niche-search document

`saas-niche-search-2026-08.md` was deleted on 22 August 2026 at the founders' request, on the grounds
that its session reached neither Reddit nor Search Console. Two notes on that reasoning, recorded so
the same call can be made better next time. Search Console would not have helped, because it reports
queries only for sites we already own and says nothing about a market we are not in. Reddit was
reachable in this session and proved noisy for this question: a search on stated willingness to pay
returned founders asking each other hypotheticals, not buyers describing costs.

Its actual weakness was the supply read. It measured Salto at 182 installs and concluded the category
was open, without measuring Appfire's Configuration Manager at 4,400 installs or noticing that the
proposed wedge was already shipped. Section 3 of this document records that correction.

The file had never been committed to git, so this appendix is the only surviving record of it. What
was kept is below. What was not kept, and is now gone: its ranked list of Jira administrator pains
with verbatim quotes from the Atlassian Community forums, its per-user pricing hypothesis, and its
three-week validation plan. None of those supports a live recommendation after section 3, which is why
they were not carried over.

Its channel analysis was sound and is the reason this document still recommends an Atlassian
Marketplace app. The parts worth keeping:

### The claim that could not be re-verified

The deleted document stated that only Forge apps could be submitted from 17 September 2025, that
Connect descriptor updates halted in March 2026, and that Connect end of support begins in Q4 2026.
**None of those three dates was re-verified in this session.** What was confirmed is that "Connect End
of Support (EOS)" is a real, named Atlassian programme, referred to on
<https://developer.atlassian.com/platform/forge/adopting-forge-from-connect/>, and that Connect
revenue share reaches 25% on 1 July 2026.

This matters for how section 6 is read. The recommendation does not depend on the EOS date. The
incumbent Google Chat app has had no public release since November 2021 and is broken today, which is
the opportunity on its own. The EOS date only affects urgency, so **verify it before using it as a
deadline in any pitch or plan.**

### Alternative marketplaces, as assessed in August 2026

Not re-verified in this session. Useful as the starting point if the Atlassian route is abandoned.

| Ecosystem | Apps listed | Platform take | Buyer |
|---|---|---|---|
| Atlassian | ~7,670 total, 5,083 Jira, 2,223 Confluence | 0% for eligible Forge to $1M, else 16 to 17%; Connect 20 to 25% | Mid-market and enterprise IT, per-user budget |
| monday.com | 869, of which 704 monetised | 0% to $200k lifetime, then 15% | SMB and mid-market, lower per-seat budget |
| HubSpot | ~2,000 | No listing fee, no revenue share | SMB and mid-market revenue teams |
| Shopify | 17,600, plus 564 in 30 days | 15% and up | Price-sensitive SMB merchants, saturated |
| Xero | n/a | Revenue share retired 2 March 2026, replaced by connection and data-egress fees the developer pays | Small business and accountants |
| Airtable | n/a | No native revenue share, developer handles billing | Mixed |
| ClickUp | n/a | No disclosed monetisation | Mixed |

monday.com was its strongest second option: the least crowded real marketplace found, at 869 apps
against Atlassian's 7,670, with native monetisation and 0% take to $200,000 lifetime.

### Non-marketplace candidates it set aside, and why

Listed so they are not rediscovered from scratch. None was revisited in this pass.

| Candidate | Willingness to pay | Why it was set aside |
|---|---|---|
| Vertical SaaS for small manufacturers and job shops | High, $49 per user per month to $3,000 per user per year | Needs domain knowledge the team lacks, on-site discovery and cold outbound |
| Recruitment and staffing agency tooling | Proven, $19 to $119 per user per month | The complaint implies rebuilding an ATS, too large for two people, no wedge |
| Agency and professional-services automation | Weak, $4 to $21 per user per month | Crowded and cheap, good products exist |
| Xero or QuickBooks ecosystem app | High buyer budget | Developer economics inverted on 2 March 2026 |

### Marketplace scale, as estimated in August 2026

Ampin estimated $127M a month across the marketplace, $88.2M of it Jira. Aventis Advisors
independently estimated $1.8 billion of marketplace revenue in 2024 across 8,000+ apps, growing at 19%
CAGR since 2021. Ampin annualises to about $1.5 billion, the same order of magnitude by a different
method. Ampin states plainly that its figures are estimates and not actual revenue data. Use for
ranking only, and prefer the install counts measured in section 6 wherever a decision depends on it.
