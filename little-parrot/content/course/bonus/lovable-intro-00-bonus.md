# Bonus Materials: Build Your First App with Lovable

---

## 1. First Prompt Template
**Challenge 1: Your First Prompt**

Copy this template, replace the text in brackets with your own idea, and paste it into Lovable. You don't need to fill in every section perfectly. Start with what you know, and refine it later.

```markdown
## Product overview
[What is this app? Describe it in 1-2 sentences. What problem does it solve for your user?]

## User flow
1. [What does the user see when they first open the app?]
2. [What's the first thing they do?]
3. [What happens next?]

## Platform requirements
- Mobile-first layout
- Accessible (WCAG AA compliance)

## Design system
- Brand colours: [your main colour], [your accent colour], [your background colour]
- Heading font: [e.g. Merriweather, Playfair Display, or leave blank for Lovable to choose]
- Paragraph font: [e.g. Open Sans, Inter, or leave blank for Lovable to choose]
- Style: [describe the vibe in 2-3 words, e.g. "warm and friendly", "clean and minimal", "playful and bold"]

## Implementation details
- No login required for the first version
- Store data locally for now

## Target user
[Who is this for? Give them a name and a one-sentence description, e.g. "Sarah, a book club organiser who wants to spend less time on admin and more time reading with friends."]
```

### Dalmie's starting prompt

This is the prompt Dalmie uses in the course to build the Book Club Organiser. You can copy it straight into Lovable to build the example app, or use it as a reference for how a filled-in template looks.

```markdown
## Product overview
A simple app where book club members can suggest books for the group to read next.

## User flow
1. User opens the app and sees a list of book suggestions
2. User can add a new suggestion with the book title and a short note about why they recommend it

## Platform requirements
- Mobile-first layout
- Accessible (WCAG AA compliance)

## Design system
- Brand colours: warm cream (#FDF6E3), deep brown (#5C4033), coral (#E07A5F)
- Heading font: Merriweather
- Paragraph font: Open Sans
- Style: cosy, bookish, friendly

## Implementation details
- No login required for the first version
- Store data locally for now

## Target user
Sarah, a book club organiser who wants to spend less time on admin and more time reading with friends.
```

Notice what Dalmie left out: voting, deadlines, current book tracking, organiser controls. Those come later. Her first prompt focuses on one thing only: a place to collect book suggestions.

### Tips for getting better results

- **Start with one core feature.** Don't try to describe your entire vision. Pick the one thing your user needs most, and build that first.
- **Be specific about the user flow.** "User can add items" is vague. "User clicks 'Add book', types the title and a short note, then clicks 'Save'" gives Lovable a clearer picture.
- **Don't stress about the design system.** If you're not sure about colours or fonts, describe the mood instead: "cosy and bookish" or "professional and clean". Lovable will interpret it.
- **Leave out what you don't know yet.** A partially filled template is better than a vague paragraph. You can always add more detail in follow-up prompts.

---

## 2. Markdown Guide for Structured Prompts
**Challenge 1: Your First Prompt**

Lovable understands markdown, a simple way to format text that helps it read the structure of your request. You don't need to memorise any of this. Keep this guide open while you write your prompts, and copy the formatting you need.

### Headings

Headings break your prompt into clear sections. There are different levels you can use:

- `#` is the main title of your prompt. Use one at the top to name what you're building.
- `##` marks the major sections (Product overview, User flow, Design system, etc.). This is the one you'll use most.
- `###` creates sub-sections within a section. Useful when a section has distinct parts.

```markdown
# Book Club Organiser

## Design system
### Colours
- Primary: warm cream (#FDF6E3)
- Accent: coral (#E07A5F)

### Typography
- Heading font: Merriweather
- Body font: Open Sans
```

Lovable treats each heading as a separate topic, which helps it understand the different parts of your request. For shorter prompts, `##` is all you need. As your prompts get longer, `#` and `###` help Lovable see the hierarchy of your instructions.

### Bullet points

Use `-` followed by a space to create a list of items that don't need to be in a specific order.

```markdown
## Platform requirements
- Mobile-first layout
- Accessible (WCAG AA compliance)
```

Bullet points are great for listing requirements, features, or design details where the order doesn't matter.

### Numbered lists

Use `1.` `2.` `3.` followed by a space for steps that happen in a specific order.

```markdown
## User flow
1. User opens the app and sees a list of book suggestions
2. User clicks "Add book" and types the title and a short note
3. User clicks "Save" and the book appears in the list
```

