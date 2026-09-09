---
status: drafted
brand: little-parrot
author: Tamas Kokeny
voice: personal
primary_keyword: bug triage
secondary_keywords:
  - bug triage process
  - bug triage for product managers
  - how to reproduce a bug
  - severity vs priority bug
search_intent: understand how to investigate and prioritise a software bug before engineering work begins
slug: /guides/bug-triage-product-managers
meta_title: "Bug Triage for Product Managers: A Practical Checklist"
meta_description: "Use this bug triage checklist to reproduce an issue, assess its impact and decide the next step with Engineering. Written by a software engineer."
conversion_destination: /guides/technical-product-manager
---

# Bug triage for Product Managers: what to check before engineering starts

I've worked as a software engineer and engineering leader for 15 years. During
that time, quite a few bug investigations have started with a message like
this:

> A customer says checkout isn't working. Here is their screenshot.

The screenshot tells me that the customer reached an error. It usually cannot
tell me which actions led there, what state their account was in, which request
failed or whether the same thing happens to other customers.

So I first have to reconstruct the situation. The useful details may be spread
across a support conversation, analytics, a screen recording and several people
who each know one part of the customer journey.

From the engineering side, a Product Manager can help quite a bit before anyone
starts following the problem through requests, logs and code. You can establish
what happened, find the conditions that reproduce it and bring the user and
business impact into the priority decision.

The Product Manager's role here is to establish a specific behaviour and bring
evidence we can examine together. Root cause is the underlying reason the
problem occurred, and finding it usually requires engineering access and
technical investigation.

**Bug triage** is the process a product team uses to understand a reported
problem, assess its effect and urgency, and decide what should happen next.

Here is how I would prepare for that conversation.

I will use a fictional saved-card checkout failure throughout the article. It
lets us follow one issue through the process.

## What a useful bug triage process should answer

Before choosing a priority label, I separate four questions:

1. **Impact:** What can the affected user no longer do, and what happens as a
   result?
2. **Reach:** Which users, accounts or transactions are affected?
3. **Urgency:** What becomes worse if the team waits?
4. **Confidence:** Which parts have evidence, and what remains uncertain?

These questions give Product and Engineering a shared starting point. A label
such as *"critical"* is only useful when everyone knows which effect, reach and
time constraint sit behind it.

## My first-pass bug triage checklist

You can use this checklist before or during a bug triage meeting. It is meant
to guide the investigation, rather than serve as the final bug-report format.

### Protect users first

- [ ] Does the issue involve a security or privacy risk?
- [ ] Could it cause data loss, corruption or exposure?
- [ ] Could it create a duplicate or incorrect payment?
- [ ] Is a core customer journey unavailable to many users?
- [ ] Does your company's incident process say this should be raised
  immediately?

If any of these could be true, contact the people named in your incident
process. Do not delay that response while trying to complete every other item
in this checklist.

### Establish the observed behaviour

- [ ] What was the user trying to do?
- [ ] What should have happened?
- [ ] What happened instead?
- [ ] Where is the first point at which the journey differs from the expected
  behaviour?
- [ ] What evidence shows the result: a recording, screenshot, error message,
  analytics event or successful reproduction?

### Record the conditions

- [ ] Which environment was used: production, staging or another test
  environment?
- [ ] Which device, operating system, browser or app version was used?
- [ ] What type and state of account was involved?
- [ ] Which test data or product configuration was present?
- [ ] What were the exact actions immediately before the problem?
- [ ] Does it happen every time, sometimes or only once so far?

### Assess impact and reach

- [ ] Which user capability is blocked or degraded?
- [ ] Which users, accounts, plans, countries or transactions appear affected?
- [ ] Is money, data, access or a contractual promise involved?
- [ ] Is there a safe workaround?
- [ ] How much evidence supports the estimated reach?

### Decide the next action together

- [ ] Does the team need to contain the effect now?
- [ ] Is there enough evidence for an engineer to begin a focused
  investigation?
- [ ] Would one more comparison answer an important question?
- [ ] Should the team investigate now, schedule the work, gather more evidence
  or monitor the behaviour?
- [ ] Who will take each next step, and when will the team review the result?

## 1. Check whether the situation needs an immediate response

I would start with user safety and business exposure before trying to reproduce
the problem perfectly.

A possible security issue, exposed personal information, incorrect payment or
data loss needs the team's agreed incident route. A failure affecting every
customer in a core journey may need the same treatment. Your company should
define who to contact and who can disable a feature, stop a release or notify
customers.

The Product Manager helps describe the customer and business effect. The
engineer helps assess the technical risk and containment options. Waiting for a
complete diagnosis can increase the damage, so an uncertain report can still
deserve an immediate response.

