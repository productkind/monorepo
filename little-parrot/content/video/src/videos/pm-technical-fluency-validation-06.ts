import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 7 of the PM technical fluency campaign, "Nobody raised the hard part".
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-7-four-questions/script.md
 *
 * The CTA is the LinkedIn / YouTube Shorts variant ("link in the comments"), which is the script
 * as written. TikTok and Instagram Reels need the URL spoken and shown instead.
 *
 * Sections 0 and 12 to 14 stand in for the screen recording the production notes call for: a
 * planning discussion, then the questions on cards.
 *
 * This video is the meeting itself, not the aftermath. Video 3 owns the aftermath of a yes already
 * given, and the two are posted a fortnight apart to stay distinct, which is why nothing here is
 * carried by a calendar or a slipping deadline: section 4's "three weeks later" is a character
 * melting into a puddle rather than a sixth timepiece in a campaign that already has five.
 *
 * Sections 12 to 14 are the script's three questions, and they are one family of sticker cats on
 * purpose: solo, then four of them, then solo again, so the three questions read as a set rather
 * than as three unrelated pictures.
 *
 * Nine of these eighteen came from Klipy rather than giphy, which is why their comments carry a
 * static.klipy.com address and why the back half leans on stickers and emoji: giphy's three pooled
 * keys hit their 100-per-hour cap twice during this video's sourcing, so the register was partly
 * chosen by quota. Worth re-visiting if any beat gets re-sourced with quota in hand.
 *
 * The only person in the video is the woman at section 9. Section 11 took thirteen rounds across
 * both providers looking for a woman running a discussion and neither catalogue has one that is
 * unbranded and uncaptioned, so the beat is carried by two characters in conversation instead,
 * which is the same choice video 3 made when its people beats came back unusable.
 *
 * The slots behind these rates are estimates from `0.98 + 0.209 x words`, fitted on the 39
 * narrated sections of videos 1 and 2. Every rate is a ratio to its slot, so all of them move once
 * this script is narrated: re-check with `verify.py --video pm-technical-fluency-validation-06`
 * from the video-gifs skill, and render the composed stills at the same time.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-06',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // giphy "sticky notes brainstorm cartoon": https://giphy.com/gifs/0IAPszdB8MMjPxNhFL
      text: 'The decision was made in a meeting you were in.',
      visual: gif({
        src: 'section-00-sticky-notes-meeting.gif',
        playbackRate: 0.91,
        place: 'above-captions',
      }),
    },
    {
      // giphy "silence emoji sticker": https://giphy.com/gifs/q0wz0pS8S8J4x3ztcZ
      // A zip across the mouth, which is the line: the questions were there and went unasked.
      text: 'Nobody raised the hard questions.',
      visual: gif({ src: 'section-01-zip-lips.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "cute animal builder construction cartoon": https://giphy.com/gifs/hVJZt4rY9TR5rmmqfc
      text: 'The engineers assumed you’d already scoped it.',
      visual: gif({
        src: 'section-02-bears-building.gif',
        playbackRate: 0.85,
        place: 'above-captions',
      }),
    },
    {
      // giphy "puzzled character thinking question mark cartoon":
      // https://giphy.com/gifs/szmc6VgQeft0A
      text: 'You didn’t know what to ask.',
      visual: gif({ src: 'section-03-question-marks-flood.gif', place: 'above-captions' }),
      endsParagraph: true,
    },
    {
      // giphy "candle burning down melting animation": https://giphy.com/gifs/mCnNJF00DZbXlEy1TH
      // Melting all the way to a puddle inside the beat, so time passes without a clock.
      text: 'Three weeks later',
      visual: gif({
        src: 'section-04-melting-cube.gif',
        playbackRate: 0.99,
        place: 'above-captions',
      }),
    },
    {
      // giphy "surprised gasp cute animal cartoon": https://giphy.com/gifs/YMMFYhYmQqldjK1DiX
      text: 'the work turns out to be twice the size,',
      visual: gif({ src: 'section-05-shocked-eyes.gif', place: 'above-captions' }),
    },
    {
      // giphy "gps rerouting arrow cartoon": https://giphy.com/gifs/Uimc9luSqGu4FcchR4
      text: 'and your roadmap moves.',
      visual: gif({
        src: 'section-06-curving-arrow.gif',
        playbackRate: 0.81,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "superhero cape cartoon character responsibility":
      // https://giphy.com/gifs/PUITId5Avf9fLPpD3S
      text: 'Running that discussion was your job,',
      visual: gif({
        src: 'section-07-superhero-cape.gif',
        playbackRate: 0.84,
        place: 'above-captions',
      }),
    },
    {
      // klipy "flying blind no guide cartoon character":
      // https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/80/c2/qFqozB3Q.gif
      text: 'and nobody teaches you the questions.',
      visual: gif({
        src: 'section-08-three-wise-monkeys.gif',
        playbackRate: 0.9,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // klipy "girl boss speaking confidently flat illustration":
      // https://static.klipy.com/ii/8ce8357c78ea940b9c2015daf05ce1a5/c8/a1/iPeP65sw.gif
      text: 'If you want to be the one who raises them,',
      visual: gif({ src: 'section-09-woman-speaking-studio.gif', place: 'above-captions' }),
    },
    {
      // klipy "building blocks stacking cartoon construction":
      // https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/d1/75/XTJh8PqE.gif
      text: 'we’re building a learning path for it.',
      visual: gif({
        src: 'section-10-lego-stack-building.gif',
        playbackRate: 0.9,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // giphy "two cute animals talking conversation cartoon":
      // https://giphy.com/gifs/g0jlZ04SeV4AM1lvFw
      // Two characters taking turns to speak. Left looping: the seam is 0.02, the lowest in the
      // video, so the repeat inside this beat cannot be seen.
      text: 'By the end you’ll be able to run that discussion.',
      visual: gif({ src: 'section-11-two-talking.gif', place: 'above-captions' }),
    },
    {
      // klipy "confused yellow cat sticker":
      // https://static.klipy.com/ii/2711dd8a75a85be822d136ec94899b3f/7f/7e/Th8v11dA.gif
      text: 'What does this change rely on that we don’t control?',
      visual: gif({ src: 'section-12-confused-cat-solo.gif', place: 'above-captions' }),
    },
    {
      // klipy "yellow cat line sticker":
      // https://static.klipy.com/ii/2711dd8a75a85be822d136ec94899b3f/b1/03/FEpNhKJX.gif
      text: 'What happens when a request fails halfway?',
      visual: gif({
        src: 'section-13-confused-cats-group.gif',
        playbackRate: 0.83,
        place: 'above-captions',
      }),
    },
    {
      // klipy "yellow cat line sticker":
      // https://static.klipy.com/ii/71b2873e478b9d8d0482ea3ec777ba7f/46/8e/H0x9Oudz.gif
      text: 'Does it touch permissions, or data that already exists?',
      visual: gif({
        src: 'section-14-confused-cat-solo-black.gif',
        playbackRate: 0.78,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // klipy "arrow pointing downward simple animation":
      // https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/d5/76/TlgeGabb.gif
      text: 'The waitlist link is in the comments.',
      visual: gif({ src: 'section-15-down-arrow-circle-icon.gif', place: 'above-captions' }),
    },
    {
      // klipy "cute character ringing bell sticker":
      // https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/3f/bd/X6FQ7EWA.gif
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: gif({
        src: 'section-16-pingu-rings-bell.gif',
        playbackRate: 0.76,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // klipy "cute animal tilting head curious":
      // https://static.klipy.com/ii/4e7bea9f7a3371424e6c16ebc93252fe/8a/c8/uYe04AbfmsjaQHfwvD.gif
      // Left looping as well: seam 0.01, and the head tilt is cyclic.
      text: 'Who raises the hard part on your team?',
      visual: gif({ src: 'section-17-curious-dog-tilt.gif', place: 'above-captions' }),
    },
  ],
})
