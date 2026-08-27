# Technical Product Confidence widget specification

**Status:** Proposed experiment specification  
**Audience:** Non-technical, generalist software Product Managers  
**Primary purpose:** Give each visitor a useful self-assessment while learning
which work situations they want help with and where they feel least confident  
**Estimated completion time:** 3–4 minutes

## 1. Product decision

The widget should assess how confidently a Product Manager can use technical
language in common product situations. It should not score how many definitions
they know.

Each card therefore pairs a real technical phrase with an observable PM action.
For example:

> **API request and response**  
> I can follow where data comes from, where it goes and what a failure could
> change for the user.

The visitor sorts the card according to what they could do today. This connects
the technical phrase to the outcomes found in the research: following
engineering conversations, asking useful questions, judging rough scope,
spotting complexity, investigating an issue, checking product data and taking
on a bounded first pass.

The result is called the **Technical Product Confidence Score**. It is explicitly
described as a self-assessment. It is not an aptitude test, a measure of
engineering ability or a comparison with other Product Managers.

Research basis:

- [Needs research](./non-technical-pm-technical-needs-2024-2026.md)
- [Validation addendum](./non-technical-pm-technical-needs-validation-2026-08.md)
- [Interview and survey pack](./pm-technical-fluency-interview-survey-pack-2026-08.md)

## 2. What the widget measures

The widget contains 18 cards across six areas. Each area contains three cards.

| Area | Outcome represented |
|---|---|
| Engineering conversations | Follow an explanation, restate it accurately and connect it to a product decision |
| Scope and trade-offs | Form a rough view of dependencies, risk and complexity before commitment |
| Development and release | Follow a change through development, testing and release |
| Issue investigation | Reproduce and document a problem before involving engineering |
| Product data | Pull or verify a simple product answer and recognise when an analyst is needed |
| Bounded building | Create or change a small testable artefact within an agreed safety boundary |

The six area scores are shown alongside the overall score. This prevents one
number from hiding an uneven profile.

## 3. Response states and points

The same four response states appear throughout the assessment.

| Response shown to the visitor | Points | Capability represented |
|---|---:|---|
| I need it explained | 0 | The phrase or situation is unfamiliar |
| I recognise it but need more context | 1 | Recognition without enough context to act |
| I know what to ask next | 2 | Can participate and seek the missing information |
| I can explain it and use it in a decision | 3 | Can apply the idea in PM work |

The wording deliberately describes capability rather than emotion. A visitor
can feel nervous and still know what to ask next.

Every card also has a secondary action:

> I do not encounter this in my current role

This response receives no points and is removed from the denominator. It is
stored separately as role-relevance data.

### Why the score is not importance-weighted

Before the board, the visitor chooses the situation they most want help with.
That answer expresses priority. It does not change the confidence score.

Keeping priority and confidence separate lets Little Parrot distinguish these
cases:

- a high-priority area where the visitor currently has low confidence;
- a high-priority area where the visitor is already fairly confident;
- a low-confidence area that is not relevant to the visitor's current role.

## 4. Score calculation

### Overall score

For every scored card:

```text
card_points = 0, 1, 2 or 3

Technical Product Confidence Score =
round((sum of card_points / (3 × number of scored cards)) × 100)
```

If all 18 cards are scored, the maximum raw score is 54.

Example:

```text
Total points: 31
Scored cards: 18
Maximum available points: 54

round((31 / 54) × 100) = 57
```

The visitor's Technical Product Confidence Score is **57/100**.

### Area scores

Each area uses the same calculation:

```text
Area score =
round((points in the area / (3 × scored cards in the area)) × 100)
```

When all three cards in an area are scored, its maximum raw score is 9.

### Minimum response requirement

Calculate an overall score only when the visitor has:

- scored at least 12 cards; and
- scored cards in at least four of the six areas.

Calculate an area score only when the visitor has scored at least two cards in
that area. Otherwise show **Not enough answers** for that area.

If the minimum is not met, show:

> **We need a few more answers to calculate your profile.**  
> Sort at least 12 cards across four areas, or return cards marked as outside
> your role to the board.

### Precision and display

- Store the unrounded score for analysis.
- Display the overall score as a whole number out of 100.
- Display area scores as whole numbers.
- Do not show decimal places, percentiles, rankings or comparisons with other
  visitors.
- Do not describe a change of one or two points as meaningful. This is a
  directional self-assessment, not a validated psychometric instrument.

