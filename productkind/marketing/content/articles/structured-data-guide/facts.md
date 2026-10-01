# Facts sheet: getting a site onto Google and into AI search

Checked 2026-09-30 against official documentation. Every fact carries its source. Anything not confirmed on an official page is marked **UNCONFIRMED**. Quotes are short extracts from the live pages.

---

## 1. Checking whether Google has indexed a site

- **`site:` search.** Google suggests searching `site:example.com` to see whether pages are indexed. Source: https://developers.google.com/search/docs/basics/get-on-google
- **What `site:` doesn't prove.** It "doesn't necessarily return all the URLs that are indexed", and with no query it doesn't rank results (order is fairly arbitrary). A missing page in `site:` results is not proof it isn't indexed. Source: https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site
- **URL Inspection tool.** Type the full URL into the inspection bar at the top of any Search Console screen (or click **Inspect** next to a URL in a report). The URL must belong to the current property. Source: https://support.google.com/webmasters/answer/9012289
- **"URL is on Google" isn't a ranking promise.** Google says this status "doesn't actually guarantee that your page will appear in Search results" (quality, manual actions and security issues aren't all checked). Source: https://support.google.com/webmasters/answer/9012289
- **Page indexing report.** Shows pages as **Indexed** or **Not indexed**, with a reason for each not-indexed group. Source: https://support.google.com/webmasters/answer/7440203
- Menu path "Indexing > Pages" in the left sidebar: **UNCONFIRMED** (not stated in the fetched help text).
- **Timeline.** "It can take a few weeks for Google to notice a new site, or any changes in your existing site." Source: https://developers.google.com/search/docs/basics/get-on-google

## 2. Google Search Console setup

### Adding a property

- Steps: open the property selector, choose **+ Add property**, pick the property type, pick a verification method, verify now or click **Verify later**. Source: https://support.google.com/webmasters/answer/34592
- **Domain property:** covers all subdomains (m, www, ...) and all protocols (http, https). DNS verification only. Source: https://support.google.com/webmasters/answer/34592
- **URL-prefix property:** only URLs starting with the exact prefix, including the protocol. Separate properties needed for other protocols or subdomains. Source: https://support.google.com/webmasters/answer/34592

### Verification methods (UI labels from Google's help page)

| Method | UI label | Property type |
| --- | --- | --- |
| Upload a file to the site root | **HTML file upload** | URL-prefix only |
| Meta tag in the homepage `<head>` | **HTML tag** | URL-prefix only |
| Existing Analytics code (gtag.js or analytics.js, in `<head>`, edit rights needed) | Google Analytics | URL-prefix only |
| Existing Tag Manager container (Publish/Admin permission needed) | Google Tag Manager | URL-prefix only |
| TXT or CNAME record at the domain provider | Domain name provider | Domain properties (also verifies URL-prefix) |

Source: https://support.google.com/webmasters/answer/9008080

- Meta tag format: `<meta name="google-site-verification" content="......." />`. Source: https://support.google.com/webmasters/answer/9008080
- **DNS verification timing:** "can take up to two or three days". Source: https://support.google.com/webmasters/answer/9008080
- **Verification must stay in place.** Google keeps rechecking; if the token disappears, owners are notified before permissions expire. Source: https://support.google.com/webmasters/answer/9008080
- **When data appears:** "Data should begin to appear in your property in a few days." Collection starts as soon as the property is added, even before verification. Source: https://support.google.com/webmasters/answer/34592

### On a lovable.app subdomain (no DNS access)

