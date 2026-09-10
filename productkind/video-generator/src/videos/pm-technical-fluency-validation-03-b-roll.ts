import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A b-roll cut of "You said yes to a simple feature", the PM technical fluency campaign's video 3.
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-3-said-yes-to-a-simple-feature/script.md
 *
 * Same narration as `pm-technical-fluency-validation-03`, so the audio cache serves this one the
 * take it already generated rather than paying ElevenLabs for the same words twice. The narration
 * has to stay character-identical for that to hold: edit the words here and this becomes a new
 * take at full price.
 *
 * Where that video cuts twenty-one times to a gif per clause, this one holds thirteen clips of two
 * to six seconds. The grouping comes from the narrated timeline rather than a timer, so every cut
 * still lands on a clause boundary, and no run crosses a paragraph break.
 *
 * The script is about being on the outside of somebody else's system, so the footage is fences,
 * walls and arches: a railing with a garden behind it, a lane under a town wall, and then a way
 * through once the video turns.
 *
 * Footage is Tamas's own, from productkind's library, and no clip here appears in another b-roll
 * cut. Every clip is a second longer than the beat it covers, because `clip` has no playback rate
 * and no loop: one that ran out would hold a frozen frame while the captions and the parrot kept
 * moving. Each file is trimmed to its beat plus that second, cropped to fill 1080x1920, graded
 * `eq=saturation=1.35:contrast=1.15` and transcoded to H.264 with BT.709 tags, since the originals
 * are 10-bit HLG HEVC that Chromium cannot decode and that convert flat.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-03-b-roll',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // IMG_8612: A park cafe, cups and plates on the table and people talking at the tables behind. The room
      // the request gets made in, over coffee, sounding like nothing.
      text: 'A stakeholder asked for something simple. Just sync it with the CRM.',
      visual: clip({ src: 'clip-00-cafe-request.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8486: Open meadow under a flat sky. Two weeks in which nothing appears to be wrong.
      text: 'You said yes. Two weeks in,',
      visual: clip({ src: 'clip-01-meadow-said-yes.mp4' }),
    },
    {
      // IMG_8843: Tracking along a railing with a garden on the far side. The vendor's system: visible,
      // working, and behind a fence you are not on the inside of.
      text: 'engineering tells you the integration doesn’t have that field, and it’s the vendor’s system.',
      visual: clip({ src: 'clip-02-fence-vendor.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8688: A bronze statue outside a grand building. A date you have already promised is cast, not
      // pencilled.
      text: 'You already promised the date. Now you’re renegotiating something you’d already said yes to.',
      visual: clip({ src: 'clip-03-statue-promised.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8800: A lane running along the base of a town wall. Nobody showed you how to see over it, and from
      // down here you cannot.
      text: 'You couldn’t have known. Nobody showed you how to check what the connecting system can do.',
      visual: clip({ src: 'clip-04-wall-couldnt-know.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8752: A palace front with its towers. What being sure of something looks like from the outside.
      text: 'If you want to be more confident about the complexity of a new feature before you commit,',
      visual: clip({ src: 'clip-05-tower-confident.mp4' }),
    },
    {
      // IMG_8483: A made path between lamp posts and planted beds. Somebody laid this one out, which is the
      // difference between a path and a walk.
      text: 'we’re building a learning path for it.',
      visual: clip({ src: 'clip-06-park-path.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8507: A wall of bookshelves, panning. The documentation, which exists and is not the problem.
      text: 'By the end you’ll be able to open the documentation',
      visual: clip({ src: 'clip-07-bookshelves-docs.mp4' }),
    },
    {
      // IMG_8711: Out through a stone arch onto the park beyond. Seeing what is actually on the other side,
      // which is the whole payoff.
      text: 'for the integrations you already pay for, see which fields they actually expose,',
      visual: clip({ src: 'clip-08-archway-through.mp4' }),
    },
    {
      // IMG_8518: A rainbow over the harbour. Knowing the answer before you give it.
      text: 'and know whether the request is possible before you answer.',
      visual: clip({ src: 'clip-09-rainbow-possible.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8714: Reeds and water. The weakest fit in the cut: the CTA beat wants downward movement and this
      // library has almost none, so it holds still instead of pointing anywhere.
      text: 'The waitlist link is in the comments.',
      visual: clip({ src: 'clip-10-reeds-comments.mp4' }),
    },
    {
      // IMG_8727: A tree-lined promenade opening along the water, for the line about the path opening.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: clip({ src: 'clip-11-promenade-opens.mp4' }),
      endsParagraph: true,
    },
    {
      // IMG_8626: An island under a wide sky, panning slowly. Room to think about the closing question.
      text: '[pause][curious] What ‘simple’ request turned out hardest?',
      visual: clip({ src: 'clip-12-island-question.mp4' }),
    },
  ],
})