## 5. Score bands and changing result copy

The bands divide the score into four reporting ranges that broadly follow the
four response states. Mixed answers mean a band will not always match one
response label exactly. These are provisional reporting ranges, not validated
levels. They should not be labelled beginner, weak, advanced or expert.

### Score 0–24: Finding your starting points

**Band label**

> Finding your starting points

**Headline**

> Technical language often arrives before you have enough context to use it.

**Explanation**

> Your answers suggest that several common product situations still need an
> explanation before you can take part confidently. You chose **[priority
> area]** as the situation where you want more support. Your practice task will
> start with one real example from that area.

**Suggested-action introduction**

> Your first practice task

### Score 25–49: Connecting the terms to the work

**Band label**

> Connecting the terms to the work

**Headline**

> You recognise some of the language and need more context to use it in the
> decision in front of you.

**Explanation**

> Your answers suggest that recognition is ahead of application. Start with
> **[priority area]**, the situation you selected, and trace one real example.
> Write down what the technical context changes for users, scope, risk or
> delivery.

**Suggested-action introduction**

> Your next practice task

### Score 50–74: Asking useful questions

**Band label**

> Asking useful questions

**Headline**

> You can follow many technical situations and usually know what to ask next.

**Explanation**

> Your answers suggest that you can participate in many conversations without
> knowing every implementation detail. You selected **[priority area]** as the
> situation where you want more support. Your area score will determine the
> depth of the practice task we suggest.

**Suggested-action introduction**

> Your next judgement task

### Score 75–100: Using technical context in decisions

**Band label**

> Using technical context in decisions

**Headline**

> Across most of the cards, you knew what to ask next or could use the idea in a
> decision.

**Explanation**

> Your answers suggest that you can use technical context to support product
> decisions. You selected **[priority area]** as the situation where you want
> more support. Your practice task will focus on deciding when your first pass
> is enough and when an engineer, analyst or specialist needs to take over.

**Suggested-action introduction**

> Your next boundary-setting task

## 6. Copy that stays the same for every score

The following result-page copy must not change by band.

### Result title

> Your Technical Product Confidence Profile

### Score label

> Your score today

### Score explanation

> This score reflects how confident you feel using common technical language in
> Product Manager work today. It does not test engineering skill or compare you
> with other Product Managers.

### Priority label

> You most want help with

The value beneath this label is the situation selected before the board. The
label remains fixed.

### Profile labels

> Your strongest area  
> The area where you want more support

The first value is the highest eligible area score. The second value is the
visitor's chosen priority, not automatically the lowest score.

### Area introduction

> Your answers across six areas

### Email gate

The visitor sees their numerical score and band before this gate.

> **Get your full breakdown**  
> Enter your email to receive your six area scores, a short explanation of each
> one and a practice task based on the situation you chose.

Field label:

> Email address

Button:

> Show my full profile

Privacy support text:

> We will use your email to send this result. You can separately choose whether
> you want to hear about Little Parrot courses.

Optional unticked marketing checkbox:

> I would like to hear about Little Parrot courses and research for Product
> Managers.

### Closing clarification

> Treat this profile as a starting point for reflection. Your role, product and
> access to engineering tools affect which areas you encounter and how much
> independence is useful.

## 7. Other text that changes

Band copy is only one source of personalisation. The result also changes based
on the visitor's answers.

| Element | Rule | Example |
|---|---|---|
| Overall score | Calculated from all eligible cards | 57/100 |
| Band label, headline and explanation | Selected by overall score | Asking useful questions |
| Chosen priority | Copied from the pre-board question | Understand rough scope and spot complexity early |
| Strongest area | Highest eligible area score | Engineering conversations |
| Area where they want more support | Copied from the pre-board question | Scope and trade-offs |
| Six area scores | Calculated independently | Scope and trade-offs: 44/100 |
| Practice task | Chosen by priority area and that area's score band | Trace one proposed change across the interface, product rules, data, dependencies and release |
| Applied examples | Shown after submission for cards scored 0 or 1 | API request and response shown in a product example |

### Tie rules

- If two or more areas share the highest score, prefer the area with more scored
  cards.
- If the tie remains, show up to two strongest areas.
- Never label the lowest score as the visitor's biggest problem. Their chosen
  priority is the stronger signal of what they want help with.
