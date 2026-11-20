# What the tech PM competitors teach us: course and marketing

**Date:** 20 November 2026 **For:** Kinga and Tamas **Course:** How Your Product Works: Technical Foundations for Product Managers (first cohort Tuesday 19 January 2027) **Builds on:** the [course design](../../../little-parrot/content/course/technical-skills-for-product-managers-learning-journey-design.md) and the [willingness-to-pay research](pm-technical-fluency-willingness-to-pay-2026-08.md), which already covered Tech for Product's prices, ratings and Maven case study.

## Sources read on 20 November 2026

| Source | What it is |
| --- | --- |
| [maven.com/tech-for-product/tech-fundamentals](https://maven.com/tech-for-product/tech-fundamentals) | Colin Matthews' Technical Foundations course page on Maven |
| [maven.com/tech-for-product](https://maven.com/tech-for-product#courses) | His Maven profile: courses, workshops, free lightning lessons |
| [techforproduct.com](https://techforproduct.com/) and its pricing page | His own site, aimed at teams |
| [blog.techforproduct.com/archive?sort=top](https://blog.techforproduct.com/archive?sort=top) | His Substack, top posts, three read in full |
| [Maven case study of Colin Matthews](https://help.maven.com/en/articles/14473433-how-colin-matthews-turned-daily-frustrations-at-work-into-two-of-mavens-highest-converting-courses-no-audience-required) | How he grew with no audience (April 2026) |
| [Lenny's Newsletter: Become a more technical PM](https://www.lennysnewsletter.com/p/become-a-more-technical-product-manager) | Colin's guest post, March 2024; paywalled after the APIs section |
| [Aakash Gupta podcast with Andre Albuquerque](https://www.aakashg.com/albuquerque-podcast/) | "4 Levels to Become a Builder PM", May 2026 |
| [Aakash Gupta: Tech for Product Managers](https://www.aakashg.com/technical-skills-for-product-managers/) | His guide, published 17 November 2026 |

## 1. What the landscape looks like now

- **Colin's Technical Foundations course is closed.** The Maven page says "This course is no longer available." His own site still lists it at $799, but every new course he runs is about AI: AI Prototyping for PMs ($1,450), Vibe Code Production-Ready Side Projects, Become an AI-Native Builder, and 30+ free lightning lessons on Cursor, Replit, Supabase and Claude. The best-known foundations course has stopped running cohorts. The foundations topic is not taken; its best-known teacher moved on from it.
- **The market now joins foundations with building with AI.** Aakash's guide (three days old) defines tech for PMs as "knowing enough to build prototypes and internal tools with AI and to judge what engineers ship." Andre Albuquerque's four levels: Lovable, then Lovable and Claude Code sharing a GitHub repo, then Claude Code with branches and Vercel preview links, then CLAUDE.md, agents and skills. Aakash's own line: "learning Claude Code means nothing without an understanding of the first principles underneath it."
- **Nobody teaches the part in between.** Andre's demo skips pull request review and merges straight to main ("just vibe coding this on our own"). Tyler Folkman, in the same guide, warns that PMs pushing code creates "shadow work" for engineers unless the team has decoupling, good APIs, CI/CD and tests. The podcast never covers the command line, environments or testing. That gap (what happens between your change and your customers, and how to not be a burden on the team) is exactly what our missions 1, 4 and 5 teach.
- **Colin's start was small.** First cohort: 5 students, 2 real sales. Cohorts 2 to 5: 15 to 30 students, all from Maven's marketplace, with no marketing and no social posting. He planned 4 to 5 cohorts before judging a course ("One cohort wasn't a test for him") and estimates a 20% hit rate on everything he has tried. His own words: the difference between someone you think is so smart and yourself is "maybe 6 to 12 months of applied effort."

## 2. Where our course is already stronger

|  | Tech for Product (Technical Foundations) | Lenny guest post (same author) | Aakash and Andre | Ours |
| --- | --- | --- | --- | --- |
| Shape | 90+ bite-sized lessons in four topics: architecture, APIs, SDLC, system design | Client, server, database, then APIs | Four levels of tools | One real product, one story, one decision |
| Hands-on | One project a week; no tools named on the page | One API request to OpenAI with a paid key | A personal Lovable project, then Claude Code | Run Twenty, trace a real bug, send API requests, catch a webhook, merge a pull request, roll back, query the data |
| Work transfer | Not mentioned | Not mentioned | "Monday morning move": build an old backlog item on a branch | A Monday move after every mission |
| Teachers | Two PMs | One PM | One PM-turned-builder | A lead PM and a principal engineer |

The PM-and-engineer pair is the one thing none of them can copy. Every other course is a PM explaining engineering. Ours has an engineer in the room saying what engineers actually want from a PM.

## 3. What to take for the course

### 3.1 An AI agent in every mission, as part of technical understanding

**Decided by Kinga on 20 November 2026:** an AI agent is part of every mission. The course isn't about using AI for PM work. Working with an AI agent is part of technical understanding now, and knowing how the product works is what lets a PM brief an agent well and check what it did. So PMs come out more confident with AI as well.

Today every mission has an AI step, but only Mission 1 uses an agent on the code (the Copilot fix). Missions 2 to 6 use an AI chat assistant to explain or draft. The change is to swap the chat for a coding agent working on the learner's copy of Twenty, which can open the files, and to make each step the same habit Mission 1 and the free course already teach: **predict, brief the agent, check its work against what you found yourself.** The mission's concept is what the learner needs for both the brief and the check.

| Mission | The agent step | What the learner checks, and the concept it rests on |
| --- | --- | --- |
| 1. Saving doesn't work | Already there: the bug report goes to the agent, which fixes the code | The fix against the bug report's expected behaviour, including a normal save |
| 2. The whole system | Ask the agent what runs and which third parties the product sends data to, from the code | Its list against the services you watched start in the log. Where it misses something set in configuration rather than code, that's the lesson: the agent reads the code, not the running system |
| 3. APIs and webhooks | Ask the agent "does our API support this?" for Tall Order Co.'s integration, with pointers to the code, then have it write the request | Send the request yourself; when a field is wrong, the 400 response tells you what to fix. This is item 4 of Mission 7's menu, moved into the mission |
| 4. "It works for me" | Give the agent only the customer's words, then your evidence (the stale local storage value) | The first answer is a plausible guess, often "clear your cache"; the second finds the code that caches the currency. Mission 5 then compares the agent's fix with the one the team merged |
| 5. Deployment | Sitting 2: the agent makes your change on a branch and opens the pull request; when a check fails, give it the check's log | You decide, the agent types: read the preview, merge, see it live, then roll it back. Andre's level 2 and 3, with the review and checks his demo skipped |
| 6. Analytics | Ask the agent which events the onboarding checklist sends, from the tracking code, then for the SQL query | Reading the code, the agent can find the renamed event that a chat assistant misses. It can't know the panel counts internal test accounts: the agent knows the code, not the business |
| 8. The decision | Already there: the agent assembles the evidence pack from the lab outputs | Every claim against its source, timed including the checking |

**Three things to decide or check before it goes in the design:**

1. **Mission 5's sitting 2 is full-lane only today.** If the agent making a change and taking it through review is the course's "build with AI" moment, it belongs in the essentials lane. That adds about 35 minutes to week 2's essentials, so something else in the week moves to the worked answer.
2. **GitHub Copilot's free plan limits.** Mission 1 uses the free plan in the codespace. Six more missions of agent requests may hit its monthly limit; the course-tool-researcher should check the current numbers. Learners who pay for another agent (the free course's setup questions already record which) can use their own.
3. **Mission 7's menu shrinks.** Questions about the codebase move into Mission 3, so the week 3 Monday move menu keeps the other four.

This also gives the course page a sharper promise than any competitor has: **know how your product works well enough to work with AI agents on it, and to judge what engineers and agents ship.** The PM motivation stays in front (confidence in technical discussions, better questions, judgement), and confidence with AI follows from it. Following our rule on not overselling, the page should only say this once the agent steps are in the missions.

### 3.2 Name the tools on the course page

Colin's course page names no tools at all. Ours can list what learners touch: GitHub, a terminal, a development environment, staging, CI checks, browser developer tools, SQL and an AI coding agent. For a PM, a list of real tools is proof that the course is hands-on, and it doubles as the search terms people type. The free "Run Your Product on Your Laptop" course covers the command line on their own laptop, so the page can point there too.

### 3.3 A reference layer, cheap to build

Colin bundles a library around the cohort: a 50-question FAQ, a jargon glossary, a system design gym and interview prep. His second most popular post is "Technical jargon for PMs: the ultimate collection of engineering terms and what they mean". We already have two glossaries in toolkit items (`vibe-coding-tech-00/toolkit-software-vocabulary-cheat-sheet.md` and `vibe-coding-github-00/toolkit-builders-workspace-glossary.md`). One glossary of the terms PMs hear in standups, organised by the course's missions, would work as a course toolkit item, and as a light first step for people who aren't ready to install anything (section 5).

Skip interview prep. Our buyer is a working PM whose company pays, and interview prep says "this helps you leave".

### 3.4 Keep the page consistent

Colin's Maven page contradicts itself twice: two refund deadlines and two session times. His own site has typos and leftover template text. Our single source (`little-parrot-awakens/src/content/technicalPmCourse.ts`) already prevents this; it's worth keeping that discipline when the course page and emails multiply.

## 4. What to take for marketing

### 4.1 Phrasing and techniques worth borrowing

- **Name the pain with a dignified way out.** Lenny's intro: "If you've been embarrassed, or too busy, to ask your engineers how all this works, this post is for you." "Or too busy" lets an experienced PM admit the gap without feeling judged. Our version can pair the research quote ("nodding along in standups") with a reason that isn't a failing: nobody ever showed you the product under the surface.
- **Use the real words from meetings.** Colin's opener lists the jargon PMs get lost in ("rate limits", "microservices"). Our missions give us better ones: "it's in the worker queue", "it's merged but not deployed", "works for me", "the flaky test". Specific words beat "technical jargon".
- **The teacher's own struggle.** Colin tells the story of failing his first software engineering interview. Our teacher note says the course starts where Kinga started; one concrete moment from Kinga's own early days in tech would carry it further.
- **The three-part team pitch.** Colin's team page frames the buyer's problem as more complexity, higher expectations, fewer resources. That is the head-of-product's view, and a team page in that language would support the employer-paid bet.
- **Hands-on content gets shared.** Colin's Lenny post had an exercise in the body (send a real API request). Our toolkit item on the network tab already works this way, and so should every guest post.

- **"In the AI era" in the title.** A friend who runs a Maven workshop saw more sign-ups after adding it, although the workshop isn't about AI (heard 20 November 2026; one workshop, no numbers). With an agent in every mission it would be true of our course, so it isn't bait. Test it before renaming: put it on the free online workshop's listing, or a Maven lightning lesson, and compare sign-ups with the Lisbon workshop's title. If it wins, add it to the subtitle and keep the course title, so existing links and the course name stay.

### 4.2 Phrasing to leave alone

"Superpower", "10x their impact", "secret sauce", "level up", and Aakash's fear framing ("bureaucrats stuck in Jira", "you're being left behind"). None of it fits a grounded, kind register, and the fear framing talks down to the experienced reader we write for.

### 4.3 Channels, ranked by the evidence

1. **Maven's marketplace.** It brought Colin 15 to 30 students a month with no marketing, because people search there for this topic, and his foundations course is no longer there to catch those searches. Decision 5 in the course design (our own site or Maven) deserves another look with this in mind. A middle option: run free Maven lightning lessons that point to our own course page, to test the marketplace's reach before moving the course.
2. **A guest post in a large newsletter.** Colin's Lenny post was his turning point, and inbound from other newsletters (one of about 150,000 subscribers) and company training requests followed it. Lenny contacted him, not the other way round, after seeing his Maven visibility. A hands-on guest post pitch: "Follow one failed click to the database: how to read a bug like an engineer", with the network tab exercise in the body.
3. **Podcasts with a counter-angle.** Aakash's show has guests who run courses for builder PMs. Our pitch is the part his last episode skipped: "What a PM needs to know before pushing code to the team's repo", told by a PM and a principal engineer together. It builds on Andre's levels and Tyler's shadow-work warning instead of contradicting them.
4. **Free weekly live sessions.** Colin teaches a free 30-minute live session every week. We already have Mission 1 as a 90-minute workshop and a 20 to 30 minute conference talk; a 30-minute online version on a fixed weekday would give every LinkedIn post and podcast appearance somewhere to send people that week.
5. **Conference talks.** The design's conference format (start the app, walk the trail, run the AI fix live, audience predicts by phone poll) is ready. The Lisbon workshop is the proof to put in pitches.

A speaker kit makes 2 to 5 faster: three talk and episode angles, a short and a long bio for both of you, two photos, the Lisbon workshop as proof, and the free workshop as the follow-up offer.

## 5. A sequence to warm visitors into customers

Colin's funnel is three steps: a free 8-day email course on APIs, then the cohort, then a content library. **Ours is the free course "Run Your Product on Your Laptop"** (`little-parrot/content/course/technical-pm-local-setup-00/`), decided as the warm-up on 20 November 2026. It is stronger than an email course: the learner uses our product for four weeks, gets Twenty and a coding agent working on their own laptop, and meets the paid course's missions at the moment each one comes up ("Left for the paid course"). An email course only describes the experience; this one lets people have it.

What competitors suggest for the warm-up around it:

- **One door for everything.** The course page, LinkedIn posts, podcast and guest post links, and conference QR codes all lead to the free course, each with its own UTM, so we can see which channel brings learners who go on to buy.
- **Dates in the weekly emails, not the course.** The course stays open after launch, so its text has no dates. Its weekly emails can carry the paid course's dates: the early-bird deadline (Monday 14 December), the free online workshop (Wednesday 13 or Thursday 14 January) and enrolment closing (Friday 15 January). Someone who starts the free course after mid-November reaches week 4's "What's next" after the early bird has ended, so the earlier emails should mention it too, as one line, not a sales block.
- **The agent thread runs through both courses.** The free course teaches the agent in ask mode and leaves "using the agent to change code safely and take a fix through review" for Missions 4 and 5. With an agent in every mission (section 3.1), that hand-over becomes the free course's strongest reason to keep going.
- **A light door for people who can't install yet.** The free course needs installs and an access request, and some PMs on locked company laptops can't start it straight away. The glossary (section 3.3) and the existing "Investigate a Bug in the Network Tab" toolkit item work in any browser, so posts and talks can offer those as the first step, with the free course as the next.

## 6. Suggested order of work

1. Write the agent step into each mission in the course design (section 3.1), and decide on Mission 5's lane, because the course page promise depends on it.
2. Update the course page once the design has the agent steps: the mission descriptions, "Will I learn to code?" and the tools learners use (section 3.2).
3. Add the paid course's dates to the free course's weekly emails (section 5).
4. Look again at Maven, at least for free lightning lessons (section 4.3).
5. Put together the speaker kit and pitch one newsletter and one podcast.

## What we couldn't read

- The second half of the Lenny post (SDLC onwards) is paywalled.
- The titles of Colin's free weekly sessions are in an image.
- Maven's expense page and the full satisfaction guarantee terms weren't fetched.
