---
status: drafted
channels: [linkedin, tiktok, instagram, youtube-shorts]
account: little-parrot
---

# Where is the change right now?

**Runs:** about 91 seconds. **Search phrase:** "staging vs production" and
"how does software deployment work". **Learning path step:** 3, deployment,
staging and release.

**Treatment:** narration over a screen recording that follows one change
through a ticket, a pull request and a deployment, in the Little Parrot
repository.

| Beat | Narration | Visual | On-screen text |
|---|---|---|---|
| Hook (0-6s) | "'Nodding along in standups, pretending to get it.' A product manager wrote that about their own stand-ups." | Text card | **"nodding along in standups, pretending to get it"** |
| The situation (6-26s) | "We read two years of product manager discussions, and this was one of the six needs that came up again and again. You lose the thread when engineers stop talking about the product and start talking about the work: branches, pull requests, the pipeline, staging. Then a feature is 'done' for two weeks and still isn't live." | Screen recording: a stand-up board, then the words scrolling past | branch · pull request · pipeline · staging |
| The frame (26-32s) | "One change moves through six places, and where it sits tells you how close it is to customers." | Six boxes appearing in a row | ticket → branch → pull request → tests → staging → production |
| The six (32-58s) | "The ticket is the decision. The branch is a copy of the code where one person works, so nothing breaks for anyone else. The pull request is where another engineer reads the change before it's allowed in. The tests are checks that run on their own. Staging is a full copy of the product where the change can be used before customers can reach it. Production is your actual product, the one real people are using." | Each box lights up as it's named, with the matching screen: the ticket, the branch, the pull request, the test run, the staging URL, the live site | Six places, and where it sits tells you what's left |
| The move (58-69s) | "So ask this in stand-up: 'where is it now, and what's left before customers have it?' It's a question your engineers can answer precisely, so you get something more useful than 'nearly done'." | The question typed on screen | "Where is it now, and what's left?" |
| The payoff (69-82s) | "It also tells you when the decision is still yours. While a change sits in staging, you decide whether it goes out this week, whether support knows, and what happens if it has to be turned off." | Staging box highlighted, three decision cards next to it | Staging is where Product still decides |
| CTA (82-91s) | "Step three of our learning path follows one change through all six, in your own team's tools. Link's in the comments for when it opens." | Waitlist page, step 3 in frame | littleparrot.app/guides/technical-product-manager |

## Short cut for TikTok, Reels and Shorts (about 50 seconds)

Keep the hook, "The six" and "The move". Cut "The situation" to its last
sentence ("A feature is 'done' for two weeks and still isn't live") and drop
"The payoff". Speed the six definitions up with one screen per word and no
pauses between them.

## Production notes

- **Screen recording needed:** one real change in the Little Parrot repository,
  followed through the GitHub pull request, the checks, the preview or staging
  URL and the live site. Use a change small enough to show end to end.
- **"The six" is the tightest beat in the set.** Read
  it out loud against the recording before committing to it, and split the
  video in two rather than cutting the definitions short.
- **Don't say CI/CD.** The research found the term is developer-facing and the
  audience doesn't search for it. "The tests that run on their own" does the
  same job.
