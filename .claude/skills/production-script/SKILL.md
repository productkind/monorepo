---
name: production-script
description: Turn an approved video script into the production script, a Remotion video definition in productkind/video-generator/src/videos/<id>.ts, whose sections cut the narration into beats and whose comments are the visual brief for every beat, so the first frame stops the scroll and every picture carries the story. Plans the visual hook, the cut rhythm, continuity between cuts, safe areas, overlays and hook variants, using the storytelling playbook's experts, then gates it with the production-script-critic. Triggers include "write the production script", "plan the visuals for this video", "turn this script into a video definition", "storyboard this video", or any task that goes from an approved script.md to a video definition.
---

# Production script workflow

The **video-script** skill decides what is said. This skill decides **what the viewer sees, second by second**, and writes it as a video definition: each section is a slice of the approved narration plus one visual, and the comment above each section is the brief for that visual. The model to follow is `productkind/video-generator/src/videos/pm-technical-fluency-validation-09.ts`: read it before writing a new one.

**Why this matters.** Our September videos lost most viewers by 0:01 to 0:02, and their frame one was a gif or stock clip under a burned-in subtitle, with no text hook and no visual hook (`productkind/marketing/storytelling-playbook/research/01-diagnosis.md`). The TikTok review also found that the visuals didn't illustrate the words. Swapping gif for stock changed nothing; what the picture _does_ at each beat is the lever.

**Sources:** the storytelling playbook `productkind/marketing/storytelling-playbook/README.md` (sections 3, 4, 5 and 8), `storytelling-formats.md` in the same folder, and the video generator's own code and conventions.

## Inputs

1. **The approved `script.md`** from the video-script skill: its hooks (text, visual, spoken, second line), second-by-second plan, script, visual notes, format and job. If the script hasn't been through the video-script-critic, send it back there first. **The narration is locked**: this skill never rewords it. If a visual idea needs different words, raise it with the user instead.

   An **older script** without hooks, a plan or visual notes: treat its first sentence or two as the spoken hook, design the text and visual hooks yourself, and say so in the header comment. An existing definition of the same video (a gif cut, for example) is prior art to learn from, not a constraint.

2. **The treatment**, from the script's frontmatter, which decides the visual kind:

   | Picture | Visual in the definition | Who makes the asset |
   | --- | --- | --- |
   | **Motion graphics** (the pm-09 look) | `clip({ src: 'section-NN-keyword.mp4' })` per section | Remotion compositions in `src/clips/<short-id>/`, rendered with `scripts/render-clips.sh`. The composition id is the filename. |
   | **Own screen recording or footage** | `clip({ src, trimBefore })` | Kinga records from the shot list in the header comment. |
   | **Gifs** | `gif({ src, place: 'above-captions' })` | The **video-gifs** skill, from the section briefs. |
   | **Stock footage** | `clip({ src, source })` in runs of 3 to 6 s | The **stock-video** skill. |
   | **Stills** (a screenshot, a proof image) | `still({ src })` | Supplied or made. |

   Mixing is fine and often best: for example, a motion-graphics hook on frame one, then own screen recordings as the proof.

   **The hook beats are always a motion clip or a composed still, whatever the treatment.** Gifs and stock clips can't carry an on-screen text hook (the definition has no text-overlay primitive; captions are the only text), so the sections spoken before about 0:03 are made, with the text hook baked in. Gifs or stock take over after the hook.

3. **The video id**, following the campaign's existing pattern (e.g. `pm-technical-fluency-validation-10`), and the voice (default `voice: 'chloe'`, `model: 'eleven_v3'`, as the other definitions use).

## Step 1: set the visual language

Write it once, in the file's header comment, before any section. Borrow a proven look from outside our category rather than inventing one (Garcia: look to other categories, and fashion first; pm-09 took its pacing from a YouTube Creators video without reusing its assets). State:

- **The look:** shapes, type, colour, texture. Little Parrot's orange-to-green gradient, black ink and white cards are the base. No other brand's logo or assets.
- **The motion rules:** motion clarifies the action in each line and never decorates everything at once. Reserve overshoot and emphasis for the hook and the key beats; no constant bouncing, spinning text or confetti (pm-09).
- **The safe area:** meaningful motion and every word of on-screen copy stays inside it (see Step 4).

## Step 2: design the first three seconds

This is the part of the video the September run lost. Plan frame zero to 0:03 before anything else.

- **Section 0's brief starts with `Frame 0:`**, describing exactly what's on screen in the very first frame, as a still. The builder reproduces it literally, and the critic judges it.
- **Three layers from frame zero** (Garcia): the **text hook** is on screen and **fully set at frame 0** (no type-on, no fade-in from black) and stays readable for at least 0.8 s; the **visual hook** is on screen at frame 0; the **spoken hook** starts at frame 0.
- **Text hook and spoken hook:** different words, same promise. The text complements the spoken line rather than repeating it (Galloway), while never contradicting it or promising something else (Mino's "must match" is about the promise, not the wording).
- **Capitals:** short headlines, labels and stamps may be set in capitals, which is the house motion look (Space Mono caps in pm-09). Never a long sentence in capitals. Galloway's "no all caps" is about YouTube titles, which are read as sentences.
- **Frame one works with the sound off**, as a still. Test: would a screenshot of frame 0 alone make someone want to see what happens next?
- **Pattern disrupt** (Garcia): show what the feed doesn't usually show. Change the angle, add an action, pick a distinct setting. A stamp landing, a card recoiling or a message arriving all count.
- **"Click to unpause"** (Galloway): frame one is a paused moment just before the payoff, mid-action or mid-sentence. Never a logo, a title card with nothing happening, or someone smiling at the camera.
- **A real face or a real screen** where the treatment allows (the TikTok review's next experiment).
- **A visual beat inside two seconds**: pm-09 lands its "STOP SENDING THIS" stamp on the word "stop". Put the first movement on the first stressed word.
- **Nothing covers the hook.** Place the parrot's greet overlay on the first scene cut after 0:03 (pm-09 anchors it to section 3), never on section 0.

## Step 3: cut the narration into sections

- **Copy the narration exactly** from the script's `## Script` section, character for character, including ElevenLabs tags (`[pause]`, `[curious]`). Keep the script's apostrophes and quotation marks as they are. The section texts joined together **are** the narration sent to the voice: a changed word is copy the critics never saw, and it's a new paid take.
- **Cut once per clause, on the word the picture should change on.** Our published gif videos change picture every **2 to 3 seconds**; a hook spoken over several seconds is cut into beats of its own, because leaving it on one picture holds a still over the exact seconds we're measuring (`src/videos/shared/first-feature-hooks.ts`). Stock cuts are the exception: runs of 3 to 6 seconds (the stock-video skill).
- **The 2 to 3 second rule is a maximum hold, not a minimum.** A beat shorter than 2 s ("For three weeks.") is a quick cut, or a move inside a continuing clip. A section longer than about 3 s changes picture inside itself: brief two moves. The **closing ask or question** may hold up to about 5 s, as long as something on screen still moves.
- **Estimate the slot** as words ÷ 3 (about 3 words a second; the video-gifs skill measured 3.03). Real slots come from `timeline.json` after narration.
- **Section texts carry no leading or trailing space.** The pipeline joins them and puts the spacing back (see `Section` in `src/narration/definition.ts`), as pm-09 does.
- **`endsParagraph: true`** on the section that ends each paragraph of the script.
- **Hook variants:** when the script has hooks A, B and C to test, follow the `hook-first-feature` pattern. Put the shared body in `src/videos/shared/<name>.ts`, and give each hook its own definition with `endsTake: true` after the hook's second line, so every variant shares one paid recording of the body. Everything except the opening stays identical across variants, so the test measures the hook alone.

## Step 4: brief every section

Above each section, write a comment that a motion designer, Kinga with a camera, or the gif and stock sourcers can act on without asking. Each brief says:

1. **What the frame shows** and what moves, in the order it happens.
2. **The one on-screen word or phrase**, if any: short, as a label or stamp. Add no sentences beyond the narration, because the captions already carry the words. Text that's part of a depicted object (a chat message, a ticket title, a button label) is fine when it's short and illustrates the line; make it clearly generic, never real data.
3. **How it illustrates this line**, literally. The picture shows the action or object the words name (Parr: "make numbers visual"; the TikTok review: the visuals didn't illustrate the words). A number gets a counter, a comparison gets a split screen, a step gets a cursor doing it.
4. **How it connects to the previous and next cut:** what matches on the cut (a card position, a colour, a screen), so separately made clips read as one continuous story.

**Keep inside the safe area.** Captions are burned in (`src/components/Captions.tsx`), and the platforms draw their own interface:

- **Motion clips** use the pm-09 stage: the top 180 px stays decorative, the right 150 px stays free of essential copy, and the bottom 520 px belongs to captions and the platform controls (`src/clips/pm-09/stage.ts`, `SAFE`). All meaningful motion happens in the upper-middle stage.
- **Gifs and stills** use `place: 'above-captions'`, which keeps them clear of the platform bars (`PLATFORM_UI` in `src/narration/safe-zone.ts`) and sits them on the caption band.

## Step 5: run the loop in pictures

The narration runs Kallaway's loop (stakes, big question, head fake, re-hook). The pictures run it too. Write a **Retention rhythm** list in the header comment, one line per move, the way pm-09 does:

- **Stakes you can see:** the character, the problem object (the vague Slack message), the clock.
- **The big question as an image:** something visibly unresolved (empty reply bubbles, a question mark, a spinner).
- **The head fake as a visual turn:** a hard match-cut, a reveal, a before/after flip on the same screen.
- **A visible thread through the middle:** a progress rail or counter (1/7 to 7/7), cards that accumulate behind the active one, a route that stays on screen. The viewer can see how far along they are and what's still to come.
- **A new visual question before 12 seconds** (Garcia's 12 s mark), and a visual re-hook at every section end, never a static hold where a viewer thinks "OK, I'm done".
- **The payoff resolves the opening image:** the pictures from the hook come back, answered (pm-09: the three question bubbles return and fold away).
- **The end card shows the payoff or the next episode, not a generic CTA:** keep the last real visual on screen and let the ask sit on it. A comment-to-receive or follow ask belongs over the content.
- **The thread depends on the treatment.** Motion graphics carry one object through the whole video (pm-09's report card; a ticket card travelling a route). A gif or stock video can't, so it keeps a thread with a recurring made element instead: the same composed still or clip returning at each section end (a counter, a route map, the opening card), between the sourced visuals.
- **When the viewer is the hero** (a "you" script), show the viewer's own world: their screen, their Slack, their ticket. The pain object is the stakes.
- **Format-specific moves** (from `storytelling-formats.md`): hero's journey shows the pain object, the failed attempts crossed out one by one, and the solution as a visual turn; before and after needs the transition cut synced to a beat and the biggest visible gap; personal learning and win need the proof (a real screenshot) on screen first; checklist needs a numbered counter; level comparison needs a split screen; lesson from others shows the real person or their real words.

## Step 6: overlays

- `riveAtSection({ rive: 'parrot-greet-00.riv', section: N })` on the first scene cut after the hook, and `riveAtSection({ rive: 'parrot-peek-00.riv', section: M })` near the end. Anchor to sections, not frames, so the parrot moves with the narration if the script is edited.
- Note which clips must compose around the parrot while it's on screen, either in those sections' briefs or as a named constant in the clips' `stage.ts` (pm-09's `PARROT_COLUMN`). The greet covers roughly the left 300 px for about three seconds. The peek's footprint isn't documented: check where it appears in the Studio (`npm run studio`) before briefing the end-card clips, and note it in the clips README.

## Step 7: write the file

- **Path:** `productkind/video-generator/src/videos/<video-id>.ts`, a default export of `defineVideo({...})`, importing only what it uses from `../narration/definition`.
- **Header comment:** the title, the script path, the treatment, the visual language, the safe area, the retention rhythm, the transition rules, and for own footage a **shot list** (what to record, from which angle, how long each take needs to run).
- **Register it** in `src/videos/index.ts`: add the import and add it to `VIDEOS`.
- **Asset contract:** every `src` is `section-NN-keyword.<ext>` in `public/<video-id>/` (new motion clips add the short-id prefix, below).
- **Motion graphics get their own clips folder**, `src/clips/<short-id>/` (e.g. `pm-10`, or `pm-04-motion` for a motion cut of an existing video), with its own `stage.ts` that copies pm-09's `SAFE` and names every position that has to match across a cut (`CARD_HOME`, `RAIL` and the like). Name those constants in the briefs. Composition ids are global in Remotion, so **prefix new clip ids and their filenames with the short id**: `src: 'pm-10-section-00-hook.mp4'`, rendered from composition `pm-10-section-00-hook`. (pm-09's bare `section-NN` ids predate this rule.) Register the folder's compositions in `src/Root.tsx`, the way `Pm09ClipCompositions` is.
- **The spoken ask** is shared by every platform the video goes to, so use the comment-to-receive ask from the video-script skill ("Comment on this and we'll send you..."). It works on TikTok, Instagram, YouTube Shorts and LinkedIn alike.

## Step 8: check and hand off

1. `python3 .claude/skills/production-script/scripts/check-text.py <definition.ts> <script.md>` must print OK. For hook variants, run it on each variant against a script.md that contains that hook.
2. From `productkind/video-generator`: `npx eslint src/videos/<video-id>.ts` must pass, and `npx tsc --noEmit` must report **no errors in the new files**. The repo currently has three older errors in `src/LessonVideo.tsx`; don't fix or count those. (`npm run lint` also checks every timeline, so it fails until this video is narrated.)
3. **Critique.** Spawn the `production-script-critic` agent with the definition path, the script.md path and the treatment. Apply its revision brief and re-run it, up to 3 rounds. Show the user the result and what the critic checked.
4. **Hand off**, with the next steps spelled out for the user:
   - **Narration costs money** (ElevenLabs bills per character). Ask before running `npm run narrate -- --allow-generate`; it writes `timeline.json` with the real slots.
   - **Motion graphics:** build the compositions in `src/clips/<short-id>/` from the briefs, then render them with `sh scripts/render-clips.sh <video-id> <clip-id>...`.
   - **Gifs:** the video-gifs skill (it delegates to the video-gif-sourcer agent).
   - **Stock:** the stock-video skill.
   - **Own footage:** the shot list goes to Kinga.
   - Then the **captions** skill.

## Self-check (before the critic)

1. The narration matches script.md exactly (check-text.py OK).
2. Section 0's brief starts with `Frame 0:`, and frame 0 has the text hook fully set, the visual hook and the spoken hook; it works as a silent still. The hook beats are made (a clip or still), even in a gif or stock video.
3. The first visual beat lands inside 2 seconds, on a stressed word.
4. No overlay covers the hook.
5. The picture changes every 2 to 3 seconds (stock: 3 to 6), and each brief says how it illustrates its exact words.
6. There's a visible thread through the middle and a new visual question before 12 s.
7. The payoff visually resolves the opening image, and the end card shows content, not a generic CTA.
8. Everything meaningful stays inside the safe area.
9. The cuts that must match are named in the briefs.
10. The format's visual move is there (proof, gap, counter, split screen, real person).
11. It's registered in `index.ts` (and any new clips folder in `Root.tsx`).
12. eslint passes, and tsc shows no errors in the new files.
