import { defineVideo, gif, riveAtFrame } from '../narration/definition'

/**
 * Video 5 of the PM technical fluency campaign, "All you can send is their screenshot".
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-5-all-you-can-send-is-their-screenshot/script.md
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
 * this script is narrated: re-check with `verify.py --video pm-technical-fluency-validation-05`
 * from the video-gifs skill, and render the composed stills at the same time.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-05',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      text: 'A customer reports a bug.',
      visual: gif({
        src: 'section-00-envelope-arriving.gif',
        source: {
          provider: 'giphy',
          id: 'BQNRcCOckLqLJ9jPg1',
          search: 'mail notification envelope icon animation',
        },
        color: '#a8f2a0',
        playbackRate: 0.89,
        place: 'above-captions',
      }),
    },
    {
      // A snapshot is the whole of what the PM can hand over, which is the line.
      text: 'All you can send engineering is their screenshot.',
      visual: gif({
        src: 'section-01-camera-flash.gif',
        source: { provider: 'giphy', id: '7wNJdkFVkijFqvfjve', search: 'polaroid camera snapshot' },
        playbackRate: 0.7,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'It comes back as questions.',
      visual: gif({
        src: 'section-02-dog-questions.gif',
        source: { provider: 'giphy', id: '0KkF1e5fuhGoaAVOgt', search: 'question mark stamp icon' },
        place: 'above-captions',
      }),
    },
    {
      // The slowest rate in the campaign: a one-second sticker in a 1.6s beat. It loops 1.6 times
      // at full speed, and a restart halfway reads as a stutter on a one-line question.
      text: 'Who was it?',
      visual: gif({
        src: 'section-03-detective-bear-who.gif',
        source: {
          provider: 'giphy',
          id: 'v0DK0A7TcNsBkMWPhC',
          search: 'bear investigator sticker',
        },
        playbackRate: 0.62,
        place: 'above-captions',
      }),
    },
    {
      text: 'What did they do?',
      visual: gif({
        src: 'section-04-detective-bear-what-did.gif',
        source: {
          provider: 'giphy',
          id: 'Tfd91e9R13cewUzBWh',
          search: 'bear investigator sticker',
        },
        place: 'above-captions',
      }),
    },
    {
      text: 'What did the error say?',
      visual: gif({
        src: 'section-05-detective-bear-error-said.gif',
        source: {
          provider: 'giphy',
          id: 'HOYcveUFDFc6dKe4xb',
          search: 'cute animal detective magnifying glass',
        },
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'So you ask the customer,',
      visual: gif({
        src: 'section-06-asking-question-chick.gif',
        source: {
          provider: 'klipy',
          id: '8053349891820367',
          search: 'text bubble question mark icon animation',
        },
        color: '#fcfefc',
        place: 'above-captions',
      }),
    },
    {
      text: 'wait two days,',
      visual: gif({
        src: 'section-07-hourglass-flip.gif',
        source: {
          provider: 'klipy',
          id: '8813237261827116',
          search: 'hourglass time passing animation',
        },
        color: '#f5fefc',
        playbackRate: 0.87,
        place: 'above-captions',
      }),
    },
    {
      // The report sitting in a tray nobody has picked up, in the same flat icon language as
      // sections 14 and 16.
      text: 'and nobody has started looking.',
      visual: gif({
        src: 'section-08-untouched-pile.gif',
        source: {
          provider: 'giphy',
          id: 'WV9R2niZMMbcE5a9um',
          search: 'closed folder untouched paper stack icon',
        },
        color: '#ffffff',
        playbackRate: 0.99,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'You could answer all of it yourself,',
      visual: gif({
        src: 'section-09-woman-raises-hand-confident.gif',
        source: {
          provider: 'klipy',
          id: '1135004172688538',
          search: 'woman raising fist success illustration flat',
        },
        playbackRate: 0.98,
        place: 'above-captions',
      }),
    },
    {
      text: 'if somebody showed you where to look.',
      visual: gif({
        src: 'section-10-hand-pointing-guide.gif',
        source: {
          provider: 'giphy',
          id: '3IUZ9PpKfTEUQNb4od',
          search: 'hand pointing arrow guide',
        },
        color: '#ffffff',
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'If you want to be the one who investigates it first,',
      visual: gif({
        src: 'section-11-woman-raises-hand-volunteer.gif',
        source: {
          provider: 'klipy',
          id: '1906183260117416',
          search: 'woman raises hand front of class confident',
        },
        playbackRate: 0.75,
        place: 'above-captions',
      }),
    },
    {
      text: 'we’re building a learning path for it.',
      visual: gif({
        src: 'section-12-building-tower.gif',
        source: {
          provider: 'klipy',
          id: '7106061894122461',
          search: 'cute character building construction animation',
        },
        playbackRate: 0.82,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      // Left at full speed on purpose. Its motion score is 0.06, the lowest in the video, so
      // slowing it down would push it towards reading as a still; the loop seam is 0.06, which
      // means the repeat inside this beat is invisible.
      text: 'By the end you’ll reproduce the bug on your own account,',
      visual: gif({
        src: 'section-13-woman-laptop-reproduce.gif',
        source: {
          provider: 'klipy',
          id: '4885225166086804',
          search: 'woman using laptop testing confident illustration',
        },
        place: 'above-captions',
      }),
    },
    {
      text: 'read the status code,',
      visual: gif({
        src: 'section-14-document-read-icon.gif',
        source: {
          provider: 'klipy',
          id: '6234873960147815',
          search: 'woman reading document focused illustration',
        },
        color: '#fcfefc',
        place: 'above-captions',
      }),
    },
    {
      text: 'and find the failed request in the network tab yourself.',
      visual: gif({
        src: 'section-15-eye-pin-found-it.gif',
        source: {
          provider: 'klipy',
          id: '2864955358184327',
          search: 'pin drop location marker icon animation',
        },
        color: '#e4e6e4',
        playbackRate: 0.81,
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: 'The waitlist link is in the comments.',
      visual: gif({
        src: 'section-16-arrow-down-comments.gif',
        source: {
          provider: 'klipy',
          id: '2150265299614363',
          search: 'arrow pointing down comments illustration',
        },
        color: '#ffffff',
        playbackRate: 0.82,
        place: 'above-captions',
      }),
    },
    {
      text: 'Sign up and we’ll let you know when the learning path opens.',
      visual: gif({
        src: 'section-17-signup-checkmark.gif',
        source: {
          provider: 'klipy',
          id: '7560569530980803',
          search: 'sign up checkmark confirmation icon',
        },
        color: '#040204',
        place: 'above-captions',
      }),
      endsParagraph: true,
    },
    {
      text: '[pause][curious] How long does a bug wait before fixing where you work?',
      visual: gif({
        src: 'section-18-confused-question-closer.gif',
        source: {
          provider: 'klipy',
          id: '8199190945466791',
          search: 'cute owl thinking question mark illustration',
        },
        color: '#dad5d1',
        playbackRate: 0.98,
        place: 'above-captions',
      }),
    },
  ],
})
