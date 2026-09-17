---
status: reference
updated: 2026-09-17
owner: productkind
purpose: The working checklist for making Little Parrot articles and hubs discoverable in Google and in AI search.
channel: search
not_a_posting_destination: true
---

# Discoverability checklist

Eighteen checks, ordered by how much they change the outcome. Each one is written so you can act on it without knowing SEO, and each states what to change and how you will know it worked.

Two things to hold in mind while you use it. The first six sections are not equally weighted: sections A and B decide almost everything, and sections C to E protect what those two earn. The second is that AI search needs no separate strategy. Google's own documentation states that optimising for generative AI search is still SEO, that AI Overviews and AI Mode are grounded in the same ranking systems, and that there is no separate AI index. The items below that mention AI are the only genuinely AI-specific work there is.

Last verified against primary sources: 2026-09-17. Re-check the linked Google documentation each quarter.

---

## A. Can Google find and keep the page

### 1. Pages that are not indexed

**What to check.** Every article you have published is present in Google's index and eligible to be shown with a snippet.

**Why it affects search.** A page must be indexed and snippet-eligible before it can appear anywhere at all, including in AI Overviews and AI Mode. This check is binary rather than gradual, so a page that fails it scores nothing on every other item in this list no matter how good it is.

**How to detect it.** Open Search Console, go to Indexing then Pages, and compare the indexed count against the number of articles you have published. Click any reason listed under "Why pages aren't indexed" to see the affected URLs. For a single article, paste its URL into the Search Console inspection bar at the top.

**What to change.** Remove any `noindex` tag the site builder added by default, check `robots.txt` is not blocking the article path, and make sure the page is reachable by clicking links from the homepage. Once the page is fixed, use "Request indexing" in the URL inspection tool.

**How to verify it.** The URL inspection tool reports "URL is on Google". Expect this within a few days for a new page on a small site, and up to a few weeks if the site is new.

