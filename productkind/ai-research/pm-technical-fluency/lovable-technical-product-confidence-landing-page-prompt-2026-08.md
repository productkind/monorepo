# Lovable prompt: Technical Product Confidence experiment

Use this prompt in Lovable with the `little-parrot-awakens` repository connected.

---

Implement a production-ready experimental landing page and self-assessment in
the existing Little Parrot application. Work in the current codebase; do not
create a separate app or replace the current home page.

## Start by inspecting the existing implementation

Before changing code, inspect and follow the patterns already used in:

- `src/App.tsx` for routing. Add every new route above the catch-all route.
- `src/index.css`, `tailwind.config.ts` and existing public pages for the Little
  Parrot visual system.
- `src/pages/Certificate.tsx` and `src/lib/generateCertificatePdf.ts` for the
  existing browser-side `jsPDF` download pattern.
- `src/components/SEO.tsx` for metadata.
- `src/integrations/supabase/client.ts` and
  `src/integrations/supabase/types.ts` for database access and generated types.
- the current Supabase migrations and the `get_certificate_display` RPC for the
  public-by-private-token read pattern.
- `supabase/functions/send-welcome-email/index.ts` for Mailtrap delivery and
  Little Parrot email styling. Do not copy its authenticated-user requirement;
  this assessment is public and does not require an account.

Reuse the installed libraries and existing shadcn components. `jsPDF`,
PostHog, React Router, React Query, Supabase and the required form controls are
already present. Do not add another PDF library, drag-and-drop library, form
builder or backend service.

## Product objective

This experiment is for non-technical, generalist software Product Managers.
It has two jobs:

1. Save which technical product areas they most want help with, so Little
   Parrot can use the evidence to shape a course.
2. Give each visitor a useful PDF summary they can take into a development
   conversation with their manager.

This is a confidence self-assessment, not a technical test. Do not present an
overall score, percentage, percentile or beginner/intermediate/expert label.
Do not compare the visitor with other Product Managers. The useful result is a
profile across six areas, their one or two chosen training priorities and clear
development language.

Use British English throughout.

## Routes and access

Add these routes:

- `/technical-product-confidence`: public landing page and self-assessment.
- `/technical-product-confidence/report/:reportToken`: private-link report
  page, also public in the sense that no login is required.

Do not add the experiment to the global navigation yet. The public landing
page should be indexable and added to the sitemap. The tokenised report page
must have `noindex, nofollow` metadata and must never appear in the sitemap.
Extend `SEO` with an optional `noIndex` prop rather than adding ad hoc Helmet
markup to the report page.

## Visual direction

Make this feel like the existing Little Parrot product, not a generic SaaS
template:

- white or warm off-white background;
- near-black text and 2 px near-black borders;
- Little Parrot yellow-to-green gradient used selectively for the primary CTA,
  progress and small accents;
- Inter for body copy and Space Mono for headings and labels;
- square, hard-edged cards with the existing `shadow-rect` treatment;
- generous spacing and a readable content width;
- no glassmorphism, floating blobs, decorative dashboards, fake charts or stock
  imagery;
- no animated entrances, drag-and-drop, swipe interactions or confetti.

Use the existing Little Parrot logo and existing `Navbar` and `Footer` where
they support the page. The assessment itself should be visually calm: present
one question group after another within the single-page form, with generous
label spacing and no dense grid of controls. On desktop the content can be
wider, but the response options should remain easy to scan vertically. On
mobile, use a single column.

All controls need visible keyboard focus, clear error text and a minimum
44 × 44 px tap target. Use semantic `fieldset`, `legend`, native radio inputs
and labels even when styled with the existing components. Do not communicate
state by colour alone.

## Landing page copy and sections

### Hero

Eyebrow:

> Free self-assessment for software Product Managers

Heading:

> Know which technical product skills to develop next

Body:

> Reflect on the technical situations you face at work, choose the areas where
> training would help most, and receive a PDF summary for your next development
> conversation with your manager.

Primary button:

> Start the free self-assessment

Support line:

> 12 topics · 3–4 minutes · No account required

The primary button should scroll or move focus to the assessment introduction.

### Research-language section

Heading:

> What would you like to handle with more confidence?

Introduction:

> Product Managers in our research described the outcomes they wanted in these
> words:

Show these six short quotes without inventing testimonials or attributing them
to named people:

