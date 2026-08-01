---
challenge: "2 - Write clear internal product updates with less effort"
type: "Checklist"
---
## Check an AI Draft Before You Send It

A quick checklist to verify what AI wrote for you, before it goes into Slack, an inbox, or a deck. Reach for it whenever your name is on the message and someone might act on what's in it.

### Why the check exists

A large language model (LLM), the technology behind AI chat assistants like ChatGPT and Claude.ai, predicts the next piece of text based on patterns, so it produces what looks likely rather than what's true. When something is missing from the context, it fills the gap with something plausible. That's called hallucination, and it comes with how the technology works, so no wording will switch it off. The good news is that hallucinations in product management writing are predictable, so you know what to look for.

### What to look for

Verify these in every draft AI creates for you.

- [ ] **Every number.** Percentages, load times, user counts, revenue, dates. If you didn't give it that number, treat it as unverified until you've checked it.
- [ ] **Every name.** People, teams, features, customers, tools. Check spelling, and check that the person did the thing you're crediting them for.
- [ ] **Every cause-and-effect claim.** "Because of the new onboarding flow", "which is why churn dropped". The AI has no idea what caused what unless you told it.
- [ ] **Every promise.** "Available next week", "rolling out to all customers", "we'll follow up on Friday". You're the one who has to keep these.
- [ ] **Anything you can't back up.** If someone replied "where does that figure come from?", could you answer?
- [ ] **The voice.** Read it aloud. Would you say this sentence to this person? Cut anything you wouldn't.
- [ ] **The jargon.** Would the newest joiner in the audience understand every word?
- [ ] **What's missing.** AI drafts what you asked for. It won't tell you that you forgot to mention the migration, or that the customer name shouldn't be public.

### Where AI invents things in PM writing

These are the parts worth reading twice, because they're where a draft goes wrong most often.

| What it invents | What it looks like |
|---|---|
| **Metrics** | "Reduces setup time by 40%", when you only said beta testers liked it |
| **Customer quotes** | A convincing testimonial from nobody |
| **Timelines** | "Shipping in Q3", when you gave it no date at all |
| **Feature names** | Renaming "Saved Dashboard Views" to "Dashboard Presets" |
| **Technical detail** | Explaining how your caching works, from patterns it saw elsewhere |
| **Scope** | Turning "released to all users" into "rolling out gradually over the next month" |
| **Links and docs** | Confident URLs to pages that don't exist |

### Make the check faster

Ask the AI chat assistant to mark its own guesses in the draft. It won't catch everything, but it shows you the obvious gaps in seconds.

```
Before I send this, go through the draft and list every factual claim in it: numbers, dates, names, and any cause-and-effect statement. For each one, say whether it came from the context I gave you, or whether you filled it in yourself. Do not rewrite the draft.
```

Then delete or replace anything on the "filled it in yourself" list.

A second useful one, for anything going to a wide audience:

```
Read this as a sceptical reader who wasn't in any of the meetings. List the questions they'd have after reading it, and anything they might misread.
```

### One thing that doesn't work

Asking "are you sure?" or "is this accurate?" isn't verification. The AI chat assistant will answer that question the same way it wrote the draft, by predicting a likely response. Sometimes it backs down on a claim that was correct, sometimes it defends one it invented. Ask the same question twice and you can get two different answers.

Verification means checking it yourself against the source: the Jira ticket, the dashboard, the person who knows the answer.
