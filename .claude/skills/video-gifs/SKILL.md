---
name: video-gifs
description: Find, judge and wire up giphy gifs for the sections of a narrated Remotion video in productkind/video-generator, fitted to each section's on-screen slot. Use when a video definition needs visuals, when placeholder gifs have to be replaced, or when one beat's gif is wrong. Triggers include "find gifs for this video", "source the gifs", "replace the placeholder visuals", "find a better gif for section N".
---

## Video gifs

A narrated video is a list of sections, each with a line of narration and one visual. The narration
timing is already decided by `npm run narrate`, so every section has a fixed slot in seconds and
the job is to find a gif that says the right thing, reads at 1080 wide, and behaves inside that
slot. Three bundled scripts in `scripts/` do the searching, downloading and checking; the judging
is yours.

Reach for this when:
- A new video definition has `searches` or placeholder visuals and needs real gifs.
- One beat's gif is wrong: too repetitive, wrong subject, text you spotted late.
- You are about to publish and want the frame checks run.

### Delegate the harvest loop

The judging loop is the expensive part of this skill: every montage read and every harvest listing stays
in context and gets re-billed on each later turn. **Hand the whole loop to the `video-gif-sourcer`
subagent** — give it the video id and the section list (text plus slot seconds), and it returns the picks,
already downloaded and measured, with the timing knob for each. Its context absorbs the montages instead
of yours. Follow the rest of this file yourself when you are the one judging, and when you want to replace
a single beat rather than source a whole video.

### Where things live

- Definitions: `productkind/video-generator/src/videos/<video-id>.ts`
- Assets: `productkind/video-generator/public/<video-id>/section-NN-keyword.gif`
- Slots: `public/<video-id>/timeline.json`, written by narrate. If it is missing, either run
  `npm run narrate -- --allow-generate` from the video package first, or source against estimated
  slots and pass `--slot <seconds>` to `harvest.py` and `pick.py`. Estimate a slot as the section's
  word count divided by **3.03 words per second**, measured from video 1's real narration (139
  words, 45.8s). That is close enough to choose gifs by, but the timing knobs have to be re-checked
  with `verify.py` once the real timeline exists.

Assets belong to the video that uses them. `assets` is per video, so never borrow another video's
folder or symlink into it (see Gotchas).

### The three scripts

Run them from this skill's base directory (the paths below are relative to it). `ffmpeg` and
ImageMagick are already installed.

