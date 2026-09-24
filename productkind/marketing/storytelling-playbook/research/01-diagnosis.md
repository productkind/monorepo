# Diagnosis: our recent content against the expert principles

Written 2026-09-24. Checks our September short videos and recent LinkedIn posts against [00-synthesis.md](00-synthesis.md). Performance numbers come from `../../content/campaigns/2026-09-pm-technical-fluency-validation/tiktok-experiment-review-6-14-sept.md` (TikTok, 48 validation videos) `../../channel-strategy-2026-08.md` and `../../channels/linkedin/linkedin-post-analytics-kinga-jun-sep-2026.md` (Kinga's 20 LinkedIn posts with analytics, 23 June to 21 September).

Principles are tagged with their source (Parr, Kallaway, Mino, Ralston, Galloway, Garcia, Howard). Observations the sources don't cover are marked **(not from the sources)**.

---

## Short video

### What the numbers say

- Average watch time is 3.4 to 4.0 seconds on 45 to 51 second videos. Garcia's benchmark is that 12 seconds of average watch time is "where good videos die"; we're at a third of that.
- Every post drops off at 0:01 to 0:02. By the experts' measure (skip rate under 50% at 3 seconds) the hook is where we lose people. Nothing after second 3 gets a chance to matter yet.
- GIF, B-roll and stock cuts of the same script differed by only about 0.3 seconds. The visual format we swapped wasn't the lever. What was the same in all three cuts: frame one, the opening line and the script structure.
- The best script (pm-04, "Engineering says it's done. Your users still don't have it.") had the best watch time and likes. It's also the only opening built on a contradiction.

### Finding 1: frame one has no visual hook and no title hook

Garcia says a hook has three layers: on-screen text, visual and spoken. Ours have one.

- **Text hook:** none. The only on-screen text is the burned-in subtitle of the narration, which starts mid-sentence.
- **Visual hook:** a GIF, B-roll or stock clip with a parrot greeting animation. Nothing breaks the pattern of the feed (Garcia: change the angle, add an action, choose the aesthetic). Nothing is a "click to unpause" moment frozen just before a payoff (Galloway).
- **Spoken hook:** present, but it starts cold, and at 1 to 2 seconds the viewer has only heard four or five words.

This matches the existing review's conclusion ("frame one: a visual with a burned-in sentence and no clear promise"). The experts add a specific fix: plan seconds 1, 2 and 3 individually, and make the first frame carry the promise on its own, without sound (Garcia, Galloway).

pm-09 (the bug report motion graphic, not yet measured) is the first video that does this: a large on-screen title, a Slack card and a "STOP SENDING THIS" stamp. It's the one to watch.

### Finding 2: most spoken hooks set a scene rather than open a gap

Scored against the hook principles:

| Video | Opening line | What the experts would say |
| --- | --- | --- |
| pm-04 (best) | "Engineering says it's done. Your users still don't have it." | Contradiction in two sentences (Galloway's "but nobody will buy it" pattern). Specific, relatable, opens a question: how can both be true? |
| vc-07 | "You launched your app. Three people visited, and nobody paid." | Specific number and real stakes (Mino, Kallaway). The review says the hook lands but the body loses them; see finding 3. |
| vc-05 | "The app you built with AI goes down on Saturday. Who notices it first?" | Stakes plus urgency plus a question (Kallaway). Reasonable. |
| vc-06 | "Could one customer increase your bill?" | A question with a short, guessable answer. Kallaway: a big question needs enough detail to predict. Mino: no extreme word, no proof. |
| vc-08 | "Can you run your own app?" | Generic yes/no. Mino: phrasing heard "two scrolls ago". Not a question anyone has to watch to answer (Galloway). |
| pm-07 | "The decision was made in a meeting you were in." | Sets a scene; the tension ("nobody raised the hard questions") arrives in sentence two. Galloway: least context first. |
| pm-06 | "You need a product metric for tomorrow's meeting." | Urgency is good; the gap ("it's four lines of SQL") comes 15 seconds later. Moving it up front would open the loop: "The number you're waiting a week for is four lines of SQL." |
| pm-08 | "You built something with AI to test an idea." | Context-first. The stakes ("when can we launch it?") arrive at about 4 seconds, after most viewers have gone. |

Pattern: our best lines have a contradiction, a number or a deadline in the first sentence. The weakest are generic questions or scene-setting.

### Finding 3: the body switches to a pitch at about 15 to 20 seconds and never pays off

All eight validation scripts follow the same template:

1. Problem, 3 to 5 sentences.
2. "If you want X, we're building a learning path for it."
3. "By the end you'll..." followed by a list of outcomes.
4. "The waitlist link is in the comments."
5. A question.

What the experts would flag:

- **The loop never resolves inside the video.** The hook raises a problem, then the answer is "a course we're building". Ralston calls withholding the takeaway to sell "value-edging" and says it costs trust. Galloway: deliver the promise, or viewers feel baited. Parr: a curiosity gap that isn't resolved by real content is clickbait. vc-07 ("hook lands, body loses them") is the clearest case.
- **The biggest danger zone gets a sales line, not a re-hook.** Kallaway says section ends are where attention drops and each needs a new question. Ours put "we're building a learning path" there, which is the moment a viewer thinks "OK, this is an ad".
- **Lists instead of story beats.** "Whose data it holds, who's allowed in, what it does under real load..." is a list of abstractions. Mino: drag out one moment instead of summarising. Parr: make it visual.
- **No head fake.** Except pm-04 ("done" meant finished in your part of the system, not live), nothing breaks the viewer's prediction (Kallaway).
- **Generic "you" rather than a character.** Kallaway: stakes need a character someone can picture (you, a client, "I was talking to a PM last week"). A second-person "you" in a generic meeting is harder to picture than one real person in one real room.

pm-09 again breaks the template: it gives the seven answers inside the video. Its result will show whether delivering the value changes watch time.

### Finding 4: things the copy can't fix (not from the sources)

The existing review already lists these, and they'll blur any copy test if they aren't fixed first:

- Account region set to Hungary: 83% of viewers are in Hungary, 68% male. Wrong audience means a low-interest viewer at second 1.
- 3 to 4 posts a day, 21 of 48 capped at about 250 views.

---

## LinkedIn posts

### What the numbers say

20 posts with analytics (plain reposts excluded), 23 June to 21 September. 9,991 impressions in total; **median 457 per post**. Multiplier = impressions divided by that median (Ralston's method: compare against your own median, not against other people).

| Post | First line | Impr. | x median | Out-of-network |
| --- | --- | --- | --- | --- |
| 23 Jun, mtpcon Idiodi (carousel) | "Christian Idiodi closed his #mtpcon London talk with a question: when was the last time you had a great day at work?" | 1,632 | 3.6 | 61% |
| 10 Sep, price test (image) | "We were about to add prices to the landing pages... when we realised we would be testing interest and price at the same time." | 794 | 1.7 | 41% |
| 7 Aug, Substack (link) | "In January, I switched on paid subscriptions... because I'd heard it everywhere" | 740 | 1.6 | 32% |
| 10 Jul, writing again (carousel) | "Last year I was writing articles... every week, for months. Then life (and a business) got in the way and I stopped." | 623 | 1.4 | 29% |
| 19 Aug, mental load course (link) | "Out of our nine courses, the shortest one took us the longest to build." | 617 | 1.4 | 28% |
| 14 Jul, Instagram lessons (carousel) | "We posted 76 times on Instagram over 19 weeks last year. We started at 0 followers and got to 33." | 616 | 1.3 | 40% |
| ... 8 posts between 0.8 and 1.1 ... |  |  |  |  |
| 6 Jul, SEO eight steps (image) | "If you google "little parrot" right now, our site is the first result. Above the actual parrots." | 451 | 1.0 | **56%** (5.5% engagement, the highest) |
| 4 Jul, Fable countdown (video) | "All my social media feeds this week are the same countdown..." | 279 | 0.6 | 38% |
| 19 Jul, Claire Vo (quote repost) | A quote from Claire Vo | 244 | 0.5 | 47% |
| 17 Sep, SEO indexing (image) | "If you built your website or app with AI, this is the first SEO task I'd do:" | 243 | 0.5 | 31% |
| 16 Sep, webhook vs API (collab) | "As a product manager, you may have heard the terms..." | 238 | 0.5 | n/a |
| 14 Aug, AI influencers and skincare (image) | "Some AI influencers are doing the same thing as skincare companies: promising outcomes that aren't scientifically proven." | 224 | 0.5 | 46% |
| 21 Sep, built with code (quote repost) | "We built this video with AI. What do you think?" | 179 | 0.4 | 24% |

### Finding 5: the top posts open on a real moment or a question the reader answers about themselves

Every post at 1.3x the median or more opens in one of these ways:

- **A question the reader answers about their own life** (Idiodi, 3.6x): "when was the last time you had a great day at work?" This is the only post that reached mostly outside the network (61%). In the experts' terms: it states the reader's own experience back to them (Mino), speaks to core, casual and new readers alike (Galloway), and poses a question the reader has to answer (Galloway, Kallaway).
- **A specific moment with a turn in the same sentence** (price test, 1.7x): "We were about to... when we realised". That's Kallaway's stakes plus a head fake, in one line.
- **A decision and the belief behind it**, setting up a prediction that the post later breaks (Substack, 1.6x). The head fake (44% came from our own product) lands in paragraph five.
- **A contradiction** (mental load course, 1.4x): "the shortest one took us the longest to build." This is Galloway's contradiction pattern.
- **Specific, uncomfortable numbers** (Instagram lessons, 1.3x): "76 times... got to 33". This is Mino's specific proof plus "reveal the uncomfortable details". It also drew 12 comments, the most in the period.

### Finding 6: the bottom posts open on a topic, a general claim or a request

Every post at 0.6x or below opens with one of these:

- **A topic introduction:** "As a product manager, you may have heard the terms..." (0.5x). Galloway calls this a statement intro.
- **An audience call-out plus a promise of a tip:** "If you built your website or app with AI, this is the first SEO task I'd do" (0.5x). In the first version of this diagnosis I rated it the strongest validation post. The data says otherwise. The version that led with a result instead ("our site is the first result. Above the actual parrots.", same topic, 6 July) did twice as well and reached 56% out of network. That fits Mino and Tiffany Guillen: lead with proof in sentence one.
- **A general opinion:** the skincare post (0.5x). I also rated this one well on structure. Its body is a good story, but the first line is an abstract claim about "some AI influencers", with no moment, no person and no question for the reader. Kallaway's stakes need a character and something at risk before anything else.
- **Asking the reader for something before giving anything:** "We built this video with AI. What do you think?" (0.4x).
- **Someone else's news or quote:** the Fable countdown and Claire Vo (0.5 to 0.6x). The opening line belongs to another person's story.

**Correction to the earlier structural read:** a good body doesn't rescue a weak first line. The skincare and SEO indexing posts both had solid bodies and both finished in the bottom five.

### Finding 7: September's drop is mostly the validation posts

The three September posts other than the price test are all in the bottom four of the period (0.4 to 0.5x). All three are validation posts: tutorials or a behind-the-scenes note, ending in a waitlist link, and two are collab or quote formats. The one September post in the top three (price test) is also a validation post, but it opens on a real moment. So the problem isn't the validation topic. It's the tutorial opening.

Two further things the sources don't cover:

- **(not from the sources)** Formats: carousels have the highest median (507, 7 posts), quote reposts the lowest (212, 2 posts). The samples are too small to conclude much, but it's worth tracking.
- **(not from the sources)** Posting gap: nothing between 19 August and 10 September. Ralston and Garcia both treat consistent reps as the base everything else builds on.
- The audience is mostly software engineers, PMs and founders in Budapest and Lisbon. PM-focused posts reach the right people. The vibe-coder path targets women founders, so it will get less natural reach here.

### Earlier structural notes (still valid)

- **Magic spreadsheet (Tim, 22 Sept, no data yet)** follows the experts' structure: question, "Let me explain", textured detail, and "But there's a fallacy here" as the re-hook. Watch how it performs.
- **Technical knowledge career (draft):** "One of the products I managed was distributed on a DVD" is specific, but no stakes or question follow, and the body turns into a CV.
- **Endings:** the posts with the most comments (Instagram lessons 12, Idiodi 11, Substack 7) end on a question about the reader's own experience, not a general opinion question.
- **(not from the sources)** Link placement isn't covered by any of the seven experts. If you want to test it, compare link in the body against link in the first comment.

---

## What this means for the playbook

The playbook should put most of its weight on:

1. **The first frame and first line for video:** three hook layers, planned second by second (Garcia), first frame readable without sound (Galloway), and a contradiction, number or deadline in sentence one (Mino, Galloway, Kallaway).
2. **The first line for LinkedIn:** open on a real moment with a turn, a result, a contradiction, specific uncomfortable numbers, or a question the reader answers about themselves. Never a topic intro, a general claim or a request. This is supported by both the experts and our own data.
3. **Confirming and paying off the promise inside the piece:** no value-edging. The course pitch goes after the value, not instead of it (Mino, Galloway, Ralston, Parr).
4. **Kallaway's loop as the body structure,** with a re-hook at every danger zone.
5. **A measurement routine:** a monthly top 10% vs median review (Ralston), per platform.

## Data we still need

- Instagram and YouTube Shorts retention for the validation videos, if they went out there too.
- Waitlist sign-ups by UTM `utm_content`, to judge the validation posts on their real job. (The structured-data post, marked scheduled for 17 Sept but not in the LinkedIn analytics, reuses the webhook post's UTM. Fix that before it goes out.)
