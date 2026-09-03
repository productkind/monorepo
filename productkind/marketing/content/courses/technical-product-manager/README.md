# Technical Product Manager: eight video scripts

Eight short narrated videos for the technical product manager experiment, built
from the research in
`productkind/ai-research/pm-technical-fluency/`. Every script opens on a
sentence a real product manager wrote about their own job, then teaches one
thing the viewer can use in their next meeting.

- **Brand:** Little Parrot. Narration and screen recording, nobody on camera.
- **Lead channel:** LinkedIn native video, 77 to 91 seconds.
- **Cross-posts:** TikTok, Instagram Reels, YouTube Shorts, using the shorter
  cut described in each script.
- **Destination:** the waitlist page,
  `https://littleparrot.app/guides/technical-product-manager`
  ("Become a Technical Product Manager Without Becoming an Engineer").

## Why these eight

The research found six validated needs and five opportunity territories
([synthesis](../../../../ai-research/pm-technical-fluency/pm-technical-fluency-opportunity-synthesis-2026-08.md)).
The waitlist page turns those into a seven-step learning path. Scripts 2 to 8
each cover one step of that path, so the video and the page promise the same
thing. Script 1 covers the need that appears in every source, taking part in a
technical conversation, and works as the pinned or first post.

| # | Script | Hook, from the research | Learning path step |
|---|---|---|---|
| 1 | [Say it back before you agree](video-1-say-it-back/script.md) | "sometimes it does feel like I'm the least knowledgeable person in the room" | (umbrella) |
| 2 | [Follow one click through your product](video-2-follow-one-click/script.md) | "what each component does and how they interact" | 1. How a web application works |
| 3 | [Can our APIs do that?](video-3-can-our-apis-do-that/script.md) | "Do the APIs we currently use support the functionality we want to build?" | 2. How does an API work |
| 4 | [Where is the change right now?](video-4-where-is-the-change/script.md) | "nodding along in standups, pretending to get it" | 3. Deployment, staging vs production |
| 5 | [A screenshot is not a bug report](video-5-not-a-bug-report/script.md) | "A customer is asking about this error message" | 4. Bug triage |
| 6 | [Answer the number question yourself](video-6-answer-the-number/script.md) | "being blocked by analytics on a business decision" | 5. SQL and product analytics |
| 7 | [Four questions before you commit](video-7-four-questions/script.md) | "why a 'simple' feature isn't simple for engineering" | 6. Technical debt and feasibility |
| 8 | [Your prototype is not the product](video-8-prototype-not-product/script.md) | "Prototyping ≠ Production" | 7. AI prototyping |

The exact quotes and their sources are in the
[evidence ledger](../../../../ai-research/pm-technical-fluency/non-technical-pm-technical-needs-validation-2026-08.md#a-strictly-eligible-evidence-used-for-ranking)
and the
[needs research](../../../../ai-research/pm-technical-fluency/non-technical-pm-technical-needs-2024-2026.md#1-top-recurring-technical-needs).
No script names the person who wrote the sentence, the same way the waitlist
page doesn't.

## Choices made

- **Nobody on camera.** Every script is narration over screen recording and
  on-screen text, which suits the Little Parrot narrated video pipeline in
  `little-parrot/content/video/`. Worth knowing that our own platform research
  found person-present content outperforms brand content on these channels
  ([playbook](../../../channels/platform-playbook-2026.md)), so treat the reach
  from this set as a floor rather than a fair test of the niche.
- **LinkedIn first.** All 16 people in the strict validation sample were found
  on LinkedIn or in a private product manager Slack, which is also where we
  looked, so treat it as the best starting point rather than proof the audience
  is only there.
- **One demo product across all eight: the Little Parrot app itself.** It gives
  the set a consistent look, and it's a product we can record without asking
  anyone's permission. Never record an employer's or a client's product for
  these.

## Format

Each script has a beat table with four columns: the beat and its timing, the
narration, the visual, and the on-screen text.

- **On-screen text carries the hook.** Most people watch the first seconds
  muted, so the first card says the whole hook sentence.
- **Burned-in subtitles for the whole video.** TikTok and YouTube index spoken
  words and on-screen text as well as the caption, and each script names the
  search phrase it's built around.
- **The short cut** at the end of each script says which beats to drop for the
  40 to 50 second TikTok, Reels and Shorts version.
- **Timings are derived, not guessed.** Every beat's range comes from its word
  count at 2.95 words per second, which is the measured pace of the existing
  narrated videos in `little-parrot/content/video/`. Change the narration and
  the timings need recalculating.

## Posting notes

- **Order:** 1, 2, 5, 4, 7, 3, 6, 8. Script 1 sets up the whole idea, 2 is the
  most searched question, and 5 gives the fastest thing to try tomorrow. Pin 1.
- **Cadence:** two a week over four weeks, so the experiment has a readable
  result before the next batch.
- **LinkedIn:** the waitlist link goes in the first comment, not the post body.
- **TikTok:** no bio link on the account yet
  ([channel note](../../../channels/tiktok/profile.md)), so the URL is spoken
  and shown on screen, and repeated in a pinned comment.
- **Captions are not in this folder.** Once a video is cut, the `captions`
  skill writes the per-channel captions into a `posts/` folder next to the
  script.
- **UTM for the waitlist link:**
  `https://littleparrot.app/guides/technical-product-manager?utm_source=linkedin&utm_medium=social&utm_campaign=technical-product-manager&utm_content=video-1`
  Swap `utm_source` for `tiktok`, `instagram` or `youtube` and `utm_content` for
  the video number. The page already reads all four parameters and saves them
  with the signup.

## What the videos claim

Each video teaches the one thing it demonstrates, and the CTA says the learning
path is still being built, which is true. Nothing in the set promises that a
viewer will read their team's code, judge an estimate on their own, or move
into an engineering role.
