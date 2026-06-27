# Tool facts: vibe-coding-github-00
_Checked 2026-06-27. Verify again if generating more than ~2 weeks later._

Course taught: "Save Lovable Credits: Edit Your App in VS Code". Learner connects a Lovable app to GitHub, installs VS Code + Node.js + Git on their own computer, clones and runs the app locally, edits copy and icons by hand, makes bigger changes with GitHub Copilot, and commits/pushes back so Lovable picks up the changes.

Many load-bearing facts were verified twice: against the vendor's current docs, and against a real Lovable repo on this machine (`kingamagyar/book-club-pick`, cloned at `/Users/kingamagyar/Projects/book-club-pick`). Where the live repo confirms something, I say so, because the running project is the strongest evidence for what the learner will actually see.

## Premise check

**Premise:** "A change you make by hand in your own code (copy, icon, small UI) and save costs no Lovable credits; asking Lovable's AI to make it does. So editing locally and pushing back saves credits."

**Holds.** Editing files locally and pushing them to GitHub does not invoke Lovable's AI, so it does not spend message credits. Lovable's GitHub integration is bidirectional and free on all plans, and changes pushed to the default branch sync back into Lovable. The credit-saving angle is sound.

**One honest caveat the writer should keep visible (not a premise-breaker):** Lovable's *Visual Edits* feature can already change copy and some styling without spending message credits too. So "save credits" is not unique to the local route. The course's real differentiators over Visual Edits are reliability and capability (Visual Edits is slow/unreliable and cannot do the bigger Copilot-assisted changes), plus the local setup being a real on-ramp to AI agents. The outline already leans on "more reliable / real builder setup", which is the right framing. Do not claim local editing is the *only* free way to change copy.

---

## Lovable: https://docs.lovable.dev/integrations/github
**Prerequisites:** A Lovable account with a project, and a GitHub account. GitHub.com integration is "available on all plans" (free). Lovable manages the GitHub App installation for you.

### Task: Connect a Lovable project to GitHub (one-time)
- **Steps (as of 2026-06-27):**
  1. Open *Project settings → Git → GitHub* (the docs also list the *+ (plus) menu in the chat* as an entry point).
  2. Under the *Accounts* section, click *Connect* next to the workspace/GitHub account you want.
  3. Authorise the Lovable GitHub App in the GitHub window that opens. Lovable "automatically detects the installation and adds it as a reusable workspace connection" and creates the repository for you.
- **Exact labels:** *Project settings → Git → GitHub*, then *Connect* (not "Link" or "Add repo"). Note: a search-result snippet and an older note phrase the path as *Workspace settings → Git → GitHub → Add connection*; the integrations doc page itself shows *Project settings → Git → GitHub* then *Connect*. Treat the doc page wording as primary, but expect the exact button to vary slightly by whether a workspace connection already exists. The writer should screenshot the live flow when generating (this is a place beginners get stuck on a wrong label).
- **Cost/credits:** Free. The connection itself does not spend message credits.
- **Gotchas:**
  - Lovable creates the repo automatically; there is no separate "Create repository" button to hunt for.
  - The synced branch is "the repository's default branch (usually main)". Confirmed on the live repo: default branch is `main`.
  - **Repo privacy:** the docs page does not state a default. The live demo repo `kingamagyar/book-club-pick` is **private** (`isPrivate: true`), which is why cloning later needs a sign-in. The writer should say "Lovable repos are usually private" rather than "always private", since the doc does not guarantee it.
- **Source:** https://docs.lovable.dev/integrations/github (checked 2026-06-27)

