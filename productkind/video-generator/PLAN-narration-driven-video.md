# Plan: one JS representation per video, audio and cuts derived from the text

> **Status: built.** Phases 1-6 are done and twelve videos run on the pipeline (social-000,
> social-016, social-017, social-018 and the eight of the PM technical fluency campaign), each
> rendering from its definition with no hand-written durations. What is left is phase 0's
> dashboard step (rotate the key) and migrating the remaining 27 `LessonVideo.tsx` components
> with `npm run migrate`. See "What was built" at the end.
>
> **The paths in this document are historical.** The project moved from
> `little-parrot/content/video/` to `productkind/video-generator/`, and phase 7 has been done:
> `little-parrot/content/audio/` is deleted. Nothing builds, renders or narrates from it — every
> pipeline video carries its own audio under `public/<id>/audio/`, and the 27 legacy compositions
> play `public/<id>/speech.wav` — but it was the input `npm run migrate` reads, so restore it from
> git history before migrating any of those 27:
>
> ```
> git checkout <commit-before-the-delete> -- little-parrot/content/audio
> ```

## What exists today

Two projects, one workflow, four manual handoffs.

**`content/audio/`** — a single `audio.ts` with ~30 scripts pasted in as `const` template
literals, plus three hand-edited switches at the bottom (`TEXT_TO_GENERATE`, `videoName`,
`VOICE_ID`). Run it, get `generated_speech-<name>.wav` and `alignment-<name>.json`. Then edit
`videoName` in `transform-timestamps.js` and run that to turn ElevenLabs' character-level
alignment into a word list, `output-video-<name>.json`. Then copy both files by hand into
`content/video/public/<id>/` as `speech.wav` and `text.json`. (Confirmed: `text.json` for
social-017 is byte-identical to `output-video-video-social-017-chloe.json`.)

**`content/video/`** — a Remotion project where each video is a hand-written 60–110 line
component in `src/LessonVideo.tsx` (2715 lines, 32 near-identical components), a hand-written
40-line `<Composition>` block in `src/Root.tsx` (1001 lines, same `calculateMetadata` copied
32 times), and a YAML in `scripts/` holding a third copy of the same script text.

### The load-bearing fact

Every hand-tuned `durationInFrames` in those components is exactly *"cut at the start of a
particular word."* Checked against social-017's real alignment:

| section | frames | cumulative | lands on |
|---|---|---|---|
| 1 | 194 | 194 | "Just" |
| 2 | 117 | 311 | "Your" |
| 3 | 79 | 390 | "And" |
| 4 | 140 | 530 | "Feeds," |
| 5 | 62 | 592 | "just" |
| 6 | 79 | 671 | "In" |
| 7 | 84 | 755 | "you" |
| 8 | 85 | 840 | "The" |
| 9 | 185 | 1025 | (end + 21 frames tail) |

Nine of nine boundaries land on a word start. So a section's duration is not an independent
number that happens to fit the audio — it is **fully derivable** from "which words belong to
this section." The author never needs to state a duration at all. That is the whole plan.

### Second load-bearing fact

