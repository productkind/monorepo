---
name: promo-fanout
description: Turn one Little Parrot campaign brief into channel-ready promotional drafts for LinkedIn, Substack, Slack communities, Discord, email lists, WhatsApp, Reddit, and Circle communities. Use when promoting a course, offer, event, or partnership across multiple channels at once. Triggers include "fan out this campaign", "promote across channels", "write the SheBuilds posts", or any multi-channel promotion task.
---

# Promo fanout

Take one campaign brief and produce per-channel drafts, each shaped to its channel's rules. The goal is to reduce the user's work to a final edit and a click. This is acquisition-critical work: paid users sharing free-course links is Little Parrot's primary growth channel, so share-asks are the point, not decoration.

## Inputs

1. **The brief.** Either `productkind/marketing/content/campaigns/<slug>/brief.md`, or details the user gives directly. If the brief is missing fields, ask only for the ones you genuinely need (offer, link, ask, deadline). Don't interrogate.
2. **The channel registry:** `productkind/marketing/channels/README.md`. Read it every run. It defines which channels exist, their format and self-promo rules, and each channel's `utm` param. Only generate for channels listed as active and, if the brief names target channels, only those.

## Process

1. Read the brief and the channel registry.
2. Confirm the target channel list (brief's "Channels to target", else all active channels). If a targeted channel still has critical `TO FILL` rules (especially Slack/Reddit/WhatsApp posting rules), flag it and draft conservatively (value-first, link as a footnote) rather than guessing the rules.
3. For each target channel, write one draft applying:
   - that channel's format and length from the registry,
   - the relevant existing skills (see below),
   - the shared copy rules (below).
4. Append the channel's `utm` tag to every link. If the channel's utm param is `none` (e.g. WhatsApp, Reddit), use the plain link with no tag, so the message doesn't read as promotional.
5. Write each draft to `productkind/marketing/content/campaigns/<slug>/<channel>.md`:
   - **LinkedIn:** two drafts, `linkedin-personal.md` (Kinga, founder voice, first person) and `linkedin-company.md` (productkind page, "we" voice).
   - **Substack:** `substack-note.md` (short, from the profile).
   - **Slack, WhatsApp, Reddit:** one shared draft each (`slack.md`, `whatsapp.md`, `reddit.md`).
   - **Discord:** `discord.md`. **Geek Girls email:** `ggpt-email.md`. **Circle:** `pwit.md`. **Instagram:** `instagram.md`.
6. **Only if** the campaign has a genuine within-platform sequence (e.g. two LinkedIn posts to space days apart, or a Substack Note then a full post), write `productkind/marketing/content/campaigns/<slug>/posting-plan.md` describing that sequence: what to post first, what follows, and the gap between. Do not write a flat cross-channel inventory; where to post, the asset, utm tag and per-channel cautions belong in each draft's own header, not here. If every channel is a single standalone post, skip this file. If a shared TODO spans drafts (e.g. a date to confirm and add to several), note it here too, or in the affected draft headers.
7. Run the evaluation loop below on every draft, then tell the user what you produced and which channels you skipped or drafted conservatively, and why.

## Apply these existing skills

- **`linkedin-post`** for LinkedIn posts and Substack Notes (hook, structure, openings).
- **`personal-tone-of-voice`** for anything written in the founder's voice (LinkedIn, Substack, WhatsApp, Reddit).
- `productkind/little-parrot-context.md` (read with the Read tool) for framing and mission context.
- **`productkind-tone`** as the fallback warmth/clarity baseline.

## Shared copy rules (non-negotiable)

- Apply the **language-rules** skill in full, and invoke it if it is not already loaded. It is the single source for the banned list and all shared language rules.
- **Frame around using AI to your advantage, never around software development.** The goal is women building their own idea or business with AI, not becoming developers or engineers. Avoid the coding/CS-history angle. "With AI, you can build it yourself" lands the empowerment without the dev framing.
- Describe experiences, not features ("you get", "you can").
- Thank partners by name.
- One sentence of Little Parrot context is enough for a new audience.
- Frame around the learner's win and the deadline, not "look at us". This is what makes the promotion feel generous rather than boastful.
- **In a community Kinga belongs to (the Geek Girls email, WhatsApp, Circle, the SheBuilds Discord), write as a member, not a brand.** Open by grounding it in her own experience (e.g. "I took part last year and really valued it"), then share the news plainly. No marketing hooks or vague softeners like "a quick one I thought you'd appreciate" or "I think a few of you will be glad to hear this", they read as a mass mailshot, not a personal note.
- Sign off only where the channel expects it (email). Social posts and community messages don't sign off.
- **When the same message goes to several channels, vary small surface details** (a different emoji/heart colour, a reworded line) so reposts don't read as an obvious copy-paste. Dropping the utm tag is also a deliberate lever to make a post feel less promotional.

## Channel-specific reminders

- **LinkedIn:** 90 to 200 words, no hashtags, end on a reframe or question. Two drafts: personal (Kinga, first person) and company (productkind, "we").
- **Substack:** Notes are reflective, less salesy, more thinking.
- **Instagram:** company account, "we" voice, warm. The visual carries the post; the caption is a short hook plus context. Links aren't clickable in captions, so end on "link in bio" (or note a Story link sticker). Use a few relevant hashtags.
- **Discord:** value-first, friendly, conversational, clear paragraphs.
- **Slack communities:** one shared draft, short and value-first. The user posts it into whichever channels allow a link, so no per-community variants.
- **Geek Girls email:** plain text, no HTML template. Subject line plus a short, warm body written like a personal note from a member, opening from Kinga's own experience (see the member-channel rule above). Kinga sends it by hand to the list.
- **WhatsApp:** one shared draft, one short message, no markdown headers. Sharing is welcome when it serves the members, so lead with their win. Conversational but in complete sentences, not clipped texting fragments. Short does not mean dropping the subject ("Did SheBuilds last year" reads hasty; "I took part in SheBuilds last year" reads like a person).
- **Reddit:** one shared draft, strictest channel. Genuine value first, offer as a footnote, no marketing tone. Removable and ban-risky otherwise. When in doubt, draft a helpful comment, not an ad. You pick the subreddits.
- **Circle (Portuguese Women in Tech):** can be a touch longer than Slack, include a title for the post; still community-first and generous.

## Output quality bar

Before finishing, check each draft:
1. Would the user only need to lightly edit, not rewrite?
2. Does it lead with the reader's benefit and the deadline?
3. Correct `utm` tag on every link?
4. Checked against the language-rules banned list?

## Evaluation loop (run this every time, before showing the user)

The drafts are never returned to the user until an independent critic has gated their language. Self-review misses what fresh eyes catch, so the writer and the judge must be different. Route each draft to the critic whose rubric matches its voice, and never chain tone-of-voice-critic after a format critic:

1. **Draft** every channel file following this skill and run the output quality bar above.
2. **Critique.**
   - `linkedin-personal.md` and any Substack draft go to the `linkedin-critic` agent (Agent tool), one call per draft, saying which it is. These are written as Kinga, which is the rubric that critic judges by.
   - Every other draft, including `linkedin-company.md` (the "we" voice would wrongly fail linkedin-critic's only-Kinga test), goes to the `tone-of-voice-critic` agent in ONE batched call: pass the file paths and one line per draft naming its channel and voice.
   - Do not show any draft to the user yet.
3. **Read the verdicts.** All PASS → show the user the drafts, with a short note on what the critics checked. Any NEEDS REVISION → apply the revision brief to the named drafts, then re-run that critic on the revised drafts only. Repeat, up to **3 rounds**.
4. **After 3 rounds**, if issues remain, show the best drafts and name the unresolved items honestly. Never hide them or ship around them.