Numbered lists tell Lovable "these things happen in this sequence." Use them for user flows and step-by-step instructions.

### Bold text

Wrap a word or phrase in `**double asterisks**` to make it bold.

```markdown
## Implementation details
- **No login** required for the first version
- Store data **locally** for now
```

Bold draws attention to the important parts of a sentence. Use it sparingly to highlight key decisions or constraints you don't want Lovable to miss.

### Inline code

Wrap a word or value in single backticks to mark it as an exact value.

```markdown
- Brand colour: `#FDF6E3`
- The button should say `Add to reading list`
- Show the placeholder text `e.g., Harper Lee` in the author field
```

Inline code tells Lovable "use this exact text or value." It's especially useful for hex colours, button labels, placeholder text, and error messages where you want the precise wording you've chosen.

### Code blocks

Wrap multiple lines in triple backticks to mark a block of exact content.

````markdown
```
Welcome to Book Club Picks!

Suggest a book, vote on your favourites, and discover your group's next great read.
```
````

Code blocks are useful when you want to specify longer text that your app should display, like a welcome message, an email template, or placeholder content for a landing page.

### Links

Use `[text](URL)` to include a link.

```markdown
- Use the colour palette from [this example](https://coolors.co/palette/264653-2a9d8f-e9c46a)
- Follow the layout style of [Notion's homepage](https://notion.so)
```

Links help you point Lovable to visual references, design inspiration, or documentation for a third-party service you want to integrate.

### Quick reference

| What you want | What you type | When to use it |
|--------------|--------------|----------------|
| Section heading | `## Your heading` | To separate parts of your prompt (Product overview, User flow, etc.) |
| Bullet point | `- Your item` | For lists where order doesn't matter (requirements, design details) |
| Numbered step | `1. First step` | For steps that happen in sequence (user flows) |
| Bold text | `**important word**` | To highlight key decisions or constraints |
| Exact value | `` `#FDF6E3` `` | For hex colours, button labels, placeholder text, error messages |
| Block of exact text | ```` ``` your text ``` ```` | For longer content your app should display (welcome messages, email templates) |
| Link | `[text](URL)` | To reference design inspiration or external resources |

---

## 3. Prompt Library: Common Features
**Challenges 2–3: Iterate and Improve & Save Data with Lovable Cloud**

These prompts follow the pattern taught in the course: specific, focused, one feature at a time. Copy the one you need, adjust the details in brackets, and paste it into Lovable as a follow-up prompt.

### Connect to Lovable Cloud
Use this after your app is working locally and you want data to persist.

```
Connect this app to Lovable Cloud so that data is saved and accessible from any device.
```

### Add Google Authentication
Use this when you need users to log in (required before features like voting, personal profiles, or saved preferences).

```
Add Google Authentication. Users should be able to sign in with their Google account. Show a "Sign in" button in the header. Once signed in, show their name and a "Sign out" button instead.
```

### Add a voting or "like" feature
Use this after authentication is set up.

```
Add a voting feature. Each logged-in user can vote for one [item] from the list. Show vote counts next to each [item]. When a user votes, update the count in real-time. Ensure each user can only vote once.
```

### Add a form field
Use this to improve an existing form.

```
Improve the [form name] form. Add a "[Field name]" field with the placeholder text that says "[example placeholder, e.g. 'e.g., Harper Lee']."
```

### Add a confirmation message
Use this after any action where the user should know something happened.

```
After the user [action, e.g. "submits a book suggestion"], show a confirmation message that says "[your message, e.g. 'Book added! Others can now see your suggestion.']". The message should disappear after 3 seconds.
```

### Add a search or filter
Use this when your app has a list that could get long.

```
Add a search bar above the [list name]. Users can type to filter [items] by [field, e.g. "title or author"]. Show results as they type. If nothing matches, show a friendly message like "No results found."
```

### Add a delete option
Use this when users need to remove their own entries.

```
Allow logged-in users to delete [items] they created. Show a small delete icon next to each [item] they own. When clicked, show a confirmation dialog: "Are you sure you want to delete this?" Only the user who created the [item] should see the delete option.
```

### Change the layout or style of a section
Use this for visual refinements.

```
Change the [section name, e.g. "book suggestion cards"] to [describe what you want, e.g. "display as a grid of cards instead of a list. Each card should show the title in bold, the author below it, and the note in lighter text. Add a subtle shadow to each card."]
```

### Add a simple navigation menu
Use this when your app has more than one page.

```
Add a navigation bar at the top of the app with links to [page 1, e.g. "Suggestions"], [page 2, e.g. "Currently Reading"], and [page 3, e.g. "My Profile"]. Highlight the current page. On mobile, collapse the menu into a hamburger icon.
```

### Prompt to ask Lovable to test your feature
Use this after building any feature.

```
Test the [feature name] feature. Try [specific action 1, e.g. "adding a book suggestion with a title and note"]. Then try [specific action 2, e.g. "adding a suggestion without a title to see if validation works"]. Report what happens.
```

---

## 4. Pre-Publish Checklist
**Challenge 7: Publish and Share Your App**

Go through this list before you publish your app for the first time. It takes five minutes and makes your app feel noticeably more professional.

### Branding and first impressions

- [ ] **Favicon set.** Upload a simple icon (your logo works well) so your app has its own icon in browser tabs.
- [ ] **Title written.** Write a clear, short title that tells people what your app does (this appears in browser tabs and search results).
- [ ] **Description written.** Write 1-2 sentences about what your app does and who it's for (this appears when someone shares your link).
- [ ] **Share image uploaded.** Add an image that shows up when your link is shared on social media or in messaging apps.
- [ ] **Published URL set.** Choose a short, memorable URL instead of the default one (e.g. `book-club-picks.lovable.app` instead of a random string).

### Security and stability

- [ ] **Security warnings checked.** Open the Security panel and resolve any errors. Click "Try to fix all" first. Warnings are okay, errors need fixing.
- [ ] **Tested on mobile.** Use the device preview to check your app looks good on a phone screen.
- [ ] **Tested on desktop.** Check the full-screen preview to make sure nothing looks broken on a larger screen.
- [ ] **Key features tested.** Walk through the main user flow yourself. Does everything work as expected?

### If your app uses external services

- [ ] **API keys switched to production.** If you're using test keys for services like Stripe or an email provider, switch them to real (production) keys before publishing.
- [ ] **Login tested.** If your app has authentication, test signing in and signing out.
- [ ] **Data saves correctly.** Add something, close the browser, reopen it, and check the data is still there.

### Final step

- [ ] **Bookmark this version.** Before publishing, bookmark the current version in Lovable's version history. If you add new features later on, and anything goes wrong, you can revert to this stable point.

---

## 5. First User Feedback Script
**Challenge 7: Publish and Share Your App**

You've published your app. Now share it with one person and learn from how they use it. This script gives you a simple structure for gathering feedback that you can turn into your next prompt.

### Who to ask

Pick someone who fits your target user, not someone who'll tell you "it's nice" to be polite. Ideally, this is someone who actually has the problem your app solves.

If you don't have access to your target user yet, a friend who'll be honest with you works too. Just tell them: "I want real feedback, not compliments."

### How to ask

Send them the link with a short message. Keep it casual:

> "I'm building an app for [who it's for] and I'd love your honest feedback. It's still early so nothing will hurt my feelings. Here's the link: [your URL]. Try using it for 5 minutes, then I have three quick questions."

### The three questions

After they've used it, ask:

1. **"What did you try to do first?"**
This tells you if your app's purpose is clear. If they tried something your app doesn't do yet, that's valuable information about what users expect.

2. **"What frustrated you or didn't work how you expected?"**
This reveals bugs and confusing design choices you can't see because you built it. Don't defend or explain. Just listen and write it down.

3. **"If you could change one thing, what would it be?"**
This forces them to prioritise. The answer tells you what to work on next.

### Turning feedback into your next prompt

Take the most common or most important piece of feedback and turn it into a focused Lovable prompt. For example:

| Feedback | Prompt |
|----------|--------|
| "I didn't know how to add a book" | `Make the "Add Book" button more visible. Move it to the top of the page and make it a large, clearly labelled button with the text "Suggest a Book".` |
| "It looks weird on my phone" | `Improve the mobile layout of the [page name]. Make sure the cards stack vertically, text is readable without zooming, and buttons are easy to tap.` |
| "I wasn't sure if my suggestion was saved" | `After the user submits a book suggestion, show a confirmation message that says "Book added! Others can now see your suggestion." The message should disappear after 3 seconds.` |

### One more thing

Thank the person who gave you feedback. They just saved you hours of guessing. And if they liked it, ask them if they'd be happy to keep testing as you add more features. Early testers are gold.

---

## 6. Project Knowledge Starter Template
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