ElevenLabs' `alignment.characters` is a character-for-character echo of the input text
(verified: social-017's 564-char array replays the input exactly, including newlines). So
mapping a section to a time range needs **no fuzzy string matching** — count characters, index
into the alignment array. Exact, not best-effort.

---

## Target authoring model

One file per video. The concatenation of the section texts *is* the script.

```ts
// src/videos/social-016.ts
import { defineVideo, gif, still } from '../narration'

export default defineVideo({
  id: 'social-016',        // visual paths resolve against public/social-016/
  voice: 'chloe',
  model: 'eleven_v3',
  sections: [
    {
      text: "It doesn't have to be overwhelming to create an interactive lead magnet with AI and win bigger consulting clients as a freelancer.",
      visual: gif({ src: 'section-00-overwhelmed.gif', offset: -200 }),
      endsParagraph: true,
    },
    {
      text: "If you start researching how to build a website using AI, you'll come across a gazillion tools.",
      visual: gif({ src: 'section-02-research.gif', offset: -150 }),
    },
    {
      text: "In this video, we'll show you how to choose between them.",
      visual: gif({ src: 'section-04-choose.gif', offset: -220 }),
      endsParagraph: true,
    },
    // …
    {
      text: "To get started, describe how your lead magnet should work using this prompt template.",
      visual: still({ src: 'section-21-prompt.png', offset: -150 }),
    },
  ],
})
```

Change a word in `text` → the take's content hash changes → that take's audio is regenerated →
its word alignment is recomputed → every downstream section boundary shifts to the new word
starts → the cuts land right. Nothing to re-tune.

**Takes.** Sections are finer-grained than sentences (social-000 has 17 visuals for ~9
sentences; "You are not falling behind on AI." alone spans two visuals), so a section cannot be
its own TTS call without destroying prosody mid-sentence. The TTS unit is therefore the
**take** = a run of consecutive sections, split on the blank lines that are already in the
text. Sections resolve to word ranges *within* a take. Trailing `\n\n` in a section's text
means "take boundary here" — no extra field to remember, and it keeps the section texts a
faithful copy of the script.

**Section text is readable copy, not a transcript.** It carries no leading newline and no blank
line between paragraphs: paragraph structure is `endsParagraph: true`, and the whitespace is put
back when the narration is assembled. Nothing is lost by this, because the mapping from a section
to its place in the audio matches on **spoken characters only** — every non-whitespace character
still has to line up, and the first one that does not names the section it was in. So the
whitespace can differ freely between the definition and the string the voice API was actually
sent, which is what lets the legacy narration be reused verbatim.

The two hashes ignore whitespace for the same reason. The same script laid out differently is the
same take, so it keeps its cached audio rather than being re-narrated at a cost. The trade that
follows: a whitespace-only edit will not re-generate audio.

**The copy-drift guard.** Because the section texts reassemble the script, a test can assert
`sections.map(s => s.text).join(' ')` against `scripts/social-017.yaml#script` once whitespace is
normalised. The video cannot ship silently-reworded copy that never went through the language
critics — and if the audio and the script drift apart, `sectionSpansIn` refuses to build rather
than mapping cuts onto the wrong words.

---

### Visuals

GIFs are not a special case here, they are the overwhelming majority. Counted across
`LessonVideo.tsx`: 473 `FullScreenImage` tags, of which **461 are `.gif`** and 12 are stills
(4 png, 7 jpg, 1 webp). Only 10 sections use an mp4 `<Video>`. So `gif()` is the primary visual
and the format should be shaped around it.

Three visual kinds, each a helper that sets a `kind` discriminator so `NarratedVideo` dispatches
on a key rather than sniffing file extensions at render time:

```ts
gif({ src, offset?, color?, fit?, scale?, loopBehavior?, playbackRate? })
still({ src, offset?, color?, fit?, scale? })
clip({ src, trimBefore?, offset?, muted? })
```

`src` is relative to `public/<id>/`, so the folder name stops being repeated 473 times.

Defaults taken from what the existing tags actually pass:

- **`fit` defaults to `'contain'`.** All 451 explicit uses are `contain`; there is not a single
  `cover`. The current `FullScreenImage` defaults to `'cover'`, so the 22 tags that omit `fit`
  are silently getting the wrong fit today. Worth eyeballing those when migrating.
- **`offset`** (vertical px) is the one knob genuinely tuned per visual — 267 uses, clustered at
  -150 (147×), -100 (58×) and -200 (19×). It lifts the subject clear of the caption band, which
  sits at `mt-[250px] mb-[420px]`. Keep the name, keep the default at 0.
- **`color`** is the letterbox backdrop behind a `contain` fit, set to match the gif's own
  background so the seam disappears. 32 uses, arbitrary hex. Default `DARK_PURPLE`.
- **`zoom` is dropped.** Zero uses across all 473 tags. It widened the element and panned
  horizontally; nothing needs it.
- **`scale`** survives with one use (1.6). One optional number, cheap to keep.

#### Why gifs suit derived durations better than mp4s

This is the part that makes the whole plan cheaper than it looks. `<Gif>` from `@remotion/gif`
defaults to `loopBehavior: 'loop'` (confirmed in `GifForRendering.js`), so a gif fills whatever
duration its section computes. Edit the text, the section grows, the gif simply loops longer.
**Nothing to re-tune and nothing to validate** — which covers 461 of 473 visuals.

The mp4 `clip()` is the awkward one: it has finite footage after `trimBefore`, so a section that
grows past what remains freezes or runs out. That is where the build-time length check earns its
place, and it only has to police 10 sections.

Two gif knobs become meaningful once durations are derived rather than hand-set:

- `loopBehavior: 'pause-after-finish'` for a gif that should play its joke once and hold, rather
  than loop, on a long section.
- `playbackRate` to stretch a short loop over a long section instead of repeating it visibly.

`@remotion/gif` also exports `getGifDurationInSeconds`, so the build can emit a soft warning
(not an error) when a section runs more than ~5× the gif's natural length and the looping will
read as a stutter. Advisory only — sometimes a long loop is the right call.


## Where the generation runs

You asked for `calculateMetadata` to do it. One thing to know before committing to that:
`calculateMetadata` is part of the bundle and is evaluated **in a browser context in both
Studio and headless render** (Remotion evaluates the bundle in Chrome for rendering too). So it
has no `fs`, and an ElevenLabs key reachable from it is a key compiled into a browser bundle.
Generating audio *inside* `calculateMetadata` is therefore not available as written. Two ways to
get the same result:

**Option A — sidecar service (literal reading of the request).** A small Node server owns the
key, the cache and the ElevenLabs calls. `calculateMetadata` does
`fetch('http://localhost:8787/timeline/social-017')`, which generates-on-demand and returns the
timeline. Works from the browser context in Studio and in render. Cost: the process must be
alive for every render, including CI, and a render can now fail on a network error or spend
money.

**Option B — build step with watch and a staleness guard (recommended).** `npm run dev` runs
`narrate --watch` alongside `remotion studio`. The watcher regenerates audio and writes
`public/<id>/timeline.json` within a second or two of you saving a `src/videos/*.ts` file;
Studio hot-reloads. `calculateMetadata` stays pure: fetch `timeline.json`, return
`durationInFrames` and the section frames. It also compares the hash baked into
`timeline.json` against the hash of the definition in the bundle and **throws** on mismatch, so
a stale timeline is a loud render failure rather than a subtly desynced video. Renders are
deterministic, offline, and cost nothing.

Option B gives you the outcome you actually want — never generating audio by hand — without
making every render depend on a live process and a paid API. Recommend B; the whole pure core
below is shared, so switching to A later is a small change.

### `timeline.json`

```json
{
  "definitionHash": "sha256:…",
  "fps": 30,
  "durationInFrames": 1025,
  "takes": [{ "audio": "audio/9f2c1a….wav", "fromFrame": 0, "durationInFrames": 402 }],
  "sections": [{ "index": 0, "fromFrame": 0, "durationInFrames": 194, "wordFrom": 0, "wordTo": 19 }],
  "words": [{ "text": "If", "start": 0, "end": 2 }]
}
```

Frame maths, in this order, to keep `Series` from drifting:

1. Take offsets accumulate from real WAV durations (read the header — 44.1 kHz, known byte
   count — no new dependency).
2. Global time of a word = take offset + its local time from the alignment.
3. `boundary[i]` = `Math.round(globalStartOf(firstWordOf(section i)) * fps)`, rounded **once**.
4. `duration[i] = boundary[i + 1] - boundary[i]`; last section gets
   `totalFrames + tailFrames - boundary[last]`.
5. Assert `sum(durations) === durationInFrames`.

Deriving durations by differencing pre-rounded boundaries is what stops per-section rounding
error accumulating over 25 sections.

---

## Caching and cost

ElevenLabs bills per character, and you have ~30 scripts. Content-address the cache:
`public/<id>/audio/<sha256(text + voice + model + settings)>.wav` with a sibling
`.alignment.json`. Editing section 3 leaves takes 1–2 untouched and unpaid-for.

**Migrate the existing audio in for free.** Before generating anything, hash each existing
script from `audio.ts` under the settings it was made with, and copy the matching
`generated_speech-*.wav` / `alignment-*.json` into the cache under that hash. All 32 existing
videos then build with zero API calls, and a text edit is the only thing that ever spends
money. Do this in the same commit that adds the cache, while the mapping from
`videoName` → script is still readable in `audio.ts`.

For continuity across take boundaries, pass ElevenLabs' `previous_text` / `next_text` with the
neighbouring takes' text so each take is read as part of a continuous delivery. Include those
in the hash.

---

## Phases

Pure functions first, tests before implementation, per `dungarees/CODING_RULES.md` (options
objects, real stubs asserting observable outcomes, no `as`/`!`).

**0. Rotate the ElevenLabs key. (Done, bar the dashboard step.)** `audio.ts` had a live key in
plain text, committed on 2025-07-25 in `41168d9`. `productkind/monorepo` is a **public** repo, so
the key was publicly readable for ~13 months and should be treated as harvested.

- [ ] Revoke the old key at https://elevenlabs.io/app/settings/api-keys and create a new one.
      Revoke first, not after; check usage/billing for spend you don't recognise.
- [ ] `cp .env.example .env` at the repo root and paste the new key in. Root `.gitignore`
      already ignores `.env`.
- [x] `audio.ts` reads `process.env.ELEVENLABS_API_KEY` and throws with a usable message if it
      is missing. Run it with `node --env-file=../../../.env` — Node 24 supports this natively,
      so no `dotenv` dependency.

**No history rewrite.** It was public for 13 months, so the commits are cloned, cached and
indexed by now; rewriting breaks every clone without un-publishing anything. Once the key is
revoked, the string in history is a dead token.

**1. Spike — done, Option B confirmed.** A `calculateMetadata` that throws its own context
report, run under `remotion render`, returned:

```
{"window":"object","document":"object","process":"object","require":"function","nodeVersion":"undefined"}
```

A browser context, and the `process` is webpack's shim — `process.version` is `undefined`. So
`fs` is genuinely unavailable, and any `process.env.ELEVENLABS_API_KEY` read inside
`calculateMetadata` gets inlined into the bundle by webpack at build time, i.e. the key would be
compiled into a browser bundle. Generating audio there is out, as predicted. `fetch` does work
(the existing videos already fetch `staticFile('…/text.json')` from `calculateMetadata`), so
Option B's plan of fetching a pre-built `timeline.json` holds.

**2. Pure core, TDD.** New package/folder `src/narration/`, no I/O, no Remotion imports:
   - `alignmentToWords({ alignment })` — the logic now in `transform-timestamps.js`, extracted
     and given tests (including the newline and end-of-input edge cases it already handles, and
     the leading-`\n` case that currently produces a zero-length first token).
   - `sectionsToTakes({ sections })` — split on blank-line boundaries.
   - `timeRangeForCharSpan({ alignment, from, to })` — the exact char-offset lookup.
   - `buildTimeline({ takes, wordsPerTake, takeDurations, fps, tailFrames })` — steps 1–5 above.
     Test the drift property directly: 25 sections at awkward fractional boundaries must sum
     exactly.
   - `definitionHash({ definition })`.

**3. Node build script.** `scripts/narrate.ts`: load `src/videos/*.ts`, hash, check cache, call
ElevenLabs for misses, read WAV durations, write `timeline.json`. `--watch` and `--check`
(CI-friendly: exit non-zero if any timeline is stale). Stub the ElevenLabs client with a real
fake that returns a genuine alignment shape — the recorded `alignment-social-000-chloe.json`
makes a good fixture.

**4. One generic component.** `<NarratedVideo definition timeline />` that renders the
`Series` from `timeline.sections`, the per-take `<Audio>`, the soundtrack, `<Captions>`, and the
Rive overlays. Plus one generic composition factory in `Root.tsx` mapping over the definitions.
This is where 2715 + 1001 lines collapse to roughly a few hundred.

   The visual is a keyed dispatch on `visual.kind` — `gif` → `<Gif>`, `still` → `<Img>`,
   `clip` → `<Video>` — replacing `FullScreenImage`'s `src.endsWith('.gif')` sniff. Keep the
   letterbox wrapper (`AbsoluteFill` + centred flex + `backgroundColor`) exactly as it is; it is
   what makes `fit: 'contain'` look deliberate rather than letterboxed.

   While here, fix the overlay magic numbers: `titleDuration + 3000`, `+ 1637`, `+ 500` are
   frame counts hand-picked per video (and `+3000` is past the end of a 1025-frame video, so
   that overlay never shows). Anchor them to a section index or a word instead.

**5. Migrate three videos, in this order, each proving one thing.**

   1. **social-017 — the numbers.** Nine hand-tuned durations are verified ground truth. Build
      the timeline and assert the derived durations reproduce
      `[194, 117, 79, 140, 62, 79, 84, 85, 185]` within a frame. If they do, the timing model is
      right. It is also the mp4 `clip()` case, so it exercises the footage-length check.
   2. **social-016 — the visuals.** 25 sections, 24 gifs and one png, one `color` override, the
      single `scale: 1.6`. If `gif()` and `still()` can express this video with no bespoke
      component, the visual format is done. Render it and diff against the existing output.
   3. **social-000 — the takes.** 17 visuals across ~9 sentences, with "You are not falling
      behind on AI." spanning two gifs. This is the case that justifies take-level TTS and
      sub-sentence section boundaries.

   Then the remaining 29, deleting each hand-written component as it is replaced.

**6. Wire up `npm run dev`.** `narrate --watch` + `remotion studio` concurrently. Add
`narrate --check` to `npm run lint` so a stale timeline can't be committed.

**7. Retire `content/audio/`.** *Done, ahead of the migration finishing.* The ~200 loose
`generated_speech-*.wav` / `alignment-*.json` / `output-*.json` files (34MB, 114 tracked) are
superseded build artefacts: every pipeline video has its own cache under `public/<id>/audio/`, so
nothing re-pays for narration. The one thing lost is the input `npm run migrate` reads, so the 27
remaining `LessonVideo.tsx` components need the folder restored from git history first. The cache
that stops you re-paying is kept.

---

## Validation to build in (each one is a mistake this design makes possible)

- **`clip()` too short (mp4 only, ~10 sections).** A section that grows past its source clip's
  remaining footage after `trimBefore` currently just freezes or ends. Read the clip duration at
  build time and fail with "section 4 needs 190 frames, `dump-full-flow.mp4` has 140 left after
  trimBefore 650." Does not apply to `gif()` or `still()` — they fill any duration.
- **`gif()` looping hard (soft warning).** Via `getGifDurationInSeconds`, warn when a section
  runs more than ~5× the gif's natural length. Never fails the build.
- **`fit` regression on migration.** The 22 tags that currently omit `fit` get `'cover'` from
  `FullScreenImage`'s default while the new default is `'contain'`. Diff a render of those
  sections before and after rather than trusting the change is invisible.
- **Section text not found in the take.** Cannot happen if takes are built by concatenation,
  but assert it anyway — it catches a stray edit in one place and not the other.
- **Script drift.** The YAML-equals-sections test above.
- **Boundary sum.** Assert in `buildTimeline`, not just in a test.
- **eleven_v3 audio tags.** The exact char-echo property was verified on plain prose. If you
  start using `[whispers]`-style tags, re-verify that `alignment.characters` still echoes the
  input, and strip tags from the char-offset accounting if it doesn't.

## What this does not solve

Section boundaries land on word starts, which is what you have been hand-tuning to. It does not
decide *which* word a visual should cut on — that stays an authoring choice, expressed by where
you split the text. And a longer script still means a longer video; nothing here compresses
narration to hit a target length.


---

## What was built

### Where things live

| Path | What it is |
|---|---|
| `src/narration/words.ts` | ElevenLabs character timings to words, with the char span each came from |
| `src/narration/takes.ts` | Groups sections into text-to-speech calls |
| `src/narration/spans.ts` | Locates each section in the narration, matching spoken characters only |
| `src/narration/safe-zone.ts` | `placeMedia`: works out where a visual goes, replacing hand-tuned offsets |
| `src/components/useMediaSize.ts` | Measures a visual's own pixel size inside `delayRender` |
| `src/narration/timeline.ts` | The frame maths: boundaries from word starts, durations by differencing |
| `src/narration/definition.ts` | `defineVideo`, the `gif`/`still`/`clip` helpers, overlays, hashing |
| `src/narration/voices.ts` | Voice ids and the house delivery settings |
| `src/narration/timeline-file.ts` | What `calculateMetadata` calls: load `timeline.json`, refuse it if stale |
| `src/components/NarratedVideo.tsx` | The one component every video renders through |
| `src/components/Visual.tsx` | Keyed dispatch: gif to `<Gif>`, still to `<Img>`, clip to `<Video>` |
| `src/components/Captions.tsx` | Lifted unchanged from `LessonVideo.tsx` |
| `src/compositions.tsx` | One `<Composition>` per definition, no per-video code |
| `src/videos/*.ts` | The definitions. One file per video, the only thing authored by hand |
| `scripts/narrate.ts` | Builds audio and timelines. `--check`, `--watch`, `--import` |
| `scripts/migrate-legacy-video.ts` | Turns a hand-written component into a definition |

### Commands

| Command | What it does |
|---|---|
| `npm run dev` | Studio plus the narration watcher; editing a script rebuilds its timeline |
| `npm run narrate` | Build every timeline, reusing cached audio |
| `npm run narrate -- --check` | Exit 1 if any timeline is missing or stale. Never calls the API |
| `npm run narrate -- --import` | Seed the cache from previously generated audio, free |
| `npm run narrate -- --allow-generate` | The only way to spend ElevenLabs credits |
| `npm run migrate -- --id … --component … --alignment … --voice … --model …` | Migrate one legacy video |
| `npm test` | The 51 narration tests (vitest resolves from the repo root) |
| `npm run lint` | eslint, tsc, and the timeline staleness check |

### What the numbers came out as

Derived boundaries against the hand-tuned ones, for the three migrated videos:

| Video | Sections | Exact | Worst inner delta | Notes |
|---|---|---|---|---|
| social-017 | 9 | 6 of 8 | 2 frames | mp4 clips |
| social-016 | 25 | 20 of 24 | 10 frames | 24 gifs, 1 png |
| social-000 | 17 | 5 of 16 | 15 frames | the loosest hand-tuning |

The outliers are compensating pairs, so nothing drifts. Inspecting them showed the author's cut had
landed in the silence *between* sentences; the derived cut moves it onto the first word of the next
sentence. That is a normalisation toward the natural cut point, not a regression, but it is a
visible half-second shift in five places in social-000 and one in social-016 — worth watching those
two back before treating the migration as final.

The last section of every video differs by more: its hand-tuned value overran the composition (1025
frames of sections in a 1010-frame social-017), so the surplus never rendered. The derived value is
the real one.

### Things found along the way

- **social-000 had a hidden conversion step.** Its published `speech.wav` is a 21.5 MB
  uncompressed re-encode of the 897 KB MP3 ElevenLabs returned — 24×, exactly WAV versus 128 kbps.
  So the old workflow had a manual ffmpeg step nobody had written down. The cache keeps the
  original MP3, which is what social-016 and social-017 already shipped with.
- **The key was in a public repo for 13 months.** `productkind/monorepo` is public. Rotating it is
  the one step still outstanding.
- **`calculateMetadata` runs in a browser even when rendering.** Verified by making one throw its
  own context: `window` is an object and `process.version` is `undefined`, so `process.env` reads
  get inlined into the bundle by webpack. This is why the build-step architecture was chosen.
- **Half the `.wav` files are MP3.** social-016 and social-017 are ID3/`Lavf`-tagged MP3 named
  `.wav`; social-000 and video-2 are real RIFF. Remotion decodes by content so nobody noticed. The
  cache now names files after their actual bytes, and take duration is read from the alignment
  rather than any audio header, so the mixture is irrelevant.
- **The alignment echoes its input exactly**, so section-to-time mapping is character indexing.
  Confirmed on social-017's 564 characters, and it is what makes the free cache import work: a
  legacy alignment whose characters rebuild a take's text was generated from that take, so all
  three videos were migrated with zero API calls.
- **`Math.ceil` is the rounding rule**, matching the existing caption conversion — but it needed a
  1e-9 epsilon. A unit test caught `0.6 * 30` landing on 18.000000000000004 and stealing a frame.
- **One overlay never rendered.** `parrot-follow-00.riv` at `titleDuration + 3000` sat past the end
  of both social-016 (2382 frames) and social-017 (1010). The migration tool drops overlays it can
  prove never showed and says so. social-000's copy at frame 1637 does render, and was kept.
- **`FullScreenImage` defaulted to the wrong fit.** All 451 explicit uses ask for `contain`; the
  component defaulted to `cover`. The migration tool writes `fit: 'cover'` explicitly where the old
  tag was silent, so no video changes appearance without it being visible in the definition.

### Still to do

- Rotate the ElevenLabs key (phase 0), then `cp .env.example .env`.
- Migrate the remaining 27 videos with `npm run migrate`, deleting each component as it goes.
  Restore `little-parrot/content/audio` from git history first: it is what migrate reads.
  `LessonVideo.tsx` and `Root.tsx` are down 333 lines from three videos; the rest follows.
- Phase 7 is done: `content/audio/` is deleted, recoverable from git history.
- `npm run lint` still fails on three unused declarations in `LessonVideo.tsx`
  (`interFontFamily`, `FullScreenEnd`, `VideoZoom`). They predate this work and will go with the
  file.


---

## Placing visuals without offsets

`offset` existed to keep a visual clear of the platform bars and the captions, which is why 267 of
them were negative. `place: 'above-captions'` works that out instead.

**The region.** From the bottom of the top platform bar (y=250) to the top of the captions. The
captions are `mt-250 mb-420` with `justify-end`, so they stack up from y=1500; a fixed band of two
lines at `CAPTION_LINE_HEIGHT` 144 (the 112px span plus its `m-4`) puts the caption top at 1212. So
the region is **250 to 1212, 962 tall**. The band is fixed rather than measured per frame on
purpose: content would otherwise jump every time a caption wrapped differently.

**Three cases**, all off the media's own pixel size, scaled to the 1080 frame width:

| Case | Placement |
|---|---|
| Same shape as the frame | Fills the frame, not moved at all |
| Shorter than the region | Sits on the bottom of it, directly on the captions, slack above |
| Taller than the region | Centred on the region, overflowing above and below by the same amount |

`offset` still applies on top of whichever case fires, for when it is still needed.

**Opt-in.** `place` defaults to `'frame'`, the existing behaviour, so social-000, social-016 and
social-017 stay byte-identical to what was verified against the published renders.

**social-018** is social-016 with `place: 'above-captions'` on all 25 visuals and **not one
offset**. It reads `assets: 'social-016'`, so it shares that folder's 106 MB rather than copying
it, and its narration came free from the cache — identical script, so identical audio and an
identical 2382-frame timeline.

### How far the computed placement moves things

Comparing social-016's hand-tuned placement against social-018's computed one, per section: mean
shift -22px, largest -229px, and only 8 of 25 land within 50px. It is a different rule, not a
reproduction, so **watch 018 back before adopting the placer more widely.** The pattern:

- **Landscape gifs that fit the region drop by 45-170px**, because they now sit on the captions
  instead of floating above them. `section-04-choose.gif` moves furthest, +168.
- **Oversized gifs rise by a consistent 79px**, because equal overflow on the region centres them
  at y=731 where the frame centre was 960. The author's habitual -150 was less aggressive than
  equal overflow.
- **`section-20-type.gif` is 184x338.** Filling the frame width upscales it 5.9x and puts it
  261px above the frame. It was already being stretched under the old code; the placer makes the
  cost of a small source asset more visible rather than causing it.

### Known limits

- Very portrait media is width-filled, so it crops hard rather than being letterboxed. That is
  what "overflow equally" asks for, but a `contain` variant would be the thing to add if a video
  needs it.
- `fit` and the letterbox `color` still apply under `place: 'frame'`; under `'above-captions'` the
  geometry decides, so `fit` is ignored and `color` only shows where the media does not reach.
