# Project Knowledge Starter Template
**Challenge 6: Plan, Test, and Connect Services**

Paste this template into Lovable's Knowledge panel (in your project, click `+` in the chat input, and select `Knowledge`). Fill in the sections that apply to your project. You don't need to complete everything at once. Start with the target user and design system, then add more as your project grows.

Lovable reads this context with every prompt you send, so it keeps your app consistent without you having to repeat yourself.

```markdown
## Target user
- Persona name: [e.g. Sarah]
- Who they are: [e.g. A book club organiser who coordinates a group of 8-12 members]
- What they need: [e.g. A simple way to collect book suggestions and vote on what to read next]
- What frustrates them: [e.g. Book suggestions get lost in WhatsApp, and organising votes is chaotic]

## Product outcome
This app helps [target user] to [core outcome, e.g. "organise book club activities without the chaos of group chats"].

## Design system
- Style: [e.g. warm, friendly, bookish]
- Primary colour: [e.g. #FDF6E3 (warm cream)]
- Accent colour: [e.g. #E07A5F (coral)]
- Dark colour: [e.g. #5C4033 (deep brown)]
- Heading font: [e.g. Merriweather]
- Body font: [e.g. Open Sans]
- Mobile-first layout
- Rounded corners on cards and buttons
- [Any other visual rules, e.g. "use illustrations instead of stock photos"]

## Tone of voice
The app should feel [e.g. "friendly and encouraging, like talking to a helpful friend"]. Avoid [e.g. "formal or corporate language"]. Use [e.g. "short sentences and casual phrasing"].

## Naming conventions
- App name: [e.g. Book Club Picks]
- Users are called: [e.g. "members", not "users"]
- The main items are called: [e.g. "suggestions", not "entries" or "posts"]

## Technical requirements
- Backend: Lovable Cloud
- Authentication: Google Sign-In
- It's a mobile-first platform. Optimise layout, font sizes, and buttons for mobile. Prioritise speed and readability.
- The platform is accessible. Implement WCAG AA compliance.
- The platform is SEO-optimised. Implement SEO best practices to ensure it's easily discoverable.
- The platform is GEO-optimised. Implement GEO best practices to ensure it's easily discoverable.
- Use [name of anaytics tool, e.g. PostHog] for product analytics. Implement event tracking for each new feature.
- [Any other decisions you've made, e.g. "No payment features in version 1"]
```

### Tips for using Project Knowledge well

- **Update it as you build.** When you go a different direction, than ititially planned (e.g. change your brand colours), update the corresponding section. This helps Lovable understand the current direction of your app.
- **Keep it concise.** Short, clear bullet points work better than long paragraphs. Lovable reads this with every prompt, so keep it scannable.
- **Include decisions, not just plans.** If you decided "no payment features in version 1", write that down. It stops Lovable from suggesting Stripe integration when you ask for a new feature.
- **Add rules when things go wrong.** If Lovable keeps using the wrong tone or style, add a rule to Project Knowledge. For example: "Never use the word 'synergy' anywhere in the app."
