# Structured data plan for littleparrot.app

Checked on 29 September 2026 against the live site (fetched without JavaScript, as a crawler would) and the code in this project. Google's documentation was read on the same day.

## Summary

The site is in fair shape. It already has structured data (hidden labels that tell machines what a page is), but some of it is wrong.

- The home page questions say "no certificate". The page itself says "yes".
- Every course claims a €24 price. The course pages show no price, and one says "Free until 18 October".
- Kinga and Tamas are both listed as founders. The About page says Kinga founded productkind.
- The same organisation is described many times, in slightly different ways. It needs one shared ID (a fixed name tag every page points to).
- Google no longer shows FAQ results (the question-and-answer boxes). It still shows course lists and breadcrumbs (the trail of links above a title).

Search engines and AI crawlers can already see the markup, because every public page is sent as ready-made HTML.

## Questions for you

1. **Who founded what?** The markup says Kinga and Tamas both founded Little Parrot. Your About page says Kinga founded productkind and Tamas is an educator there. _Recommended:_ follow the About page. Kinga is the founder of productkind, Tamas works at productkind, and Little Parrot belongs to productkind.

2. **Should the course markup name you as the authors?** The course pages do not show who wrote each course. _Recommended:_ leave authors out of the course markup and keep Little Parrot as the provider.

3. **Which logo should search engines use?** The markup points to the wide wordmark (SVG). Google shows logos in a small square. _Recommended:_ use `/logo-square.png` (the 1080 x 1080 parrot icon).

4. **Which social profiles belong to Little Parrot, and which to productkind?** Little Parrot's markup lists productkind's Instagram, YouTube and Substack, plus a LinkedIn page (`linkedin.com/products/productkind-littleparrotapp/`) that the site never links to. _Recommended:_ give Little Parrot the TikTok profile and that LinkedIn product page (if it is your official page). Give productkind the LinkedIn company page, Instagram, YouTube and Substack.

5. **Keep the FAQ markup?** Google stopped showing FAQ results on 7 May 2026. Other tools may still read it. _Recommended:_ keep it, but build it from the same text visitors see, so the two can never disagree again.

6. **Should the two waitlist learning paths be marked up as courses?** They are still being built and have no price yet. _Recommended:_ yes, as courses with no price or dates, and left out of the course list sent to Google.

### Optional content changes

These will only happen if you ask for them. None of the recommended answers above need them.

- Add a line such as "Written by Kinga Magyar and Tamas Kokeny" to course pages. The course markup could then name you as authors.
- If the LinkedIn product page is official, link it in the footer so visitors can see it too.

## What will change

1. Home page: one full, correct description of Little Parrot, productkind and the website, plus FAQ markup that matches the visible answers.
2. Course pages (9): corrected course markup, with the price, invented audience and extra sentence removed.
3. Courses page: a course list in the form Google's course list result expects.
4. Guide articles (10): each article linked to its author and to Little Parrot by shared ID, with a description that matches what visitors see.
5. Guide collections (index and 4 audience pages): clean links, and one invalid property removed.
6. Learning path waitlist pages (2): course name matches the page heading, and a breadcrumb is added.
7. Pricing page: membership markup linked to Little Parrot, with prices from the same source as the page.
8. About page: marked as the About page, with Kinga and Tamas described once for the whole site.

## Implementation details

### How the site delivers pages (checked)

- Vite + React SPA with a post-build prerender step: `npm run build` runs `vite build`, then an SSR build of `src/entry-server.tsx`, then `scripts/prerender.mjs`.
- `prerender.mjs` renders each public route with `react-dom/server`, injects the body into `#root`, and injects the `react-helmet-async` head tags (title, meta, canonical, **and `<script type="application/ld+json">`**) into `</head>`. Course data is fetched from Supabase at build time and seeded into React Query, so course markup is in the static HTML.
- Prerendered routes: `/`, `/courses`, `/pricing`, `/about`, `/newsletter`, `/terms-of-service`, `/privacy-policy`, `/guides`, every `/guides/<slug>`, `/guides/technical-product-manager`, `/guides/building-apps-with-ai`, and `/<courseId>/course-overview` for every published course.
- Verified live: all 33 sitemap URLs return 200, and their JSON-LD is present in the raw HTML (fetched with `curl`, GPTBot and ClaudeBot user agents, no JavaScript). **So markup is server-delivered, not JavaScript-only.** No change to the delivery mechanism is needed.
- On the client, `main.tsx` uses `createRoot` (not hydrate), and Helmet takes over the `data-rh` tags. The planned markup must keep going through `<SEO jsonLd>` so the same code path produces both the prerendered and the client-side markup.
- The site-wide Organization block is currently hard-coded in `index.html`, so it appears in every page, including private routes that are not prerendered.

