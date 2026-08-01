---
challenge: "4 - Learn more efficiently by using AI"
type: "Prompt library"
---
## Get AI to Explain a Technical Term

Prompts for the moment a word comes up in stand-up, everyone nods, and you don't want to be the one who stops the meeting. Open this afterwards and you'll understand the term, know where it sits in your product, and have a good question ready for next time.

### The three things every learning prompt needs

A prompt like "explain Redis" gets you a textbook paragraph you'll forget by lunchtime. Add these three and you get something you can use.

1. **The level you want.** Otherwise you get either a Wikipedia definition or a sentence written for a nine-year-old. Say who you are and what you already know.
2. **The context.** Where the term showed up, and what your product does. A term means something different in a payments product than in a video product.
3. **The purpose.** What you need it for changes the whole answer. Understanding it well enough to nod along is a different explanation from understanding it well enough to make a trade-off decision.

### The starter template

```
I'm a product manager at [a B2B analytics company]. I have [a working understanding of frontend, backend, and databases, but no coding background].

Explain [Redis] to me. Skip the history and skip anything I'd only need if I were implementing it myself.

Then tell me:
- What problem it solves, using an example from [an analytics product like ours]
- Where it typically sits in a product's architecture
- What it costs teams to use it: money, complexity, or maintenance
- One thing that goes wrong with it in practice

I need this because [it came up in stand-up and I want to follow the conversation next time it does]. Keep it under 300 words and don't use analogies involving cars or restaurants.
```

That last line is optional but effective. Overworked analogies are a default habit, and banning them usually gets you a more concrete answer.

### When you need to know how it fits your product

Reach for this when the general explanation makes sense but you still can't picture where it lives in your system.

```
[Redis is an in-memory data store used for caching and fast lookups.] I understand that much.

Our product is [a dashboard where customers run reports over their own sales data. Reports can take several seconds to generate. We're on Postgres.]

Walk me through three concrete places a team like ours would plausibly use Redis, what would get faster, and what could go wrong in each case. Be specific about the trade-off rather than listing benefits.

Then tell me which of the three is most likely to be the one my engineers are talking about, and why.
```

The answer is informed speculation about a product it has never seen, so treat it as a set of hypotheses to check with your team rather than the truth about your codebase.

### When you have to make a decision

Reach for this when the term is attached to a choice: build or buy, now or later, this tool or that one.

```
My engineering team is proposing [we add Redis for caching report results]. I need to understand the decision well enough to weigh it, not to make it for them.

Give me:
- The case for it, in the strongest form an engineer would make it
- The case against, in the strongest form a sceptical engineer would make it
- What it costs us in ongoing maintenance and money, roughly
- What we'd have to accept as a downside if we say yes
- What we'd be choosing instead if we say no

Then give me the three questions I should ask the team that would tell me the most about whether this is the right call now.
```

Asking for both sides in their strongest form stops you getting an answer that agrees with whichever way you phrased the question.

### When you want questions for your engineers

Reach for this before a technical review, a refinement session, or a chat with your tech lead.

```
I'm meeting my tech lead tomorrow about [the caching work]. I now understand [that Redis stores frequently used data in memory so it doesn't have to be recalculated].

Give me five questions I could ask that would:
- Show I've done my homework rather than testing them
- Help me understand the impact on users and on our roadmap
- Surface risks that would affect dates

For each question, tell me in one line what a concerning answer would sound like.
```

### When you need to check you've actually understood

Reach for this at the end. Explaining something back is the fastest way to find the hole in your understanding.

```
Here's my understanding of [Redis] in my own words:

[write your explanation here, two or three sentences]

Tell me what's accurate, what's imprecise, and what's wrong. Be specific about which word or phrase is the problem. Don't be encouraging about it. Then give me a corrected version of my explanation, keeping my wording where it was right.
```

### When you have to explain it onwards

Reach for this when a designer, an exec, or a customer needs the short version and you're the one giving it.

```
I need to explain [why report loading got faster] to [our sales team, who have no technical background and need to answer customer questions].

Write two versions:
1. One sentence they can say on a call
2. A short paragraph for the internal FAQ, in case someone asks a follow-up

Don't use the words [Redis, cache, or in-memory]. Explain it in terms of what the customer experiences.
```

### When you're stuck in a technical document

Reach for this when you've been handed an RFC or a design doc and you're three paragraphs in.

```
I'm reading a technical design document from my engineering team and I'm stuck. Here's the section:

[paste the section]

Tell me:
- What this section is actually proposing, in three sentences
- Which terms in it I need to understand to follow the rest of the document
- What decision, if any, is being made here that I should have an opinion on
- Anything in it that would affect users, dates, or cost

Don't explain terms I probably already know as a PM, like API or database.
```

### What to be careful about

The model knows the general shape of these technologies well. It knows nothing about your product. Everything it says about *your* architecture is a guess based on what similar products usually do.

So use it to arrive at the conversation prepared, and treat what it tells you about your own system as questions to confirm. "Am I right that we're caching report results rather than raw data?" is a much better line in a review than a confident statement that turns out to be wrong.

And check the specifics before you repeat them. [Check an AI Draft Before You Send It](TOOLKIT_LINK_PLACEHOLDER) covers the habit.
