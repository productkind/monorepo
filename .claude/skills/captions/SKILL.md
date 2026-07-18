---
name: captions
description: Write well-performing captions for a single piece of non-carousel content (educational videos, B-roll, photos, announcements) posted from the productkind or Little Parrot brand account, for TikTok, Instagram, Threads, and LinkedIn, plus two founder comments (Kinga and Thomas) for Instagram, Threads, and LinkedIn. Triggers include "write a caption", "captions for this video/B-roll", "post copy for TikTok/Instagram/Threads/LinkedIn", or any caption task that is not a carousel (carousels have their own skill).
---

# Captions workflow

Turn one piece of content (an educational video, a B-roll clip, a photo, an
announcement) into ready-to-paste captions for TikTok, Instagram, Threads,
and LinkedIn, posted from the brand account, plus two founder comments per
platform (Instagram, Threads, LinkedIn) that Kinga and Thomas post to start
real conversation under it.

The platform mechanics below come from
`productkind/marketing/channels/platform-playbook-2026.md` (researched July
2026). If it is much later than that, re-verify the mechanics before
trusting them.

## Inputs to establish first

1. **Brand**: `little-parrot` or `productkind`. Infer from the source
   material and confirm in one line.
2. **The content itself**: what the video/image actually shows and says.
   Captions describe and extend what is really there; never claim something
   the clip doesn't show, and never oversell what a course or article
   delivers.
3. **Platforms**: default is all four (TikTok, Instagram, Threads,
   LinkedIn). Drop any that don't fit the piece.
4. **Destination**: where the post drives (a course, an article, the
   newsletter, nothing). This shapes the CTA and where the link lives.

## Voice and checks (all platforms)

- Write with **personal-tone-of-voice** so every caption and comment sounds
  like a person talking to a friend, not marketing copy. Use
  **productkind-tone** / **little-parrot-ai-skill-gap** for brand context.
- British English, no em dashes.
- Do a deliberate phrase-by-phrase banned-list pass (the banned words and
  phrases live in personal-tone-of-voice) on every caption AND every
  founder comment before showing the draft.
- Ground every claim in the source material; if the video shows a rough
  first attempt, the caption says so.

## Caption rules shared by all platforms

- **The first line is the hook AND the search phrase.** Captions are
  keyword-indexed (Instagram in-app search plus Google for public
  professional accounts; TikTok search; every word on Threads is
  searchable). Open with the phrase a learner would actually type ("how to
  build an app without coding"), written as a natural spoken line, never
  tag-speak or keyword stuffing.
- **CTA: payoff-anchored, never engagement bait.** Meta demotes
  comment/tag/like-bait from recommendations and LinkedIn won't promote
  posts that ask for reactions: no "comment YES", no "tag a friend", no
  giveaway mechanics. Save-asks and share-asks are safe and are what
  distribution rewards (saves and sends drive reach), so "save this for
  when you build yours" or a send-to-a-friend nudge does double duty with
  our share-ask acquisition. Follow-asks name the payoff ("follow for
  [specific promise]"), never a bare "follow for more".
- **Hashtags are categorisation, not reach.** Niche and specific only,
  never generic (#instagood, #fyp), always placed last.

## Per-platform rules

**TikTok** (no founder comments; we run one account there)

- 150-300 characters total; only the first ~80-100 show before "more", so
  hook + keyword go there.
- 3-5 hashtags: 1 broad community tag + 2-3 niche.
- A genuine question in the caption invites comments; use one when it is
  natural, never as bait.
- "Follow for more [topic] tips" and "part 2 tomorrow" CTAs are fine here
  (TikTok encourages them). Links go in the bio or a pinned comment, not
  the caption; if the post drives somewhere, draft the pinned comment too.

**Instagram** (Reels for video/B-roll)

- The Reels tab shows only ~55-60 characters, the feed ~125, and the
  opening doubles as the Google snippet: hook + search phrase inside the
  first 55 characters.
- For educational content a keyword-rich caption of roughly 100-200 words
  is an SEO asset: expand the idea in natural sentences, then CTA +
  share-ask, then 3-5 niche hashtags (hard cap 5).
- Reels distribution runs on sends and full watch-through, so a
  send-to-a-friend or save nudge fits naturally.
- Include **alt text** for the visual.

**Threads**

- Under ~200 characters, conversational; the 500-character limit is not a
  target. No fold, but the first line decides the scroll-stop.
- Exactly one topic tag (hard limit), a specific multi-word phrase typed in
  the composer, not a # pile.
- Reply depth is the strongest signal here: end on a genuine question that
  invites replies, and design the founder comments as a conversation (see
  below).

**LinkedIn** (from the productkind page)

- Hook + point inside the first ~140 characters (the "see more" fold).
  Length: whatever the idea needs up to ~2,500 characters; LinkedIn is the
  one platform where substantive length outperforms, but a short post that
  says one thing well beats a padded one.
- No hashtags.
- Write for dwell and saves: a concrete lesson, checklist, or how-to people
  keep. Evergreen holds; LinkedIn resurfaces relevant posts for weeks.
- Page reach is structurally weak (~2% of followers), which is exactly why
  the founder comments below are not optional here.
- If the post drives to a link, put it in Kinga's first comment rather
  than the post body, and say so in the post ("link in the comments").

## Founder comments (Instagram, Threads, LinkedIn)

Two comments per post, one from Kinga and one from Thomas, drafted with the
captions and posted **within the first hour**. Early distinct commenters
are the amplification trigger on LinkedIn, and early engagement velocity
drives Instagram and Threads distribution.

Rules:

- **Each comment adds something the caption doesn't**: a behind-the-scenes
  detail, a mistake made along the way, a concrete example or tip, or a
  genuine question that opens replies. If a comment could sit under any
  post, it is too generic; rewrite it.
- **Never fake praise.** No "Love this!", no cheering for our own post.
  Semantic ranking treats generic or off-topic comments as pod behaviour
  and downweights the post, and readers can smell it. Kinga and Thomas are
  transparently the makers; they write as the makers ("we cut this section
  three times before it made sense"), not as fans.
- **Both comments follow personal-tone-of-voice.** Give Thomas's comment
  the practical or technical angle so the two don't read as the same
  person twice.
- **On Threads, write them as a chain**: Kinga comments on the post,
  Thomas replies to Kinga (or the other way round), because back-and-forth
  reply depth is what Threads rewards.
- **On LinkedIn**, 1-3 substantive sentences each; if the link lives in
  Kinga's comment, her comment carries the link plus one real sentence, not
  the link alone.
- Comments go through the same banned-list pass as captions.

## Output

Write one `captions.md` into the piece's folder under
`productkind/marketing/content/` (create the folder per the filing rules in
`productkind/marketing/README.md` if the piece doesn't have one). Structure:

- Header: brand, source material, destination link.
- One section per platform: the caption ready to paste, alt text
  (Instagram/LinkedIn), hashtags/topic tag included in place, plus the
  pinned comment (TikTok, if any) and the two founder comments labelled
  **Kinga** and **Thomas**.
- A short posting checklist at the end: founder comments go up within the
  first hour; reply to every real commenter in that window too (it is the
  cheapest measured engagement lift on every platform); TikTok link goes in
  the pinned comment; Threads topic tag is typed in the composer.

Show the draft to Kinga for approval before anything is posted.
