---
status: drafted
channels: [events]
account: little-parrot
---

# Workshop event images: Portugal Tech Week and Luma

Two images for the free workshop's event listings, from one design in `carousel.html`:

- **Slide 1, Portugal Tech Week:** the featured image for the [listing](../portugal-tech-week-submission.md), 1920 × 1080, exported to `export/featured-image-1920x1080.png`. Portugal Tech Week shows it as a 750 × 465 card with the event title as text underneath, so the image doesn't repeat the title. Everything sits inside a central safe area, because the card crops about 90 px from each side and the form's 2:1 minimum suggests a crop of 60 px from the top and bottom elsewhere.
- **Slide 2, Luma:** the event cover, 1080 × 1080, exported to `export/luma-cover-1080x1080.png`. Luma asks for a square image of at least 800 × 800 and rounds the corners, so everything stays well inside the edges ([Luma help](https://help.luma.com/p/event-cover-images), checked 12 October 2026).

- **Slides 3 and 4, sponsored versions:** the same two images with the sponsors' logos added, exported to `export/featured-image-sponsors-1920x1080.png` (slide 3) and `export/luma-cover-sponsors-1080x1080.png` (slide 4). The headline, kicker and diagram are slightly smaller to make room for a row along the bottom of the card, under a thin grey line, aligned to the right edge of the card so it lines up with the Free badge: the label "Supported by", then the Portuguese Startup Association logo and the Critical Software logo, from `../sponsors/`.

Export each with headless Chrome, opening `carousel.html?slide=1` at a 1920 × 1080 window and `carousel.html?slide=2` at 1080 × 1080 (slides 3 and 4 the same way).

## Both slides

Visual: the Little Parrot gradient as the background, with the design system's white card (thick black border, hard shadow, gradient bar) on top. Below the headline, a three-part diagram of how a web app works: a browser window with a Save button and a spinner, a dark server panel with log lines drawn as bars, and a database drawn as a cylinder. Two arrows between each pair, one going right and one coming back, to show the request and the response.

- Header, left: LittleParrot.app
- Header, right badge: Free
- Headline: How web apps work
- Kicker: A hands-on workshop for product managers
- Diagram labels: Browser, Server, Database
- Button in the browser window: Save
- Sponsor row label (slides 3 and 4 only): Supported by

The square slide uses the same words, with the headline on two lines (How web / apps work) and the kicker on two lines (A hands-on workshop / for product managers).

## Alt text

A diagram of how a web app works: a browser window with a Save button, a server and a database, with arrows going between them in both directions. Text: How web apps work. A hands-on workshop for product managers. Free. LittleParrot.app.

For the sponsored versions, add to the end: Supported by the Portuguese Startup Association and Critical Software.