- If their chosen priority has no eligible area score, still show the priority
  and state that there were not enough answers to score that area.

## 8. Priority question

Show this immediately before the board.

**Question**

> Which situation would you most like to handle with more confidence?

**Options**

1. Follow and contribute to engineering conversations
2. Understand rough scope and spot complexity early
3. Follow a change through development, testing and release
4. Investigate a bug or customer issue before involving engineering
5. Pull or verify simple product data myself
6. Build and test a prototype or take on a small technical task

Rules:

- Require one answer.
- Randomise the option order for each visitor.
- Store the stable option identifier rather than its displayed position.
- Do not use this answer in the score calculation.

## 9. Card set

The production set should contain 18 cards. Randomise the order within a
visitor session while keeping the same card set for all visitors in the first
experiment. Changing cards would make scores from different versions harder to
compare.

Each entry below contains a title, a definition and an applied statement. In
the interface, show the title and applied statement on the card. Put the
definition in an expandable **What these terms mean** section within the card.
If a visitor opens it, remind them to sort the card according to what they could
do before reading the definition. Record the expansion for research, but do not
change the points automatically.

### Engineering conversations

1. **Frontend, backend and database**  
   The frontend is what a user sees and interacts with. The backend processes
   requests behind the interface. A database stores organised product data. I
   can explain which part of a product flow each one handles.
2. **API request and response**  
   An application programming interface (API) lets software systems exchange a
   request and a response. I can follow where data comes from, where it goes and
   what a failure could change for the user.
3. **Component, service and integration**  
   A component is one part of a system. A service performs a defined job. An
   integration connects systems. I can restate an engineering explanation
   using the parts that affect the product decision.

### Scope and trade-offs

4. **Dependency, edge case and failure path**  
   A dependency is something a change relies on. An edge case is a less common
   condition. A failure path describes what happens when an action cannot
   finish as intended. I can use these to ask why a proposed change may be
   wider than it first appears.
5. **Permissions, product states and data migration**  
   Permissions control who can do what. A product state describes an item's
   current condition. A data migration moves or changes existing data. I can
   recognise when a screen change may also affect rules or existing data.
6. **Performance, technical debt and build-versus-buy trade-off**  
   Performance describes how a system responds under expected use. Technical
   debt is future work created by earlier design or implementation choices. A
   build-versus-buy trade-off compares making a capability with using an
   existing product. I can ask for the user effect, delivery cost and risk
   before recommending an option.

### Development and release

7. **Ticket, branch, pull request and code review**  
   A ticket records the work. A branch keeps a set of code changes separate. A
   pull request asks the team to review and combine those changes. A code review
   checks the proposed code. I can follow a planned change through these stages
   without reading the code in detail.
8. **Build and continuous integration pipeline**  
   A build turns the source files into a version that can be tested or released.
   A continuous integration pipeline automatically checks a software change. I
   can explain what a failed check means for delivery.
9. **Test environment, staging, deployment and rollback**  
   A test environment is a non-live place for checking changes. Staging is a
   production-like environment used before release. Deployment releases a
   change. Rollback returns to an earlier version. I can explain where a change
   is, who can use it and how the team could undo a harmful release.

### Issue investigation

10. **Reproduction steps and expected versus actual behaviour**  
    Reproduction steps describe the exact actions that produce a problem.
    Expected and actual behaviour record what should have happened and what did
    happen. I can document these so an engineer can investigate without first
    repeating my questions.
11. **Network request, response and status code**  
    A network request asks another system for an action or information. The
    response contains the result, and its status code summarises what happened.
    I can use this evidence when investigating an issue.
12. **Logs, severity, reach and root cause**  
    Logs record events in a system. Severity describes the effect of a problem.
    Reach describes which and how many users are affected. Root cause is the
    underlying reason the problem occurred. I can separate what we observed
    from what still needs engineering investigation.

### Product data

13. **Metric definition, event tracking and data quality**  
    A metric definition states how a measure is calculated. Event tracking
    records selected user or system actions. Data quality describes whether the
    data is accurate, complete and suitable for the question. I can check what
    a number includes before I use it in a decision.
14. **Table, filter, group and join**  
    A table stores data in rows and columns. A filter narrows the rows. Grouping
    summarises related rows. A join combines related tables. I can review or
    create a simple query and check whether it answers the product question.
