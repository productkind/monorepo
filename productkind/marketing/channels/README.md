# Channel registry

The places Little Parrot posts into, and the rules for each one. The promo-fanout
skill reads this file to decide which drafts to write and how to shape them.

**How to use:** keep this file current. When you join a new community or learn a
community's posting rules, add or update its block here once. Fields marked
`TO FILL` are things only you know. The more accurate this is, the less editing
you do on each draft.

**Ref params:** most channels add a `?ref=` tag to links so you can see in analytics
which channel drove a click. Some (WhatsApp, Reddit) use `none`, a plain link, so the
message doesn't read as promotional.

---

## LinkedIn

- **Type:** public social, professional
- **Audience:** mixed (peers, partners, potential learners). Non-technical women
  learning AI-assisted development are the people we most want to reach.
- **Format:** 90 to 200 words. Hook, insight, implication. No hashtags. Whitespace
  between paragraphs. End on a reframe or question, not a summary. (See the
  `linkedin-post` skill.)
- **Self-promo rules:** fine to post, but lead with the insight or the person's win,
  not the product. One sentence of Little Parrot context is enough.
- **Ref param:** `linkedin`
- **Posting from:** both, with different angles:
  - Personal profile (Kinga): https://www.linkedin.com/in/kinga-magyar/ - founder voice, first person.
  - Company page (productkind): https://www.linkedin.com/company/productkind/ - "we" voice.
- **Assets:** can attach a cover image (e.g. `linkedin-tbip-shebuilds.svg` exported to PNG)

## Substack

- **Type:** newsletter platform. Two surfaces: Notes (short) and posts (long).
- **Audience:** existing readers and Substack's network. Warmer, already curious.
- **Format:** Notes are reflective and can explore nuance and uncertainty. Posts
  are long-form. No jargon or hype either way. (See the `linkedin-post` skill,
  Substack Notes section.)
- **Self-promo rules:** your own channel, so promotion is expected, but keep it
  generous and thinking-led.
- **Ref param:** `substack`
- **Posting from:**
  - Notes from the profile: https://substack.com/@kingamagyar
  - Posts to the publication: https://productkind.substack.com/
- **Assets:** optional image

## Instagram (productkind company account)

- **Type:** visual-first public social
- **Account:** https://www.instagram.com/by_productkind/
- **Audience:** broad; women interested in building, founders, the productkind community.
- **Format:** the visual is the post (the mission image or the parrot carousel both
  work). "We" voice (company account), warm. Caption: short hook, a little context,
  then the call to action. Links are NOT clickable in captions, so the CTA is "link
  in bio" (or a Story with a link sticker). A few relevant hashtags are fine here,
  unlike LinkedIn.
- **Self-promo rules:** own account, promotion expected; keep it warm and mission-led.
- **Ref param:** `instagram` (put it on the bio link or the Story link sticker; caption
  links aren't clickable, so they can't carry a tag inline).
- **Assets:** reuse the mission visual or the parrot carousel.

## Discord (Little Parrot community)

- **Type:** our own community
- **Audience:** existing learners, mostly paid. Warm.
- **Format:** Markdown with emoji section headers, short sections, one link per
  section with a 👉 prefix. Sign off "Kinga, Tamas & Little Parrot 💛". (Match the
  monthly announcements in `little-parrot/assets/emails/*-discord-announcement.md`.)
- **Self-promo rules:** our space, links welcome.
- **Ref param:** `discord` (share-asks use `discord-share`)
- **Posting from:** Little Parrot Discord
- **Assets:** attach GIFs/PNGs inline where referenced

## Slack communities

One shared draft for all Slack communities. You know which channels allow a link, so
you post the same message into the right channel in each community yourself.

- **Audience:** women in tech and adjacent communities.
- **Format:** short, value-first. Slack rewards a clear first line; details below.
  One clean link.
- **Self-promo rules:** post only where links are welcome (you decide per community).
- **Ref param:** `slack`

## Geek Girls email list

- **Type:** community email list. Geek Girls is a Portuguese community for women in tech.
- **Audience:** Geek Girls subscribers, women in tech in Portugal.
- **Format:** a simple, plain-text email you send by hand. No HTML template. Subject
  line plus a short, warm body, written like a personal note. One clean link.
- **Self-promo rules:** you send it yourself to the list, so promotion is fine, but
  keep it warm and member-first.
- **Ref param:** `ggpt-email`

## WhatsApp groups

One shared draft for all WhatsApp groups. You post it into whichever groups it suits.

- **Audience:** members of informal women-in-tech / community groups.
- **Format:** very short, conversational, no markdown headers. Links render inline,
  so one clean link. A single message, ideally under 60 words.
- **Self-promo rules:** sharing is welcome as long as it serves the group members'
  interest, so lead with what they get, not the offer.
- **Ref param:** none (use the plain link so the message doesn't read as promotional).

## Reddit

One shared draft. You choose the subreddits and post where it fits the rules.

> Reddit is the strictest channel. Most subreddits enforce a self-promotion ratio
> (roughly 1 promotional post per ~9 normal contributions) and many ban links
> outright. Posts that read as ads get removed and can get the account banned.

- **Audience:** women learning to build with AI, beginner-builder communities.
- **Format:** a helpful post or comment first; the offer is secondary. No marketing tone.
- **Self-promo rules:** lead with genuine value, mention the free offer as a footnote,
  and check the subreddit's rules before posting.
- **Ref param:** none (use the plain link so the message doesn't read as promotional).

## Portuguese Women in Tech (Circle community)

- **Type:** Circle-hosted community for women in tech in Portugal.
- **Audience:** Portuguese Women in Tech members.
- **Format:** community post. Can be a touch longer than Slack; still community-first
  and generous. You choose the space/topic to post in.
- **Self-promo rules:** keep it member-first; share because it helps them.
- **Ref param:** `pwit`

---

## Shared copy rules (apply to every channel)

- No em dashes. British English throughout.
- Don't include pricing in promotional posts. Let the landing page do that.
- Describe experiences, not features ("you get", "you can").
- Thank partners by name (e.g. Lovable, SheBuilds organisers).
- One sentence of Little Parrot context is enough for a new audience.
- Frame around the learner's win and the deadline, not "look at us".
- Sign-offs only where the channel expects them (Discord, email). Social posts don't sign off.
