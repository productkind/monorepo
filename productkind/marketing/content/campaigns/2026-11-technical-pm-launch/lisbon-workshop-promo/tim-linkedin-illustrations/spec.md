---
status: drafted
brand: little-parrot
channels: [linkedin]
source: ../tim-linkedin.md
---

# Illustrations: Technical Skills in the AI Era

**One takeaway:** Product managers and founders who aren't developers can learn four technical areas that make AI agents far more useful to them. **Format:** 5 single images, one per post · 1080 x 1350 · little-parrot

## Slide 1 (post 1)

Visual: title, then a 2 x 2 grid of framed cards, each with a line icon (server, terminal, chat bubble, checklist), a title and a short note.

- Runner: Tech skills in the AI era · 1/5
- Title: Tech skills PMs and founders still need
- Card 1: Environments
- Card 1 note: where your code runs
- Card 2: Developer tools
- Card 2 note: Git, GitHub, the command line, databases
- Card 3: How AI tools work
- Card 3 note: what they're good at and where they struggle
- Card 4: Rules of thumb
- Card 4 note: from software engineering
- Footer handle: LittleParrot.app

## Slide 2 (post 2)

Visual: title and kicker, then three separate framed boxes stacked with space between them and no arrows: a laptop window, a sandbox box with an agent inside, a globe.

- Runner: Tech skills in the AI era · 2/5
- Title: Where your code runs
- Kicker: The part AI agents still struggle with
- Box 1: Development
- Box 1 note: your own copy to debug and experiment with
- Box 2: Sandbox
- Box 2 note: where AI agents can keep working when your laptop is closed
- Box 3: Production
- Box 3 note: what your end users use
- Footer handle: LittleParrot.app

## Slide 3 (post 3)

Visual: title, then five framed rows, each with a tool icon, the tool name and what it lets you do.

- Runner: Tech skills in the AI era · 3/5
- Title: The tools developers and AI agents share
- Row 1: Git
- Row 1 note: go back to the last working version, and let agents work in parallel
- Row 2: GitHub
- Row 2 note: access your organisation's codebases
- Row 3: The command line
- Row 3 note: build tools and automations on your own computer
- Row 4: Databases
- Row 4 note: prototype admin features and read user metrics
- Row 5: VS Code
- Row 5 note: see exactly what an agent changed
- Footnote: AI agents like Claude Code use them too.
- Footer handle: LittleParrot.app

## Slide 4 (post 4)

Visual: sequence diagram in the webhook style: the agent app on the left, the model on the right, arrows between them with a tag and a payload.

- Runner: Tech skills in the AI era · 4/5
- Title: What happens when you ask an AI agent
- Prompt: fix the login bug (typed, monospace)
- Left actor: the agent app
- Right actor: the model
- Arrow 1 tag: sends
- Arrow 1: your message + chat history + saved notes
- Arrow 2 tag: replies
- Arrow 2: use tool: read login.ts (typed, monospace)
- Moment: THE APP RUNS THE TOOL
- Arrow 3 tag: sends
- Arrow 3: the file + the whole conversation so far
- Arrow 4 tag: replies
- Arrow 4: here's the fix
- Footnote: The model only writes text. The app runs the tools and sends the chat history and saved notes with every message.
- Footer handle: LittleParrot.app

## Slide 5 (post 5)

Visual: two framed panels in the webhook style. Panel 1: one long spec bar, one long build bar, a question mark at the end. Panel 2: a row of small change-and-test loops.

- Runner: Tech skills in the AI era · 5/5
- Title: Spec first vs small steps
- Panel 1 kicker: BIG SPEC UP FRONT
- Panel 1 step 1: write the whole spec
- Panel 1 step 2: the agent builds everything
- Panel 1 step 3: find out what's wrong at the end
- Panel 2 kicker: SMALL STEPS
- Loop label 1: one small change
- Loop label 2: test it
- Panel 2 result: find out what's wrong after every step
- Footnote: Ideas from XP and agile
- Footer handle: LittleParrot.app

## Alt text

1. A diagram titled "Tech skills PMs and founders still need", with four cards: Environments, where your code runs; Developer tools, Git, GitHub, the command line and databases; How AI tools work, what they're good at and where they struggle; Rules of thumb from software engineering.
2. A diagram titled "Where your code runs", subtitled "The part AI agents still struggle with", showing three separate environments: Development, your own copy to debug and experiment with; Sandbox, where AI agents can keep working when your laptop is closed; Production, what your end users use.
3. A diagram titled "The tools developers and AI agents share", listing five tools and what each lets you do: Git, go back to the last working version and let agents work in parallel; GitHub, access your organisation's codebases; the command line, build tools and automations on your own computer; databases, prototype admin features and read user metrics; VS Code, see exactly what an agent changed. Note: AI agents like Claude Code use them too.
4. A sequence diagram titled "What happens when you ask an AI agent". You type "fix the login bug". The agent app sends the model your message, the chat history and saved notes. The model replies "use tool: read login.ts". The app runs the tool and sends the file and the whole conversation so far. The model replies with the fix. Note: the model only writes text; the app runs the tools and sends the chat history and saved notes with every message.
5. Two panels titled "Spec first vs small steps". Big spec up front: write the whole spec, the agent builds everything, find out what's wrong at the end. Small steps: a row of loops of one small change and test it, so you find out what's wrong after every step. Note: ideas from XP and agile.

## Design notes

- Each slide exports as its own image for its post; no CTA slide.
- Match `2026-09-pm-technical-fluency-validation/diagram-webhook-vs-api`: wash background, card with gradient bar, LittleParrot.app bottom left, wave parrot peeking bottom right.
