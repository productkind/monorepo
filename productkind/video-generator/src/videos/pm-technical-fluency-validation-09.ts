import { clip, defineVideo, riveAtSection } from '../narration/definition'

/**
 * Video 9 of the PM technical fluency campaign, "Before you Slack an engineer about a bug".
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-9-before-you-slack-an-engineer-about-a-bug/script.md
 *
 * This is a motion-graphics video rather than the gif-led treatment used for videos 1 to 8.
 * Each section points to a locally made, full-frame clip. The comments are the production brief
 * for those clips; the filenames are the asset contract for the motion designer or render script.
 *
 * The visual language takes its pacing from YouTube Creators' "Communities on YouTube" video:
 * fast editorial cuts, oversized type, rounded interface cards, stacked paper, tape-like bands,
 * cut-out objects and soft gradient fields. It does not reuse YouTube's logo, palette, layouts or
 * assets. This version uses Little Parrot's orange-to-green gradient, black ink and white cards.
 *
 * Keep every clip inside the TikTok safe area. The top 180px stays decorative, the right 150px
 * stays free of essential copy, and the lower 520px belongs to burned-in captions and TikTok's
 * controls. All meaningful motion therefore happens in the upper-middle stage.
 *
 * Retention rhythm:
 * - The first seven seconds turn one vague Slack message into three unanswered questions.
 * - The seven answers share a visible 1/7 to 7/7 counter, but each uses a different composition.
 * - The cards accumulate behind the active card, so the viewer can see the report being built.
 * - The final answer resolves the opening: the loose cards compress into one usable bug report.
 * - The last beat opens DevTools and reveals one red request, making episode two feel immediate.
 *
 * Transitions should feel physical: cards snap, stack, peel, fold and slide. Use scale overshoot
 * only on the hook and the numbered cards. Avoid constant bouncing, spinning text or confetti.
 * The motion should clarify the action in each line, not decorate every object at once.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-09',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtSection({ rive: 'parrot-greet-00.riv', section: 0 }),
    riveAtSection({ rive: 'parrot-peek-00.riv', section: 17 }),
  ],
  sections: [
    {
      // Cold open on black. "PRODUCT MANAGERS" types on in huge white capitals, then gets pushed
      // upward by a Slack-like message card. A small Little Parrot gradient orb pulses behind the
      // sender avatar. No Slack logo: the channel name and message shape do the recognition work.
      text: 'Product managers,',
      visual: clip({ src: 'section-00-product-managers.mp4' }),
    },
    {
      // The card lands centre-frame with “I found a bug” as its only line. "STOP SENDING THIS"
      // stamps over it on a diagonal orange-to-yellow strip. The strip enters hard on "stop" and
      // the message recoils slightly, creating the first pattern interrupt inside two seconds.
      text: 'stop sending engineers “I found a bug” on Slack',
      visual: clip({ src: 'section-01-i-found-a-bug.mp4' }),
    },
    {
      // Seven small reply bubbles multiply behind the original message, filling the stage without
      // covering the caption band. The words resolve into one large label: "FEWER QUESTIONS BACK".
      // Match the opening frame to the previous clip's final message-card position.
      text: 'if you want fewer questions back.',
      visual: clip({ src: 'section-02-fewer-questions.mp4' }),
      endsParagraph: true,
    },
    {
      // Cut to a cut-paper engineer avatar beside the vague message. A cursor blinks, then three
      // empty reply bubbles stack above the avatar. Use a white card on the Little Parrot gradient
      // field, with a thick black outline and a faint photocopied-paper texture.
      text: 'The engineer still has to ask:',
      visual: clip({ src: 'section-03-engineer-has-to-ask.mp4' }),
    },
    {
      // First reply bubble snaps open like a label-maker strip. A location pin searches across a
      // tiny app window, then stops on an empty question mark. On-screen emphasis: "WHERE?".
      text: 'Where did it happen?',
      visual: clip({ src: 'section-04-where.mp4' }),
    },
    {
      // Second bubble shoves the first upward. A cursor retraces a short path through three blank
      // screens, then loses the trail. On-screen emphasis: "WHAT DID YOU DO?".
      text: 'What did you do?',
      visual: clip({ src: 'section-05-what-did-you-do.mp4' }),
    },
    {
      // Third bubble completes the stack. A repeat arrow makes one clean turn, then stops beside
      // "?×". Pull back to show the original message buried beneath all three questions.
      text: 'Can you repeat it?',
      visual: clip({ src: 'section-06-can-you-repeat-it.mp4' }),
      endsParagraph: true,
    },
    {
      // The three question bubbles sweep off-screen. Seven numbered cards fan out from behind the
      // vague message, then collapse into one neat stack. Hold 1–7 along the top as a progress rail
      // that stays in the same position through sections 8 to 14.
      text: 'Give them these seven answers in your first message.',
      visual: clip({ src: 'section-07-seven-answers.mp4' }),
      endsParagraph: true,
    },
    {
      // Card 1/7. A large repeat arrow turns once around a miniature app screen. Two result chips
      // slide in beneath it: "EVERY TIME" and "ONCE". The first lights up green, showing the kind
      // of answer the engineer needs without adding another sentence to the narration.
      text: 'First, try it again and say whether it happens every time.',
      visual: clip({ src: 'section-08-repeat-it.mp4' }),
      endsParagraph: true,
    },
    {
      // Card 2/7. A phone frame rises from the bottom. It flashes once like a screenshot, then a
      // red recording dot appears and a two-second progress line grows. A coral outline circles the
      // stuck control. Keep "SCREENSHOT" and "RECORDING" as the only extra words.
      text: 'Second, attach a screenshot or screen recording that shows the bug.',
      visual: clip({ src: 'section-09-show-the-bug.mp4' }),
      endsParagraph: true,
    },
    {
      // Card 3/7. Four rounded UI tiles travel left to right along one continuous black line:
      // Profile → Upload → Choose photo → Save. A cursor taps each tile and leaves a numbered dot.
      // The active tile enlarges briefly; the whole route remains visible at the end of the beat.
      text: 'Third, list each step: Profile, Upload, Choose photo, Save.',
      visual: clip({ src: 'section-10-list-the-steps.mp4' }),
      endsParagraph: true,
    },
    {
      // Card 4/7. Split-screen label: EXPECTED. A placeholder profile photo flips into a new one,
      // the Save button compresses, and a green tick draws itself. This is the clean, satisfying
      // half of the contrast, with the action completed before the cut.
      text: 'Fourth, say what you expected: the new photo should save.',
      visual: clip({ src: 'section-11-expected.mp4' }),
      endsParagraph: true,
    },
    {
      // Card 5/7. Hard match-cut to the same interface under the label ACTUAL. The Save button
      // becomes a spinner that keeps turning while the rest of the interface drains to grey. A
      // thin tape band reading "STILL LOADING" crosses behind it, inspired by the reference video.
      text: 'Fifth, describe what happened: the spinner kept loading.',
      visual: clip({ src: 'section-12-actual.mp4' }),
      endsParagraph: true,
    },
    {
      // Card 6/7. Three object cards fan into view like a small technical-spec deck: a phone,
      // browser window and app tile. Their labels read DEVICE, BROWSER and APP VERSION. Example
      // values type in once, then the three cards lock together as one row.
      text: 'Sixth, include your device, browser and app version.',
      visual: clip({ src: 'section-13-environment.mp4' }),
      endsParagraph: true,
    },
    {
      // Card 7/7. A row of user avatars appears above a disabled profile-photo control. Brackets
      // label the two halves "WHO?" and "CAN'T DO WHAT?". The seven progress numbers turn green in
      // sequence, then the whole stack closes like a completed form.
      text: 'Seventh, explain who is affected and what they cannot do.',
      visual: clip({ src: 'section-14-impact.mp4' }),
      endsParagraph: true,
    },
    {
      // Resolve the hook. The three question bubbles from sections 4 to 6 return, but the completed
      // report card answers each one and the bubbles fold away. The engineer drags a magnifying
      // glass onto the stuck spinner and a small INVESTIGATING status pill turns on.
      text: 'The engineer can start investigating with fewer follow-up questions.',
      visual: clip({ src: 'section-15-start-investigating.mp4' }),
      endsParagraph: true,
    },
    {
      // The completed report becomes a clean reusable template. It duplicates into three stacked
      // sheets, gets a bookmark tab, then slides into a phone's Saved folder. Large, still-readable
      // overlay: "SAVE THIS". Hold the final stack long enough for a screenshot.
      text: 'Save this as your bug-report template.',
      visual: clip({ src: 'section-16-save-template.mp4' }),
      endsParagraph: true,
    },
    {
      // The template slides left to reveal browser DevTools. A Network panel waterfall builds in
      // quickly; every request is black or grey except one red row. The red row expands towards the
      // camera as the words "FAILED REQUEST" appear on a diagonal gradient band behind it.
      text: 'Next, we’ll find the failed network request behind an error.',
      visual: clip({ src: 'section-17-failed-request.mp4' }),
      endsParagraph: true,
    },
    {
      // End card keeps the DevTools panel visible instead of cutting to a generic CTA. A ticket
      // marked EPISODE 2 peels up from the failed row, while a Follow button changes to Following.
      // The Little Parrot gradient closes in from the edges, leaving the centre clean for captions.
      text: 'I’ll show you how in 60 seconds. Follow for episode two.',
      visual: clip({ src: 'section-18-follow-episode-two.mp4' }),
    },
  ],
})
