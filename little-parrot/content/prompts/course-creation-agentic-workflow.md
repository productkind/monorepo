## Goal
- Produce a high-quality Little Parrot micro-course on the first try, instead of catching factual, language, and pedagogy problems one by one during manual review.

## About
- Claude Code (agent), run from the monorepo
- Little Parrot project
- Replaces the older one-shot prompts in this folder (`create-course-from-messy-draft.md`, `create-course-narrative-from-outline.md`) with a skill-driven pipeline that gathers tool facts up front and gates the draft with independent critics before you see it.

---

## Why this exists

The old process was: generate the whole course, then read it step by step and fix problems as they surfaced. Three kinds of problem kept slipping through:

1. **Wrong or vague tool instructions.** Setup steps and UI labels written from general knowledge rather than current documentation.
2. **Language-guideline breaches.** Banned words (em dashes, "just", "from X to Y"), American spellings, unexplained jargon, overselling.
3. **Pedagogy slips.** Quizzes that test recall instead of judgement, wrong `correctAnswer` indices, walls of text, practice clumped at the end.

The rules to prevent all three already lived in the skills. The problem was structural: one agent writing 1,000+ lines of YAML cannot also hold every rule in working memory, and self-review by the same agent misses what fresh eyes catch. The fix mirrors the email and LinkedIn workflows: **front-load the facts, then gate the draft with independent critic sub-agents in a generate → critique → revise loop.**

---

## The pipeline

```
messy draft
  → [skill] messy-draft-to-outline      outline + a "Verification handoff" list
  → [agent] course-tool-researcher       writes a verified tool-facts sheet     (NEW)
  → [skill] outline-to-micro-course      generates the course using the facts sheet
  → [agents x3] critics, in parallel     pedagogy + language + tool-accuracy     (NEW)
  → revise, re-run failed critics, ≤3 rounds
  → you review a course that already passed all three gates
```

The critic loop is built into the `outline-to-micro-course` skill (its "Generation Loop" section), so it runs automatically once you invoke that skill. You do not orchestrate it by hand.

---

## The components

### Skills (`.claude/skills/`)
- **`messy-draft-to-outline`**: turns a messy draft into a structured outline. Now also emits a **Verification handoff**, a per-challenge list of tools taught, claims to verify, and premise risks, which the researcher consumes.
- **`outline-to-micro-course`**: generates the full course YAML from the outline. Opens with the **Generation Loop** (research → generate → critique → revise). Carries the pedagogy checklist, the draft-time language rules, and the quiz/effort-gradient guidance.
- **`productkind-tone`**: the educational voice. Banned words, British English, AI-tool terminology, and the "build your idea, not become a developer" framing. Loaded by the writer and by the language critic.
- **`write-key-outcomes`**: outcome-shaped descriptions (action verb + benefit + deliverable).

### Agents (`.claude/agents/`)
Each critic has **fresh eyes** (it did not write the draft) and a **single concern**. They do not see the user's memory, so every rule they enforce is written into their own file or a skill they load.

- **`course-tool-researcher`** (web-enabled). Runs once, before generation. Reads the outline's Verification handoff, checks every tool the course teaches against current official docs (and a real repo where one exists), and writes a **facts sheet** to the course folder: prerequisites, exact UI labels, current step sequences, costs/credits, gotchas, each with a source link and the date checked. Flags premise risks before a word of the course is written.
- **`course-pedagogy-critic`**. Structure and learning design: re-derives every quiz's `correctAnswer`, checks single-concept challenges, the effort gradient, step length, dependency ordering, the comics → intro → fear arc, and honest outcomes.
- **`course-language-critic`**. Words only: banned phrases, British English, jargon and reading level, tool terminology, framing, overselling.
- **`course-tool-accuracy-critic`** (web-enabled). Checks every hands-on step against the facts sheet, spot-checks anything not on it against live docs, and flags wrong labels, missing prerequisites, vague steps, and unverified "best practices".

---

## How to run it

1. **Draft → outline.** Invoke `messy-draft-to-outline` with the messy draft. Confirm the outline and its Verification handoff.
2. **Generate.** Invoke `outline-to-micro-course` with the outline. It will:
   - spawn `course-tool-researcher` and wait for the facts sheet (pausing to agree a reframe with you if a premise is at risk),
   - generate the course YAML using the facts sheet as ground truth,
   - spawn the three critics in parallel, apply their revision briefs, and re-run the failed ones, up to 3 rounds.
3. **Review.** You receive the finished course plus a short summary of what the critics flagged and fixed, and any facts they could not confirm.

The same loop works as a **revision pass on an existing course**: point the researcher and the three critics at the published YAML to get a verdict, then apply the fixes.

---

## The evaluation loop

- All three critics return a structured verdict: **PASS** or **NEEDS REVISION**, every issue with the offending text quoted and a concrete fix, and a prioritised revision brief.
- **All three PASS** → the course is shown to you.
- **Any NEEDS REVISION** → apply the briefs, re-run the failed critics, repeat up to 3 rounds. After 3 rounds, surface the best draft and name the unresolved items honestly.
- Run the critics in parallel (one message, multiple agent calls). Each is single-concern, so they do not conflict.

---

## The tool-facts sheet

Saved as `<course-folder>/<course-name>-tool-facts.md`. It is the source of truth for tool steps and the input the tool-accuracy critic checks against. It is **dated**: if you generate a course more than ~2 weeks after the sheet was written, regenerate it, because tool UIs change. Items the researcher could not confirm from docs go in a "Could not confirm" list for you to verify on the live product.

---

## What still needs a human

The pipeline is a strong net, not a replacement for judgement. Two things stay with you:

- **Live UI labels and costs.** When docs are silent or out of date, the critics flag the item to verify rather than guessing. Confirm it on the live product and report the real label. (Worked example: Lovable's docs said "+ button", but the live UI uses "More button"; the course was right.)
- **Premise and behaviour calls the docs cannot settle.** When sources conflict, the human decides. (Worked example: whether inline-editing dynamic text syncs to the database. Docs were silent and third-party sources conflicted; the real behaviour, confirmed by the product owner, was that it hardcodes the value.)

When a critic confidently "corrects" something, verify before applying. The loop caught real factual bugs this way, and the human caught the critic over-reaching the same way.

---

## Keeping memory and the skills in sync

When a correction comes up during a course pass, it belongs in **two** places:

- **Memory** (`~/.claude/.../memory/`) so the main agent applies it on any task.
- **The relevant skill or critic file** so the automated gates apply it too. The critics never see memory, so a rule that lives only in memory will not reach them.

A rule in the critic but not the generation skill still works, just less efficiently: the gate catches what the writer should have avoided, costing a revise round. Putting it in both means the writer avoids it up front. Memory teaches the agent; the skill files teach the pipeline.

---

## Published vs draft courses

The pipeline assumes it is **drafting a new course**, where adding, splitting, and reordering steps is encouraged. For a **published** course with active learners, step add/remove/reorder shifts everyone's progress index, so prefer in-place wording fixes and treat structural changes as a deliberate, separate decision. This constraint is handled case by case, not enforced by the skills.
