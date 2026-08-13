---
name: media-to-webp
description: Convert screen recordings and photos (mov, mp4, gif, png, jpg, heic) into resized, web-optimised webp images, and optionally cover sensitive information (phone numbers, names, faces, emails) with a frosted-glass panel. Use when preparing course/toolkit screenshots and clips, or shrinking existing webp that load too slowly.
---

## Media to webp

Turn raw captures into small, sharp webp that load fast on the platform, and hide any private details in them. Screen recordings become animated webp; photos become static webp. Everything runs through three bundled scripts in `scripts/`.

Reach for this when:
- You have new step recordings/screenshots to add to a course or toolkit.
- Existing images load slowly (they're too big) and need shrinking without visible quality loss.
- A recording caught something private (a contact's name/number, a face in the share sheet, your email) that must be covered before publishing.

### Where finished assets live

The platform serves course/comic assets from the **separate** `little-parrot-awakens` repo, not the monorepo:
`little-parrot-awakens/public/courses/<course-id>/*.webp` and `.../public/comics/<course-id>/*`.
The monorepo only holds the course YAML (which references those paths). Convert/frost, then copy the result into that public folder (and keep the raw source somewhere outside the repo). Filenames referenced by the YAML must stay the same.

### The three scripts

Run them from this skill's base directory (paths below are relative to it).

**1. `scripts/to-webp.sh` — convert + resize.** Detects the source type by extension and does the right thing.
```
scripts/to-webp.sh <input> [-o out.webp] [-w width] [-f fps] [-q quality] [-s speed]
```
- `mov mp4 m4v webm avi gif` → animated webp (ffmpeg + libwebp)
- animated `webp` → re-encoded smaller animated webp (used to shrink what's already shipped)
- `png jpg jpeg tif tiff bmp` → static webp
- `heic heif` → static webp (falls back to `heif-convert` if ImageMagick lacks the delegate)
- `-w` width in px, aspect kept, never upscales (default 480). `-f` fps for animated (default 10). `-q` quality (default 60 animated / 80 static). `-o` output (default `<name>.webp` in the cwd). `-s` playback speed-up factor for animated output (e.g. `-s 2` halves a clip's runtime; default 1, no speed-up), for long real-time recordings. Keep it gentle: the learner still has to follow what happens on screen.

**2. `scripts/inspect.sh` — find sensitive content and read coordinates.** Use before frosting.
```
scripts/inspect.sh <file.webp>                 # frames/dims/delay + a 6-frame overview strip
scripts/inspect.sh <file.webp> --strip a,b,c   # montage specific 0-indexed frames to pin a range
scripts/inspect.sh <file.webp> --frame N       # frame N with a 100px red grid, to read x,y,w,h
```
PNGs land in `./_inspect/`. Read them, decide which frame range shows the private thing and the rectangle covering it.

**3. `scripts/frost.sh` — cover regions with a frosted-glass panel.** Blur + white tint over a rectangle, on a chosen frame range.
```
scripts/frost.sh <src.webp> <out.webp> "fstart:fend:x:y:w:h" [more jobs...]
```
- Coordinates are pixels at the source resolution; `fstart..fend` are inclusive, 0-indexed.
- Static webp: one job with `0:0:x:y:w:h`.
- Resolution and per-frame timing are preserved. Softness/opacity are the `BLUR` and `TINT` variables at the top of the script.

### Default recipe (and why)

For iPhone screen recordings shown in a course, **480px wide / 10fps / quality 60** roughly halves the file versus a 600px/12.5fps/q68 original with no readability loss. It works because the page displays these portrait clips at only ~300–400px wide (height-capped by CSS), so 480 native is still ≥ 1× everywhere, never upscaled. UI text stays crisp; only smoothness drops slightly, which is fine for showing taps.

Tune from there:
| Goal | Change |
|------|--------|
| Smaller still | `-w 440`, `-f 8`, `-q 55` (check dense-text frames stay legible with `inspect.sh`) |
| Sharper / more faithful | `-w 600`, `-f 12`, `-q 72` |
| A quick action that must read clearly | keep width up (`-w 540`), drop fps (`-f 8`) |
| Static screenshot with fine text | `-q 82` and width matched to display |

Always spot-check the **most text-dense** frame after shrinking (`inspect.sh --frame N`); that's the readability floor.

### Frosting workflow

1. `inspect.sh clip.webp` → note frame count and get the overview strip. Find which frames show the private detail.
2. `inspect.sh clip.webp --strip 8,12,18,22` → pin the exact frame range where it appears (and where it disappears, so you don't frost neighbouring content).
3. `inspect.sh clip.webp --frame 12` → read the rectangle (x,y,w,h) off the 100px grid.
4. `frost.sh clip.webp clip-frosted.webp "8:20:0:700:600:200"` → one job per region; add more jobs for other frames/rects.
5. Re-inspect the output frames to confirm the detail is gone and nothing else got smudged.

Order with resizing: frost at the resolution you'll ship. If you're also shrinking, either shrink first then frost using coords from the smaller frames, or frost at native then shrink, just take the coordinates from frames at the same resolution you pass to `frost.sh`.

What to cover: phone numbers, full names, email addresses, and faces (the iOS share sheet and message "To:" field expose contacts). A first name / nickname alone is lower risk, judge per case, but flag it.

### Gotchas (learned the hard way)

- **ffmpeg cannot reliably decode animated webp** (reads it as a single/empty frame). To edit or shrink an existing animated webp you must expand it to PNG frames with `magick <in>.webp -coalesce`, then re-encode. Both scripts do this for you.
- **Don't reassemble with `img2webp`** for size, it stores full keyframes and can 10× the file. Re-encode with **ffmpeg `-c:v libwebp`**, which inter-frame compresses and matches the originals' size.
- **ImageMagick's `montage`/reassembly is slow** for hundreds of frames (can hit multi-minute timeouts). ffmpeg encoding is fast; do the encode with ffmpeg. For big batches, run in the background.
- **`stat -f%z` fails here** (GNU coreutils `stat` is on PATH, not BSD). Use `wc -c < file`.
- **zsh globs `file.webp[12]`** as a character class and errors with "no matches found". Quote frame selectors: `'file.webp[12]'`. (Bash leaves them alone; the scripts use bash.)
- **`magick montage -title` may print ghostscript errors** ("gs: command not found"). Harmless, the montage still writes; just omit titles.
- **Delay is assumed uniform.** These recordings use one per-frame delay (e.g. 8cs = 12.5fps). `frost.sh` reads it and preserves timing. If a clip has mixed per-frame delays, timing will be normalised, check `inspect.sh` output.
- **heic** needs libheif; if ImageMagick can't read it, the script falls back to `heif-convert`.

### End-to-end example

```
# New recording -> optimised course clip
scripts/to-webp.sh ~/Downloads/dictate-step.mov -o build-dictate-text.webp -w 480 -f 10

# It caught a contact in the share sheet — find and cover it
scripts/inspect.sh build-dictate-text.webp                 # -> 130 frames
scripts/inspect.sh build-dictate-text.webp --strip 8,16,24 # contacts visible 10-20
scripts/inspect.sh build-dictate-text.webp --frame 14      # read rect off the grid
scripts/frost.sh build-dictate-text.webp build-dictate-text.webp "10:20:0:560:480:150"

# Copy into the served folder (the little-parrot-awakens repo sits NEXT TO
# the monorepo, so from this skill's base dir it is four levels up)
cp build-dictate-text.webp ../../../../little-parrot-awakens/public/courses/<course-id>/
```

### Prerequisites

`ffmpeg`, `imagemagick` (`magick`), and `libheif` (`heif-convert`), all via Homebrew. `img2webp`/`cwebp`/`dwebp`/`webpmux` come with the `webp` formula but aren't required by these scripts.
