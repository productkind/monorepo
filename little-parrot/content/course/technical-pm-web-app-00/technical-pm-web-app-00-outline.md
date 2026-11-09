# Course Outline: How a Web Application Works

**Full title:** How a Web Application Works: Follow a Save from the Browser to the Database

**Where it fits:** Mission 1 of the [technical product manager course](https://littleparrot.app/guides/technical-product-manager). Free in full.

**Built from:** Mission 1 ("Saving doesn't work") in [`technical-skills-for-product-managers-learning-journey-design.md`](../technical-skills-for-product-managers-learning-journey-design.md), its self-paced version, and the Lisbon workshop description. The course follows the same trail as the workshop but never mentions the workshop, its recordings or its attendees.

## Overview

A hands-on card course for software PMs without an engineering background. They know what their product does, but not how it works, and they nod along when engineers talk about the frontend, the logs or staging.

The learner joins **Animal Inc.**, a company that sells a CRM (a customer relationship management app: companies, people, deals) to business customers. On their second week as the PM for integrations, Rhino from customer success forwards a complaint on Slack: Tall Order Co., a customer, clicked _Save_ on a new company, it spun, and the company isn't there. Engineering is in planning all day.

The learner follows that one failed save through every layer of a real web app: they set up the development environment and start the app, reproduce the problem with their own test data and confirm it in the database, find the request in the browser's network tab, read the server and database logs, find the rule that rejected the save, draw the map, write a bug report with evidence from each layer, give the report to GitHub Copilot and test the fix. Then they see that the version customers use still spins, because a fix in development hasn't reached anyone yet.

**GitHub Copilot is with them from the moment the codespace opens,** not only for the fix. As soon as they have a terminal and the code in front of them, they turn Copilot on and use it to find their way around the code and to ask about anything they meet: a file, a log line, a response, a term an engineer would use. Until challenge 8 they use it only to ask, and it changes nothing. In challenge 8 they give it the bug report and let it change the code. Every challenge practises the same habit: **predict, ask, check.** Make your own guess, ask Copilot, then check its answer against something you can see in your copy.

The cards are read in the Little Parrot app; the lab runs in GitHub Codespaces in a laptop browser, so nothing gets installed. The product is Twenty, a real open-source CRM, from [`productkind/twenty-pm-lab`](https://github.com/productkind/twenty-pm-lab), seeded with Animal Inc.'s test data.

**What the learner walks away with:** a map of how a web app works drawn from a trail they followed themselves, a bug report with evidence from each layer, a fix they tested (and know isn't released), the product running in their development environment, a set of questions to ask AI about unfamiliar code, and the habit of starting in the network tab of their own product the next day.

**What it doesn't do:** teach the learner to code, or cover where the app runs (cloud, regions, services beyond the four the trail touches). Those are later courses in the journey.

---

## The cast

Animal Inc.'s staff are the Kim and Tim characters. **The learner has no persona.** They're the new PM, and the characters talk to them directly, facing the camera in the comics and addressing "you" in the text. No character stands in for the learner, and no character does the lab for them.

- **Rhino**, customer success lead: sends the opening message on Slack, and needs an answer before a 3pm call with Tall Order Co.
- **Snail**, software developer: in planning all day. Snail's bug report is the optional example in challenge 7, and Snail's "how an engineer would check it" notes are the worked answers.
- **Kim**, product coach: the guide who suggests following the save layer by layer and asks the PM questions.
- **Giraffe**, Tall Order Co.'s contact (the "Client" character): the person who clicked _Save_.
- **AI**: appears in the comics where Copilot is used. Copilot is always named as the real tool in the text.
- **Tim**, educator: no fixed role yet.

There's no Dalmie and no Book Club Organiser in this course. Rabbit (sales) and Croc (CEO) are kept for later missions.

---

## Structure

Nine challenges. Each lab challenge ends at a point where the learner can stop and come back, because the codespace keeps its data between sessions.

Every lab step has a **"Stuck?"** step straight after it: a nudge, then a pointer, then the worked step (the hint ladder from the design doc, as cards).

### Opening: comics and course intro

- **Comics (four panels, each character facing the camera and talking to the learner):** Rhino, phone in hand: Tall Order Co. clicked _Save_ on a new company, it spun, and the company isn't there, so can you take a look before the 3pm call?; Snail, on the way into planning: "I'm in planning all day, sorry!"; a close-up of the spinning _Save_ button on the screen, from the learner's point of view; Kim: "Let's follow the save and see where it got lost."
- **Biggest fear first:** "You don't need to code to find where a problem lives." The learner reads, clicks and asks, and Copilot is there for every question they'd hesitate to ask an engineer. The code change at the end is made by Copilot too, and their part is the PM's part: give it evidence, then check the result.
- **What you'll walk away with:** the outcomes above, as outcomes, not topics.
- **Before you start:** a laptop, a personal GitHub account (not one your employer manages), and about two and a quarter hours in total across the challenges. Link to the setup guide toolkit item.

### 1. A real product in a development environment

**After this challenge, you'll have the product running in a development environment.**

- Open the repository and click _Open in GitHub Codespaces_. The first build takes several minutes, and the next cards are written to read while it builds.
- **What a development environment is:** a copy of the app on a computer the team controls, with made-up data, where engineers run and change it without affecting customers.
- **Three places a product lives:** development, staging, production. One line each, with what a PM hears about each one ("it works on my machine", "it's on staging", "it's in prod"). This is the reusable tool: **"Which copy am I looking at?"**, a question that comes back in challenges 8 and 9.
- Quiz (scenario): an engineer says a fix "works locally" and the customer still sees the bug. Which copy has the fix?
- **The codespace is open:** the code on the left, a terminal at the bottom. The terminal and Git are already there, so this is the moment to bring in Copilot.
- **Turn on Copilot:** open the chat, turn on the free plan, and switch off GitHub's use of your prompts for training. The details are in the setup guide.
- **Ask, don't change:** the chat can only answer in ask mode, so nothing in the code moves until challenge 8.
- **Your first question:** "What is this repository, and which file lists the parts of the app that run?" Then **check:** open the file it names and find the database, the server and the frontend yourself. Name the two other services in it (a background worker and Redis) and say a later course covers them.
- **Predict, ask, check:** why the order matters. Copilot sounds just as sure when it's wrong, so its answer is a lead to follow, and what you see in your copy is the evidence.
- Quiz (scenario): Copilot tells you the app keeps its data in a file that you can't find in the repository. What do you do?
- Where it comes back: the three places reappear when the fix works in your copy but not for customers, and predict, ask, check comes back in every challenge.

### 2. Start the app and watch the parts start

**After this challenge, you'll be able to start the app and say which part each start-up line belongs to.**

- Open a new terminal, run `start-app`, wait for _Twenty is ready_. Watch the database, then the server start.
- Run `load-story` once: why development environments use made-up data, never customers'.
- Run `start-frontend`: the frontend is built from its source code, the copy engineers change. One sentence on why there are two versions of the app in your copy: the ready-built one (the same package customers' servers run) and the one built from source.
- Open the app from the _Ports_ tab at your own private address and sign in as PM: the form is already filled in with `pm@animal.inc`.
- **Ask about the output:** pick a start-up line you don't understand, ask Copilot what it means and which part of the app wrote it, and check it against the list of parts from challenge 1.
- Quiz (scenario): a log line mentions the database starting. Which part of the app is it about?
- **Reproduce Tall Order Co.'s save:** a development environment has Animal Inc.'s own test data, never customers', so you can't see what Giraffe typed, and you don't need to. Add any new company: it spins too, and nothing says why. You've reproduced the bug, the first thing engineers ask for.
- Exercise: write the reproduction steps (what you did, what you expected, what happened). The first part of the bug report.

### 3. Is the customer right?

**After this challenge, you'll be able to confirm in the database whether data was saved.**

- **Predict first:** where do you think the save got lost? The browser, the network, the server, the database? (Reflection step, kept for challenge 6.)
- **What a database is:** tables, rows, columns, with the CRM's companies table as the example.
- Open the database table view and look for the company you added: it isn't there. The customer is right, so the question becomes where the save got lost.
- **Ask:** what do the columns in the companies table hold? Check one answer against a company you can see in the app.
- **Why not ask Copilot why the save fails?** You could, and it might guess well. But you'd have no way to tell a good guess from a bad one, and no evidence to put in front of an engineer. In this course Copilot explains what you find, and you follow the trail.
- Quiz (judge a scenario): a customer says their change disappeared and you find it in the database. What does that tell you?
- The reusable habit: **confirm the symptom before chasing the cause.**

### 4. Start where the user was: the network tab

**After this challenge, you'll be able to find the request behind a click and read what came back.**

- **Request and response:** what the browser sends to the server and what it gets back, with the save as the example. The **API** as the agreed way the frontend and the server talk.
- Open developer tools, go to _Network_, click _Save_ again, find the request.
- **Most of this app's requests go to one address, `graphql`:** open _Payload_ to see which one is the save. One sentence on GraphQL as one style of API.
- **Read the Payload:** the name you typed, and an `accountOwnerId` you never picked. Note it down for challenge 6.
- **Status codes:** what they're for, the handful PMs meet. This one is 200, which usually means it worked.
- Open the response: "This operation references a record that does not exist". Here the status only says the server answered; the response says whether the save worked. Other apps that use GraphQL do the same.
- **Ask:** copy the response into Copilot and ask what it says in plain words. Check: which word in the response says the save was rejected?
- The red line you can ignore: `manifest.json` marked as a CORS error, always there in a codespace, and why it isn't the problem.
- Quiz (scenario): a request is 200 and the user says it failed. Where do you look next?
- Where it comes back: the [network tab field guide] toolkit item, used in challenges 7 and 9.

### 5. Go deeper: the logs

**After this challenge, you'll be able to check a log for the reason behind a failure.**

- **What a log is:** a record the software writes while it runs.
- The server log is already running in a terminal: it shows nothing about the save. Why: this server only logs its own faults, and it counts this as a problem with what the browser sent (`BAD_USER_INPUT` in the response).
- Run `show-log db`: the database log has the answer. The new company's `accountOwnerId`, the one you never picked, "is not present in table workspaceMember".
- **Ask:** what does "violates foreign key constraint" mean, and which two tables is this line talking about? Then predict whose ID the app sent, for challenge 6.
- **One log doesn't always explain a failure, and engineers check the next one.** Name the difficulty: logs look intimidating; you only need the one line.
- Quiz (scenario): the server log is silent after a failed action. What does that tell you, and what doesn't it?
- **The honest part:** at work most PMs can open the network tab, but few can see server logs or the production database. Knowing what each layer shows tells you what to ask engineers for.

### 6. Where the save got lost

**After this challenge, you'll be able to explain which layer rejected the save and draw the path it took.**

- Back to the database: find yourself among the workspace members. Your ID there doesn't match the `accountOwnerId` the app sent. The app sent your account's ID, the one you sign in with, which is kept in a different table, so it points to nobody in the workspace.
- **The rule:** a company's account owner has to be someone in the workspace, so the database checks that the ID points to an existing member. Engineers call this a foreign key.
- **Find where the ID comes from:** ask Copilot which code sets `accountOwnerId` when a company is created. Open the file it names. You don't need to read the code: find the line, and check which of your two IDs it uses.
- So the database did its job. **The bug is in the frontend: it sends the wrong one of your two IDs, and it shows a spinner instead of the error.**
- Look back at your prediction from challenge 3. Where were you right, and what surprised you?
- **Draw the map:** frontend, API, server, database, with what you saw at each one. You walked through every part, so the diagram describes something you've seen.
- Exercise (medium effort): Rhino had a go at the map to explain it on the call, and it's missing one layer. Which one, and what evidence goes there?
- Exercise: draw your own map (paper or any tool) and note one piece of evidence per layer.

### 7. Write the bug report

**After this challenge, you'll be able to write a bug report an engineer can act on without asking you anything.**

- What makes a bug report useful: the steps, the expected result, the actual result, and the evidence from each layer. The bug report template (toolkit item).
- Exercise: write yours, starting from the reproduction steps in challenge 2.
- **Ask:** give Copilot your report and ask what an engineer would still need to ask you. Add only what you can back with evidence you saw.
- **An example, if it helps:** Snail's bug report, annotated. Yours can look different: it works if an engineer could act on it without asking you anything.
- Quiz (evaluate someone's work): a one-line report ("Saving doesn't work, please fix"). What would the engineer need to ask?
- Where it comes back: in challenge 8 the same report becomes the prompt for an AI agent.

### 8. Hand it to AI and test the fix

**After this challenge, you'll be able to test an AI-made fix against your bug report.**

- **Video:** the same codespace, two prompts to Copilot: "Saving a company doesn't work. Fix it." and the bug report. What each one produced, and why only the person with the bug report knows what "fixed" should look like. What the challenge claims about the difference depends on the trial runs (see Verification handoff).
- **Why the bug report is also the prompt:** what lets an engineer fix a bug quickly is what an AI agent needs too.
- **From asking to changing:** until now Copilot has only answered. Agent mode changes files and can run commands, so this is the first time it touches the code.
- Switch the chat to agent mode and paste your bug report. Read which file it changed, and ask it to explain the change in product terms.
- If Copilot fails or isn't available on your account: `use-fix` switches your copy to the fix, so you still test one.
- **Test it** with specific cases: 1. Save a new company: it saves, with you as its account owner. 2. Save a company with the same web address as one already in the list: it can't be saved, and a message now says why instead of a spinner.
- Then open the ready-built app at its own address and try the same save: **it still spins.** Callback to "Which copy am I looking at?": your fix hasn't been reviewed, tested or released. What it takes to reach Tall Order Co. is the deployment course later in the journey.
- Quiz (scenario): an engineer says the fix is done. What do you check before telling Rhino it's fixed?

### 9. Try it on your own product

**After this challenge, you'll be able to find the request behind one action in your own product.**

- No codespace needed: open the network tab on your own product, or any web app you use, do one action, find its request, read its status and response, and name the parts.
- How to share evidence safely: what not to paste into a ticket (HAR files contain login cookies), and what the browser can't show.
- **Predict, ask, check at work:** use only the AI tool your company approves, and remove customer data and anything secret before you paste. The personal Copilot account was fine for the made-up data in your copy, not for your product's data.
- **Questions to ask AI about unfamiliar code:** the questions from this course, collected for your own product's repository if you can read it (toolkit item).
- The Technical Product Confidence self-assessment and its manager-ready report.
- **Final reflection:** what's the one thing you'll check in your own product this week?
- Course end: next in the journey, how a web application works across the whole system.

---

## Narrative arc

1. **The pain:** a customer complaint, a deadline, engineering unavailable, and no idea where to look.
2. **The product running, and Copilot beside you:** set up and start the app, see its parts start one by one, and start asking.
3. **The trail:** reproduce it, then database, browser, logs, database again. Each layer adds one piece of evidence.
4. **The answer:** the app sent the wrong ID, and hid why the save was rejected.
5. **The report:** evidence an engineer, or an AI agent, can act on.
6. **The fix, and its limit:** it works in your copy and not for customers.
7. **Your own product:** the first layer you can check on your own, the next day.

---

## Toolkit items

None of these exist yet in `toolkit-links.md`, so the course names them without links until they're created:

- **Setup guide:** creating a personal GitHub account, turning on Copilot's free plan and switching off its use of your data for training, the laptop check (green, amber, red) with the message to send to IT, raising the codespace idle timeout, and what to do when setup fails.
- **Network tab field guide:** where to click, which columns to read, the status codes PMs meet (including a 200 with an error in the response), how to spot a slow request, red lines that aren't the problem, sharing evidence safely, what the browser can't show.
- **Bug report template.**
- **Questions to ask AI about unfamiliar code:** the predict, ask, check habit and the questions used in the course (what is this repository, which file lists the parts, what does this log line mean, what does this response say, where is this rule defined, what would an engineer still ask about this report), worded so they work on any repository.
- **Technical Product Confidence self-assessment** and its manager-ready report.

---

## Skills covered

- What a development environment is, and how it differs from staging and production
- Starting an app's parts and recognising each one
- Asking an AI assistant about unfamiliar code and output, and checking its answers against evidence
- Reproducing a bug and writing reproduction steps
- Checking a database table for a record
- Finding a request in the network tab and reading its payload, status and response
- Reading a server log and a database log for one relevant line
- Explaining which layer rejected an action and drawing the map
- Writing a bug report with evidence from each layer
- Giving a bug report to an AI agent and testing its fix
- Telling a fix in development from a fix customers have

---

## Timing

About two and a quarter hours in total: the design doc's two hours, plus a few minutes per challenge for the Copilot questions. Rough per challenge: 1 about 20 (most of it reading while the codespace builds, then turning on Copilot), 2 about 15, 3 about 10, 4 about 17, 5 about 14, 6 about 15, 7 about 17, 8 about 20, 9 about 10.

Challenges 1, 4, 7 and 8 run at or over the rubric's 15-minute maximum, which is agreed for this course: a lab step needs the time it takes, including the codespace build, the frontend rebuild (about a minute and a half) and Copilot's run.

---

## Cross-check against the source material

- **Set up the development environment, read the recipe, start the app:** challenges 1 and 2.
- **Predict where the save got lost:** challenge 3, revisited in 6. The workshop's phone poll becomes a reflection step.
- **Trail steps 1–4 (database, browser, logs, database):** challenges 3, 4, 5 and 6.
- **Draw the map:** challenge 6.
- **Write the bug report:** challenge 7, with Snail's report as an optional example.
- **Fix it with AI, one-line complaint vs bug report:** challenge 8, with the comparison as the one video.
- **Added beyond the source:** Copilot in ask mode from challenge 1, to explore the repository and explain what the learner finds. The design doc only uses Copilot for the fix, and asks for questions about the code in later missions.
- **Try it on your own product:** challenge 9.
- **Field guide, self-assessment:** toolkit items, linked in 4 and 9.
- **Dropped, because it's workshop-only:** pairs, the phone poll, the run of show, the big screen, the QR code, the shared fallback copy, the wifi fallback, live feedback on volunteers' reports.
- **Dropped, as you asked:** workshop recordings as worked answers; any mention of the workshop.
- **Dropped, season-only:** the case clinics, and "Mission 2 starts from your copy". The course end points to the next course without promising the codespace is still there (GitHub deletes it after 30 days without use).
- **Out of scope here:** infrastructure and cloud platforms, which the waitlist page lists under its first course. They move to the next course.

---

## Open points

1. **Tim's role**, if any.
2. **Agreed exceptions to the rubric**, so the critics don't flag them: no Dalmie or Book Club Organiser (the running example is Animal Inc. and Tall Order Co.); the first challenge is setup, with "Which copy am I looking at?" as its reusable tool; challenges can run past 15 minutes.
3. **The waitlist page's course 1 title** includes "Infrastructure". Change it to match this course, or leave it until the journey launches.
4. **Story data, seeded on 9 November.** `load-story` renames Twenty's demo data for Animal Inc.: you sign in as PM (`pm@animal.inc`, already filled in), and your colleagues are Rhino, Rabbit, Snail, Kim and Croc, plus Twenty's made-up colleagues. The deals keep Twenty's demo names (iPads, MacBooks), which no challenge opens.
5. **Folder name:** `technical-pm-web-app-00`. Rename if you have a convention in mind.

---

## Verification handoff

### Opening and toolkit setup guide

- **Tools taught:** GitHub: create a personal account. GitHub Copilot: turn on the free plan and switch off its use of the learner's data for training.
- **Claims to verify:** Copilot Free isn't available on accounts an employer manages or that already get Copilot from an employer; where the training setting is and what it's called; the free Codespaces allowance (120 core-hours, 15 GB-months a month for personal accounts, stops at the limit without charge); the codespace idle timeout default (30 minutes) and maximum (240 minutes) and where to change it; deletion after 30 days without use.
- **Premise risk:** the whole course needs Codespaces and Copilot Free reachable from the learner's network. If either is often blocked, the laptop check and the personal-laptop fallback carry more weight.

### Challenge 1: A real product in a development environment

- **Tools taught:** GitHub Codespaces: create a codespace from the _Open in GitHub Codespaces_ button on `productkind/twenty-pm-lab`. GitHub Copilot in the codespace: open the chat, turn on the free plan, switch off training on prompts, ask in ask mode.
- **Claims to verify:** the exact button label and what the learner sees while it builds; the build time on a new free account (trial check 3); the machine type it asks for and whether the free account can create it; the name and location of the file that lists the app's parts (`lab/docker-compose.yml`?) and that it names the database, server, worker and Redis; Copilot is already in a browser codespace without adding it, and how a new free account turns on the free plan from there; the current chat mode names and labels (ask, agent, and any others) and that ask mode changes no files; that Copilot answers "which file lists the parts of the app that run?" correctly on the Twenty repository.
- **Premise risk:** if the first build takes much longer than about 10 minutes, the reading-while-it-builds design needs rethinking. **The free plan's allowance:** GitHub doesn't publish it, and the course now asks Copilot roughly 8 to 12 questions before the agent-mode fix in challenge 8. Measure how much of the allowance a full run uses, on a new free account, so the fix doesn't fail for lack of allowance. If it's tight, cut the asks to the ones that teach most and lean on `use-fix`.

### Challenge 2: Start the app and watch the parts start

- **Tools taught:** the lab commands `start-app`, `load-story`, `start-frontend`; the VS Code terminal (opening a new one with **+**); the _Ports_ tab; signing in.
- **Claims to verify:** the exact output each command prints (_Setup is finished_, _Twenty is ready_, the frontend's "open the page" and "reload" messages); which port the learner opens (3001 for the frontend built from source?) and the ready-built app's port; that the sign-in form is filled in with `pm@animal.inc`; that adding any new company produces the spinner in the seeded version; how to ask Copilot about terminal output (selecting it and adding it to the chat, or a terminal command for it) and its current labels.
- **Premise risk:** none.

### Challenge 3: Is the customer right?

- **Tools taught:** the database table view in the codespace; Copilot ask mode.
- **Claims to verify:** how the learner opens the table view (extension, command or link), the table name for companies, and how they search it for the company; that Copilot explains the companies table's columns correctly.
- **Premise risk:** none beyond the seed.

### Challenge 4: The network tab

- **Tools taught:** browser developer tools (Chrome, Edge, Firefox; Safari needs them switched on): _Network_ tab, filtering, _Payload_, _Response_.
- **Claims to verify:** tab and label names in current Chrome and Edge (and Firefox's equivalents, which differ: _Request_ rather than _Payload_); the save's request shows an `accountOwnerId` in the Payload, and status 200 with "This operation references a record that does not exist" and `BAD_USER_INPUT` in the response; the `manifest.json` CORS line appears in a codespace; how to copy a response from the browser into the Copilot chat in the codespace (a different browser tab), and that the response holds nothing private.
- **Premise risk:** none.

### Challenge 5: The logs

- **Tools taught:** the running server log; `show-log db`; Copilot ask mode on a log line.
- **Claims to verify:** the server log shows nothing about the save; `show-log db` shows the foreign key error on `accountOwnerId` and the `workspaceMember` table; the exact command syntax `show-log` accepts.
- **Premise risk:** none.

### Challenge 6: Where the save got lost

- **Tools taught:** the database table view again; Copilot ask mode to find a definition in the repository, and opening the file it names.
- **Claims to verify:** how the learner finds their own workspace member ID in the table view, and that it differs from the `accountOwnerId` in the Payload; that Copilot, asked in ask mode, finds the code that sets `accountOwnerId` when a company is created, how reliably (run it several times on a new free account), and what the file looks like to a non-coder.
- **Premise risk:** Twenty is a very large repository. If Copilot can't find the code reliably, this step becomes "open the file" with the path given, and Copilot explains it.

### Challenge 7: Write the bug report

- **Tools taught:** Copilot ask mode to review a bug report.
- **Claims to verify:** none beyond the allowance check in challenge 1.
- **Premise risk:** none.

### Challenge 8: Hand it to AI and test the fix

- **Tools taught:** GitHub Copilot agent mode in a browser codespace; `use-fix`.
- **Claims to verify:** Copilot is already in the codespace without adding it; how to open agent mode and its current labels; that the free plan includes agent mode; how often agent mode fixes the bug from the model bug report (target: 9 out of 10 within five minutes, trial check 8) and from the one-line complaint (trial check 9); the frontend rebuild time and message; that `use-fix` switches the copy to `mission-1-fix`, and the frontend rebuilds and says when to reload; the ready-built app still spins after the fix.
- **Premise risk:** what the video and the text claim about the one-line complaint vs the bug report must match what the trial runs showed. If the one-line complaint often works, the point becomes that only the learner with a bug report can tell whether it did.

### Challenge 9: Try it on your own product

- **Tools taught:** browser developer tools on any web app.
- **Claims to verify:** HAR files contain cookies and auth headers by default in current Chrome (Chrome changed its HAR export defaults, so check what it includes now).
- **Premise risk:** none.
