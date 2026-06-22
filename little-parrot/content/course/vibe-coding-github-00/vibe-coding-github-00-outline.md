# Course Outline: Save Lovable Credits with VS Code

**Full title:** Save Lovable Credits: Edit Your App in VS Code

## Overview

This micro-course teaches non-technical builders who use Lovable to set up a small coding workspace on their own computer (VS Code, Node.js, Git), run their app locally, and make changes themselves instead of spending Lovable credits on every tweak.

By the end, the learner can run their Lovable app on their own computer, change copy and icons by hand, make bigger changes by describing them to GitHub Copilot, and commit it all back to GitHub (which syncs to Lovable). The deeper win is confidence and capability: they're learning the real setup that builders and AI agents use, not just saving credits.

The tone assumes a **curious, excited** learner, not a wary one. Setting up a real workspace is framed as the fun, empowering part.

Dalmie, a dalmatian who built the Book Club Organiser app for her friend Sarah's book club, runs through every challenge as the worked example.

---

## Scope note (why this differs from the original draft)

The original plan taught editing on the GitHub website (github.dev) and finding elements via the `data-lov-id` attribute. Two Lovable changes made that unworkable, so the course was rescoped:

- **Newer Lovable apps no longer include `data-lov-id`**, so file paths can no longer be read from Inspect. Icons are still found via Inspect though: the icon's name shows in its `<svg>` class (e.g. `lucide-heart`), which the learner then searches in VS Code.
- Image-editing is left out of scope to keep the course focused; it teaches copy, icons, and Copilot-assisted code changes instead. (Images can be added locally via a `public` folder, so this is a focus choice, not a limitation.)

The credit-saving focus is unchanged. The method moved from the GitHub web editor to a local VS Code setup, which is more reliable and doubles as a real on-ramp to AI agents like Claude Code, Cursor, and Copilot.

---

## Structure

### Challenge 1: Why Edit on Your Own Computer (free)
**See how editing yourself saves credits, and connect your app to GitHub.**

- Comics: Dalmie's credits draining on tiny fixes; Little Parrot offers a workspace on her own computer (excited, not fearful).
- What you'll set up and walk away with (concrete, jargon-free, exciting).
- The credit-saving idea: a change you make and save costs no credits; asking Lovable's AI does.
- What GitHub is and why your code lives there; version control as a familiar idea (Google Docs/Office history; some people write whole books this way).
- Connect Lovable to GitHub (one-time; screen-by-screen in the **GitHub Setup Guide**).
- Quiz: where the credit savings actually come from.
- Reflection: what small thing will you change first?

### Challenge 2: Set Up Your Workspace
**Install the three free tools you need to edit and run your app locally.**

- VS Code (the editor), Node.js (runs your app, gives npm), Git (the version-control engine that talks to GitHub).
- Mac and Windows covered; on Windows, the Git installer includes **Git Bash** and Git Credential Manager; on Mac, also `brew install --cask git-credential-manager` so the first clone offers a browser GitHub sign-in.
- Confidence check: `node -v` and `git -v` in the terminal.
- Quiz: which tool does what.
- Exercise: confirm the install by pasting `node -v` output.
- Full click-by-click lives in the **Local Setup Guide**.

### Challenge 3: Run Your App on Your Computer
**Clone your app, install its pieces, and run it locally.**

- Copy the repo's HTTPS link from GitHub.
- Three commands in the terminal (Mac) / Git Bash (Windows): `git clone`, `npm install --no-save`, `npm run dev`.
- First clone triggers a one-time GitHub sign-in (browser window via Git Credential Manager); Lovable repos are private by default.
- Open `localhost` and see the app running, the milestone moment; leave the dev server running for live reload.
- Quiz: what `npm run dev` actually did (it runs locally, only for you).
- Exercise: get the app running, paste the local address.

### Challenge 4: Change Your Website Copy
**Find and change copy in VS Code, see it update live, and push it back.**

- Open the project folder in VS Code; search across files (Ctrl/Cmd + Shift + F).
- Edit, save, watch the browser hot-reload instantly (free, no waiting).
- Commit and push via the Source Control panel.
- The full path: edit → commit → push → syncs into Lovable → Publish to go live.
- Quiz: why it's synced but not yet live (Publish is a separate step).
- Exercise: make a real copy edit and write the commit message.

