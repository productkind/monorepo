# Video 9's clips

The motion-graphics clips for `pm-technical-fluency-validation-09`, rendered here rather than sourced from a catalogue. Three of nineteen exist so far: sections 0, 1 and 2.

```console
npm run studio    # the "pm-09-clips" folder
sh scripts/render-clips.sh pm-technical-fluency-validation-09 section-00-product-managers
```

A composition's id **is** its filename. That is the whole contract between this folder and the video definition, and it is why the render script needs no table of its own.

## The look

Cut paper, not interface. Every card, bubble and strip is a flat fill with a thick black outline and a hard black shadow offset down and right. No soft shadows and no blur anywhere: an outline survives being watched at phone size where a soft edge disappears, and a blur costs a filter pass on every rendered frame.

Type is Space Mono in capitals for anything stamped or labelled, Inter for anything that is meant to read as somebody's own typing. Little Parrot's gradient, black ink, white cards.

No product's logo appears on the message card. The channel line and the shape do the recognising, which is what the brief asks for and the only version of that card we are entitled to draw.

## The stage

`stage.ts` holds the brief's safe area and every box the three clips place. It is separate from the drawing and it is tested, so moving a card is checked against TikTok's rail and the caption band before anything is re-rendered rather than after somebody watches it back.

`CARD_HOME` is one constant used by all three clips on purpose. The brief asks the cuts to match on the message card, and a card that rests at 750 in one clip and opens at 748 in the next reads as a jump long before anybody finds the two numbers.

## Two decisions the brief left open

**The gradient field arrives in clip 2.** Clip 3's brief already wants a white card standing on the field, so the video has to leave its cold open somewhere. It wipes in underneath a beat that is already moving, which costs nothing; on its own it would cost a beat.

**The stamp in clip 1 crosses the card's upper half**, not its middle. Straight across the centre buries "I found a bug", and the beat only works if the message and the stamp are readable together: the narration names the message while the stamp answers it.

## The durations are estimates

`SECTION_00_FRAMES` and its two siblings were set from the word counts, calibrated against video 8's timeline at roughly nine frames a word. There is no `timeline.json` for video 9 yet, because that needs `npm run narrate` and an API call per take.

Each clip is built so this is safe in both directions: all of its motion lands in the first two thirds and the rest is a hold, so a clip cut short by a shorter slot loses only held frames, and one that outlasts its slot was going to be cut there anyway. Once the narration exists, set the three constants to the real slot lengths and re-render.

## The nineteen clips

All of them now exist. The three scenes they divide into, and the rules that hold across cuts:

| clips | what they are | what has to match across the cut |
| --- | --- | --- |
| 0 to 2 | the cold open, on black | `CARD_HOME`, `STAMP` |
| 3 to 6 | the engineer and his three questions, on the gradient field | `QUESTION_SLOTS`, `QUESTION_STAGE`, `EMPHASIS_SLOT` |
| 7 to 14 | the seven answers | `RAIL`, `STEP_CARD` |
| 15 to 18 | the finished report, saved, then the next episode | `DEVTOOLS`, `ReportCard` |

Every one of those is a constant in `stage.ts` shared by the clips either side of a cut, which is the only reason eight separately rendered files read as one continuous stack being worked through.

Two shapes are shared as components rather than as numbers, for the same reason. `ProfilePanel` is one component because sections 11 and 12 are a hard match-cut of the same screen under two labels, and `ReportCard` is one because sections 15, 16 and 17 all show it.

## The parrot

`parrot-greet-00` is anchored to section 3. It covers roughly the left 300 pixels for about three seconds, which is all of clip 3 and the first thirty frames of clip 4, so those two compose right of `PARROT_COLUMN` and the tests hold them to it. Clips 5 and 6 keep the same bias even though the bird has gone, because a stack that slides left mid-scene reads as the stack moving.
