# Technical PM learning journey: design proposal

**Date:** 9 October 2026, revised 4 and 5 November 2026 **For:** Kinga and Tamas **Builds on:** the PM technical-fluency research in [`productkind/ai-research/pm-technical-fluency/`](../../../productkind/ai-research/pm-technical-fluency/), the research on PMs being told to use AI in [`productkind/ai-research/pm-use-ai/`](../../../productkind/ai-research/pm-use-ai/), and the waitlist page at [littleparrot.app/guides/technical-product-manager](https://littleparrot.app/guides/technical-product-manager) **Status:** a proposal to discuss. Nothing in it is built yet. Times, costs, workloads and completion targets are estimates or hypotheses to test.

**What changed on 4 November 2026.** After the strategy discussion, the eight-week season became **one three-week cohort course with the whole arc**, modelled on the shape of Matt Pocock's two-week cohort courses on aihero.dev: the material is there to work through at your own pace, and the cohort supplies the deadlines, the community and four live sessions. The first run starts on Monday 18 January 2027. Each week has two lanes: a full lane of about four and a half hours and an essentials lane of about two and a half, and both the story's evidence and the Monday move sit in the essentials lane. Mission 7 is no longer a separate mission; its AI workflow is folded into the finale week. The document-style artefacts became lab outputs with worked answers and self-check lists; nothing is submitted or marked. The Monday moves on the learner's own product are applied on their own and never submitted, because that product is confidential; questions about it go to the live sessions. An earlier idea the same day, three separate two-to-three-week courses, was dropped: splitting the content before any cohort has given feedback would be deciding ahead of the evidence, and each slice would carry less value than PMs pay for. Sections 3, 4, 8, 9, 11, 13, 14 and 15 carry the changes; the missions' content is the same.

**What changed on 5 November 2026.** After reading the revision, Kinga took out personal feedback altogether (asking learners to write a bug report for the two of you to rate is too basic), moved the Monday move into the essentials lane (applying the week's skill at work is the most important thing), made the finale a question-and-discussion session rather than presentations, and removed learning partners and peer review (the self-paced part exists so everyone can do it whenever they have time, and a partner's calendar would get in the way). Later the same day she recut Mission 4: reproducing four bugs was too much hassle for too little excitement, and the important learning is how cookies and local storage work, so the mission is now one "works for me" bug investigated properly, with the sync escalation as a short second ticket.

## The design on one page

- **Shape.** Mission 1 is a free workshop that stands on its own: it teaches how a web app works by setting one up, tracing a bug through it and fixing the bug with an AI agent, and runs at conferences, online or as a talk. Learners who miss it do the same Mission 1 in their own time. Then comes a three-week cohort course with the whole story: week 1, how your product works and what it can do (Missions 2 and 3); week 2, from bug report to production (Missions 4 and 5); week 3, the evidence and the decision (Missions 6 and 8, with Mission 7's AI workflow folded in). Learners work at their own pace inside the three weeks, and the cohort supplies the deadlines, the community and four live sessions. A help channel is answered within one working day.
- **One product, one story.** The learner joins a fictional software company as its newest PM. The product is a real open-source app (the recommendation is Twenty, an open-source CRM). Each learner runs their own copy in a cloud development environment that opens in the browser, set up with one click, with our story data and problems we break on purpose. Nothing gets installed on their laptop. Every mission starts with a message from a colleague or a customer: a problem or a decision, with a deadline.
- **The same rhythm every week.** Predict, investigate in the training product, compare with a worked answer, then make the same move on your own product (the "Monday move"). The sandbox is where the skill is learned and checked; the learner's own product is where they apply it, on their own, and it stays their choice how far they take it.
- **Audio for the commute.** Each mission has up to three optional 8–10 minute briefings (the product story, an engineer explains, a debate), delivered to the learner's own podcast app, with a question to think about before and after, and a transcript.
- **The missions add up.** Evidence planted in earlier missions (an escalation the network tab can't explain, a flaky test, a worrying number in the data) all points to the same part of the system. The final mission asks the learner to decide whether to fix it or build the feature a big customer is asking for.
- **Two lanes every week.** The essentials lane is about two and a half hours: one sitting per mission, its lab output and the Monday move on your own product, and every piece of evidence the finale needs is in it. The full lane is about four and a half: the second sitting of each mission and the audio as well, an hour of which can happen on a commute. A learner picks the lane week by week.
- **Worked answers, not marked work.** Everything the labs produce (the system map, the feasibility brief, the bug report, the release update, the data answer, the decision brief) is practice: the learner compares it with how Tamas or Kinga did it, using a short self-check list, and nothing is submitted or marked. The time with the two of you is the four live sessions. The learner's own product is confidential: the Monday moves are never submitted or reviewed, and a learner with a question about their own product brings it to a live session as a privacy-safe description.
- **Built to be finished.** Three weeks instead of two months; lab slots booked into the calendar during the workshop; a short agreement with the learner's manager; the essentials lane for a busy week; no streaks and no guilt messages.

## 1. What we're designing for

### The learner

Practising software PMs without an engineering background, many of them in enterprises with complex architecture. They know what their product does but not how it works. Our research found that what they want is judgement and independence rather than programming. The language in the strict validation sample: "nodding along in standups, pretending to get it", "sometimes it does feel like I'm the least knowledgeable person in the room", "can you explain in simpler terms" ([synthesis](../../../productkind/ai-research/pm-technical-fluency/pm-technical-fluency-opportunity-synthesis-2026-08.md)).

The research also recommended one coherent mechanism for the whole course: learners work through **one software product and one consequential product change** instead of disconnected lessons on APIs, Git or CI/CD ([whole-course value propositions](../../../productkind/ai-research/pm-technical-fluency/pm-technical-fluency-whole-course-value-propositions-2026-08.md#the-shared-whole-course-mechanism)). This design is built on that recommendation.

### What people pay for

The willingness-to-pay research found that buyers pay for structured practice, expert feedback, live access, doing the work alongside peers and a finished artefact. The information itself is available free. One caution: in the evidence behind "a finished artefact", the artefact is nearly always a working prototype from an AI-prototyping course, something visible and new. A filled-in template about a fictional company is not that, which is why this design treats the sandbox documents as practice with a worked answer rather than deliverables, and why what the learner takes home is the skill applied to their own product rather than a folder of documents. Maven's case study of Tech for Product says the instructor gives the information away and students pay for the live sessions, follow-up access and doing the work with peers. Skiplevel reports that 61% of its students expense the programme ([willingness to pay](../../../productkind/ai-research/pm-technical-fluency/pm-technical-fluency-willingness-to-pay-2026-08.md)). Expert access in this design is the live sessions. It leaves out personal feedback on documents on purpose: rating a bug report is too basic to be worth the learner's money or the two of you's time, and it would cap the cohort at what two people can mark.

So in this design the feedback, the live sessions and the weekly application to the learner's own product are the core of the product, and the route to an employer paying is built in from the first day.

### Constraints

- **Company laptops.** Many learners can't install software, and some companies restrict developer tools, GitHub or AI tools. Section 6 covers this.
- **Two of us.** Live time has to be capped per learner, and the labs have to run without us.
- **Busy learners.** The journey has to fit around a full-time job, with weeks when nothing gets done.
- **The Little Parrot format didn't engage enough for this.** This journey uses hands-on labs at a computer, audio and live sessions, and keeps short phone-sized pieces only for recall questions and reading the mission message.

### What success looks like

Learners finish, use what they learned at work during the three weeks (not after them), and tell colleagues. Section 13 turns that into measures.

## 2. The core idea: one product, three weeks, one decision

Learners spend the three weeks inside one product. They join a fictional company that sells the training app to business customers. The software is real: a real frontend, a real API, a real database, real code on GitHub and a real release pipeline. Only the company, its customers and the data are made up.

### Why one product

- **It's what our research asked for.** The highest-value questions are about the PM's own product, which no generic explainer can answer. One product traced end to end is the closest practice we can give.
- **Problem-first learning.** Schank's goal-based scenarios and Merrill's first principles of instruction both start from a realistic problem the learner wants to solve, and bring in each skill when the problem needs it. A PM who needs to answer a security questionnaire by Friday has a reason to learn what a worker process is.
- **Transfer.** Practice that looks like the real job is more likely to be used in the real job. A CRM with permissions, integrations and background jobs looks much more like an enterprise product than a to-do app.

### The cast

- **You:** the new PM for integrations and the email and calendar sync, two weeks into the job.
- **Colleagues who appear in messages, tickets and emails:** the engineering lead, the head of sales, the customer success lead, the data analyst, the head of product.
- **The customer:** a mid-sized logistics company (working name: Calder Freight) whose renewal is coming up in March.
- **Kinga and Tamas as themselves.** They talk through each case in the audio briefings and run the live sessions as a lead PM and a principal engineer. They never play characters. Acting is hard to do well, and what learners are paying for is time with two real people who have done this work.

### The story arc

The learner meets the same customer and the same part of the system from a different angle each mission. Every piece of evidence below sits in an essentials-lane sitting, so the arc survives a busy week (section 3):

| Mission | What the learner finds | Where it leads |
| --- | --- | --- |
| 2 | Email and calendar sync run as jobs on a background worker | The part of the system the finale is about |
| 3 | The incoming half of Calder's integration would run as more jobs on the same worker and queues | The feature in the finale |
| 4 | The one escalation the network tab can't explain comes from the email sync, and the real open-source project has dozens of closed issues in the same area | Evidence for the rebuild |
| 5 | A small fix for a different bug waited a day because a flaky test in the sync code failed twice | Evidence that the debt slows every release |
| 6 | Customers whose email sync failed in their first month are less likely to still be active at day 60 | Evidence of customer impact |
| 8 | Sales needs the integration for Calder's renewal; engineering wants a sprint to rebuild the sync jobs first. One sprint. | The final decision |

The final decision is hard because of everything before it. That's the design: the learner sees the skills combine into one product decision instead of sitting in separate boxes.

## 3. The journey at a glance

One course, three weeks, two missions a week, the whole story from the security questionnaire to the final decision. The week's missions open on its Monday (or everything on day one, section 11), so people can work ahead or take it slow. Each week ends on one of the planned peaks.

| Week | Theme | Missions | What you do | Ends on |
| --- | --- | --- | --- | --- |
| Pre-work | Mission 1, free | Workshop or self-paced | Set up your copy, trace the failed save, fix it with Copilot | A found and fixed bug |
| 1 | How your product works, and what it can do | 2 and 3 | Map everything that runs and every third party; send API requests, catch a webhook, judge the integration | The feasibility brief goes to sales |
| 2 | From bug report to production | 4 and 5 | Reproduce the "works for me" bug, find it in what the browser remembers, write the bug report; follow the fix through review and deploy; ship and roll back your own change | Your first merged pull request |
| 3 | The evidence, then the decision | 6 and 8, with 7 folded in | Check the board-deck number with a funnel and a query; use AI to assemble the evidence pack and check it; decide feature or rebuild | The final decision, and the certificate |

**Two lanes.** Each week has an essentials lane of about two and a half hours and a full lane of about four and a half. The essentials lane is one sitting per mission, its lab output and the Monday move, because applying the week's skill at work is the most important thing in the course and no busy week should drop it. The full lane adds the second sitting and the audio. The story's evidence is placed so that the essentials lane carries all of it: the worker in Mission 2's first sitting, the integration's incoming half in Mission 3's worked answer, the sync escalation in Mission 4's second ticket, the flaky test in Mission 5's first sitting, the churn number in Mission 6's second sitting. A learner who takes the essentials lane all three weeks still arrives at the finale with everything the decision needs. Each mission in section 5 says what is in which lane, and what moved from a sitting into the audio or the worked answer to make the week fit.

Mission 1 stays free and is the pre-work, the way a free self-guided course sits before a paid cohort. It is also the setup step.

Every mission also has a Monday move: the same thing, done on the learner's own product. That product is confidential, so the moves are applied on the learner's own, never submitted and never reviewed. Questions about them come to the live sessions as privacy-safe descriptions.

| When | Mission | The message that starts it | What you do in the product | What you make in the lab (practice, with a worked answer) |
| --- | --- | --- | --- | --- |
| Pre-work: live and free at a workshop, or self-paced | **1. "Saving doesn't work"** (how a web app works, one request deep) | Customer success: Calder clicked Save and the company isn't there | Set up your development environment and start the app; confirm nothing was saved; follow the failed save from the browser through the network and the server to the database; give your bug report to GitHub Copilot and test its fix | A map of how a web app works, a bug report, a tested fix and your own copy of the product |
| Week 1 | **2. Where does our customers' data go?** (how a web app works, the whole system) | Sales forwards a prospect's security questionnaire | Find everything else that runs (worker, queue, cache) and every third party | A system map and the questionnaire answers |
| Week 1 | **3. Can we promise the integration?** (APIs, webhooks, integrations) | Sales: "It's just an API, right?" | Send API requests, break them on purpose, catch a webhook | An integration feasibility brief |
| Week 2 | **4. "It works for me"** (bug triage, and what the browser remembers) | Customer success: Calder sees dollars, we see euros | Reproduce it as the right user, read the response against the screen, open the Application tab and find the stale value; then an escalation the browser can't show | A bug report, and an escalation note |
| Week 2 | **5. It's merged, so where is it?** (deployment) | The CEO: Calder was promised the fix today | Follow the fix through review and checks, deploy it to your own copy; ship and roll back your own change on GitHub | A stakeholder update and your first merged pull request |
| Week 3 | **6. Did the onboarding checklist work?** (product analytics) | The head of product questions a board-deck number | Check the events fire, answer with a funnel and a SQL query | A data answer |
| Week 3 | **8. The renewal feature or the rebuild?** (technical debt or new feature), with Mission 7's AI workflow as its AI step | One sprint, two asks | Use AI to assemble the evidence from every mission and check it; weigh the options | The Calder decision brief, the final session and a certificate |

Mission 7 keeps its number so the cross-references in this document still work, but it is no longer a mission of its own: its AI workflow is the AI step of Mission 8, and its menu of workflows is the Monday move for week 3 (section 5). The course map shows seven missions.

I moved bug triage before deployment, against the order on the waitlist page, so that the bug the learner reports in Mission 4 is the fix they follow to production in Mission 5. Following a fix you reported is a common way for PMs to meet the release process at work, and it gives the learner a stake in the deployment mission.

**Why three weeks and not eight.** Two months is a long commitment to ask of a busy PM before they have seen any value, and it is what the two of you heard back. Three weeks is something people can say yes to, and it keeps the whole arc in one purchase, which is what makes the course worth the price in section 15. The cost is intensity: four hours a week on the full lane is double the earlier design's two, which is why the essentials lane exists and why the first run measures which lane people take (section 13). If four hours proves too much, the next run stretches to four weeks without touching the arc.

## 4. Anatomy of a mission

Every mission from Mission 2 on has the same eight steps (Mission 1 has its own run of show). A familiar structure means the learner spends no effort working out what to do next, and it makes the weekly habit easier to keep.

| Step | Time | Where | What happens | Why |
| --- | --- | --- | --- | --- |
| 1. The message | 2 min | Phone or laptop | A message from a colleague or customer, with a deadline | Starts from a realistic problem (Schank's goal-based scenarios, Merrill's first principles). Noticing a gap in what you know creates curiosity (Loewenstein) |
| 2. Briefings, optional | 8–10 min each | Podcast app | The story, an engineer explains, a debate. One question before, one after | A question asked before listening improves learning of what it asks about, so each one targets the idea we most want remembered (pretesting research) |
| 3. Predict | 2 min | Laptop | Commit to a guess: where is the problem, what will the data say? | Producing an answer yourself, even a wrong one, before being told improves later learning (generation effect, pretesting) |
| 4. Lab | Two sittings of 35–40 min | Laptop browser | Hands-on in your own copy of the product, with a hint ladder | Practice on the whole realistic task (Merrill), in chunks the learner works through at their own pace (Mayer's segmenting principle) |
| 5. Worked answer | 5–10 min | Laptop | How Tamas or Kinga did it, step by step, then one question: "What did they check that you didn't?" | Worked examples help beginners most; once learners have the basics, trying first and then seeing the expert solution helps them apply it to new problems (productive failure) |
| 6. Lab output | 15–20 min | Laptop | The lab's document, made from a template and compared with the worked answer. Rehearsal, not a deliverable: nothing is due and nothing is marked | Applying the new skill to produce something, then seeing the expert version (Merrill's application principle) |
| 7. Monday move | 15–30 min | At work | The same move on your own product. This is where the week's learning gets used, so it is in the essentials lane, and it's the learner's choice how far to take it. Their product is confidential, so nothing is submitted or reviewed; questions about it come to the live sessions | Using the skill in your own world (Merrill's integration principle); transfer of training (Baldwin and Ford) |
| 8. Recall | 3 min | Phone | Three questions from earlier missions, at the start of the next one | Retrieval practice and spacing. Mixing topics helps most where categories are easy to confuse, such as a session cookie, a local storage value and a server-side setting, which Mission 4 keeps apart (interleaving) |

**Time.** Two missions a week. On the essentials lane (steps 1, 3, 4 with one sitting, 5, 6, 7 and 8) each mission takes about an hour and a quarter, so about two and a half hours a week. On the full lane (both sittings and the briefings as well) each takes about two and a quarter, so about four and a half hours a week, of which up to an hour is audio that can happen on a commute.

**Support fades across the three weeks.** Missions 1 and 2 give every click. By Mission 4, learners get the goal and a hint ladder. By Mission 8, they get the decision and a template. This follows the worked-example research: step-by-step guidance helps beginners and gets in the way once they know the basics (the expertise reversal effect), and removing worked steps gradually works better than removing them all at once (fading). It also settles a real tension in the evidence. Worked examples favour showing first, productive failure favours trying first. The season does both, in that order: shown first while everything is new, tried first once the learner has something to try with.

**Every worked answer ends with the first line of next week's message.** People tend to go back to tasks they left unfinished (the Ovsiankina effect). The better-known claim that we _remember_ unfinished tasks better (the Zeigarnik effect) didn't hold up in a 2025 meta-analysis, so the teaser is there to bring people back, nothing more.

**The hint ladder.** Every lab step has three hints: a nudge ("look at the requests shown in red"), a pointer ("open the Payload tab of the graphql request that went out when you clicked Save") and the worked step. Using hints costs nothing. We read which hints get opened most to find the confusing steps and fix them.

**The two lanes.** Each mission marks its essentials: one sitting, the lab output and the Monday move, about an hour and a quarter. A learner having a busy week takes the essentials lane for both missions and still completes the week with everything the finale needs, and still applies both skills at work. The full lane adds the second sitting and the briefings. The second sitting stays open after the week ends, so a learner can come back to it, and the two lanes are the first thing to measure in the founding cohort (section 13).

## 5. The missions

Each mission lists the message, what the learner does, the worked answer, the lab output, the Monday move, the AI step, the audio briefings and what it plants for the finale. Each mission also says which sitting is the essentials lane, and what moved from a sitting into the audio or the worked answer when the season became three weeks. Nothing is submitted or marked: every lab output comes with a worked answer and a self-check list drawn from it.

### Mission 1: "Saving doesn't work" (live at a free workshop, or self-paced)

**Two ways to do it.** Live at a free workshop, or self-paced in the learner's own time. Both follow the same trail in the learner's own codespace and end with the same artefacts, so anyone can start the learning journey at Mission 1, whether or not they came to a workshop.

**The promise.** Non-technical PMs leave understanding how a web app works: what happens between clicking a button and the data reaching the database, and where each step can be checked. They set up the development environment the app runs in and start the app themselves. The bug is the use case that takes them through every layer, and the session ends with them giving their bug report to GitHub Copilot and testing its fix in their own copy. Keeping the promise this broad means the session fits general tech conferences as well as product events. It also stands on its own: the story finishes in the room, and the own-product exercise works the next day, whether or not they join the learning journey.

**Why the setup and the fix are part of it**

- **Running the app first shows the parts before the bug sends you through them.** The database, the server and the frontend start one after another in front of the learner. PMs hear "the dev environment", "staging" and "it works on my machine" every week, and seeing one makes those words concrete.
- **The bug report is also the prompt.** What lets an engineer fix a bug quickly (the steps, the expected and actual result, the evidence from each layer) is what an AI agent needs too. Seeing what Copilot does with a one-line complaint, and then with the bug report, shows this on the learner's own screen. Even when the one-line complaint happens to produce a fix, only the learner with a bug report knows what "fixed" should look like, so only they can check it.
- **The story ends with the bug fixed as well as reported.** Fixing something yourself is the strongest source of self-efficacy (section 12), and it gives the session a high point at the end, which is what people remember it by (the peak-end rule).
- **It stays honest about the learner's role.** Copilot changes the code; the learner doesn't learn to code. Their part is the PM's part: give it the evidence, then test the result against the bug report's expected behaviour, including a check that a normal save still works.
- **The fix isn't deployed.** It works in the learner's copy, and the copy everyone else would use still has the bug. What it takes to get a fix to customers (review, automated checks, a release) is Mission 5, so the session ends on that open question instead of a sales pitch.

**The message.** Customer success lead: "Calder clicked Save on a new company. It spun, and the company isn't there. Engineering is in planning all day. Can you take a look before my 3pm call?"

**Set up the development environment and start the app**

- **Create the codespace** from our repository with one click. While it builds, Tamas explains what a development environment is: a copy of the app on a computer the team controls, with made-up data, where engineers run and change it without affecting customers, and how it differs from staging and production.
- **Read the recipe.** Open the file that describes the environment and find the parts it lists: the database, the server and the frontend.
- **Start the app** from the terminal and watch each part start. One command starts the ready-built app (the same package customers' servers would run), and a second starts the frontend from its source code, which is the copy engineers change. A third loads the story data, because development environments use made-up data, never customers'.
- **Open the app** from the Ports tab at the learner's own private address, and sign in.

**Following the failed save is the tour of the app**

1. **Confirm it in the database.** Open the database table view: the company Calder typed isn't there. The customer is right, so the question becomes where the save got lost.
2. **Start where the user was: the browser.** The spinner, then the network tab: the request, its Payload (what the app sent), the status code and the response. Most of Twenty's requests go to the same address, `graphql`, so the Payload shows which one is the save. Its status is 200, which usually means it worked, and the response holds the error: "This record already exists". Twenty's browser and server talk in GraphQL, and GraphQL servers usually put errors inside the response and still mark it 200. So here the status code only says the server answered, and the response says whether the save worked. Other apps that use GraphQL do the same, which is why the field guide covers it.
3. **Go deeper: the logs.** The server log is already running in a terminal, and it shows nothing about the save. Twenty only logs its own faults, and it counts a duplicate as a problem with what the user sent (the `BAD_USER_INPUT` code in the response). So attendees open the database log, which has the answer: a duplicate key, `microsoft.com`, that breaks a rule on the companies' web addresses. One log doesn't always explain a failure, and engineers check the next one. This is what engineers see.
4. **Back to the database.** The rule that rejected the save lives here: two companies can't share a web address, and a colleague at Calder had already added the same company under a slightly different name. So the data was there all along. The server rejected the save correctly, and the bug is that the app showed a spinner instead of saying why.
5. **Draw the map from the trail.** Frontend, API, server and database. Attendees have just walked through each one, so the diagram describes something they've seen.
6. **Write the bug report** with evidence from each layer. Then the honest part: at work, most PMs can open the network tab, but few can see server logs or the production database. Having seen all four layers once tells them what to ask engineers for, and makes the browser the place they can start on their own.
7. **Fix it with AI.** First, on the big screen, see what Copilot does with "Saving a company doesn't work. Fix it." Then paste your bug report into Copilot's agent mode in your codespace. It finds the code that hides the error, changes it and shows which file it changed; ask it to explain the change in product terms. The frontend rebuilds in about a minute and a half and says when to reload the page. Test the fix against your bug report: saving the duplicate company now shows a message saying why, and a new company still saves. Then open the ready-built app at its own address and try the same save: it still spins, because that's the version customers have, and your fix hasn't been reviewed, tested or released.
8. **Try it on your own product**, or any web app you use: do one action, find its request and name the parts. It needs no sandbox, so it works at their desk the next day.

**Run of show, in person (2 hours)**

| Minutes | What happens |
| --- | --- |
| 0–10 | Kinga and Tamas introduce themselves and read out the message from customer success. Attendees form pairs, so anyone without a working codespace sits with someone who has one. |
| 10–30 | Set up the development environment and start the app. Everyone creates their codespace in the room, because setting it up is part of the lesson. While it builds, Tamas explains what a development environment is; then attendees read the recipe, start the app, load the story data and sign in. Tamas and a helper go round. |
| 30–35 | Predict: a phone poll on where the save got lost. |
| 35–60 | Steps 1–4 of the trail, guided. Tamas narrates each layer the way an engineer would, and Kinga asks the questions a PM would ask. |
| 60–70 | Step 5: draw the map together. |
| 70–85 | Step 6: write the bug report, compare it with Tamas's, and give live feedback on two volunteers' reports. |
| 85–105 | Step 7: the one-line complaint on the big screen, then each pair gives Copilot their bug report, reads what it changed and tests the fix, in their copy and then in the ready-built app. |
| 105–120 | Step 8 on their own products. Close on the open question (the fix works in your copy, so what would it take to reach Calder?), then the QR code for the field guide and the recording. |

**Book a slot about 30 minutes longer than the run of show** for evening events. People often arrive late to evening meetups in Portugal, so the Lisbon session at Portugal Tech Week has a 19:00–21:30 slot and starts a little after 19:00, once people have settled in.

**If the slot is 90 minutes:** attendees create their codespace from the setup email beforehand, so the setup segment starts the app instead of creating it; one volunteer's report gets live feedback instead of two; and the own-product exercise becomes homework from the field guide.

Section 11 has the online, talk and company-session versions of the same trail.

**The self-paced version (about two hours, in two sittings).** For learners who didn't come to a workshop, done before the course starts or whenever they join.

- **Sitting 1: set up, then steps 1–4.** One click creates the codespace. A short video stands in for Tamas's explanation while it builds, and the hint ladder stands in for help in the room while the learner starts the app. The predict step is a question on the mission page. Then the trail, guided click by click. After each step, the matching chapter of a workshop recording is the worked answer: Tamas narrating the layer, Kinga asking the PM's questions.
- **Sitting 2: steps 5–8.** Draw the map, write the bug report and compare it with Tamas's, then give it to Copilot and test the fix. A recorded run of the one-line complaint stands in for the big screen. Then the own-product exercise. The recorded feedback on two volunteers' reports stands in for the live clinic, and learners can bring their own report to the kickoff session.
- **The field guide and the self-assessment** are on the mission page instead of behind a QR code.

**Before the session.** A setup email a week ahead, about ten minutes: create a free personal GitHub account, turn on GitHub Copilot's free plan and switch off its use of their data for training, and run the laptop check (section 6), which opens a small test codespace. The workshop's own codespace is created in the room. Plan for a good share of people not doing the email, which is why attendees work in pairs: only half the room needs a working account.

**The fallbacks.** Laptops that can't run Codespaces (a corporate VPN or proxy that breaks it, or no personal GitHub sign-in on a work laptop) use a shared copy of the product we run for the day. Those attendees do the browser steps themselves and follow the setup, the logs, the database and the fix on the presenters' screen. If Copilot fails, or isn't available on someone's account, one command switches their copy to a branch with the fix already in it, so everyone still tests a fix. If the venue wifi fails, Kinga and Tamas switch to a recorded run of the trail and printed screenshots.

**Leaves with**

- a map of how a web app works, drawn from a trail they followed themselves;
- a bug report with evidence from each layer;
- a fix Copilot made from that bug report, tested in their own copy and not deployed;
- a one-page network tab field guide: where to click, which columns to read, the status codes PMs actually meet (including a 200 with an error in the response), how to spot a slow request, red lines that aren't the problem, how to share evidence safely (HAR files contain login cookies) and what the browser can't show, plus the bug report template. In a codespace, one red line is always there: `manifest.json`, marked as a CORS error. It's the file that gives the browser the app's name and icons, and GitHub's sign-in check on the learner's private address blocks it. The app works without it;
- the Technical Product Confidence self-assessment and its manager-ready report, offered behind the same QR code instead of taking stage time;
- their own copy of the product, which they set up and started themselves, still in their GitHub account.

**How it leads to the learning journey.** The session ends on the gap between the fix in the learner's copy and the ready-built app that still spins, which is where Mission 5 picks up. The copy attendees set up stays in their GitHub account, and Mission 2 starts from it. GitHub deletes a codespace after 30 days without use (its default). When a course starts later than that, as the first one will (November workshops, a January start), the follow-up emails say Mission 2 starts with the same one-click setup instead of promising the copy is still there. Workshop attendees join the course with Mission 1 already done, one of seven on the course map. Everyone else starts with the self-paced version. Nothing is sold from the stage (section 11).

### Mission 2: Where does our customers' data go? (How a web application works: the whole system)

Mission 1 followed one request down through four layers. Mission 2 goes wide: everything else that runs, where data goes beyond the database, and what the infrastructure is called. Depth first in the workshop, then breadth here.

**The message.** Sales forwards a security questionnaire from a prospect in financial services: "Which components process our data? Where is it stored, and in which cloud region? Which third parties receive it?" The engineering lead adds: "Have a go first and I'll check it on Thursday."

**Sitting 1: everything that runs.** Open your codespace, the one from Mission 1. If GitHub has deleted it after 30 days without use, the same button creates a new one. Open the deployment file it follows, which lists everything behind the browser, including two services the workshop trail didn't touch: a background worker, and Redis, which works as both a cache and the queue the worker takes its jobs from. Restart your copy and watch each service start in the log, the same start you saw in Mission 1, now with a name for every line. Then find a job the worker runs on a schedule and watch it appear in the worker's log without anyone clicking anything. Ask an AI chat assistant to explain each service, then check two of its claims against the project's own documentation. The worked answer goes back to Mission 1's development environment and shows where staging and production would sit next to it.

**Sitting 2: where the data goes beyond the database.** Load the product with the network tab open and list every domain the page talks to: your copy of the server, the analytics tool, a font service, a content delivery network. Notice the Application tab next to the network tab, which lists what the browser keeps for this site; Mission 4 is where that gets opened properly. The domain list is already the start of the questionnaire's answer on third parties.

**Sitting 3: the full map and the cloud translation.** Extend the map from Mission 1: add the worker, the queue, the cache and the third parties. Then the same building blocks under their AWS, Azure and Google Cloud names: managed database, object storage, cache, queue, container hosting, load balancer, content delivery network and region. This covers the waitlist page's promise of "AWS, Google Cloud and Azure included".

**Lanes.** Essentials: sitting 1 and the map. Full lane: sitting 2 as well. Sitting 3's cloud translation is no longer a sitting: the map extension happens in the lab output, and the AWS, Azure and Google Cloud names become a one-page reference sheet and the "engineer explains" briefing, which still covers the waitlist page's promise.

**Worked answer.** Tamas's system map and his questionnaire answers, each marked with how sure he is and what he'd still ask the platform team.

**Lab output.** Your system map and questionnaire answers, each marked "confirmed", "my best understanding" or "ask engineering".

**Monday move.** Ask an engineer for your product's architecture diagram or deployment file, and spend 15 minutes with them labelling it in this vocabulary. Or open your own product with the network tab and list every domain it talks to.

**AI step.** Ask an AI chat assistant to explain the deployment file, then check two claims against the docs.

**Audio.** The story: why enterprise deals wait on security questionnaires, and which parts a PM can answer. An engineer explains: why a backend is usually several services. The debate: should PMs read code?

**Plants.** Email and calendar sync run as jobs on the background worker, so when a problem never shows up in the browser, that's one place it can be.

### Mission 3: Can we promise the integration? (APIs, webhooks and integrations)

**The message.** Head of sales: "Calder renews in March. They want every deal we mark as Won to create an order in their ERP within a minute, and changes to the order to update the deal. It's just an API, right? Can I tell them yes?"

**Sitting 1: requests and responses.** In the app's interactive API documentation, create an API key, list companies, read the JSON that comes back and create a record. Then break things on purpose: no key (401), a misspelt field (400), a record that doesn't exist (404). Then compare with the network tab. The product's own screens use the other common style, GraphQL: every request goes to the same address and the question sits in the request body. Plenty of enterprise products work this way, and Twenty offers both styles over the same data, so learners see the two side by side.

**Sitting 2: webhooks.** Point a webhook at our request inspector, move a deal to Won and watch the payload arrive. Answer from the docs and your own experiments: what happens if the receiving system is down? Can the same event arrive twice? How does the receiver know the message really came from us? Then build the same flow with the app's built-in workflow automation, without code.

**Sitting 3: the judgement.** The feasibility brief. Which half of Calder's request the product supports today (outgoing: a webhook when a deal changes), which half needs work (incoming: the ERP calling our API, field mapping, authentication), the failure modes, who would own the integration (us, Calder, or an integration platform such as Zapier, Workato or MuleSoft), and the questions for engineering.

**Lanes.** Essentials: sitting 1 and the brief (sitting 3, shortened to the judgement itself, with the webhook questions answered from a recorded run). Full lane: sitting 2, the webhooks, as well. The no-code workflow at the end of sitting 2 is optional.

**Worked answer.** Kinga's brief, with Tamas's notes on the failure modes she left out.

**Lab output.** An integration feasibility brief: "yes, if…", the open questions and who answers each one. The self-check list: is the yes conditional on the right things, are the failure modes named, is each open question addressed to the person who can answer it.

**Monday move.** Find your product's API documentation (public or internal) and one integration your customers use. Write down which way the data flows, what triggers it, what happens when it fails and who owns it. Together with Mission 2's move, that gives you a first map of your own product, for your own use.

**AI step.** Ask an AI chat assistant to write a request from the API documentation. Send it. When it gets a field name wrong, use the 400 response to fix it.

**Audio.** An engineer explains: APIs and webhooks, and who calls whom. The debate: build the integration, or send the customer to an integration platform? (This covers build versus buy from the waitlist page.)

**Plants.** In the worked answer, the engineering lead notes that the incoming half would run as background jobs on the same worker and queues as the email sync.

### Mission 4: "It works for me" (Bug triage, and what the browser remembers)

**The message.** The customer success lead: "Calder's finance lead sees every amount in dollars. I logged in as her and I see euros. She says she's cleared her cache and it's still dollars. Is this a bug, and what do I tell her?" Halfway through the mission, a second, shorter message from the head of sales: "Emails with Calder's biggest client have stopped appearing on the contact record. Urgent."

**Why one bug, investigated properly.** An earlier version of this mission had four tickets to reproduce and sort. Reproducing four bugs is a lot of work for a learner and not much fun, and the sorting lesson can be shown rather than done. What's worth the learner's time is the thing PMs meet every week and rarely understand: a bug that one person can reproduce and another can't, and why "clear your cache" sometimes fixes it. The answer is in what the browser remembers, and that is the lesson.

**Sitting 1: reproduce it, and find what the browser remembers.** Sign in as Calder's finance lead in your copy. The amounts show in dollars. Open the network tab, find the request that fetched the amounts and read the response: the server says EUR. So the data is right and the screen is wrong, which already rules out the database and the server. Then the Application tab, where the browser keeps what it holds for this site:

- **Cookies.** One of them is the session: the proof of who you are, sent to the server with every request. Sign out and watch it go; sign in and it's back. This is why a HAR file, the network-tab export engineers sometimes ask for, must never be shared as it is: it contains that cookie, and whoever has it is you.
- **Local storage.** Values the app keeps in this browser only: never sent to the server, never synced to another device, and still there tomorrow. Among them, a display-currency key that says USD. It was written when the workspace was still in dollars, and the screen has been trusting it over the server's answer ever since.

Delete the key, reload, and the amounts show in euros. Now the ticket makes sense: it "works for me" because the customer success lead's browser never stored the old value, and clearing the cache didn't help because the cache and local storage are different things. Classify it: a frontend bug (the screen should read the currency the server sends, not a stale local value). Estimate reach (every user whose browser saw the old setting) and severity (wrong numbers on every deal). Write the bug report, with the evidence from both tabs.

**Sitting 2: the escalation the browser can't show.** The second message. Reproduce as the right user: every request succeeds, nothing is in red, and no new emails come back. There is nothing to fix in the browser, because the email sync runs in a background job on the worker (Mission 2). Find the account's connection status in the settings, note when it last synced, and write the escalation: the account, when it stopped, what the status says, and what you checked. Then the worked answer: the two of you triage two more tickets on audio, a sales rep who gets an empty page because her role can't see deals (configuration, plus a small bug in how the page fails) and a deals list that takes eight seconds for one large workspace (performance), so the learner still meets the kinds of problem that look like bugs and aren't, without reproducing them.

**What the learner practises.** Reproducing the problem as the right user with the right data; reading the response against the screen; telling apart the three places a value can live (the server, a cookie, local storage) and what each means for who else is affected; recognising when the problem isn't in the browser at all; estimating reach and severity; and sharing evidence safely.

**Lanes.** Essentials: sitting 1 and the bug report. Full lane: sitting 2 as well, with the audio triage of the two extra tickets.

**Worked answer.** The bug report the two of you would send, with the Application tab screenshots an engineer wants, then an audio reveal of the two extra tickets and how an engineer would fix each.

**Lab output.** The bug report on the currency bug, checked against the list that comes with the template:

- someone else can follow the steps and see the problem;
- expected and actual behaviour are both stated;
- the evidence is there: the request, the response, what the browser had stored, the time and the account;
- reach and severity are estimated;
- any guess about the cause is labelled as a guess;
- nothing sensitive is included.

Plus, on the full lane, the one-paragraph escalation note for the sync ticket.

**Monday move.** Open your own product with the Application tab: list its cookies and local storage keys, work out which one is "who you are", and what "clear your cache" would and wouldn't wipe for a customer. Or triage one real ticket from your support queue with the bug report template.

**AI step.** Give an AI chat assistant only the customer's words, and it produces a plausible guess. Give it your evidence, and the answer gets much more specific. The rule that goes with it: never paste a HAR file or customer data into a tool your company hasn't approved.

**Audio.** The story: what engineers do with a bug report, and which details save them an hour. An engineer explains: cookies, local storage and the server, and why "clear your cache" is three different things. The debate: is this a bug or a feature request?

**Plants.** The sync escalation, and the real project's closed GitHub issues about email and calendar sync (a backfill stalling on rate limits, duplicate messages), which learners browse as part of the worked answer.

### Mission 5: It's merged, so where is it? (Software deployment)

**The message.** The CEO: "Calder was told the fix for the euro amounts would be live today. Engineering says it's merged. When will Calder actually have it?"

**Sitting 1: follow the fix, then deploy it.** The currency bug from Mission 4 is now a GitHub issue (our model version of the report). Follow it through the pull request, the change itself (a few lines in the frontend: the screen now reads the currency from the settings the server sends instead of the value it cached in local storage; ask an AI chat assistant to explain it in product terms, then check that against the pull request description), the review comments and the automated checks. One check failed twice before passing: a flaky test in the email sync code, which has nothing to do with this change and still held it up for a day. After the merge, our pipeline builds a new version of the product and publishes it. Deploy it yourself: change one version number in your environment's settings and restart it. Watch the services stop and start again, and notice the app is unavailable for a minute, which is one reason teams deploy at set times. Then acceptance-test: the amounts show in euros without anyone clearing anything, and the network tab shows the response was right all along. At the fictional company, the same version goes to staging first and to production on the Thursday release train, and the worked answer walks through how that differs from what you just did. Then follow a real change through the upstream open-source project: a merged pull request, its checks, the release it went into and its changelog entry. That shows the same process at the scale of a real engineering team.

**Sitting 2: ship your own change.** Create your own copy of the product's help-centre repository from our template on GitHub, and switch on GitHub Pages in its settings. Make a branch, write the release note for the fix in the browser editor and open a pull request. A check fails (a broken link, or a missing version number). Fix it, open the preview link, merge it and see it live. Then notice you announced the wrong version, revert the merge (a rollback) and watch the corrected page deploy.

**Sitting 3: deployment and release are separate steps.** Your help-centre site ships a new "What's new" banner switched off in a settings file. Deploy it, check it's invisible, then switch it on with a one-line change and no new code. Then open the feature flag the engineering lead used for the onboarding checklist in the analytics tool: it went to 10% of customer workspaces first and to everyone a week later. The code was deployed the whole time; the flag decided who saw it. (Mission 6 comes back to this rollout.)

**Lanes.** Essentials: sitting 1, without the walk through the upstream open-source project, which moves to the worked answer. Full lane: sitting 2 as well, which is where the merged pull request happens; it stays open after the week so an essentials-lane learner can come back for it. Sitting 3 is no longer a sitting: deploying versus releasing, the switched-off banner and the staggered rollout are told in the "story" briefing and shown in the worked answer, and Mission 6 still uses the rollout.

**Worked answer.** Tamas narrates the pipeline: what each state means and where a PM gets to make a decision.

**Lab output.** A stakeholder update: where the fix is now, when customers get it, what could delay it and how we'll know it worked. A five-line message PMs write after every release, and the one piece here worth keeping as a template. The release timeline it used to come with is now part of the worked answer. And the moment week 2 ends on: your first merged pull request.

**Monday move.** Ask an engineer for a 15-minute tour of your team's pipeline, using five questions we give you. Find where your team's deploy history and release notes live.

**Audio.** An engineer explains: what happens after "merged". The debate: release trains or continuous deployment, and why some enterprise customers ask for slower releases. The story: feature flags and the difference between deploying and releasing.

**Plants.** A flaky test in the sync code holds up releases that have nothing to do with it.

**The deeper track (after the course).** The engineer's whole environment: the server and worker built from source as well as the frontend, so a backend change shows up too. Then take your Mission 1 fix to a pull request in your own copy of the repository and watch the checks run on it. For learners who want to see the engineer's side of the same pipeline. It needs more memory than the core path, so it stays optional and is in the "later" list in section 14.

### Mission 6: Did the onboarding checklist work? (Product analytics)

**The message.** Head of product: "The board deck says activation went up after we launched the onboarding checklist. Is that true? And before we build the integration setup flow, I want it tracked properly from day one."

**Sitting 1: how tracking works.** Read the tracking plan. Do the onboarding steps in your copy and find the analytics requests in the network tab: the event names and properties leaving the browser. Watch them arrive in the analytics tool's live view. Spot the data problem: the same action is tracked under two different names since a release. Write the tracking plan entry for the integration setup flow: the event names, when each fires, its properties, who owns it and how to check it before launch.

**Sitting 2: answer the question.** Define activation in one sentence. Build a funnel and a retention view in the cohort's shared analytics project, which holds three months of realistic, made-up usage. Ask an AI chat assistant for a SQL query that answers the question and run it. Its answer disagrees with the funnel, because it counts our internal test accounts and misses the renamed event. Find out why and fix the query. Then the harder part: the checklist launched the same week as a pricing change. What can you claim, and what can't you? The staggered rollout from Mission 5 helps: for one week, 10% of customers had the checklist and the rest didn't, all on the same pricing.

**Lanes.** Essentials: sitting 2, the answer, which is where the churn number the finale needs comes from. Full lane: sitting 1 as well. Writing the tracking plan entry is no longer a lab task: the worked answer shows Kinga's entry for the integration setup flow, and the template goes home with the learner.

**Worked answer.** Kinga's data answer and the corrected query.

**Lab output.** A one-page data answer (the question, the definition, the query, the result, your confidence, the caveats and the recommendation). The self-check list: is the definition stated in one sentence, does the query match it, are the test accounts excluded, is the pricing change named as a caveat.

**Monday move.** Pick one metric your team reports. Find its written definition and the events behind it. Or write the tracking plan for your next feature.

**AI step.** The SQL query above: useful as a first draft, wrong in a way you only catch by checking it against another source.

**Audio.** The story: the dashboard number nobody could reproduce. An engineer explains: what happens between a click and a dashboard. The debate: should PMs write SQL?

**Plants.** Customers whose email sync failed in their first month are less likely to still be active at day 60, and the learner can see how many customers have connected their email.

### Mission 7, folded into week 3: One AI workflow that saves real time (AI for product management work)

In the three-week course this is not a mission of its own. The number stays for cross-references. Its two halves live on inside Mission 8: the honest test of one AI workflow is Mission 8's AI step (assembling the evidence pack and checking every claim), and the menu of workflows below is the Monday move for week 3. The content here is the source for both.

**The message.** Head of product: "Leadership wants every PM using AI. I want something more specific: one workflow from each of you that saves real time on something you do every week, and proof that its output is right."

Our research on PMs and AI found five problems behind the pressure to use it: a mandate without a definition, the time spent reviewing output, missing context, unclear rules on company data, and no honest way to tell whether time was saved ([PM AI research](../../../productkind/ai-research/pm-use-ai/2026-08-26-overwhelmed-product-managers-ai.md)). One PM in that research put the advice simply: "pick one workflow you do every week and spend a month making AI genuinely useful for that one thing before adding more." This mission does exactly that.

**Choose and set up (now the week 3 Monday move).** Sort your weekly tasks into three groups: hand to AI, do with AI's help, keep human. Use how often the task comes up, how risky a mistake would be, how sensitive the material is and how long checking takes. Learn the safe-use rules: which data can go where, approved tools and how to remove sensitive details. Then pick one of five workflows, each built on an earlier mission:

1. A pull request turned into a release note or a stakeholder update (Mission 5).
2. A support ticket turned into a draft bug report that lists the evidence still needed (Mission 4).
3. A data question turned into a SQL draft with a checklist to verify it (Mission 6).
4. Questions about the codebase: an AI agent answers "does our API support X?" with a pointer to the code or docs you can check (Mission 3).
5. A clickable prototype of Calder's integration settings screen, built with an AI app builder or AI agent, to test with users, with a written list of what it doesn't prove (Mission 3). This keeps the AI prototyping step from the waitlist page as one option.

**Test it (now Mission 8's AI step).** Run the workflow on three sandbox inputs. Check each output against the evidence with a checklist: is it accurate, can you trace its sources, what nuance is missing, does it expose anything private, is it feasible? Time the whole thing honestly, including setup and review.

**Worked answer.** Kinga's workflow card for option 1, including where it went wrong.

**Lab output, full lane only.** An AI workflow card: the task, the inputs and context, the prompt, the checks, the data rules and the time saved, measured honestly.

**Monday move.** Run the workflow on one real task, in a tool your company approves, and time it including the review.

**Audio.** The debate: what should stay human in product work? The story: the review time nobody counts when they say AI saved them an hour.

AI isn't confined to this step. Every mission has one AI step with a check, so by week 3 learners have seen AI be useful and be wrong several times on material they understand.

### Mission 8: The renewal feature or the rebuild? (Technical debt or new feature)

**The message.** Two messages on the same morning. The head of sales: "Calder will only renew if the ERP integration is live by March." The engineering lead: "We need a sprint to rebuild the sync jobs before we put the integration's jobs on the same worker. Sync caused most of last quarter's support escalations, its flaky tests hold up releases, and the integration would add its load to the same queues." There's one sprint. The decision goes to quarterly planning on Friday.

**Sitting 1: gather the evidence.** Most of it is already in the learner's lab outputs from the first two weeks, and the worked answers fill any gap:

- the system map (Mission 2): the sync jobs and the worker they run on;
- the feasibility brief (Mission 3): the integration's incoming half would run on the same worker and queues;
- the escalation note (Mission 4): the sync escalation, plus the real open-source project's GitHub issues about email and calendar sync;
- the release timeline (Mission 5): the day a flaky sync test cost an unrelated fix;
- the data answer (Mission 6): failed syncs and retention, and how many customers have connected their email.

Then listen to the interviews with the engineering lead and the head of sales (audio with transcripts) and note what each one leaves out.

**AI step (Mission 7's workflow).** Give an AI chat assistant or AI agent the lab outputs and the interview transcripts and ask it for the evidence pack: every claim about the sync jobs, with its source. Then check each claim against the source, note what it invented or missed, and time the whole thing including the checking. That is the one AI workflow tested honestly, on material the learner understands.

**Sitting 2: decide.** Lay out the options: (A) the feature first, (B) the rebuild first, (C) fix only the part both depend on (the retry and queue handling the sync and the integration would share), then build a smaller first version of the integration, (D) buy an integration platform. Compare them on the cost of delay (the renewal's value), the cost the debt adds to every change (extra time, the bug rate), risk, how reversible each choice is, and what each would teach the team. Recommend one. Say what engineering decides (how), what Product decides (what and when), and how you'll know it worked.

**Lanes.** Essentials: a shorter sitting 1 (the evidence from the lab outputs and the AI step, without the interviews) and sitting 2. Full lane: the interviews as well. The week 3 Monday move from Mission 7 is in the essentials lane, like every Monday move.

**Worked answer.** Shown after submission, not before: Kinga's and Tamas's briefs, which deliberately recommend different options.

**Lab output.** The Calder decision brief, compared with the two worked answers, and the source of the questions the learner brings to the final session. Learners who want to can also write a second brief on a real decision from their job, for their own use; it stays private, and they can bring the dilemma to the final session as a privacy-safe description.

**The finale.** The final live session is questions and discussion, not presentations. Kinga and Tamas walk through their two briefs and why they disagree, then the floor is open: what learners decided, which evidence swayed them, what they would ask their own engineering lead, and anything else from the three weeks. Learners retake the confidence self-assessment, get a before-and-after summary for their manager and receive a certificate.

**Audio.** The debate: Kinga argues for the feature, Tamas for the rebuild, and they work towards option C together, showing how a PM and an engineer can reach a decision neither started with.

## 6. The training app and the zero-install setup

All facts in this section were checked against official docs, the repositories and Docker Hub on 9 October 2026, and the facts about GitHub Copilot and running Twenty's frontend from source on 11 October 2026. Anything that couldn't be confirmed is marked as unverified or listed in the trial checks at the end.

### Recommendation: Twenty, run by each learner in GitHub Codespaces

Every learner runs their own copy of the product in GitHub Codespaces, a development environment that runs in GitHub's cloud and opens in the browser. Nothing gets installed on the laptop, so admin rights don't come into it, and every learner has their own workspace, API keys and webhooks. Setting up the environment and starting the app are part of Mission 1, so learners also find out what a development environment is, how it differs from staging and production, and how a change to the code shows up in it.

|  | Mealie | Twenty | Mattermost |
| --- | --- | --- | --- |
| What it is | Recipe manager and meal planner for households | Open-source CRM: companies, people, deals | Team chat, an open-source Slack alternative |
| Feels like an enterprise product | Low | High: workspaces, roles and permissions, integrations, B2B data | High: enterprise chat with on-premises releases |
| What Mission 2 finds behind the browser | One container (Python FastAPI, SQLite) | Four services: server, background worker, Postgres and Redis | A Go server and Postgres |
| An API to try in the browser (Mission 3) | Swagger UI at `/docs` | REST and GraphQL playground under Settings → APIs & Webhooks | Static reference only; personal access tokens are off by default |
| Webhooks and no-code integrations (Mission 3) | Notifiers through Apprise, meal-plan webhooks | Signed webhooks on every record change, built-in workflows, an official Zapier app | Slack-compatible incoming and outgoing webhooks, slash commands, n8n and Zapier |
| Network tab for beginners | REST, easy to read | GraphQL: every request is called "graphql", so you open Payload to see which is which | REST under `/api/v4`, easy to read |
| Code a beginner can read | Best: small and conventional | Hardest: a very large TypeScript monorepo | Hard: large, in two languages |
| Work to package for one-click Codespaces | Least: it already ships a development container and runs as one container | Most: no development container (the project decided against one), four services plus the frontend running from source, and nobody publishes how much memory that needs | In between: an official all-in-one preview image, meant for evaluation only, plus an easy-to-miss edition trap (Entry vs Team) |
| Fits the story | Weak: no business customers or integrations | Strong: customers, deals, a renewal, integrations, and sync jobs on a worker with real GitHub issues | Medium |
| Licence | AGPL-3.0 | AGPL-3.0 core, with some files under Twenty's commercial licence: free to copy and change for development and testing, never to publish (see Risks). SSO, row-level permissions and audit logs need a paid key, and the course needs none of them | AGPL-3.0, with MIT-licensed builds |

**Why Twenty.** It shows what an enterprise PM needs to see: a backend made of several services, two API styles over the same data, signed webhooks, built-in workflows, roles, and a B2B story about customers, deals and integrations. Its email and calendar sync run as jobs on a background worker, and the project has dozens of real, closed GitHub issues about them (a backfill stalling on rate limits, duplicate messages), so the finale argues about a real part of a real codebase. Running it in each learner's own environment makes two missions better as well: in Mission 1 learners start the app and fix a bug in it themselves, in Mission 2 they find out what each service does, and in Mission 5 they deploy a fix to their own copy.

**What Twenty costs.** It's the heaviest of the three to run and ships no Codespaces setup, so we write one. With the frontend running from source as well, it probably needs the 4-core machine (unverified, and the first of the trial checks). Its code is the hardest of the three for a beginner to read, so code-reading stays small and guided (the deployment file, one pull request, issue threads), and learners who want to search the code use an AI agent. Its screens talk GraphQL, so the network tab needs one extra skill, opening the Payload tab, taught in Mission 1.

**The fallback is Mealie.** If Twenty doesn't fit the 4-core machine or takes too long to start, Mealie already ships a development container, runs as one container and has simpler code and a readable network tab. The price is a weaker story and a one-container backend, which makes "why a backend is usually several services" something we explain rather than show.

**Mattermost** is strong on webhooks, but it has no API console to try requests in, ships with tokens switched off, needs care to install the right free edition, and fits a CRM-and-renewal story less naturally.

### How each learner runs their own copy

**What the learner does.** One click on an "Open in GitHub Codespaces" button on our repository, then a wait while the codespace installs what the app needs (trial check 3 measures how long). Then a few commands in the terminal, each explained, start the app, and it opens from the Ports tab at the learner's own private address. The copy keeps its data between sessions. It stops by itself after 30 minutes without activity (GitHub's default) and starts again where it left off. The button has to be the one on our repository, not GitHub's "Use this template": a codespace created from a template can't change its machine type.

**Two versions of the app in one copy.** The ready-built app runs from Twenty's own published images, the same package customers' servers would run. Next to it, the frontend is built from its source code, and rebuilt in about a minute and a half when the code changes, and it sends its requests to the same server. (A development server that reloads by itself took over 3 minutes to load the page through the forwarded address, so the trial switched to rebuilding.) This is how Mission 1's fix gets tested: it shows up at the frontend's address and not in the ready-built app, which is the gap between fixed in development and fixed for customers. Running only the frontend from source keeps the machine smaller than building the whole of Twenty, and the bugs learners fix are in the frontend.

**What we build**

- Our training repository, [`productkind/twenty-pm-lab`](https://github.com/productkind/twenty-pm-lab): one public repository in the productkind organisation, used for the workshops and the whole learning journey. It's a GitHub fork of Twenty at the pinned version, plus our setup, seeded bugs and story data. Setup trims the project's history inside each codespace, from about 2 GB to under 200 MB. Workshop attendees and self-paced learners open the same repository, so its name, README, folders and branches never mention the workshop: everything is named by mission number, such as `mission-1-fix`. Because of Twenty's commercial licence (see Risks), we never publish an image or a build made from it, so each codespace builds what it needs. That rules out Mission 5's fix arriving as a new image version (decision 9 in section 15).
- A development container setup that:
  - runs the ready-built app's four services: the server and the worker from Twenty's own published image, plus the database and Redis. The server shows screens built from our repository during setup, so the ready-built app has the seeded bug too;
  - installs the frontend's dependencies and builds the frontend during setup, so learners only start it;
  - points Twenty's server address at the codespace's forwarded address, and lets the frontend's own server accept that address (by default it blocks addresses other than `localhost`);
  - asks for the 4-core, 16 GB machine as a minimum. With the app and the frontend running, the trial used about 10 GB of memory;
  - switches each mission's problems on with a setting.
- Short commands with names a PM can read: `start-app`, `load-story` and `start-frontend`, plus `show-log` for each part's log and `use-fix`, which switches a copy to a mission's fix.
- A branch with Mission 1's fix already in it, for anyone whose Copilot run fails.
- No prebuilds. We stay on GitHub Free, and prebuilds for an organisation's repository need GitHub Team or Enterprise, plus a payment method and a Codespaces spending limit. So every codespace installs the frontend's dependencies, builds the frontend and downloads the images when it's created, and trial check 3 measures how long that takes. If it's too slow, these options work on GitHub Free: install only the frontend's dependencies (`yarn workspaces focus twenty-front`, built into the Yarn 4 that Twenty uses); publish a development container image with the dependencies installed, as long as it holds none of Twenty's code; run the install and the image downloads at the same time; and pull the database and Redis images from a registry other than Docker Hub, which allows 100 pulls per 6 hours from one IP address without an account. Twenty's own image has to come from wherever Twenty publishes it, because copying it to our own registry would publish it.
- A shared fallback copy for each workshop, sized for the group, for attendees whose laptops can't run Codespaces.

**The free allowance.** A personal GitHub account gets 120 core-hours and 15 GB-months of storage a month, with no card, and usage stops at the limit instead of being charged. That's 60 hours on the 2-core machine or 30 hours on the 4-core one. The full lane needs roughly 5 hours of running time a week, counting the idle time before an automatic stop, so about 15 hours over the three weeks: 30 core-hours on 2 cores, 60 on 4. Both fit, with room for a bad week. Storage is the tighter limit: the installed frontend and the images take several gigabytes, and a learner who keeps two codespaces for a whole month could go over. Both numbers are estimates to check in the trial and the founding cohort.

**GitHub Copilot in the codespace.** Copilot has been built into VS Code since April 2026, so it should already be in every codespace without us adding it (trial check). Its free plan includes agent mode, which edits files across the code; the cloud agent that opens pull requests from an issue is paid only. Since June 2026 GitHub measures Copilot use in credits and doesn't publish the free plan's allowance, and free users can't choose a model, so two learners may get different results from the same prompt. Two more facts shape the setup email:

- The free plan isn't available on accounts an employer manages or on accounts that already get Copilot from an employer, so learners use a personal account.
- GitHub may train its models on free-plan prompts and code unless the user switches it off in their Copilot settings. The sandbox is made up, so nothing private is at risk, but the setup email shows how to switch it off. It's a good habit before Mission 7's data rules.

**Setting up the environment is a lesson, not a hurdle.** Learners click, wait, then start the app with a few commands, each one explained. The development container installs everything by itself, so nobody debugs an installation in week one. Without prebuilds the learner waits while it runs, and the workshop uses that wait to explain what a development environment is. What they learn is what started: the services, the file that lists them, the address their copy runs at, why an engineer's development environment, staging and production are three different places, and how a change to the code shows up in their copy and not in the ready-built app. Mission 4 comes back to it: when a customer's problem doesn't happen in your own copy, the difference in data, role, version or configuration is the first clue.

### What runs where

| Piece | Where it runs | What the learner needs |
| --- | --- | --- |
| The training product | The learner's own codespace: the ready-built app from Twenty's own images with screens built from our repository, and the frontend from its source code | A personal GitHub account, and Codespaces reachable from their network |
| The workshop | Each attendee's own codespace, created during the session; a shared fallback copy for laptops that can't run Codespaces | A personal GitHub account with Copilot's free plan turned on, or a partner who has one |
| Developer tools | Built into Chrome, Edge and Firefox; Safari needs them switched on in its settings | Developer tools not blocked by IT |
| Request inspector for webhooks | Our domain | A browser |
| Code, issues, pull requests and checks | github.com; github.dev also works for reading code, though it runs nothing | The same GitHub account |
| The help-centre site with preview links | The learner's own repository, created from our template, built by GitHub Actions and hosted on GitHub Pages | The same account; on a free plan the repository has to be public |
| Product analytics | PostHog Cloud, one shared project that every learner's copy sends events to | An invite; PostHog has no per-seat charges |
| The deeper track | A bigger codespace that builds the server and worker from source too | The same account |
| AI tools | GitHub Copilot's free plan inside the codespace, for Mission 1's fix and for questions about the code later on; otherwise whatever the learner's company approves, or a personal account used on sandbox material only | A personal account, because accounts an employer manages can't use Copilot's free plan |

- **Why the learner still ships a help-centre site.** A codespace is a development environment, not a place real users visit. So the full route of branch, pull request, checks, preview link, merge, live site and revert happens on a static site on GitHub Pages, which costs nothing and needs no extra account. Free hosts without a card couldn't run a copy of Twenty per learner anyway: Fly.io has no free tier for new organisations, Koyeb has closed its free plan, Google Cloud Run needs a billing account, and Render's free tier has 512 MB of memory and wipes local data when it sleeps.
- **A template, not a fork.** Workflows don't run in forks by default, and the preview action (`rossjrw/pr-preview-action`, maintained, MIT licence) doesn't support pull requests from forks. A repository created from a template runs Actions normally. GitHub Pages still has to be switched on by hand (Settings → Pages, deploy from the `gh-pages` branch), so the lab makes that a step of its own: switching on hosting. New repositories get a read-only token by default, so the template's workflow declares the write permissions it needs.
- **PostHog.** The free plan includes 1 million events a month and one project. Each learner's copy tags its events with the learner, so they can find their own in the live view. We generate three months of made-up usage ourselves, because PostHog has no public demo dataset, and send it with past timestamps through the capture API. Events can't be deleted selectively, so test the backfill in a separate throwaway organisation first.

### The laptop check

About ten minutes, linked from the workshop's setup email and repeated before the course starts.

1. Open a test page on our domain. This checks our domain isn't blocked.
2. Open developer tools and find the request called `laptop-check`. This checks they aren't disabled by company policy.
3. Sign in to GitHub and open the help-centre template. This checks GitHub isn't blocked for personal accounts.
4. Open a test codespace and the app inside it. Every lab, from Mission 1 on, runs in a codespace, so this is the step that decides the most.
5. In the test codespace, turn on Copilot's free plan and send it one message. This checks the account can use the free plan.

The result is green (the work laptop works for everything), amber (developer tools work but GitHub or Codespaces doesn't: the browser steps on the work laptop, with the fallback copy in the workshop, and the codespace on a personal one) or red (developer tools are blocked: a personal laptop for everything). If only Copilot fails, the learner pairs with someone whose account works, or uses the branch with the fix. Amber and red come with a ready-to-send message to IT. Chrome and Edge let IT allow developer tools on named sites while keeping them blocked elsewhere (the `DeveloperToolsAvailabilityAllowlist` policy). For Codespaces, GitHub documents the domains it needs and notes that proxies which inspect encrypted traffic break the connection. Its fix is to exempt `*.visualstudio.com`, and it publishes a test URL learners can open.

### Risks

- **Codespaces blocked at work.** Now the biggest risk, because every lab needs it. The laptop check catches it before anyone pays, and a personal laptop is the fallback. We found no data on how often companies block it.
- **IT blocks developer tools.** The allowlist request, or a personal laptop.
- **Support moves from one server to 25–60 environments.** Week one will bring setup questions. Tamas covers the stuck thread daily that week, and every fix goes into the setup or the hints.
- **The free hours run out.** A three-week course on the full lane uses about half the monthly hours even on the 4-core machine (see the free allowance above), so it happens only if a learner picks a bigger machine or runs the deeper track for long. The idle stop protects most of the allowance.
- **Copilot gets the fix wrong in the room, or the free allowance runs out.** GitHub doesn't publish the free plan's allowance, and free users can't choose the model. The trial measures both, and the branch with the fix means everyone still tests a fix.
- **No free Copilot on the learner's account.** Accounts an employer manages, or that already get Copilot from an employer, can't use the free plan. The setup email asks for a personal account, and the laptop check catches it before the workshop.
- **The codespace stops in the middle of the workshop.** Drawing the map and writing the bug report may not count as activity, and the default stop comes after 30 minutes. The trial checks it; if it happens, the setup email asks attendees to raise their idle timeout.
- **Phone-only learners.** Messages, audio and recall work on a phone; labs don't. The sales page says so.
- **AI tools blocked at work.** The sandbox is fictional, so a personal account on a personal device is fine for labs. At work, only approved tools, which Mission 7 covers.
- **The AGPL licence.** It requires us to offer the source of our modified Twenty to anyone we give it to or who uses it over a network, so our fork, seeded bugs included, is public. A determined learner could find a bug in the code, which is also a skill worth having. Check the obligations with someone who knows AGPL before launch; this note isn't legal advice.
- **Twenty's commercial licence.** 562 of Twenty's files, 56 of them in the frontend, are under Twenty's own commercial licence instead of the AGPL. Production use needs a paid subscription, and anyone may copy and change the files for development and testing without one. We use Twenty only for learning, never as our CRM or with real customer data, so every learner's copy is a development and testing copy. The licence forbids publishing or distributing the files and makes no exception for learning. So our repository is a GitHub fork (GitHub's terms let anyone fork a public repository on GitHub), we never publish an image or a build made from it, and we never copy Twenty's images to another registry. The shared fallback copy is the one grey area: we run it for other people, though only with made-up data and only during a workshop. Ask Twenty to confirm the learning use in writing before launch; this note isn't legal advice either.
- **Twenty moves fast.** v2.45 came out on 5 October and v2.46 four days later. Pin one version per run, so every learner's copy runs the same one, and upgrade between runs. VS Code and Copilot change every month, so re-run the Copilot checks a week before each workshop.

### Trial checks before committing

**For the workshop** (the week of 12 October, deciding on Friday 16 October)

1. Write the development container setup and find the machine it needs, with the ready-built app's four services, the frontend running from source, VS Code and Copilot's agent all running at once. Try the 2-core, 8 GB machine first, and set the 4-core machine as the minimum if it runs out of memory. Twenty's own troubleshooting page mentions out-of-memory errors when starting it from source.
2. Make setup a short lesson. The codespace opens with the file that lists the app's parts and a terminal. Three named commands start the ready-built app, start the frontend from source and load the story data. The server log stays running in a terminal, the database log is one command away (`show-log db`), and the database table view is one click away. Check that each command's output is something Tamas can narrate.
3. Time the first start without a prebuild (we stay on GitHub Free), three times on a new free account and the 4-core machine: until VS Code opens, until the dependencies are installed, until the ready-built app is ready, and the frontend's first load in the browser (thousands of small files through the forwarded address). Then time a restart after an idle stop, and note the codespace's size against the free 15 GB-months of storage. If creating the codespace and installing take more than about 10 minutes, everyone creates their codespace before Mission 1: workshop attendees from the setup email, as in the 90-minute version, and self-paced learners at the start of sitting 1.
4. Sign in through both forwarded addresses, the ready-built app's and the frontend's. The frontend's development server blocks unfamiliar addresses by default, and other projects report Codespaces changing a request header that login checks rely on.
5. Seed the story: companies, deals, the Calder account, the roles and a login for the new sales rep.
6. Seed Mission 1's bug so all four layers show it. The save is rejected by a database rule attendees can see in the table view (two companies can't share a web address). Real Twenty shows "This record already exists" in a pop-up message, so our version hides that message behind a spinner, in one small piece of frontend code that Copilot can find from a bug report. Tested on 28 October: the network tab shows a status of 200 with the error in the response, the server log shows nothing, and the database log shows the duplicate key. The status and the server log are Twenty's own behaviour and can't change without building our own server image, so the trail teaches both.
7. Open Copilot in a browser codespace with a new free account. Check that it's already there, what turning on the free plan looks like, and that it works on a network that blocks Copilot's own addresses. It should, because in a browser codespace Copilot runs on the codespace's machine, but GitHub doesn't say so directly.
8. Give Tamas's model bug report to agent mode ten times, on new free accounts. Record how often it fixes the bug, how long it takes, which files it changes and how much of the free allowance it uses. The workshop needs a working fix in at least nine runs out of ten, within five minutes.
9. Give it the one-line complaint ten times too. The workshop only claims the difference these runs show. If the complaint often works, the point becomes that only the learner with a bug report can tell whether it did.
10. Check that one command switches a copy to the branch with the fix, and that the frontend reloads with it.
11. Start 30 codespaces at once, in one region, and time them. Check that the image downloads don't hit Docker Hub's limit of 100 pulls per 6 hours from one IP address. If they do, pull the database and Redis images from another registry, and check where else Twenty publishes its image, because copying it to our own registry would publish it.
12. Run the whole workshop over a phone hotspot, to mimic venue wifi, and check the shared fallback copy copes with the expected room size.
13. On a locked-down work laptop, time creating a GitHub account from scratch, turning on Copilot's free plan and opening a codespace, then the full Mission 1 trail and the fix.
14. Check whether drawing the map and writing the bug report count as activity in the codespace. If they don't, the codespace could stop in the middle of the session after 30 minutes, so the setup email asks attendees to raise their default idle timeout (it goes up to 240 minutes).

Re-run checks 7–10 a week before each workshop, because VS Code and Copilot change every month.

**For the first run** (December)

15. Measure disk use against the free 15 GB-months, with the installed frontend and the images.
16. Check what a missing permission looks like. In the interface the object is hidden; over GraphQL it's a `FORBIDDEN` error. Confirm what the network tab shows when the rep opens a deal link.
17. A learner's copy has no real mailbox, so seed a connected email account whose sync has failed, and check its status shows somewhere a PM would look (Mission 4's fourth ticket).
18. Check whether workflows on self-hosted Twenty use credits.
19. Plant Mission 4's bug in the frontend the learner runs from source: a display-currency value cached in local storage and never refreshed after the workspace setting changes. Check whether Twenty already keeps a preference like this in local storage or we add one, that the story data can leave the stale USD value behind, that the session cookie and the key are easy to find in the Application tab, and that the fix is a few readable lines for Mission 5.

## 7. The audio briefings

- **Three kinds, up to three per mission, 8–10 minutes each.** The product story (Kinga), an engineer explains (Tamas) and a debate (both). Up to 18 episodes across the three weeks; the essentials lane needs none of them.
- **They arrive in the learner's own podcast app.** Each learner gets a private podcast feed, so a new briefing shows up next to the podcasts they already listen to on the commute. Attaching the new habit to an existing one is easier than creating a new one.
- **A question before, a question after.** The mission page and the first 20 seconds of the episode give one question to listen for ("Before you listen: why might the deals list load slowly only for big customers?"). Questions asked in advance help with exactly what they ask about and barely at all with the rest (St. Hilaire and colleagues' 2024 meta-analysis), so each one targets the single idea we most want remembered. The episode ends with one question to think through ("Which of Tamas's three reasons would you check first in your own product, and who would you ask?"). The next mission's recall step comes back to it.
- **Stories, mental models and arguments only.** Nothing the lab depends on, and no click-by-click steps. The evidence on learning from audio is mixed. Students given a podcast remembered less than students given the same text (Daniel and Woody, 2010). A meta-analysis of 46 studies found reading and listening about equal overall, with reading ahead for inference (Clinton-Lisell). Splitting attention while taking information in reduces later memory, and long, complex spoken explanations do worse than the same words written down (the transient information effect). So the briefings are short, optional enrichment, every one has a transcript on the mission page, and nothing on the critical path lives only in audio.
- **The debates disagree for real.** A PM and an engineer argue a trade-off, then say what they agree on and what they'd still argue about. Hearing two experts reason out loud is the "modelling" part of cognitive apprenticeship, and it shows learners what a healthy PM–engineer disagreement sounds like.
- **Episode shape.** A 30-second recap of the mission message, the idea, one example, the question, and a 20-second pointer to the lab.

## 8. Live sessions, feedback and getting unstuck

### Live sessions (60 minutes, Monday evenings, recorded)

Four sessions: the kickoff on the first Monday, a clinic on each of the next two Mondays, and the finale on the Monday after week 3 ends. One slot at 18:00 UK covers Europe and lunchtime on the US east coast; a second staggered slot is worth adding only if sign-ups show the US west coast or Asia.

- **The kickoff.** The story in two minutes, the two messages that open week 1, the two lanes and how to pick one, how the worked answers and self-check lists work, and learners book their lab slots. Twenty minutes of questions.
- **The clinics** (Mondays of weeks 2 and 3). **Two cases of 20 minutes each, 15 minutes of open questions, 5 minutes on the week ahead.** Questions can be sent in advance.
- **A case is** a sandbox lab output or a privacy-safe description of a real problem at work, including a Monday move that raised a question: no customer names, no screenshots of real data, no internal links. Learners submit by the Friday before and we pick two. Submitting is how your work gets discussed, which is the reason to submit. The live sessions are also the only place questions about a learner's own product are answered, since that work is never submitted.
- **How a case runs.** The owner describes it in three minutes. The group asks questions first, which is practice in asking the questions an engineer would ask, and the closest thing in the journey to the skill learners say they want: holding their own in a technical conversation. Tamas answers as an engineer would. Kinga coaches the product decision. The owner finishes by saying what they'll do on Monday.
- **The finale** (the Monday after week 3). Questions and discussion, no presentations: the two of you walk through your own briefs and why they disagree, then the floor is open for the rest of the hour. The before-and-after self-assessment and the certificate follow.
- **Recordings have chapters** and transcripts, so people who can't attend can still watch the two cases.

### No marked work, no partners

- **Nothing a learner makes is submitted, marked or reviewed.** Each lab output comes with a worked answer and a short self-check list drawn from it, so the learner sees what good looks like and where theirs differs. Personal feedback on documents is left out on purpose: asking people to write a bug report for the two of you to rate is too basic for this audience, it would cap the cohort at what two people can mark, and what learners pay for is time with you, which the four live sessions give everyone.
- **No learning partners and no peer review.** The self-paced part of the course exists so that everyone can do it whenever they have time. A partner puts someone else's calendar in the way, and the one large trial of accountability partners found no effect on completion (section 12). Learners who want company have the cohort channel and the clinics.
- **The feedback that remains is in the room.** A clinic case gets the group's questions and the two of you's answers, and the finale is an hour of discussion.

### Getting unstuck between sessions

1. **The hint ladder** in every lab step answers most questions without waiting for anyone.
2. **A "stuck" thread per mission** in the cohort's channel in the Discord, with a posting template: what I tried, what I expected, what I saw (screenshot) and my guess. That's the bug report format, so asking for help well is practice for Mission 4.
3. **We answer within one working day**, and add common answers to the lab's hints the same week. In week 1, when the setup questions come, Tamas checks the thread daily.
4. **Later:** an AI lab assistant that answers from the lab content and past answers, once we have enough real questions to test it on.

## 9. Designing for completion

A useful way to think about it is BJ Fogg's behaviour model (a design heuristic with little direct testing behind it): a behaviour happens when motivation, ability and a prompt come together. Professionals sign up motivated. What usually fails is ability and prompts: in week three, work gets busy, the next lab feels like a big job and nothing brings them back. So most of this section is about making each session easy to start, giving people a reason and a way to come back, and showing value at work every week so motivation lasts.

The evidence on getting adults to finish online courses is less encouraging than L&D articles suggest. Several popular tactics did little in large trials, so the table says which levers have weak evidence, and those are the ones to measure in the founding cohort.

| Lever | What we do | Basis, and how strong it is |
| --- | --- | --- |
| A fast first win | Mission 1 ends with a found bug and a map of the app, at the free workshop or in the learner's own time | Succeeding at the task yourself is the strongest source of self-efficacy (Bandura). For an audience that feels like "the least knowledgeable person in the room", this is the main job of the first hour |
| Starting with progress | Workshop attendees start the course with Mission 1 done, one of seven on the course map | Endowed progress: 34% finished a loyalty card with two stamps already on it, against 19% for a blank card of the same length (Nunes and Drèze). Consumer evidence, not learning |
| Deciding when, in advance | At the end of the workshop, learners book two recurring 40-minute lab slots and pick their audio moment. We send calendar files | If-then plans have a solid track record (Gollwitzer and Sheeran, d = 0.65). But across 247 MOOCs, planning prompts raised engagement in the first weeks and didn't raise completion (Kizilcec and colleagues, 2020). This gets people started; the rest of the table has to keep them going |
| A short commitment | Three weeks, with the whole story inside it | Our own judgement, backed by the format of Pocock's two-week cohort courses: three weeks is easier to say yes to than two months. The first run tests whether four hours a week is too much |
| A weekly rhythm that carries the work | Monday: the live session, and the week's two messages and episodes. Friday: the lab outputs done, the Monday moves planned, cases and questions in for Monday. A shared start date | In Patterson's MOOC experiment, reminders had no effect, while a commitment learners set for themselves raised completion by 40%. So the Monday email is the mission itself, not a nudge, and the booked slots are the learner's own commitment |
| Low effort to start | No installs, resume where you left off, sittings of 35–40 minutes with save points, and the essentials lane: a busy week costs about two and a half hours, not four and a half, and loses neither the story nor the Monday move | Ability, in Fogg's terms; learner-paced segments (Mayer) |
| Value at work every week | The Monday move: the same skill on the learner's own product, in the essentials lane because applying it at work is the point; never submitted or reviewed, and how far to take it is the learner's call. A wins thread where learners share what happened (privacy-safe) | Using the skill at work is the point of the course (Baldwin and Ford). Seeing peers succeed is another source of self-efficacy (Bandura) |
| The manager | A template message for the learner to send: what I'll learn, the time it takes, what I'll show you after week 2 and week 3. Sent with the self-assessment report | In Blume and colleagues' meta-analysis, a supportive work environment predicted whether training got used at work, and supervisor support more than peer support. Voluntary participation predicted it too, so when a company buys seats, joining stays the learner's choice. Also the route to expensing |
| Choice | The Monday move, the AI workflow, and the option to write the final brief about a real decision from work | Of the three self-determination needs, autonomy is the one most consistently linked to outcomes in online-course research |
| A way back after a bad week | The essentials lane; second sittings stay open after their week; Monday messages that say "start from here"; one free move to the next run | People start new goals more often after time landmarks such as a new week or month (Dai, Milkman and Riis). Archival evidence on diets and gym visits |
| A visible finish line | A course map with the three weeks and the finale on it, shown on day one; in week 3, "two missions to your certificate" | People speed up as a reward gets closer (Kivetz, Urminsky and Zheng). Consumer evidence |
| High points and a strong ending | Planned peaks: finding the request (Mission 1), the root-cause reveal (Mission 4), your change going live and rolling it back (Mission 5), and the final session with the before-and-after self-assessment | People judge an experience largely by its peak and its end (Kahneman and colleagues). In a learning study, a better ending made people more willing to repeat the session without making them learn more (Finn, 2010). So this serves recommendation and return, not learning |
| A person notices | After ten days without activity, a personal message from Kinga or Tamas, not an automated one, asking what got in the way. It doubles as research | Our own judgement: a personal message is the cheapest way for two people to find out why learners stop |

**What we leave out on purpose.** Daily streaks, which punish a busy week. Points and leaderboards: ranking people works against the "least knowledgeable person in the room" feeling the course is meant to fix. Long videos. Anything that needs installing.

## 10. Designing for recommendation

- **Templates that travel at work.** The bug report, the feasibility brief, the stakeholder update and the decision brief are formats a learner will reuse on their own product the following week. When a colleague asks where the format came from, that's a recommendation. The templates carry a small footer with the course name.
- **Share moments at the peaks.** Each week ends on one: the feasibility brief that goes to sales, the learner's first merged pull request, the final decision. At the finale, the certificate and a one-page portfolio (the learner's own system map and a summary of the decision brief) that works as a LinkedIn post.
- **Bring a colleague.** A second-seat discount for people from the same company. When a learner finishes, their manager gets the before-and-after summary and an offer for a team run.
- **Ask at the right moment.** A recommendation question after Mission 5 and at the finale. Learners who score 9 or 10 get a direct ask with a link to the next free workshop.
- **Alumni clinics.** A monthly open clinic for past learners keeps them close, gives them a reason to bring colleagues and gives us a steady supply of real cases.

## 11. The workshop and the course

**One trail, four formats**

| Format | Length | What attendees need | How it runs |
| --- | --- | --- | --- |
| In-person workshop | 2 hours, or 90 minutes in the shorter version | A laptop per pair, a GitHub account and Copilot's free plan turned on | The run of show in Mission 1 |
| Online workshop | 90 min | A browser, the account and Copilot set up from the email beforehand | The same trail, with Tamas in the chat instead of going round the room. The mini clinic on two volunteers' bug reports shows what the courses' live sessions are like |
| Conference talk | 20–30 min | Nothing | Kinga and Tamas start the app, walk the trail and run the Copilot fix live on screen, the audience predicts by phone poll, and the own-product exercise becomes homework |
| Company session | 90 min to 2 hours | As for the in-person or online workshop, plus a check that the company allows Copilot's free plan on personal accounts for sandbox work | The same workshop for one company's PMs, which leads straight to team seats |

- **The promise in the listing** is understanding how a web app works, for non-technical PMs: set one up, trace a bug through it, and fix the bug with an AI agent using the bug report. That's broad enough for general tech conferences (the first is Portugal Tech Week, on 13 November at PTW Palace) as well as product events, and the AI fix gives a tech-week audience a reason to pick this session.
- **Teach, never sell, from the stage** (the event playbook's rule). The story finishes in the room: the bug is found, explained, reported and fixed in the learner's own copy, and the own-product exercise gives attendees something to do the next day. The QR code at the end leads to the field guide, the recording and the self-assessment. It's also how we measure each event, with its own link per event.
- **The learning journey comes after the value.** At the online workshop, the last five minutes say what the journey covers. At conferences, the follow-up email does it.
- **The bridge is the copy attendees already have.** "Your copy is still in your GitHub account, and Mission 2 starts from it." The offer is the course: the start date, the price and what's included, framed as momentum ("Keep going: three weeks, the whole story"). Unused codespaces are deleted after 30 days by default, so when the course starts later than that, the bridge is the same one-click setup rather than the copy itself.
- **The expense route.** The manager message template, an invoice and the outcomes written in an employer's language.
- **Follow-up emails.** Day 1: the recording, the field guide and Tamas's model bug report. Day 3: a full audio briefing from Mission 2 with its transcript. Day 5: what two attendees found on their own products, with permission. Then the course offer, closing before the start date.
- **The self-paced Mission 1** (section 5) is for anyone who can't attend live or joins later, so sign-up can stay open between runs and nobody has to wait for the next event to start. It uses chapters of a workshop recording as its worked answers, so the first online workshop on 17 November needs recording.
- **Size.** Up to about 40–60 people in person, with Tamas and one helper going round and pairs halving the number of setups. Online, the same, with Tamas in the chat.
- **Choosing events.** The event playbook scores audience fit for non-technical women who build with AI. For this workshop the fit row should score non-technical software PMs, and the event list should add product events (Mind the Product, ProductTank meetups, Women in Product) and in-company sessions.

**The cohort format, and what it borrows**

The shape follows Matt Pocock's two-week cohort courses on aihero.dev, as the course page described them on 4 November 2026: all lessons drop on day one so people can "work ahead or take it slow", office hours on three days (kickoff, end of week one, end of week two) with two time-zone slots each, questions sent in advance, recordings and transcripts, a channel in the Discord for the cohort, a free self-guided course before it, and everything "yours to keep forever". His page states no deadlines, no submissions and no weekly hours. What this design borrows is the drop, the few live sessions at the week boundaries, the free pre-course and the keep-forever access. The deadlines, the peer review and the personal feedback come from sections 8 and 9.

- **One course, one price.** The whole arc in one purchase, which is what the research's price range in section 15 is for. Nothing is sliced off to sell separately until a cohort has said what it would pay for.
- **Release.** The promise is everything on day one. If the build in section 14 can't deliver that for the first run, each week's two missions open on its Monday, and the promise is made from the second run.
- **Deadlines.** Only one kind: clinic cases and questions are in by the Friday before each session. Lab outputs are never due, and the Monday moves are never submitted. The pace comes from the two missions on the map each week and the Monday session.
- **Keep forever.** The missions, the recordings, the transcripts, the templates and the learner's own repository stay with them after the course.

**The first run: from 18 January 2027**

| Date | What happens |
| --- | --- |
| Wed 13 or Thu 14 January | Free online workshop (Mission 1). Enrolment closes Friday 15 January. |
| Mon 18 January | **Live:** the kickoff. Week 1 opens: Missions 2 and 3. |
| Fri 22 January | Cases and questions in for Monday. |
| Mon 25 January | **Live:** clinic. Week 2 opens: Missions 4 and 5. |
| Fri 29 January | Cases and questions in for Monday. Merged pull request share moment; first recommendation question. |
| Mon 1 February | **Live:** clinic. Week 3 opens: Mission 6, then Mission 8. |
| Fri 5 February | Week 3 wraps: the decision brief done and compared with the worked answers. Questions in for the finale. |
| Mon 8 February | **Live:** the finale. |
| Wed 10 February | Certificate and one-page portfolio sent. |

Three weeks of work, four live sessions of 60 minutes, done by 8 February. Monday evening is the slot because Monday is the fresh-start landmark the completion research points to (section 9) and because a session that opens a week gives its first message a live send-off; Wednesday, the original clinic day, works the same way if Mondays prove hard.

## 12. The learning science behind it

Each claim below was checked against the original paper or a reliable summary on 9 October 2026. Most of this research was done with school and university students, much of it in maths, so the founding cohort is where we find out how well it carries over to working PMs.

| Principle | What the research says | Where it shows up | Caveat |
| --- | --- | --- | --- |
| Problem-centred design: goal-based scenarios (Schank and colleagues, 1994); first principles of instruction (Merrill, 2002) | Learning works best around a realistic task: activate what learners know, demonstrate, let them apply it with feedback, then use it in their own world | One product, one story; every mission starts with a message; Monday moves | Design frameworks drawn from practice, not measured effects |
| Cognitive apprenticeship (Collins, Brown and Newman, 1989) | Experts make their thinking visible (modelling), then coach, give support that fades, and ask learners to explain and reflect | Worked answers narrated by Tamas and Kinga; the debates; the clinics | A framework, not a measured effect |
| Worked examples and fading (Sweller and Cooper, 1985; Kalyuga and colleagues, 2003; Renkl and Atkinson, 2003) | Beginners learn more from studying worked solutions (g = 0.48 in a 2023 maths meta-analysis). The benefit shrinks or reverses as expertise grows. Removing steps gradually helps | Every click shown in Mission 2, goal and hints by Mission 4, a template by Mission 8 | In the same meta-analysis, adding self-explanation prompts to worked examples did worse than the examples alone, so the question after each worked answer is a single, optional one |
| Productive failure (Kapur, 2008; Sinha and Kapur, 2021) | Trying a problem before being taught, then getting instruction, helped transfer (g = 0.36 across 53 studies) | Predict, then lab, then worked answer, from Mission 4 onwards | Reversed for young children; little evidence on working adults; in tension with worked examples, hence the order in section 4 |
| Retrieval practice and spacing (Roediger and Karpicke, 2006; Cepeda and colleagues, 2006) | Testing yourself beats rereading at a week's delay. Spreading practice out beats cramming, and the best gap grows with how long you need to remember | Recall questions at the start of each mission, drawn from all earlier ones | Mostly lab studies over days or weeks |
| Interleaving (Rohrer and Taylor, 2007; Brunmair and Richter, 2019) | Mixing problem types helps when the types are easy to confuse (g = 0.42 overall) | Mixed recall questions, and Mission 4 keeping the server, a cookie and local storage apart; the four-ticket sort was cut on 5 November, so this now leans on recall | Didn't help for expository text, and hurt for word lists |
| Pretesting (Richland, Kornell and Kao, 2009; St. Hilaire and colleagues, 2024) | Trying to answer before studying improves learning of the questioned content (g = 0.54), with almost no benefit to other content (g = 0.04) | The predict step; one question before each briefing | Write the question about exactly what you want learned |
| Generation effect (Slamecka and Graf, 1978; Bertsch and colleagues, 2007) | Producing material yourself beats reading it, by about 0.40 of a standard deviation | Predictions, artefacts, writing the bug report before seeing ours | Varies a lot by material |
| Multimedia principles (Mayer, 2017) | Learner-paced segments help (d = 0.70); so does signalling the structure | Sittings with save points; the same eight steps every week | Mostly short lab lessons with immediate tests |
| Learning from audio (Daniel and Woody, 2010; Clinton-Lisell meta-analysis; Leahy and Sweller, 2011) | Mixed: reading beat a podcast in one classroom study; across 46 studies, reading and listening came out about equal, with reading ahead for inference; long, complex spoken explanations do worse than written ones | Briefings are short, optional and transcribed, and never carry anything the lab needs | No direct study of conceptual against procedural audio; our split is an inference |
| Feedback (Hattie and Timperley, 2007; Wisniewski, Zierer and Hattie, 2020; Kluger and DeNisi, 1996) | Feedback helps on average (d = 0.48), more when it carries more information, and over a third of interventions made things worse, especially feedback aimed at the person | Worked answers and self-check lists after every lab, no marked work, so the person-directed feedback that made things worse in Kluger and DeNisi's review can't happen | High variation between studies |
| Transfer of training (Baldwin and Ford, 1988; Blume and colleagues, 2010) | Whether training gets used at work depends on the learner, the training design and the work environment; supervisor support and voluntary participation both predicted transfer | Monday moves, the manager message, voluntary team seats | The authors flag inconsistent ways of measuring transfer |
| Self-efficacy (Bandura, 1977) | Belief in your ability to do a task comes mainly from doing it successfully, then from seeing peers do it | Mission 1's bug, found and then fixed with Copilot; the wins thread |  |
| Self-determination theory (Deci and Ryan; Ryan and Deci, 2000) | Autonomy, competence and relatedness support motivation; autonomy is the one most consistently linked to outcomes in online-course research | Choice of Monday move, AI workflow and final brief; clinics; partners | Mostly self-report surveys; few studies measure actual completion |
| Implementation intentions (Gollwitzer and Sheeran, 2006; Kizilcec and colleagues, 2020) | If-then plans help people act (d = 0.65), but planning prompts across 247 MOOCs raised early engagement and not completion | Booking lab slots at the workshop | Expect it to help the start, not the finish |
| Commitment and accountability (Patterson, 2018; Li and colleagues, 2025) | A self-set commitment raised MOOC completion by 40%; reminders alone did nothing; prompting people to find an accountability partner had no average effect | Booked slots as the learner's own commitment; no partners, because the trial found no effect and a partner's calendar works against self-pacing | One course and one trial each |
| Endowed progress, goal gradient, fresh start (Nunes and Drèze, 2006; Kivetz and colleagues, 2006; Dai, Milkman and Riis, 2014) | Pre-filled progress, a close finish line and time landmarks all increase effort | A workshop's Mission 1 counts; the journey map; Monday restarts | Consumer and health settings, not learning |
| Peak-end rule (Kahneman and colleagues, 1993; Finn, 2010) | Experiences are remembered largely by their peak and their end; a better ending makes people more willing to repeat | Planned peaks and the final clinic | Shapes willingness to come back and recommend, not learning |
| Curiosity (Loewenstein, 1994) and the Ovsiankina effect (Ghibellini and Meier, 2025) | Noticing a gap in what you know creates curiosity; people tend to go back to unfinished tasks | The mission message; the teaser at the end of each worked answer | The Zeigarnik effect (better memory for unfinished tasks) didn't hold up in the same meta-analysis |

**Claims we deliberately don't use:** learning styles, the "learning pyramid" retention percentages, 70:20:10, "only 10% of training transfers", the eight-second attention span, and fixed forgetting-curve percentages. None of them has the evidence its popularity suggests.

## 13. The founding cohort: what we'd measure

- **Size:** 15–25 learners at a founding price, in exchange for detailed feedback.
- **We use analytics on ourselves.** The course teaches product analytics, so it should be instrumented properly:
  - per mission: started, lab finished, lab output compared with the worked answer, Monday move reported, which shows exactly where people stop;
  - per week: which lane each learner took, and whether essentials-lane learners come back for the second sittings;
  - a one-question weekly pulse: "How useful was this week for your actual work? 1–5, and why?". Since nothing about the learner's own product is ever submitted, this is the only measure of whether the Monday moves are landing, and the first thing to read each week;
  - live-session attendance and recording views;
  - hint use per lab step, to find confusing steps;
  - setup: the time from clicking the button to a running app, and how many learners needed help with it;
  - the Copilot fix: how many attendees got a working fix from their bug report, and how many needed the branch with the fix;
  - how many learners who didn't attend a workshop finish the self-paced Mission 1, compared with attendees' completion of Mission 2;
  - the recommendation question after Mission 5 and at the end, and referrals (invites sent, colleagues who joined);
  - the before-and-after self-assessment;
  - wins reported, counted and kept as stories.
- **Targets to test, not promises:** 80% finish Mission 2, 70% submit a bug report, 60% submit a decision brief. For comparison, and none of these is a like-for-like benchmark: on MIT and Harvard's edX courses in 2017–18, 46% of paying learners completed, against 3% of all participants (Reich and Ruipérez-Valiente, 2019). A course platform's own data shows scheduled cohorts completing at 53% and open self-paced courses at 42% (Ruzuku, 2026, observational). HBS Online reported 85% for its paid, application-based CORe programme. Price, selection and different definitions of "completed" muddy every one of these, and the 90%-plus figures quoted for altMBA have no primary source.
- **Planning prompts get a test of their own.** The evidence is weak (section 9), so compare completion between learners who did and didn't book their slots. Learners choose this themselves, so read the result as a signal, not proof.
- **The lanes are the first thing to read.** If most learners take the essentials lane every week, four and a half hours was the wrong promise and the next run is four weeks at about three and a half. If most take the full lane and finish, three weeks holds.
- **The Monday moves get the same treatment.** Compare pulse scores between learners who report doing their Monday moves and learners who don't. Whether PMs will apply the week's skill to their own product between sessions is the open question this design rests on; the user interviews should ask it before the first run and the pulse answers it during.
- **Interviews:** five learners who finished, and every learner who stopped and is willing to talk.

## 14. What to build first

There are two of you, and the course is three weeks long, so there is no building during the run worth planning on. Aim to have everything built by 18 January, and treat weekly release as the fallback: week 2 by 25 January, week 3 by 1 February, which buys one and two weeks for the later missions. There are ten working weeks between 4 November 2026 and 18 January 2027 with Christmas in the middle, so the list below is the critical path. Folding Mission 7 away and moving four sittings into audio and worked answers is what makes it fit.

**Before launch**

- The one-click environment: our training repository, a development container setup that builds the frontend in each codespace and runs the ready-built app and the frontend from source, the story data, the missions' problems behind settings and analytics instrumentation.
- For each workshop: the setup email, the shared fallback copy, the field guide, a recorded run of the trail, Tamas's model bug report tested as a Copilot prompt, the branch with the fix and a recorded run of the one-line complaint.
- A request inspector on our own domain.
- The help-centre repository template, with checks and preview links.
- The cohort's analytics project with three months of made-up usage.
- Mission 1, both the workshop and its self-paced version, and Missions 2 and 3, with their audio.
- Mission pages, a cohort channel in the Discord, a private podcast feed, calendar files, the lab output templates with their self-check lists.

**By 18 January, or by the weekly fallback dates:** Missions 4 and 5 (25 January at the latest), Mission 6 and Mission 8 with Mission 7's AI step and Monday move folded in (1 February at the latest), with their audio. Then the feedback and the live sessions as they come.

**Later:** the AI lab assistant, a team dashboard for managers, and the deeper track.

## 15. Decisions for the two of you

1. **The training app.** I recommend Twenty, run by each learner in GitHub Codespaces, with Mealie as the fallback (section 6). Run the trial checks before deciding, above all which machine Twenty needs with the frontend running from source, and whether Copilot fixes Mission 1's bug from the bug report reliably.
2. **The workshop's length.** Two hours with the setup and the Copilot fix, or the 90-minute version in Mission 1, which moves codespace creation into the setup email and the own-product exercise into homework.
3. **The fictional company and customer names.**
4. **Price and seats.** The research suggests €400–€800 is a defensible range to test for an applied programme with feedback and a substantial output. One price for the whole course, at a founding discount for the first cohort.
5. **Where it lives.** Your own site plus a community tool, or a cohort platform such as Maven that handles payments, reimbursement letters and discovery for a fee.
6. **The live-session slot.** Monday or Wednesday evening, and one slot for the UK, Europe and US East or two staggered ones.
7. **AI prototyping.** A headline step, as on the waitlist page, or one of five options in the week 3 Monday move menu, as proposed here.
8. **The lanes.** About four and a half hours a week on the full lane and two and a half on the essentials is the proposal, with the Monday move in both. If you'd rather promise less, the same content fits four weeks at about three and a half hours, with the finale on 15 February.
9. **Mission 5's deploy.** It was planned as a new image version of the product, which Twenty's commercial licence rules out (section 6, Risks). I suggest a `deploy` command instead: it fetches the merged fix, builds it and restarts the ready-built app, so the learner still watches the services stop and start, and sees the app go down for a minute.
10. **Release.** Everything on day one, as promised, or week by week for the first run if the build slips (section 14).

## 16. Where the waitlist page now disagrees with this design

The waitlist page at [littleparrot.app/guides/technical-product-manager](https://littleparrot.app/guides/technical-product-manager) was written for the earlier card-based plan. Its text matched the earlier version in `productkind/site/src/TechnicalProductManager.tsx` when checked on 11 October 2026. If you go with this design, these lines need changing:

- **The page describes one eight-step path.** This design is a free workshop followed by one three-week course of seven missions.
- **"How the learning path works"** says every step is "in short cards you can work through on your phone". The labs here need a laptop browser; only the audio, the messages and the recall questions work on a phone.
- **The FAQ "How long does it take?"** says each step "takes under an hour, in short cards you can work through on your phone". The course here is three weeks at about four and a half hours a week, with an essentials lane of about two and a half.
- **The page doesn't mention** the free workshop, the live sessions or the audio briefings, which the research says are what people pay for.
- **The step order.** Bug triage now comes before deployment. The page already says the order may change.
- **Step 7, "AI prototyping for product managers".** Your new topic list says "Using AI for product management workflows". This design makes prototyping one option in the week 3 Monday move menu.
- **Step 5, "SQL and product analytics".** Still covered, with tracking plans and checking events added, as in your topic list.
- **The SEO description and the FAQ "Will I learn to code?"** both say learners build an AI prototype in the last step. Here, prototyping is one option in the week 3 Monday move menu, and the last step is the technical debt decision.

## Sources

### Our own research

- [PM technical-fluency opportunity synthesis](../../../productkind/ai-research/pm-technical-fluency/pm-technical-fluency-opportunity-synthesis-2026-08.md), 24 August 2026
- [Non-technical PM technical needs, 2024–2026](../../../productkind/ai-research/pm-technical-fluency/non-technical-pm-technical-needs-2024-2026.md)
- [Whole-course value propositions](../../../productkind/ai-research/pm-technical-fluency/pm-technical-fluency-whole-course-value-propositions-2026-08.md), 25 August 2026
- [Willingness to pay for PM technical-fluency transformations](../../../productkind/ai-research/pm-technical-fluency/pm-technical-fluency-willingness-to-pay-2026-08.md), 24 August 2026
- [Technical Product Confidence self-assessment specification](../../../productkind/ai-research/pm-technical-fluency/technical-product-confidence-widget-specification-2026-08.md)
- [Overwhelmed product managers told to use AI](../../../productkind/ai-research/pm-use-ai/2026-08-26-overwhelmed-product-managers-ai.md), 26 August 2026

### Learning science and behaviour change

Titles and journal names are quoted as published, so `check-banned.py` reports their American spellings ("behavior", "organization"). Ignore those hits; correcting them would misquote the source.

- Baldwin, T.T. and Ford, J.K. (1988). Transfer of training: A review and directions for future research. _Personnel Psychology_, 41(1), 63–105.
- Bandura, A. (1977). Self-efficacy: Toward a unifying theory of behavioral change. _Psychological Review_, 84(2), 191–215.
- Barbieri, C.A. and colleagues (2023). A meta-analysis of the worked examples effect on mathematics performance. _Educational Psychology Review_. https://doi.org/10.1007/s10648-023-09745-1
- Bertsch, S. and colleagues (2007). The generation effect: A meta-analytic review. _Memory & Cognition_, 35(2), 201–210.
- Blume, B.D., Ford, J.K., Baldwin, T.T. and Huang, J.L. (2010). Transfer of training: A meta-analytic review. _Journal of Management_, 36(4), 1065–1105. https://journals.sagepub.com/doi/10.1177/0149206309352880
- Brunmair, M. and Richter, T. (2019). Similarity matters: A meta-analysis of interleaved learning and its moderators. _Psychological Bulletin_.
- Cepeda, N.J., Pashler, H., Vul, E., Wixted, J.T. and Rohrer, D. (2006). Distributed practice in verbal recall tasks. _Psychological Bulletin_, 132(3), 354–380.
- Clinton-Lisell, V. (2022; online December 2021). Listening ears or reading eyes: A meta-analysis of reading and listening comprehension comparisons. _Review of Educational Research_.
- Collins, A., Brown, J.S. and Newman, S.E. (1989). Cognitive apprenticeship: Teaching the crafts of reading, writing, and mathematics. In L.B. Resnick (Ed.), _Knowing, learning, and instruction_ (pp. 453–494). Erlbaum.
- Dai, H., Milkman, K.L. and Riis, J. (2014). The fresh start effect. _Management Science_, 60(10), 2563–2582.
- Daniel, D.B. and Woody, W.D. (2010). They hear, but do not listen: Retention for podcasted material in a classroom context. _Teaching of Psychology_, 37(3), 199–203.
- Finn, B. (2010). Ending on a high note: Adding a better end to effortful study. _Journal of Experimental Psychology: Learning, Memory, and Cognition_, 36(6), 1548–1553.
- Fogg, B.J. (2009). A behavior model for persuasive design. _Persuasive '09_, ACM. https://doi.org/10.1145/1541948.1541999
- Ghibellini, R. and Meier, B. (2025). Meta-analysis of the Zeigarnik and Ovsiankina effects. _Humanities and Social Sciences Communications_, 12. https://doi.org/10.1057/s41599-025-05000-w
- Gollwitzer, P.M. and Sheeran, P. (2006). Implementation intentions and goal achievement: A meta-analysis. _Advances in Experimental Social Psychology_, 38, 69–119.
- Hattie, J. and Timperley, H. (2007). The power of feedback. _Review of Educational Research_, 77(1), 81–112.
- Kahneman, D., Fredrickson, B.L., Schreiber, C.A. and Redelmeier, D.A. (1993). When more pain is preferred to less: Adding a better end. _Psychological Science_, 4(6), 401–405.
- Kalyuga, S., Ayres, P., Chandler, P. and Sweller, J. (2003). The expertise reversal effect. _Educational Psychologist_, 38(1), 23–31.
- Kapur, M. (2008). Productive failure. _Cognition and Instruction_, 26(3), 379–424.
- Kivetz, R., Urminsky, O. and Zheng, Y. (2006). The goal-gradient hypothesis resurrected. _Journal of Marketing Research_, 43(1), 39–58.
- Kizilcec, R.F. and colleagues (2020). Scaling up behavioral science interventions in online education. _PNAS_, 117(26), 14900–14905. https://pmc.ncbi.nlm.nih.gov/articles/PMC7334459
- Kluger, A.N. and DeNisi, A. (1996). The effects of feedback interventions on performance. _Psychological Bulletin_, 119, 254–284.
- Leahy, W. and Sweller, J. (2011). Cognitive load theory, modality of presentation and the transient information effect. _Applied Cognitive Psychology_, 25, 943–951.
- Li, Kizilcec, Cho and Krasny (2025). A randomised trial (n = 1,259) of prompting online learners to find an accountability partner. _Online Learning_.
- Loewenstein, G. (1994). The psychology of curiosity: A review and reinterpretation. _Psychological Bulletin_, 116(1), 75–98.
- Mayer, R.E. (2017). Using multimedia for e-learning. _Journal of Computer Assisted Learning_, 33(5), 403–423.
- Merrill, M.D. (2002). First principles of instruction. _Educational Technology Research and Development_, 50(3), 43–59.
- Nunes, J.C. and Drèze, X. (2006). The endowed progress effect. _Journal of Consumer Research_, 32(4), 504–512.
- Patterson, R.W. (2018). Can behavioral tools improve online student outcomes? _Journal of Economic Behavior & Organization_, 153, 293–321.
- Reich, J. and Ruipérez-Valiente, J.A. (2019). The MOOC pivot. _Science_, 363(6423), 130–131. https://doi.org/10.1126/science.aav7958
- Renkl, A. and Atkinson, R.K. (2003). Structuring the transition from example study to problem solving. _Educational Psychologist_, 38(1), 15–22.
- Richland, L.E., Kornell, N. and Kao, L.S. (2009). The pretesting effect. _Journal of Experimental Psychology: Applied_, 15(3), 243–257.
- Roediger, H.L. and Karpicke, J.D. (2006). Test-enhanced learning. _Psychological Science_, 17(3), 249–255.
- Rohrer, D. and Taylor, K. (2007). The shuffling of mathematics problems improves learning. _Instructional Science_, 35(6), 481–498.
- Ruzuku (2026). Cohort vs self-paced completion study (vendor data, observational). https://www.ruzuku.com/learn/articles/cohort-vs-self-paced-completion-study
- Ryan, R.M. and Deci, E.L. (2000). Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. _American Psychologist_, 55(1), 68–78.
- Schank, R.C., Fano, A., Bell, B. and Jona, M. (1994). The design of goal-based scenarios. _Journal of the Learning Sciences_, 3(4), 305–345.
- Sinha, T. and Kapur, M. (2021). When problem solving followed by instruction works: Evidence for productive failure. _Review of Educational Research_, 91(5), 761–798.
- Slamecka, N.J. and Graf, P. (1978). The generation effect. _Journal of Experimental Psychology: Human Learning and Memory_, 4(6), 592–604.
- St. Hilaire, K.J., Chan, J.C.K. and Ahn, D. (2024). Meta-analysis of prequestion effects on learning. _Psychonomic Bulletin & Review_.
- Sweller, J. and Cooper, G.A. (1985). The use of worked examples as a substitute for problem solving in learning algebra. _Cognition and Instruction_, 2(1), 59–89.
- Wisniewski, B., Zierer, K. and Hattie, J. (2020). The power of feedback revisited. _Frontiers in Psychology_, 10, 3087. https://www.frontiersin.org/articles/10.3389/fpsyg.2019.03087/full
