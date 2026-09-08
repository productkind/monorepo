import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 8 of the vibe coder campaign, "Can you run your own app?".
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-8-independent-without-becoming-an-engineer/script.md
 *
 * The CTA is the LinkedIn / YouTube Shorts variant ("link in the comments"), which is the script
 * as written. TikTok and Instagram Reels need the URL spoken and shown instead, so they want a
 * second definition rather than a re-edit of this one.
 *
 * Cut at clause level. The three failures and the three choices each get their own beat, because
 * in both lines the point is that they are separate things.
 *
 * Sections 7 and 16 are both about restoring a working version and carry different pictures: a
 * reset being pressed, then a wilted plant coming back. The campaign already spent the rewind
 * icon and the undo shortcut on this idea in videos 1 and 2.
 *
 * Being the last video of eight, most of the obvious pictures were already used, so more of these
 * are metaphors than in the earlier videos. Where a gif is shorter than its slot it is slowed to
 * cover the beat in one pass, rather than held on a frozen last frame: a still picture reads as a
 * stall while the captions and the parrot keep moving. The rates come from the narrated timeline,
 * so re-run the video-gifs skill's `fit.py` if this script is ever re-narrated.
 */
export default defineVideo({
  id: 'vibe-coder-validation-08',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      text: 'Can you run your own app?',
      visual: gif({
        src: 'section-00-woman-laptop.gif',
        source: {
          provider: 'giphy',
          id: '8Ajneno4pXzcLCAJ6d',
          search: 'confused woman laptop screen',
        },
        color: '#ffffff',
        playbackRate: 0.88,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'You built it with AI.',
      visual: gif({
        src: 'section-01-ai-robot-chat.gif',
        source: {
          provider: 'giphy',
          id: 'f03np8FngnDDweFsCR',
          search: 'woman typing chat message bubble',
        },
        color: '#ffffff',
        playbackRate: 0.91,
        place: 'above-captions',
      }),
    },
    {
      text: 'Then a customer can’t sign in,',
      visual: gif({
        src: 'section-02-dog-confused.gif',
        source: {
          provider: 'giphy',
          id: 'lJ3ACuJvy4rOu0W5qw',
          search: 'cute dog head tilt confused phone',
        },
        playbackRate: 0.8,
        place: 'above-captions',
      }),
    },
    {
      // klipy "money disappearing poof animation": sped up so the dissolve finishes in the beat,
      // which is the shortest in the video.
      text: 'a payment fails,',
      visual: gif({
        src: 'section-03-payment-dissolve.gif',
        source: { provider: 'klipy', search: 'money disappearing poof animation' },
        color: '#ffffff',
        playbackRate: 1.35,
        place: 'above-captions',
      }),
    },
    {
      // klipy "red crack lightning bolt icon flat": a bolt flickering over a broken screen.
      text: 'or a change breaks another screen.',
      visual: gif({
        src: 'section-04-lightning-glitch.gif',
        source: { provider: 'klipy', search: 'red crack lightning bolt icon flat' },
        color: '#3c3a3c',
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // klipy "lightbulb idea moment animation cute": an egg cracking open into a lightbulb.
      text: 'The AI gives you an answer.',
      visual: gif({
        src: 'section-05-penguin-idea.gif',
        source: { provider: 'klipy', search: 'lightbulb idea moment animation cute' },
        playbackRate: 0.95,
        place: 'above-captions',
      }),
    },
    {
      // klipy "woman tapping chin thinking": deciding, before she decides.
      text: 'You decide whether to publish the fix,',
      visual: gif({
        src: 'section-06-woman-thinking-smile.gif',
        source: { provider: 'klipy', search: 'woman tapping chin thinking' },
        playbackRate: 0.83,
        place: 'above-captions',
      }),
    },
    {
      // A crane folding back into shape: the first of the two restore beats.
      text: 'restore the working version',
      visual: gif({
        src: 'section-07-origami-refolds.gif',
        source: {
          provider: 'giphy',
          id: 'w2LZiPMMzMgUW0KNNe',
          search: 'origami refolding paper animation',
        },
        color: '#0d0808',
        place: 'above-captions',
      }),
    },
    {
      // klipy "detective magnifying glass clues": a bear detective looking for more.
      text: 'or collect more evidence.',
      visual: gif({
        src: 'section-08-detective-bear.gif',
        source: { provider: 'klipy', search: 'detective magnifying glass clues' },
        playbackRate: 0.81,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // klipy "exploded view parts diagram animation": a floor plan with its rooms labelled.
      text: 'Owning your app means knowing its main parts,',
      visual: gif({
        src: 'section-09-blueprint-parts.gif',
        source: { provider: 'klipy', search: 'exploded view parts diagram animation' },
        color: '#3466ac',
        playbackRate: 0.84,
        place: 'above-captions',
      }),
    },
    {
      text: 'keeping a working version',
      visual: gif({
        src: 'section-10-photocopier-keeps-version.gif',
        source: {
          provider: 'giphy',
          id: 'veDaFP0kDWf25MBGmE',
          search: 'photocopy machine copying page',
        },
        color: '#ffffff',
        place: 'above-captions',
      }),
    },
    {
      // klipy "cute robot scanning screen checking": something going over the app end to end.
      text: 'and checking the main customer journey.',
      visual: gif({
        src: 'section-11-checking-robot.gif',
        source: { provider: 'klipy', search: 'cute robot scanning screen checking' },
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // klipy "cycle repeat arrows process flat icon": the same loop, run again on purpose.
      text: 'If you want a repeatable way to run your app yourself,',
      visual: gif({
        src: 'section-12-repeat-cycle-icon.gif',
        source: { provider: 'klipy', search: 'cycle repeat arrows process flat icon' },
        color: '#040204',
        place: 'above-captions',
      }),
    },
    {
      // klipy "cute character climbing steps upward": cut mid-climb, which is the point.
      text: 'that’s what we’re building a learning path for.',
      visual: gif({
        src: 'section-13-red-panda-climbing.gif',
        source: { provider: 'klipy', search: 'cute character climbing steps upward' },
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // klipy "woman pointing at map confident smile": the map being read, not drawn.
      text: 'By the end, you’ll map your app,',
      visual: gif({
        src: 'section-14-woman-pointing-map.gif',
        source: { provider: 'klipy', search: 'woman pointing at map confident smile' },
        place: 'above-captions',
      }),
    },
    {
      // A character walking the route with a clipboard, past a crossing sign.
      text: 'review changes, test the customer journey,',
      visual: gif({
        src: 'section-15-cat-walks-the-route.gif',
        source: {
          provider: 'giphy',
          id: 'SIvf7uDxllzTENAEJK',
          search: 'hand swiping through phone screens',
        },
        playbackRate: 0.92,
        place: 'above-captions',
      }),
    },
    {
      // klipy "wilted plant reviving water animation": the second restore beat, and the one that
      // says the version comes back rather than gets wiped.
      text: 'restore a working version',
      visual: gif({
        src: 'section-16-restore-flower-bloom.gif',
        source: { provider: 'klipy', search: 'wilted plant reviving water animation' },
        playbackRate: 0.8,
        place: 'above-captions',
      }),
    },
    {
      text: 'and choose your next step using evidence you collected.',
      visual: gif({
        src: 'section-17-woman-weighs-options.gif',
        source: {
          provider: 'giphy',
          id: 'l4pTqajdnOEerWFWM',
          search: 'weighing up two options cute character',
        },
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'The waitlist link is in the comments.',
      visual: gif({
        src: 'section-18-hand-presses-panel.gif',
        source: {
          provider: 'giphy',
          id: 'l2JhCpyUjBvCtzK0g',
          search: 'hand dropping note into box',
        },
        playbackRate: 0.9,
        place: 'above-captions',
      }),
    },
    {
      // klipy "megaphone announcement exciting news animation": the announcement itself.
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: gif({
        src: 'section-19-megaphone-announcement.gif',
        source: { provider: 'klipy', search: 'megaphone announcement exciting news animation' },
        playbackRate: 0.9,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // klipy "cute character curious wondering question mark": two geese, looking.
      text: '[pause][curious] Which part of running your app feels hardest?',
      visual: gif({
        src: 'section-20-curious-geese.gif',
        source: { provider: 'klipy', search: 'cute character curious wondering question mark' },
        playbackRate: 0.84,
        place: 'above-captions',
      }),
    },
  ],
})