15. **Experiment sample, result and uncertainty**  
    A sample is the group observed in an experiment. The result describes what
    happened in that sample. Uncertainty describes how much the result could
    vary. I can explain what the result supports and what it does not show.

### Bounded building

16. **Repository, commit and branch**  
    A repository stores a project's files and history. A commit records a set
    of changes. A branch keeps changes separate until they are reviewed. I can
    make or inspect a reversible change in an agreed test space.
17. **API key, environment variable and dependency**  
    An API key is a credential used to access a service. An environment variable
    stores a configuration value outside the source files. A dependency is a
    package or service the project relies on. I can recognise sensitive access
    details and know when to stop and ask for engineering help.
18. **Prototype and production**  
    A prototype is an artefact used to test an idea. Production is the live
    version that real users rely on. I can explain what a working prototype has
    tested and what the team must still check before real users depend on it.

## 10. Practice-task personalisation

The selected priority chooses the subject of the task. The score band for that
area chooses its depth. If the visitor did not answer enough cards to receive a
score in the selected area, use their overall band and state that this is a
broader recommendation.

| Priority area | Area score 0–24 | Area score 25–49 | Area score 50–74 | Area score 75–100 |
|---|---|---|---|---|
| Engineering conversations | Choose one term from a recent meeting and ask a colleague to explain the product effect | Restate one engineering explanation and ask the engineer to correct it | Write the decision, known facts and two focused questions before a conversation | Lead a short teach-back that records the decision, uncertainty and owner |
| Scope and trade-offs | Trace one proposed change across the screen, rules and data | Add dependencies, edge cases and failure paths to that trace | Form a rough view of scope and ask engineering to check the riskiest assumptions | Facilitate a trade-off review and record where specialist judgement is required |
| Development and release | Ask a colleague to show where one recent change was tested and released | Follow one ticket through development, test and release stages | Explain the current status, remaining checks and release risk | Document the release boundary, rollback decision and owners for one change |
| Issue investigation | Write expected behaviour, actual behaviour and exact reproduction steps | Add device, account, environment and reach evidence | Inspect an agreed request or log view and separate known facts from open questions | Produce a first-pass incident brief and define when engineering must take over |
| Product data | Write the decision and define the metric in one sentence | Identify the source, time period, segment and exclusions | Pull or review a simple result and compare it with a trusted reference | Explain the result's limitations and define when an analyst should verify it |
| Bounded building | Choose one small task and agree the safety boundary with engineering | Build or change one flow using test data in a test space | Test the main path and one failure, then record what the artefact showed | Prepare a handover covering assumptions, evidence, risks and production checks |

## 11. Mechanism and screen flow

### Screen 1: Introduction

> **How confident are you when product work gets technical?**  
> Sort 18 cards based on what you could do today. There are no right answers.
> You will receive an overall score, six area scores and a practice task based
> on what you want to handle with more confidence.

Primary button:

> Start the assessment

Support text:

> Takes about 3–4 minutes

### Screen 2: Priority question

Show the single-choice question and options in section 8. Continue only after
one option is selected.

### Screen 3: Sorting board

Desktop layout:

```text
Progress: 7 of 18

[Card waiting to be sorted]

[I need it       [I recognise it    [I know what     [I can explain it
 explained]       but need context]   to ask next]     and use it]

[I do not encounter this in my current role]
```

On larger screens, the four response states may appear as Kanban-style columns.
Keep the unsorted cards in a separate deck above or beside the board. Do not
place all 18 unsorted cards on screen at once.

Interaction rules:

- Desktop users can drag a card into a column.
- Clicking a card selects it; clicking a column places it. This is the required
  alternative to dragging.
- Mobile users see one card at a time with four large response buttons. Swiping
  may be added, but the labelled buttons remain available.
- Keyboard users can tab to a card and select a labelled response button.
- After placement, show the next unsorted card and confirm the selected state in
  text. Keep already sorted cards visible in their columns on larger screens.
- Provide **Undo** and **Review answers**.
- Show progress as text, such as **7 of 18**, as well as a progress bar.
- Do not add a timer or imply that faster completion is better.
- Save progress in the browser so an accidental refresh does not discard the
  assessment.

### Screen 4: Review

Group the sorted cards under the four response states. Cards marked outside the
visitor's role appear in a separate collapsed group.

Primary button:

> Calculate my profile

Secondary button:

> Change my answers

If the minimum response requirement is not met, explain exactly how many more
cards or areas are needed.

### Screen 5: Score preview

