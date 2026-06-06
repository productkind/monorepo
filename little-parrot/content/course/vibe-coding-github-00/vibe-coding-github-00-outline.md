# Course Outline: Save Lovable Credits with GitHub

**Full title:** Save Lovable Credits: Edit Your App's Code on GitHub

## Overview

This micro-course teaches non-technical builders who use an AI app builder like Lovable to make edits directly on GitHub instead of spending credits on every tweak. Using only the GitHub web interface in the browser (no command line, no extra tools), learners fix copy, swap in their own images and assets, and adjust small UI details, all without burning credits.

By the end, the learner can open their app's code on GitHub, find the exact piece they want to change, edit it, save it, and watch it appear back in Lovable. The deeper win is confidence: the code stops being a black box. The learner can see how their app is put together, which means they can guide their AI tools with far more precision and spend their credits where they actually count.

Dalmie, a dalmatian building her Book Club Organiser app, runs through every challenge as the worked example.

---

## Structure

### Challenge 1: Your First Credit-Free Edit
**Make a real change to your app without spending a single credit.**

The hook: a repeatable workflow the learner can use the same day. The reusable technique is GitHub's file search plus the web editor to find a piece of text and change it directly, instead of asking Lovable (which costs a credit and sometimes rewrites more than you wanted).

- Relatable problem: Dalmie spots a typo on her Book Club Organiser. She asks Lovable to fix it, it costs a credit, and it also changes two other things she liked. (Show the frustration first.)
- What GitHub is, in a sentence or two: the place your app's code lives.
- Why editing there saves credits: a change you make yourself costs nothing.
- Prerequisite, handled before the challenge: connect your GitHub account to your Lovable project (link to the **GitHub Setup Guide** toolkit item for the screen-by-screen steps, so the challenge itself stays focused on the skill).
- The workflow: use GitHub search to find your text, open the file in GitHub's online editor, change the text, and save the change.
- What a commit is, introduced lightly: saving a change on GitHub is called "committing" it, and you give it a short note so you remember what you did.
- A reassuring reminder: you have already used version control, even if no one called it that. Google Docs and Microsoft Office keep a version history of your documents, so you can look back at earlier versions and restore them. Git does the same for your app's code. The one real difference is that with Git you give each change a name (that is what the commit message is for), so you can see at a glance what changed without reading any code. Version control is not only for code: plenty of people use it for documents, and some even write whole books this way. And because your history lives online, not only on your laptop, it is safe and reachable from anywhere. It is also why a developer can never claim the dog ate their homework. 😉
- Keep each commit small: one change per commit. A small commit is easy to spot in the history and easy to describe in its message. The real payoff comes later: if a change turns out to cause a bug, a small commit makes it easy to find which one, and easy to undo on its own without disturbing your other work. A commit that bundles five unrelated changes is hard to read and hard to unpick.
- What a good commit message looks like: short, and says what changed, not how. Give an example so the learner is not stuck staring at the box. Good: "Fix typo on book suggestion button." Less helpful: "update" or "changes." A simple rule to remember it: finish the sentence "This change will..."
- How to read a diff: before you save, GitHub shows you exactly what changed, the old line and the new line together. Removed text shows in red, added text in green. Checking the diff is how you confirm you changed what you meant, and nothing else, before you commit.
- How the change reaches Lovable: it appears in your Lovable project automatically, usually within seconds (Lovable syncs the default branch). One thing to be clear about: this updates the code in your project, not your live app. To update the published version your visitors see, you still press Publish in Lovable as usual. So the full chain is: edit on GitHub, commit, it syncs into Lovable, then publish.
- Visual Edits reframe: Lovable's "Visual Edits" can change text and colours on the page for free, but it can be slow to load and can act on an out-of-date version of the code, saving over a change you already made. Editing on GitHub is the more dependable way to make copy and colour changes that stick. (Phrase the limitation gently, not as bashing.)
- **Exercise:** Fix one piece of copy in your own app by editing it on GitHub and committing the change. Switch to Lovable and watch it appear.

### Challenge 2: Find Any Code with the Inspect Trick
**Pinpoint the exact file behind anything you see on screen.**

Search works when you know the words on the page. This challenge gives the learner a detective technique for everything else: using the browser's Inspect tool to read the clue Lovable leaves in the page.