### Task: Get changes from your computer back into Lovable, and go live
- **Steps (as of 2026-06-27):** Push to the repo's default branch from your computer; "changes pushed to the active GitHub branch sync back into Lovable." To make the change live on the published app, press *Publish* in Lovable.
- **Cost/credits:** Free. Pushing/syncing does not spend message credits.
- **Gotchas:**
  - Sync is "automatic" per the docs; the docs do not state a speed. The prior hands-on note observed it within seconds on the default branch. The writer can say "within a moment / a minute" but should not promise an exact number.
  - Sync (code appears in Lovable) and *Publish* (live app updates) are two different things. The course's "synced but not yet live" quiz is correct.
  - **Revert:** in Lovable's chat, scroll to the version before the change and use its revert option (product behaviour, not separately re-verified against docs today).
- **Source:** https://docs.lovable.dev/integrations/github (checked 2026-06-27)

---

## Node.js: https://nodejs.org/en/download
**Prerequisites:** None. Free download. Installing Node.js also installs **npm** (bundled by default).

### Task: Install Node.js (gives the learner npm and the ability to run the app)
- **Steps (as of 2026-06-27):** Download the LTS installer from nodejs.org and run it. macOS gets a `.pkg` installer, Windows gets a `.msi` installer (the download page auto-detects the platform; when fetched without a browser it showed the generic `.gz`, but the real page serves `.pkg`/`.msi`).
- **Current version:** LTS is **v24.18.0** as shown on the download page today. Teach "the LTS version" rather than hard-coding the number, since it rolls forward.
- **Cost/credits:** Free.
- **Gotchas:** Install Node first; npm comes with it, so there is no separate npm install. After installing, the learner should open a *fresh* terminal so it picks up the new tool.
- **Source:** https://nodejs.org/en/download (checked 2026-06-27)

---

## Git: https://git-scm.com/install/mac and https://git-scm.com/install/windows
**Prerequisites:** None. Free.

### Task: Install Git on Windows
- **Steps (as of 2026-06-27):** Download Git for Windows from git-scm.com and run the installer.
- **Current version:** Git for Windows **2.54.0** (released 2026-04-20), x64.
- **Included:** **Git Bash** (the terminal the course tells Windows users to run commands in) ships with the Git for Windows installer. **Git Credential Manager (GCM)** is also included: "GCM is included with Git for Windows. During installation you will be asked to select a credential helper, with GCM listed as the default." So the first `git clone` of a private repo pops a browser "Sign in to GitHub" window.
- **Cost/credits:** Free.
- **Gotchas:** GCM is the default in the installer, so a beginner clicking "Next" through defaults gets the browser sign-in working. No extra step needed on Windows.
- **Source:** https://git-scm.com/install/windows ; https://github.com/git-ecosystem/git-credential-manager/blob/main/docs/install.md (both checked 2026-06-27)

### Task: Install Git on macOS, with browser GitHub sign-in
- **Steps (as of 2026-06-27):**
  1. Install Homebrew (one-line command from brew.sh), then `brew install git`.
  2. Also run `brew install --cask git-credential-manager` so the first clone offers a browser GitHub sign-in.
- **Cost/credits:** Free.
- **Gotchas (important for Mac learners):**
  - `brew install git` does **not** include GCM. Without it, a private-repo clone prompts for username + password in the terminal, and a GitHub *password* is rejected (password auth was removed in 2021; it would need a Personal Access Token). That is a dead end for a non-technical learner.
  - The fix is the cask: `brew install --cask git-credential-manager`, which installs the `.pkg` and auto-configures GCM, giving Mac the same browser sign-in as Windows (credentials stored in macOS Keychain). The exact brew command is confirmed in the GCM install docs.
  - Signing into VS Code with GitHub (the editor sign-in) does **not** authenticate terminal git, so GCM is still required for the terminal `git clone`. This is a subtle trap worth a sentence in the course.
- **Source:** https://github.com/git-ecosystem/git-credential-manager/blob/main/docs/install.md (checked 2026-06-27); brew command confirmed there.

---

## Running the Lovable app locally (npm, the cloned repo)
**Prerequisites:** Git, Node.js (npm), and the GitHub connection above. The repo is private, so the first clone needs the one-time GitHub sign-in.

