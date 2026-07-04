# Research: AI in PM workflows (input for the PM productivity course)

Researched 2026-07-04. Sources: Lenny's Newsletter/Figma survey (n=1,750),
State of Product Management 2026, Productboard CPO survey, Teresa Torres
(producttalk.org), Peter Yang (Roblox), Aakash Gupta, Sachin Rekhi, Marily
Nika; cross-checked against our own user insights. Course premise: PMs are
told to use AI but don't know where it fits their workflow.

## The premise, evidenced

- 51% of product leaders say AI is leadership's top priority; only 2% of orgs
  invest in developing people for it. 96% of PMs use AI, but only ~6% of orgs
  treat it as core capability. The market's open question is "where does it
  fit", not "should I".
- 57% of workers hide their AI use from colleagues. Women get less employer
  AI training than men (49% vs 79%) and less encouragement (61% vs 83%).
- 63% of PMs report saving 4+ hours/week; 92% also report at least one
  significant downside. The honest story: worth it, but you must verify.
- Our learners asked for exactly this: "how PMs can use AI beyond content
  creation... for processing data... and generating insights faster"
  (Michelle).

## Specific use cases and the workflow each one speeds up

### Understanding users (input work)

- **Interview transcription and note-taking** (Torres). Old workflow: record
  the call, re-listen, type up notes, file them. AI workflow: auto-transcript
  plus AI-added metadata (who, topic, product area) so old interviews become
  searchable. PM still reviews; transcripts miss tone and body language.
  Time: the write-up step disappears; "excellent and virtually free".
- **Single-interview synthesis, AI as extra perspective** (Torres). Old
  workflow: after each interview, the PM pulls out opportunities alone. AI
  workflow: PM writes her own takeaways first, then asks AI for its read of
  the same transcript and compares. "Sometimes the AI catches things that I
  missed." Rule: verify every quote AI cites against the transcript (in her
  tests ~30% of AI-cited quotes were wrong or fabricated). Never skip the
  human pass: synthesis skill is what lets you judge AI output at all.
- **Messy-feedback distillation** (Yang, weekly practice). Old workflow: read
  a 200-message customer chat/support thread end to end, take notes. AI
  workflow: paste the whole thread, ask for key takeaways, recurring
  complaints, and surprises, then spot-check against the thread. Same-day
  win; the PM owns the raw material so errors are catchable.
- **Survey free-text and NPS-comment theming** (State of PM 2026: 47.1% of
  PMs summarise feedback, 39.8% use AI to find themes). Old workflow: read
  hundreds of comments, tally themes in a spreadsheet. AI workflow: dump the
  export, ask for clustered themes each backed by 3 verbatim examples, then
  confirm the verbatims exist before quoting them anywhere.

### Writing documents

