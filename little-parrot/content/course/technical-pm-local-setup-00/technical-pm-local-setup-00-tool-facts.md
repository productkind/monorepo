# Tool facts: technical-pm-local-setup-00 (Opening and Week 1 only)

_Checked 2026-11-19. Verify again if generating more than ~2 weeks later. Weeks 2 to 5 get appended later._

Scope: the "Opening" and "Week 1" sections of the outline's Verification handoff only.

## Premise check

**Week 1 premise: "the learner's AI chat reads the repository from its link."**

**At risk.** No vendor documentation confirms that any of the four chats (ChatGPT, Claude, Gemini, Microsoft Copilot) reliably reads a public repository's files (beyond what a web page shows) from a pasted link on a free plan. Findings per tool:

| Tool | What the vendor documents (checked 2026-11-19) | Verdict for Week 1 |
| --- | --- | --- |
| Gemini | Official Help page says it can **import** a repository, and says outright that it "can't read a repo from a URL typed into a prompt". Import is via _Add file_ then _More Uploads_ then _Import code_, on a computer only. Public repos need no GitHub linking. The page does not say which plans include it. | Works for the right reason, but the learner must use the Import route, not paste a link. Not on mobile. |
| Claude (claude.ai) | Help article describes a GitHub integration: in a chat, _+_ then _Add from GitHub_; in a Project, _+_ in project knowledge then _GitHub_, where you can "paste a repository URL". Plans are not listed on the article. Web search is on all plans including free (Anthropic blog, May 2025). Pasted-link reading in claude.ai is not documented. | Plausible, but needs the GitHub connector, which is not confirmed for free. Pasting a link alone is not confirmed. |
| ChatGPT | Web search is on Free, Go, Plus, Pro, Business, Enterprise and Edu (OpenAI help via search summary; the page itself returned 403 to me). The GitHub connector is read-only; availability varies by plan and by mode (Deep Research or agent mode versus standard chat). No source confirms free-plan GitHub access. | Link-reading via web search is not confirmed. GitHub connector: not confirmed for free. |
| Microsoft Copilot (consumer) | Nothing found about reading a pasted link or a GitHub repository. Microsoft Learn says its **Code** tab can connect to GitHub and "Ask questions about a connected repository", but that is the Code tab (preview, see Opening), not chat. | Cannot confirm. |

**Suggested reframe:** make the fallback the main path, not the exception. The reusable prompt should work in two forms: (a) "here is the link, if you can open it", and (b) the guaranteed version, where the learner pastes the README text and the top-level folder list (both are visible on github.com without signing in). Name Gemini's _Import code_ and Claude's _Add from GitHub_ as the "if your tool has it" routes. Do not promise that any chat will find `.nvmrc` or `lab/docker-compose.yml` by itself. The "check two answers yourself" step still works because the learner opens those files on GitHub.

Because the vendors do not document this, the only way to be certain is to test the Week 1 prompt on a free account of each tool (see Could not confirm).

---

## The Twenty lab repository: https://github.com/productkind/twenty-pm-lab

**Prerequisites:** none to read it. The repository is **Public** (confirmed on the page; it is a fork of `twentyhq/twenty`). No GitHub account is needed to view it in a browser.

### Task: Open the repository, read the README, see the top-level folders

- **Steps (as of 2026-11-19):**
  1. Open `https://github.com/productkind/twenty-pm-lab` in a browser.
  2. The file list sits at the top (folders first, then files). The README is rendered underneath it, titled "Twenty PM lab", with sections "Start here", "What's in this copy" and "Licence".
- **Top-level folders (confirmed, via the page and the GitHub API):** `.claude`, `.devcontainer`, `.github`, `.vscode`, `.yarn`, `lab`, `packages`.
- **Top-level files include:** `.nvmrc`, `.dockerignore`, `.gitattributes`, `.gitignore`, `.mcp.json`, `.oxfmtrc.jsonc`, `.yarnrc.yml`, `AGENTS.md`, `CLAUDE.md`, `LICENSE`, `README.md`, `README.twenty.md`, `SKILLS.md`, `jest.preset.js`, `knip.json`, `nx.json`, `package.json`, `tsconfig.base.json`, `yarn.config.cjs`, `yarn.lock`.
- **Repository tabs (signed-out view):** _Code_, _Pull requests_, _Actions_, _Projects_, _Security and quality_, _Insights_, and a _More items_ menu. There is no _Issues_ tab shown. There is no Copilot button in the repository header when signed out.
- **What the README says the app needs:** the README (checked 2026-11-19) is written for the codespace path ("runs in GitHub Codespaces, in your browser, so nothing gets installed on your laptop"). It does **not** list the app's requirements (Node.js, Postgres, Redis). It names Twenty v2.48.0, the `.devcontainer/` and `lab/` additions, and the commands `start-app`, `load-story`, `start-frontend`. It contains a placeholder: "The full setup guide ... **[link to add]**". **This changes the outline:** Week 1 says "Read the README: what it says the app needs". The README says how to start it in a codespace, not what it is made of. The "what it needs" answers are in `.nvmrc` and `lab/docker-compose.yml`.
- **Gotcha:** the README's `[link to add]` placeholder is visible to learners today. Fix it in the repository before Week 1 ships.
- **Source:** https://github.com/productkind/twenty-pm-lab and https://raw.githubusercontent.com/productkind/twenty-pm-lab/main/README.md (checked 2026-11-19)

### Task: Open `.nvmrc` and `lab/docker-compose.yml`

