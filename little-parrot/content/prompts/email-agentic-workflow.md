## Goal
- Produce a Little Parrot HTML email that already meets the house technical, design, voice, accessibility, and inbox-presentation guidelines before you see it, instead of catching breaches by re-reading the draft yourself.

## About
- Claude Code (agent), run from the monorepo
- Little Parrot project, transactional and marketing emails (welcome, payment, cancellation, certificate, course updates, promotions, raffles, discount reminders)
- A skill-driven generate → critique → revise loop: the main agent drafts the email, an independent critic sub-agent gates it with fresh eyes, the agent revises, and only a passing email reaches you.

---

## Why this exists

The old approach was to draft an email and hand it straight back. The rules that make an email good (the brand styling, the email-client gotchas, the warm British-English voice, the do/don't list) already lived in the `little-parrot-email` skill, but the same agent that wrote the draft also judged it, and self-review misses what fresh eyes catch. A confident draft would still slip a patronising line, a second competing CTA, a `display: flex` that breaks in Outlook, or a subject line that buries the point past the mobile cut-off.

The fix mirrors the LinkedIn and course workflows: keep the rules in one place, then gate the draft with an **independent critic sub-agent** that did not write it. The writer and the judge must be different for the judge to be worth anything.

This session we also closed a real gap. The skill said plenty about the body but nothing about what actually gets an email opened (subject line, preheader, sender name) and little about skimmability, accessibility, or dark mode. We researched current best practice across three angles, kept the evidence-backed rules, dropped the folklore, and folded both the rules and the matching critic checks into the files.

---

## The pipeline

```
you ask for an email
  → [skill] little-parrot-email (+ productkind-tone, little-parrot-ai-skill-gap)   the main agent drafts
  → [agent] email-critic                                                          judges with fresh eyes, returns a verdict
  → revise on the critic's brief, re-run, ≤3 rounds
  → you receive an email that already passed, plus a short note on what was caught
```

The loop is built into the `little-parrot-email` skill (its "Evaluation Loop" section), so it runs automatically once that skill is in play. You do not orchestrate it by hand; you just ask for the email.

---

## The components

### Skills (`.claude/skills/`)
- **`little-parrot-email`**: the single source of truth for emails. Now covers, in order:
  - **Inbox Presentation** (new this session): subject line (30 to 50 chars, point in the first ~30 for mobile, clarity over curiosity, spam-trigger list, emoji default off), preheader text (always set, complement not repeat, stop "view in browser" leaking in), sender name (stable, "Little Parrot" vs "Kinga at Little Parrot"), and a note that Apple Mail Privacy Protection has made raw open rate unreliable, so judge success by clicks and course progress.
  - **Technical Requirements**: no flexbox, inline styles, self-hosted images, gradient fallbacks, and an **Accessibility & Dark Mode** subsection (new): semantic structure, `role="presentation"`, `lang="en-GB"`, alt text, never bake meaningful text into images, descriptive link text, and dark-mode handling for the black-on-white sticker look.
  - **Design Rules**: a **Built to be skimmed in nine seconds** subsection (new: lead with the point, front-load the first two words, one idea per email, bold under ~30%, CTA in the first screenful, HTML under 102KB), visual hierarchy with a CTA tap-target rule, scannable value lists.
  - **Type Scale**: the brand sizes plus readability rules (new): mobile floor, line-height, WCAG contrast including text over gradients.
  - **Tone and Copy**: the voice, the do/don't list, and a **Plain language** subsection (new: reading age ~9, short sentences, define a term inline on first use, house terminology).
  - **Before Sending**: fact and link checks, plus new checks for subject/preheader, contrast and dark mode, and the 102KB clip limit.
- **`productkind-tone`** and **`little-parrot-ai-skill-gap`**: applied alongside for the educational voice and the company context.

### Agent (`.claude/agents/`)
- **`email-critic`** (read-only). Has **fresh eyes** (it did not write the draft) and a **single job**: judge a drafted email against the guidelines and return a verdict a writer can act on. It does not rewrite the email. Its rubric is the `little-parrot-email` and `productkind-tone` skills (preloaded into its context via the `skills:` frontmatter field), and it reads a recent email from `little-parrot/assets/emails/` at runtime to check the current structure. It judges both the copy and the markup, because in email a layout bug ships as badly as a tone slip. Three tiers:
  - **Tier 1, hard fails (binary):** inbox presentation (subject/preheader length and leaks), copy bans (em dashes, non-British English, patronising language, "just", doubt words, count words, subscription pitch to paid subscribers, untrue claims), and technical breakers (`display: flex`, hotlinked icons, gradient with no solid fallback, competing CTA buttons, missing footer essentials, malformed merge fields, missing tracking params, meaningful text baked into an image, missing alt, non-descriptive link text).
  - **Tier 2, structure, design, and rendering:** standard structure and type scale, one highlight box, cards not buttons, skimmability, CTA tap target, body type, contrast, accessibility scaffolding, dark mode, clip-limit risk.
  - **Tier 3, correctness, honesty, and audience fit (most important):** leads with user value, logically consistent actions, no duplication, voice, audience fit, plain language, conversion-email "no pressure" rules, merge fields and per-recipient links that resolve for everyone.
  - It also returns a **"To verify with the user / product"** list, because a read-only critic cannot confirm a live button label, URL, or merge-field value.

---

## How to run it

1. **Ask for the email.** Say what kind it is (welcome, certificate, promo, raffle, cancellation, etc.) and give the facts it depends on.
2. The agent drafts using the skill (plus tone and context skills), then **does not show you the draft**. It spawns `email-critic` with the full HTML, the subject line, and the preheader text, naming the email type.
3. **PASS** → you get the final email plus a short note on what the critic checked and anything still to verify. **NEEDS REVISION** → the agent applies the critic's brief, re-runs the critic, up to 3 rounds. After 3 rounds, it surfaces the best draft and names anything unresolved honestly.

The same loop works as a **review pass on an existing email**: hand the critic an email you already wrote to get a verdict before sending.

---

## The evaluation loop

- The critic returns a structured verdict: **PASS** or **NEEDS REVISION**, what the reader gets in one sentence, every issue with the offending text or markup quoted and a concrete fix, a "to verify" list, and a prioritised revision brief.
- A clean **PASS** is a valid result; the critic is told not to invent problems to look thorough. An email clean on tone but broken on rendering still fails, because it has to arrive intact.
- You see the **final email plus a short summary**, not every round, unless you ask for the rounds.

---

## How the rules were researched (this session)

The inbox-presentation, skimmability, and accessibility additions came from three parallel research passes against authoritative sources (Nielsen Norman Group, Litmus, Email on Acid, WCAG/WebAIM, GOV.UK content design, Campaign Monitor, Gmail and Microsoft sender guidelines). Each finding was tagged evidence-backed or folklore, and only the evidence-backed rules went into the skill.

**Deliberately left out as folklore:** "best day/time to send" (the studies contradict each other and rest on open-time data that Apple MPP has corrupted), "single CTA = 371% clicks", "emoji = +56% opens" (controlled tests show the opposite, with higher unsubscribes), "my vs your = 90% lift", and "iOS Mail auto-enlarges body text under 14px". The underlying principles are kept where sound; the invented numbers are not.

**The honest framing baked into the skill:** open rate is no longer a trustworthy absolute metric, so we optimise the levers that matter (clarity, deliverability, a clear next action) and measure success by clicks and course progress, not an inflated open figure.

---

## Design principles (what keeps it maintainable)

- **Rules live once, in the skill. Method lives in the critic.** The deciding question: "if I changed this, would I have to remember to change it here too?" If yes, it is a rule and belongs in the skill, which the critic reads. If no, it is judging method and is fine in the critic file. Specific values and lists are referenced, never copied; the tier structure and how-to-look-for-it instructions are the critic's own.
- **Preload the rubric, don't fetch it.** The critic names its skills in the `skills:` frontmatter, so their full text is injected at startup, identically every run. This is why the critic body holds no copied rules to drift.
- **Feed misses back into the rubric, not the conversation.** When something slips through, the fix goes into the skill (the rule) and the critic (the detection method). Each catch makes the gate permanently better because the fix lives in the files.
- **Model choice is a consistency-vs-freshness trade.** The critic runs on the `opus` alias, which auto-upgrades to the newest Opus. Pinning a full ID would hold judgments stable run-to-run at the cost of manual bumps. The alias is the current call.

---

## What still needs a human

The loop is a strong net, not a replacement for judgement.

- **The critic is read-only and cannot run the product.** It cannot confirm a live button label, a real URL, or a populated merge field; those land on its "to verify" list for you to check before sending.
- **Brand and ops calls.** Whether to allow an emoji in a subject line, what the actual From name is, and whether the 12px footer is acceptable are decisions for you. The skill records the recommended defaults; you can override them.
- **The real test is the send.** Preview in dark mode and with images off, and watch clicks and course progress over time, not the inflated open number.

---

## Keeping memory and the skills in sync

When a correction comes up while writing, it belongs in **two** places:

- **Memory** (`~/.claude/.../memory/`) so the main agent applies it on any task.
- **The skill or the critic file** so the automated gate applies it too. The critic never sees memory, so a rule that lives only in memory will not reach it.

A rule in the critic but not the skill still works, just less efficiently: the gate catches what the writer should have avoided, costing a revise round. Putting it in the skill means the writer avoids it up front. Memory teaches the agent; the skill and critic files teach the pipeline.