**Search keys and the hourly cap.** Giphy allows **100 searches per key per hour**, resetting on the
hour — a full video sits right at that ceiling, so `.env` holds a pool: `GIPHY_API_KEY_POOL_0`, `_1`,
`_2` (free keys from https://developers.giphy.com/), plus `KLIPY_API_KEY` as a different provider.
`search()` handles all of it and there is nothing to pass on the command line:

- **Rotation** — each search goes to the pooled key with the fewest searches this hour, so the load
  spreads instead of burning the first key to its cap.
- **A key that hits 429 is retired for the hour and never retried**, in that process or any later
  one. The counts and cooldowns live in `$TMPDIR/gif-candidates/.provider-state.json`, because a
  video's harvest runs as dozens of short-lived processes.
- **When every giphy key is spent, Klipy serves the search** (`api.klipy.com/v2/search`, Tenor-shaped)
  and its items are normalised into the giphy shape, so nothing downstream changes. It prints
  `all giphy keys spent this hour; searching klipy` when it switches.
- Klipy originals don't live at a giphy URL, so `search()` records each item's real URL in
  `.sources.json` and `download_original` looks it up. Picking a Klipy gif needs no extra flag.

If a run dies with "No search provider available", every giphy key is cooling *and* `KLIPY_API_KEY`
is missing — the message names the keys and the minutes left. Wait for the hour, don't add keys you
don't own.

**1. `harvest.py` — search, filter, order, montage.**
```
scripts/harvest.py --video <video-id> --section 10 \
    --terms "woman raising hand" "businesswoman asking question" \
    [--skip id1,id2] [--show 7] [--limit 25] [--provider giphy|klipy]
```
Searches every term at `rating=g`, drops anything not squarish (aspect 0.7–1.5) or under 380px
wide, measures each candidate's real duration from its frame delays, and orders them by how close
**one play** comes to filling the slot. It prints a numbered list and writes one montage whose rows
match that list, top to bottom. Read the montage; the script chooses nothing.

**`--provider` picks the catalogue, and the two are not interchangeable.** Giphy is deeper in
footage and reaction clips, Klipy in flat vector illustration and sticker sets. Left alone, Klipy is
only ever reached by spending all 300 giphy searches for the hour, so a beat that only Klipy can
serve costs an hour of quota to discover. When four rounds on giphy return nothing, try
`--provider klipy` with the same terms before changing register again — and the reverse, because a
run that started on Klipy has seen none of giphy's footage. Video 7's §11 went thirteen rounds
partly for this reason. Measure the duration of anything you shortlist **after** downloading it:
the search result describes a preview, and one §11 candidate was 3.4s in the list and 6.0s on disk.

**2. `pick.py` — download at full size and report the fit.**
```
scripts/pick.py --video <video-id> --pick 10=w5xEwipLyIBMdINSvn:hand-up --pick 13=Ie8ncf:question
```
Writes `public/<video-id>/section-10-hand-up.gif`, then prints the definition line for it,
including the timing knob the gap calls for and, when the gif sits on a flat colour, the `color`
that letterboxes it in that colour. Paste the lines yourself so the definition stays hand-authored.

**3. `verify.py` — the checks that catch real defects.**
```
scripts/verify.py --video <video-id>            # frames, stills and serving
scripts/verify.py --video <video-id> --frames   # 8 frames of every chosen gif
```
`--frames` montages eight evenly spaced frames of each gif, which is how you catch text that only
appears late. `--stills` renders one composed frame per section from the real composition, captions
and parrot overlay included. `--serve` starts Studio and fetches every gif through its static
server. `--backgrounds` compares each gif's own edge colour with the `color` its section declares.
A full run does all four and finishes with a fit table for the whole video.

**4. `fit.py` — the pass to make straight after narrating.**
```
scripts/fit.py --prefix pm-technical-fluency     # every narrated video in a campaign
scripts/fit.py --video <video-id>
```
Every rate set before a script is narrated is a guess: the word-count estimate runs about 20% out,
and only narration gives the real slot. This prints each section that now restarts mid-beat and the
`playbackRate` that fixes it, across a whole campaign in one go. Run it after every `npm run
narrate`, including a **re-narration**: editing narration moves the slots again. Adding an
ElevenLabs `[pause]` tag to a closing question lengthened the *previous* section by 1.3 seconds,
because a section starts on its first spoken word, so the silence belongs to the beat before it.

**5. `used-ids.py` — what the campaign has already spent.**
```
scripts/used-ids.py --prefix pm-technical-fluency          # one id per line
scripts/used-ids.py --prefix pm-technical-fluency --where  # and where each is used
```
A campaign of eight videos will repeat a gif unless the sourcer is handed the ids already in use.
Generate the list with this rather than grepping the definitions: a provenance comment holds a URL,
and only giphy URLs carry the id in the path, so a grep silently misses every klipy pick. That gap
is not cosmetic — two of video 7's picks repeated video 5 because the list they were checked
against held klipy URLs where the sourcer was comparing klipy ids. The script resolves them through
`.sources.json` and tells you if any URL no longer has an id, which happens when the candidate
cache has been cleared since the pick was made.

### Letterboxing a flat background

A gif with a solid background renders with a hard rectangle around it, because the frame behind it
is house purple. Matching the letterbox to the gif's own colour makes the edge disappear, and
`pick.py` works it out at download time — no eyeballing, no colour picker.

The rule is deliberately narrow: **90% of the border ring, across every frame, within a tolerance
of 10 levels**. A flat card behind an illustration lands at 0.94–1.00 and a photograph never gets
near it, so acting on the answer unasked is safe. What that misses is the awkward middle — a white
card whose artwork bleeds off one edge scores about 0.78 and is left alone rather than guessed at.
Those are rare; set them by hand when you spot one in the composed stills.

Transparent-edged gifs are left alone too. They composite onto whatever is behind them, so there
is no seam to remove.

`scripts/verify.py --video <video-id> --backgrounds` runs the same check over a video already
wired up, which is how 60 sections across the first campaign were found and fixed in one pass.

### Writing search terms

Search the **idea of the beat**, not the words of the line. "You don't know what that means for
your release" is a shrug, not a release. Give each beat three or four terms in different registers
— a person, a cute character, an abstract object — because Giphy's stock varies wildly by phrasing
and one register is usually clean while the others are all memes.

**Who the audience is.** Practising, generalist software Product Managers without a
software-engineering background (campaign brief). Pick scenes they recognise from their own week:
stand-ups, laptops, calendars, message threads, a meeting where someone is talking. Avoid the
industry's stock imagery of technical work — hoodies in dark rooms, server racks, walls of green
code, "genius coder" framing. It describes a job the viewer does not have and is not trying to get.

**Never make the viewer the butt of the joke.** Half these beats are about not understanding
something. A gif that mocks the person who doesn't know puts the audience on the wrong side of it.
Confusion beats are safest on a cute character or an object.

**People are women.** The campaign brief: *"Little Parrot's channel signals continue to prioritise
women in product and women in tech."* In practice:

- Any term that will return people names a woman — `"woman raising hand"`, not `"raising hand"`.
- If the beat is about a technical role or a technical conversation, the person shown is a woman.
  No exceptions: this is the imagery the account exists to change.
- Across one video, women are the majority of the people shown. A video where every person is a
  man is a defect, however good each gif is on its own.
- Watch the arc, not just the count. These scripts run recognition → transformation: nodding along,
  not asking, then asking, saying it back, understanding. If the women land on the confused beats
  and men land on the explaining and understanding beats, the video says something we don't mean.
  Cast the transformation beats first, and cast them with women.
- Cute characters, animals and objects read as no gender at all. They are the easy way to carry
  the recognition beats without putting a woman in every unflattering frame.

### Judging the montage

**Check that something actually moves.** Giphy is full of still photos with a jittering overlay:
`section-18-comment.gif` in video 2 carried 16 frames and 3.6 seconds, passed duration, dimension,
text and loop-seam checks, and its entire animation was the speech bubble's outline wobbling by a
pixel while the cat stayed pixel-identical. `harvest.py` now drops candidates whose frame-to-frame
change is under 0.02 and prints the value (`m0.14`) for the rest; `verify.py` flags any chosen gif
that falls under it. Both use `motion()` in `common.py`.

Reject outright:
- **Burned-in captions or subtitles.** Most of Giphy's meme stock has them. This kills more
  candidates than anything else.
- **Watermarks and branding**: channel bugs, studio logos, sponsor walls, branded kit, a URL in
  the corner.
- **Character sticker packs from brand and NFT accounts.** Pudgy Penguins, VeeFriends, Selfless
  Sloth, Leiturinha, MEETQUACK and their like dominate the cute-character results, and nearly every
  one carries its wordmark burned in: a small caption under the character, a corner logo, or a faint
  repeating tile across the background that only shows on zoom. They are the single biggest source
  of near-misses, because the character itself is exactly the register these videos want. Treat the
  uploader name in a candidate's title as a warning to zoom in before believing the thumbnail.
- **Text that appears late.** Today's rejects included gifs that only added "OUCH", "SHHH",
  "WUT?", "I'm late!" and "TAP HERE" in their final third. Judge from eight frames, never four.
- **16:9.** It renders as a thin band between the platform bar and the captions. The filter already
  drops the worst of it; trust your eye on the rest.

Prefer, in this order: cute 3D characters and animals, flat illustration, clean unbranded footage.
`public/social-016/` is the reference for what the published videos look like — rendered creatures
and plain real-world footage, no text anywhere.

One licensing note: a lot of Giphy's stock is lifted TV and film. It is normal on social and the
existing videos use it, but for footage beats the safer source is stock video (Pexels, Pixabay)
dropped in through `clip({ trimBefore })`, which the definition already supports and which sidesteps
both the watermark problem and the duration problem.

### Fitting the slot

Longer than its slot is fine — it plays until the cut. The defect to design against is a **short
gif restarting mid-beat**. Two knobs, both already plumbed through `gif()`:

| Gif vs slot | What to do |
|---|---|
| gif ≥ slot | Nothing. It gets cut, which nobody notices. |
| longer, but the motion has to complete (a drawing, a build, a reveal) | `playbackRate: <gif seconds / slot seconds>`, above 1 here, so the whole motion lands inside the beat. |
| shorter, motion is cyclic *and* the loop seam is invisible | Nothing. The repeat cannot be seen. Check it rather than assuming: `verify.py` prints each looping section's seam, and in practice most gifs that look cyclic still jump. |
| shorter, motion is one-shot (a zip, a topple, a drawing) | `playbackRate: <gif seconds / slot seconds>` — one pass across the whole beat, still moving at the cut. |
| shorter by more than ~40% | Don't slow it below ~0.6, that reads as slow motion. Loop it if cyclic, otherwise pick another gif. |

**Never hold a frozen last frame.** `loopBehavior: 'pause-after-finish'` exists and looks like the
obvious fix for a one-shot gif, but a still picture in the middle of a video where the captions and
the parrot keep moving reads as a stall, as though the render broke. Slow the gif instead: the
motion still resolves inside the beat, and the picture is alive at the cut. Both PM fluency videos
were built with holds first and converted, so this is settled, not a preference to re-litigate.

A gif's own duration is not the whole story: **measure the loop seam before trusting a loop.** Of
the six sections left looping across the two PM fluency videos, all six had a visible seam, and the
three whose rate stayed above the floor were slowed instead. `verify.py`'s fit table prints it.

`pick.py` prints the recommendation for gifs shorter than their slot; the cyclic-or-one-shot call
is yours, because no measurement tells you that, and so is the speed-up case, because only you know
whether the motion has to finish. A one-shot ending on its last frame is often the better picture anyway — a
question mark that finishes drawing itself is a good last frame for a video.

Record provenance in the definition, above each visual:
```ts
{
  // giphy "woman raising hand": https://giphy.com/gifs/w5xEwipLyIBMdINSvn
  text: "If you’d rather be the one who asks these questions,",
  visual: gif({ src: 'section-10-hand-up.gif', place: 'above-captions' }),
},
```

### Before you call it done

- `scripts/verify.py --video <video-id>` — frames, composed stills, letterbox colours, serving,
  fit table.
- From the video package: `npx eslint src/videos`, `npx tsc --noEmit`, and
  `npm run narrate -- --check` (visuals don't affect timing, so this should stay green).
- Look at the composed stills. A gif that reads on its own can still be unreadable at 380px wide
  behind two lines of caption.
- Count the people across the video against the rules above.

### Gotchas

- **Remotion's static server skips symlinks.** It serves `public/` under `/static-<hash>/` and its
  file map only includes real files, so a symlinked placeholder 404s while looking fine on disk.
  Hard links work, but git stores their full content, so a folder of hard-linked placeholders
  commits as a full duplicate. Real files only.
- **Measure duration on `fixed_height` or the original.** The `_downsampled` variants drop frames,
  so their delays report a duration the shipped file doesn't have.
- **Giphy access**: `giphy.com` 403s scripted requests, `api.giphy.com` needs a key (the old public
  beta key `dc6zaTOxFJmzC` returns BANNED), and `media.giphy.com/media/<id>/giphy.gif` downloads
  directly with no key at all. If you have no key yet, the web app's own key can be read out of a
  giphy.com page for a one-off run — never bake it into anything that ships.
- **zsh does not word-split unquoted variables.** `for id in $ids` iterates once over the whole
  string. Use an explicit list, or do the loop in Python.
- **ImageMagick here has no fonts**, so `label:` fails. Don't try to caption montages; keep the
  printed list and the montage rows in the same order instead.
