---
status: drafted
brand: little-parrot
channel: seo
created: 2026-09-10
campaign: pm-technical-fluency-validation-2026-09
author: Kinga Magyar
voice: personal
primary_keyword: ai prototyping for product managers
secondary_keywords:
  - ai prototyping
  - how to prototype with ai
  - ai prototype example
  - ai product prototype
search_intent: learn how to build a bounded AI-assisted prototype that tests one product assumption
slug: /guides/ai-prototyping-product-managers
canonical: https://littleparrot.app/guides/ai-prototyping-product-managers
meta_title: 'AI Prototyping for Product Managers: A Practical Guide'
meta_description: 'Use AI prototyping to test one product assumption. Follow a worked Product Manager example, copy the prompt and keep production questions visible.'
conversion_destination: /guides/technical-product-manager
---

# AI prototyping for Product Managers: test one assumption before you build

I'm impatient. Once a rough product flow begins to work, I immediately want to add the next feature.

An AI coding tool makes that temptation quite difficult to resist. I can ask for another page, adjust the navigation and add a dashboard before I have stopped to ask whether any of it helps the product team make a decision.

So I think about my goal with creating a prototype, before I build anything.

**AI prototyping for Product Managers** means using an AI-assisted building tool to create a testable version of an idea or interaction. The prototype helps the product team examine a specific assumption before committing to wider design and engineering work.

A working screen demonstrates that one flow can run in the conditions you tried. It cannot tell you on its own whether customers need the product, whether the design is accessible, whether the code is secure or how much work a production version will require.

I'll use one fictional example throughout this article: a product team responsible for a live B2B project-planning product is considering a new customer-facing feature. When a project schedule moves, project leads currently change task dates one by one. The proposed feature would let them select several tasks, shift their dates and review every change before confirming it.

The team uses an AI coding tool to prototype that feature before deciding whether it deserves further design and engineering work. I have made the example fictional because I don't want to turn a real company's product or customer research into a neat story that never happened.

## A new feature that quickly grows beyond one flow

Imagine I am the Product Manager on that team. I ask an AI coding tool to recreate a small part of the existing project schedule and add the proposed bulk-rescheduling flow. The prototype uses invented tasks and remains disconnected from the live product.

The first version lets a project lead select several tasks and move them by seven days. It looks promising. And I can already think of what should come next:

- permissions for changing someone else's tasks;
- recurring tasks and milestones;
- calendar integrations;
- team notifications;
- a change history and undo option; and
- dependency rules across several projects.

All of those behaviours may be required eventually. None of them tells me whether a project lead can understand the preview well enough to confirm the right date changes without moving fixed tasks by mistake.

This is where an AI prototype can easily become a small software product. The build grows because the tool can generate more, while the original uncertainty remains untested.

## I clarify our goal before building the prototype

For this example, I would write:

> We need evidence about whether a project lead can understand which task dates will change, notice the dates that must remain fixed and correct the selection before confirming a bulk update.

The product decision is whether the bulk-rescheduling feature deserves further design and technical feasibility work. The risky assumption is that a preview can make a large date change understandable enough for a project lead to confirm it safely.