### Existing markup found (live, 29 September 2026)

| Page | Existing types | Problems |
| --- | --- | --- |
| Every page (from `index.html`) | Organization | Repeated on all pages with no `@id`. `founder` lists Tamas, which contradicts About. `sameAs` mixes productkind's profiles into Little Parrot's, and includes a LinkedIn product URL not shown on the site. Logo is a wide SVG. |
| `/` | FAQPage | Answers are shortened rewrites, not the visible text. **"Do I get a certificate?" says "No" in the markup, but "Yes" on the page.** "How much does it cost?" also differs. |
| `/courses` | ItemList of full Course objects | Inline provider with no `@id`. For a summary page, Google expects `ListItem.url` pointing to the detail pages. |
| `/<courseId>/course-overview` | Course, BreadcrumbList | `offers` shows €24 on every course, but no price is visible and one course shows "Free until 18 October". `description` adds an invisible sentence ("Taught by Little Parrot, a platform..."), plus outcomes and challenge lists. `educationalLevel: Beginner`, `audience.educationalRole` and `about` (journey name) are not visible. `author` is not visible on the page. `provider.sameAs` equals its own `url`. |
| `/pricing` | Product with 2 Offers | Values match what is visible and the live Stripe price (€24/month, €950 one-time, checked through `get-pricing`), but they are hard-coded separately from the rendered price. `brand` has no `@id`. `description` is not visible text. |
| `/guides` | CollectionPage | `name` ("Guides for your work and life") differs from the H1 ("Start with the work in front of you"). |
| `/guides/<hub>` | CollectionPage, BreadcrumbList | `hasPart` URLs carry `?ref=seo-hub-...` tracking parameters, not canonical URLs. **`isRelatedTo` is invalid here** (its schema.org domain is Product/Service only). `name` uses the meta title with " \| Little Parrot". |
| `/guides/<article>` | Article, FAQPage (6 of 10), BreadcrumbList | Mostly correct. `description` uses the meta description, not the visible standfirst. Author and publisher are inline with no `@id`. Publisher has no logo. |
| `/guides/technical-product-manager` | Course, FAQPage | Course `name` is the SEO title ("Technical Product Manager Course for Non-Technical PMs"), not the H1. `description` ends "Join the waitlist.". There is a visible breadcrumb but no BreadcrumbList. |
| `/guides/building-apps-with-ai` | Course, FAQPage | No BreadcrumbList despite the visible breadcrumb. Otherwise matches. |
| `/about`, `/newsletter`, `/terms-of-service`, `/privacy-policy` | Only the site-wide Organization | None. |
| Dormant: `TechnicalProductConfidence.tsx` | WebPage | Not served: `ABTestProvider` hard-codes the `waitlist` variant. Align it if the variant is ever re-enabled. |

All JSON-LD blocks parsed as valid JSON.

### Pages skipped (not meant for search)

`/auth`, `/reset-password`, `/subscription-checkout`, `/nest/*` (profile, subscription, my-learning, my-learning/:courseId/my-notes, toolkit, toolkit/:toolkitId, courses, newsletter, help), `/:courseId/onboarding`, `/:courseId/challenge`, `/:courseId/course-feedback`, `/certificate/:certificateId`, `/guides/technical-product-manager/report/:reportToken`, `/promo` (noindex thank-you page), and the 404 page. All of these set `noindex` through `<SEO noIndex>`. They get no structured data.

### Page-by-page plan

"Visible source" means the code or content field that renders the same text visitors see. Always build the markup from that field.