- When search is not enough: a button, an image, or a layout has no obvious text to search for.
- The technique: right-click the element in your live app, choose Inspect, and read the `data-lov-id` value. It tells you the file path and the line number.
- Walk Dalmie through it: the welcome image at the top of her Book Club Organiser is still a generic placeholder, and there is no text to search for. She uses Inspect to find exactly which file and line that image lives in, so she can swap it for one that suits her club.
- Open that file on GitHub and jump straight to the right spot.
- **Exercise:** Pick something visual in your app that has no obvious text. Use Inspect to find its file and line, then open that file on GitHub.

### Challenge 3: Read Your Repository Like a Map
**Understand how your app is organised so nothing feels like a black box.**

Now that the learner has opened a few files, this challenge gives them the map. The payoff is confidence and better AI prompting: when you can name the part you mean, you can direct your AI tools precisely.

- What a repository is: the full folder of your app's code on GitHub.
- Repo privacy: your repo may be private (only you can see it) or public (anyone with the link can). Show learners how to check it in GitHub settings and set it to private if they prefer. If a repo is private and they want to show their code to someone, a friend or someone helping, they invite that person as a collaborator first. Nobody can reach a private repo otherwise.
- The structure: folders and files, and the common ones you will see again and again (where pages, components, and styling tend to live).
- The commit history: every saved change, who made it, and when. This includes the commits Lovable made as it built your app, sitting right alongside your own, so you can see the whole story of the app being built up over time. Open any commit to see its diff, the same red and green view you met in Challenge 1.
- What a branch is: a separate line of work on your code. You and Lovable both work on the same default branch, called `main`, so when you commit a change it lands there and shows up right away in the GitHub UI before flowing to Lovable. You will not need to create branches in this course; it is enough to recognise the word when you see it.
- Git vs GitHub, demystified: Git is the system that tracks changes; GitHub is the website that stores your code and shows it to you. You only ever touch GitHub in this course.
- Why this helps your prompts: pointing your AI tool at "the suggestions list component" beats "the thing with the books."
- **Exercise:** Explore your repository's folders and read your own commit history, including the commit you made in Challenge 1.

### Challenge 4: Make a Small UI Change
**Adjust how your app looks, not just what it says.**

Copy was the warm-up. This challenge applies the same find-and-edit workflow to small visual changes, the kind that would otherwise be a round-trip of credits in Lovable.

- What counts as a safe small change: swapping an image, deleting an element you do not want, a spacing tweak, or a colour change made in the right place.
- The consistency principle: change shared styles in one place rather than editing individual elements one by one. If you want a different button colour, change your primary button colour where it is defined for the whole app, so every button stays consistent. Editing buttons one at a time is how a UI drifts out of step with itself.
- Use the Inspect trick from Challenge 2 to find the element or the shared style that controls it, then make the edit on GitHub.
- Dalmie now makes the change she set up in Challenge 2: in Challenge 2 she located the placeholder image's file, and here she actually swaps it for one of her own. She also deletes a section Lovable added that she does not want.
- A gentle boundary: keep changes small and visual here; bigger structural work is still better done by prompting Lovable. (Sets up the decision framework in Challenge 5.)
- **Exercise:** Make one small visual change to your app on GitHub, commit it, and check the result in Lovable.

### Challenge 5: Your Sustainable Workflow
**Know which tool to reach for, every time.**

The synthesis challenge. The learner now has two ways to change their app; this gives them the decision rule so they choose well and keep everything in sync.

