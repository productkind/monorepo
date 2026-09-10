import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A b-roll cut of "Done, and your users still don't have it", the PM technical fluency campaign's
 * video 4.
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-4-done-and-users-still-dont-have-it/script.md
 *
 * Same narration as `pm-technical-fluency-validation-04`, so the audio cache serves this one the
 * take it already generated rather than paying ElevenLabs for the same words twice. The narration
 * has to stay character-identical for that to hold: edit the words here and this becomes a new
 * take at full price.
 *
 * Where that video cuts eighteen times to a gif per clause, this one holds twelve clips of two to
 * six seconds. The grouping comes from the narrated timeline rather than a timer, so every cut
 * still lands on a clause boundary, and no run crosses a paragraph break.
 *
 * The script is about something finished that has not arrived, so the cut opens on loaded vans
 * standing still and spends its first half on waiting: tied-up boats, water arriving again and
 * again, dogs asleep in the shade.
 *
 * Footage is Tamas's own, from productkind's library, and no clip here appears in another b-roll
 * cut. **This is the fifth b-roll cut from that library and it is now spent.** Of the clips that
 * were portrait, unused and long enough, what remained after the earlier cuts was largely one
 * coastline: seven of these twelve are water, runs 9 to 11 are three water shots in a row, and
 * run 2 carries its beat only by reading a tide as a monthly cycle. The unused remainder is a zoo
 * and golf trip — pandas, monkeys, an elephant, fairways — which cannot carry a beat in this
 * campaign. A sixth cut needs new footage, not better searching.
 *
 * Every clip is a second longer than the beat it covers, because `clip` has no playback rate and
 * no loop: one that ran out would hold a frozen frame while the captions and the parrot kept
 * moving. Each file is trimmed to its beat plus that second, cropped to fill 1080x1920, graded
 * `eq=saturation=1.35:contrast=1.15` and transcoded to H.264 with BT.709 tags, since the originals
 * are 10-bit HLG HEVC that Chromium cannot decode and that convert flat.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-04-b-roll',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // IMG_8108: Vans standing in a cobbled square, going nowhere. Built, loaded, not delivered.
      text: 'Engineering says it’s done. Your users still don’t have it.',
      visual: clip({ src: 'clip-00-vans-parked.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8734: A harbour with the boats tied up, panning out to open water. Waiting behind somebody
      // else’s schedule.
      text: 'It’s built, it’s tested, and it’s waiting behind another team’s release.',
      visual: clip({ src: 'clip-01-harbour-waiting.mp4' }),
    },
    {
      // IMG_8634: A flat shoreline and still water. A monthly release cycle has the rhythm of a tide, which is
      // the loosest reading in the cut.
      text: 'Nobody told you that team ships once a month.',
      visual: clip({ src: 'clip-02-tide-once-a-month.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8513: The same shallow water arriving again and again, for saying the same thing three weeks
      // running.
      text: 'You’ve been telling your stakeholder it’s coming this week. For three weeks.',
      visual: clip({ src: 'clip-03-waves-three-weeks.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8868: A half-standing timber frame among rocks. Finished, in the part of it you built.
      text: 'Done meant finished in your part of the system.',
      visual: clip({ src: 'clip-04-your-part-only.mp4' }),
    },
    {
      // IMG_8614: A park cafe with the tables full. Where the users actually are, which is not where done was
      // declared.
      text: 'That isn’t the same as live for your users.',
      visual: clip({ src: 'clip-05-where-users-are.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8723: A track through grass to the shore. Wanting to know where the thing actually is, and the
      // learning path that answers it.
      text: 'If you want to know where your feature actually is, we’re building a learning path for it.',
      visual: clip({ src: 'clip-06-where-it-actually-is.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8509: Following a shoreline path past buildings and breakwaters: review, testing, environments,
      // one after another.
      text: 'By the end you’ll be able to follow one change through review, testing, environments',
      visual: clip({ src: 'clip-07-route-through.mp4' }),
    },
    {
      // IMG_7647: Dogs asleep in the shade under a big tree. Everything it is waiting on, in no hurry.
      text: 'and every team it waits on, and say exactly what’s holding it up.',
      visual: clip({ src: 'clip-08-teams-it-waits-on.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8512: Looking down into shallow water over stones, so the CTA beat looks downward.
      text: 'The waitlist link is in the comments.',
      visual: clip({ src: 'clip-09-pebbles-below.mp4' }),
    },
    {
      // IMG_8516: A rainbow standing over the bay, for the line about the learning path opening.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({ src: 'clip-10-rainbow-opens.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8720: A rocky island across open water. Room to think about the closing question.
      text: '[pause][curious] How often do you release new improvements for your users?',
      visual: clip({ src: 'clip-11-island-question.mp4' }),
    },
  ],
})
