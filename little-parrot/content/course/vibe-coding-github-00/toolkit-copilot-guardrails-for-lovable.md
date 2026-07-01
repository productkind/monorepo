---
challenge: "6 - Make a Bigger Change with Copilot"
---
## Copilot Guardrails for Your Lovable App

A small file you set up once on your own computer that teaches GitHub Copilot the rules of a Lovable project. After this, Copilot knows which parts of your app to leave alone (the bits Lovable manages) and what to do instead when a task touches one of those bits: hand you a ready-made prompt for Lovable.

The clever bit is that the file lives on **your computer**, not inside your Lovable project. Nothing extra gets pushed to GitHub, nothing changes inside the app. You set it up once, and every Lovable app you ever work on is covered.

### Why your Lovable app needs guardrails

Some parts of your Lovable app are looked after by Lovable itself: where your data lives, the bits that talk to that data, the building blocks your app uses, and a handful of setup files Lovable keeps in order. If Copilot changes any of those on your computer, your project goes out of step with Lovable, and things start breaking in ways that are hard to undo.

The good news: Copilot follows written rules very well. We just need to put those rules in a file it reads automatically.

### What a "skill" or "custom instructions" file is

GitHub Copilot lets you save a file with rules it should follow, and reads that file before every chat. Whatever you write in it becomes part of Copilot's permanent context. You'll hear it called different things: **custom instructions**, an **instructions file**, or a **skill**. They all point to the same idea: written rules that Copilot reads automatically.

The file can live in two places:

- **Inside the project**, where it gets pushed to GitHub and applies to anyone who opens that project. Good for team rules.
- **On your computer**, where it lives in your home folder and applies whenever **you** use Copilot. Lovable never sees it, and your project stays clean.

For Lovable apps, the second option is the right one. The rules below help you keep Copilot in check, not the next person who opens the project.

### Step by step: set it up globally on your computer

You do this once for every Lovable app you'll ever build. Ten minutes, at most.

**1. Create a folder for your AI rules**

Anywhere outside any project folder is fine. A friendly home is **Documents**.

- On **Mac**: open **Finder**, go to **Documents**, right-click in the empty space, choose **New Folder**, and name it `copilot-rules`.
- On **Windows**: open **File Explorer**, go to **Documents**, right-click, choose **New → Folder**, and name it `copilot-rules`.

**2. Open that folder in VS Code**

In VS Code: **File → Open Folder**, pick the `copilot-rules` folder you just made. The file list on the left will be empty, that's expected.

**3. Create the rules file**

Right-click in the empty file list, choose **New File**, type `lovable.md` exactly, and press Enter. An empty file opens in the editor.

**4. Paste the rules from the next section**

Copy everything from the block further down and paste it into `lovable.md`.

**5. Save**

**Cmd + S** on Mac, **Ctrl + S** on Windows.

**6. Copy the file's full address**

