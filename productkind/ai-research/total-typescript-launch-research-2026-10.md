# How Matt Pocock launched Total TypeScript, and what we can borrow for the technical PM learning journey

**Date:** 10 October 2026 **For:** Kinga and Tamas **Builds on:** [the learning journey design](../../little-parrot/content/course/technical-skills-for-product-managers-learning-journey-design.md)

**Method.**

- **His tweets:** read directly on X (logged in) for March 2022 to March 2023, using date-bounded searches and the full announcement and launch threads. X search doesn't return every tweet, so the timeline below is the tweets I could find, not a complete archive.
- **Revenue and launch mechanics:** from the badass.dev write-ups by Joel Hooks, Matt's business partner, and from Matt's podcast interviews.
- **Gaps:** the Wayback Machine wasn't reachable, so I have no 2022 or early-2023 landing page or pricing page snapshots.

## The short version

- **The "$1m in the first year" figure is real, with a caveat.**
  - Documented gross sales add up to about $0.9m in the first ten months after the December 2022 pre-release:
    - pre-release: $415k
    - first 10 days of the full launch: $314k
    - Advanced React add-on: $122k pre-release, then $72k at launch
  - Ongoing sales on top of that would plausibly pass $1m within the year, but no source states the date it crossed $1m.
  - The money was **gross revenue shared with Badass Courses**, not Matt's personal income.
  - He tweeted the $2.5m milestone on 15 July 2024.
- **The course wasn't the start.** He spent nine months building an audience and testing demand before anything was on sale:
  - **March 2022:** tips on X.
  - **April 2022:** a waitlist.
  - **Summer 2022:** expensive live workshops.
  - **August–September 2022:** free tutorials.
  - **December 2022:** a pre-release with one module finished.
  - **March 2023:** the full launch.
- **What did the work:**
  - a repeatable free content format in one niche;
  - asking the audience what to build;
  - a free tutorial that grew the email list;
  - live workshops at a high price before anything was recorded;
  - a pre-release sold to the email list with a daily email sequence;
  - pricing designed so employers would pay for it.

## 1. How he built his following before the course

Starting point (badass.dev):

- about 4,000 Twitter followers and an email list of about 3,500;
- on the XState core team at Stately, with credibility as an open-source TypeScript person.

What he did, in order, with his own tweets:

| Date | Tweet (his wording) | Likes |
| --- | --- | --- |
| Early Mar 2022 | Starts a numbered series: **"🔥 TypeScript Tip #N 🔥"**, a 2-minute screen-recorded video with a level label and topic label (e.g. "🧑‍💻 Beginner/intermediate 💡 Generics") | 500–1,000 each |
| 11 Mar 2022 | "Here's my TS content plan: I've got 4 more tips cued up. After that, I'm going to make a short course - distributed free on Twitter - in the form of 2 minute videos… What would you like me to cover?" | 197 |
| 12 Mar 2022 | Starts a second series, **"❓ TypeScript Q&A #N ❓"**, answering followers' questions publicly | 270 |
| 22 Mar 2022 | "How I gained 6,250 followers in 21 days 🚀 I posted 13 2-minute videos about Typescript" | 354 |
| 26 Mar 2022 | "It's starting to get real 🚀 Having ideas for a TypeScript course to take you from an intermediate level… to outrageously powerful TS wizard." | 592 |
| 29 Mar 2022 | "🧵 Spotting Generics 🧵" teaching thread | 532 |
| 1 Apr 2022 | "🧵 The Ultimate TypeScript Thread 🧵", collecting everything he'd learned | **4,671** |
| 4 Apr 2022 | "Do you want to become a TypeScript wizard? 🧙 Do you like video courses? We should talk. Comment below and I'll DM you my pitch." | 651 |
| 7 Apr 2022 | **"🪄 Announcing Advanced TypeScript🪄 Become a TypeScript Wizard with my upcoming video course. 💪 100+ type challenges 💡 Insights & Interviews with OS maintainers 🧙 Learn every TS trick in the book 🤩 Only intermediate knowledge needed. Sign up at mattpocock.com"**, the first waitlist | 1,064 |
| 12 Apr 2022 | "How I make tip videos for Twitter 🧵", teaching his own method | 143 |
| Apr–Jul 2022 | Tips #15 to #28 continue, roughly 2–3 a week | 250–870 |
| 20 Jun 2022 | Publishes the course's thesis: "🧠 Work with TS's inference, not against it 🔄 Derive & transform types, don't double-declare them…" | 145 |
| 22 Jun 2022 | "Well, hello, 3k YouTube subs! I've been posting an Advanced TS tip every weekday" | 284 |
| 29 Jun 2022 | "I'll be releasing some big, big, BIG TypeScript news pretty soon 🚀" | 577 |
| 6 Jul 2022 | Leaves Stately: "For the next month or so, I'll be focusing full-time on my TS course." | 447 |
| 15 Aug 2022 | Joins Vercel as a developer advocate on a three-month, three-days-a-week contract, a "backup" in his words | 1,434 |
| 24 Aug 2022 | "This morning I wrote a 9-exercise TypeScript course for beginners, and quietly made it public on GitHub." | 1,150 |
| 26 Aug 2022 | "…INSTANTLY got 600 GitHub stars 🤯 So... I just landed a PR that DOUBLES the amount of content". It trended first for TypeScript on GitHub | 348 / 377 |
| 29 Aug 2022 | "Announcing... The new landing page for Total TypeScript 🧙", the first use of the name | 341 |
| 19 Sep 2022 | Free Zod tutorial ("A year ago, I fell in love with Zod…") | 832 |
| 23 Sep 2022 | "A single spot with ALL of my 2-minute TypeScript tips, in chronological order" | 1,187 |
| 30 Sep 2022 | **"Today's the day. My Beginner's TypeScript tutorial has dropped. And it's free for everyone. 🧵"**, his biggest tweet of the period | **6,012** |
| Nov 2022 | The tip series continues, now unnumbered, 750–1,400 likes each, plus jokes ("Elon Musk: 'Oh you're a TypeScript engineer? Name every type'", 1,164) |  |

