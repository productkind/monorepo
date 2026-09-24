---
name: linkedin-post
description: Write LinkedIn posts and Substack Notes in Kinga's voice that stop the scroll and hold the reader, covering the hook, story structure, channel mechanics, endings, copy rules, and the linkedin-critic evaluation loop that gates every draft before the user sees it. Use when drafting or reviewing a LinkedIn post or Substack Note. Triggers include "write a LinkedIn post", "draft a Substack Note", "post about this on LinkedIn", or any LinkedIn or Substack Note task.
---

> **What comes from where.** Voice comes from the **personal-tone-of-voice** skill and `productkind/marketing/channels/linkedin/how-to-be-authentic.md`. Every word still passes **language-rules**. This skill owns the **hook, structure and channel mechanics**, built from our storytelling and copywriting playbook (`productkind/marketing/storytelling-playbook/README.md`, sources: Sam Parr, Kallaway, Mino Lee, Caleb Ralston, Paddy Galloway, Alex Garcia, Anna Corinne Howard) and Kinga's own LinkedIn analytics.
>
> **Precedence:** personal-tone-of-voice allows curiosity gaps in all of Kinga's writing when they serve the story, and defers the detailed hook rules to the channel skills; for LinkedIn posts and Notes, those rules are here. Everything else in personal-tone-of-voice (plain, spoken register, warm register breaks, fellow-learner stance) still applies in full, and language-rules still applies to every line, including the hook.

## Start From Kinga's Words

The most natural-sounding source material is Kinga's own rough wording, so collect it before composing anything. A draft grown from her sentences comes out sounding like her; a draft composed from scratch and decorated with her facts comes out sounding generated.

- If she has supplied rough notes or dictated wording, build the draft from those sentences: keep every fact and her distinctive lines verbatim (e.g. "I'm not a content machine"), smooth the rough connective tissue, and never paste the notes in unedited.
- If she hasn't, ask for her rough take before drafting: what she wants to say in her own words, plus any numbers, names, sources, or backstory she wants in. Don't invent the narrative from the linked article alone.
- Her rough notes usually contain the hook, just not at the top. Look for the moment, number, contradiction or turn in them and move it to line 1.

## Evaluation Loop (run this every time)

A drafted post is never returned to the user until an independent critic has gated it. Self-review misses what fresh eyes catch, so the writer and the judge must be different.

1. **Draft** the post following this skill, the personal-tone-of-voice skill, and the authentic doc. Write at least 5 candidate first lines (Galloway recommends 10) and pick the strongest before drafting the rest.
2. **Critique.** Spawn the `linkedin-critic` agent (Agent tool) and pass it the full draft text, saying whether it is a LinkedIn post or a Substack Note, and the post's job (see "Decide the post's job"). Do not show the draft to the user yet.
3. **Read the verdict:**
   - **PASS** → show the user the final post, with a short note on what the critic checked, plus the two runner-up first lines so Kinga can swap if she prefers.
   - **NEEDS REVISION** → apply the critic's revision brief, then re-run the critic on the new draft. Repeat, up to **3 rounds**.
4. **After 3 rounds**, if issues remain, show the best draft and name the unresolved items honestly. Never hide them or ship around them without saying so.

What the user sees: the **final post, the runner-up first lines, and a short summary** of what the critic flagged and how it was resolved. Not every round, unless they ask to see the drafts.

## Audience

Non-technical women learning AI-assisted development, and the PMs, founders and engineers who make up most of Kinga's LinkedIn audience today (mostly Lisbon, Budapest and London).

## What our own data says

From Kinga's 20 LinkedIn posts, 23 June to 21 September 2026 (median 457 impressions; full analysis in `productkind/marketing/storytelling-playbook/research/01-diagnosis.md`):

