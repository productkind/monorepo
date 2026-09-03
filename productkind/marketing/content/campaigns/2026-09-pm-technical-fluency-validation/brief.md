---
status: drafted
campaign: pm-technical-fluency-validation-2026-08
brand: little-parrot
channels: [tiktok, instagram, youtube-shorts, linkedin]
---

# PM technical-fluency messaging experiment

## Objective

Test whether the five problem territories identified in the PM technical-fluency research attract non-technical software Product Managers and whether those visitors leave an email address on the proposed Little Parrot course page.

## Audience

Practising, generalist software Product Managers without a software-engineering background. Little Parrot's channel signals continue to prioritise women in product and women in tech.

## Research-backed pain points

1. Trace the product end to end: understand how a user action, request and data move through the frontend, backend, database, application programming interfaces (APIs) and external systems.
2. Make the route from change to user legible: follow a change through review, tests, environments, deployment, release controls and rollback.
3. Investigate before escalating: reproduce a problem, gather evidence, narrow the likely failure area and write a useful escalation.
4. Spot technical consequences before commitment: expose dependencies, failure modes, reversibility and technical debt before recommending scope or a trade-off.
5. Build to learn and know where production starts: create a bounded prototype with artificial intelligence (AI), test an assumption and hand it over with explicit security, quality and maintenance limits.

## Video scripts

The eight video scripts and the rules behind them are in
[videos.md](videos.md), one folder per video. They were written after this
brief and they don't match the content design below: there are eight of them
rather than 25, each is a single 44 to 50 second cut used on all four channels,
and none of them teaches a method. Kinga's direction was to raise a situation
the viewer recognises and show the transformation instead, because the teaching
sequences were where a viewer left. Treat the section below as the original
plan and `videos.md` as what is being made.

## Content design (original plan, superseded for video by videos.md)

- Five short vertical videos per pain point, 25 posts in total.
- One shared 35–60 second script for TikTok, Instagram Reels and YouTube Shorts.
- A platform-specific caption for TikTok, Instagram, YouTube Shorts and LinkedIn.
- Each post teaches one usable question, checklist, distinction or small method before asking for an email sign-up.
- Each opening uses an exact or near-exact Google/YouTube search phrase documented in the research. Search phrases are spoken, shown on screen and repeated naturally in the captions.

## Destination and attribution

**Destination for the video scripts:** `https://littleparrot.app/guides/technical-product-manager`, the "Become a Technical Product Manager Without Becoming an Engineer" waitlist page. It is built (`src/pages/TechnicalProductManagerWaitlist.tsx` in the app repo), it reads `utm_source`, `utm_medium`, `utm_campaign` and `utm_content` and saves them with the signup, and it shows the price under test straight after sign-up. All eight video scripts point here.

**Superseded, kept for the record:** the research proposed `https://littleparrot.app/courses/technical-skills-for-product-managers`, and on 27 August 2026 that URL returned HTTP 200 while rendering the generic Little Parrot homepage. That blocker is resolved by the `/guides/technical-product-manager` page above rather than by fixing the old route. The two large caption files in this folder were drafted against the old URL and the 25-post plan, so re-check their links before anything goes out.

Campaign: `pm-technical-fluency-validation-2026-08`

Every LinkedIn link and TikTok/YouTube pinned-comment link has `utm_source`, `utm_medium=organic-social`, `utm_campaign` and a unique `utm_content` value. For Instagram, set the post's tracked URL as the first bio link while the Reel is active. Confirm the route and email form work before publishing because the research defines the slug but does not prove the page is live.

## Success measures

- Primary: unique email sign-ups by pain point and post.
- Secondary: landing-page visits, visitor-to-sign-up rate, qualified comments that describe the same problem, saves, sends, full-watch rate and profile-to-link clicks.
- Do not use raw views as proof that a pain point is commercially useful. Compare sign-up conversion and the language in replies.
- Keep the production variables as consistent as possible: presenter, framing, approximate duration, posting time range and CTA placement.

## Source material

- `productkind/ai-research/pm-technical-fluency/pm-technical-fluency-opportunity-synthesis-2026-08.md`
- `productkind/ai-research/pm-technical-fluency/pm-technical-fluency-observed-search-phrases-2026-08.md`
- `productkind/ai-research/pm-technical-fluency/pm-technical-fluency-search-demand-analysis-2026-08.md`
- `productkind/ai-research/pm-technical-fluency/pm-technical-fluency-seo-course-messaging-2026-08.md`
