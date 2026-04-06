---
challenge: "1 - Your First Prompt"
---
## Markdown Guide for Structured Prompts

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
