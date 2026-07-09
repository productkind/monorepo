---
name: linkedin-post
description: Apply this structure to LinkedIn posts or Substack Notes.
---

> Voice and tone come from the **personal-tone-of-voice** skill and `productkind/marketing/strategy/how-to-be-authentic-on-linkedin.md`. This skill covers the channel mechanics and post structure that sit on top of that voice. Where the two appear to conflict, the grounded voice wins: posts should read like a real, kind person, never like marketing.

## Evaluation Loop (run this every time)

A drafted post is never returned to the user until an independent critic has gated it. Self-review misses what fresh eyes catch, so the writer and the judge must be different.

1. **Draft** the post following this skill, the personal-tone-of-voice skill, and the authentic doc.
2. **Critique.** Spawn the `linkedin-critic` agent (Agent tool) and pass it the full draft text, saying whether it is a LinkedIn post or a Substack Note. Do not show the draft to the user yet.
3. **Read the verdict:**
   - **PASS** → show the user the final post, with a short note on what the critic checked.
   - **NEEDS REVISION** → apply the critic's revision brief, then re-run the critic on the new draft. Repeat, up to **3 rounds**.
4. **After 3 rounds**, if issues remain, show the best draft and name the unresolved items honestly. Never hide them or quietly ship around them.

What the user sees: the **final post plus a short summary** of what the critic flagged and how it was resolved — not every round, unless they ask to see the drafts.

## Audience

Non-technical women learning AI-assisted development.

## Every Post Must Earn Its Read

A post that only reports an observation or recounts an event gives the reader no reason to have read it. Before drafting, name the one thing the reader walks away with. It can be any of these, but it must be at least one:

- a reframe or mental model they can reuse (e.g. "a result you watch is not a method you can repeat")
- a technique or habit they can copy (e.g. "put a value number next to every output number")
- a genuine reassurance grounded in a reason (e.g. "if it leaves you feeling behind, the missing piece is the how, not you") — emotional value counts, as long as the reader understands *why*

If the draft only states something true and stops, it is not finished. Reporting what a speaker said is the setup, not the payoff. The payoff is what the reader now understands differently or can do.

## Channel Guidelines

### LinkedIn Posts
- Length: 90–200 words optimal
- Structure: Hook → insight → implication
- One idea per post
- No hashtags
- Put all links in the post body. Don't put links in the author's first comment, LinkedIn penalises the post's reach when the author comments with links.
- Whitespace between paragraphs for scannability
- The opening grounds the reader in a real moment, not a promise of value
- End with one concrete thing to try, or a genuine reflective question tied to the substance. Not a summary, not comment-bait
- Value density: concentrated insights outperform verbose posts

### Substack Notes
- More reflective, longer-form thinking allowed
- Can explore nuance and uncertainty
- Still no jargon or hype

## Openings

Open on a real, specific moment: something that happened, a frustration, an honest admission, or a precise observation. Curiosity comes from the concrete detail, never from a withheld secret or a promise of value.

**Do:**
- Start with a specific moment, frustration, or observation
- Reframe a common belief, stated plainly
- Name a practical distinction people miss

**Don't:**
- Grand claims about industries or "the future"
- Curiosity-gap or data-tease hooks ("I discovered why 87% of X fails...", "...generated $157K in 30 days")
- Rhetorical questions as hooks
- Abstract definitions before context
- Promising "value" or "a secret" before delivering it

### Examples of openings that work

#### Good: A real event

> I spent this week at two product conferences, mtpcon in London and Productized in Lisbon.

**Why it works:** Grounds the reader in something that actually happened before any claim. The reader trusts a person, not a pitch.

---

#### Good: An honest admission

> I keep thinking about one number from this week's conferences.

**Why it works:** Specific and personal. The pull is the real detail to come, not a manufactured mystery.

---

#### Good: A precise observation

> The same idea came up in three talks this week, from speakers who'd never coordinated.

**Why it works:** A concrete pattern the writer noticed; the insight follows in the next line instead of being teased.

---

#### Bad: Hype / curiosity gap

> I discovered why 87% of LinkedIn outreach fails. The reason surprised even me.

**Why it fails:** Withholds the point to manufacture suspense. Reads as marketing, not a person sharing something true.

---

#### Bad: Vague

> LinkedIn is important

**Why it fails:** Vague language, no specific moment.

---

#### Bad: Condescending

> If you’re still doing this, you’re making a huge mistake

**Why it fails:** Negative, talks down to the reader.

---

## Structure

- Lead with the point, then support it
- Use whitespace generously
- Bullet points when they reduce cognitive load
- Headings as signposts, not marketing hooks
- End with a practical reframe or behavioural guidance, not a summary

---

## Copy Rules

- **Describe experiences, not features.** "You get practical courses that fit into a busy day" instead of "Short, practical courses, toolkits, community access." Use "you get" and "you can" to make it about the reader.
- **Don't repeat information across paragraphs.** Say it once, say it well.
- **Don't include pricing in promotional posts.** Let the landing page do that work. The post's job is to get the click.
- **When introducing Little Parrot to a new audience, one sentence of context is enough.** Don't over-explain.
- **Thank partners by name.** It's human and builds relationships publicly.

---

## Self-Check

Before publishing, verify:

1. Can I name the one thing the reader walks away with (a reframe, a technique, or a reasoned reassurance)? If it only reports an observation, it is not finished.
2. Does the opening start on a real, specific moment, not a teaser or a promise of value?
3. Is there a specific example, named source, tool, or scenario?
4. Does the ending give one concrete thing to try, rather than summarise or bait comments?
5. Would I trust this if someone else wrote it?
6. Am I describing experiences or listing features?
7. Is any information repeated across paragraphs?
8. Have I run it against the personal-tone-of-voice banned-language list (no em dashes, no hype, no "not X but Y")?