- You can't add DNS records for `lovable.app`, so a **Domain property is not possible**; use a **URL-prefix property** with the **HTML tag** method. (Inference from the table above: DNS is Domain-only, everything else is URL-prefix.)
- **Lovable's Google Search Console connector** verifies using the meta-tag method only. It requests a token, adds `<meta name="google-site-verification" ...>` to the `<head>`, calls Google's verify endpoint and registers the property. "DNS, HTML file upload, or Google Analytics" are not supported through the connector. Source: https://docs.lovable.dev/integrations/google-search-console
- Connector path: **Connectors > Google Search Console > Add connection**, then Google sign-in. Only workspace admins and owners can connect. Source: https://docs.lovable.dev/integrations/google-search-console
- The connector matches "the exact same site identifier, including trailing slash", which points to a URL-prefix property; Lovable doesn't state the property type outright: **UNCONFIRMED**. Source: https://docs.lovable.dev/integrations/google-search-console
- Manual route: you can add the meta tag to the site's `<head>` yourself and verify in Search Console directly. Source: https://docs.lovable.dev/integrations/google-search-console
- Connector limits: can't request indexing, can't use other verification methods. It can read URL Inspection results, search analytics and sitemap status. "Search Console data is typically delayed by a couple of days." Source: https://docs.lovable.dev/integrations/google-search-console
- **Indexability of lovable.app:** only publicly published apps can be indexed. Private/unpublished projects and branded workspace URLs (`https://{app-name}.{workspace-subdomain}.lovable.app`) "are never indexable". Source: https://docs.lovable.dev/features/seo
- Lovable says a `lovable.app` subdomain works well for MVPs, demos, temporary pages, internal tools and projects driven by social or paid traffic, and recommends a custom domain "to build search presence". Source: https://docs.lovable.dev/features/seo
- With a custom domain set as primary, "Lovable redirects every other address to it" (including the lovable.app address). Source: https://docs.lovable.dev/tips-tricks/launch-on-a-custom-domain
- Changing the custom domain "requires re-verification in GSC". Source: https://docs.lovable.dev/features/seo

## 3. Sitemaps

- **Search Console labels:** in the **Sitemaps** report, paste the sitemap URL into **Add a new sitemap**, then click **Submit**. Status values: **Success**, **Has errors**, **Couldn't fetch**. Source: https://support.google.com/webmasters/answer/7451001
- Alternative: add `Sitemap: https://example.com/sitemap.xml` anywhere in robots.txt. Source: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- A sitemap "is merely a hint: it doesn't guarantee that Google will download the sitemap or use the sitemap for crawling". Source: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- **Lovable doesn't always create them.** "Sitemaps, `robots.txt`, metadata, and other SEO elements are not always generated up front." The SEO & AI search review flags them and "Lovable can create, update, or repair most things in one click". Source: https://docs.lovable.dev/features/seo
- **Where in Lovable:** **More > SEO & AI search** in the project toolbar; buttons **Scan project** / **Scan again**, **Try to fix**, **Try to fix all**. The review is free on all plans; fixes use normal message credits. Source: https://docs.lovable.dev/features/seo
- Review checks include robots.txt ("Crawler rules look good"), Sitemap ("Sitemap looks good") and Google Search Console ("Google Search Console is set up": connected, verified, sitemap submitted). Source: https://docs.lovable.dev/features/seo
- Publish first: Google fetches the sitemap from the live site, so unpublished pages won't be in it. Source: https://docs.lovable.dev/features/seo

## 4. "Request indexing"