| URL or template | Purpose | Existing markup | Proposed type(s) | Key properties and where each fact comes from | Shared @id references | Google rich result relevance | Uncertainties |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` (`src/pages/Index.tsx`) | Home: what Little Parrot is, course cards, testimonials, scholarship, FAQ | Organization (shell), FAQPage | Organization (full node), Organization (productkind, full node), WebSite, FAQPage | Org: `name` "Little Parrot"; `url`; `logo` (Q3); `description` from the visible hero ("Build apps, tools and systems with AI, without a technical background" + "Hands-on challenges you can finish in a coffee break for women in business."); `parentOrganization` → productkind; `sameAs` (Q4). productkind: `name`, `url` https://productkind.com/ (linked on About), `founder` → Kinga (About), `sameAs` from the footer links (Q4). WebSite: `name` "Little Parrot", `url`, `publisher` → org, `inLanguage` "en". FAQPage: `mainEntity` built from the **same array that renders the visible FAQ**, full answer text. | defines `#organization`, `#productkind`, `#website`; refs `about#kinga-magyar` | Organization: logo and knowledge panel signals (no rich result card). WebSite: site name. FAQPage: **no rich result** (deprecated 7 May 2026). | Q1, Q3, Q4, Q5. Testimonials must **not** get Review markup: they are chosen by the site owner, and Google does not show self-serving reviews. Do not mark up the "previously at" company logos. |
| `/courses` (`src/pages/Courses.tsx`) | Course catalogue plus 2 learning-path waitlists | ItemList of Course | ItemList (summary page) | `itemListElement`: one `ListItem` per published course, with `position` (display order, from `publicCourses`) and `url` (canonical course-overview URL) only. `name` "Little Parrot courses" is acceptable, or use the H1 "Hands-on Courses". Exclude the two learning paths. | each `ListItem.url` matches a course page `#course` | **Course list**: needs at least 3 courses with detail-page Course markup. We have 9. | Google's content rule says a course is "led by one or more instructors with a roster of students". Eligibility for self-paced micro-courses is **uncertain**. The markup is still valid schema.org. |
| `/<courseId>/course-overview` (`src/pages/CourseOverview.tsx`). Examples: `/5e86e580-264c-442c-8cc4-be5645f13e87/course-overview`, `/aaab45b7-209a-4578-a515-3e55687f0c53/course-overview`, `/55dfd25b-b9a5-4f04-860d-ef5c1d1e20b9/course-overview` | Course detail: title, description, outcomes, challenge list with durations | Course, BreadcrumbList | Course, BreadcrumbList | `name` = `course.title` (the H1); `description` = `stripMarkdown(course.description)` only (the visible paragraph); `url`; `provider` → org; `inLanguage` "en"; `teaches` = visible "What you'll be able to do" items; `syllabusSections` = visible challenges (`name` "Challenge N: title", `description`, `timeRequired` from the visible duration); `hasCourseInstance` {`courseMode` "online", `courseWorkload` = sum of visible durations}. **Remove** `offers`, `author` (Q2), `educationalLevel`, `audience`, `about`, and the appended sentences. Breadcrumb: Home → Courses → course title (keep). | `{url}#course`; `provider` → `#organization` | Course list (detail page half). Breadcrumb: supported. | Breadcrumb has no visible trail on the page, but it matches the real site hierarchy (the Courses page links here). Keep it, but treat it as low priority. Do not mark up "Free until 18 October": it is time-limited, and the static HTML goes stale until the next publish. |
| `/pricing` (`src/pages/Pricing.tsx`) | Plans and prices | Product + 2 Offers | Product | `@id`; `name` "Little Parrot membership"; `description` from visible "You get" copy (for example "Full access to all current courses, the Toolkit, new courses as they launch and the private community"); `brand` → org; `offers`: Monthly (`price` 24, `priceCurrency` EUR, `priceSpecification` UnitPriceSpecification with `billingDuration` P1M) and Lifetime (`price` 950, EUR), each with `url` /pricing, `availability` InStock and `seller` → org. **Take the numbers from the same constants or response that render the visible price** (the prerender currently renders the €24/€950 fallback, and the browser renders the Stripe values). | `pricing#membership`; `brand`/`seller` → `#organization` | Product snippet: possible (single-product page with offers). Merchant listing: not applicable (no shipping or returns for a digital membership). | Whether Google shows a price snippet for a subscription is **uncertain**. Do not mark up the "worth €500" coaching values. |
| `/about` (`src/pages/About.tsx`) | Who is behind Little Parrot | Organization (shell) | AboutPage, Person x2 | AboutPage: `url`, `name` (H1 "Who's Behind Little Parrot"), `about` → org, `mainEntity` → org. Kinga: `name`, `sameAs` LinkedIn (linked on About), `worksFor` → productkind (and `founder` stated on the productkind node). Tamas: `name`, `sameAs` LinkedIn (linked on About), `jobTitle` "Educator", `worksFor` → productkind. | defines `about#kinga-magyar`, `about#tamas-kokeny`; refs `#organization`, `#productkind` | None as a rich result. Helps entity disambiguation for authors. | Q1. Do not add Green Fox Academy or other biography details as properties unless asked. They are visible, but add little. |
| `/guides/<article>` (`src/pages/Guide.tsx` `ArticlePage`, content in `src/content/guides/articles/*.ts`). Examples: `/guides/what-is-the-mental-load`, `/guides/build-vs-buy-software`, `/guides/software-bug-report-template` | Editorial guide with byline and date | Article, FAQPage (some), BreadcrumbList | Article, FAQPage (only where a visible FAQ exists; keep the `hasEditorialQuestions` exception), BreadcrumbList | `headline` = `article.title` (H1); `description` = `article.summary` (the visible standfirst); `datePublished`/`dateModified` from `published`/`updated` (visible in the byline); `image` only when `article.image` is set; `author` → Person `@id` of `getAuthor(article.author)`; `publisher` → org; `mainEntityOfPage` = canonical URL; `isPartOf` → website. FAQPage from the same `faq` array that renders visibly. Breadcrumb: Guides → hub → title (matches the visible breadcrumb). | `{url}#article`; `about#kinga-magyar` or `about#tamas-kokeny`; `#organization`; `#website` | Article: supported (better title/date/author understanding, no special card). Breadcrumb: supported. FAQPage: no rich result. | Q5. Dates have no time zone. Acceptable; Google recommends one but does not require it. |
| `/guides/<hub>` (`Guide.tsx` `HubPage`, `src/content/guides/hubs/*.ts`). Examples: `/guides/product-managers`, `/guides/working-mums`, `/guides/founders` | Audience collection of courses, articles and newsletter links | CollectionPage, BreadcrumbList | CollectionPage, BreadcrumbList | `name` = `hub.title` (H1); `description` = `hub.tagline` or the visible intro; `url`; `isPartOf` → website; `hasPart` = own items, as `{"@id": ...}` references to the course `#course` / article `#article` / learning path `#course`, using **canonical URLs without `?ref=`**. **Remove `isRelatedTo`** (invalid on CollectionPage). Do not replace it. | refs course, article and learning-path `@id`s; `#website` | Breadcrumb: supported. CollectionPage: none. | None. |
| `/guides` (`src/pages/Guides.tsx`) | Index of the 4 audience collections | CollectionPage | CollectionPage | `name` = H1 "Start with the work in front of you" (or the page title); `description` = visible intro; `hasPart` → the 4 hub URLs (canonical); `isPartOf` → website. | `#website` | None. | None. |
| `/guides/technical-product-manager`, `/guides/building-apps-with-ai` (`TechnicalProductManagerWaitlist.tsx`, `BuildingAppsWithAiWaitlist.tsx`) | Waitlist landing page for a learning path still being built | Course, FAQPage | Course, FAQPage, BreadcrumbList | Course: `name` = visible H1; `description` = visible hero paragraph (no "Join the waitlist"); `url`; `teaches` = the visible step titles; `provider` → org. **No `offers`, no `hasCourseInstance`** (the visible FAQ says the price is not set). FAQPage from the visible FAQ array. Breadcrumb: Guides → H1 (matches the visible breadcrumb). | `{url}#course`; `#organization` | Keep these out of the `/courses` ItemList. Course list eligibility: no (not running yet). Breadcrumb: supported. | Q6. |
| `/newsletter`, `/terms-of-service`, `/privacy-policy` | Sign-up form; legal pages | Organization (shell) | None page-specific | Nothing beyond what the shared layer provides (see rules). | none | None | Adding WebPage here would add nothing. |

