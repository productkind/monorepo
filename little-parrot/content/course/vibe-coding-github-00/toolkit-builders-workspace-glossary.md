---
challenge: "7 - Your Workflow"
type: "Cheat sheet"
---
## Builder's Workspace Glossary

Every new word from this course in one place, explained in everyday language. When a term slips your mind, look it up here. The terms are grouped by area, so related ones sit together.

### The tools in your workspace
- **GitHub**: a website where your app's code is stored online, safely and with a full history. When you build in Lovable, your code is saved here automatically. Think of it as Google Drive, but for code.
- **VS Code**: a free program from Microsoft for opening and editing the files that make up your app. Think of it as a word processor built for code, with helpful extras.
- **Node.js**: free software you install once. It lets your app run on your computer, the same way it runs for your visitors online, and it brings npm along with it. You never open Node.js yourself; it just needs to be there.
- **npm**: a helper that comes with Node.js. It downloads the ready-made pieces of code your app is built from, like fetching all the ingredients a recipe needs.
- **Terminal**: a program on your computer where you type commands one line at a time and press Enter to run them, instead of clicking buttons and menus the way you do in most apps. It's how you tell your computer to do things like fetch your app or start it running. (On a Mac it's the **Terminal** app; on Windows you use **Git Bash**.)
- **Git**: free software that records every change you make to your app's code and sends those changes to GitHub. It's the engine behind the saving and the version history; you rarely talk to it directly.
- **Git Bash** (Windows): the terminal program Windows builders use. It comes bundled with Git, so installing Git gives it to you.
- **Homebrew** (Mac): a free "app store for builder's tools" on a Mac, run from the Terminal. In this course you use it to install Git.
- **Git Credential Manager**: a small helper that remembers your GitHub login. The first time you fetch your app you sign in through your browser once, with no passwords or tokens to wrestle with afterwards.
- **GitHub Copilot**: an AI assistant built into VS Code. You describe a change in everyday words and it edits your app's code for you, right in your files. It has a free plan.

### Where your code lives: GitHub and version control
- **Repository (repo)**: your app's own folder on GitHub. It holds every file of your app's code, plus the history of every change ever made. Each app has its own repository.
- **Clone**: making your own copy of your app's code from GitHub onto your computer so you can work on it. You do this once per app, with the `git clone` command.
- **Version control**: a complete history of every change to your files, so nothing is ever lost and you can go back to an earlier version. You've used it without knowing: it's exactly what Google Docs' version history does for a document.
- **Commit**: one saved change, with a short label describing it. Each commit becomes a point in your app's history you can return to. Think of sealing a parcel and writing on the label what's inside.
- **Commit message**: the short label you write when you commit, saying what you changed, like "Fix typo on the book button". It's what keeps your history readable.
- **Stage**: choosing which of your changed files to include in the next commit, like packing only the items you want into the box before you seal it. In VS Code you stage a file with the **+** next to it.
- **Push**: sending your saved commits from your computer up to GitHub, so they're safe online and flow on into Lovable. Think of posting the parcel.
- **Pull**: the opposite of push, fetching the newest changes from GitHub down to your computer, like the ones Lovable made since you last worked. Do this before you start editing. Think of receiving a parcel.
- **Sync**: VS Code's button that does a pull and a push together in one click, so you both receive the latest and send your own changes.
- **Diff**: a before-and-after view of a file, showing exactly what you changed, removed text in red and added text in green. You check it before saving to be sure you changed what you meant.
- **Branch (main)**: a separate line of work inside a repository. Apps can have several, but in this course you only ever use the main one, so branches aren't something you need to think about.

### Running your app on your computer
- **npm run dev (dev server)**: a command you type in the terminal to run your app on your own computer. It keeps running while you work and refreshes the app the moment you save a change.
- **localhost**: a web address that means "this very computer". When your app runs on your machine you open it at a localhost address (often `localhost:8080`). Only you can see it; it isn't on the internet.
- **Local / locally**: builder shorthand for "on your own computer", rather than online. So "running your app locally" just means running it on your own machine, for yourself. This course says "on your own computer", but you'll come across "local" often elsewhere, so it's a handy one to know.
- **Dependencies (building blocks)**: the ready-made pieces of code your app relies on, written by other people. `npm install` downloads them all into your app's folder so it can run.
- **Live preview (hot reload)**: the way your app in the browser updates by itself the instant you save a change in VS Code, with no refresh and no waiting.
- **Vite**: the engine that does the actual work of running your app on your computer and updating it live as you save. `npm run dev` is the command that starts it, and it then runs in the background while you work. You don't use Vite directly, but you'll see its name if your app won't start.

### Editing the code
- **Icons as code**: in your app, most icons aren't picture files, they're small code names from a ready-made set (Lovable uses one called Lucide). To swap an icon you change its name in the code, rather than uploading an image.
- **Import line**: a line near the top of a code file that lists what the file borrows from elsewhere, such as which icons it uses. When you add a new icon, its name has to join this list.
- **Upper camel case**: a way of writing names in code with no spaces and each word capitalised. So the icon `book-open` is written `BookOpen` in your code.

### Working with your AI agent
- **AI agent**: an AI assistant that works directly inside your files, opening them and making changes itself. Different from a chat assistant, where you copy its answers and paste them in yourself. GitHub Copilot is the AI agent in this course.
- **Chat assistant**: an AI you talk to in a chat window, like ChatGPT or Claude.ai. It gives you answers to copy and paste; it doesn't touch your files directly.
- **Ask / Plan / Agent**: GitHub Copilot's three modes. **Ask** explains things without changing anything, **Plan** writes up a plan for a change before doing it, and **Agent** carries out a change for you.

### Your app's two halves
- **Frontend**: everything people see and click in your app, the words, images, icons, colours, buttons, and layout. This is the part you edit on your computer.
- **Backend (Lovable Cloud)**: the behind-the-scenes part you don't see, where data is stored, logins are checked, and emails or payments are handled. Lovable runs this for you (it's called Lovable Cloud), so these changes are made in Lovable, not on your computer.

### Going live
- **Publish**: the button in Lovable that updates the live app your visitors see. Saving and syncing your code is separate; your changes only reach visitors once you press Publish.
