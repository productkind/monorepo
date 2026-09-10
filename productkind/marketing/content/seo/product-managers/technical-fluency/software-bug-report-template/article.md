---
status: drafted
brand: little-parrot
author: Tamas Kokeny
voice: personal
primary_keyword: how to write a bug report
secondary_keywords:
  - software bug report template
  - bug report example
  - what should a bug report include
  - bug report format
search_intent: learn how to structure and word a software bug report that a product team can investigate
slug: /guides/software-bug-report-template
canonical: https://littleparrot.app/guides/software-bug-report-template
meta_title: 'How to Write a Software Bug Report: Template and Example'
meta_description: 'Write a software bug report engineers can investigate. Copy a practical template with a completed checkout example, evidence and clear unknowns.'
conversion_destination: /guides/technical-product-manager
---

# How to write a useful software bug report

When I open a bug report, I try to reconstruct one specific interaction with
the product. Who took the action? What state was their account in? What did
they expect, and where did the result become different?

I've worked as a software engineer and engineering leader for 15 years. The bug
reports I find easiest to investigate are rarely the longest. They describe one
observable problem, give me the conditions and steps, and keep facts separate
from possible explanations.

A software bug report is a shared record of unexpected product behaviour. It
should let another person reproduce or examine the problem, understand its
effect on users and see which questions remain unanswered.

The report will change during the investigation. Product may add evidence about
affected customers. Engineering may add a request identifier, technical cause
or fix. Quality Assurance may add another condition or verify the corrected
behaviour. We are all working in the same record.

Below is the bug report template I would want a Product Manager to use, followed
by a completed example and an explanation of each section.

## Do the triage before writing the final report

A report works best after the team has established the observed behaviour,
conditions, impact and urgency. Our [bug triage guide for Product
Managers](/guides/bug-triage-product-managers) explains how to gather that
evidence and decide the next action with Engineering.

Possible security issues, exposed data, incorrect payments or widespread
failures should follow your company's incident process immediately. You can
create or improve the written record while the response is under way.

This article begins once you have enough evidence to describe the issue. It
focuses on how to structure and word that evidence so the product team can use
it.

## Copy this software bug report template

```markdown
# [Observed behaviour] when [specific condition]

## Context and conditions
- Environment: [Production, staging or test]
- User or account state: [Role, plan, signed-in state or relevant history]
- Device and software: [Device, operating system, browser or app version]
- Product configuration or test data: [Relevant setting, product, region or input]

## Steps to reproduce
Starting state: [Where the user begins and anything that must already be true]

1. [First action]
2. [Second action]
3. [Action immediately before the problem]
4. [Observe the result]

Reproduction result: [Every time / intermittent / observed once / could not reproduce]

## Expected behaviour
[What should happen after the final action]

## Actual behaviour
[What happens instead, including the exact visible error]

## Evidence
- Time and timezone: [When the problem happened]
- Page, screen or feature: [URL or location]
- Screenshot or recording: [Link]
- Error message: [Exact wording]
- Approved technical evidence: [Request ID, status code or safe log reference]

## User impact and workaround
- Affected users or journey: [Confirmed scope]
- Lost or degraded capability: [What the user cannot do]
- Workaround: [Verified alternative, or none known]

## Confirmed, suspected and unknown
- Confirmed: [What the evidence demonstrates]
- Suspected: [Possible explanation, clearly labelled]
- Unknown: [Question still needing investigation]

## Related information
- [Existing issue, customer conversation, release or product change]
```

