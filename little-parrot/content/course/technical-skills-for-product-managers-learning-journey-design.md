# Technical PM learning journey: design proposal

**Date:** 9 October 2026 **For:** Kinga and Tamas **Builds on:** the PM technical-fluency research in [`productkind/ai-research/pm-technical-fluency/`](../../../productkind/ai-research/pm-technical-fluency/), the research on PMs being told to use AI in [`productkind/ai-research/pm-use-ai/`](../../../productkind/ai-research/pm-use-ai/), and the waitlist page at [productkind.com/technical-product-manager](https://productkind.com/technical-product-manager) **Status:** a proposal to discuss. Nothing in it is built yet. Times, costs, workloads and completion targets are estimates or hypotheses to test.

## The design on one page

- **Shape.** A free live workshop that is also Mission 0, then an eight-week season: seven missions, one a week, with a catch-up week in the middle. Learners work at their own pace inside the season window, with a weekly live case clinic and a help channel we answer within one working day.
- **One product, one story.** The learner joins a fictional software company as its newest PM. The product is a real open-source app (the recommendation is Twenty, an open-source CRM). Each learner runs their own copy in a cloud development environment that opens in the browser, set up with one click, with our story data and problems we break on purpose. Nothing gets installed on their laptop. Every mission starts with a message from a colleague or a customer: a problem or a decision, with a deadline.
- **The same rhythm every week.** Predict, investigate in the real product, compare with a worked answer, produce a work artefact, then use it in your own job the following week (the "Monday move").
- **Audio for the commute.** Each mission has up to three optional 8–10 minute briefings (the product story, an engineer explains, a debate), delivered to the learner's own podcast app, with a question to think about before and after, and a transcript.
- **The missions add up.** Evidence planted in earlier missions (an escalation the network tab can't explain, a flaky test, a worrying number in the data) all points to the same part of the system. The final mission asks the learner to decide whether to fix it or build the feature a big customer is asking for.
- **Feedback from the two of you.** Personal feedback on the bug report (Mission 3) and the final decision brief (Mission 7), worked answers straight after every lab, and weekly case clinics where learners bring sandbox work or a privacy-safe problem from their job.
- **Built to be finished.** About two hours a week, booked into the calendar during the workshop; a learning partner; a short agreement with the learner's manager; an essentials lane for busy weeks; a catch-up week; no streaks and no guilt messages.

## 1. What we're designing for

### The learner

Practising software PMs without an engineering background, many of them in enterprises with complex architecture. They know what their product does but not how it works. Our research found that what they want is judgement and independence rather than programming. The language in the strict validation sample: "nodding along in standups, pretending to get it", "sometimes it does feel like I'm the least knowledgeable person in the room", "can you explain in simpler terms" ([synthesis](../../../productkind/ai-research/pm-technical-fluency/pm-technical-fluency-opportunity-synthesis-2026-08.md)).

The research also recommended one coherent mechanism for the whole course: learners work through **one software product and one consequential product change** instead of disconnected lessons on APIs, Git or CI/CD ([whole-course value propositions](../../../productkind/ai-research/pm-technical-fluency/pm-technical-fluency-whole-course-value-propositions-2026-08.md#the-shared-whole-course-mechanism)). This design is built on that recommendation.

### What people pay for

The willingness-to-pay research found that buyers pay for structured practice, expert feedback, live access, doing the work alongside peers and a finished artefact. The information itself is available free. Maven's case study of Tech for Product says the instructor gives the information away and students pay for the live sessions, follow-up access and doing the work with peers. Skiplevel reports that 61% of its students expense the programme ([willingness to pay](../../../productkind/ai-research/pm-technical-fluency/pm-technical-fluency-willingness-to-pay-2026-08.md)).

So in this design the feedback, the clinics and the artefacts are the core of the product, and the route to an employer paying is built in from the first day.

### Constraints

- **Company laptops.** Many learners can't install software, and some companies restrict developer tools, GitHub or AI tools. Section 6 covers this.
- **Two of us.** Live time and personal feedback have to be capped per learner, and the labs have to run without us.
- **Busy learners.** The journey has to fit around a full-time job, with weeks when nothing gets done.
- **The Little Parrot format didn't engage enough for this.** This journey uses hands-on labs at a computer, audio and live clinics, and keeps short phone-sized pieces only for recall questions and reading the mission message.

### What success looks like

Learners finish, use what they learned at work during the season (not after it), and tell colleagues. Section 13 turns that into measures.

## 2. The core idea: one product, one season, one decision

Learners spend the whole season inside one product. They join a fictional company that sells the training app to business customers. The software is real: a real frontend, a real API, a real database, real code on GitHub and a real release pipeline. Only the company, its customers and the data are made up.

### Why one product

- **It's what our research asked for.** The highest-value questions are about the PM's own product, which no generic explainer can answer. One product traced end to end is the closest practice we can give.
- **Problem-first learning.** Schank's goal-based scenarios and Merrill's first principles of instruction both start from a realistic problem the learner wants to solve, and bring in each skill when the problem needs it. A PM who needs to answer a security questionnaire by Friday has a reason to learn what a worker process is.
- **Transfer.** Practice that looks like the real job is more likely to be used in the real job. A CRM with permissions, integrations and background jobs looks much more like an enterprise product than a to-do app.

### The cast

- **You:** the new PM for integrations and the email and calendar sync, two weeks into the job.
- **Colleagues who appear in messages, tickets and emails:** the engineering lead, the head of sales, the customer success lead, the data analyst, the head of product.
- **The customer:** a mid-sized logistics company (working name: Calder Freight) whose renewal is coming up in March.
- **Kinga and Tamas as themselves.** They talk through each case in the audio briefings and run the clinics as a lead PM and a principal engineer. They never play characters. Acting is hard to do well, and what learners are paying for is time with two real people who have done this work.

### The season arc

The learner meets the same customer and the same part of the system from a different angle each week:

| Mission | What the learner finds | Where it leads |
| --- | --- | --- |
| 1 | Email and calendar sync run as jobs on a background worker | The part of the system the finale is about |
| 2 | The incoming half of Calder's integration would run as more jobs on the same worker and queues | The feature in the finale |
| 3 | The one escalation the network tab can't explain comes from the email sync, and the real open-source project has dozens of closed issues in the same area | Evidence for the rebuild |
| 4 | A small fix for a different bug waited a day because a flaky test in the sync code failed twice | Evidence that the debt slows every release |
| 5 | Customers whose email sync failed in their first month are less likely to still be active at day 60 | Evidence of customer impact |
| 7 | Sales needs the integration for Calder's renewal; engineering wants a sprint to rebuild the sync jobs first. One sprint. | The final decision |

The final decision is hard because of everything before it. That's the design: the learner sees the skills combine into one product decision instead of sitting in separate boxes.

## 3. The journey at a glance

| When | Mission | The message that starts it | What you do in the product | What you leave with |
| --- | --- | --- | --- | --- |
| Week 0, live and free | **0. "Saving doesn't work"** | Customer success: a customer can't save a record. Can you look before the 3pm call? | Reproduce it, find the failed request in the network tab, read the status code and response | Your first bug report and a network tab cheat sheet |
| Week 1 | **1. Where does our customers' data go?** (how a web app works) | Sales forwards a prospect's security questionnaire | Start your own copy and watch its services start; trace one action from the browser to the database; find every third party | A system map and the questionnaire answers |
| Week 2 | **2. Can we promise the integration?** (APIs, webhooks, integrations) | Sales: "It's just an API, right?" | Send API requests, break them on purpose, catch a webhook, build a no-code workflow | An integration feasibility brief |
| Week 3 | **3. Four escalations before lunch** (bug triage) | Customer success forwards four tickets | Triage each one: bug or not, where, how bad | A bug report (personal feedback) and a triage table |
| Week 4 | **4. It's merged, so where is it?** (deployment) | The CEO: Calder was promised the fix today | Follow the fix through review and checks, deploy it to your own copy; ship and roll back your own change on GitHub | A release timeline, a stakeholder update and your first merged pull request |
| Week 5 | **Catch-up week** | None | Finish anything you skipped, or take the deeper track |  |
| Week 6 | **5. Did the onboarding checklist work?** (product analytics) | The head of product questions a board-deck number | Write a tracking plan, check the events fire, answer with a funnel and a SQL query | A data answer and a tracking plan entry |
| Week 7 | **6. One AI workflow that saves real time** (AI for PM work) | The head of product: "One workflow each, and show me it's right" | Build and test an AI workflow on sandbox material | An AI workflow card |
| Week 8 | **7. The renewal feature or the rebuild?** (technical debt or new feature) | One sprint, two asks | Gather evidence from every mission and weigh the options | A decision brief (personal feedback), the final clinic and a certificate |

I moved bug triage before deployment, against the order on the waitlist page, so that the bug the learner reports in Mission 3 is the fix they follow to production in Mission 4. Following a fix you reported is a common way for PMs to meet the release process at work, and it gives the learner a stake in the deployment mission.

## 4. Anatomy of a mission

Every mission has the same eight steps. A familiar structure means the learner spends no effort working out what to do next, and it makes the weekly habit easier to keep.

| Step | Time | Where | What happens | Why |
| --- | --- | --- | --- | --- |
| 1. The message | 2 min | Phone or laptop | A message from a colleague or customer, with a deadline | Starts from a realistic problem (Schank's goal-based scenarios, Merrill's first principles). Noticing a gap in what you know creates curiosity (Loewenstein) |
| 2. Briefings, optional | 8–10 min each | Podcast app | The story, an engineer explains, a debate. One question before, one after | A question asked before listening improves learning of what it asks about, so each one targets the idea we most want remembered (pretesting research) |
| 3. Predict | 2 min | Laptop | Commit to a guess: where is the problem, what will the data say? | Producing an answer yourself, even a wrong one, before being told improves later learning (generation effect, pretesting) |
| 4. Lab | Two sittings of 35–40 min | Laptop browser | Hands-on in your own copy of the product, with a hint ladder | Practice on the whole realistic task (Merrill), in chunks the learner works through at their own pace (Mayer's segmenting principle) |
| 5. Worked answer | 5–10 min | Laptop | How Tamas or Kinga did it, step by step, then one question: "What did they check that you didn't?" | Worked examples help beginners most; once learners have the basics, trying first and then seeing the expert solution helps them apply it to new problems (productive failure) |
| 6. Artefact | 15–20 min | Laptop | A work artefact made from a template | Applying the new skill to produce something, with feedback (Merrill's application principle) |
| 7. Monday move | 15 min | At work | One small action in your own product | Using the skill in your own world (Merrill's integration principle); transfer of training (Baldwin and Ford) |
| 8. Recall | 3 min | Phone | Three questions from earlier missions, at the start of the next one | Retrieval practice and spacing. Mixing topics helps most where categories are easy to confuse, such as the four kinds of problem in Mission 3 (interleaving) |

**Total:** about two hours a week, of which up to 30 minutes is audio that can happen on a commute.

**Support fades as the season goes on.** Mission 1 labs give every click. By Mission 3, learners get the goal and a hint ladder. By Mission 7, they get the decision and a template. This follows the worked-example research: step-by-step guidance helps beginners and gets in the way once they know the basics (the expertise reversal effect), and removing worked steps gradually works better than removing them all at once (fading). It also settles a real tension in the evidence. Worked examples favour showing first, productive failure favours trying first. The season does both, in that order: shown first while everything is new, tried first once the learner has something to try with.

**Every worked answer ends with the first line of next week's message.** People tend to go back to tasks they left unfinished (the Ovsiankina effect). The better-known claim that we _remember_ unfinished tasks better (the Zeigarnik effect) didn't hold up in a 2025 meta-analysis, so the teaser is there to bring people back, nothing more.

**The hint ladder.** Every lab step has three hints: a nudge ("look at the requests shown in red"), a pointer ("open the Payload tab of the graphql request that went out when you clicked Save") and the worked step. Using hints costs nothing. We read which hints get opened most to find the confusing steps and fix them.

**The essentials lane.** Each mission marks a core path of about 60 minutes (one sitting plus the artefact). A learner having a busy week takes the essentials lane and still completes the mission. The rest stays open for later.

## 5. The missions

Each mission lists the message, what the learner does, the worked answer, the artefact, the Monday move, the AI step, the audio briefings and what it plants for the finale.

### Mission 0: "Saving doesn't work" (the free live workshop, 75 minutes)

**The message.** Customer success lead: "Calder can't save new companies. It just spins. Engineering is in planning all day. Can you take a look before my 3pm call?"

**Run of show**

| Minutes | What happens |
| --- | --- |
| 0–10 | Kinga introduces the season and the two of you. Everyone takes the 12-question Technical Product Confidence self-assessment (already specified in the research folder) as their "before" snapshot. |
| 10–15 | Predict: a poll on where the problem is. The browser, the server, the database or the customer's network? |
| 15–40 | Guided lab. Everyone opens the workshop copy (a temporary copy of the product we run for the day, so attendees need nothing but a browser) and the network tab. They reproduce the problem, find the failed request, open its Payload tab to see what it was trying to do, and read the status code and the response. Tamas helps people in the chat. The answer: the server rejected the request with a clear message, and the app showed a spinner instead of the message. |
| 40–50 | Write a three-line bug report from a template, then compare it with Tamas's. |
| 50–65 | A mini case clinic: two volunteers' bug reports get live feedback, so everyone sees what the clinics are like. |
| 65–75 | The season map, booking two lab slots a week in the calendar, and the offer. |

**Leaves with:** a first bug report, a network tab cheat sheet and the self-assessment report to share with their manager. The workshop counts as Mission 0, so anyone who joins the season starts with one of eight missions done.

### Mission 1: Where does our customers' data go? (How a web application works)

**The message.** Sales forwards a security questionnaire from a prospect in financial services: "Which components process our data? Where is it stored, and in which cloud region? Which third parties receive it?" The engineering lead adds: "Have a go first and I'll check it on Thursday."

**Sitting 1: start your own copy.** On our GitHub repository, click the button that creates your codespace: a development environment in GitHub's cloud, the same kind of place an engineer works in, opened in your browser. While it starts, open the deployment file it follows, which lists everything that runs behind the browser: the server, a background worker, the database (Postgres) and Redis, which works as both a cache and the queue the worker takes its jobs from. Watch each one start in the log. When the app's address appears in the Ports tab, open it and sign in to the story's workspace. Ask an AI chat assistant to explain each service, then check two of its claims against the project's own documentation.

**Sitting 2: the browser side.** Load the product with the network tab open. What did the browser download (HTML, JavaScript, styles, images), and what did it ask the server for (API requests)? In this product most of those requests are called "graphql", and the Payload tab shows what each one asked for. Find how the app remembers who you are (cookies and storage in the Application tab). List every domain the page talks to: your copy of the server, the analytics tool, a font service, a content delivery network. That list is already the start of the questionnaire's answer on third parties.

**Sitting 3: the map and the cloud translation.** Draw the system map: a user action, the frontend, the API, the server, the database and worker, and the third parties. Then the same building blocks under their AWS, Azure and Google Cloud names: managed database, object storage, cache, queue, container hosting, load balancer, content delivery network and region. This covers the waitlist page's promise of "AWS, Google Cloud and Azure included".

**Worked answer.** Tamas's system map and his questionnaire answers, each marked with how sure he is and what he'd still ask the platform team.

**Artefact.** Your system map and questionnaire answers, each marked "confirmed", "my best understanding" or "ask engineering".

**Monday move.** Ask an engineer for your product's architecture diagram or deployment file, and spend 15 minutes with them labelling it in this vocabulary. Or open your own product with the network tab and list every domain it talks to.

**AI step.** Ask an AI chat assistant to explain the deployment file, then check two claims against the docs.

**Audio.** The story: why enterprise deals wait on security questionnaires, and which parts a PM can answer. An engineer explains: why a backend is usually several services. The debate: should PMs read code?

**Plants.** Email and calendar sync run as jobs on the background worker, so when a problem never shows up in the browser, that's one place it can be.

This is the longest mission and the foundation for the rest. If the founding cohort finds three sittings too much for one week, split it into two missions.

### Mission 2: Can we promise the integration? (APIs, webhooks and integrations)

**The message.** Head of sales: "Calder renews in March. They want every deal we mark as Won to create an order in their ERP within a minute, and changes to the order to update the deal. It's just an API, right? Can I tell them yes?"

**Sitting 1: requests and responses.** In the app's interactive API documentation, create an API key, list companies, read the JSON that comes back and create a record. Then break things on purpose: no key (401), a misspelt field (400), a record that doesn't exist (404). Then compare with the network tab. The product's own screens use the other common style, GraphQL: every request goes to the same address and the question sits in the request body. Plenty of enterprise products work this way, and Twenty offers both styles over the same data, so learners see the two side by side.

**Sitting 2: webhooks.** Point a webhook at our request inspector, move a deal to Won and watch the payload arrive. Answer from the docs and your own experiments: what happens if the receiving system is down? Can the same event arrive twice? How does the receiver know the message really came from us? Then build the same flow with the app's built-in workflow automation, without code.

**Sitting 3: the judgement.** The feasibility brief. Which half of Calder's request the product supports today (outgoing: a webhook when a deal changes), which half needs work (incoming: the ERP calling our API, field mapping, authentication), the failure modes, who would own the integration (us, Calder, or an integration platform such as Zapier, Workato or MuleSoft), and the questions for engineering.

**Worked answer.** Kinga's brief, with Tamas's notes on the failure modes she left out.

**Artefact.** An integration feasibility brief: "yes, if…", the open questions and who answers each one.

**Monday move.** Find your product's API documentation (public or internal) and one integration your customers use. Write down which way the data flows, what triggers it, what happens when it fails and who owns it.

**AI step.** Ask an AI chat assistant to write a request from the API documentation. Send it. When it gets a field name wrong, use the 400 response to fix it.

**Audio.** An engineer explains: APIs and webhooks, and who calls whom. The debate: build the integration, or send the customer to an integration platform? (This covers build versus buy from the waitlist page.)

**Plants.** In the worked answer, the engineering lead notes that the incoming half would run as background jobs on the same worker and queues as the email sync.

### Mission 3: Four escalations before lunch (Bug triage)

**The message.** The customer success lead forwards three tickets, and the head of sales sends a fourth marked urgent. Triage all four before the noon stand-up: is it a bug, how bad is it, and who needs to know?

**Why four at once.** Each looks like "it's broken" to a customer, and telling them apart is the skill. Practising easily confused categories side by side is where mixing problem types (interleaving) helps learning most.

**The four problems, switched on in your copy**

| Ticket | What the network tab shows | What it turns out to be |
| --- | --- | --- |
| "Our new sales rep gets an empty page when opening a deal link from Slack." | The request for the deal comes back with a permission error inside the response | The rep's role can't see deals, so it's a configuration issue. There's also a small bug: the page should say "you don't have access" instead of staying empty. Apps that use GraphQL often return errors inside a response marked 200, so the learner reads the response body, not only the status code |
| "The deals list takes forever to load." | One request takes 8 seconds for a workspace with thousands of deals | A performance problem that only affects large customers |
| "Amounts show in dollars, but we use euros." | The response says EUR; the screen shows $ | The data is right and the display is wrong: a frontend bug |
| "Emails with our biggest client stopped appearing on their contact record." | Nothing: every request succeeds, and no new emails come back | The email sync for that account is failing in a background job. The network tab only shows what the browser asks for, so the learner escalates with the account, when it stopped and the account's sync status |

**What the learner practises.** Reproducing the problem as the right user with the right data; reading the status code, timing, request and response; checking the console; checking whether it worked before the last release; checking whether it happens in your own copy too, and if not, what's different; recognising when the problem isn't in the browser at all; classifying the problem; combining severity and reach into a priority; and sharing evidence safely. HAR files, the network-tab export engineers often ask for, include session cookies and tokens, so the learner practises removing them or sharing screenshots of the relevant request instead.

**Worked answer.** Tamas's triage table, then an audio reveal of what was wrong in each case and how an engineer would fix it.

**Artefact.** A triage table for all four tickets and one full bug report, which gets **personal feedback** from Tamas or Kinga against a rubric published with the mission:

- someone else can follow the steps and see the problem;
- expected and actual behaviour are both stated;
- the evidence is there: the request, the status code, the time and the account;
- reach and severity are estimated;
- any guess about the cause is labelled as a guess;
- nothing sensitive is included.

**Monday move.** Triage one real ticket from your support queue using the network tab and the bug report template.

**AI step.** Give an AI chat assistant only the customer's words, and it produces a plausible guess. Give it your evidence, and the answer gets much more specific. The rule that goes with it: never paste a HAR file or customer data into a tool your company hasn't approved.

**Audio.** The story: what engineers do with a bug report, and which details save them an hour. An engineer explains: reading a request the way an engineer does. The debate: is this a bug or a feature request?

**Plants.** The sync escalation, and the real project's closed GitHub issues about email and calendar sync (a backfill stalling on rate limits, duplicate messages), which learners browse as part of the worked answer.

### Mission 4: It's merged, so where is it? (Software deployment)

**The message.** The CEO: "Calder was told the fix for the euro amounts would be live today. Engineering says it's merged. When will Calder actually have it?"

**Sitting 1: follow the fix, then deploy it.** The currency bug from Mission 3 is now a GitHub issue (our model version of the report). Follow it through the pull request, the change itself (a few lines in the frontend; ask an AI chat assistant to explain it in product terms, then check that against the pull request description), the review comments and the automated checks. One check failed twice before passing: a flaky test in the email sync code, which has nothing to do with this change and still held it up for a day. After the merge, our pipeline builds a new version of the product and publishes it. Deploy it yourself: change one version number in your environment's settings and restart it. Watch the services stop and start again, and notice the app is unavailable for a minute, which is one reason teams deploy at set times. Then acceptance-test: the amounts show in euros, and the network tab shows the response was right all along. At the fictional company, the same version goes to staging first and to production on the Thursday release train, and the worked answer walks through how that differs from what you just did. Then follow a real change through the upstream open-source project: a merged pull request, its checks, the release it went into and its changelog entry. That shows the same process at the scale of a real engineering team.

**Sitting 2: ship your own change.** Create your own copy of the product's help-centre repository from our template on GitHub, and switch on GitHub Pages in its settings. Make a branch, write the release note for the fix in the browser editor and open a pull request. A check fails (a broken link, or a missing version number). Fix it, open the preview link, merge it and see it live. Then notice you announced the wrong version, revert the merge (a rollback) and watch the corrected page deploy.

**Sitting 3: deployment and release are separate steps.** Your help-centre site ships a new "What's new" banner switched off in a settings file. Deploy it, check it's invisible, then switch it on with a one-line change and no new code. Then open the feature flag the engineering lead used for the onboarding checklist in the analytics tool: it went to 10% of customer workspaces first and to everyone a week later. The code was deployed the whole time; the flag decided who saw it. (Mission 5 comes back to this rollout.)

**Worked answer.** Tamas narrates the pipeline: what each state means and where a PM gets to make a decision.

**Artefact.** A release timeline and a stakeholder update: where the fix is now, when customers get it, what could delay it and how we'll know it worked. Plus your first merged pull request.

**Monday move.** Ask an engineer for a 15-minute tour of your team's pipeline, using five questions we give you. Find where your team's deploy history and release notes live.

**Audio.** An engineer explains: what happens after "merged". The debate: release trains or continuous deployment, and why some enterprise customers ask for slower releases. The story: feature flags and the difference between deploying and releasing.

**Plants.** A flaky test in the sync code holds up releases that have nothing to do with it.

**The deeper track (catch-up week).** The engineer's version of the environment: Twenty built from its source code in a bigger codespace. Ask an AI agent to change a button label, run the app, see the change and open a pull request. For learners who want to see the engineer's side of the same pipeline. Building from source needs the 4-core machine, which halves the free Codespaces hours to 30 a month, so it stays optional and is in the "later" list in section 14.

### Catch-up week

No new mission. Learners finish anything they skipped or take the deeper track, and the clinic is an open session. A week with nothing new gives anyone who has fallen behind a realistic chance to catch up without feeling behind, and it gives the two of you a buffer if content production slips.

### Mission 5: Did the onboarding checklist work? (Product analytics)

**The message.** Head of product: "The board deck says activation went up after we launched the onboarding checklist. Is that true? And before we build the integration setup flow, I want it tracked properly from day one."

**Sitting 1: how tracking works.** Read the tracking plan. Do the onboarding steps in your copy and find the analytics requests in the network tab: the event names and properties leaving the browser. Watch them arrive in the analytics tool's live view. Spot the data problem: the same action is tracked under two different names since a release. Write the tracking plan entry for the integration setup flow: the event names, when each fires, its properties, who owns it and how to check it before launch.

**Sitting 2: answer the question.** Define activation in one sentence. Build a funnel and a retention view in the cohort's shared analytics project, which holds three months of realistic, made-up usage. Ask an AI chat assistant for a SQL query that answers the question and run it. Its answer disagrees with the funnel, because it counts our internal test accounts and misses the renamed event. Find out why and fix the query. Then the harder part: the checklist launched the same week as a pricing change. What can you claim, and what can't you? The staggered rollout from Mission 4 helps: for one week, 10% of customers had the checklist and the rest didn't, all on the same pricing.

**Worked answer.** Kinga's data answer and the corrected query.

**Artefact.** A one-page data answer (the question, the definition, the query, the result, your confidence, the caveats and the recommendation) and a tracking plan entry.

**Monday move.** Pick one metric your team reports. Find its written definition and the events behind it. Or write the tracking plan for your next feature.

**AI step.** The SQL query above: useful as a first draft, wrong in a way you only catch by checking it against another source.

**Audio.** The story: the dashboard number nobody could reproduce. An engineer explains: what happens between a click and a dashboard. The debate: should PMs write SQL?

**Plants.** Customers whose email sync failed in their first month are less likely to still be active at day 60, and the learner can see how many customers have connected their email.

### Mission 6: One AI workflow that saves real time (AI for product management work)

**The message.** Head of product: "Leadership wants every PM using AI. I want something more specific: one workflow from each of you that saves real time on something you do every week, and proof that its output is right."

Our research on PMs and AI found five problems behind the pressure to use it: a mandate without a definition, the time spent reviewing output, missing context, unclear rules on company data, and no honest way to tell whether time was saved ([PM AI research](../../../productkind/ai-research/pm-use-ai/2026-08-26-overwhelmed-product-managers-ai.md)). One PM in that research put the advice simply: "pick one workflow you do every week and spend a month making AI genuinely useful for that one thing before adding more." This mission does exactly that.

**Sitting 1: choose and set up.** Sort your weekly tasks into three groups: hand to AI, do with AI's help, keep human. Use how often the task comes up, how risky a mistake would be, how sensitive the material is and how long checking takes. Learn the safe-use rules: which data can go where, approved tools and how to remove sensitive details. Then pick one of five workflows, each built on an earlier mission:

1. A pull request turned into a release note or a stakeholder update (Mission 4).
2. Support tickets turned into a triage table that lists the evidence still needed (Mission 3).
3. A data question turned into a SQL draft with a checklist to verify it (Mission 5).
4. Questions about the codebase: an AI agent answers "does our API support X?" with a pointer to the code or docs you can check (Mission 2).
5. A clickable prototype of Calder's integration settings screen, built with an AI app builder or AI agent, to test with users, with a written list of what it doesn't prove (Mission 2). This keeps the AI prototyping step from the waitlist page as one option.

**Sitting 2: test it.** Run the workflow on three sandbox inputs. Check each output against the evidence with a checklist: is it accurate, can you trace its sources, what nuance is missing, does it expose anything private, is it feasible? Time the whole thing honestly, including setup and review.

**Worked answer.** Kinga's workflow card for option 1, including where it went wrong.

**Artefact.** An AI workflow card: the task, the inputs and context, the prompt, the checks, the data rules and the time saved, measured honestly.

**Monday move.** Run the workflow on one real task, in a tool your company approves, and time it including the review.

**Audio.** The debate: what should stay human in product work? The story: the review time nobody counts when they say AI saved them an hour.

AI isn't confined to this mission. Every mission has one AI step with a check, so by Mission 6 learners have seen AI be useful and be wrong several times on material they understand.

### Mission 7: The renewal feature or the rebuild? (Technical debt or new feature)

**The message.** Two messages on the same morning. The head of sales: "Calder will only renew if the ERP integration is live by March." The engineering lead: "We need a sprint to rebuild the sync jobs before we put the integration's jobs on the same worker. Sync caused most of last quarter's support escalations, its flaky tests hold up releases, and the integration would add its load to the same queues." There's one sprint. The decision goes to quarterly planning on Friday.

**Sitting 1: gather the evidence.** Most of it is already in the learner's portfolio:

- the system map (Mission 1): the sync jobs and the worker they run on;
- the feasibility brief (Mission 2): the integration's incoming half would run on the same worker and queues;
- the triage table (Mission 3): the sync escalation, plus the real open-source project's GitHub issues about email and calendar sync;
- the release timeline (Mission 4): the day a flaky sync test cost an unrelated fix;
- the data answer (Mission 5): failed syncs and retention, and how many customers have connected their email.

Then listen to the interviews with the engineering lead and the head of sales (audio with transcripts) and note what each one leaves out.

**Sitting 2: decide.** Lay out the options: (A) the feature first, (B) the rebuild first, (C) fix only the part both depend on (the retry and queue handling the sync and the integration would share), then build a smaller first version of the integration, (D) buy an integration platform. Compare them on the cost of delay (the renewal's value), the cost the debt adds to every change (extra time, the bug rate), risk, how reversible each choice is, and what each would teach the team. Recommend one. Say what engineering decides (how), what Product decides (what and when), and how you'll know it worked.

**Worked answer.** Shown after submission, not before: Kinga's and Tamas's briefs, which deliberately recommend different options.

**Artefact.** The decision brief, which gets **personal feedback**. Learners can also write a second brief on a real decision from their job, kept privacy-safe, and bring it to the final clinic.

**The finale.** The final case clinic, where small groups present their briefs in five minutes each, with Tamas asking the engineering lead's questions and Kinga the head of product's. Learners retake the confidence self-assessment, get a before-and-after summary for their manager and receive a certificate.

**Audio.** The debate: Kinga argues for the feature, Tamas for the rebuild, and they work towards option C together, showing how a PM and an engineer can reach a decision neither started with.

## 6. The training app and the zero-install setup

All facts in this section were checked against official docs, the repositories and Docker Hub on 9 October 2026. Anything that couldn't be confirmed is marked as unverified or listed in the trial checks at the end.

### Recommendation: Twenty, run by each learner in GitHub Codespaces

Every learner runs their own copy of the product in GitHub Codespaces, a development environment that runs in GitHub's cloud and opens in the browser. Nothing gets installed on the laptop, so admin rights don't come into it, and every learner has their own workspace, API keys and webhooks. Setting up the environment is part of Mission 1, so learners also find out what a development environment is and how it differs from staging and production.

|  | Mealie | Twenty | Mattermost |
| --- | --- | --- | --- |
| What it is | Recipe manager and meal planner for households | Open-source CRM: companies, people, deals | Team chat, an open-source Slack alternative |
| Feels like an enterprise product | Low | High: workspaces, roles and permissions, integrations, B2B data | High: enterprise chat with on-premises releases |
| What Mission 1 finds behind the browser | One container (Python FastAPI, SQLite) | Four services: server, background worker, Postgres and Redis | A Go server and Postgres |
| An API to try in the browser (Mission 2) | Swagger UI at `/docs` | REST and GraphQL playground under Settings → APIs & Webhooks | Static reference only; personal access tokens are off by default |
| Webhooks and no-code integrations (Mission 2) | Notifiers through Apprise, meal-plan webhooks | Signed webhooks on every record change, built-in workflows, an official Zapier app | Slack-compatible incoming and outgoing webhooks, slash commands, n8n and Zapier |
| Network tab for beginners | REST, easy to read | GraphQL: every request is called "graphql", so you open Payload to see which is which | REST under `/api/v4`, easy to read |
| Code a beginner can read | Best: small and conventional | Hardest: a very large TypeScript monorepo | Hard: large, in two languages |
| Work to package for one-click Codespaces | Least: it already ships a development container and runs as one container | Most: no development container, four services, at least 2 GB of memory, and it has to fit the free 2-core machine | In between: an official all-in-one preview image, meant for evaluation only, plus an easy-to-miss edition trap (Entry vs Team) |
| Fits the season's story | Weak: no business customers or integrations | Strong: customers, deals, a renewal, integrations, and sync jobs on a worker with real GitHub issues | Medium |
| Licence | AGPL-3.0 | AGPL-3.0 core; SSO, row-level permissions and audit logs need a paid key, and the course needs none of them | AGPL-3.0, with MIT-licensed builds |

**Why Twenty.** It shows what an enterprise PM needs to see: a backend made of several services, two API styles over the same data, signed webhooks, built-in workflows, roles, and a B2B story about customers, deals and integrations. Its email and calendar sync run as jobs on a background worker, and the project has dozens of real, closed GitHub issues about them (a backfill stalling on rate limits, duplicate messages), so the finale argues about a real part of a real codebase. Running it in each learner's own environment makes two missions better as well: in Mission 1 learners watch the four services start, and in Mission 4 they deploy the fix to their own copy themselves.

**What Twenty costs.** It's the heaviest of the three to run and ships no Codespaces setup, so we write one, and it has to fit the free 2-core machine (unverified, and the first of the trial checks). Its code is the hardest of the three for a beginner to read, so code-reading stays small and guided (the deployment file, one pull request, issue threads), and learners who want to search the code use an AI agent. Its screens talk GraphQL, so the network tab needs one extra skill, opening the Payload tab, taught in Mission 0.

**The fallback is Mealie.** If Twenty doesn't fit the free machine or takes too long to start, Mealie already ships a development container, runs as one container and has simpler code and a readable network tab. The price is a weaker story and a one-container backend, which makes "why a backend is usually several services" something we explain rather than show.

**Mattermost** is strong on webhooks, but it has no API console to try requests in, ships with tokens switched off, needs care to install the right free edition, and fits a CRM-and-renewal story less naturally.

### How each learner runs their own copy

**What the learner does.** One click on an "Open in GitHub Codespaces" button on our repository, a few minutes' wait, and the app opens from the Ports tab at the learner's own private address. The copy keeps its data between sessions. It stops by itself after 30 minutes without activity (GitHub's default) and starts again where it left off.

**What we build**

- Our fork of Twenty, built by our pipeline into images and published to GitHub's container registry. Mission 4's fix arrives as a new image version.
- A development container setup that starts the four services from those images (ready-built images, not the source code, which would need a much bigger machine), loads the story data on first start, points Twenty's server address at the codespace's forwarded address, and switches each mission's problems on with a setting.
- Prebuilds, so the first start takes minutes. Their storage and Actions minutes are billed to us as the repository owner.
- One temporary copy for each free workshop, sized for the group, so attendees need only a browser. Nobody needs a GitHub account or any setup before they've decided to join.

**The free allowance.** A personal GitHub account gets 120 core-hours and 15 GB-months of storage a month, with no card, and usage stops at the limit instead of being charged. On the 2-core machine that's 60 hours. A season needs roughly 3 hours of running time a week, counting the idle time before an automatic stop, so about 25–30 hours: half the allowance. On a 4-core machine the same season would use nearly all of it, which is why the core path has to fit on 2 cores. Both numbers are estimates to check in the founding cohort.

**Setting up the environment is a lesson, not a hurdle.** Learners click, wait and open the app; nobody debugs an installation in week one. What they learn is what started: the services, the deployment file that lists them, the address their copy runs at, and why an engineer's development environment, staging and production are three different places. Mission 3 comes back to it: when a customer's problem doesn't happen in your own copy, the difference in data, role, version or configuration is the first clue.

### What runs where

| Piece | Where it runs | What the learner needs |
| --- | --- | --- |
| The training product | The learner's own codespace, running our fork's images | A personal GitHub account, and Codespaces reachable from their network |
| The free workshop | One temporary copy we start for the day | A browser |
| Developer tools | Built into Chrome, Edge and Firefox; Safari needs them switched on in its settings | Developer tools not blocked by IT |
| Request inspector for webhooks | Our domain | A browser |
| Code, issues, pull requests and checks | github.com; github.dev also works for reading code, though it runs nothing | The same GitHub account |
| The help-centre site with preview links | The learner's own repository, created from our template, built by GitHub Actions and hosted on GitHub Pages | The same account; on a free plan the repository has to be public |
| Product analytics | PostHog Cloud, one shared project that every learner's copy sends events to | An invite; PostHog has no per-seat charges |
| The deeper track | A bigger codespace that builds Twenty from source: the 4-core machine, so 30 free hours a month | The same account |
| AI tools | Whatever the learner's company approves, or a personal account used on sandbox material only |  |

- **Why the learner still ships a help-centre site.** A codespace is a development environment, not a place real users visit. So the full route of branch, pull request, checks, preview link, merge, live site and revert happens on a static site on GitHub Pages, which costs nothing and needs no extra account. Free hosts without a card couldn't run a copy of Twenty per learner anyway: Fly.io has no free tier for new organisations, Koyeb has closed its free plan, Google Cloud Run needs a billing account, and Render's free tier has 512 MB of memory and wipes local data when it sleeps.
- **A template, not a fork.** Workflows don't run in forks by default, and the preview action (`rossjrw/pr-preview-action`, maintained, MIT licence) doesn't support pull requests from forks. A repository created from a template runs Actions normally. GitHub Pages still has to be switched on by hand (Settings → Pages, deploy from the `gh-pages` branch), so the lab makes that a step of its own: switching on hosting. New repositories get a read-only token by default, so the template's workflow declares the write permissions it needs.
- **PostHog.** The free plan includes 1 million events a month and one project. Each learner's copy tags its events with the learner, so they can find their own in the live view. We generate three months of made-up usage ourselves, because PostHog has no public demo dataset, and send it with past timestamps through the capture API. Events can't be deleted selectively, so test the backfill in a separate throwaway organisation first.

### The laptop check

Five minutes, before the season starts. The workshop only needs the first two steps.

1. Open a test page on our domain. This checks our domain isn't blocked.
2. Open developer tools and find the request called `laptop-check`. This checks they aren't disabled by company policy.
3. Sign in to GitHub and open the help-centre template. This checks GitHub isn't blocked for personal accounts.
4. Open a test codespace and the app inside it. Every lab from Mission 1 runs in a codespace, so this is the step that decides the most.

The result is green (the work laptop works for everything), amber (developer tools work but GitHub or Codespaces doesn't: the workshop on the work laptop, the season on a personal one) or red (developer tools are blocked: a personal laptop for everything). Amber and red come with a ready-to-send message to IT. Chrome and Edge let IT allow developer tools on named sites while keeping them blocked elsewhere (the `DeveloperToolsAvailabilityAllowlist` policy). For Codespaces, GitHub documents the domains it needs and notes that proxies which inspect encrypted traffic break the connection. Its fix is to exempt `*.visualstudio.com`, and it publishes a test URL learners can open.

### Risks

- **Codespaces blocked at work.** Now the biggest risk, because every lab needs it. The laptop check catches it before anyone pays, and a personal laptop is the fallback. We found no data on how often companies block it.
- **IT blocks developer tools.** The allowlist request, or a personal laptop.
- **Support moves from one server to 25–60 environments.** Week one will bring setup questions. Tamas covers the stuck thread daily that week, and every fix goes into the setup or the hints.
- **The free hours run out.** That happens if a learner picks a bigger machine or runs the deeper track for long. The idle stop protects most of the allowance, and the setup asks for the 2-core machine.
- **Phone-only learners.** Messages, audio and recall work on a phone; labs don't. The sales page says so.
- **AI tools blocked at work.** The sandbox is fictional, so a personal account on a personal device is fine for labs. At work, only approved tools, which Mission 6 covers.
- **The AGPL licence.** It requires us to offer the source of our modified Twenty to anyone we give it to or who uses it over a network, so our fork, seeded bugs included, is public. A determined learner could find a bug in the code, which is also a skill worth having. Check the obligations with someone who knows AGPL before launch; this note isn't legal advice.
- **Twenty moves fast.** v2.45 came out on 5 October and v2.46 four days later. Pin one version per season, so every learner's copy runs the same one, and upgrade between seasons.

### Trial checks before committing

1. Write the development container setup and check that Twenty's four services run on the free 2-core, 8 GB machine.
2. Time the first start with and without a prebuild, and a restart after an idle stop.
3. Point Twenty's server address at the codespace's forwarded address and check that signing in works through the private port.
4. Measure disk use against the free 15 GB-months.
5. Seed the story: companies, deals, the Calder account, the roles and a login for the new sales rep.
6. Seed Mission 0's bug and check it shows in the network tab as a failed request with a 4xx or 5xx status. GraphQL apps often return errors inside a response marked 200, which is a good Mission 3 lesson and too hard for the first hour.
7. Check what a missing permission looks like. In the interface the object is hidden; over GraphQL it's a `FORBIDDEN` error. Confirm what the network tab shows when the rep opens a deal link.
8. A learner's copy has no real mailbox, so seed a connected email account whose sync has failed, and check its status shows somewhere a PM would look (Mission 3's fourth ticket).
9. Check whether workflows on self-hosted Twenty use credits.
10. Time Mission 0, and Mission 1's setup, on a locked-down laptop.

## 7. The audio briefings

- **Three kinds, up to three per mission, 8–10 minutes each.** The product story (Kinga), an engineer explains (Tamas) and a debate (both). Around 20 episodes per season.
- **They arrive in the learner's own podcast app.** Each learner gets a private podcast feed, so a new briefing shows up next to the podcasts they already listen to on the commute. Attaching the new habit to an existing one is easier than creating a new one.
- **A question before, a question after.** The mission page and the first 20 seconds of the episode give one question to listen for ("Before you listen: why might the deals list load slowly only for big customers?"). Questions asked in advance help with exactly what they ask about and barely at all with the rest (St. Hilaire and colleagues' 2024 meta-analysis), so each one targets the single idea we most want remembered. The episode ends with one question to think through ("Which of Tamas's three reasons would you check first in your own product, and who would you ask?"). The next mission's recall step comes back to it.
- **Stories, mental models and arguments only.** Nothing the lab depends on, and no click-by-click steps. The evidence on learning from audio is mixed. Students given a podcast remembered less than students given the same text (Daniel and Woody, 2010). A meta-analysis of 46 studies found reading and listening about equal overall, with reading ahead for inference (Clinton-Lisell). Splitting attention while taking information in reduces later memory, and long, complex spoken explanations do worse than the same words written down (the transient information effect). So the briefings are short, optional enrichment, every one has a transcript on the mission page, and nothing on the critical path lives only in audio.
- **The debates disagree for real.** A PM and an engineer argue a trade-off, then say what they agree on and what they'd still argue about. Hearing two experts reason out loud is the "modelling" part of cognitive apprenticeship, and it shows learners what a healthy PM–engineer disagreement sounds like.
- **Episode shape.** A 30-second recap of the mission message, the idea, one example, the question, and a 20-second pointer to the lab.

## 8. Case clinics, feedback and getting unstuck

### Weekly case clinics (60 minutes, live, recorded)

- **Two cases of 20 minutes each, 15 minutes of open questions, 5 minutes on the coming week.**
- **A case is** a sandbox artefact or a privacy-safe description of a real problem at work: no customer names, no screenshots of real data, no internal links. Learners submit by Monday and we pick two.
- **How a case runs.** The owner presents in three minutes. The group asks questions first, which is practice in asking the questions an engineer would ask. Tamas answers as an engineer would. Kinga coaches the product decision. The owner finishes by saying what they'll do on Monday.
- **Recordings have chapters**, so people who can't attend can still watch the two cases.

### Personal feedback

- **On two artefacts per learner:** the bug report (Mission 3) and the decision brief (Mission 7). Written comments or a short screen recording, within three working days.
- **Rubrics are published with the mission**, so learners know what good looks like before they start. Each piece of feedback answers three questions from Hattie and Timperley's feedback model: what was the goal, how close is this, and what's the next step. It's about the work and the method, never the person: in Kluger and DeNisi's review, over a third of feedback interventions made performance worse, and praise or criticism of the person is the least useful kind. Feedback that carries more information works better (Wisniewski, Zierer and Hattie, 2020), which is the case for a specific written comment over a score.
- **Workload estimate:** 25 learners × 2 artefacts × 15 minutes ≈ 12.5 hours per season.

### Peer review

For the system map, the feasibility brief and the data answer, learning partners swap work and review it against the same rubric. Reviewing someone else's work against clear criteria is practice for the reviewer as well as feedback for the author.

### Getting unstuck between clinics

1. **The hint ladder** in every lab step answers most questions without waiting for anyone.
2. **A "stuck" thread per mission** in the community space, with a posting template: what I tried, what I expected, what I saw (screenshot) and my guess. That's the bug report format, so asking for help well is practice for Mission 3.
3. **We answer within one working day**, and add common answers to the lab's hints the same week. In week one, when the setup questions come, Tamas checks the thread daily.
4. **Later:** an AI lab assistant that answers from the lab content and past answers, once we have enough real questions to test it on.

## 9. Designing for completion

A useful way to think about it is BJ Fogg's behaviour model (a design heuristic with little direct testing behind it): a behaviour happens when motivation, ability and a prompt come together. Professionals sign up motivated. What usually fails is ability and prompts: in week three, work gets busy, the next lab feels like a big job and nothing brings them back. So most of this section is about making each session easy to start, giving people a reason and a way to come back, and showing value at work every week so motivation lasts.

The evidence on getting adults to finish online courses is less encouraging than L&D articles suggest. Several popular tactics did little in large trials, so the table says which levers have weak evidence, and those are the ones to measure in the founding cohort.

| Lever | What we do | Basis, and how strong it is |
| --- | --- | --- |
| A fast first win | Mission 0 gives a real result in 20 minutes, in the free workshop | Succeeding at the task yourself is the strongest source of self-efficacy (Bandura). For an audience that feels like "the least knowledgeable person in the room", this is the main job of the first hour |
| Starting with progress | The workshop counts as Mission 0, so the season starts at one of eight | Endowed progress: 34% finished a loyalty card with two stamps already on it, against 19% for a blank card of the same length (Nunes and Drèze). Consumer evidence, not learning |
| Deciding when, in advance | At the end of the workshop, learners book two recurring 40-minute lab slots and pick their audio moment. We send calendar files | If-then plans have a solid track record (Gollwitzer and Sheeran, d = 0.65). But across 247 MOOCs, planning prompts raised engagement in the first weeks and didn't raise completion (Kizilcec and colleagues, 2020). This gets people started; the rest of the table has to keep them going |
| A weekly rhythm that carries the work | Monday: the message and the episode arrive. Wednesday: the clinic. Friday: artefacts due. A shared start date | In Patterson's MOOC experiment, reminders had no effect, while a commitment learners set for themselves raised completion by 40%. So the Monday email is the mission itself, not a nudge, and the booked slots are the learner's own commitment |
| Low effort to start | No installs, resume where you left off, sittings of 35–40 minutes with save points, the essentials lane | Ability, in Fogg's terms; learner-paced segments (Mayer) |
| Value at work every week | The Monday move, and a wins thread where learners share what happened (privacy-safe) | Using the skill at work is the point of the course (Baldwin and Ford). Seeing peers succeed is another source of self-efficacy (Bandura) |
| The manager | A template message for the learner to send: what I'll learn, the time it takes, what I'll show you in weeks 4 and 8. Sent with the self-assessment report | In Blume and colleagues' meta-analysis, a supportive work environment predicted whether training got used at work, and supervisor support more than peer support. Voluntary participation predicted it too, so when a company buys seats, joining stays the learner's choice. Also the route to expensing |
| A learning partner, as an experiment | We pair learners by time zone and, where possible, industry, and give each pair a concrete joint task: swapping peer reviews of three artefacts. Colleagues from the same company pair up | Weak evidence: prompting online learners to find an accountability partner had no average effect on completion in a 1,259-person trial (Li and colleagues, 2025). Relatedness is the hardest of the three self-determination needs to meet online. Worth trying with a real task attached, and worth dropping if the founding cohort shows no difference |
| Choice | The Monday move, the AI workflow, and the option to write the final brief about a real decision from work | Of the three self-determination needs, autonomy is the one most consistently linked to outcomes in online-course research |
| A way back after a bad week | The catch-up week; Monday messages that say "start from here"; one free move to the next season | People start new goals more often after time landmarks such as a new week or month (Dai, Milkman and Riis). Archival evidence on diets and gym visits |
| A visible finish line | A season map with the finale on it; near the end, "two missions to your certificate" | People speed up as a reward gets closer (Kivetz, Urminsky and Zheng). Consumer evidence |
| High points and a strong ending | Planned peaks: finding the request (Mission 0), the root-cause reveal (Mission 3), your change going live and rolling it back (Mission 4), and the final clinic with the before-and-after self-assessment | People judge an experience largely by its peak and its end (Kahneman and colleagues). In a learning study, a better ending made people more willing to repeat the session without making them learn more (Finn, 2010). So this serves recommendation and return, not learning |
| A person notices | After ten days without activity, a personal message from Kinga or Tamas, not an automated one, asking what got in the way. It doubles as research | Our own judgement: a personal message is the cheapest way for two people to find out why learners stop |

**What we leave out on purpose.** Daily streaks, which punish a busy week. Points and leaderboards: ranking people works against the "least knowledgeable person in the room" feeling the course is meant to fix. Long videos. Anything that needs installing.

## 10. Designing for recommendation

- **Artefacts that travel at work.** The bug report template, the system map, the release update, the data answer and the AI workflow card are all things a learner will use with colleagues. When a colleague asks where the template came from, that's a recommendation. Templates carry a small footer with the course name.
- **Share moments at the peaks.** After Mission 4, the learner's first merged pull request. At the finale, the certificate and a one-page portfolio (the system map and a summary of the decision brief) that works as a LinkedIn post.
- **Bring a colleague.** A second-seat discount for people from the same company, who then become learning partners. When a learner finishes, their manager gets the before-and-after summary and an offer for a team season.
- **Ask at the right moment.** A recommendation question after Mission 4 and at the finale. Learners who score 9 or 10 get a direct ask with a link to the next free workshop.
- **Alumni clinics.** A monthly open clinic for past learners keeps them close, gives them a reason to bring colleagues and gives us a steady supply of real cases.

## 11. The free workshop and the paid season

- **The workshop is Mission 0 for real, not a pitch.** Everyone leaves with a bug report and the cheat sheet, whether or not they buy.
- **It shows the paid parts.** The live mini clinic shows the feedback, a 60-second audio clip shows the briefings, and the season map shows the missions and the finale.
- **The offer** is the founding season: the start date, the price and what's included, framed as momentum ("Keep going: seven more missions").
- **The expense route.** The manager message template, an invoice and the outcomes written in an employer's language.
- **Follow-up emails.** Day 1: the recording, the cheat sheet and Tamas's model bug report. Day 3: a full audio briefing from Mission 1 with its transcript. Day 5: two Monday moves from workshop attendees, with permission. Then enrolment closes before the start date.
- **A recorded version** of the workshop with the same lab, for people who can't attend live, so sign-up can stay open between seasons.
- **Size.** A live lab works with up to about 40–60 people on a temporary copy sized for the group, if Tamas covers the chat and everyone has done the short laptop check beforehand (section 6).

## 12. The learning science behind it

Each claim below was checked against the original paper or a reliable summary on 9 October 2026. Most of this research was done with school and university students, much of it in maths, so the founding cohort is where we find out how well it carries over to working PMs.

| Principle | What the research says | Where it shows up | Caveat |
| --- | --- | --- | --- |
| Problem-centred design: goal-based scenarios (Schank and colleagues, 1994); first principles of instruction (Merrill, 2002) | Learning works best around a realistic task: activate what learners know, demonstrate, let them apply it with feedback, then use it in their own world | One product, one story; every mission starts with a message; Monday moves | Design frameworks drawn from practice, not measured effects |
| Cognitive apprenticeship (Collins, Brown and Newman, 1989) | Experts make their thinking visible (modelling), then coach, give support that fades, and ask learners to explain and reflect | Worked answers narrated by Tamas and Kinga; the debates; the clinics | A framework, not a measured effect |
| Worked examples and fading (Sweller and Cooper, 1985; Kalyuga and colleagues, 2003; Renkl and Atkinson, 2003) | Beginners learn more from studying worked solutions (g = 0.48 in a 2023 maths meta-analysis). The benefit shrinks or reverses as expertise grows. Removing steps gradually helps | Every click shown in Mission 1, goal and hints by Mission 3, a template by Mission 7 | In the same meta-analysis, adding self-explanation prompts to worked examples did worse than the examples alone, so the question after each worked answer is a single, optional one |
| Productive failure (Kapur, 2008; Sinha and Kapur, 2021) | Trying a problem before being taught, then getting instruction, helped transfer (g = 0.36 across 53 studies) | Predict, then lab, then worked answer, from Mission 3 onwards | Reversed for young children; little evidence on working adults; in tension with worked examples, hence the order in section 4 |
| Retrieval practice and spacing (Roediger and Karpicke, 2006; Cepeda and colleagues, 2006) | Testing yourself beats rereading at a week's delay. Spreading practice out beats cramming, and the best gap grows with how long you need to remember | Recall questions at the start of each mission, drawn from all earlier ones | Mostly lab studies over days or weeks |
| Interleaving (Rohrer and Taylor, 2007; Brunmair and Richter, 2019) | Mixing problem types helps when the types are easy to confuse (g = 0.42 overall) | Mission 3's four tickets; mixed recall questions | Didn't help for expository text, and hurt for word lists |
| Pretesting (Richland, Kornell and Kao, 2009; St. Hilaire and colleagues, 2024) | Trying to answer before studying improves learning of the questioned content (g = 0.54), with almost no benefit to other content (g = 0.04) | The predict step; one question before each briefing | Write the question about exactly what you want learned |
| Generation effect (Slamecka and Graf, 1978; Bertsch and colleagues, 2007) | Producing material yourself beats reading it, by about 0.40 of a standard deviation | Predictions, artefacts, writing the bug report before seeing ours | Varies a lot by material |
| Multimedia principles (Mayer, 2017) | Learner-paced segments help (d = 0.70); so does signalling the structure | Sittings with save points; the same eight steps every week | Mostly short lab lessons with immediate tests |
| Learning from audio (Daniel and Woody, 2010; Clinton-Lisell meta-analysis; Leahy and Sweller, 2011) | Mixed: reading beat a podcast in one classroom study; across 46 studies, reading and listening came out about equal, with reading ahead for inference; long, complex spoken explanations do worse than written ones | Briefings are short, optional and transcribed, and never carry anything the lab needs | No direct study of conceptual against procedural audio; our split is an inference |
| Feedback (Hattie and Timperley, 2007; Wisniewski, Zierer and Hattie, 2020; Kluger and DeNisi, 1996) | Feedback helps on average (d = 0.48), more when it carries more information, and over a third of interventions made things worse, especially feedback aimed at the person | Rubric-based personal feedback on two artefacts; worked answers after every lab | High variation between studies |
| Transfer of training (Baldwin and Ford, 1988; Blume and colleagues, 2010) | Whether training gets used at work depends on the learner, the training design and the work environment; supervisor support and voluntary participation both predicted transfer | Monday moves, the manager message, voluntary team seats | The authors flag inconsistent ways of measuring transfer |
| Self-efficacy (Bandura, 1977) | Belief in your ability to do a task comes mainly from doing it successfully, then from seeing peers do it | The 20-minute first win; the wins thread |  |
| Self-determination theory (Deci and Ryan; Ryan and Deci, 2000) | Autonomy, competence and relatedness support motivation; autonomy is the one most consistently linked to outcomes in online-course research | Choice of Monday move, AI workflow and final brief; clinics; partners | Mostly self-report surveys; few studies measure actual completion |
| Implementation intentions (Gollwitzer and Sheeran, 2006; Kizilcec and colleagues, 2020) | If-then plans help people act (d = 0.65), but planning prompts across 247 MOOCs raised early engagement and not completion | Booking lab slots at the workshop | Expect it to help the start, not the finish |
| Commitment and accountability (Patterson, 2018; Li and colleagues, 2025) | A self-set commitment raised MOOC completion by 40%; reminders alone did nothing; prompting people to find an accountability partner had no average effect | Booked slots as the learner's own commitment; partners only with a real joint task | One course and one trial each |
| Endowed progress, goal gradient, fresh start (Nunes and Drèze, 2006; Kivetz and colleagues, 2006; Dai, Milkman and Riis, 2014) | Pre-filled progress, a close finish line and time landmarks all increase effort | Mission 0 counts; the season map; Monday restarts | Consumer and health settings, not learning |
| Peak-end rule (Kahneman and colleagues, 1993; Finn, 2010) | Experiences are remembered largely by their peak and their end; a better ending makes people more willing to repeat | Planned peaks and the final clinic | Shapes willingness to come back and recommend, not learning |
| Curiosity (Loewenstein, 1994) and the Ovsiankina effect (Ghibellini and Meier, 2025) | Noticing a gap in what you know creates curiosity; people tend to go back to unfinished tasks | The mission message; the teaser at the end of each worked answer | The Zeigarnik effect (better memory for unfinished tasks) didn't hold up in the same meta-analysis |

**Claims we deliberately don't use:** learning styles, the "learning pyramid" retention percentages, 70:20:10, "only 10% of training transfers", the eight-second attention span, and fixed forgetting-curve percentages. None of them has the evidence its popularity suggests.

## 13. The founding cohort: what we'd measure

- **Size:** 15–25 learners at a founding price, in exchange for detailed feedback.
- **We use analytics on ourselves.** The course teaches product analytics, so it should be instrumented properly:
  - per mission: started, lab finished, artefact submitted, Monday move reported, which shows exactly where people stop;
  - a one-question weekly pulse: "How useful was this week for your actual work? 1–5, and why?";
  - clinic attendance and recording views;
  - hint use per lab step, to find confusing steps;
  - setup: the time from clicking the button to a running app, and how many learners needed help with it;
  - the recommendation question after Mission 4 and at the end, and referrals (invites sent, colleagues who joined);
  - the before-and-after self-assessment;
  - wins reported, counted and kept as stories.
- **Targets to test, not promises:** 80% finish Mission 1, 70% finish Mission 4, 60% finish Mission 7. For comparison, and none of these is a like-for-like benchmark: on MIT and Harvard's edX courses in 2017–18, 46% of paying learners completed, against 3% of all participants (Reich and Ruipérez-Valiente, 2019). A course platform's own data shows scheduled cohorts completing at 53% and open self-paced courses at 42% (Ruzuku, 2026, observational). HBS Online reported 85% for its paid, application-based CORe programme. Price, selection and different definitions of "completed" muddy every one of these, and the 90%-plus figures quoted for altMBA have no primary source.
- **Partners and planning prompts get a test of their own.** The evidence for both is weak (section 9), so compare completion between learners who did and didn't book their slots, and pairs who did and didn't swap reviews. Learners choose these themselves, so read the result as a signal, not proof.
- **Interviews:** five learners who finished, and every learner who stopped and is willing to talk.

## 14. What to build first

There are two of you, so build the shared foundation and the first missions before launch, and build the later missions during the founding season, one week ahead, using what the first weeks teach you. The risk is a slip that delays a mission; the catch-up week is the buffer.

**Before launch**

- The one-click environment: our fork of Twenty built into images, a development container setup that starts it in Codespaces with the story data, the season's problems behind settings, analytics instrumentation and prebuilds.
- A temporary copy of the product for each free workshop.
- A request inspector on our own domain.
- The help-centre repository template, with checks and preview links.
- The cohort's analytics project with three months of made-up usage.
- The workshop (Mission 0) and Missions 1 and 2, with their audio.
- Mission pages, a community space, a private podcast feed, calendar files and the artefact templates.

**During the season:** Missions 3 to 7, one week ahead; the feedback; the clinics.

**Later:** the AI lab assistant, a team dashboard for managers, and the deeper track.

## 15. Decisions for the two of you

1. **The training app.** I recommend Twenty, run by each learner in GitHub Codespaces, with Mealie as the fallback (section 6). Run the trial checks before deciding, above all whether Twenty fits the free 2-core machine.
2. **The fictional company and customer names.**
3. **Price and seats.** The research suggests €400–€800 is a defensible range to test for an applied programme with feedback and a substantial artefact.
4. **Where it lives.** Your own site plus a community tool, or a cohort platform such as Maven that handles payments, reimbursement letters and discovery for a fee.
5. **The clinic slot.** One time that works for the UK, Europe and US East, or two alternating slots.
6. **AI prototyping.** A headline step, as on the waitlist page, or one of five options inside Mission 6, as proposed here.
7. **Season length.** Eight weeks after the workshop, or a shorter season with fewer missions.

## 16. Where the waitlist page now disagrees with this design

The page at `productkind/site/src/TechnicalProductManager.tsx` was written for the earlier card-based plan. If you go with this design, these lines need changing:

- **"How the learning path works"** says every step is "in short cards you can work through on your phone". The labs here need a laptop browser; only the audio, the messages and the recall questions work on a phone.
- **The FAQ "How long does it take?"** says each step "takes under an hour, in short cards you can work through on your phone". Missions here take about two hours a week, with an essentials lane of about an hour.
- **The page doesn't mention** the free workshop, the case clinics, personal feedback or the audio briefings, which the research says are what people pay for.
- **The step order.** Bug triage now comes before deployment. The page already says the order may change.
- **Step 7, "AI prototyping for product managers".** Your new topic list says "Using AI for product management workflows". This design makes prototyping one option inside the AI mission.
- **Step 5, "SQL and product analytics".** Still covered, with tracking plans and checking events added, as in your topic list.
- **The SEO description and the FAQ "Will I learn to code?"** both say learners build an AI prototype in the last step. Here, prototyping is one option in Mission 6, and the last step is the technical debt decision.

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