- “have more productive conversations”
- “understand rough scope”
- “ask better questions”
- “spot complexity early”
- “pull their own data”
- “take on small pieces of work”

### Value section

Heading:

> Leave with language you can use with your manager

Body:

> Your PDF will show the one or two areas you want to develop, your current
> confidence across six areas, the capabilities you want to build next and four
> questions for a development conversation with your manager.

Do not promise a diagnosis, certification, personalised training plan or proof
of technical ability.

### How it works

Use four compact steps:

1. Answer 12 questions about situations you may meet at work.
2. Choose one or two areas where training would help most.
3. Enter your email address so we can send your private report link.
4. Open the email, view your report and download the PDF.

## Assessment interaction

Assessment version: `tpc-mvp-1.0`.

Start with this introduction:

Heading:

> Where would more technical confidence help you as a Product Manager?

Body:

> Reflect on 12 topics you may encounter when working with software teams. At
> the end, you will receive a summary you can use to discuss training and
> development with your manager.

Support text:

> Takes about 3–4 minutes. This is a self-assessment, not a technical test.

Button:

> Start the self-assessment

After the visitor starts, show all six areas on one page. Each area is a
separate `fieldset` with its outcome, two topic questions and an expandable
`What these terms mean` definition under each topic. Keep the form state on
the client until the final submission. Do not save partial answers.

Show live progress above the form using this pattern:

> 8 of 12 topics answered

Each topic asks:

> Which statement best describes you today for this topic?

Use the same five response choices for all 12 topics. Store the first four as
`0`, `1`, `2` and `3`. Store the final choice as JSON `null`, while still
treating it as a completed answer in the UI.

1. `0`: I need this topic explained.
2. `1`: I understand the terms, but I am not sure how they affect my product
   or decisions.
3. `2`: I can follow a conversation about this and ask useful questions.
4. `3`: I can explain how this affects the product and use it in a decision.
5. `null`: I do not encounter this in my current role.

Do not use the phrase “I recognise it but need more context”.

### The six areas and 12 topics

Keep this content in a typed data module so the form, report and PDF use one
source of truth. Give every area and topic a stable ID.

#### 1. Product systems and infrastructure

Outcome:

> Understand how the parts of your product work together and how system or
> infrastructure constraints could affect users.

Topic `frontend-backend-database-infrastructure`

Title:

> Frontend, backend, database and infrastructure

Statement:

> I can explain where the frontend, backend, database and infrastructure appear
> in one important product flow, and how a limit or failure in one part could
> affect users.

Definition:

> The frontend is what a user sees and interacts with. The backend processes
> requests behind the interface. A database stores organised product data.
> Infrastructure is the computing, storage, networking and hosting that keep
> the product running.

Topic `apis-services-integrations`

Title:

> Application programming interfaces, services and integrations

Statement:

> I can follow where a request or piece of data goes, which system handles each
> step and where the flow could fail.

Definition:

> An application programming interface (API) lets software systems exchange
> requests and responses. A service performs a defined job. An integration
> connects two systems.

#### 2. Scope and trade-offs

Outcome:

> Form a rough view of complexity, dependencies and risk before the team commits
> to work.

Topic `dependencies-edge-cases-failure-paths`

Title:

> Dependencies, edge cases and failure paths

Statement:

> I can use dependencies, edge cases and failure paths to ask why a proposed
> change may be wider than it first appears.

Definition:

> A dependency is something a change relies on. An edge case is a less common
> condition. A failure path describes what happens when an action cannot finish
> as intended.

Topic `permissions-states-migration-performance`

Title:

> Permissions, product states, data migration and performance

Statement:

> I can recognise when a screen change could also affect user permissions,
> product rules, existing data or system performance.

Definition:

> Permissions control who can do what. A product state describes an item's
> current condition. A data migration moves or changes existing data.
> Performance describes how a system responds under expected use.

#### 3. Development, testing and release

Outcome:

> Follow a change through development, testing and release without reading the
> code in detail.

Topic `ticket-branch-pull-request-review`

Title:

> Ticket, branch, pull request and code review

Statement:

> I can follow the status of a planned change across a ticket, branch, pull
> request and code review.

Definition:

> A ticket records the work. A branch keeps code changes separate. A pull
> request asks the team to review and combine those changes. A code review
> checks the proposed code.

Topic `build-pipeline-environment-deployment-rollback`

Title:

> Build, pipeline, environment, deployment and rollback

Statement:

