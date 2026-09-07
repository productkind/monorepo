---
status: drafted
brand: little-parrot
channel: seo
created: 2026-09-07
campaign: pm-technical-fluency-validation-2026-09
author: Kinga Magyar
voice: personal
experiment: personal-voice comparison
experiment_only: true
do_not_publish_alongside_original: true
slug_candidate: /guides/technical-feasibility-product-managers
primary_query: technical feasibility
secondary_queries:
  - technical feasibility product management
  - how to assess technical feasibility
  - technical feasibility checklist
  - software estimation
seo_title: "Technical Feasibility for Product Managers: A Checklist"
meta_description: "Assess technical feasibility before you commit. Use this Product Manager checklist to uncover dependencies, risks, unknowns and the next step."
conversion_url: /guides/technical-product-manager?utm_source=seo&utm_medium=organic&utm_campaign=tech-pm-26&utm_content=technical-feasibility-personal
---

# Technical feasibility for Product Managers: the checklist I use before committing

As a Product Manager, I've had to answer versions of the same questions many
times:

“Can we do this?”

Usually followed quite quickly by, “And how long will it take?”

Sometimes the proposed change looked tiny. One new button, an extra field in a
form, a setting someone wanted added. I could see the visible change, but I
couldn't yet see which systems, data or teams it would affect.

To be honest, saying “I don't know yet” never felt particularly comfortable.
But a commitment made before the team had examined the dependencies and
unknowns could force us to revise the scope or timing later.

So I learned to slow down that first conversation and assess the **technical
feasibility** of the change.

Technical feasibility is an assessment of whether a proposed change or feature
can work within the product's systems, data, integrations, team skills and
delivery constraints.

A Product Manager's role in that assessment is to make the proposed user behaviour clear, ask
questions that expose dependencies and uncertainty, and record what we know
before anyone promises scope or timing. Engineering owns the technical
assessment and implementation approach.

Here is the checklist I use to structure that conversation.

## My technical feasibility checklist

I start by making the feature specific. “Can we add subscriptions?” gives an
engineer very little to assess. I would describe the behaviour more like this:

> A workspace owner can pay for ten seats by card, add more seats later and
> receive one monthly invoice.

Now we have a user, actions, states and an outcome. The team can start tracing
what those actions would touch.

### 1. Clarify the user behaviour and states

- Who can take the action?
- What must be true before they can take it?
- What changes after they complete it?
- Can they undo or repeat it?
- Which permissions, account states or edge cases change the behaviour?

I have found that states expose quite a lot of hidden work. “A customer can
cancel” becomes several different behaviours once we ask whether the order has
been paid, packed, dispatched or partly refunded.

### 2. Ask what happens to the systems and data

- What will change on the frontend, backend service, database or internal tool?
- Where does the source data come from?
- Which system becomes the source of truth after the change?
- Does existing data need to be cleaned, moved or recalculated?
- Does the change involve personal, payment or other sensitive data?

I am trying to follow the user action through the product here. If a customer
changes something on screen, which system records it, which other systems need
the new value, and what happens if one of them keeps the old value?

### 3. Look for integrations and dependencies

- Which other teams, services, APIs or vendors does this depend on?
- Do those systems support the behaviour we want?
- Are there rate limits, contract limits, approval steps or release dates?
- What happens if an external service is slow, unavailable or returns an error?

Dependencies are often where a confident “yes” turns into “yes, if”. It's important to write
down the condition after that “if”, because it can change the scope, timing or
decision.

### 4. Ask how it could fail

- How could the feature fail for a user?
- Which failure cases must the team test before release?
- What will support teams need to see when something goes wrong?
- How will the team detect incorrect data or behaviour?
- Which accessibility, security, privacy or regulatory checks apply?

I can sound a little pessimistic when I ask these questions. I quite like this
part, though. It gives the team a chance to design the failure behaviour while
the feature is still being discussed, rather than after a customer has found
it for us.

### 5. Ask how we could deliver and release it

- Can we divide the work into a smaller useful version and later additions?
- Do we need a technical investigation, prototype or proof of concept before
  estimating the feature?
- Can we release it to a small group first?
- How will we monitor the release?
- What do we want to measure once the feature is live?
- Can we disable or roll back the change safely?

When a feature is difficult to estimate, the next useful step may be a short
technical investigation. That gives us a way to answer a specific unknown
before asking for a delivery estimate.

### 6. Separate facts, assumptions and unknowns

- Which answer is supported by evidence?
- Which answer is still an assumption?
- What could make the work materially larger?
- Which decision would be expensive or difficult to reverse?
- What is the cheapest safe way to answer the biggest unknown?
- Who owns that next step, and when will we know enough to decide?

The first meeting can end with unanswered questions. Just make sure that each important
unknown has an owner and a next step, so it doesn't disappear into the
meeting notes.

## A fictional example: changing a delivery address after checkout

I'm using a fictional example here because I don't want to turn a real
company's systems into a neat little story that never happened.

Imagine this request:

> Add an edit button so a customer can change their delivery address after
> placing an order.

It looks like one button and one form on screen. So what would I ask before
making a commitment?

