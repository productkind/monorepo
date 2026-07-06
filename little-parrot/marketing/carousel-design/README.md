# Carousel design

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

1. Design it in the Claude Design project ("Instagram carousel template"),
   starting from an existing carousel file there.
2. Copy an existing folder here (e.g. `build-first-app-post-1/`) as the
   base, replace the slide sections in `carousel.html` with the new
   design's, and drop any image uploads into `uploads/`.
   Caution: image files from the Claude Design project need to be
   downloaded via the browser; fetching binaries through the API corrupts
   them.
3. Run `./export.sh` inside the folder. PNGs and the PDF appear in
   `export/`.
4. Check every slide against the design-pass checklist in
   `../content-strategy/instagram-carousel-research.md` (cover ≤ ~12 words,
   prompt snippets verbatim in the prompt window, banned-list pass).

## Conventions

- Slides are 1080 x 1350 (4:5 portrait); the comic post is the one square
  exception.
- The **prompt window** (chat-input mockup, monospace, cursor, send arrow)
  is the recurring device for anything the learner literally types.
  Markdown symbols (##, -, 1.) inside it are typed text, never decoration.
- `carousel.html?slide=N` isolates one slide (that's how export.sh takes
  the screenshots).
