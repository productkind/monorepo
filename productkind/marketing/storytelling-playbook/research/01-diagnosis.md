# Diagnosis: our recent content against the expert principles

Written 2026-09-24. Checks our September short videos and recent LinkedIn posts against [00-synthesis.md](00-synthesis.md). Performance numbers come from `../../content/campaigns/2026-09-pm-technical-fluency-validation/tiktok-experiment-review-6-14-sept.md` (TikTok, 48 validation videos) and `../../channel-strategy-2026-08.md`. We have no per-post LinkedIn numbers in the repo, so the LinkedIn section judges structure only.

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

No per-post impressions in the repo, so this judges structure only. The August strategy recorded 65K impressions on Kinga's profile (+184% year on year) and 61% out-of-network reach, so 120 to 170 a week is a recent drop rather than the long-run norm.

### The strongest structures are the story posts

| Post | What works, in the experts' terms |
| --- | --- |
| Magic spreadsheet (Tim, 22 Sept) | Opens with a question and "Let me explain" (Parr: tease). Specific, textured detail ("Beating Heart of the Company", VLOOKUP, 45 minutes every week) (Howard, Mino). "But there's a fallacy here" is a textbook re-hook (Kallaway). Stakes: the employee stuck entering data. |
| AI influencers and skincare (14 Aug) | Opens by pairing two things that don't obviously go together (Howard's "connect dots"). Contrarian take (Ralston, Mino). Real evidence (35 women, no control group) as proof. |
| Substack subscribers (7 Aug) | Contains a strong head fake: the 44% came from our own product (Kallaway). But it's in paragraph five. The opening is context. |
| Price test (10 Sept) | "We were about to add prices... when we realised" opens on a real moment with a turn in the first sentence. |

### The validation posts follow the video template

- **Webhook vs API (16 Sept):** "As a product manager, you may have heard the terms..." Galloway would call this a statement intro. There's no gap, no stakes and no character, then a long explanation. The payoff is good but arrives after about 350 words.
- **SEO indexing and structured data (17 Sept):** "If you built your website or app with AI, this is the first SEO task I'd do:" calls out the audience (Parr: niches make riches) and promises something specific, then delivers. Of the validation posts, this is the closest to what the experts recommend. What's missing is stakes. The body's line "the best-written page in your niche... and zero traffic from Google" is the hook. It belongs first.
- **Technical knowledge career (untracked draft):** "One of the products I managed was distributed on a DVD" is specific and intriguing (Howard: texture). But no stakes or question follow; the body becomes a CV, and the payoff is the waitlist.
- **Built by writing code (22 Sept draft):** "We built this video with AI. What do you think?" asks for an opinion before giving the reader anything. The head fake ("not a video model, React code") is in paragraph two. It could be the first line.

### Patterns

1. **Our hooks mostly sit in paragraph two or later.** In four of the posts above, the most interesting line is buried. Parr's slippery slope says sentence one's only job is to get sentence two read; Ogilvy says the headline gets five times the readers.
2. **Tutorials without stakes.** The teaching posts explain well but don't say what it costs the reader not to know (Galloway: for information content, the stake is the cost of not paying attention).
3. **Pitch posts end on a link, story posts end on a question.** Ralston: decide each post's job first. A waitlist post should be judged on sign-ups, not impressions.
4. **Not from the sources:** several recent posts put an external link in the body. None of the seven experts discuss LinkedIn's handling of links, so the playbook won't make a claim about it. It's worth testing: same post, link in the body vs link in the first comment.

---

## What this means for the playbook

The playbook should put most of its weight on:

1. **The first frame and first line for video:** three hook layers, planned second by second (Garcia), first frame readable without sound (Galloway), and a contradiction, number or deadline in sentence one (Mino, Galloway, Kallaway).
2. **Confirming and paying off the promise inside the piece:** no value-edging. The course pitch goes after the value, not instead of it (Mino, Galloway, Ralston, Parr).
3. **Kallaway's loop as the body structure,** with a re-hook at every danger zone.
4. **Moving the buried hook to the top** for LinkedIn posts.
5. **A measurement routine**, because we can't learn from LinkedIn without per-post numbers.

## Data we still need

- Impressions, reactions and comments per LinkedIn post for the last 8 to 10 posts (LinkedIn post analytics, or a screenshot of the list).
- Instagram and YouTube Shorts retention for the validation videos, if they went out there too.
- Waitlist sign-ups by UTM `utm_content`, to judge the validation posts on their real job.
