---
name: stock-video
description: Source royalty-free stock footage for a second cut of a narrated Little Parrot video in productkind/video-generator, one clip per run of clauses, fitted to the run's slot. Use when a video needs a stock-footage cut, when a clip is wrong for its beat, or when a b-roll cut needs footage nobody has to shoot. Triggers include "make a stock cut of this video", "source stock footage", "replace this clip", "find footage for run N".
---

# Stock footage for a narrated video

A stock cut is a **second cut of a video that already exists**: the same narration, the same cuts,
footage instead of gifs. Nothing about the audio changes, so nothing is paid for twice.

## What a stock cut is

- **The narration stays character-identical to the parent video.** `audioCacheKey` covers the take
  text, the voice, the model and the settings, so an identical script under a new id adopts the
  parent's audio and the timeline comes out frame-for-frame the same. Change one character and it
  becomes a new take at full price. Generate the section text from the parent's own definition
  rather than retyping it, and diff the two before narrating.
- **Sections are clauses merged into runs.** The parent cuts once per clause; a stock cut holds one
  clip for three to six seconds. Merge consecutive clauses until a run reaches that length, joining
  their text with a single space, and **never let a run cross a paragraph break** — the break is
  `\n\n` in the narration and merging across it would re-punctuate the script. Put
  `endsParagraph: true` on the run that ends a paragraph.
- **One `clip()` per run**, full-bleed: `place` defaults to `'frame'`, `muted` to true.
- **Every clip must outlast its beat.** `clip` has no playback rate and no loop, so a clip that
  runs out holds a frozen frame while the captions and the parrot keep moving — the defect the
  house rules already ban. Trim to the beat **plus one second** and verify it per section against
  the real timeline.

## Where things live

- Definitions: `productkind/video-generator/src/videos/<video-id>.ts`
- Footage: `productkind/video-generator/public/<video-id>/clip-NN-keyword.mp4`
- Scripts: `.claude/skills/stock-video/scripts/`, run from that directory

## Providers

`PEXELS_API_KEY` and `PIXABAY_API_KEY` live in the gitignored `.env` at the repo root. Never print,
commit or hard-code a key.

- **Pexels leads.** Free, 200 requests an hour and 25,000 a month (the response header says 25,000
  where the docs say 20,000). It filters `orientation=portrait`, which is the whole game for a
  1080x1920 frame: about four in five portrait results carry a native 1080x1920 file, so nothing
  has to be cropped or scaled.
- **Pexels answers a scripted request with 403** unless the request carries a browser `User-Agent`.
  `common.py` sets one, the same workaround the giphy tooling needs.
- **Neither provider can filter duration in a search.** Pexels offers `min_duration` only on
  `/videos/popular`; Pixabay not at all. `harvest.py` therefore filters duration client-side.
- **Pixabay is a fallback, not a peer.** Its video search cannot filter orientation at all, and its
  terms require caching responses for 24 hours.

**Pexels' reported dimensions cannot be trusted.** Clip `6000421` is listed as 1080x1920, its file
is named `hd_1080_1920_24fps.mp4`, and the stream inside is 720x1280; `10451891` does the same.
`pick.py` probes every download and refuses anything that is not really 1080x1920, because
upscaling into the frame is visibly soft. Measure, never believe.

## Licence

The Pexels licence allows commercial use and requires no attribution. It forbids selling unaltered
copies, implying endorsement, redistributing on stock platforms, using footage in a trademark —
and this one, which shapes the edit:

> Identifiable people may not appear in a bad light or in a way that is offensive.

**So faces stay off the beats where the viewer is caught out.** Every one of these scripts opens on
somebody out of their depth, and putting a real, identifiable person there both risks the licence
and makes the viewer the butt of the joke, which the house rules ban anyway. Carry those beats with
rooms, weather, machinery and objects. A person is fine on a beat about understanding something,
and better still seen from behind or as hands only.

Separately, the **API guidelines** ask for a prominent link back to Pexels even though the content
licence does not, and crediting the photographer is asked for too. That is why `VisualSource`
carries an `author`: the credit cannot be written later without the name. Credit Pexels in the
video description.