### Shared entity model

All `@id`s are absolute and built from `https://littleparrot.app`. Define each entity **in full once**. Everywhere else, refer to it with `{"@id": "..."}`. A reference may include `name` for readability, but must not repeat other properties.

| Entity | Type | @id | Defined in full on |
| --- | --- | --- | --- |
| Little Parrot | Organization | `https://littleparrot.app/#organization` | `/` |
| productkind | Organization | `https://littleparrot.app/#productkind` | `/` |
| Website | WebSite | `https://littleparrot.app/#website` | `/` |
| Kinga Magyar | Person | `https://littleparrot.app/about#kinga-magyar` | `/about` |
| Tamas Kokeny | Person | `https://littleparrot.app/about#tamas-kokeny` | `/about` |
| Membership | Product | `https://littleparrot.app/pricing#membership` | `/pricing` |
| Each course | Course | `https://littleparrot.app/<courseId>/course-overview#course` | its course page |
| Each learning path | Course | `https://littleparrot.app/guides/<slug>#course` | its landing page |
| Each guide article | Article | `https://littleparrot.app/guides/<slug>#article` | its article page |
| About page | AboutPage | `https://littleparrot.app/about#webpage` | `/about` |
| Collection pages | CollectionPage | `https://littleparrot.app/guides#webpage`, `https://littleparrot.app/guides/<hub>#webpage` | their own pages |

