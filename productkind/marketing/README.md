# productkind marketing

All outbound marketing for every product and publication lives here. The only exception is
communication addressed to existing Little Parrot users (for instance the monthly user
emails), which lives in `little-parrot/comms/`.

## Structure

- `content/` - every post, organised by post type:
  - `campaigns/` - occasion-driven and time-boxed pushes (events, partnerships, launches,
    raffles). Folder names carry a `YYYY-MM-` prefix because time is part of their identity.
  - `courses/` - promos sourced from courses. One folder per course, no date prefix; these
    are ongoing pools you can add to any time.
  - `articles/` - promos sourced from Thoughts articles. One folder per article.
  - `build-in-public/` - founder-journey posts about building productkind and Little Parrot.
  - `idea-backlog.md` - seeds for future content batches.
- `channels/` - everything specific to one channel: bio copy, profile assets, community
  norms (posting rules, contacts), platform research, and channel-specific writing
  guidance (e.g. `linkedin/how-to-be-authentic.md`). Cross-channel tone and generation
  workflows live in `.claude/skills/`. Create a channel folder the first time there is a
  real file for it, not before.
- `strategy/` - content strategy, audience research, and the campaign brief template.
- `calendar.md` - the single time view: planned and posted content across all of `content/`.
- `fanout.md` - how one campaign brief becomes channel-ready drafts via the
  promo-fanout skill.

## Filing rules

- **Audience decides marketing vs comms**: public posts live here; messages to existing
  users live in the product folder.
- **Occasion decides campaigns vs the genre folders**: if it has an end date or an occasion,
  it is a campaign; ongoing pools go by type. A campaign may reference pieces in the genre
  folders rather than duplicating them.
- **The reader's takeaway decides courses vs build-in-public**: if the CTA is the course,
  file under `courses/`; if the story is the point, `build-in-public/`.
- **File by what a post promotes, not where it is posted.** A course promo on Kinga's
  personal LinkedIn still lives under `courses/`.

## Piece convention

One folder per piece:

- Assets made once live at the piece root (`carousel/`, video files). Posts reference them;
  never duplicate an asset per channel.
- `posts/` holds one file per distinct caption, named by channel and account:
  `instagram-tiktok.md` when the caption is shared across channels,
  `linkedin-productkind.md` vs `linkedin-kinga.md` when accounts have their own voice.
  Split a shared file only when the captions actually diverge.
- Every post file carries frontmatter:

  ```yaml
  ---
  status: idea        # idea -> drafted -> ready -> posted | parked
  channels: [instagram, tiktok]
  account: little-parrot
  posted: 2026-07-14  # filled in when it goes out
  ---
  ```

Generating more than you post is the intended workflow: a batch with twelve ideas and four
posted pieces is a healthy batch. Unposted pieces are inventory, not failures; park them
with `status: parked` rather than deleting them.
