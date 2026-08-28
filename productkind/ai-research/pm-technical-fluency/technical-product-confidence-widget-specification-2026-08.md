# Technical Product Confidence self-assessment: MVP specification

**Status:** Revised MVP proposal

**Audience:** Non-technical, generalist software Product Managers

**Estimated completion time:** 3–4 minutes

**Assessment version:** `tpc-mvp-1.0`

## 1. Purpose

The self-assessment has two jobs:

1. Help Little Parrot learn which technical product areas visitors want training
   in, so this evidence can inform the course.
2. Give each visitor a manager-ready summary of the areas where they want to
   develop and the capability they want to build.

The assessment measures perceived confidence in common Product Manager
situations. It does not test engineering skill or compare one Product Manager
with another.

Research basis:

- [Needs research](./non-technical-pm-technical-needs-2024-2026.md)
- [Validation addendum](./non-technical-pm-technical-needs-validation-2026-08.md)
- [Interview and survey pack](./pm-technical-fluency-interview-survey-pack-2026-08.md)

## 2. MVP decisions

The MVP removes several parts of the earlier proposal.

| Earlier proposal | MVP decision | Complexity removed |
|---|---|---|
| 18 draggable cards in a Kanban board | 12 standard question groups with radio buttons | Drag-and-drop, touch handling, keyboard drag alternatives and board state |
| Overall score out of 100 | Six area summaries with four clear capability levels | Overall weighting, score bands and dynamic score copy |
| Separate priority question before the assessment | Choose up to two training priorities after answering | One screen and premature prioritisation |
| Dynamic practice tasks | Manager conversation summary and development outcomes | Task-generation rules and content maintenance |
| Save every interaction | Save one completed submission | Partial-response storage and recovery logic |
| Generated PDF attachment | Email a private link to a Little Parrot report page that uses the product's existing PDF-download capability | New PDF infrastructure, attachment storage and email-delivery failures |
| Detailed event tracking | Three funnel events plus the saved assessment | Analytics instrumentation and reporting work |

### PDF delivery

The email links to a private Little Parrot report page. The page loads the saved
assessment and uses the product's existing PDF-download capability. The email
does not need a generated attachment, and the feature does not need a second
PDF implementation.

## 3. User journey

The feature has three screens and one email.

### Screen 1: Introduction

**Heading**

> Where would more technical confidence help you as a Product Manager?

**Body**

> Reflect on 12 topics you may encounter when working with software teams. At
> the end, you will receive a summary you can use to discuss training and
> development with your manager.

**Support text**

> Takes about 3–4 minutes. This is a self-assessment, not a technical test.

**Button**

> Start the self-assessment

### Screen 2: Assessment form

Show all six areas on one page. Each area contains two topic questions. Keep
each area in a clearly separated `<fieldset>` with an area heading, a short
outcome statement and two question groups.

Show this progress message above the form and update it after each answer:

> **[8] of 12 topics answered**

Do not use drag-and-drop, card sorting, swiping or animated transitions.

### Screen 3: Training priorities and email

After all required topics have an answer, show two final inputs on the same
page.

**Priority question**

> Which two areas would you most like training in during the next six months?

Allow one or two selections. Show the six area names in the same order used in
the assessment.

**Why it is asked**

> We use this answer to focus your report and understand what Product Managers
> want help with.

**Report name field**

> Name to show on your report (optional)

**Email field**

> Email address

**Button**

> Email my confidence summary

**Separate, unticked marketing checkbox**

> I would like to hear about Little Parrot courses and research for Product
> Managers.

On successful submission:

1. Save the completed assessment.
2. Calculate the six area summaries.
3. Create a private report URL.
4. Email the visitor a link to the report page.
5. Show a confirmation page asking the visitor to check their inbox.

**Confirmation heading**

> Check your inbox for your confidence summary

**Confirmation body**

> We have sent a private link to **[masked email address]**. Open the email and
> select **View my summary** to reach your Little Parrot report
> page.

## 4. Response states

Every topic uses the same prompt:

> Which statement best describes you today for this topic?

Use these response states:

| Value | Response shown to the visitor | What it measures |
|---:|---|---|
| 0 | I need this topic explained. | Needs a definition and a basic example |
| 1 | I understand the terms, but I am not sure how they affect my product or decisions. | Understands the language and needs help applying it |
| 2 | I can follow a conversation about this and ask useful questions. | Can participate and identify missing information |
| 3 | I can explain how this affects the product and use it in a decision. | Can apply the technical context in PM work |
| `null` | I do not encounter this in my current role. | Topic is currently outside the visitor's role |

This wording replaces **I recognise it but need more context**. It names the
gap directly: the visitor understands the terms and needs help connecting them
to their product or decisions.

On desktop, the four scored responses can appear as a vertical radio group or a
four-column segmented control when there is enough room. On mobile, use a
vertical radio group. Show **I do not encounter this in my current role** as a
fifth response with the same visual weight.

## 5. Assessment areas and topics

The MVP contains six areas and 12 topic questions. Each topic groups terms that
usually appear in the same PM situation. Definitions remain available through
an expandable **What these terms mean** section.

### Area 1: Product systems and infrastructure

**Outcome shown under the area heading**

> Understand how the parts of your product work together and how system or
> infrastructure constraints could affect users.

#### Topic 1: Frontend, backend, database and infrastructure

**Statement**

> I can explain where the frontend, backend, database and infrastructure appear
> in one important product flow, and how a limit or failure in one part could
> affect users.

**Expandable definition**

> The frontend is what a user sees and interacts with. The backend processes
> requests behind the interface. A database stores organised product data.
> Infrastructure is the computing, storage, networking and hosting that keep
> the product running.

This topic explicitly includes infrastructure because enterprise Product
Managers often need it to understand environments, access, reliability,
performance and system dependencies.

#### Topic 2: Application programming interfaces, services and integrations

**Statement**

> I can follow where a request or piece of data goes, which system handles each
> step and where the flow could fail.

**Expandable definition**

> An application programming interface (API) lets software systems exchange
> requests and responses. A service performs a defined job. An integration
> connects two systems.

### Area 2: Scope and trade-offs

**Outcome shown under the area heading**

> Form a rough view of complexity, dependencies and risk before the team commits
> to work.

#### Topic 3: Dependencies, edge cases and failure paths

**Statement**

> I can use dependencies, edge cases and failure paths to ask why a proposed
> change may be wider than it first appears.

**Expandable definition**

> A dependency is something a change relies on. An edge case is a less common
> condition. A failure path describes what happens when an action cannot finish
> as intended.

#### Topic 4: Permissions, product states, data migration and performance

**Statement**

> I can recognise when a screen change could also affect user permissions,
> product rules, existing data or system performance.

**Expandable definition**

> Permissions control who can do what. A product state describes an item's
> current condition. A data migration moves or changes existing data.
> Performance describes how a system responds under expected use.

### Area 3: Development, testing and release

**Outcome shown under the area heading**

> Follow a change through development, testing and release without reading the
> code in detail.

#### Topic 5: Ticket, branch, pull request and code review

**Statement**

> I can follow the status of a planned change across a ticket, branch, pull
> request and code review.

**Expandable definition**

> A ticket records the work. A branch keeps code changes separate. A pull
> request asks the team to review and combine those changes. A code review
> checks the proposed code.

#### Topic 6: Build, pipeline, environment, deployment and rollback

**Statement**

> I can explain where a change is, which checks remain and how the team could
> undo a harmful release.

**Expandable definition**

> A build creates a version that can be tested or released. A continuous
> integration pipeline automatically checks a software change. An environment
> is a separate place where software runs. Deployment releases a change.
> Rollback returns to an earlier version.

### Area 4: Issue investigation

**Outcome shown under the area heading**

> Gather useful evidence about a bug or customer issue before involving
> engineering.

#### Topic 7: Reproduction steps, expected behaviour, severity and reach

**Statement**

> I can document what happened, what should have happened and which users are
> affected so an engineer can begin investigating.

**Expandable definition**

> Reproduction steps describe the actions that produce a problem. Expected
> behaviour records what should happen. Severity describes the effect of a
> problem. Reach describes which and how many users are affected.

#### Topic 8: Network request, status code, logs and root cause

**Statement**

> I can use an agreed network or log view to separate observed evidence from
> the root cause that still needs engineering investigation.

**Expandable definition**

> A network request asks another system for an action or information. A status
> code summarises the result. Logs record events in a system. Root cause is the
> underlying reason a problem occurred.