Relationships: org `parentOrganization` → `#productkind`; productkind `founder` → `about#kinga-magyar` (subject to Q1); both Persons `worksFor` → `#productkind`; website `publisher` → `#organization`; every Course `provider` → `#organization`; every Article `author` → Person, `publisher` → `#organization`, `isPartOf` → `#website`.

Type choice: keep `Organization` for Little Parrot. `OnlineBusiness` is a valid, more specific subtype, and Google's Organization guide recommends the most specific subtype. Use `OnlineBusiness` only if you are comfortable describing Little Parrot as a business in its own right (the footer says "Little Parrot by productkind"). Otherwise stay with `Organization`. Do not use `EducationalOrganization`: in schema.org it is also a `CivicStructure` (a physical place).

Suggested values (verify against the visible pages before shipping):

- Little Parrot `sameAs` (Q4): `https://www.tiktok.com/@littleparrot.app`, plus `https://www.linkedin.com/products/productkind-littleparrotapp/` if confirmed.
- productkind `sameAs`: `https://www.linkedin.com/company/productkind`, `https://www.instagram.com/by_productkind/`, `https://www.youtube.com/@productkind`, `https://productkind.substack.com/` (without the `utm_` query from the footer link).
- Kinga `sameAs`: `https://linkedin.com/in/kinga-magyar/`. Tamas `sameAs`: `https://linkedin.com/in/eggdice/` (from `src/content/guides/authors.ts`, and visibly linked on About).
- Logo (Q3): `https://littleparrot.app/logo-square.png` (1080 x 1080, serves 200).

### Where the markup will live and how it reaches the HTML

- New module `src/lib/structuredData.ts`: exports the `@id` constants, `SITE_URL`, the reference helpers (`orgRef`, `personRef(authorId)`, `websiteRef`), and builder functions (`homeGraph()`, `courseNode(course)`, `articleNode(article)`, `breadcrumb(items)`, `faqPage(items)`). Person data comes from `src/content/guides/authors.ts` (add nothing that is not already visible).
- Pages keep passing markup through `<SEO jsonLd={...}>` (`src/components/SEO.tsx`). Change `SEO` to emit **one** `<script type="application/ld+json">` per page containing `{"@context": "https://schema.org", "@graph": [...]}`, and escape `<` as `<` in the serialised JSON (course text comes from the database).
- **Remove the hard-coded Organization block from `index.html`.** It moves into the home page graph. This removes the duplicate on every page and stops it appearing on noindex and private routes.
- Delivery stays as it is: `scripts/prerender.mjs` already copies Helmet's `script` tags into `<head>`, so no change to the prerender script is needed. Confirm that `helmet.script.toString()` still carries the graph after the change.
- Home FAQ: move the visible FAQ question and answer pairs in `Index.tsx` into one array, render both the accordion and the FAQPage from it, and strip markdown for the markup.
- Pricing: define the fallback prices once (for example `const FALLBACK = {monthly: 2400, lifetime: 95000, currency: 'eur'}`), use it for both the visible fallback and the markup, and prefer the fetched Stripe values when present.

### Implementation rules

1. Mark up only what the page shows, using the field that renders it. No invented descriptions, audiences, levels, prices, ratings or reviews.
2. One full definition per shared entity (table above). References elsewhere use `@id` only (optionally with `name`).
3. All URLs are absolute, canonical, `https://littleparrot.app`, with no query strings (strip `?ref=` and `utm_`).
4. Page URLs in markup must match that page's `<link rel="canonical">`.
5. Do not add `Review`, `AggregateRating`, `Offer` on courses, `Event`, `SearchAction` (there is no site search), `LocalBusiness`, address or contact details. None of these are visible or apply.
6. Do not mark up time-limited promotions ("Free until ...").
7. Private and noindex routes get no structured data.
8. Keep the course count and step structure untouched. This work changes metadata only.
9. Do not change visible text as part of this work (see Optional content changes).
10. Keep dates as `YYYY-MM-DD` from the content files, as they are now.

