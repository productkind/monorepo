# Carousel design (shared, both brands)

One carousel design system for social media carousels (LinkedIn, Instagram,
TikTok), used by both brands. The design language is identical; the brand
(fonts, gradient, mascot, handle) is a parameter:

- **Little Parrot** (`LittleParrot.app`): course/campaign carousels
- **productkind** (`productkind.substack.com`): Thoughts by productkind
  article carousels

The end-to-end workflow (spec → approval → design → check → export) is the
`/carousel` skill in `.claude/skills/carousel/`.

Predecessors (kept as-is, superseded by this folder):
`little-parrot/marketing/carousel-design/` and
`thoughts/assets/carousel-design-productkind/`.

## Folder structure

```
carousel-design/
  base-template.html    the design system + 9 example slides (open in a browser)
  base-template-little-parrot.html
                        the same slides Little Parrot-branded (keep in sync)
  export/               example exports of both templates (productkind/, little-parrot/)
  brands/
    little-parrot.css   Little Parrot tokens (gradient, fonts, handle note)
    productkind.css     productkind tokens
  assets/
    little-parrot/      mascots (parrot-with-computer, little-parrot-wave, parrot.svg)
    productkind/        Kim mascot, Thoughts logo
  check.py              spec coverage + banned-word gate (run before export)
  export.sh             PNG slides + PDF export (needs Google Chrome)
  <post-slug>/          one folder per carousel post
    spec.md             the approved spec (or a pointer to the campaign md)
    carousel.html       the implemented design
    uploads/            post-specific images (screenshots, photos)
    export/             output: slide-01.png ... (1080x1350) + the PDF
```

## How branding works

`base-template.html` holds the whole design system; every brand-specific
value is a CSS variable (`--grad`, `--grad-wash`, `--font-display`,
`--font-copy`, `--font-plain`, `--font-mono`, `--weight-headline`,
`--weight-copy`, `--ink`, `--ink-secondary`). A carousel picks its brand
with one stylesheet link:

```html
<link rel="stylesheet" href="../brands/little-parrot.css">
```

Two things the CSS can't switch, set in the HTML (each brand file documents
its values in a header comment):

- the **handle** text in the header row and CTA badge
- **mascot/logo** image paths, and accent colour stops for partial
  gradients (window dots, dial cards, chart lines)

From a post folder, paths are `../brands/...` and `../assets/...`;
post-specific images go in the post's own `uploads/`.

## Workflow for a new carousel (spec-first, both brands)

The spec md is the single source of truth for every word on every slide.
Claude does 1, 3, 4; Kinga does 2 and 5. The `/carousel` skill walks
through all of it.

1. **Draft the spec at full fidelity.** A slide table carrying ALL on-slide
   text verbatim: display copy, prompt/mockup content, labels, footnotes,
   card text; plus alt text and the caption. Run the banned-list pass.
   Little Parrot campaign posts live in
   `little-parrot/marketing/campaigns/<campaign>/post-N-*.md`; productkind
   article carousels use `<post-slug>/spec.md` here. (Format example:
   the write-better campaign's post specs.)
2. **Approve the messaging in the md.** Edits happen in the md, never
   directly in the design.
3. **Implement.** Create `<post-slug>/carousel.html` from
   `base-template.html`: link the right brand css, set the handle, keep
   only the slides you need, and use only text that exists in the md.
   Parody content (deliberately bad example messages) gets
   `data-parody="true"` and a "(parody; banned-list exempt)" note in the
   spec. Images from Claude Design projects must be downloaded via the
   browser; fetching binaries through the API corrupts them.
4. **Check, then export.** From this folder:
   `./check.py <post-folder> <spec-md>` verifies that every visible text
   unit in the HTML exists in the md (coverage) and scans for banned words
   (parody-exempt). It must pass before running
   `./export.sh <post-folder>`, which produces the PNGs and PDF in
   `<post-folder>/export/`.
5. **Visual QA only.** Because copy is locked to the approved md, reviewing
   the exported slides is about layout, spacing, and visuals. Copy tweaks
   go back to step 2 (edit the md, ask for a regenerate).

Design-quality bar for step 3: the checklist in
`little-parrot/marketing/content-strategy/instagram-carousel-research.md`
(cover ≤ ~12 words, one idea per slide, prompt snippets verbatim in the
prompt window).

## Conventions

- Slides are 1080 x 1350 (4:5 portrait). LinkedIn takes the PDF as a
  document post; Instagram and TikTok take the PNGs.
- The **prompt window** (chat-input mockup, monospace, cursor, send arrow)
  is the recurring device for anything the reader literally types.
  Markdown symbols (##, -, 1.) inside it are typed text, never decoration.
- `carousel.html?slide=N` isolates one slide (that's how export.sh takes
  the screenshots); `?crop=1` shows the 1080x1080 centre-square guides
  (keep anything essential inside them for TikTok/square crops).
- Fonts load from Google Fonts via the brand css, so previews and exports
  need a network connection.
