# Marketing fanout

A small system so promoting a campaign across many channels takes minutes, not
an afternoon, and never starts from a blank page.

## The idea

You write the message once, as a short brief. The promo-fanout skill turns that one
brief into channel-ready drafts (LinkedIn, Substack, Slack, Discord, email,
WhatsApp, Reddit, Circle), each shaped to that channel's norms and carrying its own
analytics tag. Your job shrinks to the two things only you can do: a final edit, and
hitting publish.

## Files

- **`productkind/marketing/channels/README.md`** — the registry of where you post
  and the rules for each place. Maintained once, reused every campaign. Keep it
  current.
- **`productkind/marketing/strategy/brief-template.md`** — the 5-minute brief you
  fill in per campaign.
- **`content/campaigns/<slug>/`** — one folder per campaign. Holds the filled
  `brief.md`, the generated per-channel drafts, and a `posting-plan.md` checklist.
- **`productkind/marketing/strategy/`** — the strategy layer above campaigns: the
  audience brief, Kinga's belief interview, and the content strategy that monthly
  calendars and idea-testing run on. See its README for the workflow.

## Workflow

1. **Once:** finish filling the `TO FILL` fields in the channel registry
   (`productkind/marketing/channels/README.md`): community rules, handles, timing.
   This is the only setup, and it pays off every campaign.
2. **Per campaign:** copy `strategy/brief-template.md` to
   `content/campaigns/<slug>/brief.md` and fill it in.
3. Run the **promo-fanout** skill (tell Claude the campaign slug, or just say
   "fan out the <slug> campaign").
4. It writes one draft per target channel into `content/campaigns/<slug>/`. Each draft's
   header says where to post it, the asset, and any caution. If a channel needs a
   real sequence (e.g. two LinkedIn posts spaced days apart), it also writes a short
   `posting-plan.md` for that sequence. Otherwise there's no plan file to read.
5. Edit, then post. Reuse the ref tags to see which channels actually drive signups.

## Why this makes self-promotion less painful

- **No blank page.** You react to a draft instead of generating one.
- **No per-channel rework.** Tone, length, link tags and community rules are applied for you.
- **No decisions in the moment.** The recipe is fixed, so you're not re-litigating
  "how do I word this for Slack" each time.
- **The message is generous by design.** Every draft leads with the learner's win
  and the deadline, which is the version of promotion that doesn't feel like bragging.
