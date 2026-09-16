---
piece: diagram-structured-data
format: single diagram image (1080x1350), Little Parrot brand
goes with: linkedin-kinga-tamas-productkind-seo-schema-markup.md
status: drafted
---

# Diagram: what structured data tells a search engine

Two panels, same two actors, same arrow. What changes is what the crawler is given and what it can do with it: in panel one it has to work out what the page is, in panel two the page says so. The JSON-LD block is the artefact most people building with AI have never seen, so it gets the space.

## Slide 1 (the only slide)

Visual: two framed panels. Each has a document icon labelled your page on the left, a magnifying glass labelled search engine on the right, and one arrow between them. Below the arrow row, panel one shows what the crawler has to work out and panel two shows the JSON-LD that removes the guessing. Branding sits in the bottom left corner, with the Little Parrot mascot's head peeking over the bottom edge of the card beside it.

- Title: What structured data tells a search engine
- Footer handle: LittleParrot.app

### Panel 1

- Kicker, on a gradient highlight: WITHOUT STRUCTURED DATA
- Left actor: your page
- Right actor: search engine
- Arrow, left to right. Tag: what it crawls. Payload: words and images
- Outcome label: IT HAS TO WORK OUT WHAT THE PAGE IS
- Outcome line: A person? A company? A product? A course? An article?

### Panel 2

- Kicker, on a gradient highlight: WITH STRUCTURED DATA
- Left actor: your page
- Right actor: search engine
- Arrow, left to right. Tag: what it crawls. Payload: words, images and JSON-LD
- Outcome label: YOU ADD THIS TO THE PAGE
- Outcome code block:

```
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Building apps with AI",
  "description": "Get your app ready for customers.",
  "provider": { "@type": "Organization", "name": "Little Parrot" }
}
```

## Takeaway

Structured data states what a page is, so a search engine reads it instead of working it out from the words on the page.

## Alt text

A diagram in two panels showing how a search engine reads a web page. Both panels have a document icon labelled your page on the left and a magnifying glass labelled search engine on the right, with one arrow between them. The first panel, headed without structured data, shows the crawler receiving words and images, and underneath it the questions it has to work out for itself: a person, a company, a product, a course or an article. The second panel, headed with structured data, shows the crawler receiving words, images and JSON-LD, and underneath it the JSON-LD you add to the page. The code declares a Schema.org Course named Building apps with AI, with a description and a provider organisation called Little Parrot.