> I can explain where a change is, which checks remain and how the team could
> undo a harmful release.

Definition:

> A build creates a version that can be tested or released. A continuous
> integration pipeline automatically checks a software change. An environment
> is a separate place where software runs. Deployment releases a change.
> Rollback returns to an earlier version.

#### 4. Issue investigation

Outcome:

> Gather useful evidence about a bug or customer issue before involving
> engineering.

Topic `reproduction-expected-severity-reach`

Title:

> Reproduction steps, expected behaviour, severity and reach

Statement:

> I can document what happened, what should have happened and which users are
> affected so an engineer can begin investigating.

Definition:

> Reproduction steps describe the actions that produce a problem. Expected
> behaviour records what should happen. Severity describes the effect of a
> problem. Reach describes which and how many users are affected.

Topic `network-status-logs-root-cause`

Title:

> Network request, status code, logs and root cause

Statement:

> I can use an agreed network or log view to separate observed evidence from
> the root cause that still needs engineering investigation.

Definition:

> A network request asks another system for an action or information. A status
> code summarises the result. Logs record events in a system. Root cause is the
> underlying reason a problem occurred.

#### 5. Product data and experiments

Outcome:

> Pull or verify a simple product answer and explain its limits before using it
> in a decision.

Topic `metric-event-data-quality`

Title:

> Metric definition, event tracking and data quality

Statement:

> I can check what a product number includes, where it comes from and whether
> the data is suitable for the decision.

Definition:

> A metric definition states how a measure is calculated. Event tracking
> records selected user or system actions. Data quality describes whether the
> data is accurate, complete and suitable for the question.

Topic `query-segment-experiment-result`

Title:

> Query, segment and experiment result

Statement:

> I can review or create a simple data query, check the segment and explain what
> an experiment result supports.

Definition:

> A query asks a database for selected information. A segment is a defined
> group of users or records. An experiment result describes what happened in
> the observed sample and includes uncertainty about how much the result could
> vary.

#### 6. Bounded technical work

Outcome:

> Take on a small first pass in a test space and recognise when engineering
> review is required.

Topic `repository-commit-branch`

Title:

> Repository, commit and branch

Statement:

> I can make or inspect a reversible change in an agreed test space and explain
> what changed.

Definition:

> A repository stores a project's files and history. A commit records a set of
> changes. A branch keeps changes separate until they are reviewed.

Topic `access-dependencies-prototype-production`

Title:

> Access details, dependencies, prototype and production

Statement:

> I can recognise sensitive access details and dependencies, explain what a
> prototype has tested and identify what needs specialist review before real
> users depend on it.

Definition:

> An application programming interface key is a credential used to access a
> service. An environment variable stores a configuration value outside the
> source files. A dependency is a package or service the project relies on. A
> prototype tests an idea. Production is the live version that real users rely
> on.

## Training priorities and email capture

After all 12 topics have a valid answer, reveal the final section on the same
page.

Priority question:

> Which two areas would you most like training in during the next six months?

Allow one or two selections, even though the question asks which two. Use the
six area names in their original order. When two are selected, prevent a third
and explain that the visitor can deselect one first.

Support text:

> We use this answer to focus your report and understand what Product Managers
> want help with.

Optional text field label:

> Name to show on your report (optional)

Required field label:

> Email address

Separate, unticked checkbox:

> I would like to hear about Little Parrot courses and research for Product
> Managers.

Primary submit button:

> Email my confidence summary

Keep report delivery separate from marketing consent. A visitor must receive
their requested report whether or not they tick the checkbox. For this MVP,
save the consent value but do not add the address to another mailing system and
do not trigger the registered-user welcome email.

Add a hidden honeypot field. Do not add a CAPTCHA or a rate-limiting dependency
for this experiment.

During submission, disable the button and announce the loading state. If the
request fails before saving, retain all answers and show a retry action. If the
assessment is saved but Mailtrap fails, say that the answers were saved but the
email could not be sent, and let the visitor retry email delivery without
creating a second assessment.

On success, do not show the report or report token in the browser. Show:

Heading:

> Check your inbox for your confidence summary

Body, with the actual address masked:

> We have sent a private link to **[masked email address]**. Open the email and
> select **View my summary** to reach your Little Parrot report
> page.

## Area calculation

Calculate results on the server from the 12 submitted topic responses. Do not
trust levels or averages sent by the browser.

