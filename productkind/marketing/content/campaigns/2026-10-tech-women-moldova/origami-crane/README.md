# Little Parrot origami flyer

A 10 cm square flyer, printed on both sides, that folds into a crane with the Little Parrot gradient: orange head, green tail, an open eye on one side, a wink on the other and `LittleParrot.app` along the tail. A QR code sits on one wing, with an arrow pointing to it on the flap underneath and a message on the panel that folds into the tail. The neck side mirrors it: "Fold your Little Parrot, and win!" and a mirrored arrow. The arrow shape comes from `../arrow.svg`.

- `crane-flyer.svg`: the colourful front at 100 × 100 mm, text outlined
- `crane-flyer-back.svg`: the back, every fold as a dashed mid-grey line, already mirrored for double-sided printing
- `crane-flyer-a4.pdf`: four flyers on A4 with cut marks, front on page 1 and back on page 2; print at 100%, double-sided, flipped on the long edge
- `crane-flyer-10cm.pdf`: one flyer at 100 × 100 mm, front on page 1 and back on page 2
- `crane-flyer-print-layers.pdf`: print-shop layers, page 1 the gradient alone at 104 × 104 mm (2 mm bleed on every side), page 2 the black artwork alone at 100 × 100 mm, page 3 the back at 100 × 100 mm
- `fold.html`: the standalone folding page, one looping animation per step
- `preview.png`: the flat flyer and both sides of the folded parrot

## How it is made

The crane is folded in a small simulator (`origami.mjs`, steps in `crane.mjs`) that tracks where every part of the sheet ends up. The colour of each part comes from its position in the folded parrot, so the gradient runs head to tail once folded and looks patchy on the flat sheet. The eyes and the text are placed on the folded parrot and mapped back onto the sheet.

The QR link and both messages are set in `flyer.config.mjs`. Change `qrUrl` there and rebuild.

```sh
node build.mjs   # crane-flyer.svg, crane-flyer-a4.pdf (needs rsvg-convert and Inkscape)
node page.mjs    # fold.html
```

`debug.mjs` and `storyboard.mjs` render the fold states and animation frames into `debug/` for checking.