### Challenge 5: Change an Icon
**Swap an icon by renaming it in code, no image upload, no credits.**

- Icons are code (Lovable apps use the Lucide set, e.g. `<Heart />`), not pictures.
- Find it by right-clicking the icon in the browser and choosing Inspect (the name shows as `lucide-...` in the Elements tab), search that name in VS Code, rename it in both the `import` line and the spot where it's shown (per lucide.dev), save, see it change.
- Quiz: the reliable way to change an icon.
- Exercise: swap an icon in their own app.

### Challenge 6: Make a Bigger Change with Copilot
**Put Copilot to work on your app, review its changes, and recover confidently when something goes wrong.**

- Copilot Free in VS Code: sign-up via the Copilot icon (GitHub login from Challenge 2), open Chat with Ctrl+Alt+I / Ctrl+Cmd+I; the free plan includes ~50 chat requests plus completions monthly, so requests should count.
- The three chat modes: Ask (explains, changes nothing), Edit (focused edits), Agent (whole tasks across files). Quiz: which mode for understanding a file.
- Dalmie's worked example: a what-where-example request ("add a line showing how many books are on the list").
- Review flow: changed-files list in the chat, per-file diff, Keep/Undo, check the app at localhost.
- Troubleshooting empowerment: paste errors back into the chat (the agent fixes its own mistakes), follow-up requests for tweaks, and the Source Control escape hatch (nothing is committed until you commit; Discard restores). Quiz: best first move on an error overlay.
- Close the loop: commit, push, publish; one request, one commit.
- Exercise: run a real agent request and report back (AI feedback on the request's specificity and next moves).

### Challenge 7: Your Workflow
**Know when to edit in VS Code, when to ask Copilot, and when to prompt Lovable.**

- Decision rule: VS Code for small, specific changes; Copilot for fiddly-but-defined changes; Lovable for big new features.
- The dividing line: what people **see** (copy, icons, colours, layout) is yours to change locally; **backend** work (data, logins, emails, payments, managed by Lovable Cloud) belongs in Lovable.
- Staying in sync: pull before editing, push when done, Publish to go live; revert via Lovable's chat if a change goes wrong.
- Quiz: which job belongs back in Lovable.
- Final exercise: one change you'll make in VS Code this week.

---

## Narrative Arc

The course follows a widening sense of capability:

1. **Why + connect:** Editing yourself is free; link your app to GitHub.
2. **Set up:** Build the workspace (VS Code, Node, Git).
3. **Run it:** Your own app, live on your computer.
4. **First win:** Change copy for free, see it instantly.
5. **Go further:** Icons are just code you can rename.
6. **Get help:** An AI assistant for the bigger changes.
7. **Choose well:** The right tool for each job, and staying in sync.

Each challenge follows Dalmie and the Book Club Organiser, and ends with the learner doing the same in their own app.

---

## Suggested Toolkit Items

Setup-heavy and quick-reference material is offloaded here so challenges stay focused on skills and decisions (referenced by name in the course; create as separate toolkit items):

- **GitHub Setup Guide:** connect a Lovable project to GitHub, screen-by-screen.
- **Local Setup Guide:** install VS Code, Node.js, and Git for Mac and Windows (incl. Git Bash, and Git Credential Manager on Mac for the browser GitHub sign-in), with the version-check commands.
- **Run-It-Locally Cheat Sheet:** the three commands (`git clone`, `npm install --no-save`, `npm run dev`).
- **Credit-Free Edit Checklist:** the editing loop (find, edit, save, commit, push, publish).
- **Copilot Starter Prompts:** ready-made request shapes for common changes.
- **Edit-Locally vs Prompt-Lovable Decision Checklist:** when to use VS Code, Copilot, or Lovable (frontend locally, backend in Lovable).

---

## Skills Covered

- Setting up a local dev environment (VS Code, Node.js, Git)
- Running a Lovable app locally (clone, install, dev server)
- Editing copy and icons in VS Code
- Committing and pushing with version control; keeping GitHub and Lovable in sync
- Working with GitHub Copilot and reviewing AI changes
- Deciding between editing locally, using Copilot, and prompting Lovable

---

## Timing

Total estimated time: ~75 minutes across seven challenges (designed for active, hands-on setup and editing, not passive reading).
