const DISCOUNT_URL =
  'https://littleparrot.app/journey-checkout?journey=launch-your-app-idea-with-lovable&coupon=TechWomen70'

export const campaign = {
  lead: 'Picked up a Little Parrot flyer at Tech Women Summit Moldova? Fold it into a parrot, post a photo of it on LinkedIn, and you’re in our raffle for one of three free places on our learning journey, Launch Your App Idea with Lovable.',
  entry: [
    {
      title: 'Fold your flyer',
      body: 'The folding steps are further down this page, each with its own animation. <a href="#fold">See the folding steps</a>',
    },
    {
      title: 'Post a photo on LinkedIn',
      body: 'Share a public post with a photo of your parrot and tag @Little Parrot. You can copy our post below, add your idea and change any of the wording you like.',
    },
    {
      title: 'Post by 15:00 on Saturday 24 October',
      body: 'We’ll draw three winners in the last hour of the conference and announce them there and on LinkedIn.',
    },
  ],
  prize: {
    title: 'What the three winners get',
    intro:
      'A free place on Launch Your App Idea with Lovable, worth €299. You’ll finish with a live app on your own domain that you know how to fix and change, a price you’ve set for it, and a plan to find its first customers.',
    items: [
      'All 7 courses for 12 months, plus their toolkit items to use on your own app: prompts to copy, checklists, templates and setup guides',
      'Our private community to ask questions and share what you build, for 6 months',
      'Monthly office hours for 6 months, where you bring questions about your own app to Kinga, a lead product manager, and Tamas, a principal software engineer',
    ],
  },
  // Placeholder post until the final wording is ready.
  post: {
    title: 'A post you can copy',
    text: 'I folded a paper parrot at Tech Women Summit Moldova today 🦜\n\nIt’s from @Little Parrot, and it reminded me that I’d like to build something of my own with AI. My idea: [write your idea here]',
    note: 'LinkedIn only tags us when you type @Little Parrot and pick our page from the list that appears. Pasted text on its own won’t tag us, so before you post, check that Little Parrot has turned into a link.',
  },
  discount: {
    title: 'Didn’t win? You can still get 70% off',
    body: `Use <a href="${DISCOUNT_URL}">this link</a> to get 70% off Launch Your App Idea with Lovable, or enter the code TechWomen70 at checkout. Both work until Saturday 31 October.`,
    url: DISCOUNT_URL,
    cta: 'Get 70% off',
    code: 'TechWomen70',
  },
  why: {
    title: 'Why we’re doing this',
    body: 'We’re running this so women early in their careers can get further. We think the best way to do that is to show something you’ve already built with AI, and building one is what this learning journey helps you do.',
  },
}
