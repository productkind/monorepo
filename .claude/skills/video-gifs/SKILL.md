---
name: video-gifs
description: Find, judge and wire up giphy gifs for the sections of a narrated Remotion video in little-parrot/content/video, fitted to each section's on-screen slot. Use when a video definition needs visuals, when placeholder gifs have to be replaced, or when one beat's gif is wrong. Triggers include "find gifs for this video", "source the gifs", "replace the placeholder visuals", "find a better gif for section N".
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

### Where things live

- Definitions: `little-parrot/content/video/src/videos/<video-id>.ts`
- Assets: `little-parrot/content/video/public/<video-id>/section-NN-keyword.gif`
- Slots: `public/<video-id>/timeline.json`, written by narrate. If it is missing, run
  `npm run narrate -- --allow-generate` from the video package first; nothing here can guess timing.

Assets belong to the video that uses them. `assets` is per video, so never borrow another video's
folder or symlink into it (see Gotchas).

### The three scripts

Run them from this skill's base directory (the paths below are relative to it). They read
`GIPHY_API_KEY` from the environment or from `.env` at the repo root — get a free key at
https://developers.giphy.com/. `ffmpeg` and ImageMagick are already installed.

**1. `harvest.py` — search, filter, order, montage.**
```
scripts/harvest.py --video <video-id> --section 10 \
    --terms "woman raising hand" "businesswoman asking question" \
    [--skip id1,id2] [--show 7] [--limit 25]
```
Searches every term at `rating=g`, drops anything not squarish (aspect 0.7–1.5) or under 380px
wide, measures each candidate's real duration from its frame delays, and orders them by how close
**one play** comes to filling the slot. It prints a numbered list and writes one montage whose rows
match that list, top to bottom. Read the montage; the script chooses nothing.

**2. `pick.py` — download at full size and report the fit.**
```
scripts/pick.py --video <video-id> --pick 10=w5xEwipLyIBMdINSvn:hand-up --pick 13=Ie8ncf:question
```
Writes `public/<video-id>/section-10-hand-up.gif`, then prints the definition line for it,
including the timing knob the gap calls for. Paste the lines yourself so the definition stays
hand-authored.

**3. `verify.py` — the checks that catch real defects.**
```
scripts/verify.py --video <video-id>            # frames, stills and serving
scripts/verify.py --video <video-id> --frames   # 8 frames of every chosen gif
```
`--frames` montages eight evenly spaced frames of each gif, which is how you catch text that only
appears late. `--stills` renders one composed frame per section from the real composition, captions
and parrot overlay included. `--serve` starts Studio and fetches every gif through its static
server. It finishes with a fit table for the whole video.

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

Reject outright:
- **Burned-in captions or subtitles.** Most of Giphy's meme stock has them. This kills more
  candidates than anything else.
- **Watermarks and branding**: channel bugs, studio logos, sponsor walls, branded kit, a URL in
  the corner.
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
| shorter, motion is cyclic (a loop, a bob, tumbling) | Nothing. The repeat is invisible. |
| shorter, motion is one-shot (a zip, a topple, a drawing) | `loopBehavior: 'pause-after-finish'` — plays once, holds the last frame. |
| shorter by more than ~15%, and slowing looks natural | `playbackRate: <gif seconds / slot seconds>` — one pass across the whole beat. |
| shorter by more than ~40% | Don't slow it below ~0.6, that reads as slow motion. Loop it if cyclic, otherwise pick another gif. |

`pick.py` prints the recommendation; the cyclic-or-one-shot call is yours, because no measurement
tells you that. A one-shot ending on its last frame is often the better picture anyway — a
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

- `scripts/verify.py --video <video-id>` — frames, composed stills, serving, fit table.
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
