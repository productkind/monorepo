---
challenge: "6 - Launch Early, Grow Steadily"
---
## Production-Ready Launch Checklist

Use this checklist to turn your published app into a professional, discoverable product. It covers everything beyond the basics of publishing. You don't need to complete every item before launching, but the more you tick off, the more professional and discoverable your product will be.

### Before publishing

- [ ] **Complete the Pre-Publish Checklist first.** If you haven't already, work through the [Pre-Publish Checklist](https://littleparrot.app/nest/toolkit/321f3b1f-bc1b-412b-943a-e507a22bb46f) from the [Build Your First App with Lovable](https://littleparrot.app/5e86e580-264c-442c-8cc4-be5645f13e87/course-overview) course. It covers the essentials: favicon, meta tags, URL, security warnings, testing, API keys, and bookmarking a stable version.

### Professional touches

- [ ] **Connect a custom domain** (optional but recommended). Buy a domain from a registrar like [GoDaddy](https://www.godaddy.com/), then connect it in the Publish panel under URL > Add custom domain. DNS changes can take a few hours to take effect.
- [ ] **Set up Google site verification.** Go to [Google Search Console](https://search.google.com/search-console), add your domain, and follow the verification steps. This unlocks SEO tools you'll need later.
- [ ] **Add a privacy policy and terms of use.** Generate them using [Termly](https://termly.io/) or an AI assistant. If your app collects any user data (including email for login), you need a privacy policy.
- [ ] **Add footer links to legal pages.** Prompt Lovable to add a footer with links to your Privacy Policy, Terms of Use, and a contact email.
- [ ] **Add a cookie banner if needed.** Required if you have users in the EU/UK and use analytics or tracking tools. Prompt Lovable to add a GDPR-compliant cookie consent banner.

### Discoverability

- [ ] **Optimise pages for SEO.** Prompt Lovable:
```
Review all pages and fix the heading tag hierarchy. Each page should have exactly one h1 tag. Add descriptive alt text to all images.
```
- [ ] **Submit your sitemap to Google Search Console.** Go to Sitemaps in the left menu of [Google Search Console](https://search.google.com/search-console) and submit `https://yourdomain.com/sitemap.xml`. If you can't find your Sitemap, prompt Lovable: 
```
Does this app have a sitemap.xml? If not, generate one.
```
- [ ] **Register on Google Business Profile** (if your product has a local component). Set it up at [business.google.com](https://business.google.com/).
- [ ] **List on at least one product directory.** Consider Product Hunt, Indie Hackers, BetaList, or a niche directory relevant to your audience.

### Growth

- [ ] **Check Lovable's built-in analytics.** Click the **...** at the top of your project (next to Preview), then select the Analytics tab.
- [ ] **Set up Google Analytics** for deeper insights. Create a free account at [analytics.google.com](https://analytics.google.com/), get your Measurement ID (starts with `G-`), then prompt Lovable:
```
Add Google Analytics with Measurement ID G-XXXXXXXXXX to the app.
```
- [ ] **Plan your first feedback conversation.** Identify 3-5 people who fit your target user and prepare specific questions (see the [User Feedback Question Bank](https://littleparrot.app/nest/toolkit/ab78ba0e-37bb-4c6c-b21b-a7466df4b19d) in the Toolkit).
- [ ] **Choose one distribution channel to focus on.** Pick the one place where your target users are most active and start sharing there.

### A note on timing

You don't need everything perfect before you launch. The "Before publishing" section is the minimum. The rest can happen over the days and weeks after you go live. Launching early and improving based on feedback is always better than waiting for perfect.
