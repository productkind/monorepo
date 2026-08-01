---
challenge: "1 - Prompt AI to communicate confidently in high pressure situations"
type: "Cheat sheet"
---
## Tone and Style Word Bank

The vocabulary to describe how you want something to sound, so you don't have to invent the words while you're already under pressure. Open it when a draft is technically fine but doesn't sound like you, or when you know the message is delicate and you want the level of formality right before you send anything.

### Where the words go

Add a tone and style block underneath your request in your chat assistant (ChatGPT or Claude.ai, where you type a request and copy the answer out). Two or three tone words and one or two style rules are enough.

```
Tone: warm, collaborative, confident, not blaming.
Style: 1-2 sentences, conversational Slack style, direct ask for a status or ETA, end with a brief thanks.
Audience: the three developers who built the checkout flow.
Length: under 40 words.
```

### Tone words, by the situation you're in

Pick two or three. Combining a warm word with a firm word usually works better than either on its own.

| The situation | Tone words to use | What they stop the AI doing |
|---|---|---|
| Chasing an urgent fix without nagging | collaborative, warm, confident, not blaming | Sounding like a formal escalation |
| Telling stakeholders something has slipped | direct, calm, accountable, no hedging | Burying the news in three paragraphs of caveats |
| Pushing back on a feature request | respectful, firm, curious, solution-focused | Either caving or sounding defensive |
| Announcing a release company-wide | clear, grounded, specific, credit-giving | Reading like marketing copy |
| Celebrating your team's work | warm, specific, generous, understated | Generic praise that names nobody |
| Explaining a decision people won't like | transparent, empathetic, final | Sounding uncertain about a decision that's already made |
| Asking an engineer to explain something | curious, concrete, no false expertise | Lecturing you, or assuming you know more than you do |
| Posting on LinkedIn as yourself | genuine, understated, conversational, specific | The thought-leader voice with the rocket emoji |
| Writing to a customer after an incident | apologetic without grovelling, factual, clear on next steps | Corporate non-apologies ("we regret any inconvenience") |

### Style rules, by what you're controlling

Tone is how it feels. Style is the shape it comes out in. These are the levers worth naming.

| What you're controlling | Write this in your prompt |
|---|---|
| **Length** | "Under 40 words", "three short paragraphs", "no more than 200 words" |
| **Format** | "One Slack message, no bullet points", "a bullet list of at most four points, one line each", "a single paragraph" |
| **Sentence shape** | "Short sentences, one idea each, no subclauses" |
| **Opening** | "Open with the ask, no preamble", "start with what changed for the user" |
| **Ending** | "End with a specific question", "end with a brief thanks, no sign-off" |
| **Vocabulary** | "No jargon a new joiner wouldn't know", "British English spelling" |
| **Emoji** | "No emoji", "at most one emoji" |
| **Perspective** | "Write as me, first person", "write as the product team, 'we'" |

### Banning the tells

AI writing has a handful of habits that make a draft recognisable as AI writing. Naming them stops them.

```
Do not use: "excited to announce", "I hope this finds you well", "game-changer", "10x", "unlock", "leverage", "delve", "in today's fast-paced world", em dashes, or the "not just X, but Y" sentence pattern.
```

Keep that line in a note somewhere and paste it into any prompt where the output has your name on it.

### Show it your own writing

Showing the AI what you sound like works better than describing it. Before your request, paste two or three things you've written.

```
Here are three Slack messages I sent to my team last month. Match my voice: how long my sentences are, how formal I am, whether I use emoji, how I open and how I close.

[paste message 1]
[paste message 2]
[paste message 3]

Now write ...
```

This works for LinkedIn posts, release notes, and stakeholder emails too. Keep a note with three good examples of each and reuse it.

### Naming a reference style

If you don't have your own samples to hand, point at something the AI has read a lot of.

- "Write it the way Lenny's Newsletter explains a product concept: concrete, one idea per paragraph, no exaggeration."
- "Structure it like a Basecamp Shape Up pitch: the problem first, then the appetite, then the solution."
- "Write it like a Stripe changelog entry: what changed, who it affects, what to do about it."

A Shape Up "appetite" is how much time the work is worth spending. A changelog is the running note a product publishes each time something changes.

Use this as a starting point rather than the whole instruction, since a reference style gives you the shape but not your voice.

### When the draft is wrong, add this

| The draft is... | Add this to the prompt |
|---|---|
| Four paragraphs when you wanted a line | "Length: under 40 words. Format: one Slack message, no bullets." |
| Too formal for your team | "Tone: conversational, the way I'd say it out loud in stand-up." |
| Too breezy for the audience | "Tone: professional and calm. No emoji, no exclamation marks." |
| Reading like a press release | "No marketing language. No adjectives praising the work. State what changed and who it helps." |
| Hedging when you need a decision | "Tone: decisive. State the decision in the first sentence. No 'we're considering' or 'we may'." |
| Blaming the team by accident | "Tone: not blaming. Ask about status, never about why it isn't done." |
| Vague where you needed specifics | Add the specifics yourself. Tone and style can't fix missing information, so give it the numbers, names, and dates. |

That last row is the one people miss most often. If the draft is thin rather than badly pitched, add the missing information instead of adjusting the tone words. The [Build a Prompt in Three Parts](TOOLKIT_LINK_PLACEHOLDER) template covers what to add.