Patterns:

- **One narrow niche, one recognisable format, a steady rhythm.** Every tip had the same header, length and labels, so people could spot it in the feed and collect the set.
- **He asked the audience before building** ("What would you like me to cover?", "Which should I check out?", "Comment below and I'll DM you my pitch").
- **He shared his growth and his method in public** ("How I gained 6,250 followers", "How I make tip videos"). These posts were content in themselves.
- **Collections of past posts got the most reach.** The mega-thread (4,671 likes) and the "all my tips in one place" post (1,187) each did several times better than a single tip.
- **Free, interactive tutorials** (a GitHub repo of exercises) were his biggest single driver of reach and of email signups. Badass.dev says the Beginner's tutorial had a "much bigger initial impact on email list growth" than anything else.

## 2. The 2022 pre-release: what he posted

Before the pre-release, two live workshops tested demand (badass.dev):

1. **First workshop:** Matt proposed $99. Joel Hooks countered with **$1,200 for a four-hour live workshop with no recordings**. It sold all 30 seats in about two weeks: $15k shared revenue after expenses.
2. **Second offer:** a three-workshop bundle at $2,400 over six weeks. It also sold out.

**The pre-release, December 2022.**

- What was on sale: one finished module (Type Transformations), with Generics and Advanced Patterns marked "coming soon".
- Name: "Core Volume", which hinted at more volumes to come.
- Price: $800 list, 40% off at launch, about $490. That is deliberately under the ~$500 that often doesn't need approval on a corporate card.
- PPP (purchasing-power parity) pricing for buyers outside the US.

His tweets, in order:

1. **5 Dec 2022, the teaser:** "The Total TypeScript pre-release is dropping SOON. Wizardry is waiting. And it's 40% off at launch. totaltypescript.com/buy" (268 likes)
2. **6 Dec:** "Yes, we will have PPP for Total TypeScript! This offers you a price drop based on where you are in the world…"
3. **8 Dec, the announcement thread** (939 likes, 138 reposts, 303 bookmarks):
   - "🎉 SO excited to announce what I've been working on for the past few months... ✨🧙‍♂️ Total TypeScript 🧙‍♂️✨ It's a comprehensive, interactive video course to turn you into a TypeScript wizard. Prerelease available now! ⬇️⬇️⬇️" (with a video)
   - "Before I was a developer, I was a teacher. It's been amazing reconnecting with my love of teaching…"
   - "We're doing PPP so that Total TypeScript is affordable wherever you're from. More questions?" (link to the FAQ)
   - "TypeScript wizardry is one of the most valuable skills in our industry. Ready to start your journey? Jump in."
   - "If you've enjoyed the content I've been putting out over the past few months, I'd love it if you could RT the top tweet of this thread and spread the word."
   - In the replies: "Yes! There's a free beginner tutorial so you can get a feel for it."
