---
name: messy-draft-to-outline
description: Turn a messy draft or rough notes into a structured Little Parrot micro-course outline, ending with the verification handoff list that course-tool-researcher works from. Use when creating a course outline, structuring rough course notes, or starting a new micro-course. Triggers include "create an outline", "turn this draft into a course outline", or any course-outline task.
---

## The course-design rubric applies from the outline stage

Read `.Codex/skills/outline-to-micro-course/references/course-design-rubric.md` with the Read tool before outlining, and apply it in full. The first-challenge hook, the narrative arc (relatable problem first, no tool-bashing, transformation hook), the running example (Dalmie building the Book Club Organiser), honest outcomes, realistic examples, dependency ordering, and the go-live setup rule all get locked in at the outline stage, and the rubric is their single source of truth.

## Outline-stage rules

- You don't have to follow the exact structure of the messy draft given. It's important that you craft the outline in a way that engages learners and help them efficiently acquire new skills.
- **Verify the course's core premise against the tool's documentation before finalising the outline.** The outline is where the premise gets locked in, so check it holds. A free or built-in feature can undercut the angle (e.g., "edit on GitHub to save credits" weakens once you confirm the tool's visual editor is already free). If it's shaky, reframe the angle now (e.g., from "save credits" to "more reliable") and flag it to the user.
- After drafting the outline, cross-check every bullet point in the messy draft against the outline. Flag any topics from the draft that were dropped and explain why (out of scope, covered in another course, etc.). Don't silently omit content.
- **Scope check after first draft:** Review whether the course is trying to cover too much. If a challenge is purely technical setup (e.g., configuring DNS, step-by-step tool installation), it likely belongs in a toolkit item rather than a challenge. Challenges should teach decisions and skills, not walk through configuration screens. Prefer shorter challenges over fewer long ones, so the learner feels progress as they complete each one.
- **Correct URLs:** Check `../../../little-parrot/content/course/course-links.md` for course URLs and `../../../little-parrot/content/course/toolkit-links.md` for toolkit URLs before generating any cross-references. Never invent placeholder URLs.

## Verification Handoff (required section in every outline)

The outline is consumed by the `course-tool-researcher` agent before the course is generated, so it must carry forward what needs checking instead of leaving the writer to rediscover it. End every outline with a **Verification handoff** section that lists, per challenge:

- **Tools taught**: every tool the challenge uses, and the specific task the learner performs with it (e.g. "Lovable: connect the project to GitHub", not just "Lovable").
- **Claims to verify**: any prerequisite, cost/credits claim, UI step, or "best practice" the challenge will state that depends on the tool working a certain way today.
- **Premise risk**: if the challenge (or the course) rests on a tool-dependent premise, name it here so it gets confirmed before generation.

Keep it factual and scoped: this is a checklist for the researcher, not prose. If a challenge teaches no tool and makes no tool-dependent claim, write "None" for it.

## Output Format for Generated Outline

When generating a structured draft, structure it as the examples.

### Example Outlines

Newest first. Only the first example carries the required **Verification handoff** section (the older ones predate it), so model that section on the first example.

- `../../../little-parrot/content/course/ai-your-life-admin-00/ai-your-life-admin-00-outline.md`
- `../../../little-parrot/content/course/vibe-coding-github-00/vibe-coding-github-00-outline.md`
- `../../../little-parrot/content/course/lovable-intro-00/lovable-intro-00-outline.md`

### Save Outline
Save the generated outline to this folder: `../../../little-parrot/content/course`