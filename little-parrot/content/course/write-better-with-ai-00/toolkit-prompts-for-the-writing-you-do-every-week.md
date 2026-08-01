---
challenge: "3 - Craft impactful LinkedIn posts that sound like you"
type: "Prompt library"
---
## Prompts for the Writing You Do Every Week

Ready-made prompts for the recurring writing jobs in a product manager's week, grouped by the moment you'd reach for them. Each one is already filled in with tone, style, and context, so you swap the details in brackets and paste the prompt into your chat assistant (ChatGPT or Claude.ai, where you copy the answer back out).

Every prompt here follows the structure in [Build a Prompt in Three Parts](TOOLKIT_LINK_PLACEHOLDER). Read them as worked examples as well as things to copy.

### Chasing a fix without sounding like you're chasing

Reach for this when you reported something a while ago, you need an answer today, and you don't want to spend your credibility on it.

```
Write a Slack message to the developers working on [the checkout page slow load issue].

Tone: warm, collaborative, confident, not blaming. Ask about status, never about why it isn't done yet.
Style: 1-2 sentences, conversational Slack style, one direct ask for a current status or ETA, end with a brief thanks.
Length: under 40 words. No emoji, no bullet points.

Context: I raised this [three weeks ago] and haven't heard back. [Checkout takes 12 seconds to load and people are abandoning carts.] I need an ETA today because [I'm reporting to the leadership team on Thursday]. I know the team is stretched across [the migration], so I don't want this to read as pressure.
```

### Announcing a release to the whole company

Reach for this when something has shipped and the people in sales, support, and finance need to know what changed and what it means for them.

```
Write a short Slack update for our company-wide #releases channel.

Tone: clear, grounded, credit-giving. No marketing language.
Style: one short paragraph explaining what changed for the user, then at most three bullets. Open with the change, not with a greeting.
Length: under 120 words. Do not use "excited to announce", "game-changer", or em dashes.

Context:
- What shipped: [Saved Dashboard Views, which lets users save their favourite dashboard filters and reopen them in one click]
- Who it's for: [the whole company, mostly non-technical. Sales and support will get questions.]
- Why it happened: [top customer request for two quarters; people were rebuilding the same filters every session]
- Details: [released to 100% of users this morning; built by Team Thunderbird]
- Leave out: [any specific time-saving figure, the beta numbers aren't verified]
```

### Turning a pile of Jira tickets into something readable

Reach for this at the end of a sprint or a release, when the raw material is 40 ticket titles and nobody outside the team will read them.

```
Below is an export of the Jira tickets that went into [the March release]. Group them into at most four themes, and write one sentence per theme describing what changed from the user's point of view. Ignore the estimates, assignees, and internal refactoring tickets (tidying up the code without changing what a user sees) unless they changed something a user can see.

Tone: factual and specific.
Style: a heading per theme, one sentence each. No adjectives praising the work.
Length: under 200 words total.
Audience: [account managers who talk to customers weekly and don't read Jira].

If a ticket title is too cryptic to interpret, list it separately under "Need your help interpreting these" rather than guessing what it means.

[paste or attach the Jira export]
```

The line about cryptic ticket titles is the useful bit. It stops the AI guessing at what a ticket means and hands you a short list of questions for your engineers instead.

### Telling stakeholders something has slipped

Reach for this when the date is moving and you want to say so once, clearly, rather than three times, vaguely.

```
Write an email to [the leadership team] telling them that [the payments migration] has moved from [12 June] to [10 July].

Tone: direct, calm, accountable. No hedging, no burying the news.
Style: the new date in the first sentence. Then the reason in two sentences. Then what changes for them and what happens next. No apology paragraph.
Length: under 150 words.

Context:
- Why it slipped: [the third-party provider's sandbox, their test copy of the system, was down for nine days, which blocked all integration testing]
- What we did about it: [we moved the team onto the reporting work in the meantime, so nothing else slipped]
- What it means for them: [the Q3 revenue forecast is unaffected; the customer pilot moves by four weeks]
- What happens next: [I'll confirm the new date is holding at the 24 June checkpoint]
- Leave out: [any blame directed at the provider by name]
```