- Click **Request indexing** on the URL Inspection result. If the page passes a quick check it "will be submitted to the indexing queue". You can't request it if the live test finds the page non-indexable. Source: https://support.google.com/webmasters/answer/9012289
- **Daily limit** per property; for many URLs, submit a sitemap instead. Exact number: **UNCONFIRMED** (Google doesn't publish it on the page). Source: https://support.google.com/webmasters/answer/9012289
- Asking again doesn't help: "requesting a recrawl multiple times for the same URL won't get it crawled any faster." Source: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- **Timing (Google):** "Indexing typically takes only a day or so, but can take much longer in some cases" (URL Inspection help); "Crawling can take anywhere from a few days to a few weeks" (recrawl doc). Sources: https://support.google.com/webmasters/answer/9012289 and https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- **Not guaranteed:** "Submitting a request does not guarantee that the page will appear in the Google Index." Source: https://support.google.com/webmasters/answer/9012289. And a crawl request doesn't guarantee inclusion "instantly or even at all". Source: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- Lovable's own FAQ says indexing "can take from a few hours to a few days, and sometimes longer". This is more optimistic than Google's wording; prefer Google's. Source: https://docs.lovable.dev/features/seo

## 5. Why a page isn't indexed (beginner checks)

Reason labels in the Page indexing report (Source: https://support.google.com/webmasters/answer/7440203):

- **URL marked 'noindex'**
- **URL blocked by robots.txt**
- **Discovered - currently not indexed** (found but not crawled yet)
- **Crawled - currently not indexed** (crawled, Google chose not to index)
- **Duplicate without user-selected canonical**
- **Duplicate, Google chose different canonical than user**
- Also: server errors (5xx), redirect errors, soft 404, 401/403, 404.

Supporting facts:

- **noindex:** `<meta name="robots" content="noindex">` or header `X-Robots-Tag: noindex` drops the page from Search. For it to work the page must not be blocked by robots.txt. Check with URL Inspection. Source: https://developers.google.com/search/docs/crawling-indexing/block-indexing
- **robots.txt** controls crawling, "it is not a mechanism for keeping a web page out of Google"; a blocked URL can still show in results without a description. Source: https://developers.google.com/search/docs/crawling-indexing/robots/intro
- **New sites:** it "can take a few weeks" to be noticed; some sites are missed, often because nothing links to them. Source: https://developers.google.com/search/docs/basics/get-on-google
- **Links:** Google finds new pages through links, and can only follow an `<a>` element with an `href`. JavaScript-inserted links are fine if they use that markup. Source: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- **Canonical:** `<link rel="canonical" href="...">` states the preferred URL among duplicates. It's a preference, not a command, and "none of them are required". Source: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Lovable's review also flags sitewide `noindex`, `X-Robots-Tag: noindex` and "incorrect canonicals". Source: https://docs.lovable.dev/features/seo

### JavaScript sites (Google)

- Google crawls, then renders, then indexes. Pages with a 200 status are queued for rendering, which "may stay on this queue for a few seconds, but it can take longer". Source: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- "Server-side or pre-rendering is still a great idea because it makes your website faster for users and crawlers, and not all bots can run JavaScript." Source: same page.
- Single-page apps: use real URLs (History API, `/products`), not `#/products` fragments, which Google "can't reliably resolve". Source: same page.
- If Google sees `noindex` it may skip rendering, so a JS-removed noindex may not work. Source: same page.

### How Lovable serves pages to crawlers

- **New Lovable apps created from 13 May 2026** use TanStack Start with server-side rendering: every visitor and crawler gets fully rendered HTML. Source: https://docs.lovable.dev/features/seo and https://docs.lovable.dev/features/hosting
- **Older React + Vite apps** get "on-request pre-rendering" on deployed public URLs, served "only to verified crawlers: Google, Bing, social-preview bots, and AI engines like ChatGPT, Perplexity, Claude, and Gemini". Humans get the normal single-page app. Source: https://docs.lovable.dev/features/seo
- **CONTRADICTED by our own experience (Kinga, 2026-10-01):** littleparrot.app is an older Lovable app, and ChatGPT and Claude couldn't see its content until we added our own pre-rendering (`scripts/prerender.mjs`, added 2026-07-01). Don't present Lovable's older-app pre-rendering as reliable.
- Third-party SEO scanners and link checkers see the bare SPA shell, not the pre-rendered HTML. (So a third-party "your site is empty" report may be misleading for older Lovable apps.) Source: https://docs.lovable.dev/features/seo
- Older projects can be upgraded to TanStack Start (uses credits; live site unchanged until you publish). Source: https://docs.lovable.dev/features/seo
- "Lovable-hosted projects do not need an external pre-rendering service". Source: https://docs.lovable.dev/features/seo
- Sites built with Claude Code, Cursor or Codex and hosted elsewhere don't get this; whether they're crawlable depends on how they're built and hosted (Google's JS guidance above applies).

## 6. Google AI Overviews and AI Mode

- To appear, "a page must be indexed and eligible to be shown in Google Search with a snippet." Source: https://developers.google.com/search/docs/appearance/ai-features
- "There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary." No new machine-readable files, AI text files or markup are needed. Source: same page.
- Controls: `nosnippet`, `data-nosnippet`, `max-snippet`, `noindex`. Source: same page.
- Traffic from AI features is counted in Search Console's **Performance** report under the **Web** search type (not reported separately). Source: same page.
- AI Mode and AI Overviews may use "query fan-out" (several related searches across subtopics). Source: same page.
- **Google-Extended** controls Gemini training/grounding use and "does not impact a site's inclusion in Google Search nor is it used as a ranking signal". Source: https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers

## 7. ChatGPT search (OpenAI)

Crawlers (Source: https://developers.openai.com/api/docs/bots, formerly platform.openai.com/docs/bots):

- **OAI-SearchBot:** "used to surface websites in search results in ChatGPT's search features." "Sites that are opted out of OAI-SearchBot will not be shown in ChatGPT search answers". Robots.txt changes take "~24 hours" to apply.
- **GPTBot:** crawls content "that may be used in training". Disallowing it means content shouldn't be used for training; it is separate from search.
- **ChatGPT-User:** visits pages for user actions in ChatGPT and Custom GPTs; "not used for crawling the web in an automatic fashion"; because the user starts the action, "robots.txt rules may not apply".
- **OAI-AdsBot:** checks pages submitted as ChatGPT ads; not used for training.

Appearing in ChatGPT search:

- "Any public website can appear in ChatGPT search." Don't block OAI-SearchBot. Source: https://help.openai.com/en/articles/12627856-publishers-and-developers-faq
- Also make sure the host or CDN allows traffic from OpenAI's published search-bot IP addresses. "Placement is not guaranteed." Source: https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt
- No submission form or ChatGPT equivalent of Search Console is mentioned on either page.
- ChatGPT adds `utm_source=chatgpt.com` to referral links, so visits show in analytics such as Google Analytics. Source: https://help.openai.com/en/articles/12627856-publishers-and-developers-faq
- **Third-party search providers:** "ChatGPT search sometimes partners with other search providers" and sends them rewritten queries. The page links the Microsoft privacy statement and Shopify privacy policy as those providers' policies. Source: https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt
- "Bing" by name as the provider: **UNCONFIRMED** on current OpenAI pages (only implied by the Microsoft privacy link). The publisher FAQ also mentions obtaining URLs "from a third-party search provider". Source: https://help.openai.com/en/articles/12627856-publishers-and-developers-faq

## 8. Bing Webmaster Tools and IndexNow

- Two ways to add a site: **Import sites from Google Search Console** (sites arrive already verified, up to 100 at a time) or add manually by entering the URL. Source: https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b
- Bing then periodically rechecks via Search Console and imports new sitemaps it finds there automatically. Source: same page.
- Manual verification options: DNS auto verification (Domain Connect, only for participating DNS providers), **XML File authentication** (`BingSiteAuth.xml`), **Meta tag authentication**, **Add CNAME record to DNS**. Source: same page.
- Data appears "usually" within 48 hours of adding a site. Source: same page.
- Beginner tip (inference): if Google Search Console is already verified, the import route avoids a second verification step, which helps on lovable.app where DNS isn't editable.
- **Bing and Copilot (official):** Bing Webmaster Tools' **AI Performance** report shows how a site's content is cited in AI answers "across Microsoft Copilot and partner experiences", covering Microsoft Copilot, AI-generated summaries in Bing, and "select partner AI integrations". Released 11 Feb 2026 per third-party reporting (**UNCONFIRMED** date). Source: https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c
- Same page: "As with Bing search, AI Performance reflects only content that is eligible for indexing." Citations are not clicks or traffic. Source: same page.
- Which partner AI integrations are included (for example ChatGPT): **UNCONFIRMED**, not named.
- **IndexNow:** a ping that tells participating search engines a URL was added, updated or deleted. Participants listed include Bing, Yandex, Naver, Seznam.cz, Yep and Amazon; submissions are shared between them. Google is not listed. "Submitting a URL does not guarantee immediate indexing." Sources: https://www.indexnow.org/faq and https://www.indexnow.org/documentation
- Whether Lovable supports IndexNow or Bing: not mentioned in Lovable's SEO docs (**UNCONFIRMED**).

## 9. Anthropic and Perplexity crawlers

Anthropic (Source: https://support.claude.com/en/articles/8896518, formerly support.anthropic.com):

- **ClaudeBot:** collects web content that could contribute to model training. Blocking it excludes the site's future content from training datasets.
- **Claude-User:** fetches pages when a Claude user asks a question. Blocking it "may reduce your site's visibility for user-directed web search."
- **Claude-SearchBot:** crawls to improve search result quality. Blocking it "may reduce your site's visibility and accuracy in user search results."
- All respect robots.txt, including the non-standard `Crawl-delay`. Each needs its own rule (e.g. `User-agent: ClaudeBot` / `Disallow: /`). IP blocking "may not work correctly". IP list at `claude.com/crawling/bots.json`.

Perplexity (Source: https://docs.perplexity.ai/guides/bots):

- **PerplexityBot:** "designed to surface and link websites in search results on Perplexity", not used for training foundation models. "To ensure your site appears in search results, we recommend allowing `PerplexityBot`". Follows robots.txt.
- **Perplexity-User:** fetches pages for a user's question; "generally ignores robots.txt rules" because the user starts the request.

## 10. Do AI crawlers run JavaScript?

- **Vercel + MERJ, "The rise of the AI crawler", 17 Dec 2024.** Measured crawler traffic on Vercel's network (nextjs.org and two job boards). Finding: ChatGPT and Claude crawlers "do _fetch_ JavaScript files (ChatGPT: 11.50%, Claude: 23.84% of requests), they don't _execute_ them." Exceptions: Gemini (uses Googlebot infrastructure) and AppleBot render JavaScript. Recommendation: server-side render important content. Source: https://vercel.com/blog/the-rise-of-the-ai-crawler
- **This is not first-party.** It's a hosting company's measurement, not a statement from OpenAI or Anthropic, and it's nearly two years old.
- **Vendor docs:** the OpenAI bots page, OpenAI publisher FAQ, Anthropic crawler page and Perplexity bots page make no statement either way about executing JavaScript. **UNCONFIRMED** from any AI vendor.
- **Closest first-party statements:** Google says "not all bots can run JavaScript" (https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics). Lovable says social platforms "often do not execute client-side JavaScript" and builds its pre-rendering around that for AI crawlers (https://docs.lovable.dev/features/seo).

## 11. When ChatGPT says something wrong about a business

- **Answers with search come from web sources.** With search on, ChatGPT "can access and cite real-time web sources"; without it, it answers from training data up to a cutoff. Source: https://help.openai.com/en/articles/8313428-does-chatgpt-tell-the-truth
- OpenAI says search results and citations "can be incomplete, outdated, or incorrect" and suggests opening the cited source, or asking ChatGPT to search again with a specific source. Source: https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt
- OpenAI notes the model may fail to reach a site "due to technical issues, paywalls or preferences set via robots.txt." Source: https://help.openai.com/en/articles/8313428-does-chatgpt-tell-the-truth
- **In-product feedback:** tap **thumbs down (👎)** under the message, then **Select an issue**. The documented option on the reporting page is "Safety or Legal concern"; a general "inaccurate" option is not described there (**UNCONFIRMED** label). Source: https://help.openai.com/en/articles/10245791-reporting-content-in-chatgpt-and-openai-platforms
- **Content reporting webform** for content that may break OpenAI's terms or the law. "Reported domains and other content may be reviewed by OpenAI's Model Quality team, which may apply filters or other mitigations to help prevent ChatGPT from relying on unreliable sources". Source: same page.
- A personal-data removal route ("Right to be forgotten and personal data removal from ChatGPT") exists for individuals; it's about personal data, not business facts. Not opened in detail: **UNCONFIRMED** scope. Found via help.openai.com search.
- **No official OpenAI "correct my business info" process was found.** The practical lever from OpenAI's own docs is making sure OAI-SearchBot can reach accurate, clear pages on your site, since search answers cite web sources.