### Task: Clone and run the app on your own computer
- **Steps (as of 2026-06-27, verified against the live repo):**
  1. Copy the repo's **HTTPS** link from GitHub's green *Code* button (ends in `.git`).
  2. `git clone <link>` (first time triggers the browser GitHub sign-in via GCM).
  3. `cd` into the created app folder.
  4. `npm install --no-save`.
  5. `npm run dev`, then open the local address it prints.
- **The local address is `http://localhost:8080`.** Confirmed in the live repo: Lovable's `@lovable.dev/vite-tanstack-config` hardcodes `port: 8080, strictPort: true` and even warns if you try to change it ("sandbox requires port 8080"). This is the new TanStack-based Lovable stack, **not** Vite's old default 5173. The cheat sheet correctly tells the learner to read the address the terminal prints, which is the safe instruction.
- **`npm run dev` maps to `vite dev`** in the repo's `package.json` (confirmed). Good to know if a learner's output mentions Vite.
- **Cost/credits:** Free. Running locally does not touch Lovable credits.
- **Gotchas (all confirmed against the live repo or prior hands-on testing):**
  - **The new Lovable stack ships a `bun.lock` and NO `package-lock.json`** (confirmed: the live repo has `bun.lock`, no `package-lock.json`). npm still works; `--no-save`'s job here is to stop npm creating a `package-lock.json` that Lovable does not expect.
  - **`src/routeTree.gen.ts` is regenerated by TanStack Router on every dev run**, so it shows as a modified file the learner never touched. Teach committing only the files they actually edited.
  - **Two real errors and their fixes (both previously hit on this repo):**
    - "The following dependencies are imported but could not be resolved" → Lovable added new dependencies since the last local install; run `npm install --no-save` again, then `npm run dev`.
    - ERESOLVE / "Could not resolve dependency / Fix the upstream dependency conflict" (can happen even on a fresh clone) → the app's dependency pins are stale in Lovable. Fix in Lovable with the prompt "Check if all my dependencies are up-to-date. If not, update them.", then `git pull`, then `npm install --no-save`. Do NOT teach `--legacy-peer-deps` or `--force` to learners.
  - **Windows needs the Microsoft Visual C++ Redistributable (x64)** for Vite/esbuild to run; without it `npm run dev` can fail with a missing `.dll` (e.g. `VCRUNTIME140.dll`). Install from the official page (https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist), reopen the terminal, retry. Macs have this built in.
  - "Leave the terminal open" is correct: closing it stops the dev server. Stop with Ctrl + C (on Mac too, not Cmd).
- **Source:** live repo `/Users/kingamagyar/Projects/book-club-pick` (`package.json`, `vite.config.ts`, `node_modules/@lovable.dev/vite-tanstack-config/dist/index.js`), inspected 2026-06-27. Vendor docs for these exact errors are thin, so these are hands-on facts, not doc citations: treat them as verified-by-test, and re-test on the learner's own repo if anything in the stack changes.

---

## Editing copy and icons in VS Code
**Prerequisites:** The app cloned and opened as a folder in VS Code; dev server running for live reload.

### Task: Find and change website copy
- **Steps (as of 2026-06-27):** Open the project folder in VS Code, search across files with **Ctrl/Cmd + Shift + F**, edit the text, save, watch the browser hot-reload, then commit and push from the **Source Control** panel.
- **Exact labels:** *Source Control* panel (the branch-shaped icon in the activity bar), not "Git tab".
- **Cost/credits:** Free.
- **Gotchas:** Hot reload is near-instant; no credits, no waiting. After pushing, remember Lovable still needs *Publish* to go live (separate step).
- **Source:** standard VS Code behaviour; Source Control/push confirmed working on the live repo. (checked 2026-06-27)

