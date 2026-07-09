## Goal
- Produce a LinkedIn post or Substack Note that already meets the house voice, structure, and authenticity guidelines before you see it, instead of catching breaches by re-reading the draft yourself.

## About
- Claude Code (agent), run from the monorepo
- Little Parrot project, posts from Kinga's profile
- A skill-driven generate → critique → revise loop: the main agent drafts, an independent critic sub-agent gates the draft with fresh eyes, the agent revises, and only a passing post reaches you.

---

## Why this exists

The old approach was to draft a post and hand it straight back. The guidelines that make a post good already lived in the skills and the authenticity doc, but the same agent that wrote the draft also judged it, and self-review misses what fresh eyes catch. A confident draft would still slip a banned phrase, a manufactured hook, or a post that reported an observation without giving the reader anything to take away.

The fix mirrors the course and email workflows: keep the rules in one place, then gate the draft with an **independent critic sub-agent** that did not write it. The writer and the judge must be different for the judge to be worth anything.

---

## The pipeline

```
you ask for a post (or share a Substack narrative / URL)
  → [skill] linkedin-post + personal-tone-of-voice      the main agent drafts
  → [agent] linkedin-critic                             judges with fresh eyes, returns a verdict
  → revise on the critic's brief, re-run, ≤3 rounds
  → you receive a post that already passed, plus a short note on what was caught
```

The loop is built into the `linkedin-post` skill (its "Evaluation Loop" section), so it runs automatically once that skill is in play. You do not orchestrate it by hand; you just ask for the post.

---

## The components

### Skills (`.claude/skills/`)
- **`personal-tone-of-voice`**: the voice. Banned-language list, British English, the "real moment not a hook" opening, "give a usable technique", "frame our AI use correctly", and the formatting rules (no em dashes, no hashtags except Instagram). The single source of truth for words.
- **`linkedin-post`**: channel mechanics and structure. Length range, openings, "every post must earn its read", and the **Evaluation Loop** section that drives this whole process. Also applies to Substack Notes.
- **`productkind/marketing/strategy/how-to-be-authentic-on-linkedin.md`**: the seven authenticity principles and the filter ("would I still post it if no one liked it?"). Not a skill, a strategy doc the critic reads at runtime.

### Agent (`.claude/agents/`)
- **`linkedin-critic`** (read-only). Has **fresh eyes** (it did not write the draft) and a **single job**: judge a draft against the guidelines and return a verdict a writer can act on. It does not rewrite the post. Its rubric is the two skills above (preloaded into its context via the `skills:` frontmatter field) plus the authenticity doc (read at runtime). It judges in three tiers:
  - **Tier 1, hard fails (binary):** banned words, rhetorical formulas including the split-sentence form, em dashes, hashtags, British English, length.
  - **Tier 2, structure and craft:** grounded opening, leads with the point, one idea, ending that gives something to try, experiences not features.
  - **Tier 3, authenticity and value (most important):** does it earn its read, is there a usable technique, could only Kinga have written it, fellow-learner stance, AI framed correctly, the authenticity filter.

The old `linkedin-post-generator` agent was **retired** this session: it pushed hooks, hashtags, and engagement CTAs that the current guidelines forbid, so it would have fought the critic.

---

## How to run it

1. **Ask for the post.** Give a topic, or share a Substack narrative or URL to base it on. Say if you want a Substack Note rather than a LinkedIn post.
2. The agent drafts using the skills and the authenticity doc, then **does not show you the draft**. It spawns `linkedin-critic` with the full draft text.
3. **PASS** → you get the final post plus a short note on what the critic checked. **NEEDS REVISION** → the agent applies the critic's brief, re-runs the critic, up to 3 rounds. After 3 rounds, it surfaces the best draft and names anything unresolved honestly.

The same loop works as a **review pass on an existing post**: hand the critic a draft you already wrote to get a verdict before publishing.

---

## The evaluation loop

- The critic returns a structured verdict: **PASS** or **NEEDS REVISION**, the one thing the reader walks away with, every issue with the offending text quoted and a concrete fix, and a prioritised revision brief.
- A clean **PASS** is a valid result; the critic is told not to invent problems to look thorough. A post strong on voice but empty on value still fails, because value is the point.
- You see the **final post plus a short summary**, not every round, unless you ask for the rounds.

---

## Design principles (what keeps it maintainable)

- **Rules live once, in the skills. Method lives in the critic.** The deciding question: "if I changed this, would I have to remember to change it here too?" If yes, it is a rule and belongs only in the skill, which the critic reads. If no, it is judging method and is fine in the critic file. Specific values, lists, and examples are referenced, never copied; the tier structure and how-to-look-for-it instructions are the critic's own.
- **Preload the rubric, don't fetch it.** The critic names the two skills in its `skills:` frontmatter, so their full text is injected at startup, identically every run. This is why the critic body holds no copied rules to drift.
- **Feed misses back into the rubric, not the conversation.** When something slips through (this session: "The honest barrier isn't the editing. It's the setup." is the banned "X isn't... it's..." formula split across a full stop, and the critic first waved it through), the fix goes into the skill (the example) and the critic (the detection method: scan for negation followed by a contrasting assertion across a full stop). Each catch makes the gate permanently better because the fix lives in the files.
- **Model choice is a consistency-vs-freshness trade.** The critic runs on the `opus` alias, which auto-upgrades to the newest Opus. Pinning a full ID (e.g. `claude-opus-4-8`) would hold judgments stable run-to-run at the cost of manual bumps. The alias is the current call.

---

## What still needs a human

The loop is a strong net, not a replacement for judgement.

- **The critic can miss a mechanical pattern or over-reach.** It confidently approved a banned formula once this session. When it flags or clears something and you disagree, you are right to override; then feed the lesson back into the files.
- **Whether the post is true for you, right now.** The authenticity filter is the critic's to check in principle, but only you know if a post is something you would still publish if no one liked it.

---

## Keeping memory and the skills in sync

When a correction comes up while writing, it belongs in **two** places:

- **Memory** (`~/.claude/.../memory/`) so the main agent applies it on any task.
- **The skill or the critic file** so the automated gate applies it too. The critic never sees memory, so a rule that lives only in memory will not reach it.

A rule in the critic but not the voice skill still works, just less efficiently: the gate catches what the writer should have avoided, costing a revise round. Putting it in the skill means the writer avoids it up front. Memory teaches the agent; the skill and critic files teach the pipeline.

---

## A note on what we left out

We considered and decided against a few things, on purpose:

- **A `/linkedin-post` slash command** for deterministic invocation. The skill-driven orchestration has been working well, so the extra entry point was not worth maintaining.
- **JSON structured output from the critic.** Real schema enforcement is an API-only feature a sub-agent in an interactive session cannot use, so JSON would add no guarantee while making the verdict harder to read. The fixed markdown template gives the structure and stays readable.
- **A separate writer agent.** The main conversation drafts, which keeps you close to the work; the critic supplies the independent judgement.
