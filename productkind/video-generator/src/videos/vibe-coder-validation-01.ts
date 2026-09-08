import { defineVideo, gif, riveAtFrame } from "../narration/definition";

/**
 * Video 1 of the vibe coder campaign, "Your app works. Customers get stuck.".
 * Script: productkind/marketing/content/campaigns/2026-09-vibe-coder-validation/
 * video-0-real-product-not-prototype/script.md
 *
 * The CTA is the LinkedIn / YouTube Shorts variant ("link in the comments"), which is the script
 * as written. TikTok and Instagram Reels need the URL spoken and shown instead, so they want a
 * second definition rather than a re-edit of this one.
 *
 * Cut at clause level. The list of what a real product has to work all the way through is three
 * beats rather than five, because a single-word section is too short a slot to put a picture in.
 *
 * Every visual is text-free, and none of them repeats a gif from the PM technical fluency
 * campaign. Sections 0, 12 and 18 come from klipy, which carries the flat-illustration register
 * those beats wanted; the rest are giphy. Every person shown is a woman, and the beats where
 * something goes wrong are carried by objects and characters rather than a person, so nobody on
 * screen is the butt of the joke.
 *
 * Where a gif is shorter than its slot it is slowed to cover the beat in one pass, rather than
 * held on a frozen last frame: a still picture reads as a stall while the captions and the parrot
 * keep moving. Where a one-shot motion has to resolve before the cut, the rate goes above 1. The
 * rates come from the narrated timeline, so re-run the video-gifs skill's `fit.py` if this script
 * is ever re-narrated.
 */
