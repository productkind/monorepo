# Carousel design (shared, both brands)

One carousel design system for social media carousels (LinkedIn, Instagram,
TikTok), used by both brands. The design language is identical; the brand
(fonts, gradient, mascot, handle) is a parameter:

- **Little Parrot** (`LittleParrot.app`): course/campaign carousels
- **productkind** (`productkind.substack.com`): Thoughts by productkind
  article carousels

The end-to-end workflow (spec → approval → design → check → export) is the
`/carousel` skill in `.claude/skills/carousel/`.

The two predecessor folders (`little-parrot/marketing/carousel-design/`,
`thoughts/assets/carousel-design-productkind/`) were migrated into this one
in July 2026: their post folders moved here unchanged, and
`claude-design-source/` keeps the original Claude Design file the design
system was imported from.

## Folder structure

```
carousel-design/
  templates/
    productkind.html    the design system + 9 example slides, productkind-branded
    little-parrot.html  the same slides Little Parrot-branded (keep the two in sync)
  brands/
    little-parrot.css   Little Parrot tokens (gradient, fonts, handle note)
    productkind.css     productkind tokens
  assets/
    little-parrot/      mascots (parrot-with-computer, little-parrot-wave)
    productkind/        Kim mascot, Thoughts logo
  claude-design-source/ the original .dc.html from Claude Design, for reference
  check.py              spec coverage + banned-word gate (run before export)
  export.sh             PNG slides + PDF export (needs Google Chrome)
  posts/
    <post-slug>/        one folder per carousel post
      spec.md           the approved spec (or a pointer to the campaign md)
      carousel.html     the implemented design
      uploads/          post-specific images (screenshots, photos)
      export/           output: slide-01.png ... (1080x1350) + the PDF
```

## How branding works

The templates in `templates/` hold the whole design system; every
brand-specific value is a CSS variable (`--grad`, `--grad-wash`,
`--font-display`, `--font-copy`, `--font-plain`, `--font-mono`,
`--weight-headline`, `--weight-copy`, `--ink`, `--ink-secondary`). The two
templates are the same slides; a carousel picks its brand with one
stylesheet link:

```html
<link rel="stylesheet" href="../../brands/little-parrot.css">
```

Two things the CSS can't switch, set in the HTML (each brand file documents
its values in a header comment):

- the **handle** text in the header row and CTA badge
- **mascot/logo** image paths, and accent colour stops for partial
  gradients (window dots, dial cards, chart lines)

From a post folder, paths are `../../brands/...` and `../../assets/...`
(one level deeper than the templates' `../brands/...`); post-specific
images go in the post's own `uploads/`. To see what the design system
looks like in a brand, open `templates/<brand>.html` in a browser.

## Workflow for a new carousel (spec-first, both brands)

The spec md is the single source of truth for every word on every slide.
Claude does 1, 3, 4; Kinga does 2 and 5. The `/carousel` skill walks
through all of it.

1. **Draft the spec at full fidelity.** A slide table carrying ALL on-slide
   text verbatim: display copy, prompt/mockup content, labels, footnotes,
   card text; plus alt text and the caption. Run the banned-list pass.
   Course post specs live in
   `productkind/marketing/content/courses/<course>/post-N-*.md`; other
   pieces use `spec.md` inside their piece folder under
   `productkind/marketing/content/`. (Format example: the write-better
   course's post specs.)
2. **Approve the messaging in the md.** Edits happen in the md, never
   directly in the design.
3. **Implement.** Create the piece folder next to its spec (under
   `productkind/marketing/content/`), copy `templates/<brand>.html` in as
   `carousel.html` and make it self-contained (inline the brand css, copy
   needed assets into the piece's `uploads/`), keep only the slides you
   need, and use only text that exists in the md.
   Parody content (deliberately bad example messages) gets
   `data-parody="true"` and a "(parody; banned-list exempt)" note in the
   spec. Images from Claude Design projects must be downloaded via the
   browser; fetching binaries through the API corrupts them.
4. **Check, then export.** From this folder:
   `./check.py posts/<post-slug> <spec-md>` verifies that every visible
   text unit in the HTML exists in the md (coverage) and scans for banned
   words (parody-exempt). It must pass before running
   `./export.sh posts/<post-slug>`, which produces the PNGs and PDF in
   `posts/<post-slug>/export/`.
5. **Visual QA only.** Because copy is locked to the approved md, reviewing
   the exported slides is about layout, spacing, and visuals. Copy tweaks
   go back to step 2 (edit the md, ask for a regenerate).

Design-quality bar for step 3: the checklist in
`productkind/marketing/channels/instagram/carousel-research.md`
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