| Top posts (1.3x to 3.6x the median) opened with | Bottom posts (0.4x to 0.6x) opened with |
| --- | --- |
| A question the reader answers about their own life: "When was the last time you had a great day at work?" (3.6x, 61% out of network) | A topic introduction: "As a product manager, you may have heard the terms..." |
| A real moment with a turn: "We were about to add prices to the landing pages... when we realised..." (1.7x) | An audience call-out and tip promise: "If you built your website or app with AI, this is the first SEO task I'd do" |
| A belief the post later proves wrong (Substack paid subscriptions, 1.6x) | A general claim about other people: "Some AI influencers are doing the same thing as skincare companies" |
| A contradiction: "Out of our nine courses, the shortest one took us the longest to build." (1.4x) | A request before any value: "We built this video with AI. What do you think?" |
| Specific, uncomfortable numbers: "We posted 76 times on Instagram... We started at 0 followers and got to 33." (1.3x, most comments) | Someone else's news or quote as line 1, with no question for the reader (Fable countdown, Claire Vo) |
| A result: "If you google 'little parrot' right now, our site is the first result. Above the actual parrots." (56% out of network, highest engagement rate) |  |

**A good body didn't rescue a weak first line.** Two posts with solid bodies finished in the bottom five.

## Decide the post's job

Before writing, pick one job (Ralston). It decides the ending and how the post is judged.

- **Reach:** new people discover Kinga. Judged on impressions against the 457 median and out-of-network %. Ending: a question about the reader's own experience, or none.
- **Community:** deeper conversation with people who already follow her. Judged on comments. Ending: a question about the reader's own experience.
- **Conversion:** a waitlist, a course, an article. Judged on sign-ups or clicks by UTM, not impressions. Ending: one link.

One job per post.

## Every Post Must Earn Its Read

A post that only reports an observation or recounts an event gives the reader no reason to have read it. The post needs one thing the reader is left with. That can be any of these, and it does not have to be a copyable technique:

- a reframe or mental model they can reuse (e.g. "I want women to understand that you can do deeply meaningful, important work, and make a lot of money.")
- a technique or habit they can copy (e.g. "ask for a story in user interviews, instead of asking the user to hypothesize about their future behaviour")
- a genuine reassurance grounded in a reason (e.g. "if it leaves you feeling behind, the missing piece is the how, not you"). Emotional value counts, as long as the reader understands _why_
- an honest reflection or an opinion Kinga is willing to stand behind, paired with a real question that invites the reader to think (e.g. admitting she can no longer remember how she'd write a sentence without AI, then asking what they'd do)

Don't force a how-to onto a reflective post to make it "earn" its read. A personal post earns it through honesty and a genuine question just as much as a teaching post earns it through a technique. Kinga often finds her point while writing, so don't demand the payoff be named before drafting; require only that the finished post leaves the reader with one of the above rather than stopping at a bare fact.

**Deliver it in the post.** Don't hold the takeaway back to sell the waitlist or course ("value-edging", Ralston). The link comes after the value, never instead of it.

## Channel Guidelines

### LinkedIn Posts

- **Length follows the loop.** 90 to 250 words is the usual range, as a guideline rather than a ceiling. "There's no such thing as too long, just too boring" (Parr): cut what's boring, not what's long, and never cut lines that carry the voice just to hit a number.
- **The first line is the hook, and it has to stand alone** above the "...see more" fold (about the first 140 characters).
- One idea per post.
- No hashtags.
- If the post drives to a link, put it in the post body. Don't put links in the author's first comment; LinkedIn penalises the post's reach when the author comments with links.
- Whitespace between paragraphs for scannability.
- Value density: concentrated insights outperform verbose posts.

### Substack Notes

- More reflective, longer-form thinking allowed.
- Can explore nuance and uncertainty.
- The hook rules apply: the first line is what decides whether the Note gets read.
- Still no jargon or hype.

## The First Line (the hook)

Five times more people read the headline than the body (Parr, quoting Ogilvy). The first line has to stop the scroll, be understood at a glance, open a **specific** gap the reader wants closed, and signal who it's for.

### Hook ingredients

Combine two or three. The strongest stack a gap with specificity.