| Area | My question | What the answer could change |
|---|---|---|
| User state | Until what point can the customer edit the address? | We may need different behaviour before and after warehouse fulfilment starts. |
| Data | Which system owns the current delivery address: checkout, orders or fulfilment? | Updating one database may leave the warehouse with the old address. |
| Integration | Can the fulfilment or courier API accept an address change after an order is created? | The external service may set a cut-off or require a cancellation and replacement. |
| Payment and risk | Does a post-payment address change require another fraud check? | The change may affect payment rules and manual review. |
| Failure | What does the customer see if our form accepts the address but the courier rejects it? | The flow needs a recoverable error state and information that helps the support team investigate. |
| Release | Can we offer the change only before fulfilment starts? | A narrower first version may help customers without automating every exception. |

A screen count tells me very little about scope. This conversation helps the whole team
trace the proposed action through data, integrations, states and failure cases.

## How to discuss rough scope without pretending we know more than we do

So, can this conversation give us a rough scope? Yes, once we are clear about
the uncertainty that still sits behind it.

I ask the engineers for two things:

1. A relative complexity judgement, such as low, medium, high or unknown.
2. The reasons that judgement could change.

For the delivery-address example, the answer might be:

> Medium if the courier API accepts updates before fulfilment and the order
> service already records address history. High if we need cancellation and
> replacement across several fulfilment partners. We need to check two APIs
before estimating.

I can work with that answer. It tells me what the current judgement depends on,
which evidence is missing and what we need to investigate next. An unsupported
number of days would give me none of those things.

## The technical feasibility summary you can take away

After the conversation, I write down the decision, evidence and open questions
in one place. You can copy this version:

```markdown
# Technical feasibility summary

## Product decision
[What decision are we trying to make?]

## Proposed user behaviour
[Who does what, under which conditions, and what changes afterwards?]

## Affected systems and data
- [System, service, database or internal tool]
- [Data read, created or changed]
- [Source of truth]

## Integrations and dependencies
- [Team, API, vendor, approval or release dependency]

## Important failure cases
- [Failure case and user consequence]

## Delivery and release considerations
- [Testing, rollout, monitoring, analytics and rollback requirement]

## Known facts
- [Evidence-backed fact]

## Assumptions and unknowns
- [Assumption or unanswered question] – Owner: [name]

## Rough complexity
[Low / medium / high / unknown]

This judgement depends on:
- [Condition that could change the size or approach]

## Recommended next step
[Decision, technical investigation, prototype, data check or narrower scope]
```

## What I own as the Product Manager

The Product Manager owns the decision context:

- the user problem and intended behaviour;
- the evidence that makes the work worth considering;
- the constraints and product trade-offs;
- the assumptions we need to test;
- the record of what we know, what remains uncertain and what we recommend.

Engineering owns the technical assessment and implementation approach. We work
together to understand the product behaviour, affected systems, risks and
missing evidence.

Over the years, I have become more comfortable saying that I need another
answer before I can commit. I feel confident when I know which questions to ask,
can recognise an assumption and wait for the right evidence before promising
scope or timing to a stakeholder.

## A few questions I am often asked

### Who is responsible for technical feasibility?

Engineering is responsible for assessing the technical approach and risks.
Product makes the user behaviour, decision and constraints clear, then uses the
assessment to decide whether to continue, narrow the scope or investigate an
unknown. Design, data, security, legal or operations may need to contribute
when the proposed change affects their area.

### Is technical feasibility the same as software estimation?

Feasibility asks whether the idea can work under the relevant constraints and
identifies the difficult or uncertain parts. Estimation forecasts the effort
or time after the team understands enough of that work. When an
unknown blocks an estimate, an investigation is the best next step.

### When should we assess technical feasibility?

I would assess it before a roadmap or delivery commitment whenever a proposed
change touches unfamiliar systems, sensitive data, external services,
migrations, performance limits or difficult-to-reverse decisions. Small and
familiar work may need only a brief conversation. High-uncertainty work may
need a technical investigation or proof of concept.

### Do Product Managers need to understand code to assess feasibility?

A Product Manager needs enough system context to describe the behaviour,
follow the explanation, ask about dependencies and failure cases, and use the
answer in a product decision. Engineering still owns production code and the
implementation choice.

## Practise making technical product decisions with evidence

We created Little Parrot's [technical Product Manager guide](/guides/technical-product-manager?utm_source=seo&utm_medium=organic&utm_campaign=tech-pm-26&utm_content=technical-feasibility-personal)
for Product Managers who want to understand how their product works,
investigate questions and contribute to scope and trade-off decisions with
clearer evidence.

If you want to try the checklist first, take one roadmap item currently
described as “small” and write down the user states, systems, data,
dependencies and failure cases it could involve. Which questions do you need an
engineer to help you answer?

### Experiment and publishing notes

- This is the personal-voice variant of
  `seo-article-01-technical-feasibility-for-product-managers.md`.
- Do not publish both versions. They target the same query and repeat the same
  checklist, example and template.
- If testing the copy before implementation, show each participant one version
  only and randomise which version they receive.
- Ask participants what they remember, whether they trust the author and
  whether they would use the template. Avoid asking only which version they
  “like”.
- Keep the SEO title, meta description and page design constant if the goal is
  to isolate the effect of voice.
- Validate the primary course route and email form before publishing the
  selected version.