- The decision checklist: edit on GitHub for small copy, image, and visual changes; prompt Lovable for new features and bigger structural work. (Link to the **GitHub vs Lovable Decision Checklist** toolkit item.)
- Keeping the two in sync: changes flow between GitHub and Lovable, and there is a short delay (about a minute), so give it a moment before assuming something went wrong.
- A safe habit: make one change at a time and check it synced, the same discipline that keeps vibe coding calm.
- Recap of what the learner can now do, and where to go next.
- **Where to go next:**
  - [Build a Valuable Product: How to Break Down Your Idea for Vibe Coding](https://littleparrot.app/e16d932e-ac1f-4514-b5da-42629acf39ae/course-overview)
  - [Basics of Software for Vibe Coding](https://littleparrot.app/4794366d-b807-4804-8fd5-64c3a5a03472/course-overview)
  - [Fix Bugs with Confidence: Debugging Your Lovable App](https://littleparrot.app/aaab45b7-209a-4578-a515-3e55687f0c53/course-overview)

---

## Narrative Arc

The course follows a widening sense of control over your own app:

1. **First win:** Change something in your app, for free. (copy edit)
2. **Find anything:** Locate the code behind any element. (Inspect trick)
3. **See the whole:** Understand how the app is organised. (repository map)
4. **Change the look:** Apply the workflow to visual tweaks. (small UI change)
5. **Choose well:** Know which tool to use, and stay in sync. (decision framework)

Each challenge follows Dalmie and her Book Club Organiser, and ends with the learner doing the same thing in their own app.

---

## Suggested Toolkit Items

Pure setup and quick-reference material is offloaded here so challenges stay focused on skills and decisions:

- **GitHub Setup Guide:** Create a GitHub account and connect it to your Lovable project (screen-by-screen). Referenced as the prerequisite for Challenge 1.
- **The Inspect Trick Cheat Sheet:** How to read `data-lov-id` to find a file and line number, with a screenshot.
- **GitHub vs Lovable Decision Checklist:** When to edit on GitHub versus when to prompt Lovable. Referenced in Challenge 5.
- **GitHub Glossary for Vibe Coders:** Non-technical definitions of repository, commit, diff, branch, file, Git vs GitHub.

---

## Skills Covered

- Editing app copy directly on GitHub to save credits
- Finding the exact file behind any element with the browser Inspect tool
- Reading a diff to confirm what changed before saving
- Committing in small, single-change steps that are easy to find and undo
- Reading a repository's structure and commit history
- Understanding branches, repo privacy, and how to invite someone to a private repo
- Making small UI changes on GitHub
- Choosing between editing on GitHub and prompting Lovable
- Keeping GitHub and Lovable in sync

---

## Cross-Check Against the Messy Draft

Every topic from the draft is accounted for:

| Draft topic | Where it lives |
|-------------|----------------|
| Save credits: edit copy manually | Challenge 1 |
| Save credits: outside AI agent for stuck bugs | **Deferred to a future course.** Fixing bugs with an AI agent (like Claude Code) means editing code with the agent's help and testing before it goes live. Doing that safely needs Git in the command line, which is its own course. Pasting AI-generated code straight back into GitHub's web editor without testing would likely break the learner's app, so we do not teach it here. |
| Save credits: understand structure to guide AI | Challenge 3 |
| Save credits: small UI changes | Challenge 4 |
| Caveat: Lovable "Visual edits" can be unreliable | Challenge 1 |
| What GitHub is and why it saves credits | Challenge 1 |
| Create a GitHub account and set up | Offloaded to **GitHub Setup Guide** toolkit (pure config screens) |
| Connect GitHub to your Lovable project | **GitHub Setup Guide** toolkit + Challenge 1 prerequisite |
| Structure of a GitHub repository | Challenge 3 |
| Find code via GitHub search and file navigation | Challenge 1 (search) and Challenge 3 (navigation) |
| Find code via Inspect / `data-lov-id` / line number | Challenge 2 |
| GitHub's online code editor for simple edits | Challenge 1 |
| Edit a file, then add the change (commit) | Challenge 1 |
| Adding code so it is available everywhere (Lovable) | Challenge 1 (sync) |
| Difference between GitHub and Lovable code; keeping in sync | Challenge 1 and Challenge 5 |
| What a commit is | Challenge 1 (intro) and Challenge 3 (history) |
| Difference between GitHub and Git | Challenge 3 |

Two items sit outside the challenges. Account creation and the Lovable connection are pure configuration screens, so they move to a toolkit setup guide per our scope rules. Fixing bugs with an outside AI agent is deferred to a future course, because doing it safely needs Git in the command line (see the row above). The draft's "prepares the learner to use other AI agents like Claude Code" goal is still served: reading your own code and commit history (Challenge 3) is the foundation that future course builds on.

---

## Timing

Total estimated time: ~40 minutes (five short, hands-on challenges, each ending with the learner editing their own app).
