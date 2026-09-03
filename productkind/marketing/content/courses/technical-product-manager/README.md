# Technical Product Manager: eight video scripts

Eight 45-second videos for the technical product manager experiment, built from
the research in `productkind/ai-research/pm-technical-fluency/`. Each one opens
on a situation the viewer has been in, shows what it cost them, and ends on
what they'll be able to do once they've done the learning path.

- **Brand:** Little Parrot. Narration and screen recording, nobody on camera.
- **Lead channel:** LinkedIn native video. One 44 to 47 second cut works on
  every channel, with a CTA swap for TikTok, Reels and Shorts.
- **Destination:** the waitlist page,
  `https://littleparrot.app/guides/technical-product-manager`
  ("Become a Technical Product Manager Without Becoming an Engineer").

## The shape of every script

| Beat | Job |
|---|---|
| Hook | The situation, stated so the viewer thinks "that's me" inside three seconds. Always about them, never a technical term. |
| The moment | The specific version of it, with the detail that makes it real. |
| What it costs | The consequence they actually felt. One beat. |
| The gap | Why they couldn't have handled it, said without blame. |
| The setup | The learning path, introduced as the answer to what they just heard. Always "if you want to X, that's what we're building a learning path for", so it arrives as a reply to their situation. |
| What changes | What they'll be able to do by the end of it. Concrete and in order, never a promise of confidence. |
| CTA | The ask, and what signing up actually gets them. |
| Comment prompt | A simple, friendly question, and the last thing said. |

Rules the set follows:

- **The narration is one argument, not eight sentences.** Each beat has to
  follow from the one before it. The test: read the Narration column on its own
  with the beat names hidden, and it should still read as one person talking.
  An earlier draft failed this. It said "you don't know, so it goes to
  engineering", then "you can answer most of it yourself", which contradicts
  the situation the hook had just set up.
- **The transformation is always after the learning path**, never something the
  viewer can already do. That's what makes the CTA the end of the story rather
  than an ask stapled to the end.
- **The learning path is introduced before it's used.** "After the learning
  path, you'll be able to..." arrives from nowhere if nothing has mentioned a
  learning path, and the viewer spends the payoff beat wondering what it is.
  The setup beat now names it as the reply to the gap they just heard, and the
  transformation follows on with "by the end you'll...".
- **The CTA comes before the comment prompt.** Ending on the ask makes the
  video finish on business; ending on a friendly question about their own team
  is what earns replies, and replies are what carry the post to people who
  don't follow us. So the order is the ask, then the question.
- **The CTA is one ask, with no throat-clearing.** The waitlist link is in the
  comments, sign up to hear when it opens. An earlier version opened with "it's
  not open yet" and closed with "nothing else", and both were saying something
  the ask already implies.
- **No teaching sequences, and no definitions.** The audience are practising
  software product managers, so the scripts name real things (network tab,
  status code, staging, SQL, data migration) and never gloss them. This is a
  deliberate exception to the inline-definition rule in the `language-rules`
  skill, which exists for beginner-facing course copy. Anything that needs
  explaining belongs in the course, not in 45 seconds.
- **Nothing on screen holds for more than three seconds.** The Visual column
  lists every change in order, so a four-part visual is four cuts.
- **No video names a step of the learning path.** The path is still being built
  and the order may change.
- **Every hook opens differently.** Eight videos that all start "have you ever"
  read as a template by the third one, and the first two words are the ones a
  muted viewer reads. Hook cards are six words or fewer.

## The eight

