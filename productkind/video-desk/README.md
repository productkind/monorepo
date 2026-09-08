# Video desk

The sourcing screen for the narrated videos: pick a video, read its sections, search both gif
providers for a beat, and apply a choice to the definition.

```
npm install
npm run desk        # api on 5274, front end on 5273
```

The provider keys come from `.env` at the repo root, which the api process reads.

## Architecture

Laid out after `dungarees/src/bin`: a domain that decides, services that expose boundaries, and a
delivery layer that carries events to a client.

```
domain/     events.ts, operations.ts (pure), flows.ts (composes reads and writes), behavior.ts
services/   services.ts (what the desk needs), get-services.ts (the real boundaries), desk-io.ts
http/       presenter.ts (event -> response), server.ts (routes -> one behaviour call each)
web/        the vite client
```

- **`operations.ts` holds every rule and touches nothing.** Gif duration, the fit rule, the frame
  filter, the border colour, the hourly key rotation, the definition parser. All of it is tested
  without a filesystem, a network or a subprocess.
- **`flows.ts` composes** those rules with reads and writes, over a `DeskIo` it is handed — so the
  same flows run against a fake.
- **`behavior.ts` is thin**: services in, flows do the work, `concat` composes.
- **`presenter.ts` is keyed by event type**, so an event the domain grows without a way to present
  it is a type error rather than a silent nothing.
- **The definition is rewritten by `apply-visual`** in `video-generator` — spawned as that
  package's own command, because the definitions live there and so do the tests for editing them.
  Spawned rather than imported: its extensionless imports do not resolve under node's ESM loader.

## Where the numbers came from

The measurements are ports of the sourcing skill's engine, and they were checked against it rather
than merely translated: gif durations agree with ImageMagick to the millisecond across 65 real
gifs, and the motion metric and loop seam reproduce the engine's numbers exactly for the same file
(0.121795 and 0.268132 for `section-14-lightbulb.gif`). That matters because the thresholds the
domain compares them against were calibrated on those numbers and no others.

Duration and size are read from the gif's own bytes in TypeScript, so the sections list needs no
subprocess at all. Motion, the loop seam and the border histogram still shell out to ImageMagick,
which coalesces frames and resolves palettes properly; a hand-rolled LZW decoder would be a second
implementation of the hardest part of the format.

## Where a gif came from

Each section records it as data in the definition — `source: { provider, id, search }` — so the
desk reads a shape, not prose. It used to be a provenance comment holding a URL, which meant the id
had to be re-derived and only giphy URLs carried one; that gap is why two of video 7's picks
repeated video 5. Forty sections predate ids being kept and carry a provider and a search only.

## Known rough edges

- **The python scripts still exist** in `.claude/skills/video-gifs/scripts` and now hold a second
  implementation of search, measurement and the fit rule. The sourcing agent uses them, so they
  cannot simply go; the way out is a CLI over this domain that the skill calls instead.
- Picking does not delete the gif it replaced, so asset folders collect orphans.
- Sections whose visual is a `clip()` (social-017) are listed but cannot be sourced.
- Reading a gif through the filesystem service goes via latin1 text, because that service reads
  text. It is byte-exact but it copies more than a binary read would.
- `video-generator` has no `"type": "module"`, so node prints a reparse warning when the api
  imports `apply-visual.ts` from it.
