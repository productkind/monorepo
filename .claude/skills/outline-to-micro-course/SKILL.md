---
name: outline-to-micro-course
description: Generate a complete Little Parrot micro-course from an approved outline, orchestrating the whole pipeline, spawning course-tool-researcher for a verified tool facts sheet, generating the course YAML against it, then running the pedagogy, language, and tool-accuracy critics in a bounded revision loop until the course passes. Use when generating micro-course content from an outline. Triggers include "generate the course", "build the course from this outline", or any outline-to-course task.
---

## Generation Loop (run this every time)

A drafted micro-course is never returned to the user until it has been through tool research up front and an independent critic gate at the end. One agent writing hundreds of lines of YAML cannot also reliably hold every rule in this skill, and self-review misses what fresh eyes catch. So facts are gathered before generation, and the writer and the judges are different agents.

1. **Research the tools first.** Before writing any content, spawn the `course-tool-researcher` agent (Agent tool) and give it the outline (or its path) and the course folder. It reads the outline's **Verification handoff** list, checks every tool the course teaches against current documentation, and writes `<course-folder>/<course-name>-tool-facts.md`. Wait for it. If it flags the course's core premise as at risk, surface that to the user and agree a reframe **before** generating, do not generate the undercut version.

2. **Generate** the full course. Before drafting, read `.claude/skills/outline-to-micro-course/references/course-design-rubric.md` with the Read tool and apply it in full (it is the rubric the pedagogy critic will judge against), and apply the **language-rules**, **productkind-tone**, and **write-key-outcomes** skills, invoking them if not already loaded (the language and pedagogy critics judge against those). Use **the facts sheet as ground truth** for every tool step (exact labels, prerequisites, step order, costs). Still run "Verify Techniques Before Generating" and the self-review pass below, the critics are a second net, not a replacement. **Validate that the YAML parses (first item of the self-review) before spawning the critics** — they review content, not syntax, so a non-parsing file will sail past them and reach the user broken.

3. **Critique with fresh eyes.** Spawn all three critic agents in parallel (one message, three Agent tool calls), do not show the draft to the user yet:
   - `course-pedagogy-critic`: pass the course file and the outline.
   - `course-language-critic`: pass the course file.
   - `course-tool-accuracy-critic`: pass the course file and the facts sheet path.

4. **Read every verdict.**
   - **All three PASS** → show the user the final course, with a short note on what each critic checked.
   - **Any NEEDS REVISION** → apply every revision brief (and add any confirmed facts the tool-accuracy critic surfaced to the facts sheet), then re-run the critics that failed on the new draft. Repeat, up to **3 rounds**.

5. **After 3 rounds**, if issues remain, show the best draft and name the unresolved items honestly, including anything from a critic's "To verify" list. Never hide them or ship around them.

What the user sees: the **final course plus a short summary** of what the critics flagged and how it was resolved, and any facts they still need to verify, not every round, unless they ask to see the drafts.

---

## Micro-course structure
- Each micro-course is made up of challenges.
- Each challenge is made up of steps.
- Each step has a type: see all the types in [`./courseSteps.ts`](./courseSteps.ts)
- The `note` field on the course is optional. Only include it if the course has something genuinely important to flag (e.g., timing expectations that differ from normal, prerequisites). Don't add a note by default.

## Writer ground rules (apply while generating)

- **Correct URLs:** Check `../../../little-parrot/content/course/course-links.md` for course URLs and `../../../little-parrot/content/course/toolkit-links.md` for toolkit URLs before generating any cross-references. Never invent placeholder URLs.
- **Verify tool-specific advice.** The facts sheet is ground truth for the tools it covers. For any tool step, setting, or claim NOT on the sheet, check the tool's actual documentation before writing it, use the tool's own names for settings, buttons, and concepts, and add the confirmed fact to the sheet. Don't generate setup instructions from general knowledge.
- **Fact-check before stating best practices.** If you're about to write something as a principle, best practice, or rule (in text steps, quiz explanations, or subDescriptions), and you're not confident it's grounded in real domain knowledge, look it up using WebSearch or WebFetch before including it. Don't state uncertain opinions as facts. Don't silently skip it either. Verify first, then write.
- **Watch the course's core premise while drafting.** The outline stage and the researcher have already checked it, but if drafting surfaces new doubt (e.g. a free or built-in feature undercutting the angle, the way "edit on GitHub to save credits" weakens once the tool's visual editor turns out to be free), stop and surface it to the user rather than teaching something misleading.

---

## Verify Techniques Before Generating

Before writing the full course content, list every technique, formula, framework, and method that will be taught across all challenges. Present this list to the user and ask for confirmation before proceeding. For each item, state:

- **What it is** (e.g., "Value proposition formula: '[Product] helps [who] do [what] without [pain point]'")
- **Where it's used** (e.g., "Challenge 1, reused in Challenge 5 for directory submissions")
- **Source or basis** (e.g., "Simplified version of Steve Blank's positioning statement" or "Custom formula, not based on a specific framework")

This step catches misaligned or unreliable techniques before they're baked into hundreds of lines of content. If you're unsure whether a technique is the right one for the audience, flag it explicitly rather than defaulting to general knowledge.

---

## Self-Review Before Presenting

After generating the full course, do a self-review pass before presenting it. Check each rule in this skill file and in `references/course-design-rubric.md` against the output:

- [ ] **Does the YAML parse?** Validate the file before anything else: run `python3 -c "import yaml; yaml.safe_load(open('<path>'))"` (or any YAML parser) and confirm it loads with no error. A file that doesn't parse is broken no matter how good the content is, and the critics read content, not syntax, so this gate is yours. The most common break is a **single-line value containing a colon-and-space** (e.g. `explanation: The prompt keys off one thing for events: a date or time.`), which YAML reads as a nested mapping and rejects with "mapping values are not allowed here". Fix by wrapping the whole value in double quotes (`explanation: "...for events: a date or time."`), or convert it to a `|-` block scalar. Note: colons inside `|-` block scalars (step bodies, transcripts, prompt code blocks, log timestamps like `13:10`) are always safe and need no escaping; the rule applies only to single-line plain scalars such as `title`, `subtitle`, `description`, `question`, `explanation`, `nextModule`, `subDescription`, and list items. Re-run the parser after fixing until it loads clean.
- [ ] Are quizzes distributed throughout each challenge, not clumped at the end?
- [ ] Does every quiz test judgement or application, not recall of the preceding step?
- [ ] Are all quiz answer options similar in length (correct answer not visually obvious)?
- [ ] Does each quiz's `correctAnswer` index still point to the right option? (Re-verify after any option reordering: reordering options without updating the index silently marks the wrong answer.)
- [ ] Has every hands-on procedure been traced end-to-end on a real project (would it work if the learner did exactly what's written and nothing else)?
- [ ] Is every text step short enough to read without scrolling? If it has 3+ concepts, is it split?
- [ ] Where a step was shortened, was it done by splitting it into two or cutting genuine fluff, never by compressing away the explanations that tell the learner what is happening and why? (The reassuring "what's going on here" detail is the value, not filler.)
- [ ] Is every text step styled for scanning (bold key concept, italic UI labels/examples), without over-bolding?
- [ ] Does every video `transcript` carry markdown emphasis on its key points (so a learner can read instead of watch), not sit as a flat unformatted block?
- [ ] Do the comics set up the problem from the learner's pain, without bashing the tool?
- [ ] Do the description, learning outcomes, and course-end recap avoid claiming skills the course doesn't actually teach?
- [ ] Does the first step after comics introduce the course outcomes, not jump into teaching?
- [ ] Does the learner's biggest fear get addressed before the first teaching step?
- [ ] Are all URLs verified against course-links.md and toolkit-links.md?
- [ ] Are toolkit references linked and woven in naturally?
- [ ] Does every exercise focus on one thing, not bundle multiple tasks?
- [ ] Do Dalmie's examples demonstrate the thought process?
- [ ] Does each challenge-end have a distinct nextModule (exciting) and subDescription (reflects on this challenge)?
- [ ] Is the final exercise one focused, forward-looking action?

This pass catches the most common issues that survive initial generation.

## Output Format for Generated Micro-course

When generating a micro-course, structure it as the examples. Make sure to use diverse step types in each challenge.

### Example Micro-courses

Newest first; the newest examples best reflect the current format.

- `../../../little-parrot/content/course/ai-your-life-admin-00/ai-your-life-admin-00.yaml`
- `../../../little-parrot/content/course/write-better-with-ai-00/write-better-with-ai-00.yaml`
- `../../../little-parrot/content/course/vibe-coding-product-management-00/vibe-coding-product-management-00.yaml`
- `../../../little-parrot/content/course/vibe-coding-debugging-00/vibe-coding-debugging-00.yaml`
- `../../../little-parrot/content/course/lovable-intro-00/lovable-intro-00.yaml`
- `../../../little-parrot/content/course/vibe-coding-start-your-business-00/vibe-coding-start-your-business-00.yaml`
- `../../../little-parrot/content/course/vibe-coding-tech-00/vibe-coding-tech-00.yaml`

### Save Micro-course
Save the generated micro-course to this folder: `../../../little-parrot/content/course`
