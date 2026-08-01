---
challenge: "6 - Create a Prompt to Build Your MVP with AI"
type: "Template"
---
## Turn Your MVP into a Build Prompt

A copy-paste prompt structure for Lovable, or any other AI app builder. It uses the work you've already done in this course: your problem statement, your persona, and the slice of your user story map you chose as your MVP (Minimum Viable Product).

### The template

Copy this into Lovable and replace the bracketed text with your own details. Delete any sections that don't apply to your first version.

```markdown
## Product Overview
[One sentence on what the app does. Pull this from your problem statement.]

## Target User
[One sentence of who your persona is. Pull this from your user persona.]

## User Flow
[List the steps your user will take in the app, in order. Pull these directly from your MVP scope: the activities, steps, and details you chose to include.]

1. [First thing the user does]
2. [What happens next]
3. [Next step]
4. [Continue until the journey is complete]

## Platform Requirements
- Mobile-first layout
- Accessible (WCAG AA compliance)

## Design System
- Brand colours: [your main colour], [your accent colour], [your background colour]
- Heading font: [e.g. Merriweather, Playfair Display, or leave blank for Lovable to choose]
- Paragraph font: [e.g. Open Sans, Inter, or leave blank for Lovable to choose]
- Style: [describe the vibe in 2-3 words, e.g. "warm and friendly", "clean and minimal"]
```

Two of those lines are worth knowing by name, because you'll see them again:

- **Mobile-first layout** means the app is designed for phone screens first, then adapted for bigger ones. Most people will open your app on a phone, so this is a sensible default.
- **WCAG AA** (Web Content Accessibility Guidelines, level AA) is the international accessibility standard. Asking for it means your app should work for people using screen readers, keyboard navigation, or larger text.

### Filled-in example: Book Club Organiser

This is the prompt for the Book Club Organiser MVP, built directly from the story map and MVP scope defined earlier in the course.

```markdown
## Product Overview
A web app for book club organisers to collect book suggestions from members and vote on which book to read next.

## Target User
A book club organiser who wants to spend less time on admin and more time reading with friends.

## User Flow
1. Create a book club by entering a club name
2. Invite members with a shareable link
3. Suggest books by adding a title and author
4. Browse all book suggestions as a list
5. Vote on books and see vote counts

## Platform Requirements
- Mobile-first layout
- Accessible (WCAG AA compliance)

## Design System
- Brand colours: warm cream (#FDF6E3), deep brown (#5C4033), coral (#E07A5F)
- Heading font: Merriweather
- Paragraph font: Open Sans
- Style: cosy, bookish, friendly
```

### Where each section comes from

| Prompt section | Where to find it |
|---|---|
| **Product Overview** | Your problem statement ("I am trying to...") rephrased as what the app does |
| **Target User** | Your persona's descriptive title |
| **User Flow** | Your MVP scope: the steps, and details you included |
| **Platform Requirements** | Keep the defaults unless you have a specific reason to change them |
| **Design System** | Your colour preferences, or describe the mood and let Lovable choose |

### Tips for your first prompt

- **Focus on the user flow.** This is the most important section. Lovable needs to know what the user does, in what order. Be specific: "Vote on books and see vote counts" is clearer than "voting feature".
- **Don't worry about getting the design perfect.** You can adjust colours, fonts, and layout in follow-up prompts. Get the functionality right first.
- **Leave out what you don't know yet.** A partly filled template with a clear user flow beats a detailed prompt full of guesses. You can refine everything as you go.

### One feature at a time after the first prompt

Your first prompt sets up the foundation. After that, add features one by one, so bugs are easier to find and fixes are more reliable. Follow-up prompts work best when you name three things: what it should look like, what it should do, and what happens in the edge cases, the awkward situations like an empty list or a title too long to fit.

If you're building with Lovable for the first time, the [First Prompt Template](https://littleparrot.app/nest/toolkit/17e40eb9-e190-40ed-b3d3-44300f2e2b08) in the Build Your First App with Lovable course covers the basics of writing your very first prompt. This template builds on that by connecting your prompt directly to the product planning work you've done here.