## Reject outright

- **Any legible text.** Real places are full of it: station signage (`WACHT`, `Fahrscheine`,
  `Perú`), brand names on buildings (Salesforce), shipping labels, place names on maps, "Be
  confident" quote cards, a dated planner (`2021`), a phone's notification or lock screen.
- **Copyrighted content inside the shot** — a cartoon playing on a laptop is somebody else's film.
- **Watermarks and uploader marks**: `youmotion.com`, `Drawify` and their like.
- **Footage that contradicts its line.** This is the defect stock produces most, because a clip is
  long enough to contain an event that reverses the beat:
  - a level crossing where **the train passes**, on "blocked by the platform team"
  - **confetti pouring into** an open box, on "the confirmation email never arrived"
  - a phone **waking with a notification**, on the same line
  - a blank pad where **the ticking never happens**, on "create a launch checklist"

  None of these were visible in the poster frame. They are only visible in the footage.

## The two-pass review

1. **Posters first.** `harvest.py` downloads one small poster per candidate and lays them out side
   by side. This costs nothing near a video download and settles framing, palette, text and whether
   people are present. Tile them **horizontally**: portrait frames stacked vertically make a sliver
   thousands of pixels tall that nothing can be judged from.
2. **Contact sheet second, on the downloaded and trimmed file.** `pick.py` writes a row of frames
   sampled across the clip. Every semantic reversal above got through the poster pass and was caught
   here. A pick is not made until its contact sheet has been read.

## Writing search terms

- Search the **beat's idea**, not its words, and prefer objects, places and weather.
- **Ambiguous words drag in the wrong domain.** "receipt printing till" returned ploughed fields.
- **Absence is the hardest thing to film.** Four rounds on "the confirmation email never arrived"
  each returned something arriving. Atmosphere beats literal emptiness: dust in a shaft of light,
  idle cranes, fog with nothing in it.
- **Pexels returns whole shoots.** Several near-identical clips from one author and one location are
  common; use one, or the cut looks like it is stuck.
- Four dry rounds on one beat means the register is wrong, not the phrasing. Change register. If
  four more fail, report the beat unresolved — a clip that fights its line is worse than none.

## Trimming and encoding

- `pick.py --start N` trims from N seconds in. Use it: a clip often only delivers its subject later.
  The checklist that ticks boxes does nothing for its first six seconds.
- CRF 23, `-an`, `yuv420p`, BT.709 tags, `+faststart`. Audio goes because every clip is muted and
  the narration is the only sound; CRF 20 doubled the size for no visible gain at 1080x1920.
- **No grade.** The house `eq=saturation=1.35:contrast=1.15` exists to rescue 10-bit HLG originals
  that convert flat. Stock arrives as SDR BT.709 and grading it again over-saturates.
- Expect 1–13MB a clip and 45–60MB a video.

## Before reporting

- **Coverage**: every clip at least a second longer than its beat, checked against the narrated
  timeline, not the estimate.
- **Dimensions**: 1080x1920 in the stream, not in the metadata.
- **No clip in two cuts.** Fingerprint the first frame of every clip in `public/` and compare; the
  b-roll convention is that no footage is reused between cuts of the same campaign.
- **Narration identical to the parent**, compared character by character.
- **Provenance is data on the visual, not a comment.** `pick.py` prints the block to paste:

  ```
  visual: clip({
    src: 'clip-03-shipwreck-gaps.mp4',
    source: { provider: 'pexels', id: '39008583', search: 'broken wooden walkway gap',
              author: 'Margo Evardson' },
  }),
  ```

  The id is the durable record — it is what tells you whether the campaign is about to reuse
  footage, and it reconstructs the page URL, which a slug never reliably does. Take the author from
  `lookup(id)`, never from a guess: five of eleven hand-written URLs were wrong in the first cut
  made this way, one of them naming the wrong city. A descriptive comment above the section is
  still welcome — it says *why* this footage, which the data cannot.