### Task: Change an icon (Lucide icon, by name in code)
- **What's true:** Lovable apps use the **Lucide** icon set via `lucide-react`. Confirmed in the live repo: `lucide-react` is a dependency, and icons are used as React components like `<BookOpen />` with a matching `import { BookOpen, Plus } from "lucide-react";` line.
- **Finding the icon's name (the reliable method):** `data-lov-id` is **gone** from newer Lovable apps (confirmed: no `data-lov-id` anywhere in the live repo's `src`), so you cannot read a file path from Inspect. Instead: right-click the icon in the running app → *Inspect*, and the icon's name shows in its `<svg>` class, e.g. `lucide-heart` (kebab-case). Then search that name in VS Code. (A panel selection-tool + hover also surfaces a tooltip like `svg.lucide.lucide-heart`.) Convert kebab-case to PascalCase for the code: `lucide-chevron-down` → `<ChevronDown />`.
- **Steps to swap (as of 2026-06-27, confirmed against the repo):** Search the icon name in VS Code, then change it in **two** places: the JSX usage (e.g. `<BookOpen />`) **and** the file's `import { ... } from "lucide-react";` line.
  - **Companion-change gotcha (this is the one that strands beginners):** the import line lists every icon the file still uses. A *full* swap replaces the name in both the import and the usage. A *partial* swap (the file uses the icon in more than one place but you only change one) means you must *add* the new icon to the import while keeping the old one: `import { BookOpen, BookMarked } from "lucide-react";`. If the import does not include the icon the JSX references, the app errors and names the missing icon.
  - **A real teaching case in this repo:** `src/routes/index.tsx` imports `{ BookOpen, Plus }` on line 9 and uses `<BookOpen />` in **two** places (lines 97 and 215) off that single import. Perfect for showing the partial-swap case (change one `<BookOpen />` to a different icon, and you must add that new icon to the import rather than replacing `BookOpen`, because the other usage still needs it).
- **Finding the right React name:** on lucide.dev the icon listing shows kebab-case; clicking an icon and choosing "See it in action" shows the UpperCamelCase React name ready to copy.
- **Cost/credits:** Free. No image upload, no credits.
- **Source:** https://lucide.dev ; live repo (`lucide-react` in `package.json`, `src/routes/index.tsx` usages and import) inspected 2026-06-27.

---

## GitHub Copilot Free (in VS Code): https://docs.github.com/en/copilot/get-started/plans
**Prerequisites:** A GitHub account. **No payment, no credit card.** If the learner has no existing Copilot subscription, signing in enrols them in **Copilot Free** automatically.

### Task: Sign up for Copilot Free inside VS Code
- **Steps (as of 2026-06-27):** Hover the Copilot icon in the VS Code Status Bar and choose the set-up action, then pick a sign-in method (GitHub) and follow the prompts. With no existing subscription, you are placed on the Copilot Free plan.
- **Label drift to flag:** the VS Code setup doc currently shows the action as **"Use AI Features"** when you hover the Copilot icon. Older/related material (and the GitHub-side wording) uses **"Set up Copilot"** / **"Sign up for Copilot Free"**. Alternative entry points the doc lists: the Accounts menu ("Sign in with GitHub to use GitHub Copilot") and the Command Palette command "GitHub Copilot: Sign in". The writer should confirm the exact button on the learner's current VS Code build, because this label has changed recently and a wrong quote will trip a beginner.
- **Cost/credits:** Free.
- **Limits (Free plan, confirmed today):** **2,000 code completions per month** and **50 chat requests per month** (chat requests include Copilot Edits, and all chat interactions count as premium requests). Free uses auto model selection only. So the course's guidance that "requests should count, use them deliberately" is correct.
- **Source:** https://docs.github.com/en/copilot/get-started/plans ; https://github.com/features/copilot/plans ; https://code.visualstudio.com/docs/setup/copilot (all checked 2026-06-27)