In the file list on the left, right-click on `lovable.md` and choose **Copy Path**. (This is the *full* path, not the relative one. On Mac it starts with `/Users/`, on Windows it starts with `C:\Users\`.) Keep this on your clipboard for the next step.

**7. Open VS Code's user settings**

Press **Cmd + Shift + P** on Mac, or **Ctrl + Shift + P** on Windows, to open the Command Palette (a search box at the top). Type:

```
Preferences: Open User Settings (JSON)
```

and press Enter. A file called `settings.json` opens. It's where VS Code keeps your personal settings, and it's safe to edit.

**8. Add the instructions reference**

You'll see a pair of curly braces `{ }` with some lines between them. Click just inside the closing `}`, add a comma at the end of the line above if there isn't one, then paste this on a new line:

```json
"github.copilot.chat.codeGeneration.instructions": [
  { "file": "PASTE-YOUR-FILE-PATH-HERE" }
]
```

Replace `PASTE-YOUR-FILE-PATH-HERE` with the path you copied in step 6.

- On **Mac** it should look like: `/Users/yourname/Documents/copilot-rules/lovable.md`
- On **Windows** the path will have **backslashes**, and JSON needs each one doubled. So a path like `C:\Users\yourname\Documents\copilot-rules\lovable.md` becomes `C:\\Users\\yourname\\Documents\\copilot-rules\\lovable.md`. (VS Code will underline the line in red until you fix this.)

**9. Save the settings**

**Cmd + S** on Mac, **Ctrl + S** on Windows. You can close the `settings.json` tab now.

**10. Try it on a Lovable app**

Open your Lovable app in VS Code (**File → Open Folder**), open the Copilot chat (**Ctrl + Cmd + I** on Mac, **Ctrl + Alt + I** on Windows), switch to **Agent** mode, and ask:

```
What rules do you follow when editing code in this project?
```

Copilot should list the guardrails back to you. If it does, you're set.

### The rules to paste in

Copy everything between the lines below into your `lovable.md` file.

````markdown
# Working in a Lovable Project

These rules apply when you are working in a project built with Lovable. You can tell it's a Lovable project by a `.lovable` folder in the root, or by a Supabase setup that points to Lovable's infrastructure. If the current project is not a Lovable project, ignore these rules.

Some parts of a Lovable project are managed by Lovable directly, and editing them on this computer can break the sync between the project and Lovable. Follow the rules below carefully.

## Things you must not do

Never make changes to any of the following, even if the user asks. If a task would require any of these, stop and follow the "What to do instead" section below.

1. **Supabase functions.** Do not edit, add, or remove any Supabase edge functions or server functions.
2. **The database.** Do not edit the database schema, create migrations, change tables, columns, indexes, or row-level security policies.
3. **npm packages.** Do not install, update, remove, or change the version of any npm package. Do not edit the `dependencies` or `devDependencies` sections of `package.json`.
4. **Lock files.** Do not edit `package-lock.json`, `bun.lock`, `yarn.lock`, `pnpm-lock.yaml`, or any other lock file.
5. **Tooling config.** Do not edit ESLint, Prettier, TypeScript (`tsconfig*.json`), Vite (`vite.config.*`), PostCSS, or Tailwind config files.
6. **The `.lovable` directory.** Do not read, edit, add, or remove anything inside `.lovable/`.
7. **Base stack choices.** Do not swap or remove React, Vite, the routing library, Tailwind, or any other foundational library used by this project.
8. **npm scripts.** Do not edit or add scripts in the `scripts` section of `package.json`.

## What to do instead

If a task needs any of the changes above:

1. Briefly explain which rules the task touches and why those parts have to go through Lovable.
2. Output a single, copy-paste-ready prompt for Lovable that covers all the restricted parts of the task. Format it like this:

   ```
   PROMPT FOR LOVABLE
   ------------------
   <a clear, specific prompt that asks Lovable to make the restricted changes>
   ```

3. Stop there. Do not make any frontend changes in the same response, even if some parts of the task only touch the frontend. Tell the user to:
   - Send the prompt to Lovable
   - Wait for Lovable to finish
   - Run `git pull` in their terminal
   - Open a new chat with you to do the frontend work

This keeps the project consistent: the database and backend exist first, then the frontend gets wired to them.

## What you can do freely

Everything else in the frontend is fair game: components, pages, styles, copy, icons, hooks, utility functions, types, and any other regular React or TypeScript files inside `src/` (outside the restricted areas above).

When in doubt, ask the user before editing.
````

### What this looks like in practice

Imagine you ask Copilot in **Agent** mode:

```
Add a "favourite books" feature where users can star a book and see their starred list on a new My Favourites page.
```

Without guardrails, Copilot might happily start creating a database table, writing a Supabase function, and installing a new npm package. With the guardrails in place, you will get a reply more like this:

> This feature touches two restricted areas: the database (a new `favourites` table) and Supabase functions (to save and fetch the favourites). Both have to go through Lovable.
>
> ```
> PROMPT FOR LOVABLE
> ------------------
> Add a "favourites" feature to the app.
>
> Database: create a `favourites` table with columns `user_id` (uuid, references auth.users) and `book_id` (uuid, references books). Add a unique constraint on (user_id, book_id). Add a row-level security policy so each user can only read and write their own favourites.
>
> Backend: add a Supabase function to toggle a favourite (insert if not there, delete if already there) and another to fetch the current user's favourites.
>
> Do not change the frontend in this prompt. I will handle the UI in VS Code after this.
> ```
>
> Once Lovable has finished, run `git pull` in your terminal and open a new chat with me. I will then add the star button to each book card and build the My Favourites page.

Now you have a clear path: send the prompt to Lovable, wait, pull, and let Copilot do the frontend in a fresh chat. No broken project, no mystery errors.

### Tweaking your rules later

Your `lovable.md` file lives in your `copilot-rules` folder like any other text file. To change the rules: open VS Code, open that folder, open the file, edit, save. Copilot picks up the new version on the next chat.

Two useful tweaks as you learn more:

- **Add project-specific habits.** For example: *"Prefer the existing Button component from `src/components/ui/button.tsx`. Do not restyle a raw `<button>` element."*
- **Add tone or naming rules.** For example: *"All user-facing copy should be in British English."*

Keep the file short and focused. Copilot reads it on every chat, so a tight set of rules works better than a long one.

### Set it once, use it everywhere

Because the file lives on your computer (not inside any project), the same rules apply to every Lovable app you ever open in VS Code. New Lovable app today, the guardrails are already there. Brand new app next month, still there. No setup to repeat.

The only time you'd touch this again is to tweak the rules themselves, or if you set up a new computer and want the same guardrails there too.
