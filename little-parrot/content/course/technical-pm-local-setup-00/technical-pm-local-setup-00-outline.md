# Course Outline: Your Product on Your Laptop

**Full title (working):** Your Product on Your Laptop: Set Up a Development Environment, Week by Week

**Where it fits:** after the free "How web apps work" workshop and before the paid [How Your Product Works: Technical Foundations for Product Managers](https://littleparrot.app/courses/technical-foundations-for-product-managers) cohort, which starts on Tuesday 19 January 2027. Free.

**This version:** for Lisbon workshop participants. They already ran Twenty in a codespace, followed the failed save and fixed it with Copilot. A later version adds the workshop's missions for people who didn't come, so the workshop is only mentioned in the opening step and the emails, and that step can be swapped.

**Built from:** the brief agreed with Tamas on 17 November 2026, the workshop outline ([`technical-pm-web-app-00-outline.md`](../technical-pm-web-app-00/technical-pm-web-app-00-outline.md)), the course design ([`technical-skills-for-product-managers-learning-journey-design.md`](../technical-skills-for-product-managers-learning-journey-design.md)) and the fork [`productkind/twenty-pm-lab`](https://github.com/productkind/twenty-pm-lab).

## Overview

In the workshop, Twenty ran on a computer GitHub lent the learner for the day. This course puts it on their own laptop, and then tries the same with their own product.

Every week has the same shape:

1. **First Twenty, then yours.** Each step is shown on Twenty first, where we know exactly what happens. Then comes the general advice for the learner's own product, where we don't.
2. **Cards for the phone, tasks for the laptop.** Each week's challenge is cards they can read on the phone in about 10 minutes: what the step is, why engineers do it, a scenario quiz. The laptop work is a short list of **tasks** (install this, clone that, start this), which the learner ticks off themselves.
3. **One email a week.** It announces the new challenge and its tasks. Its content changes with what the learner has ticked (see "Progress and reminders").

The learner answers a few setup questions at the start (AI subscription, coding agent, OS, what's installed). The tasks then show only the steps for their OS and tools.

**What the learner walks away with:**

- Twenty running on their own laptop, with a change they made showing up in it.
- Their own product's code on their laptop, and a list of what it needs to run.
- A coding agent they've used to find their way around both.
- As far as they get, their own product running too.

**What it doesn't do, on purpose:** the paid course covers the rest. Each week names the part it leaves out and says where it comes back (see "What we leave for the paid course").

**The honest part, said up front:** running a company's product on a laptop is often hard, even for engineers joining the team. Their first week often goes on it. Twenty is set up so it works. The learner's own product may not start, and getting as far as "I know what it needs and who to ask" still counts. We can mention that the paid course has the office hours included, also help on Discord, so if they are stuck they can get help.

---

## The cast

The same as the workshop: the learner has no persona, and the characters talk to them directly.

- **Snail**, software developer: whose laptop the learner's ends up looking like. Snail's notes are the worked answers ("how I set mine up").
- **Kim**, product coach: the guide, who opens each week.
- **Rhino**, customer success: one line in the opening, asking whether the learner can check things without waiting for engineering.

---

## Setup questions (asked once, before Week 1)

These decide which steps the learner sees. Each answer can be changed later.

1. **Which AI tools do you pay for?** (multiple) ChatGPT, Claude, Gemini, Microsoft Copilot, GitHub Copilot, Cursor, none.
2. **Is a coding tool from it installed?** (multiple) Claude Code (terminal), Claude desktop app's code tab, Codex, GitHub Copilot in VS Code, Cursor, Microsoft Copilot desktop app's code tab, Gemini CLI, none, not sure.
3. **Which of these are on your laptop?** (multiple) Git, VS Code, Cursor, Docker, Node.js, none, not sure. "Not sure" leads to the check in Week 2.
4. **Do you have a GitHub account?** Yes, personal / yes, my employer's / no.
5. **Which laptop will you use?** Mac / Windows. Then: is it your own or your employer's? An employer's laptop may not let you install things, and Week 1 says what to do about that.

**Microsoft Copilot vs GitHub Copilot:** two different products. The question lists them separately, and the steps never use "Copilot" alone.

**Which tools get steps first:** GitHub Copilot in VS Code (the default for "none", because it has a free plan and is built into VS Code) and Claude, on Mac and Windows. The others are added one at a time, mainly as screenshots allow. Until a tool has its own steps, its learners see the GitHub Copilot steps with a note.

The personal GitHub account is possibly better for Twenty. The employer's account is possibly better for the learner's own product. The steps don't assume either. So possibly the learner needs both.

---

## Structure

Five weeks, one challenge each. A challenge is about 10 minutes of cards. Each week's tasks take 20 to 60 minutes on the laptop, more in Week 5 if the learner's own product is hard to start.

### Opening: comics and the setup questions

- **Comics:**
  1. Rhino: "Can you check whether it's fixed in the new version?"
  2. The learner's codespace from the workshop, with "This codespace has been deleted after 30 days" (GitHub's default).
  3. Snail at a desk with three terminals open: "It runs on my machine."
  4. Kim: "Let's make it run on yours too."
- **Biggest fear first:** "You won't have to learn to code to do this." Installing tools and starting an app means following steps, reading what the screen says and asking when it doesn't work. A coding agent can do most of the typing for you.
- **What a laptop setup gives you that a codespace doesn't:**
  - It stays.
  - It costs nothing.
  - It works with your own product's code, which you may not be allowed to put in a codespace on your personal account.
- **The setup questions** (above).
- **How the five weeks work:** one challenge and one set of tasks a week, one email when the next one opens. Tick the tasks yourself. Nothing is marked, and a week can wait.

### Week 1. Read the code without installing anything

**After this challenge, you'll be able to find out what an app is made of from its code repository.**

All on the phone or in a browser, so the learner gets something useful before installing anything.

- **What a repository is:** the folder of an app's code, together with its history. GitHub is one of the places repositories live. The learner saw Twenty's in the workshop, and now they read it from the outside.
- **Twenty first:**
  - Open [`productkind/twenty-pm-lab`](https://github.com/productkind/twenty-pm-lab) in the browser.
  - Read the README: what it says the app needs.
  - Look at the top-level folders.
- **Ask your AI chat about it.** A copy-paste prompt (the reusable tool), written for the learner's own AI tool, that asks what the app is made of and what you'd need to install to run it. Then **check:** find two of its answers in the repository yourself (for example `.nvmrc` for the Node.js version, and `lab/docker-compose.yml` for the database).
  - Predict, ask, check, the workshop habit, now outside the codespace.
- Quiz (scenario): the AI says the app needs MySQL, and the repository has a file starting a Postgres database. Which do you trust, and what do you do?
- **Then yours:** where does your product's code live? GitHub, GitLab, Bitbucket or Azure DevOps, and the one-line difference that matters (they all hold repositories; only the sign-in differs).
  - Can you already see it? If yes, read its README and top-level folders, and use only the AI tool your company approves for its code.
- **Ask for access now, because it takes time.** A ready-made message to send to your engineering lead (the second reusable tool). It asks for read access to the repositories, the setup document if there is one, and whether you're allowed to run the product on your laptop.
  - **It's normal for this to take a week or more.** Weeks 2 to 4 don't need it.
- **Employer's laptop:** if you can't install things, the message also asks IT. Until then, do Weeks 2 to 4 on a personal laptop with Twenty, and your own product waits for the company laptop.
- Exercise: send the access message (or note that you already have access).

**Tasks (ticked by the learner):**

- [ ] Ask your AI chat about Twenty's repository and check two answers.
- [ ] Find where your product's code lives.
- [ ] Send the access message (or confirm you have access).

**Left for the paid course:** what each part in Twenty's list does (the worker and Redis) is Mission 2. This week only names them.

### Week 2. Your laptop's toolbox, and Twenty's code on it

**After this challenge, you'll be able to copy a repository to your laptop.**

- **Why engineers have these three:**
  - **Git** keeps a repository's history and copies it. You'll use it through VS Code's buttons (the _Source Control_ view), not by typing Git commands: that's how many engineers use it too.
  - **An editor** (VS Code or Cursor) is where code is read and changed.
  - **A terminal** is where you type commands. The workshop's terminal, now on your own laptop.
- **Check what you have:** VS Code's _Source Control_ view tells you whether Git is installed, and offers to install it if it isn't.
- **Make a home for your products:** one folder (for example `Products` in your home folder), so every repository you clone has the same place. Snail's laptop as the worked example.
- **Clone:** copying a repository to your laptop, with its history. **Clone vs download ZIP:** the ZIP has no history and can't receive updates.
- Quiz (scenario): a colleague sends you a ZIP of the code. What can't you do with it that you could with a clone?
- **One repository or several?**
  - Twenty keeps everything in one, with a `packages` folder (frontend, server and more).
  - Many products split it: a frontend repository, a backend repository, sometimes more.
  - The checklist for telling which yours is: the README, the organisation's list of repositories, and asking the engineering lead.
- Quiz (judge a scenario): your company has `web-app`, `api` and `design-system` repositories. Which do you probably need to run the product?
- Exercise: write down which repositories your product needs, or "waiting for access".

**Tasks (steps by OS):**

- [ ] Install VS Code (skip if you use Cursor).
- [ ] Make sure Git is installed, from VS Code's _Source Control_ view.
- [ ] Create your products folder.
- [ ] Sign in to GitHub in VS Code.
- [ ] Clone `twenty-pm-lab` into your products folder from VS Code.
- [ ] If you have access: clone your product's repository (or repositories).

**Windows: everything happens in WSL.** WSL (Windows Subsystem for Linux) is a Linux computer running inside Windows. The lab commands are written for Linux and Mac, and Docker Desktop on Windows runs on WSL anyway, so Windows learners work inside it from Week 2 on:

- One card for Windows learners only: what WSL is, and why engineers on Windows use it too. Two places on one laptop, so "which copy am I looking at?" now has a Windows-sized cousin: "am I in Windows or in Linux?"
- The Windows tasks start with **installing WSL with Ubuntu** (it needs admin rights and a restart, so an employer's laptop may block it; Week 1's message to IT covers this).
- Then VS Code on Windows with its **WSL extension**, and Git inside Ubuntu, not Git for Windows.
- The products folder lives in the Linux home folder (`~/Products`), not on the `C:` drive, because files on the Windows side are slow to reach from Linux.
- The clone happens from VS Code connected to WSL.

Windows learners get one or two extra tasks this week, so Week 2 takes them about 45 minutes instead of 30.

### Week 3. A coding agent that knows the code on your laptop

**After this challenge, you'll be able to use a coding agent to find out what your product needs to run.**

- **Chat vs coding agent:**
  - A chat answers from what you paste.
  - A coding agent reads the files on your laptop, runs commands and can change files.
  - Callback to the workshop's ask mode and agent mode.
- **Which one you'll use** comes from the setup questions:
  - GitHub Copilot's free plan in VS Code if you have no subscription.
  - Otherwise the coding tool your subscription includes (Claude Code or the Claude desktop app's code tab, Codex, Cursor's agent, the Microsoft Copilot desktop app's code tab).
  - One line on why **ask mode first**: nothing changes until you decide.
- **Twenty first:** open the clone in the agent and ask the same questions as in Week 1. Notice the agent can now open the files itself, so its answers point to files you can check.
- **The run-list (the reusable tool):** a prompt that asks the agent to list everything the app needs on the laptop to run. It covers:
  - the runtime and its version;
  - the package manager;
  - databases and other services;
  - settings files;
  - the start commands, in order.

  Twenty's run-list is the worked answer: Node.js 24, Yarn, Docker running Postgres, Redis, the server and the worker, then the frontend from source.

- **What a runtime is:** the program that runs the code, such as Node.js for JavaScript, Python, Java or .NET. Different products need different ones, and often a particular version.
- Quiz (scenario): the agent says your product needs Node.js 18, and you have Node.js 24 installed. Is that fine?
- **Then yours:** run the same prompt on your product's clone, then check two items against the README or the setup document.
- **Company rules:** use the coding agent your company approves for its code. If none is approved, do Twenty only and ask.
- Exercise: save your product's run-list. Week 5 starts from it.

**Tasks:**

- [ ] Install or turn on your coding agent (GitHub Copilot free plan, with training on your data switched off, if you have none).
- [ ] Ask it about Twenty's clone and check two answers.
- [ ] Make your product's run-list (or Twenty's, if you're waiting for access).

**Left for the paid course:** using the agent to change code safely and take a fix through review (Missions 4 and 5).

### Week 4. Twenty running on your laptop

**After this challenge, you'll be able to start an app on your laptop and see a change you made in it.**

- **Twenty's run-list, done for real.** Each part, and why it's needed:
  - **Node.js**, the right version.
  - **Docker:** runs the database and the server in containers, so you don't install them one by one. A container explained as a sealed box with one program and everything it needs.
- The same commands as the workshop: `start-app`, `load-story`, `start-frontend`. Then sign in at `localhost` instead of a codespace address. **What localhost means:** "this laptop".
- **Prove it's yours:** make a small visible change (for example a button label) with the coding agent, wait for the rebuild, reload, see it. The same reload rhythm as the workshop fix.
  - Optionally repeat the workshop bug and fix: the bug is still in `main`, and `use-fix` still works.
- **Look at the data:** connect VS Code's PostgreSQL extension to the database, the same panel as in the workshop, now set up by hand.
  - The data stays when you stop and start the app, because Docker keeps it in a volume.
  - Other database tools exist (TablePlus, DBeaver, pgAdmin). Which one you'll need for your own product depends on its database (Week 5).
- Quiz (scenario): Twenty doesn't open, and the terminal says Docker isn't running. What's the first thing you check?
- **When it doesn't start:** a prompt that gives the error to the coding agent and asks what it means before changing anything. Predict, ask, check again.
- Exercise: write down the order you start things in. That's your start-up checklist, and Week 5 needs one for your product.

**Tasks:**

- [ ] Install Node.js (the version in `.nvmrc`).
- [ ] Install Docker Desktop and start it.
- [ ] Start Twenty and sign in.
- [ ] Make one visible change and see it.
- [ ] Open the database in VS Code.

**Left for the paid course:** the server is the ready-built one, so only frontend changes show up. Building the server from source too, and a pull request with checks, is the paid course's deeper track. Where this copy sits next to staging and production is Missions 2 and 5.

### Week 5. Try it on your own product

**After this challenge, you'll be able to try starting your own product on your laptop, with a coding agent's help.**

- **Name the difficulty first:** this can take an afternoon, or longer. Getting to "I know what's missing and who to ask" is a real result.
- **From the run-list to a running app:** the same order as Twenty, using the run-list from Week 3:
  - the runtime;
  - the database;
  - the settings file;
  - the start command.
- **Two ways to use the agent:**
  - **Guide me:** it gives one step at a time and you run it.
  - **Do it for me:** in agent mode it runs the commands, and you read and approve each one.

  A copy-paste prompt for each (the reusable tools). The rule from the workshop holds: you check the result in the app, not in what the agent says.

- **The database your product needs:** Postgres, MySQL, SQL Server, MongoDB. How to install it, either directly or in Docker as in Twenty. Then a tool to look at it (the VS Code extension for it, or one of the tools from Week 4).
- **Settings and secrets:** most products need a settings file (often `.env`) with keys you don't have. **Never paste a real key into an AI chat.** Ask an engineer for development keys. A ready-made message for it.
- Quiz (scenario): the agent suggests copying the production database address into your settings file. What do you do?
- **When to stop and ask:** a ready-made message asking an engineer for 20 minutes to pair on it. It includes your run-list, what worked, the error and what you tried.
- **Final reflection:** what can you now check on your own that you used to ask about?
- **What's next:** the paid course and what it adds (below), with the date and how to join.

**Tasks:**

- [ ] Install your product's runtime.
- [ ] Install its database and a tool to look at it.
- [ ] Try to start it (or send the pairing message).

---

## What we leave for the paid course

Each week names its part at the moment it comes up, so the learner sees what's ahead without a sales list at the end:

- **Week 1:** the worker and Redis, what everything in the app does → Mission 2.
- **Week 3:** changing code with an agent and taking it through review → Missions 4 and 5.
- **Week 4:**
  - development vs staging vs production in practice → Missions 2 and 5;
  - building the server from source and opening a pull request → the deeper track;
  - Twenty's own analytics events in Grafana → Mission 6.
- **Week 5:** turning your own product's setup into the map of your product → Missions 2 and 3's Monday moves.

---

## Progress and reminders (MVP features)

- **Setup answers** are stored per learner and choose which variant of each task they see (OS, coding agent).
- **Tasks are ticked by the learner**, per week. Nothing checks them, and nothing is marked.
- **Weekly email**, one per week when the new challenge opens. Three versions by progress:
  - **All done:** the new week, and what last week unlocked.
  - **Some done:** the new week. The one task left is often the one that's still worth doing, so name it, with the "Stuck?" link.
  - **Not started:** the new week, and the shortest path in (Week 1's cards take 10 minutes on the phone).
- **No streaks, no guilt messages, no "you're behind".** Following the course design, a week can wait, and the course stays open.

---

## Narrative arc

1. **The loss:** the workshop codespace is gone, and checking anything means waiting for someone.
2. **Reading:** find out what an app is made of without installing anything, and start the access request early.
3. **The toolbox:** Git, an editor, a terminal, and the code on the laptop.
4. **A helper:** a coding agent that reads the code, and the run-list.
5. **It runs:** Twenty on the laptop, with a change you made.
6. **Yours:** as far as your own product goes, and an honest place to stop.

---

## Toolkit items

None exist yet in `toolkit-links.md`, so the course names them without links:

- **Install Your Development Tools (Mac / Windows):** VS Code, Git (through VS Code), Node.js and Docker Desktop, each with the check that it worked. The tasks link here, which keeps the cards short.
- **Messages to Send Your Engineering Team:**
  - the access request;
  - the development keys request;
  - the pairing request.
- **Prompts for Getting Your Product Running:**
  - the Week 1 repository question;
  - the run-list;
  - the "explain this error" prompt;
  - "guide me";
  - "do it for me".
- **Run Twenty on Your Laptop:** the local version of the codespace setup guide.

---

## Skills covered

- Reading a repository from the outside to find what an app is made of
- Installing and checking Git, an editor, a runtime and Docker
- Cloning a repository from VS Code, and telling one-repository from several-repository products
- Using a coding agent in ask mode to find what an app needs to run
- Starting a multi-part app locally and seeing a change in it
- Connecting to a local database with a database tool
- Asking engineers for access, keys and help with evidence

---

## Timing

- **Cards:** about 10 minutes a week, 50 minutes in total.
- **Laptop tasks:**
  - Week 1: about 15 minutes.
  - Week 2: about 30.
  - Week 3: about 20.
  - Week 4: about 60, most of it downloads.
  - Week 5: anything from 30 minutes to an afternoon.

---

## Cross-check against the brief

- **Setup questions:**
  - AI tool, coding agent, installed tools, GitHub account, OS: all in the opening.
  - Laptop ownership added, because it decides whether installing is possible.
- **Install Git; install VS Code unless Cursor is installed; create the products folder:** Week 2.
- **Sign into GitHub, ask for access to the repositories:**
  - Sign-in is in Week 2.
  - The access request moved to **Week 1**, because it can take a week or more.
- **Single repository or several; clone with VS Code:** Week 2.
- **Install a coding agent, GitHub Copilot if there's no subscription:** Week 3.
- **Ask questions about the repository:** Week 1 (chat, from the outside) and Week 3 (agent, on the clone).
- **Install the runtime (Node.js for Twenty); install Docker; run Twenty and try what the workshop did:** Week 4.
- **Install Postgres locally and compare it with Docker:** **dropped as agreed.** Twenty's Docker Postgres keeps its data in a volume, so the comparison wouldn't hold. A database install stays, for the learner's own product, in Week 5.
- **Database tool, a VS Code extension, other options for other databases:** Week 4 for Twenty, Week 5 for the learner's own product.
- **Try running your own product with AI prompts, and say it may take time:** Week 5.
- **Ready-made tools for every social step:** access, keys and pairing messages.
- **Leave things out on purpose and say they're in the paid course:** "What we leave for the paid course".
- **Week 1 gives value, not just questions:** reading Twenty's repository with an AI chat, no installs.
- **Docker licensing and company AI policy:** not built in, as agreed. Two exceptions:
  - The workshop's "use only the AI tool your company approves" line stays, because the learner's own code is involved.
  - Docker Desktop's licence is not mentioned unless learners ask.

---

## Open points

1. **The fork needs a local setup path.** `lab/setup/install` only runs inside the codespace:
   - It reads `/proc/meminfo` and uses GNU `date`, which fail on a Mac.
   - The PostgreSQL panel's connection lives in `devcontainer.json`, which a local VS Code doesn't read.

   Before Week 4, the fork needs:
   - a local install script for Mac and for Ubuntu on WSL;
   - the connection in `.vscode/settings.json`;
   - a check that `start-frontend` works without `CODESPACE_NAME`.

2. **Windows uses WSL (decided 17 November 2026).** Windows learners work inside WSL with Ubuntu from Week 2 on: Git, Node.js and the clones live there, VS Code connects to it with the WSL extension, and Docker Desktop's WSL integration is turned on for Ubuntu in Week 4. The fork's local setup script therefore only needs to support Mac and Linux (Ubuntu in WSL).
3. **Memory.** The codespace asks for 16 GB, and the frontend build gives Node.js 8 GB. On an 8 GB laptop Week 4 may not work. We need to measure on a real 8 GB and 16 GB Mac, and decide whether to:
   - say "16 GB recommended" in the opening;
   - or offer a lighter path (the ready-built app on port 3000 only, with no change from source).
4. **The opening mentions the workshop.** Keep that to one step, so the non-attendee version swaps it for the workshop's missions.
5. **Week 1 for learners whose company code isn't on GitHub.** The steps are written for GitHub first. GitLab, Bitbucket and Azure DevOps get a short "where to find it" note each. Confirm these are the "most popular" set.

---

## Verification handoff

### Opening

- **Tools taught:** none.
- **Claims to verify:**
  - GitHub deletes a codespace after 30 days without use (still the default).
  - Microsoft Copilot's desktop app has a code tab that works on files on the laptop: what it's called, which plans have it, Mac and Windows.
  - The Claude desktop app's code tab: what it's called, which plans have it.
- **Premise risk:** none.

### Week 1

- **Tools taught:**
  - GitHub in the browser: read a repository's README and folders.
  - ChatGPT, Claude, Gemini, Microsoft Copilot (and GitHub Copilot on github.com): ask about a public repository by its link.
- **Claims to verify:**
  - Which of these AI chats can read a public GitHub repository from its link today, and on which plans (free vs paid). Name the exact feature (for example a GitHub connector, or web browsing).
  - Whether GitHub Copilot's free plan includes chat on github.com about a repository.
  - How a learner finds an organisation's repositories on GitHub, GitLab, Bitbucket and Azure DevOps.
- **Premise risk:** the week's value depends on the learner's AI chat reading the repository by link. If some free plans can't, those learners need a fallback (pasting the README and the folder list into the chat). Confirm per tool.

### Week 2

- **Tools taught:**
  - Git: installed and checked from VS Code's _Source Control_ view, not the command line, on Mac and in WSL.
  - VS Code: install it, sign in to GitHub, clone a repository from the editor (the current command and button names).
  - Cursor: the same clone flow.
- **Claims to verify:**
  - Mac: what VS Code's _Source Control_ view shows when Git is missing (its exact labels), and whether its install route goes through Apple's Command Line Tools prompt. That's the route to teach if it works without the terminal.
  - Windows: installing WSL with Ubuntu (`wsl --install`), which Windows versions support it, whether it needs admin rights and a restart, and the first-run username and password prompt.
  - Windows: VS Code's WSL extension, how to open a folder in WSL, and its exact labels.
  - Windows: whether Ubuntu in WSL ships with Git, and how signing in to GitHub works for a clone made inside WSL (VS Code's own sign-in, or Git Credential Manager from Git for Windows).
  - VS Code's current clone flow and its exact labels, on Mac and in WSL.
- **Premise risk:** WSL needs admin rights; learners on locked employer laptops can't do the Windows path until IT helps.

### Week 3

- **Tools taught:**
  - GitHub Copilot in VS Code: turn on the free plan, switch off training on your data, ask mode vs agent mode.
  - Claude Code and the Claude desktop app's code tab: install, open a folder, ask.
  - Codex, Cursor's agent, the Microsoft Copilot desktop app's code tab: the same tasks, as short notes until full steps are written.
- **Claims to verify:**
  - GitHub Copilot free plan limits (chat and agent requests per month), and the current setting name for training on your data.
  - The current mode names in GitHub Copilot's chat (ask, edit, agent, plan).
  - Which Claude plans include Claude Code and the desktop app's code tab.
- **Premise risk:** none, beyond free-plan limits being enough for Weeks 3 to 5.

### Week 4

- **Tools taught:**
  - Node.js: install the version in `.nvmrc` (24.16.0) on Mac and Windows. Decide between the installer and a version manager (nvm, fnm, Volta).
  - Docker Desktop: install, start, check it's running. On Windows, turn on WSL integration for Ubuntu, and check `docker` works inside Ubuntu.
  - Node.js inside Ubuntu on Windows, the same way as on a Mac.
  - `twenty-pm-lab` lab commands run locally (`start-app`, `load-story`, `start-frontend`, `use-fix`).
  - VS Code's PostgreSQL extension (`ms-ossdata.vscode-pgsql`): add a connection by hand.
- **Claims to verify:**
  - That `twenty-pm-lab` runs end to end on a Mac and in Ubuntu on WSL, outside a codespace (open point 1).
  - That `localhost:3001` started inside WSL opens in a Windows browser.
  - That VS Code's PostgreSQL extension, connected to WSL, reaches the database in Docker.
  - Memory needed, measured (open point 3).
  - How long the first `docker compose pull` and `yarn install` take on a home connection.
  - That the frontend rebuild picks up a code change locally, and how long it takes.
- **Premise risk:** the whole week depends on the fork running locally, which it doesn't yet. This must be built and tested before Week 4's email.

### Week 5

- **Tools taught:** the learner's own product's stack, through a coding agent. Database installs: Postgres, MySQL, SQL Server, MongoDB (directly or in Docker), and a tool to look at each.
- **Claims to verify:**
  - The VS Code extension (or recommended free tool) for each of those databases.
  - That agent mode in each coding tool asks before running a command by default.
- **Premise risk:** none tool-specific. The outcome is honest by design: "as far as you get".