## 2. Separate expected and actual behaviour

*"Checkout is broken"* names an area of the product. It does not yet describe
the bug.

I would ask the Product Manager to help make the difference observable:

> **Expected:** A signed-in customer confirms their saved card and reaches the
> order-confirmation page.
>
> **Actual:** After the customer confirms payment, the checkout returns to the
> basket and shows a generic error.

Now we know the action, the expected state and the unexpected result. An
engineer can begin thinking about the parts of the journey between payment
confirmation and order creation.

The wording should stay close to what you can see. *"The payment service is
down"* is a possible explanation. Until there is evidence for it, keep it as a
hypothesis rather than mixing it with the observed behaviour.

## 3. Reproduce the bug safely

To reproduce a bug means performing the actions that trigger the same
unexpected behaviour again.

Use a test environment or test account where possible, especially when the
journey involves payments, personal data, emails or destructive actions. Follow
your company's access, security and privacy rules. A Product Manager should not
open production logs or inspect customer information without the appropriate
permission and training.

Start with the reported conditions:

- the same account state;
- the same device, browser or app version;
- the same environment;
- the same inputs;
- the same sequence of actions.

If the problem happens again, repeat the steps once to check whether the result
is consistent. Then change one condition at a time.

That last part is important. If you change the account, browser and payment
method together, a successful attempt does not tell us which condition affected
the result.

And if you cannot reproduce the bug, record that result too. It narrows the
evidence when you can say exactly which conditions you tried.

## 4. Use comparisons to narrow the conditions

Comparisons are often more useful to me than an early guess about the code.

For the checkout example, I might ask the Product Manager to compare one pair
at a time:

| Keep the rest the same | Compare | What the result could tell the team |
|---|---|---|
| Account, browser and basket | Saved card with a newly entered card | Whether the failure is connected to the saved-card journey |
| Account, basket and payment method | Safari with Chrome | Whether the browser is one of the conditions |
| Browser, basket and payment method | Existing account with a new account | Whether account state affects the result |
| Account, browser and payment method | One product with another | Whether the product or price configuration affects the result |

Suppose the failure appears for a saved card and the newly entered card works
on the same account. We still have not found the root cause. We have, however,
reduced the area the engineer needs to examine.

## 5. Find the first visible point of failure

Sometimes the screen gives us enough evidence. Sometimes it only shows the
final symptom.

For a web product, the browser's **Network** tab can show the requests the page
sends and the responses it receives. If your company allows you to inspect it,
open the browser's developer tools, choose **Network**, then perform the action
again. Look at the relevant request's name, status code, duration, sent data and
response.

