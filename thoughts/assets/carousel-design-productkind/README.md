# productkind article carousel design

> **Superseded:** new carousels use the shared, brand-parameterised system
> in `productkind/carousel-design/` (the `/carousel` skill runs the whole
> workflow). This folder keeps the original template and exports as-is.

The carousel design for **Thoughts by productkind** (not Little Parrot).
When an article goes out on Substack, a carousel in this design shares it
on LinkedIn, Instagram and TikTok.

Imported from the Claude Design project
"[Carousel - productkind](https://claude.ai/design/p/0a1e23b8-8896-4d46-9206-1b1ceec80da0?file=Carousel+-+productkind.dc.html)".
The original design file (with Claude Design's `{{ handle }}` templating and
image slots) is kept verbatim in `claude-design-source/`; `carousel-template.html`
is the standalone browser version used for exporting.

## Folder structure

```
carousel-design-productkind/
  carousel-template.html   standalone design, all 8 example slides (open in a browser)
  export.sh                exports PNG slides + PDF (needs Google Chrome)
  assets/                  images the design uses (mascot, Thoughts logo)
  claude-design-source/    the original .dc.html from Claude Design, for reference
  export/                  output: slide-01.png ... (1080x1350) + the PDF
```

## Design system

- **Slides** are 1080 x 1350 (4:5 portrait). Content lives on a white card
  (880 x 1150, offset 100px from top-left) with a 12px near-black
  (`rgb(8,8,9)`) border and a hard offset shadow
  (`12px 12px 0 rgba(8,8,9,0.25)`).
- **Rainbow gradient** is the brand signature, always
  `linear-gradient(120deg, #ffb288, #ffafa2, #ffacb8, #ffa8d1, #ff9ff7, #deb2ff, #c5bdff, #b1c5ff, #9accff, #77d4ff, #00dffa, #00e4db, #00e8b6)`:
  full-strength on the 24px bar at the top of the card, on text highlights
  (`.hl`) and stat blocks; at 20-alpha (`#xxxxxx20` per stop) as the slide
  background wash behind the card.
- **Typography**: Montserrat for everything voiced (800 cover headline at
  52px, 600 body copy at 32-36px/1.45, 700 header row and labels with
  letter-spacing); Inter for plain supporting text; Space Mono only for
  chart labels. Primary text `#080809`, secondary `#4a4a50`.
- **Header row** on every slide: handle `productkind.substack.com` (32px)
  left, page count `NN / NN` (24px) right.
- **Framed boxes** (`.frame`): 4px near-black border + the same offset
  shadow, for photos, charts, mockups and quote cards. Variants: `.muted`
  (grey `#e8e8ea` background, secondary text) and `.inverse` (black card,
  white 38px text, gradient-clipped emphasis).
- **Cover**: headline with one gradient-highlighted phrase, a kicker line
  in caps, `SWIPE →`, and the Kim mascot bottom-right.
- **CTA slide**: Thoughts logo in a frame, `PRODUCTKIND.SUBSTACK.COM` box,
  "Full article on our Substack 💛", and a share-ask line in secondary grey.

## Workflow for a new article carousel

1. Copy `carousel-template.html` into a per-article file or folder (keep
   this template as the clean reference). The 8 slides in it are the
   "employee to running a business" article and double as layout examples:
   cover, paired quote cards, full-width photo, laptop mockup, photo +
   black statement card, chart, big stat, CTA.
2. Rewrite the slide copy from the article. Keep the header row, page
   counts, and one `.hl` highlight per key phrase.
3. Swap the example photos (`<img class="photo">`) for the new article's
   images (photos live in `assets/`); the `.imgslot` class is available as
   a placeholder while an image is still missing.
4. Preview in a browser; `?slide=N` isolates one slide, `?crop=1` shows
   the 1080x1080 centre-square guides (keep anything essential inside them
   for TikTok/square crops).
5. Export: `./export.sh [file.html] [output-name]` produces the PNGs and
   PDF in `export/` (LinkedIn takes the PDF as a document post; Instagram
   and TikTok take the PNGs).

## Notes

- `assets/` holds the original images from the Claude Design project.
  Binary files cannot be fetched intact from the Claude Design API, so any
  new images from the project must be downloaded in the browser and dropped
  into `assets/`.
- Fonts load from Google Fonts (Montserrat, Inter, Space Mono), so exports
  need a network connection.
