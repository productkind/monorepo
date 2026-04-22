---
challenge: "6 - Create a Prompt to Build Your MVP with AI"
---
## AI Builder Prompt Template

A copy-paste prompt structure for turning your MVP plan into building instructions for Lovable. This template bridges directly from the work you've done in this course: your problem statement, persona, and user story map.

### The template

Copy this into Lovable and replace the bracketed text with your own details. Delete any sections that don't apply to your first version.

```markdown
## Product Overview
[One sentence: what the app does and who it's for. Pull this from your problem statement.]

## Target User
[Your persona's name and a one-sentence description. Pull this from your user persona.]

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

### Filled-in example: Book Club Organiser

This is the prompt for the Book Club Organiser MVP, built directly from the story map and MVP scope defined earlier in the course.

```markdown
## Product Overview
A web app for book club organisers to collect book suggestions from members and vote on which book to read next.

## Target User
Sarah, a book club organiser who wants to spend less time on admin and more time reading with friends.

## User Flow
1. Create a book club by entering a club name
2. Invite members with a shareable link
3. Suggest books by adding a title and author
4. Browse all book suggestions as a list
5. Vote on books and see vote counts
6. View the most voted book as the next read

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
| **Target User** | Your persona's name and descriptive title |
| **User Flow** | Your MVP scope: the activities, steps, and details you included |
| **Platform Requirements** | Keep the defaults unless you have a specific reason to change them |
| **Design System** | Your colour preferences, or describe the mood and let Lovable choose |

### Tips for your first prompt

- **Focus on the user flow.** This is the most important section. Lovable needs to know what the user does, in what order. Be specific: "Vote on books and see vote counts" is clearer than "voting feature."
- **One feature at a time after the first prompt.** Your first prompt sets up the foundation. After that, add features one by one with follow-up prompts. This makes bugs easier to find and fixes more reliable.
- **Don't worry about getting the design perfect.** You can always adjust colours, fonts, and layout in follow-up prompts or with Visual edits. Get the functionality right first.
- **Leave out what you don't know yet.** A partially filled template with a clear user flow is better than a detailed prompt full of guesses. You can refine everything as you go.

If you're building with Lovable for the first time, the [First Prompt Template](https://littleparrot.app/nest/toolkit/17e40eb9-e190-40ed-b3d3-44300f2e2b08) in the Build Your First App with Lovable course covers the basics of writing your very first prompt. This template builds on that by connecting your prompt directly to the product planning work you've done in this course.
