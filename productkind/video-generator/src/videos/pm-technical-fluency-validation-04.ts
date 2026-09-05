import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 4 of the PM technical fluency campaign, "All you can send is their screenshot".
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-4-all-you-can-send-is-their-screenshot/script.md
 *
 * The CTA is the LinkedIn / YouTube Shorts variant ("link in the comments"), which is the script
 * as written. TikTok and Instagram Reels need the URL spoken and shown instead.
 *
 * Sections 1 and 13 to 15 stand in for the screen recording the production notes call for: a
 * reproducible problem in a test account, then the network tab showing the failed request and its
 * status code.
 *
 * Sections 3 to 5 are engineering's three questions, and they get three different detective
 * characters rather than one repeated: a hamster, a polar bear, a teddy bear, all in the same
 * flat magnifying-glass sticker style, so the questions escalate instead of looping.
 *
 * The frustration beats are carried by objects and animal characters and the three transformation
 * beats by women, which is what the campaign brief asks of the channel. No men appear.
 *
 * Half of these were sourced from Klipy rather than giphy, which is why their comments carry a
 * static.klipy.com address: giphy's three pooled keys hit their hourly search cap partway through.
 *
 * The slots behind these rates are estimates from `0.98 + 0.209 x words`, fitted on the 39
 * narrated sections of videos 0 and 1. Every rate is a ratio to its slot, so all of them move once
 * this script is narrated: re-check with `verify.py --video pm-technical-fluency-validation-04`
 * from the video-gifs skill, and render the composed stills at the same time.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-04',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // giphy "mail notification envelope icon animation":
      // https://giphy.com/gifs/BQNRcCOckLqLJ9jPg1
      text: 'A customer reports a bug.',
      visual: gif({
        src: 'section-00-envelope-arriving.gif',
        playbackRate: 0.89,
        place: 'above-captions',
      }),
    },
    {
      // giphy "polaroid camera snapshot": https://giphy.com/gifs/7wNJdkFVkijFqvfjve
      // A snapshot is the whole of what the PM can hand over, which is the line.
      text: 'All you can send engineering is their screenshot.',
      visual: gif({
        src: 'section-01-camera-flash.gif',
        playbackRate: 0.7,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "question mark stamp icon": https://giphy.com/gifs/0KkF1e5fuhGoaAVOgt
      text: 'It comes back as questions.',
      visual: gif({ src: 'section-02-dog-questions.gif', place: 'above-captions' }),
    },
    {
      // giphy "bear investigator sticker": https://giphy.com/gifs/v0DK0A7TcNsBkMWPhC
      // The slowest rate in the campaign: a one-second sticker in a 1.6s beat. It loops 1.6 times
      // at full speed, and a restart halfway reads as a stutter on a one-line question.
      text: 'Who was it?',
      visual: gif({
        src: 'section-03-detective-bear-who.gif',
        playbackRate: 0.62,
        place: 'above-captions',
      }),
    },
    {
      // giphy "bear investigator sticker": https://giphy.com/gifs/Tfd91e9R13cewUzBWh
      text: 'What did they do?',
      visual: gif({ src: 'section-04-detective-bear-what-did.gif', place: 'above-captions' }),
    },
    {
      // giphy "cute animal detective magnifying glass": https://giphy.com/gifs/HOYcveUFDFc6dKe4xb
      text: 'What did the error say?',
      visual: gif({ src: 'section-05-detective-bear-error-said.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // klipy "text bubble question mark icon animation":
      // https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/25/82/6NX9xRON.gif
      text: 'So you ask the customer,',
      visual: gif({ src: 'section-06-asking-question-chick.gif', place: 'above-captions' }),
    },
    {
      // klipy "hourglass time passing animation":
      // https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/d5/da/xn1PrlJW.gif
      text: 'wait two days,',
      visual: gif({
        src: 'section-07-hourglass-flip.gif',
        playbackRate: 0.87,
        place: 'above-captions',
      }),
    },
    {
      // giphy "closed folder untouched paper stack icon":
      // https://giphy.com/gifs/WV9R2niZMMbcE5a9um
      // The report sitting in a tray nobody has picked up, in the same flat icon language as
      // sections 14 and 16.
      text: 'and nobody has started looking.',
      visual: gif({
        src: 'section-08-untouched-pile.gif',
        playbackRate: 0.99,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // klipy "woman raising fist success illustration flat":
      // https://static.klipy.com/ii/39f2394ae36df6e199be9eb7c9fa1012/af/dd/zZ0EWjiw.gif
      text: 'You could answer all of it yourself,',
      visual: gif({
        src: 'section-09-woman-raises-hand-confident.gif',
        playbackRate: 0.98,
        place: 'above-captions',
      }),
    },
    {
      // giphy "hand pointing arrow guide": https://giphy.com/gifs/3IUZ9PpKfTEUQNb4od
      text: 'if somebody showed you where to look.',
      visual: gif({ src: 'section-10-hand-pointing-guide.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // klipy "woman raises hand front of class confident":
      // https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/37/90/cnc4k2LW.gif
      text: 'If you want to be the one who investigates it first,',
      visual: gif({
        src: 'section-11-woman-raises-hand-volunteer.gif',
        playbackRate: 0.75,
        place: 'above-captions',
      }),
    },
    {
      // klipy "cute character building construction animation":
      // https://static.klipy.com/ii/bea85337777ad0e23e63683391435543/30/55/hQRLC4aS.gif
      text: 'we’re building a learning path for it.',
      visual: gif({
        src: 'section-12-building-tower.gif',
        playbackRate: 0.82,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // klipy "woman using laptop testing confident illustration":
      // https://static.klipy.com/ii/e293a233a303a98e471f78d04e13a1b0/44/2b/WLER1E8k.gif
      // Left at full speed on purpose. Its motion score is 0.06, the lowest in the video, so
      // slowing it down would push it towards reading as a still; the loop seam is 0.06, which
      // means the repeat inside this beat is invisible.
      text: 'By the end you’ll reproduce the bug on your own account,',
      visual: gif({ src: 'section-13-woman-laptop-reproduce.gif', place: 'above-captions' }),
    },
    {
      // klipy "woman reading document focused illustration":
      // https://static.klipy.com/ii/2711dd8a75a85be822d136ec94899b3f/f9/60/MtI6Yweh.gif
      text: 'read the status code,',
      visual: gif({ src: 'section-14-document-read-icon.gif', place: 'above-captions' }),
    },
    {
      // klipy "pin drop location marker icon animation":
      // https://static.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/71/98/i9ixmlQe.gif
      text: 'and find the failed request in the network tab yourself.',
      visual: gif({
        src: 'section-15-eye-pin-found-it.gif',
        playbackRate: 0.81,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // klipy "arrow pointing down comments illustration":
      // https://static.klipy.com/ii/4493325008d34b7bf8cd6813cd5c1619/3f/71/Fehr4syHffZVTJpI1C.gif
      text: 'The waitlist link is in the comments.',
      visual: gif({
        src: 'section-16-arrow-down-comments.gif',
        playbackRate: 0.82,
        place: 'above-captions',
      }),
    },
    {
      // klipy "sign up checkmark confirmation icon":
      // https://static.klipy.com/ii/c3a19a0b747a76e98651f2b9a3cca5ff/85/e0/Fz3tnxKp.gif
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: gif({ src: 'section-17-signup-checkmark.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // klipy "cute owl thinking question mark illustration":
      // https://static.klipy.com/ii/35ccce3d852f7995dd2da910f2abd795/66/72/BVQ9Wyzg.gif
      text: '[pause][curious] How long does a bug wait before fixing where you work?',
      visual: gif({
        src: 'section-18-confused-question-closer.gif',
        playbackRate: 0.98,
        place: 'above-captions',
      }),
    },
  ],
})
