# Video desk

The sourcing screen for the narrated videos: pick a video, read its sections, search both gif providers for a beat, and apply a choice to the definition.

```
npm install
npm run desk        # api on 5274, front end on 5273
```

The provider keys come from `.env` at the repo root, which the api process reads.

## Architecture

Laid out after `dungarees/src/bin`: a domain that decides, services that expose boundaries, and a delivery layer that carries events to a client.

```
domain/     events.ts, operations.ts (pure), flows.ts (composes reads and writes), behavior.ts
services/   services.ts (what the desk needs), get-services.ts (the real boundaries), desk-io.ts
http/       presenter.ts (event -> response), server.ts (routes -> one behaviour call each)
web/        the vite client
```

- **`operations.ts` holds every rule and touches nothing.** Gif duration, the fit rule, the frame filter, the border colour, the hourly key rotation, the definition parser. All of it is tested without a filesystem, a network or a subprocess.
- **`flows.ts` composes** those rules with reads and writes, over a `DeskIo` it is handed — so the same flows run against a fake.
- **`behavior.ts` is thin**: services in, flows do the work, `concat` composes.
- **`presenter.ts` is keyed by event type**, so an event the domain grows without a way to present it is a type error rather than a silent nothing.
- **The definition is rewritten by `apply-visual`** in `video-generator` — spawned as that package's own command, because the definitions live there and so do the tests for editing them. Spawned rather than imported: its extensionless imports do not resolve under node's ESM loader.

## Where the numbers came from

The measurements are ports of the sourcing skill's engine, and they were checked against it rather than merely translated: gif durations agree with ImageMagick to the millisecond across 65 real gifs, and the motion metric and loop seam reproduce the engine's numbers exactly for the same file (0.121795 and 0.268132 for `section-14-lightbulb.gif`). That matters because the thresholds the domain compares them against were calibrated on those numbers and no others.

Duration and size are read from the gif's own bytes in TypeScript, so the sections list needs no subprocess at all. Motion, the loop seam and the border histogram still shell out to ImageMagick, which coalesces frames and resolves palettes properly; a hand-rolled LZW decoder would be a second implementation of the hardest part of the format.

## Gifs and stock footage

**Every source is available on every section.** A beat that holds a gif can take stock footage and the other way round; a pick changes the section's kind, brings the factory the definition now needs into its import, and writes the fields that kind actually has. What the desk shows follows what was searched, not what is there now.

A section holds either a gif or a stock clip, and the desk treats them as the different things they are. Which one it is comes from the definition, not from the file extension.

|  | gif | clip |
| --- | --- | --- |
| judged on | how often it comes round in the slot, and whether the loop seam shows | whether it outlasts the beat |
| catalogues | giphy, klipy | pexels, pixabay |
| filter | squarish, at least 380px wide | long enough to cover the beat plus a second |
| measured with | its own bytes, then ImageMagick | ffprobe |
| picked by | download, measure, write | download, verify the stream, trim, write |

A clip has no playback rate and no loop, so one that runs out holds a frozen frame while the captions keep moving — which is why every clip is trimmed to its beat plus a second, and why the desk reports the headroom rather than a repeat count.

**What a provider says a file is cannot be trusted.** Pexels lists id 6000421 as 1080x1920 and even names the file `hd_1080_1920`; the stream inside is 720x1280, which would be upscaled into the frame and read as visibly soft. The desk probes the downloaded stream and refuses the clip rather than installing it.

Flagging works the same for both, because a flag is about a file and a beat.

**Where a converted section sits.** Re-sourcing the same kind leaves a section exactly where it was, including a placement someone chose deliberately. Changing the kind takes the new kind's own treatment: every gif in the repo sits above the captions and every clip fills the frame, and a gif that inherited a clip's full frame renders letterboxed with the captions across it. Note that `place` is moot for stock footage either way — it arrives at 1080x1920, the frame's own shape, and `placeMedia` fills the frame with anything frame-shaped rather than shrinking it into a band.

## Where a visual came from

Each section records it as data in the definition — `source: { provider, id, search, author }` — so the desk reads a shape, not prose. The author is there because pexels asks for the credit, and that cannot be written without keeping the name. It used to be a provenance comment holding a URL, which meant the id had to be re-derived and only giphy URLs carried one; that gap is why two of video 7's picks repeated video 5. Forty sections predate ids being kept and carry a provider and a search only.

## Known rough edges

- **The python scripts still exist** in `.claude/skills/video-gifs/scripts` and now hold a second implementation of search, measurement and the fit rule. The sourcing agent uses them, so they cannot simply go; the way out is a CLI over this domain that the skill calls instead.
- Picking does not delete the gif it replaced, so asset folders collect orphans.
- Video previews rely on range requests, which the api serves, plus a poster frame built on demand and cached outside the repo — a tab that is not really visible has its media loading throttled, and a poster shows the footage regardless.
- **A pick reuses the filename** when the search is the same, because the name comes from the last two words of the term. The file underneath is replaced, so every preview URL carries the file's mtime and the poster is rebuilt when the clip is newer than it. Without that a swap looks like nothing happened. Giving each pick a distinct name would be the tidier fix, but the skills' own `section-NN-keyword` convention would have to change with it.
- The api is a plain node process, so a change to `domain/` or `services/` needs it restarted; only the front end hot-reloads.
- Reading a gif through the filesystem service goes via latin1 text, because that service reads text. It is byte-exact but it copies more than a binary read would.
- `video-generator` has no `"type": "module"`, so node prints a reparse warning when the api imports `apply-visual.ts` from it.
