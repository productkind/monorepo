---
status: drafted
channels: [littleparrot.app/guides]
account: little-parrot
---

# Structured data guide: revised prompts

**This is the version tested on littleparrot.app on 2026-09-29 (see `test-run-2-plan.md`).** The live prompts are in the article itself: `little-parrot-awakens/src/content/guides/articles/get-your-website-to-show-up-on-google.ts`. Edit them there, not here.

Revised from `little-parrot-structured-data-ai-agent-workflow.pdf` (2026-09-29).

How the reader uses them:

1. Run the plan prompt in the tool's read-only or planning mode. The agent writes one file, `structured-data-plan.md`, and stops.
2. Read two short sections of that file: **Summary** and **Questions for you**. Every question has a recommended answer, and none of them change what visitors see.
3. Run the implement prompt. Either paste answers into it, or leave the default line so the agent uses its recommendations.
4. Publish, then paste the URLs the agent lists into the two testing tools.

## Prompt 1: plan

```text
I want to add Schema.org structured data (JSON-LD) to this website so that search engines and AI tools can read the facts about it correctly. This is step one of two: plan only. Do not change any of the site's files. The only file you may create is a new file called structured-data-plan.md in the project root. Only read: do not sign in, submit forms, or call the site's backend, database or payment services.

My site's live address is: [https://your-domain.com]

Investigate the site:
1. Find every public page and page template. Where many pages share one template (such as blog posts, products or courses), treat the template as one entry and name two or three example URLs. Skip pages that are not meant to appear in search, such as login, account, checkout and error pages, and list what you skipped.
2. For each page or template, note its purpose, its canonical URL and the main content a visitor sees. If you can fetch the live pages, do so, because that shows what search engines and AI crawlers actually receive. If you cannot, say that you checked the code only.
3. Find any structured data the site already has and check whether it is correct and consistent.
4. Check how the site delivers its pages. Is structured data (existing or planned) present in the HTML the server sends, or is it only added by JavaScript in the browser? Google can read markup added by JavaScript, but some AI crawlers do not run JavaScript. Say which applies to this site. If the markup would only appear after JavaScript runs, describe the realistic options for this project and recommend one.
5. Choose the most specific Schema.org type that honestly describes each page. Do not add a type just because it exists. More markup is not better.
6. Use only facts that visitors can see on this website. Never invent or guess names, dates, prices, ratings, reviews, awards, credentials or contact details. Facts about things that appear across the site, such as the organisation or its people, may come from any page, such as an About page or the footer. If a useful fact is missing, add it to the questions for me instead.
7. Do not mark up content that visitors cannot see, or information that differs from what they see.
8. Identify the things that appear across many pages, such as the organisation, the website, authors, products or courses. Give each one a stable @id built from the live address (for example https://your-domain.com/#organization), so every page refers to the same thing in the same way. If a shared thing has its own website, such as a parent company, build its @id from that website's address instead.
9. Keep "valid Schema.org" separate from "eligible for a Google rich result". If you can read Google's current structured data documentation, check your recommendations against it and say that you did. If you cannot, say so and mark those judgements as unverified, because Google's rules change often.
10. Flag anything duplicated, contradictory, unnecessary or uncertain.

Write structured-data-plan.md with these sections, in this order:

## Summary
For someone who does not write code. Keep it under 150 words and use short sentences. Start with one sentence on whether the site is in good shape. Then list the most important problems or opportunities as up to five short bullet points. End with one sentence on whether search engines and AI crawlers will be able to see the structured data. Explain every Schema.org type you mention in a few simple words.

## Questions for you
Numbered, most important first, and no more than seven. Keep each question to one or two short sentences, followed by your recommended answer, so I can simply accept it. Include facts you could not find on the site that I could provide, such as a logo, social profiles or a founder's name. Only ask what changes the result. If you have no questions, say so.

Your recommended answers must not require changing what visitors see on the site. If a change to the visible content would help, list it under a separate heading, Optional content changes, and say that it will only happen if I ask for it.

## What will change
A short list of the pages or page types that will get structured data, most important first.

## Implementation details
This section is for the AI agent that implements the plan. Include:
- A table with one row per page or template: URL or template, page purpose, existing markup, proposed type(s), key properties and where each fact comes from, shared @id references, Google rich result relevance, and uncertainties.
- The shared entity model, with every @id value.
- Where in the code the markup will live, and how it will reach the HTML.
- Implementation rules.
- The checks to run after implementing.

## Other things I noticed
If you noticed problems that are not about structured data, such as broken pages or wrong canonical URLs, list them here briefly. Do not include them in the plan.

Then stop. Do not implement anything. In the chat, tell me in three or four sentences what you found, and ask me to read the Summary and Questions for you sections of structured-data-plan.md.
```

## Prompt 2: implement

```text
Implement the structured data plan in structured-data-plan.md. If you cannot find that file, stop and ask me for it.

My answers to the questions in the plan: Use your recommended answers.

Rules:
1. The plan and my answers are the source of truth. Where I have not answered a question, use your recommended answer, except for facts about me or my business: leave those out rather than guess. If you think something outside the plan is needed, stop and ask me first.
2. Use JSON-LD.
3. Use the live address and the @id values from the plan. Describe shared things (such as the organisation, the website and authors) the same way everywhere, and refer to them by @id instead of redefining them differently on each page.
4. Include only facts that visitors can see on the site, or that I gave in my answers. Leave out anything unknown.
5. Do not change the visible text of any page, unless my answers explicitly ask for one of the optional content changes in the plan.
6. Keep existing markup that the plan says to keep. Remove or replace existing markup only where the plan says to.
7. Make sure every page ends up with exactly one copy of its structured data, including when a visitor moves between pages without a full reload.
8. If the JSON-LD includes text from a database or content system, escape it so the text cannot break the page (for example, write < as \u003c).

Check your work:
- Build or run the site and look at the actual HTML of at least one page of each type. Confirm the JSON-LD is present once, parses as valid JSON, and matches the visible content and the canonical URL.
- If the plan says the markup must be in the HTML the server sends, confirm it is there before any JavaScript runs.
- Check for duplicate entities, conflicting @id values and contradictory properties.
- Only report a check as passed if you actually ran it. Do not say a page is eligible for a Google rich result unless Google's current documentation supports that.

When you are done, add a section called "What changed" to the end of structured-data-plan.md: for each page type, what you added, changed or kept, which checks you ran and their results, and any warnings that remain. Then, in the chat, give me a short summary in simple wording and a list of three to five of my live URLs to test once the changes are published, using Google's Rich Results Test (https://search.google.com/test/rich-results) and the Schema Markup Validator (https://validator.schema.org).
```