### Checks to run after implementing

1. `npm run build`, then extract every JSON-LD block from `dist/**/index.html` and confirm that: it parses; there is one graph per page; there are no duplicate full definitions of `#organization`; every `{"@id"}` reference resolves to a node defined somewhere on the site; and no URL contains `?ref=` or `utm_`.
2. Confirm that `dist/index.html` (home) contains Organization, productkind, WebSite and FAQPage, and that `dist/about/index.html` contains both Persons.
3. For the home FAQ, compare the markup answers with the visible text in the same HTML (at minimum, the certificate answer must say "Yes").
4. For each course page, confirm there is no `offers` and that `name` equals the H1.
5. After deploying, `curl` five live pages (home, one course, one article, pricing, about) with a non-JavaScript user agent and repeat check 1 on the raw HTML.
6. Run the Schema Markup Validator (validator.schema.org) on the same five URLs: no errors.
7. Run Google's Rich Results Test on `/courses`, one course page, one article, `/pricing` and one hub: expect Course list, Article, Breadcrumb and Product snippet detection with no critical errors.
8. Open a page in a browser after JavaScript has run and confirm that only one JSON-LD script is present (Helmet has not duplicated the prerendered one).
9. Watch the Search Console Enhancements reports (Breadcrumbs, Course list, Product snippets) for new errors over the following two weeks.

### Google documentation checked (29 September 2026)

- Search gallery (last updated 15 June 2026): Article, Breadcrumb, Carousel, Course list, Organization, Product snippet and others are listed as supported.
- Search Central documentation updates: FAQ rich results were deprecated on 8 May 2026 and are "no longer" shown from 7 May 2026. Course info documentation was removed in September 2025 (retired in June 2025). Course list is still documented.
- Course list guide (last updated 8 September 2026): needs at least 3 courses; `name` and `description` are required, `provider` is recommended; the summary page ItemList needs `ListItem.position` and `ListItem.url`; the course definition includes "led by one or more instructors with a roster of students".
- Organization guide (last updated 8 September 2026): place it on the home page or About page, not on every page; use the most specific subtype; logo must be at least 112 x 112 px, crawlable, and in a Google Images format.
- Article guide (last updated 8 September 2026): no required properties; author `url`/`sameAs` recommended.
- Product snippet guide (last updated 8 September 2026): requires `name` plus one of `offers`/`review`/`aggregateRating`, on single-product pages.
- General structured data policies (last updated 10 July 2026): don't mark up content that isn't visible; use the most specific types.
- Generate structured data with JavaScript (last updated 10 December 2025): Google reads JavaScript-added markup; server-rendered output is also supported.
- schema.org vocabulary (V30.1): `isRelatedTo` applies only to Product/Service; `syllabusSections` → Syllabus on Course is valid; `courseWorkload` is on CourseInstance.

Rich result judgements above are based on these pages. Google can change them without notice.

## Other things I noticed

- **Soft 404s:** unknown URLs (for example `/this-does-not-exist`) return HTTP 200 with the home page HTML, canonical `/`, and the home page markup. The 404 component only appears after JavaScript runs.
- **Private routes in raw HTML:** `/promo`, `/auth`, `/nest/*` and `/certificate/*` are not prerendered. Their raw HTML is the home page, with `index, follow` and canonical `/`. `noindex` only appears after JavaScript runs.
- **Stale snapshot content:** "Free until 18 October" is baked into the prerendered HTML and will stay there until the next publish after that date.
- **Checked-in `public/sitemap.xml` is out of date** (it lists noindex `/promo` and misses 4 courses and 3 guides). The live sitemap is correct because the build regenerates it. The old file is only used as a fallback for dates.
- **Visible typos in course descriptions:** "turn you ideas" (Build Your First App With Lovable) and "make change to your app" (Save Lovable Credits).
- Course H1 "Build Your First App with Lovable" differs in capitalisation from the listing title "Build Your First App With Lovable".