### Area 5: Product data and experiments

**Outcome shown under the area heading**

> Pull or verify a simple product answer and explain its limits before using it
> in a decision.

#### Topic 9: Metric definition, event tracking and data quality

**Statement**

> I can check what a product number includes, where it comes from and whether
> the data is suitable for the decision.

**Expandable definition**

> A metric definition states how a measure is calculated. Event tracking
> records selected user or system actions. Data quality describes whether the
> data is accurate, complete and suitable for the question.

#### Topic 10: Query, segment and experiment result

**Statement**

> I can review or create a simple data query, check the segment and explain what
> an experiment result supports.

**Expandable definition**

> A query asks a database for selected information. A segment is a defined
> group of users or records. An experiment result describes what happened in
> the observed sample and includes uncertainty about how much the result could
> vary.

### Area 6: Bounded technical work

**Outcome shown under the area heading**

> Take on a small first pass in a test space and recognise when engineering
> review is required.

#### Topic 11: Repository, commit and branch

**Statement**

> I can make or inspect a reversible change in an agreed test space and explain
> what changed.

**Expandable definition**

> A repository stores a project's files and history. A commit records a set of
> changes. A branch keeps changes separate until they are reviewed.

#### Topic 12: Access details, dependencies, prototype and production

**Statement**

> I can recognise sensitive access details and dependencies, explain what a
> prototype has tested and identify what needs specialist review before real
> users depend on it.

**Expandable definition**

> An application programming interface key is a credential used to access a
> service. An environment variable stores a configuration value outside the
> source files. A dependency is a package or service the project relies on. A
> prototype tests an idea. Production is the live version that real users rely
> on.

## 6. Area summaries

Store the responses as `0`, `1`, `2`, `3` or `null`. Calculate an internal
average for each area from its answered topics. Exclude `null` responses.

```text
area_average = sum(answered_topic_values) / number_of_answered_topics
```

Convert the average into a user-facing capability level:

| Area average | Capability level | Description shown in the report |
|---:|---|---|
| 0–0.49 | Needs an explanation | You want these terms explained with an example connected to your product. |
| 0.50–1.49 | Understands the terms | You understand some of the language and want help connecting it to your product and decisions. |
| 1.50–2.49 | Can take part in the conversation | You can follow the discussion and ask useful questions. You want more confidence forming your own judgement. |
| 2.50–3.00 | Can use it in decisions | You can explain the product effect and use the technical context in a decision. |

If both topics in an area are marked **I do not encounter this in my current
role**, show:

> Not part of my current role

Do not calculate or display:

- an overall score;
- a score out of 100;
- a percentile;
- an expert, advanced, intermediate or beginner label;
- a comparison with other visitors.

The exact topic answers appear under each area summary. This prevents an average
from hiding a large difference between two topics.

## 7. Training-priority output

The two selected training priorities are the primary research signal. Do not
infer demand only from the lowest area averages. A visitor can want training in
an area where they already have some confidence because it affects their role
frequently or carries more responsibility.

For each selected priority, the report shows:

1. area name;
2. current capability level;
3. the visitor's two topic responses;
4. the next capability they can discuss with their manager.

Use this next-capability copy:

| Current level | Development outcome shown in the report |
|---|---|
| Needs an explanation | Understand the common terms when they arise and connect them to one real product example. |
| Understands the terms | Explain how the topic affects users, scope, risk or delivery in your own product. |
| Can take part in the conversation | Form a rough judgement, state your assumptions and know which point needs specialist review. |
| Can use it in decisions | Apply this judgement in more complex situations and explain where engineering, data or another specialist needs to take over. |
| Not part of my current role | Discuss whether this capability is likely to become relevant before making it a development priority. |

These are development outcomes for a manager conversation. The report does not
recommend practice tasks.

## 8. Report specification

### Report title

> Technical Product Confidence Summary

### Introduction

> This self-assessment summarises how confident you feel across six areas of
> technical product work. Use it to discuss which capabilities would support
> your role, what training is available and what level of confidence you need.

### Report order

1. Name, if provided, and completion date
2. Selected training priorities
3. Manager conversation summary
4. Six area summaries
5. Topic responses beneath each area
6. Assessment limitation

