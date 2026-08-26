# Plan: one JS representation per video, audio and cuts derived from the text

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
// src/videos/social-017.ts
import { defineVideo, clip } from '../narration'

export default defineVideo({
  id: 'social-017',
  voice: 'chloe',
  model: 'eleven_v3',
  tailFrames: 21,
  sections: [
    {
      text: "If you're the one remembering what needs buying, booking, doing, and when the baby last ate, build this.\n\n",
      visual: clip({ src: 'dump-full-flow.mp4', trimBefore: 100 }),
    },
    {
      text: "Just say everything that's on your mind. It doesn't need to be organised.\n\n",
      visual: clip({ src: 'dump-screen-full-flow.mp4', trimBefore: 450 }),
    },
    // …
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

**The copy-drift guard.** Because the section texts concatenate to the script, a test can
assert `sections.map(s => s.text).join('') === scripts/social-017.yaml#script`. The video
physically cannot ship silently-reworded copy that never went through the language critics.

---

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

**1. Spike (~30 min).** Confirm the execution context claim above: add a
`calculateMetadata` that touches `typeof window` and `typeof process` to one composition, and
check what it reports in Studio and under `remotion render`. This is the one assumption the
architecture choice rests on, so verify it rather than trust it.

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

   While here, fix the overlay magic numbers: `titleDuration + 3000`, `+ 1637`, `+ 500` are
   frame counts hand-picked per video (and `+3000` is past the end of a 1025-frame video, so
   that overlay never shows). Anchor them to a section index or a word instead.

**5. Migrate social-017 first, as a regression test.** Its nine hand-tuned durations are
verified ground truth. Write the definition, build the timeline, and assert the derived
durations reproduce `[194, 117, 79, 140, 62, 79, 84, 85, 185]` within a frame. If they do, the
model is right. Then social-000 (17 sections, two visuals inside one sentence — the case that
justifies takes), then the rest, deleting each hand-written component as it is replaced.

**6. Wire up `npm run dev`.** `narrate --watch` + `remotion studio` concurrently. Add
`narrate --check` to `npm run lint` so a stale timeline can't be committed.

**7. Retire `content/audio/`.** Once every video is migrated and building from cache, the ~200
loose `generated_speech-*.wav` / `alignment-*.json` / `output-*.json` files are superseded
build artefacts. Keep the cache (it is the thing that stops you re-paying), gitignore or
`git lfs` it depending on how you want the repo to feel, and delete the rest.

---

## Validation to build in (each one is a mistake this design makes possible)

- **Clip too short.** A section that grows past its source clip's remaining footage after
  `trimBefore` currently just freezes or ends. Read the clip duration at build time and fail
  with "section 4 needs 190 frames, `dump-full-flow.mp4` has 140 left after trimBefore 650."
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
