# PM technical-fluency validation pack

**Purpose:** test the provisional need ranking with practising generalist
software PMs who were not recruited because they had already posted about
technical skills.

**Status:** ready to field; not yet sent or submitted.

## 1. Sampling plan

Recruit **8–12 interview participants** from general PM populations: former
colleagues, broad PM communities, local ProductTank groups and company/product
networks. Do not advertise the study as “technical skills for PMs”; use “how
PMs work with software teams” to reduce topic self-selection.

Minimum eligibility:

- currently a PM, PO, GPM or product lead;
- works with software engineers at least weekly;
- works on a general software product rather than exclusively AI/ML, data,
  platform, infrastructure, security or developer tooling;
- has not worked as a software engineer and has no substantial CS/software
  engineering training.

Suggested quota for 10 interviews:

| Dimension | Target |
|---|---:|
| Associate/PM | 3 |
| Senior PM | 4 |
| Lead/GPM/Director still close to a team | 3 |
| B2B software | 4–6 |
| B2C software | 3–5 |
| Company under 250 employees | 4–6 |
| Company 250+ employees | 4–6 |
| Uses an AI coding/builder tool monthly | No more than 5 |
| Has publicly posted about PM technical skills | No more than 2 |

Aim for variation in geography, gender and product maturity. Do not fill the
sample entirely from a course audience, AI-builder community or technical-PM
network.

Suggested interview invitation:

> I’m researching how generalist Product Managers work with software teams. I’m
> looking for current PMs who did not come from software engineering for a
> 20-minute conversation about recent work situations—not a technical test. I’m
> particularly interested in ordinary day-to-day work, whether or not you think
> of yourself as “technical”. Responses can be anonymised.

## 2. Screener

Ask before booking. Terminate or classify as a comparison participant when a
required condition fails.

1. What is your current job title and what kind of product do you work on?
2. How often do you work directly with software engineers?
3. Which best describes your previous education and work: software
   engineering/CS; another technical field; business/design/operations or
   humanities; something else?
4. Have you ever worked as a software engineer or written production software
   as a substantial part of your job?
5. Is your current role primarily focused on AI/ML, data, platform,
   infrastructure, security or developer tooling?
6. Have you posted publicly, taken a course or joined a community specifically
   about technical skills for PMs in the last two years?

Record P/G/N/C status and the recruitment channel. Question 6 does not exclude
someone; it enables a sensitivity check between topic-aware and ordinary PMs.

## 3. Twenty-minute interview guide

Use the participant's language. Do not introduce Git, APIs, CI/CD, SQL or AI
coding before they do.

### Recent incident

1. Think of the most recent time when working with engineers or a software
   product was harder because you did not understand something technical. What
   was happening?
2. What exactly could you not understand, decide or do?
3. What words did people use? What did you type into search, ask a colleague or
   ask an AI tool?
4. What happened next? Who did you depend on, and what did that delay or change?
5. If you had been better prepared, what would you have wanted to do
   differently?

### Current workflow

6. Tell me about the last feature or change your team shipped. Where, if
   anywhere, did you lose visibility between the idea and users receiving it?
7. Tell me about the last bug or customer issue you were involved in. How far
   could you investigate it before asking engineering?
8. Are there engineering tools or views you avoid or depend on someone else to
   navigate? What would you want to accomplish there yourself?

### Boundaries and change since 2024

9. Has AI changed anything you can do independently in your PM role? Tell me
   about the last real example. What did it help with, and where did you stop?
10. Is there anything technical that people say PMs should learn that would not
    improve your work? Why?

### Forced prioritisation only after open questions

Show the provisional needs in random order and ask:

- Which three would most improve your work in the next six months?
- Which one matters least?
- What important need is missing?
- For each selected need, is the desired level to understand, navigate,
  participate or do independently?

Do not ask whether the participant wants “technical confidence”; ask for a
specific observable outcome.

## 4. Interview coding sheet

Create one row per incident, not one row per participant.

| Field | Coding instruction |
|---|---|
| Participant ID | Anonymous ID; store contact details separately. |
| P/G/N/C | Pass/fail/unclear for each identity condition. |
| Recruitment source | Broad PM network, colleague referral, course audience, technical-skills discussion, other. |
| Situation | Meeting, planning, refinement, incident, support, release, interview, independent build, other. |
| Pain | What they could not understand, decide, navigate or do. |
| Consequence | Delay, dependency, wrong decision, lost confidence, rework, no material consequence. |
| Desired outcome | Observable capability in the participant's words. |
| Exact phrase | Verbatim wording or search query. |
| Concept | Code only after the interview. |
| Capability level | Understand / navigate / participate / do independently. |
| Frequency | One-off / monthly / weekly / most days. |
| Impact | Low / medium / high, with reason. |
| Workaround | Asked engineer, searched, AI, avoided, guessed, learnt, other. |
| AI change | None / faster understanding / prototype / automation / production change / other. |
| New cluster? | Yes/no; if yes, define without forcing it into the existing taxonomy. |

## 5. Structured survey

Target at least **60 eligible responses** for a directional check. This will not
create a representative market estimate, but it is enough to see whether the
ranking is robust outside people already discussing technical fluency.