### A one-pager for the exec team

Reach for this when you need the exec team to decide something, and you have one page to get it.

```
Write a one-page memo for [our senior leadership team] proposing [that we build a self-serve onboarding flow].

Tone: formal, persuasive, confident. Written as someone who has already done the analysis.
Style: lead with the recommendation and the ask. Then the problem with evidence, the proposal, what it costs, and the risks. Structure it like a McKinsey one-pager, with short labelled sections.
Length: under 300 words. No bullet lists longer than four items.

Context:
- The recommendation: [build self-serve onboarding, ship a first version in Q4]
- The ask: [approval for two engineers for eight weeks]
- Evidence: [62% of trial signups never complete setup; support handles 40 onboarding calls a month at roughly 30 minutes each]
- The alternative we rejected: [hiring a second onboarding specialist, because it doesn't scale past 200 accounts]
- Risks: [it may not work for enterprise customers, who need custom configuration]
- Leave out: [the technical design, they won't read it]

Use only the figures I've given you. If you need a number I haven't supplied, write [GAP: ...] instead of estimating.
```

### Saying no to a feature request

Reach for this when the answer is no and you want the relationship intact afterwards.

```
Write a reply to [a sales colleague] who has asked for [a custom CSV export format for one enterprise prospect]. The answer is no for now.

Tone: respectful, firm, curious, solution-focused. Decisive about the decision, openly interested in the underlying need.
Style: acknowledge the request specifically, give the reason in one sentence, offer what we can do instead, and end with a question about the underlying problem.
Length: under 120 words. Do not say "unfortunately" or "at this time".

Context:
- Why no: [it's a one-customer format and we'd own it forever; the roadmap this quarter is committed to the payments migration]
- What we can do: [the existing export plus a saved spreadsheet template, which we could put together this week]
- What I want to learn: [what the prospect does with the file once they've got it]
```

### A LinkedIn post that sounds like you

Reach for this when you've done something worth sharing and every draft you write feels either boastful or beige.

```
Draft a LinkedIn post for my personal profile about [finishing a short course on AI prompting].

Tone: genuine, understated, conversational. Someone telling colleagues about a useful discovery, not announcing an achievement.
Style: two or three short paragraphs, first person, no bullet list, no hashtag block. Open with a specific moment rather than a general statement. End with a real question, one I'd ask a colleague.
Length: under 150 words. Do not use "excited to share", "game-changer", "10x", "unlock", rocket emoji, em dashes, or the "not just X, but Y" pattern.

Context:
- What happened: [my AI output was generic until I started setting tone and style and giving proper context in the prompt]
- What I learned: [setting tone and style, giving context and background, and that a large language model (LLM) predicts likely text rather than understanding it]
- The bit that changed my output most: [banning specific phrases]
- Who reads this: [product managers and designers, many of them already sceptical about AI claims]
- Leave out: [any claim that I'm now an expert, and any productivity numbers]

Here are three posts I've written before. Match my voice: sentence length, how formal I am, how I open and close.
[paste three of your own posts]
```

### Turning meeting notes into decisions and actions

Reach for this straight after a meeting, while you still remember what the shorthand meant.

```
Below are my raw notes from [today's roadmap review]. Turn them into a summary with three sections: Decisions made, Actions with owners and dates, and Open questions.

Tone: neutral and factual.
Style: short bullets. Name the owner first in each action. Use the exact wording from my notes for anything contentious.
Length: as short as the content allows.

Rules:
- Only include a decision if my notes say it was decided. If it sounds like a decision but isn't clearly one, put it under Open questions.
- Only assign an owner if my notes name one. Never guess an owner or a date.
- Flag anything in my notes you couldn't interpret.

[paste your notes]
```

### Before you send any of these

Every prompt here produces a first draft, not a finished message. Run it through [Check an AI Draft Before You Send It](TOOLKIT_LINK_PLACEHOLDER) first, especially the numbers and the names.