| # | Script | The situation | What they'll be able to do |
|---|---|---|---|
| 1 | [Nodding along in stand-up](video-1-say-it-back/script.md) | A word goes past in stand-up, you don't ask, and three weeks later the date is gone with it | Say a change back in their own words, ask what it does to the product, get an answer in the room |
| 2 | [You only know the screens](video-2-follow-one-click/script.md) | Asked how their own product works, they can demo every screen, and behind those screens is a service another team owns, three integrations and an environment they've never seen | Map their product's dependencies, owners, bottlenecks and what breaks when one piece goes |
| 3 | [You said yes to a simple feature](video-3-can-our-apis-do-that/script.md) | Said yes to a "simple" request, then found out two weeks in that the integration can't carry it | Check what the integrations they already pay for can do, before answering |
| 4 | [Done, and your users still don't have it](video-4-where-is-the-change/script.md) | Built, tested, and waiting behind another team's monthly release | Follow a change through review, testing, environments and every team it waits on, and say what's holding it |
| 5 | [All you can send is their screenshot](video-5-not-a-bug-report/script.md) | A customer reports a bug and all they can forward is a screenshot | Reproduce it, read the error code, and find the failed request in the browser themselves |
| 6 | [Needed tomorrow, ready next week](video-6-answer-the-number/script.md) | A one-line data question that analytics will answer next week | Write the query and check what the number includes |
| 7 | [Nobody raised the hard part](video-7-four-questions/script.md) | The decision got made in a meeting they were in, and nobody surfaced the complexity | Run that discussion with the four questions that surface it before anyone commits |
| 8 | ["When can we launch it?"](video-8-prototype-not-product/script.md) | A business stakeholder saw the AI prototype and asked when it ships | Name what production needs that the prototype skipped, and hand both over |

**The situations are ours, not quotes.** They're written from what product
managers described in the
[evidence ledger](../../../../ai-research/pm-technical-fluency/non-technical-pm-technical-needs-validation-2026-08.md#a-strictly-eligible-evidence-used-for-ranking)
and the
[needs research](../../../../ai-research/pm-technical-fluency/non-technical-pm-technical-needs-2024-2026.md#1-top-recurring-technical-needs),
in the words a viewer would use. No script names or quotes a real person.

**Videos 3 and 7 share a subject and split it deliberately.** Video 3 is the
two weeks after a yes has been given. Video 7 is the meeting where it gets
given. Keep them apart in the edit and post them a fortnight apart.

## Pitched at software product managers, not beginners

The audience already knows what a frontend, a backend and a database are. A
video that explains those three loses them, and it also misses the actual gap
the research found: infrastructure and the complexity an enterprise product
carries. Environments, access, reliability, performance, integrations, data
migrations, and the parts other teams own. Video 2 is built on that, and the
others assume it.

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

- **Order:** 1, 5, 4, 8, 2, 7, 6, 3. The first three have the most
  recognisable situations, and 3 and 7 are kept a fortnight apart. Pin 1.
- **Cadence:** two a week over four weeks, so the experiment has a readable
  result before the next batch.
- **Where the link goes, by channel.** LinkedIn: first comment, not the post
  body. YouTube Shorts: pinned comment, which is what the
  [playbook](../../../channels/platform-playbook-2026.md) says and what
  `build-first-app/video-first-prompt-no-prd` did. TikTok: pinned comment, plus
  the URL spoken and shown, because there's no bio link until 1,000 followers
  ([channel note](../../../channels/tiktok/profile.md)). Instagram Reels: the
  URL spoken and shown, because links aren't clickable in captions
  ([channel register](../../../channels/README.md)) and the bio holds five
  slots for more than eight destinations.
- **Worth fixing before this set goes out:** the waitlist URL is long to say
  out loud and longer to type from a phone. A short path that redirects to
  `/guides/technical-product-manager` would make the two spoken-URL channels
  workable, and it's a small change in the app repo.
- **Captions are not in this folder.** Once a video is cut, the `captions`
  skill writes the per-channel captions into a `posts/` folder next to the
  script.
- **UTM for the waitlist link:**
  `https://littleparrot.app/guides/technical-product-manager?utm_source=linkedin&utm_medium=social&utm_campaign=technical-product-manager&utm_content=video-1`
  Swap `utm_source` for `tiktok`, `instagram` or `youtube` and `utm_content`
  for the video number. The page reads all four parameters and saves them with
  the signup.

## What the videos claim

Every "what changes" beat lists what the learning path teaches, and each one
maps to something on the waitlist page. Nothing here promises a viewer will
read their team's code, judge an estimate alone, or move into an engineering
role.
