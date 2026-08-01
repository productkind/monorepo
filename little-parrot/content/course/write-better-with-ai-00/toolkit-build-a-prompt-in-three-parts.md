---
challenge: "3 - Craft impactful LinkedIn posts that sound like you"
type: "Template"
---
## Build a Prompt in Three Parts

The structure behind every prompt in this course: the request, the tone and style, and the context. Copy the block, fill in what you know, and leave out what you don't. Use it when you're writing something from scratch and want the first draft to be close enough to edit rather than close enough to bin.

### The template

```
Task:
[What you want, in one sentence. Name the format and where it will be published.]

Tone and style:
- Tone: [two or three words]
- Style: [format, sentence shape, opening, ending]
- Length: [words, sentences, or paragraphs]
- Do not use: [the phrases and habits you want banned]

Context and background:
- What this is about: [the thing itself, in a couple of sentences]
- Who it's for: [the audience, and what they already know]
- Why now: [what happened, what problem it solves, why anyone should care]
- Key details: [numbers, dates, names, decisions, constraints]
- What to leave out: [anything confidential, uncertain, or off-message]
```

### What each part is doing

**Task** points the chat assistant (ChatGPT or Claude.ai, where you type a request and copy the answer out) at a shape it already knows. "A Slack message" and "a one-page memo for the exec team" produce different structures before you've said anything else, so name the format and the destination in the first line.

**Tone and style** controls how it sounds. Without it you get the default voice: long, upbeat, and slightly American. This is where you stop the draft sounding like a stranger wrote it. The [Tone and Style Word Bank](TOOLKIT_LINK_PLACEHOLDER) has the vocabulary if you're stuck for words.

**Context and background** controls whether the content is true and useful. The model knows nothing about your product, your customers, or last Tuesday's decision. Everything it doesn't get from you, it invents.

### What context to include

Work through this when the draft comes back vague. Vagueness is nearly always missing context rather than a badly phrased request.

**About the thing itself**
- What it is, described the way you'd describe it to a new joiner
- What it replaces or changes
- What it deliberately does not do yet

**About the people**
- Who reads this, and what they already know about the topic
- What they'll do with the information
- Who else gets credit or a mention

**About the situation**
- What problem this solves, and who asked for it
- What's already been said publicly or internally
- Any history that shapes how this lands (a previous slip, a heated debate, a promise made)

**The hard facts**
- Numbers, dates, names, ticket titles, quotes from real users
- Constraints: what's not agreed, what's not ready to ship, what's under embargo (not to be shared outside the company until an agreed date)

**The boundaries**
- What to leave out, and why
- Anything the model should not guess at

### Worked example: a release update

```
Task:
Write a short Slack update for our company-wide #releases channel about a new feature.

Tone and style:
- Tone: clear, grounded, credit-giving
- Style: one short paragraph, then at most three bullets. Open with what changed for the user.
- Length: under 120 words
- Do not use: "excited to announce", "game-changer", em dashes, emoji beyond one at the start

Context and background:
- What this is about: "Saved Dashboard Views" lets users save their favourite dashboard filters and reopen them in one click.
- Who it's for: the whole company, mostly non-technical. Sales and support will get questions about it.
- Why now: it was our top customer request for two quarters. People were rebuilding the same filter set every session.
- Key details: released to 100% of users this morning. Beta testers reported saving several minutes per session. Built by Team Thunderbird.
- What to leave out: the beta feedback numbers are not verified, so don't quote a specific time saving.
```

Notice the last line. Naming what to leave out is as useful as naming what to include, because it stops the model turning "testers liked it" into "saves 40% of setup time".

### Worked example: a LinkedIn post

```
Task:
Draft a LinkedIn post for my personal profile about finishing a short course on AI prompting.

Tone and style:
- Tone: honest, understated, conversational
- Style: two or three short paragraphs, first person, no bullet list, no hashtag block. End with a real question, one I'd ask a colleague.
- Length: under 150 words
- Do not use: "excited to share", "game-changer", "10x", "unlock", rocket emoji, em dashes, the "not just X, but Y" pattern

Context and background:
- What this is about: a Little Parrot micro-course on prompting for product managers.
- Who it's for: my network, mostly product managers and designers, many of whom already use AI daily and are sceptical of overblown AI claims.
- Why now: I'd been getting generic output and assumed the tool was the problem. It was my prompts.
- Key details: the techniques were setting tone and style, giving context and background, and understanding that a large language model (LLM) predicts text rather than understanding it. The one that changed my output most was banning specific phrases.
- What to leave out: don't imply I'm now an expert, and don't claim any productivity numbers.
```

### Attach rather than retype

If the context lives in a document, attach it instead of summarising it. Most chat assistants accept file uploads and pasted text.

Worth attaching: the Jira export for the release, your user interview notes, last quarter's update so the format matches, three of your own past posts so the voice matches, the PRD (product requirements document), the customer email you're replying to.

When you attach something, say what to do with it. "Here is the Jira export. Use it for the feature list and the ticket titles. Ignore the estimates and the assignees."

### When the first draft is close but not right

Refine in a follow-up rather than starting again. The model still has your context, so a short correction is usually enough.

```
Close. Three changes: cut the opening line and start with what changed for the user, drop the third bullet entirely, and make the whole thing about 30 words shorter.
```

```
The facts are right but the voice isn't mine. Rewrite it in shorter sentences, drop every adjective that praises the work, and stop the sentence pattern where you set something up and then reverse it.
```

If two or three follow-ups don't get you there, go back and edit the original prompt instead. A conversation that has drifted is harder to steer than a new prompt with better details in it.