For each area, average its two scored responses and exclude `null` responses:

```text
area_average = sum(scored_topic_values) / number_of_scored_topics
```

Map the average to one of these levels:

| Average | Level | Report description |
|---:|---|---|
| 0–0.49 | Needs an explanation | You want these terms explained with an example connected to your product. |
| 0.50–1.49 | Understands the terms | You understand some of the language and want help connecting it to your product and decisions. |
| 1.50–2.49 | Can take part in the conversation | You can follow the discussion and ask useful questions. You want more confidence forming your own judgement. |
| 2.50–3.00 | Can use it in decisions | You can explain the product effect and use the technical context in a decision. |

If both topics in an area are `null`, set the level to:

> Not part of my current role

Show the exact topic answers under every area so an average cannot hide a
difference between its two topics.

Do not calculate or display an overall score anywhere, despite the feature's
“Technical Product Confidence” name.

## Private report page

Load the report by an unguessable UUID token using a narrowly scoped Supabase
`SECURITY DEFINER` RPC, modelled on `get_certificate_display`. The RPC must set
a safe search path and return only the fields needed to render the report. It
must not return the email address, consent value, UTM values or referrer. Do
not permit anonymous clients to select from the assessment table directly.
Revoke broad function access, then grant execute access only to the roles that
need to load this public-by-private-link report.

Use this report title:

> Technical Product Confidence Summary

Introduction:

> This self-assessment summarises how confident you feel across six areas of
> technical product work. Use it to discuss which capabilities would support
> your role, what training is available and what level of confidence you need.

Report order:

1. Name, when supplied, and completion date in British date format.
2. One or two selected training priorities.
3. Manager conversation summary.
4. Six area summaries.
5. The two exact topic responses under every area.
6. Assessment limitation.

For each selected priority, show its area name, current capability level, the
two topic responses and this next-development outcome based on its level:

| Current level | Development outcome |
|---|---|
| Needs an explanation | Understand the common terms when they arise and connect them to one real product example. |
| Understands the terms | Explain how the topic affects users, scope, risk or delivery in your own product. |
| Can take part in the conversation | Form a rough judgement, state your assumptions and know which point needs specialist review. |
| Can use it in decisions | Apply this judgement in more complex situations and explain where engineering, data or another specialist needs to take over. |
| Not part of my current role | Discuss whether this capability is likely to become relevant before making it a development priority. |

Generate the manager paragraph from the selected priorities and their levels.
For two priorities use:

> Over the next six months, I would like training in **[priority one]** and
> **[priority two]**. My self-assessment currently places me at **[level one]**
> in the first area and **[level two]** in the second. I would like to discuss
> which capability would improve my work most, what level I need for my role and
> what training or supported experience is available.

For one priority, rewrite the paragraph grammatically in the singular.

Show these questions:

- Which of these areas would improve my work most in the next six months?
- What level of confidence do I need for my current role?
- What training, mentoring or project exposure is available?
- What evidence would show that I can apply the capability in my work?

Assessment limitation:

> This is a self-assessment of perceived confidence. It does not test whether
> you can perform each action accurately. Your role, product and access to
> engineering tools affect which areas you encounter.

Show these actions at both the top and bottom:

- `Download my PDF summary`
- `Return to Little Parrot`

If the token is missing, invalid or not found, show a calm error page with a
link back to Little Parrot. Do not reveal whether any email address or record
exists.

## PDF download

Reuse the existing browser-side PDF approach. Create a dedicated helper such
as `src/lib/generateTechnicalConfidencePdf.ts`, modelled on
`generateCertificatePdf.ts`; do not modify the certificate generator and do
not build an email attachment, server-side renderer, storage bucket or second
download service.

The PDF should be A4 portrait, readable when printed, and use the existing
Little Parrot logo, near-black border, yellow-to-green accent, Space Mono
heading treatment and page numbers. It must contain the same report content in
the same order, including the exact topic responses and assessment limitation.
Use sensible page breaks so a section heading is not stranded at the bottom of
a page. Use the optional report name in the filename only after sanitising it;
otherwise use `little-parrot-technical-product-confidence-summary.pdf`.

Only access `window`, `document`, canvas or browser APIs inside the click-time
PDF function so the app's SSR or prerender process does not fail.

## Transactional email

Send one transactional result email through the existing Mailtrap API. Keep
`MAILTRAP_API_KEY` and the Supabase service-role key inside the Edge Function;
never expose either in client code.