4. **9 Dec:** "Yesterday was a DAY. Hundreds of you have already signed up…" (social proof), and "The prerelease discount… is only running for one more week."
5. **12 Dec:** "Super excited by all the folks buying Total TypeScript with their education budgets. But WOW, I didn't expect so many teams to be jumping in already."
6. **15–16 Dec, countdown:** "There are 48 hours left… Folks who've bought it - how are you getting on?" and "14 hours left… If you've got education budget to use up, now's your moment." The deadline fell before the end-of-year education budget deadline.
7. **20 Dec:** the window is closed: "We've closed the prerelease window for a bit so we can focus on building the next module."
8. **29 Dec:** shares learner feedback.

The email sequence behind it (Joel Hooks, ["$415k Pre-Release Launch"](https://badass.dev/launch-of-a-developer-education-product)):

1. **Soft launch** to about 1,000 subscribers who had rated themselves advanced-beginner or intermediate. 34 bought straight away.
2. **The full list** (about 18,000) the next morning.
3. **Daily emails, each written the day before:** announce, explain, FAQ, teams, objections (500+ replies answered by hand), price justification, last day.
4. **Biggest days:** the price-justification email (203 buyers) and the last-day email (376).

**Result:** 1,281 learners, $415k gross. In a later interview Matt said it made "30–40x" his Vercel pay. That probably means the three-month contract, not a year's salary.

## 3. The 2023 full launch: what he posted

**The run-up:**

- 14 Feb 2023: "Content for TT is so close to being done. This is 6 months of work in one list." (204 likes)
- 22 Feb 2023: teased the hidden completion certificate.

**1 Mar 2023, the launch thread** (1,697 likes, 365k views, 516 bookmarks):

1. "Today's the day. Total TypeScript is ready." (with a video)
2. "🧙 Hundreds of videos over three modules 🔥 The deepest exploration of Generics on the market ❤️ Interactive editors, transcripts, and thousands of words of accompanying articles 🪄 Perfect if you've used TS for a while, but want to achieve mastery" (link card: "Become the TypeScript Wizard at Your Company")
3. The origin story, over five tweets:
   - "Total TypeScript is the distillation of everything I've learned as a library developer and team lead."
   - "A year ago, I was working on XState's core team… its types weren't great."
   - "By asking for help, I got to know a bunch of TypeScript Wizards… the knowledge they had was TOTALLY unknown to the wider world."
   - "If I'd only known the compiler a little better…"
   - "So, I decided to take all the knowledge I'd gathered, and put it in one place."
4. "I really think that this course will transform your career. Your frontend framework might change. Your backend runtime might change. TypeScript isn't going anywhere. Time to master it."
5. "If you were part of the early access crew, I'd love to hear how you've got on… I'd love it if you could RT the top tweet of this thread."
6. Replying to objections:
   - "Yep, it's high-end - though with PPP…"
   - "If you're self-motivated enough you can definitely get to the same level of mastery without the course."

**After the launch:**

- **7 Mar:** a livestream touring the course with a big Q&A.
- **5 Mar and 28 Mar:** reposted customer quotes and named teams using it (Hydrogen, AWS Amplify).
- **10 Mar:** "Starting work on the next free Total TypeScript tutorial…"
- **31 Mar:** started re-recording for TypeScript 5.0 and acting on feedback.

**Result:** 850 seats and $314k gross in the first 10 days, at $590 (badass.dev).

## 4. Distribution channels other than X

- **Email list:** about 3,500 in early 2022, about 18,000 by the pre-release. This is where the sales happened; X brought people to the list.
- **Free interactive tutorials** (Beginner's TypeScript, Zod): GitHub repos plus pages on the site, used as signup magnets. After the Zod tutorial "dozens" signed up a day, and "hundreds" after an email push.
- **GitHub:** the beginner repo trended first for TypeScript.
- **YouTube:** 3,000 subscribers by June 2022 from a tip every weekday. In October 2022 he said he wanted to "double down on YouTube after my course releases".
- **Livestreams:** building the course live in 2022, and a launch tour and Q&A in 2023.
- **Conferences:** he met Joel Hooks at RemixConf (June 2022) and pitched the partnership at JSConf Budapest (July 2022).
- **His employer's platform:** the Vercel developer advocate role kept him visible during the pre-release.
- **Open source:** ts-reset (February 2023, 35k weekly downloads by March) brought new people in.
- **Discord** for buyers, **articles** on the site from December 2022, and short videos on TikTok/YouTube Shorts (listed in the launch write-up).
- **Teams and employers:** a team email in the launch sequence, team purchases, a ["Dear Boss" letter](https://www.totaltypescript.com/boss), and a price below the corporate card threshold.
- **The Badass Courses partnership:** they ran production, the platform, launch emails and support for a revenue share. Matt's own summary: "Huge credit to my partners at @badass_courses, it's really their success."

## 5. The original learning path

He described how he structures teaching material (9 Nov 2022): "1. Turn the information into a DAG 2. Assign groups to areas of the graph 3. Figure out a linear way through those groups." A DAG is a map of which ideas depend on which. He said he'd done this for the TS course, the XState docs and the Turborepo docs.

**Free, before the paid course:**

- **Beginner's TypeScript:** 18 exercises, from basic types to function types with promises.
- **Zod:** 10 exercises.

**Paid Core Volume:** three self-paced workshops. Each lesson is a problem in an interactive editor, then a solution video, then explainer videos and written articles. A certificate is hidden at the end of each module. Section counts come from today's GitHub repos, so treat them as approximate.

1. **Type Transformations**: released December 2022 (the pre-release). About 47 exercises:
   1. Inference basics
   2. Unions and indexing
   3. Template literals
   4. Type helpers pattern
   5. Conditional types and `infer`
   6. Key remapping
   7. Challenges
2. **TypeScript Generics**: released January 2023. About 40 exercises:
   1. Intro
   2. Passing type arguments
   3. The art of type arguments
   4. Advanced generics
   5. Function overloads
   6. Challenges
3. **Advanced TypeScript Patterns**: released in time for the March 2023 launch. About 36 exercises:
   1. Branded types
   2. Globals
   3. Type predicates and assertion functions
   4. Classes
   5. External libraries
   6. Identity functions
   7. Challenges

**Later additions:**

- **Advanced React with TypeScript:** pre-release July 2023, launch October 2023.
- **Bonus:** expert interviews with open-source maintainers, the "Insights & Interviews with OS maintainers" promised in the April 2022 announcement.

Every module ends with challenges, and every lesson starts with a problem for the learner to try before the answer.

## 6. What to borrow for the technical PM learning journey

The design already has a free Mission 0 workshop, a paid founding season, an expense route and follow-up emails. Matt's playbook confirms those choices and adds the following.

1. **Start a numbered, recognisable free format now, months before the season.**
   - Matt's version was "🔥 TypeScript Tip #N 🔥", a 2-minute video, the same every time, 2–3 a week.
   - Ours could be a short numbered series answering one technical question a PM is afraid to ask in standup: what a webhook is, why the deploy isn't live yet, what the network tab shows.
   - Draw it from the missions' material, so the content also previews the course.
   - Then post a collection of the series every so often, as he did with the mega-thread and "all my tips in one place".
2. **Ask the audience what to build, in public, and invite people into a conversation.**
   - His "Comment below and I'll DM you my pitch" and "What would you like me to cover?" did validation and list-building at once.
   - We can do the same with the missions: ask which of the seven decisions people face at work.
3. **Turn something free and hands-on into the email list.**
   - Matt's biggest single post (6,012 likes) was a free interactive tutorial, and it grew his list more than anything else.
   - Our equivalent is a recorded, self-serve version of Mission 0, a lab people can do alone. The design already plans this ("a recorded version of the workshop… so sign-up can stay open between seasons").
   - Matt's evidence says to build it before the season, not after, because it builds the list.
4. **Price the live version high and keep the group small first.**
   - Joel turned Matt's $99 into $1,200 for a four-hour live workshop with no recordings, for 30 people. That proved demand and paid for the build. His line: "It's way easier to come down than it is to push up."
   - That supports our founding season at 15–25 learners with live clinics and personal feedback.
   - We shouldn't underprice the founding season because it's the first one.
5. **Pre-release with one module finished, and say so.**
   - Matt sold "Core Volume" with one module done and two "coming soon", and closed the window to keep building.
   - Our founding season, opening before every mission is finished, fits that pattern, provided we're open about what is ready.
6. **Run the launch as a daily email sequence, not one announcement.**
   - Matt's order: soft launch to the most qualified segment first, the full list the next morning, then announce → explain → FAQ → teams → objections → price justification → last day.
   - The objections and price emails, and the deadline, sold the most.
   - Our three follow-up emails after the workshop could grow into this, with a "for teams / for your manager" email and an honest objections email added.
7. **Make it easy for the employer to pay.**
   - Matt's tactics: a price under the ~$500 corporate card threshold, a team email, the "Dear Boss" letter, and timing the pre-release deadline to the end-of-year education budget.
   - Our expense route already covers the letter. The new ideas are the price threshold and the timing:
     - check the card limits and learning budget cycles typical for PMs at the enterprises we're targeting;
     - consider closing enrolment before budgets reset.
8. **Copy the shape of his launch thread**, whatever channel we use:
   1. One line on why now.
   2. What's inside, in four lines.
   3. The origin story: who he was, what he couldn't do, what he learned from experts.
   4. Who it's for.
   5. An honest reply to "too expensive" ("If you're self-motivated enough you can… without the course").
   6. A direct ask to share.
   7. After the launch: a livestream tour with Q&A, customer quotes, and named teams.
9. **Put the founders' own path in the story.** Matt led with "Before I was a developer, I was a teacher" and his XState frustration. Ours should use what is actually true of Kinga's and Tamas's backgrounds.

### Where Matt's situation differs from ours

- **Audience and channel.**
  - His buyers were developers on X in 2022, at the peak of TypeScript adoption, with employer education budgets.
  - PMs in 2026 are more on LinkedIn, Substack and Slack communities, so his formats need translating to those channels rather than copying to X.
- **Credibility.** He came in with open-source credibility (XState core team, then Vercel), and his free content showed that expertise publicly. Our equivalent proof is the free workshop itself and the bug report people leave it with.
- **He had a partner.**
  - Badass Courses handled the platform, video production, launch emails and support for a revenue share.
  - With two of us, the email sequence and the live capacity have to be planned within that limit, which the design already does.
- **The timeline.** Nine months passed between his first tips and the pre-release, and twelve before the full launch. Expecting a similar result from a launch with no audience-building first would not match his evidence.

## Sources

- **X, read directly:**
  - [@mattpocockuk](https://x.com/mattpocockuk), March 2022 to March 2023
  - [Advanced TypeScript announcement, 7 Apr 2022](https://x.com/mattpocockuk/status/1512028805187186691)
  - ["How I gained 6,250 followers in 21 days", 22 Mar 2022](https://x.com/mattpocockuk/status/1506327095294763008)
  - [Beginner's TypeScript tutorial, 30 Sep 2022](https://x.com/mattpocockuk/status/1575811782220054534)
  - [Pre-release teaser, 5 Dec 2022](https://x.com/mattpocockuk/status/1599845701885710337)
  - [Pre-release thread, 8 Dec 2022](https://x.com/mattpocockuk/status/1600891560295813122)
  - [Launch thread, 1 Mar 2023](https://x.com/mattpocockuk/status/1630976256509345799)
  - [$2.5m milestone, 15 Jul 2024](https://x.com/mattpocockuk/status/1812771775928734134)
- **Joel Hooks / Badass Courses:**
  - ["$415k Pre-Release Launch of a Developer Education Product"](https://badass.dev/launch-of-a-developer-education-product), 17 Dec 2022
  - ["How we Shipped Total TypeScript"](https://badass.dev/creating-total-typescript-with-matt-pocock), 14 Aug 2023
  - ["Launching Total TypeScript" case study](https://badass.dev/partners/total-typescript)
- **Matt Pocock:**
  - on the Pragmatic Engineer podcast, Sep 2026 ([newsletter page](https://newsletter.pragmaticengineer.com/p/ai-skills-with-matt-pocock), [summary](https://finance.biggo.com/podcast/c9cefb3cd9ae513d))
  - [Reactiflux Q&A, 11 Jan 2023](https://reactiflux.com/transcripts/matt-pocock_mapleleaf)
- **Total TypeScript:**
  - [Legacy Core Volume (v1)](https://www.totaltypescript.com/products/core-volume)
  - ["Dear Boss" letter](https://www.totaltypescript.com/boss)
  - [GitHub organisation](https://github.com/total-typescript): workshop and tutorial repositories
