import { clip, defineVideo, riveAtFrame } from '../narration/definition'

/**
 * A stock cut of "Nobody raised the hard part", the PM technical fluency campaign's video 7.
 * Script: productkind/marketing/content/campaigns/2026-09-pm-technical-fluency-validation/
 * video-7-nobody-raised-the-hard-part/script.md
 *
 * Same narration as `pm-technical-fluency-validation-07`, so the audio cache serves this one the
 * take it already generated. The narration has to stay character-identical for that to hold.
 *
 * Eighteen clauses merged into twelve runs, no run crossing a paragraph break. The b-roll cut of
 * this video uses the same twelve runs.
 *
 * Footage is Pexels, which asks for a credit and a link back rather than requiring one: credit
 * Pexels and the photographers named here in the video description.
 *
 * No identifiable face carries runs 0 to 3, where the viewer is the one who did not know what to
 * ask; faces appear from run 5, where the beat is running the discussion well.
 *
 * The three spoken questions in runs 6 to 8 are deliberately three unrelated pictures — a turbine
 * on wind nobody controls, a span that stops in mid-air, a badge at a door — rather than three
 * versions of one idea, because the point of the line is that they are separate questions.
 */
export default defineVideo({
  id: 'pm-technical-fluency-validation-07-stock',
  voice: 'chloe',
  model: 'eleven_v3',
  overlays: [
    riveAtFrame({ rive: 'parrot-greet-00.riv', frame: 0 }),
    riveAtFrame({ rive: 'parrot-peek-00.riv', frame: 500 }),
  ],
  sections: [
    {
      // Rain on an office window. The room the decision was made in.
      text:
        'The decision was made in a meeting you were in. Nobody raised the hard ' + 'questions.',
      visual: clip({
        src: 'clip-00-meeting-window-rain.mp4',
        source: {
          provider: 'pexels',
          id: '30754101',
          search: 'office window rain city skyline',
          author: 'Teju',
        },
      }),
      endsParagraph: true,
    },
    {
      // Work already under way on an assumption nobody checked.
      text: 'The engineers assumed you’d already scoped it. You didn’t know what to ask.',
      visual: clip({
        src: 'clip-01-engineers-typing-away.mp4',
        source: {
          provider: 'pexels',
          id: '7204518',
          search: 'engineer typing keyboard close up',
          author: 'SHVETS production',
        },
      }),
      endsParagraph: true,
    },
    {
      // What was under it all along, twice the size.
      text:
        'Three weeks later, the work turns out to be twice the size, and your ' + 'roadmap moves.',
      visual: clip({
        src: 'clip-02-iceberg-scale-reveal.mp4',
        source: {
          provider: 'pexels',
          id: '37665782',
          search: 'iceberg reveal underwater scale',
          author: 'JUN HO LEE',
        },
      }),
      endsParagraph: true,
    },
    {
      // Alone at the window with a job nobody taught you.
      text: 'Running that discussion was your job, and nobody teaches you the questions.',
      visual: clip({
        src: 'clip-03-alone-with-the-job.mp4',
        source: {
          provider: 'pexels',
          id: '34056836',
          search: 'person alone office window silhouette',
          author: 'Thuan Pham',
        },
      }),
      endsParagraph: true,
    },
    {
      // A stair turning upward, flight over flight.
      text:
        'If you want to be the one who raises them, we’re building a learning ' + 'path for it.',
      visual: clip({
        src: 'clip-04-building-the-path-up.mp4',
        source: {
          provider: 'pexels',
          id: '36745441',
          search: 'modern office staircase glass indoor',
          author: 'Marlon Castor',
        },
      }),
      endsParagraph: true,
    },
    {
      // Two people actually talking it through.
      text: 'By the end, you’ll be able to run that discussion.',
      visual: clip({
        src: 'clip-05-running-the-discussion.mp4',
        source: {
          provider: 'pexels',
          id: '8632480',
          search: 'two colleagues talking table collaboration',
          author: 'Kampus Production',
        },
      }),
    },
    {
      // A turbine turning on wind nobody here controls.
      text: 'What does this change rely on that we don’t control?',
      visual: clip({
        src: 'clip-06-relies-on-the-grid.mp4',
        source: {
          provider: 'pexels',
          id: '38560230',
          search: 'wind turbine blades close up sky',
          author: 'Gönüldenbirkare',
        },
      }),
    },
    {
      // A span that stops in mid-air. The request that fails halfway.
      text: 'What happens when a request fails halfway?',
      visual: clip({
        src: 'clip-07-fails-halfway.mp4',
        source: {
          provider: 'pexels',
          id: '37422603',
          search: 'bridge collapsed gap span',
          author: 'celal keser',
        },
      }),
    },
    {
      // A badge at a door. Who is allowed in, and what is already behind it.
      text: 'Does it touch permissions, or data that already exists?',
      visual: clip({
        src: 'clip-08-permissions-and-existing-data.mp4',
        source: {
          provider: 'pexels',
          id: '7317017',
          search: 'keycard tap door access office',
          author: 'Angela Roma',
        },
      }),
      endsParagraph: true,
    },
    {
      // A phone in hand, where the comments are.
      text: 'The waitlist link is in the comments.',
      visual: clip({
        src: 'clip-09-link-in-the-comments.mp4',
        source: {
          provider: 'pexels',
          id: '6177762',
          search: 'phone in hand desk casual daytime',
          author: 'Cup of Couple',
        },
      }),
    },
    {
      // Doors parting on the light.
      text: 'Sign up, and we’ll let you know when the learning path opens.',
      visual: clip({
        src: 'clip-10-when-it-opens.mp4',
        source: {
          provider: 'pexels',
          id: '34428005',
          search: 'door opening light streaming in',
          author: 'Earth Photart',
        },
      }),
      endsParagraph: true,
    },
    {
      // A table seen from above, and the question left on it.
      text: '[pause][curious] Who raises the hard part on your team?',
      visual: clip({
        src: 'clip-11-who-raises-it-on-your-team.mp4',
        source: {
          provider: 'pexels',
          id: '7652726',
          search: 'team meeting table discussion from above',
          author: 'Thirdman',
        },
      }),
    },
  ],
})
