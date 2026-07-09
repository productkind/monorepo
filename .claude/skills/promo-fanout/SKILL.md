---
name: promo-fanout
description: Turn one Little Parrot campaign brief into channel-ready promotional drafts for LinkedIn, Substack, Slack communities, Discord, email lists, WhatsApp, Reddit, and Circle communities. Use when promoting a course, offer, event, or partnership across multiple channels at once. Triggers include "fan out this campaign", "promote across channels", "write the SheBuilds posts", or any multi-channel promotion task.
---

# Promo fanout

Take one campaign brief and produce per-channel drafts, each shaped to its channel's
rules. The goal is to reduce the user's work to a final edit and a click. This is
acquisition-critical work: paid users sharing free-course links is Little Parrot's
primary growth channel, so share-asks are the point, not decoration.

## Inputs

1. **The brief.** Either `little-parrot/marketing/campaigns/<slug>/brief.md`, or
   details the user gives directly. If the brief is missing fields, ask only for the
   ones you genuinely need (offer, link, ask, deadline). Don't interrogate.
2. **The channel registry:** `productkind/marketing/channels/README.md`. Read it every
   run. It defines which channels exist, their format and self-promo rules, and each
   channel's `ref` param. Only generate for channels listed as active and, if the
   brief names target channels, only those.

## Process

1. Read the brief and the channel registry.
2. Confirm the target channel list (brief's "Channels to target", else all active
   channels). If a targeted channel still has critical `TO FILL` rules (especially
   Slack/Reddit/WhatsApp posting rules), flag it and draft conservatively
   (value-first, link as a footnote) rather than guessing the rules.
3. For each target channel, write one draft applying:
   - that channel's format and length from the registry,
   - the relevant existing skills (see below),
   - the shared copy rules (below).
4. Append the channel's `ref` tag to every link. If the channel's ref param is
   `none` (e.g. WhatsApp, Reddit), use the plain link with no tag, so the message
   doesn't read as promotional.
5. Write each draft to `little-parrot/marketing/campaigns/<slug>/<channel>.md`:
   - **LinkedIn:** two drafts, `linkedin-personal.md` (Kinga, founder voice, first
     person) and `linkedin-company.md` (productkind page, "we" voice).
   - **Substack:** `substack-note.md` (short, from the profile). Add
     `substack-post.md` (long-form, to the publication) only if the brief warrants it.
   - **Slack, WhatsApp, Reddit:** one shared draft each (`slack.md`, `whatsapp.md`,
     `reddit.md`).
   - **Discord:** `discord.md`. **Geek Girls email:** `ggpt-email.md`.
     **Circle:** `pwit.md`. **Instagram:** `instagram.md`.
6. **Only if** the campaign has a genuine within-platform sequence (e.g. two
   LinkedIn posts to space days apart, or a Substack Note then a full post), write
   `little-parrot/marketing/campaigns/<slug>/posting-plan.md` describing that
   sequence: what to post first, what follows, and the gap between. Do not write a
   flat cross-channel inventory; where to post, the asset, ref tag and per-channel
   cautions belong in each draft's own header, not here. If every channel is a single
   standalone post, skip this file. If a shared TODO spans drafts (e.g. a date to
   confirm and add to several), note it here too, or in the affected draft headers.
7. Tell the user what you produced and which channels you skipped or drafted
   conservatively, and why.

## Apply these existing skills

- **`linkedin-post`** for LinkedIn posts and Substack Notes (hook, structure, openings).
- **`personal-tone-of-voice`** for anything written in the founder's voice (LinkedIn,
  Substack, WhatsApp, Reddit).
- **`little-parrot-ai-skill-gap`** for framing and mission context.
- **`little-parrot-email`** when a channel is an HTML email send.
- **`productkind-tone`** as the fallback warmth/clarity baseline.

## Shared copy rules (non-negotiable)

- **No em dashes. British English.** This is a hard rule for all Little Parrot copy.
- **Frame around using AI to your advantage, never around software development.** The
  goal is women building their own idea or business with AI, not becoming developers
  or engineers. Avoid the coding/CS-history angle and "no code needed" type taglines.
  "With AI, you can build it yourself" lands the empowerment without the dev framing.
- Don't include pricing in promotional posts. The landing page does that work.
- Describe experiences, not features ("you get", "you can").
- Thank partners by name.
- One sentence of Little Parrot context is enough for a new audience.
- Frame around the learner's win and the deadline, not "look at us". This is what
  makes the promotion feel generous rather than boastful.
- **In a community Kinga belongs to (the Geek Girls email, WhatsApp, Circle, the
  SheBuilds Discord), write as a member, not a brand.** Open by grounding it in her
  own experience ("I took part last year and really valued it"), then share the news
  plainly. No marketing hooks or vague softeners like "a quick one I thought you'd
  appreciate" or "I think a few of you will be glad to hear this", they read as a
  mass mailshot, not a personal note.
- Sign off ("Kinga, Tamas & Little Parrot 💛") only where the channel expects it
  (Discord, email). Social posts and community messages don't sign off.
- **When the same message goes to several channels, vary small surface details** (a
  different emoji/heart colour, a reworded line) so reposts don't read as an obvious
  copy-paste. Dropping the ref tag is also a deliberate lever to make a post feel
  less promotional (e.g. WhatsApp, Reddit, and a Substack Note where wanted).

## Channel-specific reminders

- **LinkedIn:** 90 to 200 words, no hashtags, end on a reframe or question. Two
  drafts: personal (Kinga, first person) and company (productkind, "we").
- **Substack:** Notes are reflective; a full post is long-form. Less salesy, more thinking.
- **Instagram:** company account, "we" voice, warm. The visual carries the post;
  the caption is a short hook plus context. Links aren't clickable in captions, so end
  on "link in bio" (or note a Story link sticker). A few relevant hashtags are fine.
- **Discord:** emoji section headers, 👉 links, warm sign-off. Match the existing
  `*-discord-announcement.md` files.
- **Slack communities:** one shared draft, short and value-first. The user posts it
  into whichever channels allow a link, so no per-community variants.
- **Geek Girls email:** plain text, no HTML template. Subject line plus a short, warm
  body written like a personal note from a member, opening from Kinga's own
  experience (see the member-channel rule above). You send it by hand to the list.
- **WhatsApp:** one shared draft, one short message, no markdown headers, one clean
  inline link. Sharing is welcome when it serves the members, so lead with their win.
  Conversational but in complete sentences, not clipped texting fragments. Short does
  not mean dropping the subject ("Did SheBuilds last year" reads hasty; "I took part
  in SheBuilds last year" reads like a person).
- **Reddit:** one shared draft, strictest channel. Genuine value first, offer as a
  footnote, no marketing tone. Removable and ban-risky otherwise. When in doubt,
  draft a helpful comment, not an ad. You pick the subreddits.
- **Circle (Portuguese Women in Tech):** can be a touch longer than Slack; still
  community-first and generous.

## Output quality bar

Before finishing, check each draft:
1. Would the user only need to lightly edit, not rewrite?
2. Does it lead with the reader's benefit and the deadline?
3. Correct `ref` tag on every link, or a plain link where the channel's ref is `none`?
4. No em dashes, British English, no pricing?
5. Does it respect that channel's self-promo rules?