### Task: Open chat and pick a mode to make a change
- **Open chat:** **Ctrl+Alt+I** (Windows/Linux) / **⌃⌘I** (Mac); now also aliased to **Ctrl+I / ⌘I** (the Alt/⌃⌘ combo still works). The entry point is the **Copilot chat icon in the title bar** (the top strip of the VS Code window), and the panel is the *Chat view* — not a left-hand activity-bar / "sidebar" icon. Confirmed on code.visualstudio.com.
- **Chat modes (RESOLVED 2026-06-27):** the current built-in modes are **Ask** (explains, changes nothing), **Plan** (produces a structured implementation plan and asks clarifying questions), and **Agent** (complex tasks across files). **Edit mode is now deprecated in favour of Agent** (restorable via settings). So the correct trio is **Ask / Plan / Agent**, selected from the **agents dropdown at the bottom of the Chat view**. This matches the course as written and supersedes the outline's "Ask / Edit / Agent". Source: https://code.visualstudio.com/docs/agents/agent-types/local-agents (checked 2026-06-27).
- **Review flow:** changed-files list in the chat, per-file diff, Keep/Undo per file, then check the app at localhost. Nothing is committed until the learner commits; Source Control → *Discard* restores. (Product behaviour; consistent with VS Code docs describing review of agent edits.)
- **Cost/credits:** Each chat request counts against the 50/month Free allowance; completions count against the 2,000/month.
- **Source:** https://code.visualstudio.com/docs/copilot/chat/copilot-chat ; https://code.visualstudio.com/docs/copilot/chat/chat-modes (checked 2026-06-27)

---

## Backend vs frontend (the "which tool for which change" line)
- **The real dividing line is frontend vs backend, not "describable vs not".** The cloned repo is the **frontend** (what people see: copy, icons, colours, layout) and is safe to edit locally. The **backend** (database, auth, emails, payments, edge functions) is managed by Lovable via Supabase / Lovable Cloud; it is hosted, and the local copy talks to it but cannot safely change it. Backend changes belong in Lovable. Confirmed structurally: the live repo has a `supabase/` folder and `@supabase/supabase-js` dependency, with the actual backend hosted, not in the cloneable frontend code.
- **Source:** prior verification + live repo structure (checked 2026-06-27).

---

## Resolved on re-check (2026-06-27)
- **Copilot chat modes are Ask / Plan / Agent** (Edit deprecated in favour of Agent), selected from the agents dropdown at the bottom of the *Chat view*. This confirms the course's wording and supersedes the outline's "Ask / Edit / Agent". Folded into the "Open chat and pick a mode" task above. Source: https://code.visualstudio.com/docs/agents/agent-types/local-agents.
- **The Copilot chat entry point is the title-bar icon / *Chat view***, not a left-hand "sidebar" icon, with the shortcut now also aliased to Ctrl+I / ⌘I. Folded in above. Source: https://code.visualstudio.com/docs/copilot/chat/copilot-chat.

## Could not confirm
- **The Copilot Free sign-up button label.** VS Code now shows "Use AI Features" on the Copilot icon; older wording is "Set up Copilot" / "Sign up for Copilot Free". **Writer action:** quote the label the learner's VS Code actually shows; if unsure, describe it as "hover the Copilot icon and choose the set-up option" rather than a hard quote.
- **Exact Lovable connect-to-GitHub button wording** (*Connect* vs *Add connection*, and *Project settings* vs *Workspace settings*). The doc page and a search snippet differ slightly. **Writer action:** screenshot the live flow when generating the "Connect Your App to GitHub" toolkit guide, and quote what the screen shows.
- **Lovable sync speed.** Docs say "automatic" but give no number. Prior hands-on saw "within seconds". **Writer action:** say "within a moment", not a specific time.
- **Lovable repo privacy default.** The integrations doc does not state it; the live demo repo is private. **Writer action:** say "usually private", and rely on the GCM browser sign-in step working either way.
