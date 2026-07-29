# PROW 2026 Workshop Pitch

Conference: PROW Conference, 30 October 2026, Timișoara Convention Center (prow.ro).
Audience: product, developers, marketers, designers, managers, business analysts across CEE.
Facilitators: Kinga Magyar and Tamas Kokeny.
Status: drafted, not sent.

---

**Subject:** Workshop proposal for PROW 2026: version control for people who don't write code

Hi [organiser name],

We'd like to propose a hands-on workshop for PROW 2026. Here's the short version, and I'm happy to send more detail or talk it through.

**Version Control for People Who Don't Write Code**
Build your portfolio site with GitHub Copilot, publish it live before the session ends, then use the same workflow on your own documents.

Everyone leaves the room with a personal portfolio site live on a web address they can share. They build it with GitHub Copilot, the AI agent that works inside the VS Code editor, and they publish it using the tools underneath: the terminal, Git and GitHub. Nobody needs to write code.

**Who it's for**
Anyone who doesn't write code yet and wants to use AI with more confidence. Product managers, marketers, designers, managers and business analysts all work alongside a repository at some point, and this is the session where they get to work inside one themselves. No prior experience with Copilot, Git, GitHub or the terminal needed, and nothing gets skipped over as obvious.

**What you'll be able to do by the end**

- Publish a personal portfolio site to a live web address, so you have something to share on your CV or LinkedIn profile the same day
- Build and change that site by directing GitHub Copilot, so you can get a real result from an AI agent by describing what you want
- Review Copilot's diff before you keep it, so you can judge an AI's work rather than hope it got things right
- Set up VS Code, Git and GitHub on your own laptop, so you can keep building after the conference rather than only in the room
- Save your work with commit, push and pull, so you can return to any earlier version of anything you write
- Find your way around a project in the terminal, so you can run the commands your tools and AI agents expect
- Put one of your own documents under version control, so your specs, notes and copy get the same readable history as code

**Where the skills go after the session**

They change how it feels to work with AI. Once every change is committed, you can let Copilot make a bigger edit and still undo it, and you can read exactly what it changed before you keep it. Reviewing an AI agent's work is a skill of its own, and it gets much easier once you can read a diff. The same habit carries over to any other agent, Claude Code and Cursor included.

They also travel well beyond building. We run our own company this way: our courses, articles and marketing copy all live in a Git repository, so every change has a history we can read, edits get reviewed before they go live, and nothing sits in a folder of files called final-v2, final-v3, final-FINAL. Any spec, requirements document or piece of copy written as a Markdown file can work the same way, and that's where the last part of the session goes.

**Shape of the session (4 hours)**

- Decide what's worth versioning, and see what GitHub does with a history of changes (20 min)
- Set up your workspace: GitHub account, first repository, VS Code, GitHub Copilot, first commands in the terminal (40 min)
- Build your site with Copilot: describe what you want, then review what it produces (60 min)
- Break (15 min)
- Save your work properly: commit, push, pull, and read your own history (45 min)
- Publish it: your site live on a GitHub Pages address (25 min)
- Version something of your own: bring a document into a repository and track its changes (30 min)

In a 2-hour slot we'd start people from a template and spend the time on the version control workflow and publishing, which keeps the transferable part intact. Happy to fit whichever slot works for the programme.

**Practical details**

- Every tool in the session is free: GitHub, VS Code, Copilot's free tier, and GitHub Pages hosting
- Up to 30 participants, with both of us on the floor to help
- Participants bring a laptop, and we send install and sign-up instructions a week ahead so the session goes on building rather than downloads
- We need wifi, power at the tables, and a projector

**Who we are**

Kinga Magyar is the founder of productkind, a two-person company building educational products that teach practical tech skills and a product mindset. Tamas Kokeny is productkind's technical partner and educator. Together we run Little Parrot, a microlearning platform for building with AI, with a mission to close the gender gap in AI adoption. This workshop comes from a course we have built and taught for builders who don't write code, so the material has been through real learners already.

Would this fit your programme? Very happy to adjust the length or the focus.

Best,
Kinga

---

## Title alternatives

Recommended is the one in the pitch. Three swaps if the emphasis should sit differently:

- **Version Control and GitHub Copilot for People Who Don't Write Code** — puts the AI agent in the title, which is the most searchable version, but it's long and it tilts the session back towards sounding like every other AI workshop on the pile.
- **Git and GitHub for People Who Don't Write Code** — names the tools instead of the concept, so it's more recognisable in a programme listing, but "Git" means nothing to someone who hasn't met it yet.
- **Publish Your Own Site, Then Version Everything Else** — leads with the doing, warmest of the three, but loses the audience signal the title is meant to carry.

## Notes on the draft

**GitHub Copilot**
- Named in the subtitle, the opening, the audience line, the outcomes and the agenda. The opening glosses it as "the AI agent that works inside the VS Code editor", since organisers on the review panel may know the name without knowing what it does.
- Building with Copilot and reviewing Copilot's diff are now two separate outcomes. They're different skills, and the reviewing one is the harder and more transferable of the two.
- Kept out of the title by default, since a title with an AI tool in it is what makes a session blend into the rest of the programme. It's the first alternative above if we'd rather have the search term.
- The closing line about Claude Code and Cursor says the habit outlives the tool, which protects the session from ageing badly if the audience has moved on to a different agent by October.

**Cost**
- "Every tool in the session is free" is now the first practical detail. GitHub, VS Code and GitHub Pages are free outright; Copilot has a free tier with a monthly cap of roughly 50 chat requests plus completions. Enough for one session, but participants should sign in to Copilot before they arrive, which is why the pre-session email now covers sign-ups as well as installs.

**Outcome focus**
- Every takeaway follows action, benefit, deliverable, with higher-order verbs (publish, build, direct, review, judge, decide) rather than "learn about" or "understand".
- The bullets are written in "you" so organisers can lift them straight into the programme listing without rewriting.
- The session blocks are named by what participants produce in them, not by the topic covered.

**Framing**
- "Non-technical" appears nowhere in the pitch, including the facilitator bio. It's the label that makes people feel small, and it would sit oddly under a title built to be welcoming.
- "Developer" stays out of the title for the same reason, but stays in the body where organisers need to know these are real skills rather than a simplified version of them.
- "Doesn't write code yet" keeps the door open, which is the whole point of the audience line.
- PROW is a general product conference, so the gender gap mission sits in the bio as context. If we'd rather foreground it, that paragraph moves up into the pitch itself.

**Content accuracy**
- Documents block is 30 minutes of real work, not a closing remark. Participants create a Markdown file, commit it, edit it, and read the diff.
- Markdown and text files only. Git gives a readable history for text. Word files, PDFs and Figma files are binary, so you get versions but no readable diff. Worth being equally precise in the room when someone asks about their PRD in Word.
- Fork dropped from the Git list. Forking copies someone else's repository, which isn't part of building your own site. Clone, commit, push and pull are the loop that earns its place. Fork comes back naturally in the 2-hour template version.
- "Hosted on GitHub" means GitHub Pages, free on public repositories.
- The 4 hours only works if installs happen beforehand. Without the pre-workshop instructions, VS Code and Git downloads alone can eat an hour on conference wifi.

**Placeholders to fill:** organiser name, and the participant cap if 30 is wrong for the room we'd get.