export default defineVideo({
  id: "vibe-coder-validation-01",
  voice: "chloe",
  model: "eleven_v3",
  overlays: [
    riveAtFrame({ rive: "parrot-greet-00.riv", frame: 0 }),
    riveAtFrame({ rive: "parrot-peek-00.riv", frame: 500 }),
  ],
  sections: [
    {
      // klipy "app success checkmark":
      // https://static.klipy.com/ii/8ce8357c78ea940b9c2015daf05ce1a5/04/2a/E5Am7p60.gif
      text: "The app you built with AI works.",
      visual: gif({
        src: "section-00-app-works-check.gif",
        color: "#fcfefc",
        playbackRate: 0.82,
        place: "above-captions",
      }),
    },
    {
      // giphy "brick wall stop cartoon": https://giphy.com/gifs/3oriNW27pn33u8rtuw
      // Sped up so the crash into the wall lands before the cut instead of after it.
      text: "But customers get stuck.",
      visual: gif({
        src: "section-01-hits-wall.gif",
        playbackRate: 1.13,
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      // giphy "woman ok hand sign approve": https://giphy.com/gifs/18DI6pVCEnjVnwrXOr
      text: "The preview looked perfect.",
      visual: gif({
        src: "section-02-preview-ok-sign.gif",
        place: "above-captions",
      }),
    },
    {
      // giphy "checking phone no notification": https://giphy.com/gifs/paev63hCCko9vLn3Ym
      text: "Then the confirmation email never arrived.",
      visual: gif({
        src: "section-03-anxious-waiting-phone.gif",
        color: "#fee5fd",
        place: "above-captions",
      }),
    },
    {
      // giphy "cart checkout complete animation": https://giphy.com/gifs/20iQNcNaKoKQAiPVlX
      text: "Another customer reached checkout, paid,",
      visual: gif({
        src: "section-04-contactless-card-pay.gif",
        color: "#fefefe",
        playbackRate: 0.93,
        place: "above-captions",
      }),
    },
    {
      // giphy "thinking question bubble": https://giphy.com/gifs/2gHUXJe61iM0y7TpNu
      text: "and couldn’t tell what would happen next.",
      visual: gif({
        src: "section-05-typing-bubble-unknown.gif",
        color: "#ffffff",
        playbackRate: 0.84,
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      // giphy "build": https://giphy.com/gifs/rIWwWUJyzD0Q2kf2nL
      text: "You built the core feature.",
      visual: gif({
        src: "section-06-build.gif",
        playbackRate: 0.88,
        place: "above-captions",
      }),
    },
    {
      // giphy "unfinished bridge construction": https://giphy.com/gifs/11jb41MuspTID6
      text: "The full customer journey still has gaps.",
      visual: gif({
        src: "section-07-bridge-under-construction.gif",
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      // giphy "pipeline flow through arrow": https://giphy.com/gifs/UX5ovY9QQ1FOpaKtc8
      text: "A real product has to work all the way through:",
      visual: gif({
        src: "section-08-arrow-flow-through.gif",
        color: "#000000",
        place: "above-captions",
      }),
    },
    {
      // giphy "step by step checklist flat": https://giphy.com/gifs/if0b0H2TYmgTXp4XaZ
      // The weakest visual in the video: feet crossing stepping stones, a loose stand-in for the
      // three things the line lists. Eight rounds across both providers turned up nothing clean
      // for "a sequence of steps" — the register is dominated by watermarked icon-shop channels.
      // Worth replacing from stock footage via `clip({ trimBefore })` if this is ever revisited.
      text: "account, core workflow, payment,",
      visual: gif({
        src: "section-09-step-by-step-crossing.gif",
        color: "#ffffff",
        place: "above-captions",
      }),
    },
    {
      // giphy "package delivered doorstep": https://giphy.com/gifs/1jiUJytW0sqB632FwZ
      text: "email and the result you promised.",
      visual: gif({
        src: "section-10-delivery-result.gif",
        playbackRate: 0.83,
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      // giphy "confident woman ready to work": https://giphy.com/gifs/qQGaIL7Nq4on3vfk1N
      text: "If you want to prepare your app for real customers,",
      visual: gif({
        src: "section-11-woman-hard-hat-ready.gif",
        place: "above-captions",
      }),
    },
    {
      // giphy "path": https://giphy.com/gifs/qjGhmKyiy3gSIeaWS9
      // A figure walking forward, slowed so the stride carries the whole beat in one pass.
      text: "that’s what we’re building a learning path for.",
      visual: gif({
        src: "section-12-path.gif",
        playbackRate: 0.87,
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      // giphy "travel itinerary planning notebook": https://giphy.com/gifs/eK1sbbshY1fMYGLhH5
      text: "By the end, you’ll map the main journey,",
      visual: gif({
        src: "section-13-woman-writing-plan.gif",
        playbackRate: 0.96,
        place: "above-captions",
      }),
    },
    {
      // giphy "testing": https://giphy.com/gifs/gw3IWyGkC0rsazTi
      // Sped up so every tick has landed by the cut.
      text: "test every step and common failure,",
      visual: gif({
        src: "section-14-testing.gif",
        playbackRate: 1.14,
        place: "above-captions",
      }),
    },
    {
      // giphy "checklist": https://giphy.com/gifs/dWOKEQ5ewh94RJLemj
      // A note being written, so it is sped up: at 1x the word is still being formed at the cut.
      text: "and create a launch checklist for the parts that still need work.",
      visual: gif({
        src: "section-15-checklist.gif",
        color: "#d41c48",
        playbackRate: 1.17,
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      // giphy "chat message notification icon": https://giphy.com/gifs/lxsdH3YSTLvyVEGR6l
      text: "The waitlist link is in the comments.",
      visual: gif({
        src: "section-16-comment-bubbles.gif",
        place: "above-captions",
      }),
    },
    {
      // giphy "envelope subscribe flat icon": https://giphy.com/gifs/l0JM83bF1jbRsTnNu
      text: "Sign up and we’ll let you know when the learning path opens.",
      visual: gif({
        src: "section-17-envelope-notify-open.gif",
        color: "#ffffff",
        playbackRate: 0.84,
        place: "above-captions",
      }),
      endsParagraph: true,
    },
    {
      // klipy "woman thinking question flat icon":
      // https://static.klipy.com/ii/4e7bea9f7a3371424e6c16ebc93252fe/84/f4/A7AIU7fKmBzK3g.gif
      text: "[pause][curious] Where does your customer journey stop today?",
      visual: gif({
        src: "section-18-curious-question-girl.gif",
        playbackRate: 0.88,
        place: "above-captions",
      }),
    },
  ],
});