**Sources.** [Search Console URL Inspection](https://support.google.com/webmasters/answer/9012289), [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

### 2. Duplicate versions of the same page

**What to check.** Each article is reachable at exactly one URL, and that URL declares itself as the canonical one.

**Why it affects search.** When the same content sits at several addresses, the signals that would otherwise stack on one page get split across all of them, and Google picks the canonical itself rather than letting you choose. This is also the failure that most often appears silently after a site rebuild, which makes it a live risk every time the site is regenerated.

**How to detect it.** Load the article with and without a trailing slash, with `www` and without, and over `http` and `https`, and confirm the variants redirect to one address rather than all loading. View the page source and search for `rel="canonical"` to confirm it points at the address you intend.

**What to change.** Add a self-referencing canonical tag to every article, redirect the variants to the canonical address with a permanent redirect, and redirect old URLs whenever a slug changes.

**How to verify it.** The URL inspection tool shows your chosen address under both "User-declared canonical" and "Google-selected canonical". The two matching is the passing state.

**Sources.** [Consolidate duplicate URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

### 3. Articles with no internal links pointing at them

**What to check.** Every article is linked from the hub page and from two or three genuinely related articles, and links back in return.

**Why it affects search.** Internal links are how Google discovers new pages and how it works out what your site covers as a whole, so a group of articles that reference each other reads as real coverage of a subject while the same articles sitting unlinked read as unrelated one-offs. This is the highest-leverage structural work available to you, because you control it completely and it costs nothing.

**How to detect it.** In Search Console, open Links then Internal links, and look for articles with a low count or no entry at all. Cross-check against the article list in [`content-ledger.md`](../../content/seo/content-ledger.md).

**What to change.** Link the hub to every article in its cluster, link each article back to its hub, and add two or three sideways links between articles that a reader would genuinely want next. Write the anchor text as the thing the reader gets, vary it between links, and avoid using the same phrase everywhere.

**How to verify it.** The internal links count in Search Console rises for the previously orphaned articles, and every article in a cluster has at least three internal links pointing at it.

**Sources.** [Google Search Essentials](https://developers.google.com/search/docs/essentials)

### 4. Sitemap missing or stale

**What to check.** An XML sitemap exists, lists your current articles, and is submitted to Search Console.

**Why it affects search.** A sitemap does not make pages rank, but it shortens the time between publishing an article and Google discovering it, which matters most on a small site where there are few internal links to follow. It is mechanical work you do once and then leave alone.

**How to detect it.** Open `yoursite.com/sitemap.xml` in a browser and confirm your newest article is listed, then check Search Console under Indexing then Sitemaps for the submitted status and last read date.

**What to change.** Generate a sitemap if there is none, confirm the site builder regenerates it on publish, and submit the URL once in Search Console.

**How to verify it.** Search Console reports "Success" for the sitemap with a recent read date, and the discovered-URL count matches your published article count.

**Sources.** [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

### 5. AI search crawlers blocked, or the AI opt-out switched on

**What to check.** `robots.txt` allows the crawlers that decide AI citation, and the Search Console generative AI control is not set to exclude you.

**Why it affects search.** `OAI-SearchBot` and `Claude-SearchBot` are the crawlers that index content for ChatGPT search and Claude search respectively, and blocking either removes you from those answers. These are separate user agents from the training crawlers, so you can be visible in AI search while still declining to contribute training data, and the decisions are independent.

**How to detect it.** Open `yoursite.com/robots.txt` and look for `Disallow` rules under `OAI-SearchBot`, `Claude-SearchBot` or `PerplexityBot`, then check the generative AI control in Search Console is not set to block AI surfaces.

**What to change.** Allow `OAI-SearchBot`, `Claude-SearchBot` and `PerplexityBot`. If you want to decline model training separately, disallow `GPTBot` and `ClaudeBot` instead, which does not affect search visibility. Leave the Search Console AI toggle off.

**How to verify it.** `robots.txt` shows no disallow rule for the three search crawlers, and impressions appear under Performance then Generative AI in Search Console over the following weeks.

**Sources.** [OpenAI crawlers](https://developers.openai.com/api/docs/bots), [Anthropic crawlers](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)

---

## B. The decisions that decide the outcome

### 6. The target query has no real demand

**What to check.** The exact phrase the article targets is one people actually type, confirmed with volume data before writing.

**Why it affects search.** An article aimed at a phrase nobody searches has a ceiling of zero regardless of how well it is written, and no amount of later optimisation repairs a demand problem. This is the item where we have been wrong before, because product-led naming and search-led naming pull in different directions.

**How to detect it.** Check the phrase in a tool that reports volume, and read the cost-per-click alongside the volume rather than the volume alone, since a term with commercial value attracts competition. Confirm the phrase is recorded in the cluster plan and in [`content-ledger.md`](../../content/seo/content-ledger.md) before drafting.

**What to change.** Name the article after the phrase people search rather than the concept we use internally. Where our vocabulary and the search vocabulary differ, use theirs in the title, headings and slug, and ours in the body where it teaches something.

**How to verify it.** The article accumulates impressions in Search Console within thirty days of indexing. Impressions near zero after sixty days with the page indexed means the query was the problem, not the writing.

**Sources.** [Third-party SEO tools guidance](https://developers.google.com/search/docs/fundamentals/third-party-seo)

### 7. The article is commodity content

**What to check.** The article contains something only we could have written, drawn from work we actually did.

**Why it affects search.** Google names non-commodity, first-hand content as the thing that matters for AI search and classic search alike, and its own worked example contrasts a generic tips listicle against an account of a specific decision the author lived through. This is our structural advantage, because the generic version of every article we would write already exists many times over and competitors generating pages cannot fake having taught real learners.

**How to detect it.** Read the draft and mark every sentence that could have appeared on any competitor site. If the specific passages are a small minority, the article is commodity content wearing our voice.

**What to change.** Replace the generic passages with what we have seen: what a learner got stuck on, the version of the advice that failed first, the actual numbers, the screenshot of the real thing. Where the article is AI-assisted, be able to answer how it was made, because Google's guidance asks that question directly.

**How to verify it.** The article holds position and gains impressions through a core update rather than dropping, and readers quote the specific parts back to us.

**Sources.** [Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

### 8. The page format does not match what the searcher wants

**What to check.** The shape of the article matches the shape of what already ranks for the query.

**Why it affects search.** A page can be accurate, well written and technically perfect and still lose because it answered a different question from the one being asked, and this mismatch is invisible in every audit tool because nothing on the page is broken. Someone searching for a template wants a template near the top, not an essay about why templates help.

**How to detect it.** Search the target query yourself and note the format of the top five results rather than their wording: steps, comparison table, definition, template, or list. Compare that against the draft.

**What to change.** Give the reader the format the query implies, in the first screen. Keep the explanation, but put it after the thing they came for.

**How to verify it.** Average position improves in Search Console, and the gap between impressions and clicks narrows for that query.

**Sources.** [Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

### 9. The answer is buried

**What to check.** Each section answers its own heading in the first forty to sixty words, in a passage that makes sense if lifted out on its own.

**Why it affects search.** A self-contained passage serves the reader who is skimming, the search snippet, and any AI system deciding what to quote, which makes this the one writing habit that pays into all three at once. It costs nothing and it is a habit rather than a technique, so it does not distort the voice.

**How to detect it.** Read the first two sentences under each heading on their own. If they set up the answer rather than give it, the answer is buried.

**What to change.** State the answer directly under the heading, then expand with the reasoning and the example. Keep the specific number, name or step in the opening sentence rather than the paragraph below it.

**How to verify it.** Impressions appear under Performance then Generative AI in Search Console, and the article starts to hold snippets for its query.

**Sources.** [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

### 10. The title and description do not earn the click

**What to check.** Every article has a title tag and meta description written deliberately, containing the target phrase and the promise.

**Why it affects search.** Ranking and being clicked are separate problems, and a page ranking in position four with a vague title loses traffic to a page in position six with a clear one. Google may rewrite the description, but a written one is used far more often than an absent one.

**How to detect it.** In Search Console, open Performance and sort queries by impressions, then look for high impressions paired with a low click-through rate. Check the page source for the `<title>` and `<meta name="description">` values.

**What to change.** Put the target phrase near the front of the title and state what the reader gets. Write the description as the promise rather than a summary, and avoid opening it by repeating the title.

**How to verify it.** Click-through rate for that query rises in Search Console while average position stays flat, which isolates the title change as the cause.

**Sources.** [Title links](https://developers.google.com/search/docs/appearance/title-link), [Snippets](https://developers.google.com/search/docs/appearance/snippet)

### 11. Trust signals are missing

**What to check.** Named author with a real biography page, honest published and updated dates, and claims attributed to sources with links.

**Why it affects search.** Google's quality guidance places Trust at the centre of E-E-A-T and asks who made the content, how, and why, so a named human with a visible background answers that question where an unattributed page does not. We are two named people with a company, which is stronger evidence than most sites can show, and it is worth making visible rather than assuming readers infer it.

**How to detect it.** Open any article and check for a byline that links to a biography page, a visible published date, and links on the statistics and claims.

**What to change.** Add bylines linking to author pages, show published and updated dates honestly rather than refreshing them to look current, and link every statistic to its source. Keep a clear about page and contact route.

**How to verify it.** Every published article passes the same check, and the author pages are themselves indexed.

**Sources.** [Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [Quality Rater Guidelines](https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf)

---

## C. Credibility beyond the page

### 12. The brand is not one recognisable entity

**What to check.** The same name, description and links describe Little Parrot everywhere it appears.

**Why it affects search.** Google and AI systems both need to resolve the name to one thing before they can be confident about citing it, and inconsistent descriptions across profiles make that resolution harder. This is cheap to fix and it compounds with everything else.

**How to detect it.** Read our LinkedIn, Substack, Instagram and TikTok descriptions side by side with the site footer and about page, and note every place the wording diverges.

**What to change.** Settle one description and use it everywhere. Add `Organization` structured data to the site with `sameAs` listing the profile URLs.

**How to verify it.** The Rich Results Test reads the `Organization` markup without errors, and the descriptions match across profiles.

**Sources.** [Structured data general guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

### 13. Structured data missing, or using retired types

**What to check.** Articles carry `Article` markup, courses carry `Course` markup, and no page uses a retired type.

**Why it affects search.** Structured data makes machine-readable what the page already says, which helps Google present it correctly, but it is not a ranking lever and Google explicitly warns against over-investing in it for AI features. The bigger risk is spending effort on types that no longer produce anything: `FAQPage` rich results were fully retired on 7 May 2026 and `HowTo` has been dead since 2023.

**How to detect it.** Run each page template through the Rich Results Test and read which types it detects. Search the codebase for `FAQPage` and `HowTo`.

**What to change.** Add `Organization` sitewide, `Article` on articles, `Person` for authors, `BreadcrumbList` for the hub path, and `Course` for courses, since the single-result course card is still live. Do not add new `FAQPage` or `HowTo` for search benefit. Existing `FAQPage` does not need removing, as unused markup causes no harm.

**How to verify it.** The Rich Results Test reports the intended types with no errors, and Search Console shows no new structured data issues.

**Sources.** [Structured data gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery), [Article markup](https://developers.google.com/search/docs/appearance/structured-data/article), [Course markup](https://developers.google.com/search/docs/appearance/structured-data/course), [June 2025 deprecations](https://developers.google.com/search/blog/2025/06/simplifying-search-results)

---

## D. Experience for people and agents

### 14. Core Web Vitals outside good

**What to check.** Largest Contentful Paint at 2.5 seconds or under, Interaction to Next Paint at 200 milliseconds or under, and Cumulative Layout Shift at 0.1 or under, measured on real visitors.

**Why it affects search.** Google treats these as a tiebreaker between pages of similar quality rather than as a primary signal, so reaching "good" is worth doing and chasing a perfect score is a well-documented way to spend weeks for nothing. Getting there and stopping is the correct amount of effort.

**How to detect it.** Run the article URL through PageSpeed Insights and read the field data section at the top, which reflects real visitors, rather than the lab score below it. Check Search Console under Experience then Core Web Vitals for a site-wide view.

**What to change.** Compress and convert oversized images, reserve space for images and embeds so the layout does not jump, and remove third-party scripts that are not earning their place.

**How to verify it.** All three metrics read green in the field data section of PageSpeed Insights. Field data reflects the previous 28 days, so allow a month after the fix before judging.

**Sources.** [Web Vitals](https://web.dev/articles/vitals)

### 15. Interactive elements agents and screen readers cannot use

**What to check.** Buttons are `<button>`, links are `<a href>`, form inputs have associated labels, and headings run in order.

**Why it affects search.** AI agents read sites through three channels, and the browser accessibility tree is the cleanest of them, so a page built from clickable `<div>` elements presents agents with controls that carry no role and get skipped. The same work makes the site usable with a screen reader and legible to crawlers, which means one piece of effort pays into accessibility, agent readiness and search at once.

**How to detect it.** Try to use the article and the course pages with the keyboard alone, using Tab and Enter. Open the browser devtools accessibility panel and check that each control appears with a role and a name. Look in the source for `onclick` on a `div`.

**What to change.** Replace custom clickable elements with real `<button>` and `<a href>` tags, associate every input with a `<label for>`, keep clickable targets at 24 by 24 pixels or larger, and write alt text that describes the image rather than naming it.

**How to verify it.** Every interactive element is reachable and operable by keyboard, and each appears in the accessibility panel with a role and a name.

**Sources.** [Build agent-friendly websites](https://web.dev/articles/ai-agent-site-ux), [WCAG target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

### 16. Images slow the page down or say nothing

**What to check.** Images are served in a modern format at a sensible size, and their alt text describes what they show.

**Why it affects search.** Oversized images are the most common cause of a failing Largest Contentful Paint on a content site, and images without dimensions cause the layout shift that fails Cumulative Layout Shift. Alt text is how the image becomes findable and how a reader who cannot see it still gets the point.

**How to detect it.** Read the opportunities section of the PageSpeed Insights report for oversized images, and check the page source for `alt` attributes that are empty or repeat the file name.

**What to change.** Convert to WebP and resize to the dimensions actually displayed, set width and height attributes so the browser reserves the space, and write alt text as a description of the content rather than a keyword.

**How to verify it.** PageSpeed Insights stops listing image opportunities, and Cumulative Layout Shift reads green in field data.

**Sources.** [Google Images best practices](https://developers.google.com/search/docs/appearance/google-images)

---

## E. Keeping it true after publish

### 17. A deploy silently changes SEO-critical elements

**What to check.** Titles, descriptions, canonicals, headings and structured data survive each site rebuild unchanged.

**Why it affects search.** Regenerating a site can drop or rewrite the elements above without anything visibly breaking, and the loss shows up weeks later as a ranking drop with no obvious cause. Catching it at deploy time is far cheaper than diagnosing it later.

**How to detect it.** Record the title, description, canonical and heading structure of each published article before a rebuild, and compare after. A saved copy of the rendered page source is enough for a small site.

**What to change.** Re-apply anything the rebuild dropped, and where the site stores a second copy of the article body, compare it against `article.md` as the [SEO content README](../../content/seo/README.md) requires.

**How to verify it.** The post-deploy comparison shows no unintended differences, and Search Console reports no new indexing or structured data errors in the following week.

**Sources.** [Search Console Pages report](https://support.google.com/webmasters/answer/7440203)

### 18. Published articles are never reviewed

**What to check.** Each published article has its measurements recorded at 14, 30, 60 and 90 days in [`content-ledger.md`](../../content/seo/content-ledger.md).

**Why it affects search.** Search feedback arrives slowly enough that the connection between a change and its result is lost unless it is written down, and impressions rising while clicks stay flat points at a different fix from impressions staying at zero. Without the record, every later decision is guesswork.

**How to detect it.** Open [`content-ledger.md`](../../content/seo/content-ledger.md) and look for published articles with empty review rows.

**What to change.** Fill the review schedule at each point, recording indexed status, impressions, clicks, click-through rate, average position and any AI referrals, and write the decision the numbers led to.

**How to verify it.** Every published article has a complete set of review rows, and each row ends with a decision rather than a blank.

**Sources.** [Generative AI performance reports](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)

---

## What to ignore

These consume time and return nothing. Several are actively harmful because they distort otherwise good writing.

| Ignore | Why |
| --- | --- |
| Keyword density percentages | Google publishes no density target, and writing to one produces stilted copy. |
| Minimum word counts | Google lists "writing to a target word count" as a warning sign and states there is no such count. |
| `llms.txt` as a ranking or citation lever | Google's documentation states Search ignores it. Ship one only for non-Google optionality. |
| Chunking content for AI, or AI-specific rewrites | Named in Google's own myth-busting list. |
| Meta keywords | Unused for over a decade. |
| Domain Authority as a Google metric | A third-party estimate, not a signal Google uses. |
| Publishing on a schedule for freshness | Google names mass churn for freshness as a warning sign. |
| Refreshing dates without changing content | Named as faking freshness. |
| AI-detector scores | Google's position is that AI-assisted content is fine when it meets Search Essentials. |
| Chasing mentions across forums and videos | Named in Google's myth-busting list as ineffective. |

**Source.** [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

---

## Where the numbers come from

| Question | Where to look |
| --- | --- |
| Is it indexed? | Search Console, Indexing then Pages, or the URL inspection bar |
| Is anyone seeing it? | Search Console, Performance, impressions before clicks |
| Is it being cited in AI search? | Search Console, Performance then Generative AI. Impressions only for now, with no clicks, click-through rate or query data |
| Is the page fast enough? | PageSpeed Insights, the field data section at the top |
| Is the markup valid? | Rich Results Test |
| What did Google change recently? | The Search Status Dashboard and Search Central blog |

Impressions move before clicks, and clicks move before anything else. On a new site, allow three to six months before judging whether a cluster is working, and read the trend rather than any single week.

## Order to work in

1. Run section A across every published article once. It is mechanical and it gates everything else.
2. Apply section B to each article before it is drafted, not after it is written. Items 6, 7 and 8 are research and writing decisions, and they are where the outcome is actually decided.
3. Do section C once per template rather than per article.
4. Do section D once, then re-check after any significant site change.
5. Make section E a habit at deploy and at each review point.