[Chrome's Network panel documentation](https://developer.chrome.com/docs/devtools/network/)
explains the available request details. [MDN's HTTP response status
reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
explains what the status-code groups mean.

A status code needs context. A `400` response tells us that the server rejected
the request. The response may add that a required billing-address field was
missing. This evidence still does not tell us why the saved-card journey omitted
that field. An engineer may need to inspect the application logs and code to
answer that question.

Be careful before copying a request, response or log excerpt. It may contain
personal information, payment details, tokens or internal identifiers. Use test
data where possible, remove sensitive values and follow the team's rules about
where evidence can be stored.

## 6. Assess severity and priority separately

Severity and priority answer different questions.

- **Severity** describes the effect of the bug when it happens.
- **Priority** records when the team chooses to act after considering urgency,
  reach, workarounds, current commitments and competing risks.

Priority can change while severity stays the same. A safe workaround may reduce
the need for immediate work, even though the underlying effect has not changed.
A smaller defect may need attention today if it blocks a release planned for
tomorrow.

I prefer describing the evidence before choosing the label:

| Triage input | What to record | Checkout example |
|---|---|---|
| Effect | The capability, data, access or money affected | The customer cannot complete an order with a saved card |
| Reach | Affected users, accounts or transactions | Confirmed on two test accounts; production reach still unknown |
| Frequency | Every attempt, intermittent or observed once | Reproduced on every saved-card attempt in the test account |
| Workaround | A safe alternative and its cost to the user | Entering the card again completes checkout |
| Urgency | What gets worse while the team waits | Some returning customers may abandon their purchase |
| Confidence | Confirmed evidence and important unknowns | Saved-card condition confirmed; start time and production reach unknown |

Your team's severity levels and incident rules should decide the label. The
table gives the label evidence that another person can understand and revisit.

## 7. Choose the next action as a product team

Triage should end with an action, even when the root cause remains unknown.

The team may decide to:

- begin an engineering investigation now;
- contain the effect by disabling a path, stopping a release or using a safe
  fallback;
- gather one missing piece of evidence;
- schedule the work against other product priorities;
- monitor the behaviour and define the signal that triggers another review;
- give Support a verified workaround while the investigation continues.

For the checkout example, the next steps could be:

- Engineering examines why the saved-card request is missing a required field.
- Product checks analytics for the number of affected attempts and when the
  pattern began.
- Support shares the verified newly entered card workaround with affected
  customers.
- The team reviews the evidence the same day and decides whether to disable the
  saved-card option while the fix is prepared.

That is one product-team investigation. Each person contributes the context and
access they have, and the team keeps the facts, hypotheses and decisions
visible to one another.

## The checkout example after first-pass triage

We began with this:

> A customer says checkout isn't working. Here is their screenshot.

After triage, the team knows:

- The failure occurs after payment confirmation and returns the user to the
  basket.
- It has been reproduced on two signed-in test accounts using a saved card.
- Entering the card again succeeds when the account, browser and basket stay
  the same.
- The relevant request returns `400` with a response saying that a required
  billing-address field is missing.
- The customer cannot complete the saved-card journey, but a verified
  workaround exists.
- The production reach and the time the behaviour began are still unknown.
- Engineering will investigate the missing field while Product checks the
  reach and Support uses the workaround.

The team still does not know the root cause. It has a much narrower question,
clear user impact and named next steps.

## What Product and Engineering each contribute

The Product Manager usually has the clearest view of:

- the user journey and expected behaviour;
- customer reports and support context;
- affected segments and product configuration;
- business timing, workarounds and the cost of waiting;
- analytics that can estimate reach.

The engineer usually has the access and context to:

- trace requests through services;
- inspect approved application logs and monitoring;
- identify the component and code involved;
- assess containment and repair options;
- verify the root cause and the fix.

Those contributions overlap during a good investigation. I may need the
Product Manager beside me to explain an account state or customer consequence.
They may need me to explain what a failed request confirms and which conclusions
we cannot draw from it yet.

## A few questions I am often asked

### What is a bug triage meeting?

A bug triage meeting is a product-team discussion where reported issues are
reviewed using evidence about behaviour, impact, reach, urgency and uncertainty.
The team decides the next action for each issue. A regular meeting can help with
non-urgent reports, while possible incidents should follow the company's
immediate response process.

### Who should take part in bug triage?

Include the people needed to understand the issue and make the next decision.
That often means Product, Engineering and Quality Assurance, with Support,
Design, Data, Security or Operations joining when their context is relevant.
The exact group depends on the product and the reported effect.

### What if the Product Manager cannot reproduce the bug?

Record the conditions you tried and the result. Then compare them with the
original user's environment, account state, data and sequence of actions. The
team may need more information, monitoring or an engineer's access to continue.
Failure to reproduce is evidence; it should not be treated as proof that the
bug does not exist.

### Should a Product Manager use browser developer tools?

They can be useful when the company permits it and the Product Manager has been
shown which fields are safe to inspect. Start with a test account and
non-sensitive data. The goal is to observe where the behaviour changes, while
Engineering still verifies the technical cause.

### Is severity the same as priority?

No. Severity describes the effect of the problem. Priority describes when the
team chooses to act after considering reach, urgency, workarounds, business
timing and competing work.

### Should a Product Manager find the root cause?

A Product Manager can narrow the conditions, separate facts from hypotheses
and assess the user and business effect. Engineering usually needs to verify
the root cause through requests, logs, monitoring and code. Working together
keeps the technical evidence connected to the customer problem.

## Become a Technical Product Manager Without Becoming an Engineer

We're testing interest in an upcoming Little Parrot transformational learning
path called [**Become a Technical Product Manager Without Becoming an
Engineer**](/guides/technical-product-manager).

It's for non-technical software Product Managers who want to understand how
their product works, investigate problems and contribute to technical decisions
with better evidence. The learning path isn't available yet. If you'd like us
to tell you when it opens, [visit the landing page and register your
interest](/guides/technical-product-manager).

For your next bug discussion, delay the priority label for five minutes. Ask
for the observed effect, reach, frequency, workaround and confidence first.
Which answer changes what your team should do next?

### Publishing notes

- Add a downloadable or copyable version of the first-pass bug triage checklist
  immediately after the visible checklist.
- Add an original severity-and-priority visual based on the table in this
  article, with descriptive alt text.
- Link to `/guides/software-bug-report-template` after that article is live.
  Keep the related article focused on structuring and communicating a bug
  report; do not add a full bug-report template here.
- Add `Article` and `BreadcrumbList` structured data that matches the visible
  page.
- Show Tamas Kokeny's author credentials, published date and updated date.
- Validate the learning-path landing page and interest form before publishing.