- **`.nvmrc` contents (exact):** `24.16.0`. So the Node.js version is 24.16.0 (matches the outline's Week 4 note).
- **`lab/docker-compose.yml` contents (confirmed):** `name: twenty`, four services:
  - `server`: image `twentycrm/twenty:v2.48.0`, port 3000.
  - `worker`: image `twentycrm/twenty:v2.48.0`, command `yarn worker:prod`.
  - `db`: image **`postgres:16`**, port 5432, database `default`, user `postgres`.
  - `redis`: image **`redis:7`**.
  - Volumes: `db-data`, `server-files`.
  - The file's own comments say `start-app` starts "all four, each in its own container".
- **Answer to the Week 1 quiz premise:** the database is **Postgres 16** (not MySQL). The week's scenario ("AI says MySQL, repository has a Postgres file") is consistent with the repository.
- **Mismatch with the outline:** Week 3's run-list line says "Node.js 24, Yarn, Docker running Postgres, Redis, the server and the worker". That matches. Yarn comes from `.yarnrc.yml`/`yarn.lock`; the version of Yarn was not checked.
- **Steps to open them on a phone or browser:** see the next task.
- **Source:** https://raw.githubusercontent.com/productkind/twenty-pm-lab/main/.nvmrc and https://raw.githubusercontent.com/productkind/twenty-pm-lab/main/lab/docker-compose.yml (checked 2026-11-19)

### Task: Open a file such as `.nvmrc` on a phone

- **Steps (as of 2026-11-19):** on github.com in a browser (desktop or phone), tap the file name in the file list (`.nvmrc`), or open `lab`, then `docker-compose.yml`. Both are plain text files, shown on the page.
- **Confirmed:** the file list and rendered README show on the signed-out repository page (fetched via a desktop-style request).
- **Gotchas:** `.nvmrc` starts with a dot. Some phone file lists and the GitHub Mobile app may order or hide it differently; not verified.
- **GitHub Mobile app:** GitHub's docs confirm it exists for iOS and Android and lets you "Search for, browse, and interact with users, repositories, and organizations". The page does **not** say how files and the README are shown. Sign-in is needed in the app.
- **Source:** https://docs.github.com/en/get-started/using-github/github-mobile (checked 2026-11-19)
- **Recommendation:** tell phone learners to use the browser, which needs no account. The app is unconfirmed for this task.

---

## ChatGPT, Claude, Gemini, Microsoft Copilot: ask about a public repository

**Prerequisites:** an account on the tool (free is enough to try). The details by tool are in the Premise check table. Plan-by-plan availability of the GitHub features is **not documented** on the pages I could read.

### Task: Gemini, import a repository

- **Steps (as of 2026-11-19):**
  1. Open `gemini.google.com` on a computer.
  2. In the text box click _Add file_, then _More Uploads_, then _Import code_.
  3. Enter the GitHub repository or branch URL and click _Import_.
  4. Follow any prompts (a private repository offers to link a GitHub account; a public one does not need linking).
  5. Type the prompt and click _Submit_.
- **Exact labels:** _Add file_ → _More Uploads_ → _Import code_ → _Import_ → _Submit_.
- **Cost/plan:** the Help page does not say whether it is free or which plans include it. Requirements it does give: age 18 or over, signed in on a computer, **Keep Activity** turned on. Work or school accounts need a qualifying Workspace edition and an admin who has enabled apps in Gemini.
- **Limits:** one repository per chat, up to 5,000 files and 100 MB. It is a snapshot (later changes are not synced). Gemini "can't retrieve commit history, pull requests, or other metadata" and "can't read a repo from a URL typed into a prompt".
- **Gotchas:** not available on mobile (including the Gemini app), though a chat started on a computer can be continued on mobile. Learners who paste the link into the prompt will not get the repository.
- **Source:** https://support.google.com/gemini/answer/16176929 (checked 2026-11-19)

### Task: Claude, add a repository from GitHub

- **Steps (as of 2026-11-19):**
  - In a chat: click _+_ in the lower-left corner, then _Add from GitHub_, then use the file browser to choose files and folders.
  - In a Project: click _+_ in the upper-right corner of the project knowledge section, choose _GitHub_, search your repositories **or paste a repository URL**, then choose files and folders. A _Sync_ icon refreshes; a _Configure files_ icon changes what Claude reads.
- **Exact labels:** _+_, _Add from GitHub_, _GitHub_, _Sync_, _Configure files_.
- **Cost/plan:** the article does not list plans. It points to "Use connectors to extend Claude's capabilities" for enabling GitHub. Plan availability not confirmed.
- **Gotchas:** the article does not state that public repositories work without connecting an account (it implies a valid URL works and says failures are "most likely" private repositories). The chat flow is a file picker, not a pasted link.
- **Related, web search:** Anthropic says web search is available on all Claude plans including free (blog update of 27 May 2025). Whether claude.ai opens a pasted GitHub link is not documented in what I found. (The API web fetch tool can only fetch URLs the user provides, and does not support JavaScript-rendered pages; that is the API, not claude.ai.)
- **Source:** https://support.claude.com/en/articles/10167454-using-the-github-integration ; https://www.anthropic.com/news/web-search (checked 2026-11-19)

### Task: ChatGPT, GitHub

- **What is confirmed:** web search is available on Free, Go, Plus, Pro, Business, Enterprise and Edu, and counts against plan usage limits (OpenAI help article 9237897, via search summary; the page returned HTTP 403 to my fetch, so I could not read it directly).
- **GitHub connector:** read-only (to push code, OpenAI points to Codex). Availability depends on plan, workspace and mode (for example Deep Research or agent mode, and Plus users may not see it in standard chat). No document I could read lists the free plan as included. Repositories can take about 5 minutes to appear after connecting. Third-party sites disagree, so treat as unconfirmed.
- **Source:** https://help.openai.com/en/articles/9237897-chatgpt-search ; https://help.openai.com/en/articles/11145903 (checked 2026-11-19; both via search results, not fully read)

### Task: Microsoft Copilot (consumer chat), GitHub link

- Nothing found that says Copilot chat reads a pasted link or a GitHub repository. See Could not confirm. The only documented GitHub route is the **Code** tab (Opening section below), which is a Frontier preview.

---

## GitHub Copilot on github.com: https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github

**Prerequisites:** a GitHub account (free). Copilot Free needs no payment.

### Task: Ask Copilot Chat about a repository on github.com

- **Free plan includes chat on github.com: yes.** The plans page (checked 2026-11-19) says Copilot Free users can use Copilot Chat on GitHub.com and GitHub Mobile, and Copilot Chat skills in IDEs are not available on Free. Free has auto model selection only, "limited" agents, an allowance of GitHub AI Credits (amount not on the page I read), and 2,000 inline completions a month. The numeric monthly chat limit was **not** found in official text; do not quote "50 messages" (it came from a third-party site).
- **Important change:** the Copilot on GitHub page says the new "Copilot in the cloud" experience is for **paid plans, starting 28 October 2026**, and "Users on Copilot Free plans will continue to use the old Copilot Chat experience." A GitHub changelog also describes chat on github.com, GitHub Mobile and the cloud agent merging into one agent-sessions experience from late September 2026 (written for Business and Enterprise; effect on Free unclear). Free learners may therefore see a different screen from paid ones.
- **How to open it (documented):** go to `https://github.com/copilot`, type the question in the prompt box, press **Enter**. To add repository context, the page lists: the repository selector, the **+** menu, or **@** mentions. Other entry points named: the Copilot panel opened from a file, issue or pull request; the GitHub dashboard; the **Agents** tab or panel within a repository.
- **Exact labels:** _Add attachment_ (plus icon), _Edit message_, _Stop_, a model dropdown. The docs do **not** name a repository-specific button for the Free (old) experience. A third-party guide describes a Copilot icon at the top right of a repository page; not confirmed from GitHub's docs, and no Copilot button appeared on the signed-out repository page I fetched.
- **Gotchas:** semantic code search works only on default branches. Chat history: the chat-in-GitHub page says conversations are kept for 28 days (a third-party report says this is changing; unconfirmed).
- **Source:** https://docs.github.com/en/copilot/get-started/plans ; https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github ; https://docs.github.com/en/copilot/how-tos/copilot-on-github/chat-with-copilot/chat-in-github (checked 2026-11-19)

---

## Finding an organisation's repositories

**Prerequisites:** an account on the platform and membership (or a public organisation). A learner can only list what the platform shows to their account.

### Task: GitHub

- **Steps (as of 2026-11-19):** open the organisation's page (`github.com/<organisation>`); the tabs are _Overview_, _Repositories_, _Projects_, _Packages_, _People_, _Sponsoring_ (with a _More_ menu repeating them). Click _Repositories_. (Checked on the public `github` organisation.) Also `https://github.com/orgs/<organisation>/repositories`.
- **Access check:** private repositories appear in the list only if the signed-in account can see them. If an expected repository is missing, the learner either is not signed in to the right account or lacks access. Specific GitHub UI text for "no access" (such as a 404 page) was **not** verified.
- **Source:** https://github.com/orgs/github/repositories (checked 2026-11-19). The GitHub docs page I tried did not describe this tab.

### Task: GitLab

- **Steps:** in the top bar select _Search or go to_, find the group; the group overview page lists subgroups and projects. To see every group you belong to: _Search or go to_ → _View all my groups_. To browse public or internal groups: _Search or go to_ → _Explore_ → _Groups_.
- **Terminology:** GitLab calls repositories **projects** and organisations **groups**.
- **Source:** https://docs.gitlab.com/user/group/ (checked 2026-11-19)

### Task: Bitbucket (Cloud)

- **Steps (partly confirmed):** choose the workspace, then click _Repositories_ in the top navigation bar. The default order is by last activity.
- **Terminology:** Bitbucket Cloud calls the organisation a **workspace**.
- **Source:** Atlassian community answer and Atlassian KB via search (https://support.atlassian.com/bitbucket-cloud/kb/display-a-list-of-active-repositories/), checked 2026-11-19; the Atlassian doc page itself returned only a short notice. Treat the exact label as medium confidence.

### Task: Azure DevOps

- **Could not confirm the exact current menu labels.** My fetches of the relevant Microsoft Learn page failed (404), and the search did not return the page. What I know from search only: Azure DevOps has _Project Settings_ → _Repositories_ and the CLI command `az repos list`. See Could not confirm.

---

## Opening claims

### Task: GitHub codespace retention and idle timeout

- **Retention (confirmed):** codespaces are "automatically deleted after they have been stopped and have remained inactive for 30 days." Default is 30 days; the user can set 0 to 30 days in personal settings; an organisation's shorter period overrides it. The countdown starts when the codespace is **stopped** and resets when you connect again. If the period is longer than a day, GitHub emails one day before deletion.
- **Idle timeout (confirmed):** "By default this period is 30 minutes." Changeable from 5 to 240 minutes under GitHub settings → _Codespaces_ → _Default idle timeout_ (applies to codespaces created afterwards).
- **Fit with the outline:** the comic caption "This codespace has been deleted after 30 days" is accurate if shown as "stopped and inactive for 30 days". Strictly it is 30 days after stopping, not 30 days after creation or last use of the repository. The "stopped after 30 min idle" claim also holds.
- **Gotcha:** an organisation can shorten retention, so an employer-run codespace may vanish sooner.
- **Source:** https://docs.github.com/en/codespaces/setting-your-user-preferences/configuring-automatic-deletion-of-your-codespaces ; https://docs.github.com/en/codespaces/setting-your-user-preferences/setting-your-timeout-period-for-github-codespaces (checked 2026-11-19)

### Task: Claude desktop app, the Code tab

- **Name:** the **Code** tab, at the top of the app's sidebar. If the tabs show only icons, hover to see the name. The same sidebar also has Chat and Cowork tabs (Chat/Cowork named on Microsoft's page for Copilot; for Claude only the "Code" tab is confirmed here).
- **Plans:** "Claude Code requires a Pro, Max, Ultra, Team, or Enterprise subscription." On a free plan, clicking **Code** shows a prompt to upgrade. (An older bug report said Pro lacked access; the current docs say Pro is included.)
- **Platforms:** macOS (universal, Intel and Apple Silicon), Windows (x64 and ARM64), Linux (beta).
- **No terminal or Node.js needed:** "The desktop app includes Claude Code, so you don't need to install Node.js or the CLI to use the Code tab."
- **Steps to start on a local folder:** click **Code**; in the row under the prompt box, click the environment selector and choose the top entry in the **Local** group; then click the project folder control and choose **Open folder…**. Environment options also include **Cloud**, **SSH** and **WSL** (Windows).
- **Source:** https://code.claude.com/docs/en/desktop-quickstart (checked 2026-11-19)

### Task: Microsoft Copilot desktop app, the Code tab

- **It exists.** It is called the **Code** tab, "a separate tab in the Microsoft Copilot app, alongside Home" (the page also mentions Chat and Cowork tabs). It works on local files: the **Local** option runs "on your own device, in a project folder you choose". It also has a **Cloud** option.
- **Status:** **Frontier preview**. "You need to be part of the Frontier preview program to get early access." Preview features may change or never reach general availability.
- **Platforms:** Windows (x64 and Arm) and Mac (Intel and Apple silicon), in the Microsoft Copilot desktop app; web for cloud use; iOS, iPadOS and Android mobile apps for cloud sessions only (no local sessions on mobile). Sandbox requires Windows 11 24H2 or later (Windows 10 not supported); to use Git and Node.js in the Sandbox on Windows, a specific recent build is needed (build 26200.9550 or later on 25H2, or 28000.3086 or later on 26H1).
- **Accounts and plans:** work account needs a Microsoft Copilot licence with the **Code** tab enabled by the organisation; a personal Microsoft account needs "a supported Microsoft Copilot consumer plan" (which plans: not named on the page). Code is **usage-based billing** and "requires a spending policy to be configured".
- **Gotchas:** it asks approval before reaching outside the folder, making network connections or running terminal commands. First run on Windows downloads assets once.
- **Fit with the outline:** the outline lists it as a normal option next to Claude Code. It is a preview with limited availability, usage-billed and needs Frontier enrolment, so it is not a safe default for beginners. Recommend labelling it "preview" or dropping it from the early setup question.
- **Source:** https://learn.microsoft.com/copilot/code/overview and https://learn.microsoft.com/en-us/copilot/code/code-requirements (checked 2026-11-19; pages dated 2026-11-12 and 2026-11-16)

---

## Could not confirm

- **Whether ChatGPT, Claude or Microsoft Copilot (consumer) reads a public GitHub repository from a pasted link on a free plan, and whether any of them reads `.nvmrc` or `lab/docker-compose.yml`.** No vendor page says so. Test the Week 1 prompt on a free account of each (Kinga or Tamas), using the exact link, and write the result into the sheet. Until then, give every learner the paste-the-README fallback.
- **Which plans include ChatGPT's GitHub connector, and the Claude GitHub integration.** Neither article lists plans (OpenAI's page returned 403). Test or leave out of the cards.
- **Gemini plan availability for Import code.** The Help page lists requirements but not plans.
- **Copilot Free chat limits** (monthly chat or agent amounts, and the size of the AI-credit allowance). Look at the usage-based billing page for individuals before stating any number. Do not quote "50".
- **How Copilot Free users open chat about a repository today.** Docs give github.com/copilot and a repository selector, but not a repository-page button for the Free (old) experience. Test signed in with a free account on `productkind/twenty-pm-lab` and note the exact labels.
- **GitHub Mobile app: how files and the README show**, and how `.nvmrc` appears. Use the browser in the cards unless tested on a real phone.
- **Azure DevOps menu labels** for listing an organisation's repositories (my fetch failed). Check Microsoft Learn or a real organisation.
- **Bitbucket _Repositories_ label** is from an Atlassian community answer, not a docs page.
- **What GitHub, GitLab, Bitbucket and Azure DevOps show when the learner lacks access** (typically a not-found or permission page). Not verified; test with a private repository from a second account.
- **Which Microsoft Copilot consumer plans include the Code tab**, and whether Frontier enrolment is open to personal accounts.
- **Yarn version** in Twenty (not looked up; relevant for Week 3's run-list answer).

---

# Week 2 (toolbox and clone; becoming Week 1)

_Checked 2026-11-19. Scope: the "Week 2" part of the outline's Verification handoff. Where I quote a label from VS Code's own source code (the `microsoft/vscode` repository, `main` branch), I say so: that is what the product ships today, but I have not seen it on screen. Anything marked "from source" should be eyeballed once on a real machine before it goes in a card._

## Premise check (Week 2)

**Premise: "VS Code's _Source Control_ view tells you whether Git is installed, and offers to install it if it isn't" (Mac, without the terminal).**

**At risk, in two parts.**

1. **It tells you: yes. It installs it: no.** On a Mac with no Git, VS Code shows a message and a **link to a download page**, not Apple's installer. VS Code's code deliberately avoids triggering Apple's Command Line Tools dialog: it asks macOS whether the tools exist (`xcode-select -p`), and if they do not, it gives up and reports Git as missing rather than launching `/usr/bin/git`. The "Download Git for macOS" link opens git-scm.com, whose Mac page lists Homebrew, MacPorts and `xcode-select --install` (a terminal command), and says the old graphical installer is no longer linked. So there is **no documented no-terminal install route from VS Code**.
2. **Where Apple's dialog does appear:** the first time anything runs `git` (for example `git --version` in a terminal) on a Mac without the tools. Apple Community threads and other third-party pages report the text as _The "git" command requires the command line developer tools. Would you like to install the tools now?_ with an **Install** button. I found no Apple-published page for it (see Could not confirm). So the learner can still avoid typing a Git command by name only if the course asks them to open VS Code's terminal and type a single harmless command, which is a terminal step.

**Suggested reframe:** teach the Source Control view as the **check** ("if you see _Install Git, a popular source control system..._, Git is missing"), and the install as one pasted command, `xcode-select --install`, in VS Code's own terminal (_Terminal_ > _New Terminal_), then click **Install** in Apple's dialog. That is one line to paste, not Git commands. Cross-check with Week 4, where the course already asks for a terminal. If the course must stay terminal-free, the only documented alternative is Homebrew or MacPorts, which need the terminal too, so there is no terminal-free route to promise.

**Second premise change: "Sign in to GitHub in VS Code" is not needed to clone Twenty.** `productkind/twenty-pm-lab` is public. VS Code's docs say cloning a public repository by URL generally does not need signing in. Sign-in matters for the learner's own (private) repositories and for the _Clone from GitHub_ list. Suggest ordering the Twenty clone as _Clone from URL_ first, and sign-in as the step before the learner's own product.

**Third: Windows installs in a terminal whatever you do.** `wsl --install` is typed in PowerShell. No graphical route is documented for the first step.

---

## Git on Mac: https://code.visualstudio.com/docs/sourcecontrol/overview

**Prerequisites:** none. Git comes with Apple's Command Line Tools, which are free. Needs a network connection and the Mac's login password (not checked: the installer's own prompts).

### Task: Check whether Git is installed, from the Source Control view

- **Steps (as of 2026-11-19):**
  1. Open VS Code. Open the _Source Control_ view (the branch icon in the Activity Bar on the left, or _View_ > _Source Control_).
  2. With no Git on the Mac and no folder open, the view shows the welcome text **"Install Git, a popular source control system, to track code changes and collaborate with others."** followed by a link **"Download Git for macOS"**.
  3. With Git present, the same view (no folder open) shows **"In order to use Git features, you can open a folder containing a Git repository or clone from a URL."** and a button **"Clone Repository"**.
- **Exact labels (from VS Code source, `extensions/git/package.nls.json` and `package.json`):**
  - Missing, on a local Mac window: _Install Git, a popular source control system, to track code changes and collaborate with others._ then _Download Git for macOS_ (links to `https://git-scm.com/download/mac`).
  - Missing, in a connected remote window (for example WSL): only the _Install Git, a popular source control system..._ sentence, **without a download link**.
  - Present, nothing open: _In order to use Git features, you can open a folder containing a Git repository or clone from a URL._ with the _Clone Repository_ button.
- **A second place the missing-Git message appears:** a pop-up **"Git not found. Install it or configure it using the "git.path" setting."** with buttons **"Download Git"** and **"Don't Show Again"**. It only appears when the learner opens a folder that already contains a `.git` folder. "Download Git" opens `https://aka.ms/vscode-download-git` (same on every platform).
- **The _Clone Repository_ button is absent while Git is missing.** Its show condition includes the Git extension being initialised, so a missing Git hides it. A learner who cannot see _Clone Repository_ should be told that this means Git is missing.
- **Cost/credits:** free.
- **Gotchas:**
  - VS Code only looks for Git when it starts. After installing the Command Line Tools, **restart VS Code** (the quickstart says "restart VS Code after installing Git"; one search summary says this matters).
  - VS Code's own troubleshooting page, for "Git not found", says to run `git --version` in a terminal in the environment where the repository is open (for a remote window, the remote side).
  - Full Xcode installed but not set up, or a Mac update that leaves the tools broken, can make Git "missing" though it is installed (third-party reports only; `sudo xcode-select --reset` is the usual fix). Leave to the "stuck" card.
- **Source:** https://code.visualstudio.com/docs/sourcecontrol/troubleshooting ; https://code.visualstudio.com/docs/sourcecontrol/quickstart ; https://raw.githubusercontent.com/microsoft/vscode/main/extensions/git/package.nls.json ; https://raw.githubusercontent.com/microsoft/vscode/main/extensions/git/package.json ; https://raw.githubusercontent.com/microsoft/vscode/main/extensions/git/src/main.ts (all checked 2026-11-19)

### Task: Install Git on a Mac through Apple's Command Line Tools

- **Steps (as of 2026-11-19):**
  1. In VS Code choose _Terminal_ > _New Terminal_ (documented in the VS Code quickstart).
  2. Type `xcode-select --install` and press Enter. (git-scm.com: "Apple ships a binary package of Git with Xcode Command Line Tools. You can install this via: `$ xcode-select --install`".)
  3. A separate installer window appears and may open behind other windows. Click **Install** and agree to the licence. (mac.install.guide.)
  4. When it finishes, restart VS Code. The _Source Control_ view should no longer show _Install Git_.
- **Apple dialog text (third-party, not Apple):** _The "git" command requires the command line developer tools. Would you like to install the tools now?_ Appears when `git` is run first. Button names vary by macOS version in reports (_Install_; older reports mention _Get Xcode_). Not verified on macOS 26.
- **Cost/credits:** free. The tools are a large download (size not confirmed).
- **Gotchas:** one search summary reports the installer can stall if nobody is logged in to the desktop (not relevant to learners on their own laptop). Some tools (a report involving the Claude desktop app, March 2026, on eclecticlight.co) can run `git` in the background and bring the dialog up unprompted, so a learner who has the Claude app may already have seen it.
- **Source:** https://git-scm.com/install/mac ; https://mac.install.guide/commandlinetools/install-requested (checked 2026-11-19); the dialog text from https://discussions.apple.com/thread/255165851 (search result, not fetched)

### Task: Check Git is there afterwards (Mac)

- **No-terminal check:** the _Source Control_ view no longer shows _Install Git, a popular source control system..._ and, with no folder open, shows the _Clone Repository_ button (after restarting VS Code).
- **Terminal check (documented):** _Terminal_ > _New Terminal_, then `git --version`. VS Code's quickstart says you "should see a Git version number". `xcode-select -p` should print `/Library/Developer/CommandLineTools` (mac.install.guide).
- **Source:** https://code.visualstudio.com/docs/sourcecontrol/quickstart ; https://mac.install.guide/commandlinetools/install-requested (checked 2026-11-19)

---

## Visual Studio Code: https://code.visualstudio.com/docs/setup/mac and https://code.visualstudio.com/docs/setup/windows

**Prerequisites:** none. Free. No account needed to install.

### Task: Install VS Code on a Mac

- **Steps (as of 2026-11-19):**
  1. Download the macOS build from the Download page (Universal, Intel and Apple silicon builds exist; Universal covers both).
  2. Open the downloaded `.dmg` file.
  3. Drag **Visual Studio Code.app** into the **Applications** folder.
  4. Open VS Code from **Applications** by double-clicking it.
  5. Optional: Control-click the Dock icon, then _Options_ > _Keep in Dock_.
- **Exact labels:** _Visual Studio Code.app_, _Applications_, _Options_, _Keep in Dock_.
- **Cost/credits:** free.
- **Gotchas:** no minimum macOS version is stated on the page. VS Code releases weekly and auto-updates by default. If it will not update, macOS may have quarantined it (the page links an issue). The first run may show a macOS "downloaded from the internet" prompt: not covered by the docs, so not verified.
- **Source:** https://code.visualstudio.com/docs/setup/mac (checked 2026-11-19)

### Task: Install VS Code on Windows

- **Two installers:**
  - **User setup:** the page calls it "the recommended installation for most people" because it **needs no administrator permissions**. Installs to `C:\Users\{Username}\AppData\Local\Programs\Microsoft VS Code`. Best update experience. Note: updates are disabled if a User setup install is run as Administrator.
  - **System setup:** **needs administrator permissions**, installs under `Program Files` for all users. In-product updates also need elevation.
  - A ZIP archive exists but must be updated by hand.
- **Fit with the outline:** the Windows path needs admin rights anyway for WSL, but the VS Code step itself can be done without it. On a locked laptop, VS Code (User setup) may be the one thing that works. Tell learners to pick the **User** installer.
- **"Add to PATH":** the WSL extension page says to install VS Code on the Windows side and "check the Add to PATH option during setup so the `code` command works in WSL". I did not confirm the installer's own page labels or whether it is ticked by default, so tell learners to leave it ticked.
- **Source:** https://code.visualstudio.com/docs/setup/windows ; https://code.visualstudio.com/docs/remote/wsl (checked 2026-11-19)

---

## WSL with Ubuntu: https://learn.microsoft.com/en-us/windows/wsl/install

**Prerequisites:** Windows 10 version 2004 and higher (Build 19041 and higher) or Windows 11 (Microsoft Learn). Ubuntu's own page says "Windows 11 (recommended) or Windows 10 version 21H2 or later, on a physical machine", with virtualisation enabled. WSL 2 works on Home editions: "WSL 2 is available on all Desktop SKUs where WSL is available, including Windows 10 Home and Windows 11 Home" (Microsoft FAQ). Free.

### Task: Install WSL with Ubuntu

- **Steps (as of 2026-11-19):**
  1. Open PowerShell **in administrator mode** ("by right-clicking and selecting 'Run as administrator'", Microsoft Learn install page). (Microsoft's "Set up a WSL development environment" page says only "Open PowerShell (or Windows Command Prompt)" and Ubuntu's page says "You may be asked to grant permission". Treat admin as required.)
  2. Enter `wsl --install`.
  3. **Restart the computer.** Microsoft Learn: "then restart your machine"; the setup page says "You will need to restart your machine during this installation process." Ubuntu's page says a reboot is not always needed if WSL components are already enabled.
  4. Open **Ubuntu** from the Start menu. The first launch shows a window asking you to wait while files are decompressed ("All future launches should take less than a second").
- **What `wsl --install` does (Microsoft):** enables the optional WSL and Virtual Machine Platform components, installs the latest Linux kernel, sets WSL 2 as the default, and installs Ubuntu (reboot may be required).
- **Default distribution today:** Ubuntu, and Microsoft's distribution list (`microsoft/WSL`, `distributions/DistributionInfo.json`) currently points the default "Ubuntu" at **Ubuntu 26.04 LTS** (release 26.04.1). Ubuntu 24.04 LTS remains available as `Ubuntu-24.04`. Checked 2026-11-19.
- **Exact labels:** the command `wsl --install`; the Start menu entry _Ubuntu_.
- **Cost/credits:** free.
- **Gotchas:**
  - **Admin rights and restart are real**, so an employer's laptop may block it. Microsoft documents `Error: 0x800704ec This program is blocked by group policy. For more information, contact your system administrator.` (fix: run `wsl --update`, then contact the administrator). Business firewalls with local rule merging set to "No" can also block WSL networking (admin must add a rule).
  - **Virtualisation off in BIOS:** errors `0x80070003` or `0x80370102`. The page says: "Please enable the Virtual Machine Platform Windows feature and ensure virtualization is enabled in the BIOS", and "instructions on how to do this will vary from computer to computer, and will most likely be under CPU related options". Microsoft's help: https://support.microsoft.com/windows/c5578302-6e43-4b4b-a449-8ced115f58e1 ("Enable virtualization on Windows"), linked from the troubleshooting page.
  - If `wsl --install` shows the WSL help text instead of installing, it means WSL is already present: run `wsl --list --online` then `wsl --install -d <DistroName>`. If it hangs at 0.0%, run `wsl --install --web-download -d <DistroName>`.
  - Windows does not update Ubuntu's packages automatically.
  - Third-party virtualisation apps may conflict (FAQ); modern VirtualBox and VMware are said to be compatible.
  - Running Windows itself inside a virtual machine needs nested virtualisation turned on by the host.
- **Source:** https://learn.microsoft.com/en-us/windows/wsl/install ; https://learn.microsoft.com/en-us/windows/wsl/setup/environment ; https://learn.microsoft.com/en-us/windows/wsl/troubleshooting ; https://learn.microsoft.com/en-us/windows/wsl/faq ; https://ubuntu.com/wsl/docs/latest/howto/install-ubuntu-wsl2/ ; https://raw.githubusercontent.com/microsoft/WSL/master/distributions/DistributionInfo.json (checked 2026-11-19)

### Task: First run, create the Ubuntu username and password

- **Steps (as of 2026-11-19):** open Ubuntu from the Start menu; "You will be asked to create a **User Name** and **Password** for your Linux distribution" (Microsoft Learn). Enter both.
- **Exact labels:** Microsoft's text says _User Name_ and _Password_; its screenshot caption is "Ubuntu command line enter UNIX username". The literal terminal prompts (commonly _Enter new UNIX username:_) are **not quoted in any page I could read**, so do not put them in a card as exact.
- **Gotchas:**
  - Typing the password shows **nothing on screen** ("blind typing", Microsoft calls it "completely normal"). This is the single most likely thing to scare a beginner.
  - The Linux username and password are separate from the Windows ones and "specific to each separate Linux distribution".
  - The account becomes the default user and can run `sudo`; the password is needed for `sudo`. Tell learners to write it down. Reset: open Ubuntu and run `passwd`, or from PowerShell `wsl -u root` then `passwd <username>`.
  - A username error is possible with disallowed characters (Microsoft links an explainer). Suggest lowercase letters only.
  - Ubuntu's page says the install "also starts an Ubuntu session and logs you in" and does not describe prompts for language or Ubuntu Pro. I could not confirm whether Ubuntu 26.04's first run adds extra screens (see Could not confirm).
- **Source:** https://learn.microsoft.com/en-us/windows/wsl/setup/environment ; https://ubuntu.com/wsl/docs/latest/howto/install-ubuntu-wsl2/ (checked 2026-11-19)

### Task: Does Ubuntu in WSL ship with Git?

- **Yes, confirmed from Ubuntu's own image manifests (checked 2026-11-19):**
  - Ubuntu 26.04.1 WSL image (`ubuntu-26.04.1-wsl-amd64.manifest` on releases.ubuntu.com): `git 1:2.53.0-1ubuntu1`.
  - Ubuntu 24.04 WSL image (`ubuntu-noble-wsl-amd64-wsl.manifest` on cloud-images.ubuntu.com): `git 1:2.43.0-1ubuntu7.2`.
  - Microsoft says "Git comes already installed with most of the Windows Subsystem for Linux distributions, however, you may want to update to the latest version."
- **So the course does not need an "install Git in Ubuntu" step.** The outline's "Git inside Ubuntu, not Git for Windows" holds. If a learner's Source Control view in a WSL window ever says Git is missing, the fix is `sudo apt-get install git` in Ubuntu (Microsoft's documented command).
- **Gotcha:** Git needs to exist on each file system separately: Git for Windows is **not** seen from Ubuntu (Microsoft: "You will need to install Git on each file system that you intend to use it with").
- **Gotcha:** `git config --global user.name` and `user.email` are not set on a new Ubuntu. Cloning does not need them. Committing does (Week 4's "make a change" does not commit, so fine).
- **Source:** https://releases.ubuntu.com/26.04.1/ubuntu-26.04.1-wsl-amd64.manifest ; https://cloud-images.ubuntu.com/wsl/noble/current/ubuntu-noble-wsl-amd64-wsl.manifest ; https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-git (checked 2026-11-19)

---

## VS Code WSL extension: https://code.visualstudio.com/docs/remote/wsl

**Prerequisites:** WSL with a distribution installed; VS Code installed on the **Windows** side (not inside Ubuntu); the extension. Free.

### Task: Install the WSL extension and connect VS Code to WSL

- **Extension name (as the docs give it):** **"WSL"** by Microsoft, shown in the page as "Visual Studio Code WSL", marketplace ID `ms-vscode-remote.remote-wsl`. Tell learners to search `WSL` in the Extensions view and check the ID/publisher. (I did not see the marketplace page itself, so the exact listing title is from the docs only.) The Remote Development extension pack is optional.
- **Steps (as of 2026-11-19):**
  1. Install the extension from the Marketplace (Extensions view, search `WSL`, check `ms-vscode-remote.remote-wsl`, _Install_).
  2. Press **F1** (or open the Command Palette) and run **"WSL: Connect to WSL"** (connects to the default distribution) or **"WSL: Connect to WSL using Distro"** (a specific one).
  3. A new VS Code window opens. A **WSL indicator** shows in the **bottom-left corner** of the status bar, for example **"WSL: Ubuntu"**.
  4. Use _File_ > _Open Folder_ to open a folder. The dialog browses the **Linux** file system (Microsoft's tutorial: "a minimal navigator for the Linux file system, not the Windows file system"; _Show Local_ switches to the Windows dialog).
  5. If a folder is already open locally: **"WSL: Reopen Folder in WSL"**. Back to Windows: **"WSL: Reopen in Windows"**.
- **Exact labels:** _WSL: Connect to WSL_, _WSL: Connect to WSL using Distro_, _WSL: Reopen Folder in WSL_, _WSL: Reopen in Windows_, the bottom-left indicator _WSL: Ubuntu_.
- **A terminal alternative (documented):** in Ubuntu, `cd` to the folder and run `code .`. The first run downloads the "VS Code Server" components. Needs "Add to PATH" ticked at VS Code install.
- **Labels I did not find in docs:** the exact items in the menu that opens when you click the bottom-left indicator (it is the Remote menu; it likely offers "Connect to WSL", but I could not confirm the text), and the label "Open Folder in WSL" (not on the page; the page names "WSL: Reopen Folder in WSL"). Do not use either in a card until checked.
- **Gotchas:** the first connection installs a server into Ubuntu, so a short wait. On Debian/Ubuntu the server may need `wget` and `ca-certificates` (the docs say so; a fresh Ubuntu is not stated to lack them, so mention only if the connection fails).
- **Source:** https://code.visualstudio.com/docs/remote/wsl ; https://code.visualstudio.com/docs/remote/wsl-tutorial (checked 2026-11-19)

---

## Signing in to GitHub in VS Code: https://code.visualstudio.com/docs/sourcecontrol/github

**Prerequisites:** a GitHub account (free). **Not needed to clone a public repository by URL**, per VS Code's docs ("Cloning a public repository by URL generally doesn't require signing in").

### Task: Sign in to GitHub

- **Documented routes (as of 2026-11-19):**
  1. **No menu needed for Git:** "VS Code prompts you to sign in when you clone a private repository or push to a GitHub repository", then "Follow the browser prompts, then return to VS Code."
  2. **Accounts menu:** the **Accounts** menu in the Activity Bar (the person icon, bottom-left of the left bar). VS Code's Copilot setup page names the entry **"Sign in with GitHub to use GitHub Copilot"**, and the menu also has **"Sign out"** and **"Manage Extension Account Preferences"**. That label signs in for Copilot; it is the same GitHub sign-in the Git features use, but I did not see a page that says the two share a session, so do not claim it.
  3. **GitHub Pull Requests and Issues extension:** the GitHub icon in the Activity Bar, then **Sign In**. Not needed for this course.
- **Labels I could not confirm:** an Accounts-menu item for GitHub that is not about Copilot (for example "Sign in to Sync Settings" or "Backup and Sync Settings"). A VS Code docs page for it returned 404.
- **If the browser does not hand back to VS Code:** copy the token from the browser, select **"Signing in to github.com..."** in the status bar, paste it and press Enter (VS Code docs).
- **Gotchas:** signing in does not give write access to other people's repositories (VS Code docs): to push to a project you cannot write to, fork it. GitHub Enterprise Server supports a personal access token (docs).
- **Source:** https://code.visualstudio.com/docs/sourcecontrol/github ; https://code.visualstudio.com/docs/copilot/setup (checked 2026-11-19)

### Task: Authentication for a clone made inside WSL

- **What the docs say:**
  - VS Code's WSL page: you "can avoid passwords by configuring WSL to use the Windows Git credential manager" (a manual setup).
  - VS Code's remote troubleshooting page: share a credential helper by setting `credential.helper` to `wincred` on Windows, and pointing WSL's `credential.helper` at `/mnt/c/Program Files/Git/mingw64/bin/git-credential-manager.exe`. "This does not apply to using SSH keys."
  - Microsoft's WSL Git tutorial: Git Credential Manager (GCM) is included with **Git for Windows**; "It is recommended to install the latest Git for Windows in order to share credentials & settings between WSL and the Windows host." If you do not install Git for Windows, GCM would run as a Linux app and "cannot utilize the authentication or credential storage features of the host Windows operating system". GCM only works with HTTP(S) remotes, not SSH.
- **What I could NOT confirm:** whether VS Code's own GitHub sign-in is **automatically forwarded** into a WSL window for Git operations. No VS Code or Microsoft page I could read states it either way. Evidence that points to "yes, it works without GCM": the GitHub extension has a setting `github.gitAuthentication` ("Controls whether to enable automatic GitHub authentication for git commands within VS Code", default on), and one GitHub community post reports that **Git: Clone** from the Command Palette in WSL worked with no credential helper. That is not enough to promise it.
- **Impact on the outline:** for the **public** Twenty repository the question does not arise (no sign-in needed). It arises for the learner's **private** employer repository cloned inside WSL. The outline's "Git inside Ubuntu, not Git for Windows" cannot be confirmed to cover private clones without a test. **Recommend:** test once on a real Windows laptop with Ubuntu on WSL, a private repository, and no Git for Windows installed. Until then, the safe wording is "VS Code will ask you to sign in in the browser; if it does not, ask for help".
- **Source:** https://code.visualstudio.com/docs/remote/wsl ; https://code.visualstudio.com/docs/remote/troubleshooting ; https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-git ; https://raw.githubusercontent.com/microsoft/vscode/main/extensions/github/package.nls.json (checked 2026-11-19)

---

## Cloning from VS Code: https://code.visualstudio.com/docs/sourcecontrol/repos-remotes

**Prerequisites:** Git installed (on Mac, the Command Line Tools; in WSL, preinstalled). A public repository needs no sign-in. "Cloning doesn't grant write permission."

### Task: Clone a repository (Mac, and in a WSL window)

- **Steps (as of 2026-11-19):**
  1. With **no folder open**, open the _Source Control_ view and click **Clone Repository**. (Or run **Git: Clone** from the Command Palette. VS Code docs: "select the 'Clone Repository' button in the Source Control view", shown when no folder is open.) The Explorer view with no folder open also has a _Clone Repository_ button (its text: **"You can clone a repository locally."**).
  2. A picker opens with the options **"Clone from GitHub"** and **"Clone from URL"** (the source builds the first as "Clone from {provider name}", so the GitHub one reads _Clone from GitHub_). Choose **Clone from URL** and paste `https://github.com/productkind/twenty-pm-lab`, or choose **Clone from GitHub**, sign in if asked, and pick the repository from the list.
  3. A folder picker titled **"Choose a folder to clone {repository name} into"** opens. Pick the destination folder (the parent, for example `Products`), then click **"Select as Repository Destination"**. A new folder named after the repository is made inside it.
  4. A progress notification reads **"Cloning git repository "{name}"..."**.
  5. When it finishes, a prompt asks **"Would you like to open the repository?"** with buttons **"Open"** and **"Open in New Window"** (and **"Add to Workspace"**, which the source pairs with a variant of the prompt that reads **"Would you like to open the repository, or add it to the current workspace?"** when a folder is already open).
- **Correction to the outline/brief:** the prompt is **"Would you like to open the repository?"**, not "...the cloned repository?". Both come from VS Code's source, and the docs page says only "VS Code offers to open the cloned repository in a new window" without wording.
- **Setting that changes this:** `git.openAfterClone` ("Controls whether to open a repository automatically after cloning") has options for always current window, always new window, only when no folder is open, and always prompt. The default (prompt) shows the buttons above; I did not confirm which is the default value, so check on a real install.
- **Exact labels:** _Clone Repository_, _Clone from GitHub_, _Clone from URL_, _Choose a folder to clone {name} into_, _Select as Repository Destination_, _Would you like to open the repository?_, _Open_, _Open in New Window_, _Add to Workspace_. (All except _Clone Repository_ and the two source names come from `cloneManager.ts`.)
- **In a WSL window:** the same command (**Git: Clone** or _Clone Repository_) runs on the Linux side, so the folder picker should browse the Linux file system and the clone should land in Ubuntu. I could not find a page that describes the WSL-window flow or its folder picker, and the single community report I found is the only evidence it works. Treat the "in WSL" labels as the same as above, unverified on screen.
- **If the repository was already cloned:** the picker offers **"Open Existing Repository Clone"** with options **"Workspace: {0}"** and **"Clone again"** (source).
- **Cost/credits:** free.
- **Gotchas:**
  - The _Clone Repository_ button only shows when **no folder is open** and Git is present. A learner with a folder already open will not see it and should use **Git: Clone** in the Command Palette (Cmd+Shift+P on Mac, Ctrl+Shift+P on Windows).
  - Do not let learners clone **into** an existing Git repository: not checked, but VS Code asks for a parent folder, so cloning `twenty-pm-lab` into `Products` makes `Products/twenty-pm-lab`.
  - The Twenty repository is large: the clone takes some time (size not measured). Not verified; measure on a real connection.
- **Source:** https://code.visualstudio.com/docs/sourcecontrol/repos-remotes ; https://code.visualstudio.com/docs/sourcecontrol/github ; https://raw.githubusercontent.com/microsoft/vscode/main/extensions/git/src/cloneManager.ts ; https://raw.githubusercontent.com/microsoft/vscode/main/extensions/git/package.nls.json (checked 2026-11-19)

### Task: Clone in Cursor

- **Could not confirm from Cursor's own docs.** Cursor's current docs that came up are about **Cursor Origin**, Cursor's own Git hosting (`cursor.com/docs/origin/git`), not about cloning from GitHub in the editor. Third-party sources say to click **"+ Clone Repository"** in the Source Control panel, or run **Git: Clone** from the Command Palette, paste the URL and choose a folder.
- **Reasoning, not a confirmed fact:** Cursor is a fork of VS Code and ships VS Code's Git extension, so the flow is likely the same as above. The Cursor docs do not confirm label differences.
- **Recommendation:** say "Cursor works the same way (it is built on VS Code)" only after checking one clone on a real Cursor install. Until then, give the Command Palette route (**Git: Clone**) as the common denominator.
- **Source:** https://cursor.com/docs/origin/git (a different feature); no first-party clone page found (checked 2026-11-19)

---

## GitHub: Clone vs "Download ZIP"

**Prerequisites:** none for a public repository.

### Task: Tell the Code button's options apart

- **Steps (as of 2026-11-19):** on the repository's main page, above the list of files, click **Code**. GitHub's documentation names: **HTTPS** (copy the URL), **SSH**, **GitHub CLI** (`gh repo clone`), **Open with GitHub Desktop**, and **Download ZIP**. The download page's steps: "Above the list of files, click **Code**. Click **Download ZIP**."
- **What a ZIP lacks:** GitHub: "Snapshots don't contain the entire repository history. To get the full history, you need to clone the repository." So a ZIP has **no history**. The outline's second claim, "can't receive updates", follows (no Git data to fetch from) but **GitHub's page does not say it**: it is an inference. Phrase it as "it has no history to update from".
- **What I did not find:** a documented "Open with Visual Studio Code" item in the Code dropdown. The Code menu also shows a _Codespaces_ tab on the live site (which the learner knows from the workshop), but the clone docs page does not name _Local_ or _Codespaces_ tabs, so I did not confirm those labels.
- **Source:** https://docs.github.com/en/repositories/working-with-files/using-files/downloading-source-code-archives ; https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository (checked 2026-11-19)

---

## Creating `~/Products` in the Linux home, and why not `/mnt/c`

### Task: Make the products folder from VS Code connected to WSL, without typing

- **Steps (as of 2026-11-19), partly from source, not seen on screen:**
  1. Connect to WSL (see above): the bottom-left indicator shows _WSL: Ubuntu_.
  2. _File_ > _Open Folder_. In a WSL window the dialog browses the Linux file system and (as far as I can tell) starts in the user's home folder, `/home/<username>`. Open it.
  3. In the _Explorer_ view, use the **New Folder...** button (in VS Code's source the label is `New Folder...`; the empty Explorer's own welcome button is **Open Folder**). Name the folder `Products`.
  4. Then use that folder as the **destination** in the clone step (_Select as Repository Destination_).
- **Where it is in the Windows world:** `~` is `/home/<username>`, and from Windows Explorer it is `\\wsl$\Ubuntu\home\<username>` (Microsoft). Microsoft's own example for project files is `\\wsl$\<DistroName>\home\<UserName>\Project`.
- **The documented terminal alternative:** Microsoft's VS Code tutorial creates folders in a WSL terminal with `mkdir helloWorld && cd helloWorld` then `code .`. The tutorial does **not** show creating a folder from VS Code's UI, so the no-terminal route above is my inference from the labels. If the Linux-side _Open Folder_ dialog cannot create folders, the fallback is `mkdir Products` in a terminal.
- **Does the folder dialog let you make a folder?** Not confirmed. The Clone folder picker is a Linux-side picker whose options I could not see. Test it. If the picker has a "create folder" button, the learner can make `Products` there in one step.
- **Mac equivalent:** make `Products` in Finder (_File_ > _New Folder_) in the home folder, or use the same _New Folder..._ route after opening the home folder in VS Code. I did not check Finder labels.

### Task: Why `/mnt/c` is slow (Microsoft's guidance)

- **Microsoft's words (Working across file systems):** "We recommend against working across operating systems with your files, unless you have a specific reason for doing so. For the fastest performance speed, store your files in the WSL file system if you are working in a Linux command line (Ubuntu, OpenSUSE, etc)." Use `/home/<user name>/Project`, "Not the Windows file system root directory: `/mnt/c/Users/<user name>/Project$` or `C:\Users\<user name>\Project`".
- **And:** "It is possible to store your project files on a mounted drive, but your performance speed will improve if you store them directly on the `\\wsl$` drive." The Microsoft pages say performance suffers across the boundary ("may significantly slow down performance") but **do not give the technical reason**. Do not state one as Microsoft's. Say only what Microsoft says: Linux tools run faster on files stored on the Linux side.
- **Also:** `/mnt/c` is "your C: drive mounted in Linux"; files there are "controlled by Windows" and follow Windows permissions and case rules (Microsoft FAQ), which can break tools expecting Linux behaviour. Line-ending trouble (many files shown as modified) is documented for repositories used from both sides.
- **Source:** https://learn.microsoft.com/en-us/windows/wsl/filesystems ; https://learn.microsoft.com/en-us/windows/wsl/setup/environment ; https://learn.microsoft.com/en-us/windows/wsl/faq ; https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-git ; https://code.visualstudio.com/docs/remote/wsl-tutorial ; https://raw.githubusercontent.com/microsoft/vscode/main/src/vs/workbench/contrib/files/browser/fileConstants.ts (checked 2026-11-19)

---

## Twenty's repository structure: https://github.com/productkind/twenty-pm-lab/tree/main/packages

**Prerequisites:** none, public.

### Task: One repository or several (the Twenty example)

- **Confirmed:** `packages/` exists at the top level of `productkind/twenty-pm-lab` (GitHub API listing, checked 2026-11-19). It holds 21 folders:
  - **Main app:** `twenty-front` (the frontend), `twenty-server` (the backend), `twenty-ui` (shared interface components), `twenty-shared` (code used by both sides), `twenty-emails` (email templates).
  - **Tools and extras:** `twenty-sdk`, `twenty-cli`, `twenty-client-sdk`, `twenty-apps`, `create-twenty-app`, `twenty-zapier`, `twenty-companion`, `twenty-front-component-renderer`.
  - **Everything else:** `twenty-website`, `twenty-docs`, `twenty-docker`, `twenty-e2e-testing`, `twenty-utils`, `twenty-oxlint-rules`, `twenty-agent-skills`, `twenty-claude-skills`.
- **Root `package.json` has a `workspaces.packages` list** naming packages such as `packages/twenty-front`, `packages/twenty-server`, `packages/twenty-emails`, `packages/twenty-ui`, `packages/twenty-shared`, `packages/twenty-sdk`. (I read the first 13 entries; the list continues.) So Twenty is a **monorepo using Yarn workspaces**, with `nx.json` also at the root.
- **Fit with the outline:** "Twenty keeps everything in one, with a `packages` folder (frontend, server and more)" **holds**. Use the real names `twenty-front` and `twenty-server`. Note `twenty-docker` is a package folder too (a distinct thing from `lab/docker-compose.yml` that Week 1 uses).
- **Source:** https://api.github.com/repos/productkind/twenty-pm-lab/contents/packages ; https://raw.githubusercontent.com/productkind/twenty-pm-lab/main/package.json (checked 2026-11-19)

---

## Could not confirm (Week 2)

- **Whether any no-terminal route installs Git on a Mac from VS Code.** None is documented; VS Code's link goes to git-scm.com, which recommends Homebrew, MacPorts or `xcode-select --install`. Apple's "Set Up Your Mac for the Command Line" app was mentioned by one third-party page (mac.install.guide) as installing the tools without typing; I did not verify it exists or its current name. Test on a Mac with no Command Line Tools if the course must stay terminal-free.
- **Apple's dialog text and buttons on current macOS** (26.x). Only community-reported text. Eyeball once on a clean Mac or macOS VM.
- **Whether VS Code's own GitHub sign-in is forwarded to Git inside a WSL window** (needed for private clones). Test on Windows with Ubuntu on WSL and no Git for Windows.
- **The Ubuntu first-run prompt text** and whether Ubuntu 26.04's first run adds screens (language, Ubuntu Pro). Test on a real Windows machine.
- **The bottom-left indicator's menu item names** and the exact _Open Folder_ and folder-picker behaviour (home folder default, whether it can create a folder) in a WSL window.
- **The "Clone Repository" flow while connected to WSL**, including the folder-picker labels. Only the source and one community report back it.
- **The Cursor clone flow** from Cursor's own docs.
- **Whether `git.openAfterClone` defaults to "prompt"**, so the "Would you like to open the repository?" prompt appears for every learner.
- **Whether the VS Code Windows installer has "Add to PATH" ticked by default** and its exact labels.
- **Whether the GitHub Code dropdown still has "Open with Visual Studio Code"** (not named in GitHub's docs), and the _Local_ / _Codespaces_ tab labels.
- **Size and time of the Twenty clone** (not measured).
- **Whether `wsl --install` truly needs admin rights.** Microsoft's two pages disagree (one says administrator mode, the other just "Open PowerShell"); Ubuntu says "you may be asked to grant permission". Treat as needed.
- **The "Accounts" menu non-Copilot GitHub sign-in label** in the current VS Code.

---

## Added by the tool-accuracy critic (2026-11-19)

- **GitHub Copilot Free (plans page):** "Copilot Chat skills in IDEs" are not on Free; Free has 2,000 completions a month, auto model selection only, and an AI-credit allowance with no amount stated; agents are listed as "Limited" for Free (scope not read). Week 2 must test Copilot Free's agent mode and limits on a clean account before promising it. Source: https://docs.github.com/en/copilot/get-started/plans
- **Cursor and WSL (forum reports, not official docs):** Cursor ships its own `anysphere.remote-wsl`; Microsoft's `ms-vscode-remote.remote-wsl` reportedly doesn't work in Cursor, and Cursor's agent window reportedly has no WSL support. Decision: Week 1 is VS Code only. Source: https://forum.cursor.com/t/cursor-3-extension-wsl-is-required-to-open-the-remote-window/156531/31
- **Private clones on GitLab, Bitbucket, Azure DevOps over HTTPS:** likely need an access token or app password rather than the account password (unconfirmed by docs). The course routes learners to their engineering lead for the clone link and sign-in.
- **Pop-ups on opening the Twenty clone:** the repository has `.devcontainer` and `.vscode`, so VS Code will likely show Workspace Trust, a "reopen in container" offer and recommended extensions. Not seen on screen; test.
