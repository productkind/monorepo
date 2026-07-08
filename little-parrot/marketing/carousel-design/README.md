# Carousel design

> **Superseded:** new carousels use the shared, brand-parameterised system
> in `productkind/carousel-design/` (the `/carousel` skill runs the whole
> workflow). This folder keeps the existing posts as-is.

Implemented Instagram carousel designs, one folder per post, exported as
PNG slides and a PDF. The content specs live with their campaigns in
`../campaigns/2026-july-instagram-*/post-*.md`; this folder holds the
designed, exportable versions.

## Folder structure

```
carousel-design/
  <campaign-short-name>-post-<n>/
    carousel.html   the standalone design (all slides; open in a browser to preview)
    export.sh       regenerates everything (needs Google Chrome)
    uploads/        images the design uses (mascots, screenshots)
    export/         output: slide-01.png ... (1080x1350) + the PDF
```

## Workflow for a new carousel

The campaign spec md is the single source of truth for every word on every
slide. The steps (Claude does 1, 3, 4; Kinga does 2 and 5):

1. **Expand the spec to full fidelity.** Before designing, upgrade the
   post's slide table in `../campaigns/.../post-N-*.md` so it carries ALL
   on-slide text verbatim: display copy, prompt/mockup content, labels,
   footnotes, card text. Run the banned-list pass on it. (See
   `write-better-post-1`'s spec for the format.)
2. **Approve the messaging in the md.** Edits happen in the md, never
   directly in the design.
3. **Implement.** Copy an existing folder here as the base and build
   `carousel.html` from the spec, using only text that exists in the md.
   Parody content (deliberately bad example messages) gets
   `data-parody="true"` and a "(parody; banned-list exempt)" note in the
   spec. Images from the Claude Design project must be downloaded via the
   browser; fetching binaries through the API corrupts them.
4. **Check, then export.** From this folder:
   `./check.py <folder> <spec-md>` verifies that every visible text unit in
   the HTML exists in the md (coverage) and scans for banned words
   (parody-exempt). It must pass before running `./export.sh`, which
   produces the PNGs and PDF in `export/`.
5. **Visual QA only.** Because copy is locked to the approved md, reviewing
   the exported slides is about layout, spacing, and visuals. Copy tweaks
   go back to step 2 (edit the md, ask for a regenerate).

Design-quality bar for step 3: the checklist in
`../content-strategy/instagram-carousel-research.md` (cover ≤ ~12 words,
one idea per slide, prompt snippets verbatim in the prompt window).

## Conventions

- Slides are 1080 x 1350 (4:5 portrait); the comic post is the one square
  exception.
- The **prompt window** (chat-input mockup, monospace, cursor, send arrow)
  is the recurring device for anything the learner literally types.
  Markdown symbols (##, -, 1.) inside it are typed text, never decoration.
- `carousel.html?slide=N` isolates one slide (that's how export.sh takes
  the screenshots).
