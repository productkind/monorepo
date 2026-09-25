---
challenge: '4 - Get Found: SEO and Discoverability'
---

## SEO and Discoverability Quick-Start Checklist

A step-by-step checklist for making your product discoverable through search engines and AI tools. Work through it after publishing your app. You don't need to do everything in one sitting. Tick items off over the first few weeks.

### Start here: let Lovable scan your app

- [ ] **Run the SEO & AI search review.** Open the **More** tab in your project toolbar, select **SEO & AI search**, and click **Scan project**. It checks your `robots.txt`, sitemap, titles and descriptions, social preview tags, heading structure, alt text, indexing and Google Search Console setup, all in one pass. **Running the review is free on every plan.** Each finding has a **Try to fix** button, and those cost credits because Lovable changes your code. Work through the failing findings first, starting with the red ones.
- [ ] **Check which stack your app is on.** Apps built before May 2026 render pages in the browser, so some crawlers see very little of your content. If yours is one of them, type `/` in the message box and choose **Migrate to TanStack Start**, or find it in **Project settings → General → Project actions**. Costs roughly 10-35 credits. Everything else in this checklist works better afterwards.

### On-page SEO

These are changes to your app itself that help search engines understand your content. The review above will flag most of them, but these are the prompts if you'd rather fix them by hand.

- [ ] **Fix your heading tag hierarchy.** Each page should have exactly one h1 tag as the main title, with h2 and h3 tags for sections and sub-sections. Prompt Lovable:

```
Review all pages in the app and fix the heading tag hierarchy. Each page should have exactly one h1 tag as the main title. Make sure the heading hierarchy follows HTML structure best practices. List what you changed.
```

- [ ] **Add alt text to all images.** Alt text helps search engines understand your images and makes your app accessible to screen readers. Prompt Lovable:

```
Add descriptive alt text to all images in the app for accessibility and SEO.
```

- [ ] **Set clear, descriptive page titles.** Each page should have a title that describes what it does. Your meta tags cover the homepage, but individual pages need attention too. To check a page, hover its preview icon in the **page selector** above the preview: the **Social** and **Search** cards show exactly what gets read.

### Google Search Console

These steps help Google find and index your pages faster.

- [ ] **Verify your domain.** Go to [Google Search Console](https://search.google.com/search-console), add your domain, and follow the verification steps. Note: this requires a custom domain that you own (e.g., `bookcluborganiser.com`). If you're still using a Lovable URL (e.g., `bookclub.lovable.app`), you can't verify it because you don't own the `lovable.app` domain. Set up a custom domain first, then come back to this step.
- [ ] **Submit your sitemap.** Lovable doesn't always create a sitemap up front, so don't assume you have one. The SEO & AI search review checks for it and can generate or repair it in one click. Publish your latest changes first, because Google fetches the sitemap from your live site. Then in [Google Search Console](https://search.google.com/search-console), click **Sitemaps** in the left menu and submit `https://yourdomain.com/sitemap.xml`. The review can also walk you through this part if you'd rather not do it by hand.

- [ ] **Check for indexing issues.** After a few days, come back to Google Search Console and check the **Pages** report in the left menu. It shows which pages Google has indexed and any problems it found.

### GEO (Generative Engine Optimisation)

GEO focuses on getting conversational AI tools like ChatGPT, Claude, and Gemini to cite and recommend your product when users ask them questions.

- [ ] **Have a clear, descriptive homepage.** Your homepage should explain what your product does and who it's for. Conversational AI tools pull from this when answering questions.
- [ ] **Create helpful content.** A blog post, FAQ page, or guide that answers questions your target users might ask. For example, if you built a book club organiser, a post like "How to run a book club" could help AI tools connect your product to relevant questions.
- [ ] **Use specific, descriptive language.** Instead of "our platform helps with organisation," write "Book Club Organiser helps book club members suggest books, vote on their favourites, and track what they're reading." AI tools need concrete details to recommend you.
- [ ] **Get mentioned on other websites.** Conversational AI tools build their knowledge from content across the web. The more reputable sites that mention your product, the more likely AI tools are to reference it. Backlinks (covered below) help with this.

### AEO (Answer Engine Optimisation)

AEO focuses on getting your content cited by AI-powered search features like Google's AI Overviews, Bing Copilot, and Perplexity's instant answers. These are the AI-generated answer boxes that appear at the top of search results, pulling information from web pages to answer a query directly.

- [ ] **Add an FAQ section to your site.** Write out the questions your target users are likely to search for, with clear, concise answers. For a book club organiser, that could be questions like "How do I organise a book club?" or "How do book club voting apps work?"
- [ ] **Structure answers for AI extraction.** When answering a question, put a short, direct answer (1-2 sentences) right after the heading, then expand with more detail below. AI-powered search features tend to pull from content that leads with a clear answer.
- [ ] **Add FAQ schema markup.** Schema markup is structured data that helps search engines and AI systems understand your content. Prompt Lovable:

```
Add FAQ schema markup (JSON-LD) to the FAQ section of the site. Each question and answer should be included in the structured data.
```

- [ ] **Target "how to" and "what is" queries.** These are the types of searches that trigger AI-generated answers. Create content that directly answers questions related to the problem your product solves.
- [ ] **Keep answers concise and factual.** AI-powered search features favour clear, straightforward language. Avoid long introductions before getting to the answer. Lead with the answer, then explain.

**How SEO, AEO, and GEO work together:**

- **SEO** gets your pages ranked in traditional search results
- **GEO** gets conversational AI tools (ChatGPT, Claude, Gemini) to recommend your product
- **AEO** gets your content cited by AI-powered search features (Google AI Overviews, Bing Copilot, Perplexity)

All three benefit from the same foundation: clear, helpful content that answers real questions your target users are asking.

### Backlink building

Backlinks are links from other websites to yours. Search engines treat them as votes of confidence.

- [ ] **List your product on directories.** Start with one or two that fit your audience:
  - [Product Hunt](https://www.producthunt.com/) (general tech products)
  - [Indie Hackers](https://www.indiehackers.com/) (indie makers and solo founders)
  - [BetaList](https://betalist.com/) (early-stage products)
  - Niche directories relevant to your industry
- [ ] **Identify communities where your users spend time.** Reddit, Facebook groups, Slack groups, or forums. Share your product where it adds value (not just self-promotion).
- [ ] **Consider writing a guest post** for a blog your target users read. Link back to your product naturally within the content.

### Google Business Profile (optional)

Mostly relevant if your product has a local component (serves a local community or has a physical location). It can also help with SEO for digital products.

- [ ] **Register at [business.google.com](https://business.google.com/).** This makes your business appear in Google Maps and local search results, and gives you a place to collect reviews.

### Set expectations

SEO results take time. After publishing and setting everything up:

- **Best case:** a few days to start appearing in Google results
- **Typical case:** a few weeks
- **Competitive space:** a few months

Don't let the wait discourage you. Every improvement compounds over time. The earlier you start, the sooner results arrive.
