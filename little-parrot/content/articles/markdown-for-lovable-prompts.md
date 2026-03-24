# How to Use Markdown in Lovable Prompts (With Examples)

Write better prompts for Lovable by using markdown formatting. This practical guide shows you exactly which markdown to use, when to use it, and how it improves your results.

## Why markdown makes your Lovable prompts better

When you type a plain text prompt into Lovable, the AI has to figure out the structure of your request on its own. Sometimes it gets it right. Often, it misses details or interprets your instructions differently from what you intended.

Markdown solves this. It's a simple formatting system that uses symbols like `##`, `-`, and `**` to organise your text into clear sections, lists, and emphasis. Lovable reads markdown natively, which means it can see the structure of your request before it starts building.

The result: fewer misunderstandings, less back-and-forth, and an app that's closer to what you imagined on the first try.

You don't need to memorise markdown. This guide covers the seven formatting tools that make the biggest difference in Lovable prompts. Keep it open while you write.

## Headings: break your prompt into sections

Headings are the most powerful markdown feature for prompting. They tell Lovable "this is a new topic" so it treats each part of your request separately.

There are three levels:

- `#` is the main title. Use one at the top to name what you're building.
- `##` marks major sections. This is the one you'll use most.
- `###` creates sub-sections within a section. Useful when a section has distinct parts.

### Example

```markdown
# Book Club Organiser

## Product overview
A simple app where book club members can suggest books for the group to read next.

## Design system
### Colours
- Primary: warm cream (#FDF6E3)
- Accent: coral (#E07A5F)

### Typography
- Heading font: Merriweather
- Body font: Open Sans
```

For shorter prompts, `##` is all you need. As your prompts get longer, `#` and `###` help Lovable see the hierarchy of your instructions. Think of it like chapter titles and sub-chapters in a book.

## Bullet points: list things that don't need a specific order

Use `-` followed by a space to create a list. Bullet points are ideal for requirements, features, or design details where sequence doesn't matter.

### Example

```markdown
## Platform requirements
- Mobile-first layout
- Accessible (WCAG AA compliance)

## Design system
- Brand colours: warm cream, deep brown, coral
- Style: cosy, bookish, friendly
- Rounded corners on cards and buttons
```

## Numbered lists: describe steps in sequence

Use `1.` `2.` `3.` followed by a space for actions that happen in a specific order. This tells Lovable "these things happen in this sequence."

### Example

```markdown
## User flow
1. User opens the app and sees a list of book suggestions
2. User clicks "Add book" and types the title and a short note
3. User clicks "Save" and the book appears in the list
```

Numbered lists are essential for describing user flows, onboarding steps, and any multi-step interaction in your app.

## Bold text: highlight what Lovable shouldn't miss

Wrap a word or phrase in `**double asterisks**` to make it bold. Use it sparingly to flag key decisions or constraints.

### Example

```markdown
## Implementation details
- **No login** required for the first version
- Store data **locally** for now
- **Mobile-first** layout is required
```

Bold is especially useful when you're making a deliberate choice that Lovable might otherwise overlook or default differently on.

## Inline code: specify exact values

Wrap a word or value in single backticks (`` ` ``) to tell Lovable "use this exact text or value." This is the formatting to use for hex colours, button labels, placeholder text, and error messages.

### Example

```markdown
- Brand colour: `#FDF6E3`
- The button should say `Add to reading list`
- Show the placeholder text `e.g., Harper Lee` in the author field
- Display the error message `Please enter a book title` when the field is empty
```

Without backticks, Lovable might paraphrase your text or pick a slightly different shade. With backticks, it uses your exact wording.

## Code blocks: provide longer exact content

Wrap multiple lines in triple backticks (` ``` `) when you want to specify a block of text your app should display. This is useful for welcome messages, email templates, or landing page content.

### Example

````markdown
```
Welcome to Book Club Picks!

Suggest a book, vote on your favourites, and discover your group's next great read.
```
````

Code blocks tell Lovable "display this content exactly as written" rather than generating its own version.

## Links: point to references and inspiration

Use `[text](URL)` to include a clickable link. Links help you point Lovable to visual references, design inspiration, or documentation for services you want to integrate.

### Example

```markdown
- Use the colour palette from [this example](https://coolors.co/palette/264653-2a9d8f-e9c46a)
- Follow the layout style of [Notion's homepage](https://notion.so)
- Integrate payments using [Stripe](https://stripe.com)
```

You can also attach screenshots and images directly in Lovable for visual references, but links work well when you want to point to a live website or resource.

## Putting it all together: a complete structured prompt

Here's a full prompt that uses all seven markdown features together. You can copy this template and replace the content with your own app idea.

```markdown
# Book Club Organiser

## Product overview
A simple app where book club members can suggest books for the group to read next. Solves the problem of book suggestions getting lost in group chats.

## User flow
1. User opens the app and sees a list of book suggestions
2. User clicks `Add book` and types the title, author, and a short note
3. User clicks `Save` and the book appears in the list

## Platform requirements
- Mobile-first layout
- Accessible (WCAG AA compliance)

## Design system
### Colours
- Primary: `#FDF6E3` (warm cream)
- Accent: `#E07A5F` (coral)
- Dark: `#5C4033` (deep brown)

### Typography
- Heading font: Merriweather
- Body font: Open Sans

### Style
- Cosy, bookish, friendly
- Rounded corners on cards and buttons
- Use the layout style of [Notion](https://notion.so) as inspiration

## Implementation details
- **No login** required for the first version
- Store data **locally** for now

## Target user
Sarah, a book club organiser who wants to spend less time on admin and more time reading with friends.
```

## Quick reference table

| What you want | What you type | When to use it |
|--------------|--------------|----------------|
| Main title | `# Your title` | Once at the top to name your app |
| Section heading | `## Your heading` | To separate major parts of your prompt |
| Sub-section | `### Your sub-heading` | To organise within a section (e.g., Colours, Typography) |
| Bullet point | `- Your item` | For lists where order doesn't matter |
| Numbered step | `1. First step` | For user flows and sequential steps |
| Bold text | `**important word**` | To highlight key decisions or constraints |
| Exact value | `` `#FDF6E3` `` | For hex colours, button labels, placeholder text |
| Block of exact text | ```` ``` your text ``` ```` | For welcome messages, email templates, landing page copy |
| Link | `[text](URL)` | To reference design inspiration or external resources |

## Common mistakes to avoid

**Writing one long paragraph instead of using sections.** If your prompt is longer than 3-4 sentences, break it up with `##` headings. Lovable processes structured prompts more accurately than walls of text.

**Describing everything at once.** Start with one core feature in your first prompt. Once it's working, add the next feature in a follow-up prompt. Smaller, focused prompts give better results than mega-prompts.

**Being vague about visual details.** "Make it look nice" gives Lovable very little to work with. "Use `#FDF6E3` as the background colour, Merriweather for headings, and rounded corners on all cards" tells it exactly what you want.

**Forgetting to describe the user flow.** Without numbered steps showing what the user does, Lovable has to guess the interaction design. A clear user flow is the difference between an app that feels intuitive and one that feels confusing.

## Start building

Markdown is a small investment that pays off every time you prompt. The more structured your request, the closer Lovable gets on the first try, which means less fixing and more building.

If you want to go deeper, Little Parrot's [Build Your First App with Lovable](https://littleparrot.app) micro-course walks you through writing your first structured prompt, iterating on your app, connecting it to real data, and publishing it on the internet. It's designed for non-technical builders who want to create real products without writing code.