Reveal these items without asking for an email:

- overall score;
- score band;
- band headline;
- the fixed explanation of what the score measures.

Then show the email gate from section 6 for the detailed profile.

### Screen 6: Full profile

After a successful email submission, reveal:

1. chosen priority;
2. strongest area;
3. all eligible area scores;
4. band explanation;
5. one practice task based on the selected priority and its area-score band;
6. applied product examples for cards scored 0 or 1;
7. the closing clarification;
8. the separate course-research questions and call to action.

The full profile should also be sent by email so the visitor does not lose it
when they close the page.

## 12. Visual and accessibility requirements

- Use one primary brand colour, one state accent and neutral colours.
- Pair every state colour with its full text label. Colour alone cannot indicate
  a response.
- Keep card text at 16 px or larger and body text at 14 px or larger.
- Give buttons and cards visible hover, focus, selected, loading and error
  states.
- Use semantic buttons for response choices.
- Announce card placement and progress through an accessible status message.
- Maintain at least a 44 × 44 px tap target on mobile.
- Do not rely on drag-and-drop for completion.
- Respect reduced-motion settings. Card movement should not be required to
  understand what changed.
- Keep the result number visually prominent. The band label and explanation
  should appear immediately after it.

## 13. Data model

Store one assessment record per visitor and one response record per card.

```text
assessment
assessment_id
assessment_version
started_at
completed_at
utm_source
utm_medium
utm_campaign
utm_content
referrer
priority_area_id
overall_score_unrounded
overall_score_displayed
score_band
area_scores
email_submitted
course_marketing_consent

card_response
assessment_id
card_id
card_area_id
response_state
card_points
role_relevance
definition_opened
```

Do not store card responses in the URL. Do not store email addresses in product
analytics event properties. Join identifiable and behavioural records using an
internal assessment identifier.

## 14. Analytics events

| Event | Required properties |
|---|---|
| `confidence_assessment_started` | assessment version, source, campaign, content |
| `confidence_priority_selected` | priority area |
| `confidence_card_sorted` | card, area, response state, card position |
| `confidence_card_marked_not_relevant` | card, area |
| `confidence_card_definition_opened` | card, area, card position |
| `confidence_assessment_reviewed` | scored count, not-relevant count |
| `confidence_score_calculated` | overall score, band, eligible area count |
| `confidence_email_submitted` | assessment identifier, marketing consent state |
| `confidence_full_profile_viewed` | priority, strongest area, band |
| `confidence_practice_task_opened` | priority, overall band, priority-area band, task identifier |
| `confidence_course_cta_clicked` | priority, band, payer path if already answered |

Record the acquisition hook in `utm_content`. This makes it possible to compare
the problem that stopped the scroll with the visitor's selected priority and
assessment profile.

## 15. Interpretation limits

The score reports perceived confidence. It does not prove that the visitor can
perform the action accurately. Someone may overestimate or underestimate their
ability.

For the experiment:

- use the chosen priority to understand what visitors want help with;
- use card and area responses to understand where they perceive gaps;
- use course consent and course-page clicks to measure interest in a learning
  offer;
- use a deposit or employer approval request to measure stronger payment
  intent;
- do not treat an email submitted for the profile as willingness to buy a
  course.

If Little Parrot later wants to measure demonstrated judgement, add a separate
scenario-based assessment with observable answers. Do not silently turn this
self-assessment score into a claim about competence.

## 16. Versioning and experiment rules

- Launch the first experiment as version `tpc-1.0`.
- Keep the 18 cards, response labels, point values and score bands unchanged
  within that version.
- Record any copy-only test separately from an assessment-content change.
- Create a new assessment version when a card, response label, point value or
  score boundary changes.
- Do not compare raw scores across different versions without noting the
  change.
- Review abandonment, response distributions and open-text feedback before
  changing the scoring model.

## 17. Acceptance criteria

The first release is complete when:

- a visitor can finish the assessment using touch, mouse or keyboard;
- the same answers always produce the same overall and area scores;
- role-irrelevant cards are excluded from the denominator;
- the minimum response rule prevents an unsupported score;
- the visitor sees the score and its limitation before the email gate;
- the detailed profile changes according to score band, priority and area
  answers;
- marketing consent is optional and separate from result delivery;
- the full profile can be viewed on screen and received by email;
- analytics distinguish assessment interest, email conversion and course
  intent.