### Manager conversation summary

Generate this paragraph from the selected priorities and area levels:

> Over the next six months, I would like training in **[priority one]** and
> **[priority two]**. My self-assessment currently places me at **[level one]**
> in the first area and **[level two]** in the second. I would like to discuss
> which capability would improve my work most, what level I need for my role and
> what training or supported experience is available.

When the visitor selects one priority, adjust the paragraph to use the singular.

### Questions for the manager conversation

> - Which of these areas would improve my work most in the next six months?
> - What level of confidence do I need for my current role?
> - What training, mentoring or project exposure is available?
> - What evidence would show that I can apply the capability in my work?

### Assessment limitation

> This is a self-assessment of perceived confidence. It does not test whether
> you can perform each action accurately. Your role, product and access to
> engineering tools affect which areas you encounter.

### Report controls

Show two controls at the top and bottom of the report:

- **Download my PDF summary**
- **Return to Little Parrot**

Reuse the product's existing PDF-download component or service. Generate the
PDF content from the saved assessment record. Do not build a separate PDF
pipeline for this feature.

## 9. Email delivery

The MVP email contains a private report link. It does not need a generated PDF
attachment.

**Subject**

> Your Technical Product Confidence Summary is ready

**Core message**

> Your summary is ready. It includes the areas you selected for training, your
> confidence across all six areas and a set of questions you can use in a
> development conversation with your manager.

**Button**

> View my summary

The button opens a private Little Parrot page where the visitor can review the
report heading and download the PDF. The report URL should use an unguessable
token. Do not include assessment answers or an email address in the URL.

## 10. Data to save

Save one record when the completed form is submitted.

```text
assessment_id
assessment_version
completed_at
utm_source
utm_medium
utm_campaign
utm_content
referrer
topic_responses_json
area_averages_json
area_levels_json
training_priority_ids
report_name
email_address
course_marketing_consent
report_token
```

This can be one database table with structured JSON fields. The MVP does not
need separate tables for areas, topics or responses.

Do not store answers in the URL or send the email address to product analytics.

## 11. Minimum analytics

Use three events:

| Event | Properties |
|---|---|
| `confidence_assessment_started` | assessment version, source, campaign, content |
| `confidence_assessment_submitted` | assessment version, selected priorities, area levels |
| `confidence_report_opened` | assessment version, selected priorities |

The saved assessment provides topic-level research data. Analytics only needs
to show the funnel between starting, submitting and opening the report.

## 12. Validation and error handling

- Require an answer for every topic. **I do not encounter this in my current
  role** is a valid answer.
- Require one or two training priorities.
- Require a valid email address.
- Keep the report name optional.
- Keep course-marketing consent optional and unticked.
- Disable the submit button while the request is being processed.
- If submission fails, preserve every answer on the page and show a retry
  button.
- If email delivery fails after the assessment is saved, keep the visitor on
  the confirmation step and allow the email to be retried.
- Use a visible focus state and a minimum 44 × 44 px tap target.
- Use semantic `<fieldset>`, `<legend>`, `<input type="radio">` and `<label>`
  elements.

## 13. Implementation outline

The MVP needs:

1. One assessment page containing a standard HTML form.
2. One submission endpoint that validates answers, calculates six area levels
   and saves one record.
3. One report page that reads a saved assessment by its private token.
4. One transactional email containing the report link.
5. An integration with the product's existing PDF-download capability.

It does not need:

- drag-and-drop libraries;
- client-side scoring animations;
- user accounts;
- a content-management interface;
- a second PDF-generation or download service;
- background jobs for report generation;
- separate assessment-response tables;
- per-question analytics events;
- personalised practice content.

## 14. Acceptance criteria

The MVP is complete when:

- a visitor can answer all 12 topics using touch, mouse or keyboard;
- the response states clearly distinguish understanding a term from applying it
  to a product decision;
- the system saves all topic answers and one or two chosen training priorities;
- the report shows six area levels and the exact topic answers;
- the report includes infrastructure within the product-systems area;
- the report gives the visitor manager-ready development language;
- the visitor receives a private report link by email;
- the report page uses the existing Little Parrot capability to download the
  PDF summary;
- marketing consent remains separate from report delivery;
- Little Parrot can export the saved topic answers and training priorities for
  course research.