- **PRD or brief drafted from your own notes** (Gupta: 4h to under 2h; the
  #1 current PM use at 21.5%). Old workflow: blank page, 3-4 hours of
  drafting, formatting, re-structuring. AI workflow: PM decides the substance
  first (problem, target user, constraints, success metric, what's out of
  scope) as rough bullets; AI drafts against the team's template; PM edits.
  Expect 4-5 refinement rounds (Gupta's 20-60-20 rule: 20% of effort on
  giving context up front, 20% on reworking the output at the end).
- **User stories and acceptance criteria from a decided feature.** Old
  workflow: hand-writing repetitive story/criteria boilerplate. AI workflow:
  give the decided feature and edge cases, get the boilerplate, check the
  edge cases survived. AI formats; the PM has already made the decisions.
- **Spec-vs-PRD gap check** (Yang, weekly practice). Old workflow: manually
  cross-read the engineering spec against the PRD before sprint start. AI
  workflow: paste both, ask for mismatches, gaps and open questions, then
  raise the real ones with engineering. Highly verifiable: every flagged gap
  is checked in seconds.

### Communication

- **Meeting notes into a stakeholder update** (Gupta: 30 to ~10 minutes).
  Old workflow: after the meeting, rewrite scribbles into a status update.
  AI workflow: jot what matters live, let AI draft the update from notes or
  transcript per audience (exec vs team), then verify the action items:
  notetakers reliably miss informal commitments ("yeah, I can probably look
  into that next week") and misattribute who said what.
- **Long-thread distillation before weighing in** (Yang). Old workflow: read
  a 80-message Slack debate before daring to reply. AI workflow: paste the
  thread, ask for the positions, the actual point of disagreement, and open
  questions, then respond to the real issue. PM can always re-read to check.
- **Copy and announcement variations** (Yang). Old workflow: agonise over one
  version. AI workflow: generate 3 variations, hand-pick and tweak ("copy
  matters!"). The judgement of which lands with the audience stays human.

### Research

- **Competitive and market research** (Gupta: 3h to ~30min; Rekhi runs the
  same deep-research prompt across Claude, ChatGPT and Gemini in parallel and
  compares). Old workflow: an afternoon of tab-hopping across pricing pages,
  release notes, review sites. AI workflow: a deep-research prompt with the
  specific comparison questions, then follow the cited links before repeating
  any claim; documented burns include AI citing 2021 data and missing
  acquisitions.
- **Community mining for user language** (Nika). Old workflow: rarely done at
  all. AI workflow: ask AI (Perplexity-style) how users on Reddit/forums talk
  about the problem space; feed the actual phrases into PRDs, surveys and
  positioning.

### Thinking and deciding

- **AI as critic of a draft you wrote** (Rekhi; Perri agrees: good for
  "finding holes in thinking"). Old workflow: ship the strategy doc and find
  the holes in the review meeting. AI workflow: write the draft yourself,
  then ask AI for the weakest assumptions, missing risks, and the strongest
  case against it; accept or reject each point. "AI isn't particularly good
  at drafting an entire strategy, it's surprisingly good at critiquing a
  strategy once written." Fully verifiable, and it trains judgement.
- **The opposing-agents debate** (Nika). Workflow: prompt AI to set up two
  agents with opposing views on your product decision, let them argue ~20
  rounds, then extract the strongest objections (or the minimum feature set
  that convinces the sceptic). An antidote to AI's default agreeableness.

### Prototyping

- **Idea to clickable prototype before writing the PRD** (Gupta: under an
  hour; the second-biggest demand gap: 19.8% do it, 44.4% want to). Old
  workflow: write a spec, wait for design and eng capacity, learn weeks
  later. AI workflow: vibe-code a rough prototype (Lovable, v0, Bolt), put it
  in front of a user or stakeholder, learn before committing. Caveat to
  teach: "demo value isn't user value"; a working-looking prototype is a
  conversation tool, not a validated product.

### Weak or risky for non-technical PMs (teach as "not yet")

- **One-shot strategy or vision drafting**: produces "competent but generic
  B-level strategies" (Rekhi); documented failures from shipping unedited
  output (Gupta: missed enterprise pivot, outdated data).
- **Data analysis on unfamiliar datasets**: a wrong number is hard for a
  non-technical PM to catch; weakest evidence base of all use cases; only
  14.3% of PMs let AI near prioritisation.
- **Fully outsourced research synthesis**: fabricated quotes, 20-40% of
  detail lost, and team skill atrophy ("teams lose the ability to evaluate
  AI quality when synthesis skills decline" - Torres).

## The consensus criteria for a good first activity

(a) you own the raw material, so errors are catchable; (b) output is
verifiable in minutes; (c) the task is frequent and disliked, so the saving
shows within a week; (d) AI drafts or critiques, the human decides.

**First two activities by those criteria:** (1) messy-feedback or
meeting-notes distillation (paste what you already own, get themes or an
update, spot-check); (2) AI as critic of a document you wrote. Then PRD
drafting from your own notes, then interview synthesis with the verification
discipline, then prototyping (tool learning curve).

## Course positioning notes

- The inversion to build on: PMs use AI most for output (PRDs, comms) but
  want it most for input (research, synthesis), which is exactly where
  hallucination is worst. Teaching *safe* input work is the gap.
- Differentiator: the verification and judgement layer. Nobody teaches it,
  and it is our stated belief (AI doesn't do the thinking). "Fit AI into
  your week without losing your judgement" beats another prompt list.
- Marketing hooks with evidence behind them: "told to use AI, no guidance"
  (51% vs 2%); "using AI in silence" (57%); 63% save 4+ hours/week.
- Continues from "Write Better with AI" (prompting foundations for PMs);
  demand is explicitly "beyond content creation".