### Invitation text

> We are researching how generalist Product Managers work with software teams.
> The survey takes 6–8 minutes. It asks about recent situations in your actual
> work; no technical knowledge test is involved.

### Screener

Use the six interview-screener questions. Terminate current engineers and
specialist-only PM roles from the primary sample; optionally retain them as a
labelled comparison group.

### Recent-event questions

1. In the last four weeks, how often did you encounter a technical explanation,
   term, workflow or tool you did not understand well enough for your PM work?
   - Never
   - Once
   - Two or three times
   - Weekly
   - Several times a week

2. Think of the most recent example. What was happening?
   - Planning or scoping
   - Refinement or engineering discussion
   - Development status/stand-up
   - Testing or QA
   - Release or deployment
   - Bug, incident or customer support
   - Data/analytics/experiment
   - Interview or performance review
   - Building or changing something myself
   - Other: ___

3. In your own words, what did you not understand or feel able to do?

4. What exact question did you ask—or wish you could have asked?

5. What was the consequence? Select all that apply.
   - I needed an engineer to explain or do something
   - A decision took longer
   - I could not judge scope, risk or a trade-off
   - I struggled to explain the issue to someone else
   - Work was reworked or misunderstood
   - I stayed quiet or pretended to understand
   - No material consequence
   - Other: ___

### Need rating

Randomise the rows. Ask two separate questions for each:

- How often would this capability help in your current role? Never / a few
  times a year / monthly / weekly / most days
- What is the consequence of not having it? None / small / moderate / serious

| Capability statement shown to participants |
|---|
| Explain how one important flow in my product works, in plain language |
| Understand an engineering explanation well enough to make or explain a product decision |
| Identify likely dependencies, risks and trade-offs before committing to work |
| Follow what happens from a planned change through development, testing and release |
| Follow data or a request across an integration and understand where it may fail |
| Investigate and document a bug or customer issue before involving engineering |
| Answer a simple product-data or experiment question without waiting for another team |
| Navigate the engineering tools needed to see the status of an issue, change, test or release |
| Make product decisions about bugs, quality and technical debt |
| Build a small testable prototype or internal tool with AI assistance |
| Explain my technical judgement in an interview or performance review |

Then ask:

6. Choose the **three** capabilities that would make the biggest difference to
   your work in the next six months.
7. Choose the **two** that matter least in your current role.
8. What important capability is missing from this list?

### Desired depth

For each of the participant's top three, ask:

9. What level would be useful?
   - Understand the concept when someone explains it
   - Navigate the relevant tool or workflow
   - Participate actively in the work or decision
   - Do a bounded task independently

10. What would you be able to do that you cannot do now?

### AI change

11. In the last six months, which have you done with an AI coding or builder
    tool? Select all that apply.
    - None
    - Asked it to explain code or a technical concept
    - Created a disposable mock-up
    - Built a prototype using real data or an API
    - Built an internal tool or automation
    - Changed an existing codebase
    - Deployed something for colleagues or test users
    - Shipped a production change reviewed by engineering
    - Shipped a production change without engineering review

12. What stopped you or made the work difficult?

13. Which statement is closest to your view?
    - AI building is not relevant to my PM role
    - It is useful mainly for learning or disposable prototypes
    - It is useful for internal tools or validated prototypes with guardrails
    - It should become a standard way PMs contribute production changes
    - Not sure

## 6. Analysis plan

1. Remove ineligible P/G/N/C responses from the primary analysis.
2. Report participant count, recruitment sources and topic-aware versus ordinary
   PM split before reporting needs.
3. Rank needs using a combination of top-three selection, frequency and impact;
   do not treat a Likert mean alone as decisive.
4. Compare rankings for:
   - participants recruited from technical-skills discussions versus elsewhere;
   - AI-builder users versus non-users;
   - junior/mid-level versus senior/product leaders;
   - B2B versus B2C and smaller versus larger companies.
5. Keep exact open-text phrases in a separate terminology bank. Deduplicate only
   exact or near-exact duplicates; do not rewrite them as marketing copy.
6. Add a new need cluster only when at least three eligible participants from at
   least two recruitment sources describe it independently.
7. Treat the ranking as holding when the same top three appear in the overall
   sample and in the non-topic-aware subgroup, allowing one position of movement.

## 7. Decision thresholds

| Result | Interpretation |
|---|---|
| Top need selected by at least 35% of eligible respondents and appears in interviews from at least three recruitment sources | Strong candidate for essential scope |
| Need selected by 20–34%, or high impact but role-specific | Useful/secondary or conditional module |
| Need below 20% with low recent-event frequency | Do not make core without stronger qualitative evidence |
| AI building ranks highly only among existing AI-builder users | Emerging segment need, not a generalist baseline |
| A new cluster appears in 3+ interviews and two recruitment sources | Reopen the taxonomy and search specifically for it |

Percentages are decision aids for this directional sample, not market-size
estimates.

## 8. Consent and handling note

Tell participants how quotations will be used; obtain permission before using a
name or identifiable quotation. Default to anonymised IDs. Store contact details
separately from responses and do not paste confidential product information,
customer data or internal system details into the research ledger.
