# Skills taxonomy: what it found

Companion to `skills-taxonomy.yaml`. Written 2026-09-19 against the 9 published courses (55 challenges, 682 steps).

## What changed

The old `skills:` field held **168 distinct tags across 55 challenges**, and 86% of them appeared exactly once. `Version Bookmarking`, `Version Control`, `Version Comparison`, `Revert` and `Reverting Changes` were five separate tags for one thing. Nothing could route a learner on that.

The replacement is **41 skills in 9 domains**, plus a second axis that the old field was missing.

|                     | Old       | New                  |
| ------------------- | --------- | -------------------- |
| Distinct tags       | 168       | 41                   |
| Taught by 2+ blocks | 14%       | 61%                  |
| Axes                | 1 (mixed) | 2 (skill + scenario) |

**The two axes are the actual fix.** A skill is what a learner can do, it drives skip logic and ordering, and it is a closed list. A scenario is the use case a block is written around, it drives niche targeting, and it stays open. The old field mixed them, which is why `Slack`, `LinkedIn`, `Jira` and `Prompting` all sat in the same list. Once separated, all four challenges of `write-better-with-ai-00` collapse onto two skills (`ai.prompt-craft`, `ai.tone-and-voice`) with four different scenarios. That is your founders-versus-PMs case, already present in a course you shipped.

## Block kinds

| Kind    | Count |                                                               |
| ------- | ----- | ------------------------------------------------------------- |
| core    | 35    | Tool skill, no use case baked in. Shared. One canonical copy. |
| applied | 10    | Same skill, specific scenario. Authored per niche.            |
| mixed   | 9     | Frame and core in one challenge. Split candidates.            |
| frame   | 1     | Opening or closing only.                                      |

Every course's first challenge is `mixed`: 18 to 26 steps carrying the comics, the video and the promise, with real teaching stitched on. Those nine are where the frame lives, and each one needs splitting before its core content can be shared.

## Real duplicates: merge these

Confirmed by reading step titles, not by trusting tags.

**1. Publishing.** `lovable-intro-00#7` and `lovable-publishing-00#1` both teach meta tags, the subdomain and the publish button. The publishing version is fuller (it adds favicon and preview versus production). One core block, intro links to it.

**2. API keys.** `lovable-intro-00#6` has "API keys and secrets" plus "Quiz: API keys". `lovable-publishing-00#1` has "Switch to real API keys before going live" plus "Quiz: API keys". Same quiz title in two courses.

**3. Version bookmarking and revert.** Taught three times. `lovable-intro-00#5` ("Bookmarking versions", "Quiz: Bookmarking"), `vibe-coding-debugging-00#2` ("Bookmark your stable versions", "Quiz: Bookmarking") and `vibe-coding-debugging-00#5` ("Strategy 1: The revert button", "Strategy 2: Compare versions"). Again, the same quiz title twice.

**4. User feedback.** Taught three times: `lovable-intro-00#7`, `lovable-publishing-00#5` and `vibe-coding-start-your-business-00#6`. The business version is fullest.

Roughly **40 steps** of genuinely duplicated teaching, which is not enormous. The value is not the steps saved today, it is that four things currently have to be corrected in four places when Lovable changes them.

## Not duplicates, even though the tags suggested it

**`launch.domain`.** `lovable-publishing-00#2` is buying and connecting. `vibe-coding-start-your-business-00#2` is choosing the name and weighing the extension. Complementary. Split into two core blocks rather than merged.

**Core plus applied, working as intended.** `build.context-and-planning` is introduced in `lovable-intro-00#6` and applied to debugging in `vibe-coding-debugging-00#4`. Same for `build.refine-visually`, `soft.app-anatomy`, `soft.backend` and `soft.frontend`. Leave them, and record the link so the applied block can declare the core one as a prerequisite.

**`launch.analytics`.** `lovable-publishing-00#5` teaches Google Analytics, `vibe-coding-start-your-business-00#4` teaches PostHog. One skill, two tool variants. Worth a `tool:` field on the block rather than a merge.

**A correction to my own first pass.** I initially merged `lovable-publishing-00#6` and `vibe-coding-start-your-business-00#8` into one `biz.sustainable-growth` skill on the strength of their tags. Reading the steps showed one teaches launching early and agile cycles, the other teaches break-even, Stripe and legal structure. Split back into `biz.ship-steadily` and `biz.money`. The taxonomy file reflects the split.

## One block doing three jobs

`lovable-publishing-00#5` ("Know Your Users: Metrics, Feedback, and Distribution") teaches `launch.analytics`, `launch.user-feedback` **and** `launch.reach-users` in 11 steps. All three are taught better elsewhere. This is the clearest split candidate in the set, and the clearest example of what the course-as-unit structure encourages: a challenge sized to fill a slot rather than to teach one thing.

## The running example is the real coupling

**41 of 55 blocks use the book club app.** Only 10 are example-free (all of `vibe-coding-tech-00` and `write-better-with-ai-00`), and 4 use the learner's own material.

Explicit back-references between challenges are rare, only 22 across 682 steps, so the prose is more modular than it looks. The book club is the thing that binds. Pull `build.versioning` out as a shared core block today and the learner meets an app she has not built.

Not incidental: the 10 example-free blocks are exactly the ones from the two courses that teach concepts rather than a build. **Core blocks that carry a hands-on tool procedure are the ones that need the example stripped**, and those are the same blocks that carry the volatile UI instructions from the maintenance work. The same rewrite fixes both.

## What this means for the Claude Code pair

The model holds up against real content. For founders and product managers:

- 1 frame block each (comics, promise, wrap-up)
- Core blocks shared: install, first prompt, files and folders, undo safely
- Applied blocks per niche: investor update and one-pager, versus PRD and release notes

`write-better-with-ai-00` already proves the applied pattern works. Its four challenges are one skill pair in four scenarios, and they read as four distinct challenges.

## Next

1. Apply `teaches:`/`assumes:` to the course YAMLs, or hold them in this file until ids land.
2. Split the 9 `mixed` blocks so frame and core separate.
3. Strip the book club from core blocks that carry tool procedures.
4. Merge the 4 confirmed duplicates.
5. Split `lovable-publishing-00#5` and `launch.domain`.

Steps 2 to 5 change step counts, so they need stable block and step ids first.
