# Technical Product Manager: eight video scripts

Eight 40-second videos for the technical product manager experiment, built from
the research in `productkind/ai-research/pm-technical-fluency/`. Each one opens
on a situation the viewer recognises from their own week, then shows what
changes once they can handle it.

- **Brand:** Little Parrot. Narration and screen recording, nobody on camera.
- **Lead channel:** LinkedIn native video. One 36 to 45 second cut works on
  every channel, with a CTA swap for TikTok, Reels and Shorts.
- **Destination:** the waitlist page,
  `https://littleparrot.app/guides/technical-product-manager`
  ("Become a Technical Product Manager Without Becoming an Engineer").

## The shape of every script

| Section | Job |
|---|---|
| Hook | The situation, stated so the viewer thinks "that's me" inside three seconds. Always about them, never a technical term. |
| The moment | The specific version of that situation, so they know we've been in it. |
| Why it costs them | What the situation actually costs. One beat, no more. |
| The shift | The thing that changes it, named but not taught. |
| The transformation | What their week looks like on the other side. |
| The payoff | One line they'd repeat to a colleague. |
| Comment prompt | One question about their own team, which is what earns replies. |
| CTA | Who the learning path is for, and the link. |

Five rules the set follows:

- **No teaching sequences.** Terms get named on screen and shown in a
  recording; the definitions belong in the course. Two earlier drafts of
  scripts 4 and 7 explained six delivery stages and technical debt in the
  video, and that is exactly where a viewer leaves.
- **Nothing holds on screen for more than three seconds.** The Visual column
  lists every change in order, so a three-part visual is three cuts. Each
  script has a cut cadence note.
- **No video names a step of the learning path.** The path is still being
  built and the order may change, so the CTA describes who it's for and
  nothing more.
- **Every hook opens differently.** Eight videos that all start "have you
  ever" read as a template by the third one, and the first two words are the
  ones a muted viewer reads, so the specific situation goes first. Hook cards
  are six words or fewer, because that's what can be read in a second and a
  half.
- **Every video ends on a question before the link.** Sends and comments are
  what carry a post to non-followers on both platforms, and an institutional
  sign-off earns neither.

## The eight

| # | Script | Hook | Need it comes from |
|---|---|---|---|
| 1 | [Nodding along in stand-up](video-1-say-it-back/script.md) | "You've nodded along in a stand-up, hoping nobody asks you a follow-up question." | Taking part in technical conversations |
| 2 | [You only know the screens](video-2-follow-one-click/script.md) | "So how does your product actually work?" You can demo every screen, and that's where it stops. | How the product fits together |
| 3 | [The dreaded question](video-3-can-our-apis-do-that/script.md) | "Ever been asked the dreaded question? Can our systems already do this?" | APIs, integrations and data flow |
| 4 | ["It's done." Two weeks later, still not live](video-4-where-is-the-change/script.md) | "'It's done.' Two weeks later, your stakeholder still can't see it." | The route from a change to users |
| 5 | ["Any idea what this is?"](video-5-not-a-bug-report/script.md) | "You forward a customer's screenshot to engineering. Any idea what this is?" | Investigating before escalating |
| 6 | [Waiting days for a number you need tomorrow](video-6-answer-the-number/script.md) | "You need a number for tomorrow's meeting. Analytics will have it next week." | Product data questions |
| 7 | [You agreed the date. Then came the hard part](video-7-four-questions/script.md) | "Someone calls your feature a small change. You agree a date." | Technical consequences before commitment |
| 8 | ["Can we just ship it?"](video-8-prototype-not-product/script.md) | "You built it with AI, showed it around, and somebody asked if we can just ship it." | Prototypes and where production starts |

**The hooks are ours, not quotes.** They're reformulated from the situations
product managers described in the
[evidence ledger](../../../../ai-research/pm-technical-fluency/non-technical-pm-technical-needs-validation-2026-08.md#a-strictly-eligible-evidence-used-for-ranking)
and the
[needs research](../../../../ai-research/pm-technical-fluency/non-technical-pm-technical-needs-2024-2026.md#1-top-recurring-technical-needs),
written the way a viewer would say them rather than the way a LinkedIn post
did. No script names or quotes a real person.

## Choices made

- **Nobody on camera.** Narration over screen recording and on-screen text,
  which suits the Little Parrot narrated video pipeline in
  `little-parrot/content/video/`. Worth knowing that our own platform research
  found person-present content outperforms brand content on these channels
  ([playbook](../../../channels/platform-playbook-2026.md)), so treat the reach
  from this set as a floor rather than a fair test of the niche.
- **LinkedIn first.** All 16 people in the strict validation sample were found
  on LinkedIn or in a private product manager Slack, which is also where we
  looked, so treat it as the best starting point rather than proof the audience
  is only there.
- **One demo product across all eight: the Little Parrot app itself.** It gives
  the set a consistent look and we can record it without asking anyone's
  permission. Never record an employer's or a client's product for these.

## Format notes

- **On-screen text carries the hook**, because most people watch the first
  seconds muted. The first card says the whole hook.
- **Burned-in subtitles throughout.** TikTok and YouTube index spoken words and
  on-screen text as well as the caption, and each script names the search
  phrase it's built around.
- **Timings are derived, not guessed.** Every beat's range comes from its word
  count at 2.95 words per second, the measured pace of the existing narrated
  videos. Change the narration and the timings need recalculating.

## Posting notes

- **Order:** 1, 5, 4, 7, 2, 8, 3, 6. Scripts 1, 5 and 4 have the most
  recognisable situations, so they go first. Pin 1.
- **Cadence:** two a week over four weeks, so the experiment has a readable
  result before the next batch.
- **LinkedIn:** the waitlist link goes in the first comment, not the post body.
- **TikTok:** no bio link on the account yet
  ([channel note](../../../channels/tiktok/profile.md)), so the URL is spoken
  and shown, and repeated in a pinned comment.
- **Captions are not in this folder.** Once a video is cut, the `captions`
  skill writes the per-channel captions into a `posts/` folder next to the
  script.
- **UTM for the waitlist link:**
  `https://littleparrot.app/guides/technical-product-manager?utm_source=linkedin&utm_medium=social&utm_campaign=technical-product-manager&utm_content=video-1`
  Swap `utm_source` for `tiktok`, `instagram` or `youtube` and `utm_content`
  for the video number. The page reads all four parameters and saves them with
  the signup.

## What the videos claim

Each video shows one thing changing and the CTA says the path isn't open yet,
which is true. Nothing here promises a viewer will read their team's code,
judge an estimate alone, or move into an engineering role.