Teresa Torres describes product assumptions as beliefs that need to be true for an idea to succeed. Her [guide to the five types of product assumptions](https://www.producttalk.org/five-types-of-assumptions/) covers desirability, viability, feasibility, usability and ethical assumptions. A prototype can expose some of these, but only when we name the assumption and choose a suitable test.

The bulk-rescheduling feature contains several uncertainties:

- **Desirability:** Do project leads need to move several dates often enough for this feature to help them?
- **Usability:** Can they understand the proposed changes, fixed dates and consequences before confirming?
- **Feasibility:** Can the product update task dependencies and connected calendars correctly?
- **Viability:** Can the company support the notification, audit and customer-support requirements?
- **Ethical risk:** Could someone change colleagues' deadlines without sufficient notice or control?

I am focusing this prototype on the usability of the preview and confirmation flow. Other questions need other evidence. Customer interviews and product data may tell us how often people face the scheduling problem. Engineering needs to assess dependencies, integrations and data changes. Product Design needs to consider how the interaction fits the rest of the live product.

This distinction stops one positive test from becoming a claim that the whole product idea has been “validated”.

## What I deliberately leave out

The prototype needs enough behaviour to expose the assumption:

> Open a project schedule → select several tasks → move them by seven days → review changed and fixed dates → correct the selection → confirm.

I would include:

- one project lead;
- one project containing twelve invented tasks;
- one bulk change of seven days;
- two tasks with dates that cannot move; and
- one complete preview, correction and confirmation flow.

I would leave out:

- sign-in and permissions;
- permanent data changes;
- real notifications;
- recurring tasks;
- calendar and project integrations;
- complete dependency calculations; and
- production or customer data.

The exclusions are part of the product work. They keep the test small, protect information and make it easier to tell which interaction produced the evidence.

Your company's security, privacy and procurement rules still apply to prototype tools. Invented project data is enough for this first interaction test.

## The prompt I would give the AI coding tool

The prompt carries the product question into the build. Here is the version I would use for the bulk-rescheduling feature:

```text
Build a prototype for this product test.

Context: We manage an existing B2B project-planning product. Project leads currently change task dates one by one when a schedule moves.

Decision: Should the team continue discovery of a customer-facing bulk-rescheduling feature?

Assumption: A project lead can understand which task dates will change, notice the dates that must remain fixed and correct the selection before confirming a bulk update.

User: A project lead managing a customer implementation.

Task: The launch has moved by one week. Move the affected tasks by seven days without changing the fixed compliance-review dates, and check the result before confirming it.

Build this flow only:
1. Show one project schedule containing twelve invented tasks.
2. Let the user select several tasks and choose to move them by seven days.
3. Preview every old and proposed date before confirmation.
4. Keep two compliance-review tasks fixed and explain why they cannot move.
5. Let the user return to the selection and correct it.
6. Confirm the change and show the simulated updated schedule.

Use only the invented project data below. Do not add sign-in, permissions, permanent storage, real notifications, recurring tasks, integrations or connections to production systems.

Before making a change, explain which part of the product test it supports.

[Insert twelve invented tasks, including two fixed compliance-review dates]
```

The final instruction gives me a chance to notice when my request has drifted away from the test. It does not guarantee that the tool will make the right design or technical choices. I still need to inspect the result, test the behaviour and save a checkpoint before a significant change.

I would keep a short set of checks too:

1. Can I select several tasks and choose a seven-day shift?
2. Does the preview show every old and proposed date?
3. Are the two fixed compliance-review tasks unchanged and explained?
4. Can I return to the selection and correct it?
5. After confirmation, are the selected tasks changed and all other tasks unchanged?

An AI-generated correction can fix the example in front of me and alter behaviour that already worked. Rerunning the same checks helps me see both.

## How I would test it with a project lead

I would give a project lead who uses this kind of planning product the following task:

> Your customer's launch has moved from 14 October to 21 October. Move the affected preparation tasks by seven days, keep the compliance reviews on their fixed dates and check what will change before you confirm it.

I would not tell them to select the task checkboxes, open _Move dates_ and inspect the warning panel. That would test whether they can follow my instructions.

Nielsen Norman Group recommends turning user goals into [realistic task scenarios](https://www.nngroup.com/articles/task-scenarios-usability-testing/) that prompt an action without revealing how the interface should be used. The task needs enough context to feel believable while leaving the participant to work out the interaction.

During the session, I would pay attention to:

- what the participant tries without help;
- where they pause, go backwards or ask a question;
- whether they complete the task;
- which proposed date changes they inspect or question;
- whether they notice the fixed tasks;
- any wrong, missing or misleading preview information; and
- the words they use when explaining the result.

Nielsen Norman Group describes a [user-interface prototype as a design hypothesis](https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/) and recommends testing it by watching users work with it. The visual finish should suit the question. A polished interface may be useful when the test depends on realistic interaction, but visual polish cannot compensate for an unclear research question.

I would run through the task before inviting a participant. The practice run should use the same prototype version and invented project schedule. It can catch a broken path or missing result before the session starts.

## What the test could tell us

Because this is a fictional example, the observations below are possible outcomes, not results I am claiming to have seen.

Imagine the participant selects all preparation tasks, opens the preview and notices that two compliance reviews will remain fixed. They return to the schedule, remove an unrelated task and then confirm the revised dates.

Here is how I would record that:

| What I observed | What it may support | What it does not establish |
| --- | --- | --- |
| The participant compared the old and proposed dates before confirming. | The preview supported this participant's review of the change. | Every project lead will inspect every proposed date. |
| They noticed that two compliance reviews remained fixed and explained why. | The exception message was understandable in this session. | The product can calculate every real dependency correctly. |
| They returned to the schedule and removed an unrelated task. | The correction path was discoverable in this session. | The feature would prevent every accidental change. |
| They completed the task using twelve invented tasks. | The flow can support this controlled example. | The feature will work with production data, permissions, notifications or integrations. |

The last column prevents the prototype from carrying claims it cannot support.

The opposite result would also be useful. If the participant confirms without noticing the fixed tasks, the preview does not make the exception visible enough. If they cannot work out how to correct the selection, the central assumption needs to change.

So the next action could be to revise the preview design, run another small test or stop pursuing this version. A completed prototype does not oblige the team to keep building it.

## Where the prototype stops

The closer a prototype looks to finished software, the easier it is to attribute qualities that have not been assessed.

Using Teresa Torres's five assumption types from earlier, the bulk-rescheduling test has examined one usability assumption. Desirability, feasibility, viability and ethical assumptions remain open. We still do not know how often project leads need this feature, whether the product can update every dependency correctly, whether the company can support the audit and notification requirements or which controls should protect colleagues whose deadlines may change.

The prototype can help us ask:

- Can the intended user complete this interaction?
- Can they inspect the proposed changes and fixed dates?
- Can they correct the selection before confirming it?
- Which part of the preview confuses or misleads them?
- Which assumption should the team test next?

A production decision also needs answers about:

- access and permissions;
- data protection, retention and deletion;
- task dependencies, recurring work and milestone rules;
- calendar and project integrations;
- notifications, audit history and undo behaviour;
- scale, performance and failure handling;
- accessibility;
- testing and monitoring;
- customer support;
- maintenance and ownership; and
- the engineering approach and likely effort.

![The boundary between a focused AI prototype and a production decision. A prototype can test one user, task, flow and set of approved examples. A production decision also needs assessment of access, data, failures, scale, monitoring, support and maintenance. The team reviews the evidence and gaps together before deciding what happens next.](./assets/prototype-production-boundary.svg)

The speed of the prototype is not an estimate for production work. The first build excluded most of the conditions that make software safe and dependable for real users.

If the idea moves forward, use a [technical feasibility assessment](/guides/technical-feasibility-product-managers) to examine those dependencies and unknowns with Engineering before committing to scope or timing.

## The record I would bring to the team

I would bring the prototype and a short decision record to Product, Design, User Research and Engineering:

```markdown
# Prototype decision record: bulk task rescheduling

Question tested: Can a project lead understand which dates will change, notice fixed dates and correct the selection before confirming a bulk update?

Prototype version and date: [Link, version and test date]

Test conditions: One project lead, twelve invented tasks, a seven-day schedule change and two fixed compliance-review dates.

Observed evidence: [Actions, questions, errors, corrections and participant wording]

Simulated or excluded behaviour: Invented project data; no sign-in, permissions, permanent changes, notifications, recurring tasks, integrations or production-system connections.

What this evidence does not establish: Demand, dependency calculations, production data changes, permission rules, notification behaviour, reliability, accessibility, support or engineering effort.

Recommendation: [Continue, change, stop or investigate another question, with reasoning]

Open questions and owners:

- [Question] – [Owner] – [Review date]
```

Product can explain the decision and evidence. Design and User Research can challenge the interaction and test quality. Engineering can identify technical assumptions, dependencies and production work. Security, privacy, legal, data or operations colleagues should join when the idea touches their area.

SVPG's [guidance on discovery judgement](https://www.svpg.com/discovery-judgement/) makes a separate point about how the team works: a Product Manager should draw on Engineering when assessing feasibility and on Product Design when assessing usability. Different ideas carry different consequences, so the team must decide together which assumptions need more evidence and how much evidence is enough.

## Copy this AI prototype brief before you build

The completed story gives each field some context. Here is the blank version you can use for your own prototype:

```markdown
# AI prototype brief

## Product decision

[Which decision will this evidence inform?]

## Assumption to test

We need evidence about whether [specific uncertain behaviour or condition].

## Intended user and task

- User: [Who should try it?]
- Starting situation: [What do they know or have before they begin?]
- Task: [One realistic outcome to achieve, without explaining the interface]

## Flow required for the test

1. [Starting action]
2. [Important choice or interaction]
3. [Result the user can inspect]

## Example input and output

- Example input: [Invented or approved test data]
- Expected output: [A concrete example of the result]

## Boundary

- Included: [Behaviour required for this test]
- Excluded: [Work outside the test]
- Data allowed: [Invented, anonymised or specifically approved data]
- Connections allowed: [None, simulated services or approved test services]
- Review or deletion date: [Date]

## Evidence

- Evidence that may support the assumption: [Observable behaviour]
- Evidence that may contradict the assumption: [Observable behaviour]
- What we will record: [Actions, comments, errors and output quality]

## Known limits

- Simulated behaviour: [What looks real but is not]
- Untested conditions: [What the test does not cover]
- Production questions: [What the team would still need to assess]

## Next decision

After the test, we will [continue, change, stop or investigate] based on [evidence].
```

The prompt tells the AI coding tool what to generate. This brief records why the prototype exists, how you will test it and which conclusions the team cannot draw from it.

## Questions Product Managers often ask about AI prototyping

### Is AI prototyping the same as vibe coding?

Vibe coding describes building software by telling an AI coding tool what you want and iterating on the generated result, often without writing every line yourself. AI prototyping describes the purpose of the artefact: testing or explaining an idea. You can use vibe coding to make a prototype, but the prototype still needs a defined question, suitable test and clear boundary.

### Do Product Managers need to know how to code to build an AI prototype?

Some AI app builders can create a working flow from written instructions. You still need enough technical understanding to protect data, recognise the limits of the build, save versions, test changes and know when to involve Engineering. The aim is to contribute a testable artefact and evidence, rather than take responsibility for production engineering.

### Can we release the prototype if it works?

Treat release as a separate team decision. A successful prototype test does not demonstrate secure access, correct data handling, reliability, performance, monitoring, accessibility, support or maintenance. Engineering and any relevant specialists need to assess those conditions and agree who will own the software.

### Does an AI prototype replace a product requirements document?

A prototype can make an interaction easier to inspect than a long description. It does not record the user problem, evidence, constraints, excluded behaviour or open decisions by itself. Pair the flow with a short decision record so the team can see what it does and why it exists.

### How long should an AI prototype take?

Set a time limit based on the value of the unanswered question. Stop when the prototype can produce the required evidence, when another method becomes more suitable or when the work reaches data, security or production decisions that need specialist input. A prototype that keeps growing can delay the learning it was meant to support.

## Become a Technical Product Manager Without Becoming an Engineer

We're testing interest in an upcoming Little Parrot transformational learning path called [**Become a Technical Product Manager Without Becoming an Engineer**](/guides/technical-product-manager).

It's for non-technical software Product Managers who want to understand how their product works, investigate questions and contribute to scope and trade-off decisions with clearer evidence. The learning path isn't available yet. If you'd like us to tell you when it opens, [visit the landing page and register your interest](/guides/technical-product-manager).

Before your next prototype, write one sentence beginning _"We need evidence about whether..."_ Then list every feature you can leave out while still answering that question.

### Publishing notes

- Add a downloadable or copyable version of the AI prototype brief immediately after the visible template.
- Use the editable SVG production-boundary diagram included with the article. A PNG export sits beside it as a preview and fallback.
- Add `Article` and `BreadcrumbList` structured data.
- Show author credentials, a published date and an updated date.
- Add the MVP/prototype/proof-of-concept comparison link only after that page is live.
- Validate the learning-path landing page and interest form before publishing.