Sender:

- Name: `Little Parrot`
- Address: `hello@littleparrot.app`

Subject:

> Your Technical Product Confidence Summary is ready

Preheader:

> Open your private report page and download the PDF for your manager conversation.

Render the preheader in a hidden block at the very top of `<body>`, followed by
a hidden `&nbsp;&zwnj;` spacer so later body or footer text cannot appear in the
inbox preview.

HTML `<title>`:

> Your Technical Product Confidence Summary is ready

Visible heading:

> Your confidence summary is ready

Render this as the email's single `<h1>`. Use real `<p>` elements for the body
copy and preserve a logical heading order.

Body copy:

> Hello,
>
> It includes the areas you selected for training, your confidence across all
> six areas, and four questions for your next development conversation with
> your manager.

Single primary button:

> View my summary

Supporting line below the button:

> This private link opens a Little Parrot page where you can download your PDF.

Sign-off:

> Kinga, Tamas & Little Parrot 💛

Contextual footer:

> You’re receiving this email because you completed the Technical Product
> Confidence self-assessment on Little Parrot. This message delivers the result
> you requested and doesn’t subscribe you to marketing emails.

Include the standard unsubscribe footer link. Use `__unsubscribe_url__` only if
the existing Mailtrap configuration resolves it to a working link for a public
visitor without a Little Parrot account; never ship the placeholder literally.
Otherwise use the application's working public unsubscribe mechanism. This
result email does not itself add the recipient to marketing. If a visitor
separately consented to marketing, the link must still let them prevent later
marketing messages.

Link the header logo to:

```text
https://littleparrot.app/?utm_source=technical-confidence-result&utm_medium=email&utm_campaign=pm-confidence-experiment
```

Link the privacy-policy footer text to:

```text
https://littleparrot.app/privacy-policy?utm_source=technical-confidence-result&utm_medium=email&utm_campaign=pm-confidence-experiment
```

Also include a footer text link labelled `littleparrot.app` pointing to:

```text
https://littleparrot.app/?utm_source=technical-confidence-result&utm_medium=email&utm_campaign=pm-confidence-experiment
```

Include the existing LinkedIn, Instagram, TikTok and YouTube icons in that
order in one presentational table. Give each cell enough padding for clear
spacing, each image explicit 24 × 24 attributes and channel-specific alt text,
and every icon link an inline `font-size: 12px` declaration. There must be no
second primary CTA.

Build a plain-text version with the same information and full report URL.
HTML-escape every interpolated value. Use a table-based layout with inline
styles for broad email-client support, a solid background fallback before the
gradient, explicit font sizes on links, `lang="en-GB"`, colour-scheme metadata,
the 220 × 63 `logo-little-parrot-email.png` asset and explicit image dimensions.
Give the header logo `alt="Little Parrot"`. Give every other image descriptive
alt text, or `alt=""` when it is decorative.
Match the existing Little Parrot email visual language: Inter body, Space Mono
headings, a `#fffffe` main card, 2 px near-black border and hard shadow. Give
every layout table `role="presentation"`. Render the primary action as a
bulletproof table-based button at least 44 px high, with about 14 px vertical
and 24 px horizontal padding and about 30 px of space around it. Make the button
full width on mobile. Whenever an element combines `width: 100%` with horizontal
padding, including the mobile CTA and any padded full-width wrapper, set
`box-sizing: border-box`. End the email container with a 32 px bottom spacer so
delayed image or font loading cannot push the footer and unsubscribe link below
Gmail iOS's measured height. Keep the HTML under 102 KB.

The button URL must be:

```text
https://littleparrot.app/technical-product-confidence/report/{reportToken}?utm_source=technical-confidence-result&utm_medium=email&utm_campaign=pm-confidence-experiment
```

Do not put an email address or answers in the URL.

## Database and server boundary

Create one migration for a single assessment table. A suitable shape is:

```text
id uuid primary key default gen_random_uuid()
client_submission_id uuid unique not null
created_at timestamptz not null default now()
assessment_version text not null default 'tpc-mvp-1.0'
email_address text not null
report_name text null
course_marketing_consent boolean not null default false
topic_responses jsonb not null
area_averages jsonb not null
area_levels jsonb not null
training_priority_ids text[] not null
report_token uuid unique not null default gen_random_uuid()
utm_source text null
utm_medium text null
utm_campaign text null
utm_content text null
referrer text null
email_sent_at timestamptz null
```