- **A real moment with a turn in the same sentence:** "We were about to... when we realised..." (Kallaway: stakes plus a head fake)
- **A contradiction:** two true things that shouldn't both be true. "The shortest one took us the longest to build." (Galloway)
- **A result or proof first**, shown rather than listed. (Mino, Ralston)
- **Specific, uncomfortable numbers**, the detail you're tempted to leave out. (Mino)
- **A question the reader answers about their own life**, never a yes/no or a question with an obvious answer. (Mino, Galloway)
- **A belief, then the evidence that broke it.** (Kallaway's head fake, Ralston's contrarian take)
- **The cost of not knowing**, for teaching posts: "You can have the best-written page in your niche and get zero visitors from Google." (Galloway)
- **A named audience** in line 1 or 2, so the right reader knows it's for them. (Parr: "niches make riches")
- **Stakes on a clock:** something at risk, with a specific time. (Kallaway)

### Hook formulas

| Formula | Example |
| --- | --- |
| We were about to [action] when we realised [problem]. | "We were about to add prices to the landing pages for two proposed learning paths when we realised we would be testing interest and price at the same time." |
| [Thing A]. [Thing B that shouldn't be true alongside A]. | "Out of our nine courses, the shortest one took us the longest to build." |
| [Specific result]. [The surprising detail]. | "If you google 'little parrot' right now, our site is the first result. Above the actual parrots." |
| [The embarrassing number]. [What we did anyway]. | "We posted 76 times on Instagram over 19 weeks. We got to 33 followers." |
| [A question the reader answers about their own life]? | "When was the last time you had a great day at work?" |
| Everyone said [common advice], so I [did it]. [What the data showed]. | "Everyone told me to switch on paid subscriptions from day one. 44% of my new subscribers came from somewhere else." |
| [Cost of not knowing]. [Who this is for] + [the fix is coming]. | "You can have the best-written page in your niche and get zero visitors from Google. If you built your site with AI, here's the free check I'd do first." |
| [The head fake as the opener]. | "We made this video with AI, and no video model touched it." |

The full formula bank (15 formulas) is in section 3 of the playbook.

### How hooks meet language-rules

Every hook still passes language-rules, and that's what keeps it in our voice:

- A contradiction is two plain, true statements. Never the banned "Not X, but Y" reversal or the two-beat setup-payoff ("Sounds simple. It isn't.").
- Specific and true, never oversold: no promise the post doesn't deliver, no invented numbers or backstory (language-rules section 6).
- No pseudo punchlines ("Here's the thing", "Bottom line").
- Say it aloud: a hook Kinga wouldn't say to a colleague gets rewritten.

### Hook don'ts

- **Empty teasers** that give nothing to guess at: "Something crazy happened this week", "You won't believe what I found". (Kallaway: a gap needs enough detail to form a prediction)
- **Topic introductions:** "As a product manager, you may have heard..." (Galloway: statement intros)
- **A tip promise with no stake:** "This is the first SEO task I'd do." Lead with the cost of not doing it, or the result.
- **A general claim about other people:** open on a person, a moment or a number instead.
- **A request before giving anything:** "What do you think?" as line 1.
- **Someone else's news or quote as line 1**, unless the quote is itself a question the reader answers about their own life (the Idiodi post, our best, opened on his question). Otherwise open on what it changed for Kinga, then bring in the quote.
- **Leading with the lesson** in a story post. It closes the loop before it opens (Mino).
- **Grand claims about industries or "the future".**
- **Condescension:** "If you're still doing this, you're making a huge mistake."

## Confirm the Hook (line 2)

Mino says this is the step "most people get wrong". Line 2 proves line 1 wasn't bait: it restates or extends the hook's topic and adds the stakes (who, what's at risk, why now). Read only the first two lines. If line 2 drifts to background, the hook reads as clickbait.

## Structure

The default is Kallaway's loop, which the experts say works for "emails, tweets, posts" as much as video.

1. **Hook** (line 1).
2. **Confirm and set the stakes** (line 2): a character (Kinga, a learner, "a PM I talked to"), something at risk, and urgency. Stakes don't need drama, only personal relevance.
3. **The moment:** open the scene. Drag out the key beat with specific, textured detail (Mino, Howard).
4. **The big question:** make the reader guess. Before any important reveal, give just enough context for them to predict first.
5. **The head fake:** the turn. Surprising but logical, with the clues planted earlier. ("But there's a fallacy here.")
6. **Re-hook** at every paragraph break, because that's where readers leave. Close one question and open the next in the same breath.
7. **Payoff:** the reframe, technique, reassurance or reflection, given in full.
8. **One ask**, matched to the post's job.

**Teaching posts** keep the same shape but replace the story with the cost of not knowing: hook on the stake or a result, confirm who it's for, then deliver the steps. Mino: match the hook to the real content. A teaching post gets a teaching hook, not a fake mystery.

**Re-hook phrases** that fit Kinga's spoken register (Kallaway, Parr):

- "...which would have been great, except..."
- "But there's a problem with that."
- "And that's when I realised..."
- "...which is exactly why..."
- "So..." / "But then..." (Parr's but/therefore rule, not "and then")
- Her own mid-post questions: "What happened?", "So how do you do all this?"

**Other craft rules:**

- **Flow is hand-offs:** each paragraph picks up a word or idea from the one before it ("a lot of thinking I never wrote about" → "Part of that thinking was about..."). A paragraph that arrives from nowhere breaks the read.
- A side observation (a statistic, a historical parallel) must be welded to the post's main thread with an explicit hinge sentence ("That gap is a big part of why I want to write again"), or moved to its own post. Never drop a thread without paying it off.
- **Beats, not lists:** a list of abstractions is a summary. Turn one item into a moment. Bullet points only when they reduce cognitive load (steps, a checklist).
- **The uncomfortable detail:** if the draft doesn't make Kinga slightly nervous, it's probably missing the detail people would care about (Mino, Ralston).
- **Objections:** only voice an objection we actually know readers have (from comments, DMs, learners), never an invented one; language-rules bans strawmen.
- **Make numbers concrete** with a comparison or a picture the reader can see (Parr).
- **No conclusion language mid-post** ("at the end of the day").
- Headings as signposts, not marketing hooks.
- **The standard template reads as performance** (how-to-be-authentic.md): punchy opener → white space → numbered list → engagement CTA. A strong first line is not that template; a post that is nothing but that template is.

## Endings

- **Resolve the loop** the hook opened.
- **Reach and community posts:** end on a question about the reader's own experience, tied to the substance ("has your data ever contradicted something you were sure about?"). Our most-commented posts end this way. Not a general opinion poll, not comment bait.
- **Conversion posts:** one link, after the value, with one sentence on what it is.
- Never a summary of what the post just said.

## Copy Rules

- **Don't repeat information across paragraphs.** Say it once, say it well.
- **When introducing Little Parrot to a new audience, one sentence of context is enough.** Don't over-explain.
- **Thank partners by name.** It's human and builds relationships publicly.
- **Sentence craft** (Parr): each sentence only has to earn the next one; vary the rhythm; one point per sentence; cut a third on the edit.

## Self-Check

Before handing the draft to the critic, verify:

1. **Line 1** works on its own above "see more", and is a moment with a turn, a result, a contradiction, a specific number, a belief-then-evidence, the cost of not knowing, or a question about the reader's own life. It is not a topic intro, a tip promise, a general claim, a request or someone else's news.
2. **The most interesting line of the post is at the top**, not in paragraph 2 or 5.
3. **Line 2 confirms line 1** and sets the stakes.
4. There's at least one **turn or head fake**, and a re-hook at the paragraph breaks.
5. The reader is left with one thing (a reframe, a technique, a reasoned reassurance, or an honest reflection/opinion paired with a real question), **delivered in the post**, not held back for a link.
6. There's a specific example, named source, tool, number or scenario.
7. **One ask**, matched to the post's job.
8. Is any information repeated across paragraphs?
9. Have I run it against the language-rules banned list, including the hook (no em dashes, no hype, no "not X but Y", no two-beat setup-payoff)?
10. Does each paragraph pick up a word or idea from the paragraph before it, with no dropped threads?
11. Said aloud to a colleague, would every sentence survive? Rule-clean but stiff is not done.
12. Would I trust this if someone else wrote it?
