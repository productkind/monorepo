# LinkedIn post: How Little Parrot reached #1 on Google for "little parrot"

- **Channel:** LinkedIn (Kinga's personal profile)
- **Status:** Final, passed linkedin-critic
- **Date drafted:** 2026-07-06
- **Context:** littleparrot.app ranks #1 on Google for the query "little parrot". The post shares the eight-point SEO setup, with the exact files named so readers can point their AI agent at each fix. All file names verified against the `little-parrot-awakens` repo.

---

If you google "little parrot" right now, our site is the first result. Above the actual parrots.

I'm not an SEO expert. We set some of these things up when we launched LittleParrot.app, and some over time. None of them needed an agency. Here are all eight, with the exact files, so you can point your AI agent at them:

1. Pick a name you can own, and one address. Google needs to connect your name to one specific brand, not a whole category. Choose a distinctive name, buy the matching domain, and make every link point at that one address (no mixing www and non-www versions).

2. Write a descriptive page title and description. These are the two lines Google shows in search results, you can find them in the <head> of your html. Tools like Lovable fill them with placeholder text, so ask your agent to replace them with your brand name and what you offer.

3. Introduce your brand in Google's own format. A small block of structured data (search for "Organization schema") goes into the same <head> section, listing your name, logo, and social profiles. It helps Google treat your brand as one thing rather than scattered pages.

4. Give every page its own title and description. Duplicates confuse Google about which page to show. We have one small file, SEO.tsx, that every page uses with its own text. The same idea applies on the page itself: each page should have exactly one main heading (an h1 in the code) saying what the page is about, with smaller headings nested under it. Ask your agent to set up both and check every page.

5. Make sure Google can read your content. Many AI-built apps, including Lovable's, show an empty loading screen before the content appears, and Google may only ever see that. Lovable has improved this for newer projects, but older ones, like ours, still work this way. Our fix is a script that runs at build time and saves every page as finished HTML, so the full text is there from the first moment. Ask your agent to prerender your pages the same way.

6. Hand Google a map. A sitemap is a file listing every page on your site, called sitemap.xml. Ask your agent to generate one, then submit it in Google Search Console (free, and worth setting up on day one). Add a robots.txt file too; it tells search engines, including the AI ones, that they're welcome to read your site.

7. Link back from your profiles. Your Instagram, LinkedIn, and newsletter should each link to your site. Google uses those links to confirm all of it belongs to one brand.

8. Keep pages fast on phones. Google measures loading speed, so defer heavy things like videos until after the text has appeared.

If you've built an app with Lovable or a similar tool, start with number 2 today: search for your product name and look at the two lines Google shows. If they read like a template wrote them, index.html is where to fix it.

---

## Explanations
### What does the "no mixing www and non-www versions" mean?

It's about the fact that www.littleparrot.app and littleparrot.app are technically two different addresses, even though they usually show the same site. The same is true of http:// vs https:// versions.

If some of your links, your sitemap, or external profiles point at www.littleparrot.app while others point at littleparrot.app, Google can treat them as two separate sites hosting duplicate copies of the same pages. Your ranking signals (links, mentions, clicks) then get split between the two versions instead of accumulating on one, which weakens both. Google will eventually pick one version as canonical on its own, but it may pick the wrong one, and the split signals cost you in the meantime.

The fix is to choose one version (Little Parrot uses the non-www https://littleparrot.app) and then:

- use that exact address in every internal link, the sitemap, canonical tags, and og:url
- have the other version redirect to it (most hosts, including Lovable's publishing, handle the www redirect for you)
- use it consistently in external places too: Instagram bio, LinkedIn page, newsletter links

So in the post, "no mixing" means: every link anyone follows to your site, from anywhere, should end up on the same single address, so Google sees one site rather than two half-sites.

If you think readers will stumble on that parenthetical the same way, we could reword it in the post to something more self-explanatory, like "(http://www.yoursite.com and yoursite.com count as two different addresses to Google, so pick one and redirect the other)".