Use clear constraints where practical. Enable RLS. Do not add an anonymous
insert or select policy; public submission goes through an Edge Function using
the service role after validation. Only the narrowly scoped report RPC may read
a result by token.

Add a public Edge Function such as
`submit-technical-confidence-assessment`, with JWT verification disabled in
`supabase/config.toml`. It must:

1. accept only `POST` and the required CORS preflight;
2. enforce an allow-list of the production origin plus the existing local
   development origins rather than returning `*` in production;
3. reject a non-empty honeypot;
4. validate a UUID `client_submission_id`;
5. validate the email and cap normalised email length at 254 characters;
6. cap the optional report name at 100 characters;
7. accept exactly the 12 known topic IDs and require every value to be
   `0`, `1`, `2`, `3` or `null`;
8. require one or two unique, known priority IDs;
9. cap each UTM value and referrer at 255 characters;
10. calculate the six averages and levels on the server;
11. save the row with the service-role client;
12. build the private report URL and send the Mailtrap email;
13. set `email_sent_at` only after Mailtrap succeeds;
14. return a success state and never return the report token, answers or email
    address to the browser.

Make submission idempotent. Generate `client_submission_id` once in the browser
for the current completed form and reuse it on retry. On a unique-key conflict,
load that record server-side. If `email_sent_at` is null, retry the same email;
if it is already set, return success without sending another. Never create two
records for one visitor retry.

Do not log email addresses, report tokens or raw responses. Error responses
should be useful to the UI but should not expose Mailtrap or database details.

Update the generated Supabase TypeScript types after applying the migration.
Do not introduce new `as any` casts for this feature.

## Experiment data and analytics

Capture the initial URL's `utm_source`, `utm_medium`, `utm_campaign` and
`utm_content`, plus the referrer, and submit them with the completed assessment.
Do not send the visitor's email, name, token or raw topic answers to PostHog.
This includes automatic page properties and session replay: mask or exclude the
form fields and prevent the tokenised report URL from being stored as a raw
current URL or referrer. Do not solve this by removing the three explicit
experiment events.

Capture only these three product events:

- `confidence_assessment_started` with assessment version, source, campaign and
  content;
- `confidence_assessment_submitted` with assessment version, selected priority
  IDs and calculated area levels;
- `confidence_report_opened` with assessment version and selected priority IDs.

Avoid per-question events. The saved database row is the research source for
topic-level answers.

## SEO metadata

Landing page title:

> Technical Product Confidence Self-Assessment | Little Parrot

Landing page description:

> Identify the technical product areas you want to develop and receive a PDF
> summary for your next conversation with your manager.

Add relevant `WebPage` or `Quiz` JSON-LD only if it truthfully describes the
page. Do not claim a rating, certification or aggregate result.

The report page should have a fixed, non-personalised title and description and
`noindex, nofollow`. Do not place the visitor's name or results in metadata.

## Tests and completion checks

Add focused tests for:

- all five response states, including `null` counting as answered;
- the four average bands and the all-`null` area;
- one and two training priorities;
- rejection of missing, extra or invalid topic IDs;
- idempotent retry behaviour;
- the singular and plural manager paragraph;
- masking common email-address shapes without exposing the full address;
- invalid report tokens;
- PDF generation being invoked only by the download action.

Manually check the complete journey at mobile and desktop widths using mouse,
keyboard and touch-sized controls:

1. landing page loads without an account;
2. start event fires once;
3. all 12 answers are required, including a usable “not encountered” choice;
4. one or two priorities can be selected;
5. marketing consent defaults to false and does not block delivery;
6. submit stores one complete row and sends one email;
7. refresh or retry does not create a duplicate or send an unnecessary second
   email;
8. the email CTA opens the matching private report;
9. the report contains no email address and cannot be indexed;
10. the PDF contains all six areas, priorities, manager language and the
    assessment limitation;
11. an invalid token produces the safe error state;
12. no account or authentication redirect appears in the flow.

Run the repository's existing lint, test and production build commands. Fix
errors caused by this work. Finish by summarising the files changed, migration
and Edge Function deployment steps, required secrets, tests run and any manual
setup still needed. Do not deploy to production or alter unrelated pages.

---

Source product specification:
`productkind/ai-research/pm-technical-fluency/technical-product-confidence-widget-specification-2026-08.md`