Your issue tracker may use different labels or separate fields. Keep the same
information even when the screen looks different. GitHub's [example bug issue
form](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms)
asks for current behaviour, expected behaviour, reproduction steps and the
environment. Chromium's [bug-reporting
guidelines](https://www.chromium.org/for-testers/bug-reporting-guidelines/)
also ask for a problem description, detailed steps, expected behaviour and
useful screenshots.

## A completed bug report example

I will continue the fictional saved-card checkout issue from the bug triage
article. The team has reproduced the failure, confirmed a workaround and found
one failed request. The technical cause is still under investigation.

```markdown
# Signed-in customer returns to the basket after confirming a saved card

## Context and conditions
- Environment: Production report, reproduced in staging
- User or account state: Signed-in customer with a previously saved card
- Device and software: MacBook, macOS Tahoe 26.6.2, Safari 26.6.1
- Product configuration or test data: Monthly Team plan, one licence, Portugal

## Steps to reproduce
Starting state: Sign in to the staging test account that already has a saved card.

1. Add the monthly Team plan to the basket.
2. Open checkout and keep the saved card selected.
3. Confirm the payment.
4. Observe that checkout returns to the basket and shows "We couldn't complete your order."

Reproduction result: Reproduced on every saved-card attempt using two staging test accounts. Entering the card again succeeds when the account, browser and basket stay the same.

## Expected behaviour
The customer should reach the order-confirmation page and see the new licence in their account.

## Actual behaviour
Checkout returns to the basket and shows "We couldn't complete your order." No order appears in the customer's account.

## Evidence
- Time and timezone: 10 September 2026, 14:32 WEST
- Page, screen or feature: `/checkout/payment`
- Screenshot or recording: [Internal link to the staging recording]
- Error message: "We couldn't complete your order."
- Approved technical evidence: `POST /payments/confirm` returned `400`; the response referred to a missing billing-address field. Request ID: `req_test_7F21`.

## User impact and workaround
- Affected users or journey: Confirmed for two staging accounts using a saved card. Production reach is still being checked.
- Lost or degraded capability: The customer cannot finish checkout with their saved card.
- Workaround: Entering the card again completes checkout in staging.

## Confirmed, suspected and unknown
- Confirmed: The saved-card journey sends a request that the server rejects because a required field is missing.
- Suspected: The saved-card form may fail to add the current billing address to the request.
- Unknown: Which change introduced the behaviour, when it began in production and how many customer attempts are affected.

## Related information
- Customer report: [Internal support link]
- Related release: [Release link, added after the team verifies a connection]
```

The example gives an engineer a place to begin without claiming that the `400`
response is the root cause. It also gives Product enough information to keep
checking the reach and customer consequence while the technical investigation
continues.

## How I fill in each part of the report

The template is the copyable version. The sections below explain what I look
for when I read each field.

### 1. Write the title after you understand the behaviour

A title should describe what the user observes and the condition that triggers
it.

| Too broad | Useful title |
|---|---|
| Checkout broken | Signed-in customer returns to the basket after confirming a saved card |
| Login issue | Workspace owner sees an expired-session message after accepting an invitation |
| Export does not work | CSV export remains at 0% for reports containing more than 10,000 rows |

Avoid putting an unverified cause in the title. *"Payment API failure"* sends
the investigation towards one system before the evidence supports that choice.
The title can be updated after Engineering confirms the cause.

### 2. Describe the conditions that affect the result

The same action can behave differently because of account state, permissions,
configuration, browser, app version, region or existing data.

Include the conditions that were present when you reproduced the issue. You can
leave unrelated details out. A checkout failure probably needs the customer
state, payment path, product and environment. The colour of the customer's
profile image will not help.

I find comparisons especially useful. If the same account succeeds with a newly
entered card and fails with a saved card, put that result beside the conditions.
It reduces the number of combinations the team needs to test again.

### 3. Make the steps possible to follow without guessing

Start with a known state, then number one action per step. Name the page,
control, option and test data when they affect the result.

Compare these two versions:

> Go to checkout and pay. It fails.

> Sign in to the staging test account with a saved card. Add the monthly Team
> plan to the basket. Open checkout, leave the saved card selected and confirm
> payment. Checkout returns to the basket.

The second version tells me which state to create and which action immediately
precedes the failure. It also gives another person the same test to run after a
fix.

If the issue is intermittent, record the attempts: *"failed twice in ten
attempts"* is more useful than *"sometimes fails"*. If you cannot reproduce it,
write down the conditions you tried and keep the original user's evidence in
the report.

### 4. Keep expected and actual behaviour separate

Expected behaviour describes the result the product is supposed to produce.
Actual behaviour records what you observed.

This separation catches misunderstandings as well as defects. The team may
discover that the product follows the current rule while the interface, help
text or product decision needs to change. The report still helped by making the
difference explicit.

Use the exact visible message in the actual behaviour. Paraphrasing *"Your
session has expired"* as *"login error"* removes information that may identify
the failing state.

### 5. Attach evidence that another person can locate

A screenshot shows one state. A short recording shows the sequence and timing.
Use whichever helps another person find the unexpected behaviour, and add a
written description so the report remains searchable.

Useful evidence can include:

- the exact time and timezone;
- the page URL or app screen;
- a screenshot or short recording;
- the complete visible error message;
- a request or correlation identifier;
- an approved status code or safe log reference;
- a link to the relevant customer conversation or analytics view.

Do not paste passwords, access tokens, full payment details or unnecessary
personal information into the issue tracker. Check screenshots, recordings,
requests and log excerpts before sharing them. Follow the company's privacy and
security rules, and ask an engineer which identifiers are safe when you are
unsure.

### 6. State the user impact and verified workaround

The report should say what the affected person cannot do. *"Checkout error"*
describes a location. *"A returning customer cannot complete an order with a
saved card"* describes the lost capability.

Add the confirmed reach and frequency from triage without repeating the full
priority discussion. If those numbers are still being checked, say so.

A workaround helps the team support users and make a priority decision. Verify
it before including it. A workaround that causes data loss, duplicate payment
or an unsupported account state can create a second problem.

### 7. Label facts, suspected causes and unknowns

I pay close attention to this section because a confident guess can narrow the
investigation too early.

Use three labels:

- **Confirmed:** directly supported by a reproduction, response, log, recording
  or other evidence.
- **Suspected:** a possible explanation that still needs testing.
- **Unknown:** a question the team has not answered yet.

For the saved-card example, the response confirms that the server rejected a
missing field. The frontend omitting that field is still a suspected cause.
Another service could have removed it, or a server-side rule could have changed.

Hypotheses are welcome. Their label tells the next person how much confidence
to place in them.

## Keep one observable problem in each report

One report should describe one behaviour the team can investigate and verify.
If profile images fail to upload and password-reset emails also fail, create two
reports unless evidence shows they are the same failure.

Link related reports so the team can see the pattern. Combining several
unrelated symptoms into one ticket makes ownership, testing and closure harder
to interpret.

Search the issue tracker before creating a new report too. When an existing
issue describes the same behaviour, add the new conditions, frequency or
evidence there. [MDN's guidance for filing browser
bugs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/File_browser_bugs)
also recommends searching existing reports and adding information that extends
what the team already knows.

## Keep the report current while the team investigates

The first version records what the team knows at the start. Update it when:

- another user, account or environment confirms the behaviour;
- the reach or workaround changes;
- Engineering verifies the technical cause;
- the team contains the effect or releases a fix;
- someone verifies the expected behaviour after the fix;
- a release, pull request or follow-up issue should be linked.

Avoid making people reconstruct the current state from a long comment thread.
Update the main fields or add a short current-status section, depending on how
your issue tracker works.

The report then helps Support, Product, Engineering and Quality Assurance refer
to the same evidence throughout the investigation.

## What I would leave out

More detail only helps when it describes the behaviour or evidence. I would
leave out:

- a guessed cause presented as a fact;
- priority labels with no description of the user effect;
- a long recording with no note about when the failure occurs;
- entire support conversations when two lines contain the relevant context;
- screenshots or logs containing unnecessary personal information;
- instructions for a particular code change before Engineering has examined
  the cause;
- unrelated defects noticed during the same test.

Put those unrelated defects in linked reports. The original ticket stays
specific enough to reproduce, investigate and verify.

## A few questions I am often asked

### What should a software bug report include?

Include a specific title, relevant environment and account conditions, numbered
reproduction steps, expected behaviour, actual behaviour, evidence, user impact,
a verified workaround and a clear separation between confirmed facts,
suspected causes and unanswered questions.

### What is the difference between bug triage and a bug report?

Bug triage is the product-team process for understanding an issue, assessing
its effect and urgency, and deciding the next action. The bug report records the
behaviour and evidence in a structure the team can continue using during the
investigation.

### Who should write the bug report?

The person with enough context to describe the observed behaviour can start it.
That may be someone in Product, Engineering, Quality Assurance or Support. The
rest of the team should add evidence and correct assumptions as the
investigation continues.

### Can I write a useful report when I cannot reproduce the bug?

Yes. State that you could not reproduce it, list the conditions and attempts
you tried, preserve the original evidence, and record what differs between your
test and the user's situation. The team may need monitoring, logs or more user
context before continuing.

### Is a screenshot enough for a bug report?

A screenshot may be enough for a visual defect with an obvious location. A
problem involving a sequence, account state or timing also needs written steps
and conditions. A short recording can show the sequence, while the written
description keeps the evidence searchable.

### How long should a bug report be?

It should contain enough information for another person to reconstruct the
problem without guessing. A simple visual defect may need a few lines and a
screenshot. An intermittent checkout failure may need conditions, several
attempts, a recording and request evidence.

## Become a Technical Product Manager Without Becoming an Engineer

We're testing interest in an upcoming Little Parrot transformational learning
path called [**Become a Technical Product Manager Without Becoming an
Engineer**](/guides/technical-product-manager).

It's for non-technical software Product Managers who want to understand how
their product works, investigate problems and contribute to technical decisions
with better evidence. The learning path isn't available yet. If you'd like us
to tell you when it opens, [visit the landing page and register your
interest](/guides/technical-product-manager).

The next time you create a bug report, write the title last. Read the completed
report, then name the observed behaviour and the condition that produces it.
Could another person understand the failure from that title without being told
your suspected cause?

### Publishing notes

- Place a copy control and optional download immediately after the visible
  template.
- Keep the completed checkout example copyable as well.
- Publish with the bug triage article and link the two pages in both directions.
- Use Tamas Kokeny's byline and engineering credentials.
- Add `Article` and `BreadcrumbList` structured data that matches the visible
  page.
- Show a published date and updated date.
- Validate the learning-path landing page and interest form before publishing.
