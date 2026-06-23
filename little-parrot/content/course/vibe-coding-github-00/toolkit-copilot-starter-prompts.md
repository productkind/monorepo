---
challenge: "6 - Make a Bigger Change with Copilot"
type: "Prompt library"
---
## Asking Copilot for Changes

Ready-to-adapt requests for GitHub Copilot, grouped by the moment you'd reach for them. Each one is written to model a good prompt, and comes with a short note on when to use it. Send them in **Agent** mode (or **Ask** mode for the understanding ones), and swap in your own app's details.

The examples use Dalmie's Book Club Organiser; change the headings, labels, and wording to match your own app.

### What makes a prompt work
> Name the **what**, the **where**, and an **example** of the result, then add detail.

The more specific you are, the closer Copilot's first attempt. Beyond what and where, spell out:
- **the look:** size, colour, spacing, and which existing style to match (e.g. "the same muted grey as the card subtitles")
- **the behaviour:** what it should do, and when ("update automatically as books are added")
- **the edge cases:** the empty list, a single item, a very long title

With about 50 requests a month on the free plan, one detailed ask beats three vague ones.

### Adding something to a page

**Show a small piece of information, like a count:**
```
On the home page, directly under the "On the shelf" heading, add a small line of muted secondary text showing how many books are currently in the list, for example "5 books suggested so far". Update it automatically as books are added or removed, handle the singular case ("1 book suggested so far"), and hide the line entirely when the list is empty.
```
Notice how specific that is: not just the **what** and **where**, but the **look** (muted secondary text), the **behaviour** (updates automatically), and the **edge cases** (singular, and empty). That detail is what earns a good first result.

**Handle an empty state, what the page shows before there's any data:**
```
Add an empty state to the book list on the home page. When there are no books yet, replace the empty list area with a centred message in muted text reading "No books suggested yet, be the first!", with comfortable vertical spacing above and below. Keep the "Suggest a book" button visible just beneath it so people can act straight away.
```

### Changing how something looks

**Reposition or restyle an element:**
```
On each book card, move the author's name so it sits directly beneath the book title as a subtitle, in a smaller muted secondary font (matching the supporting text already on the card). Add a little spacing between the title and the author so they don't feel cramped, and make sure it still reads well on a narrow mobile screen.
```

**Make an action stand out as the primary one:**
```
Make the "Suggest a book" button the primary action on the home page: use the app's primary accent colour as its background with white text, increase its padding so it's an easy tap target, and add a subtle hover state that darkens it slightly. Keep enough contrast that the label stays easy to read.
```

### Understanding before you change (Ask mode)

**Ask how a feature behaves, when you want to learn, not change anything:**
In Ask mode: 
```
Walk me through what happens when a member votes for a book. Where is the vote stored, can the same person vote for the same book more than once, and what stops duplicate votes? Don't change anything, I just want to understand it.
```

**Find where something lives in the code:**
In Ask mode: 
```
Which file and component render the home page, and roughly which lines hold the "What shall we read next?" heading? I'd like to edit that text by hand.
```

### Tweaking the agent's first attempt

**When it's close but not quite, refine in a follow-up rather than starting over:**
```
That's close. Two tweaks: make the count line one size smaller and use the same muted grey as the card subtitles, and move it to sit below the list instead of above it.
```

### When something breaks

**Hand the error straight back; the agent can read it and fix its own mistake:**
```
After your last change, the app shows this error in the browser instead of the home page: [paste the full error text]. Please find what caused it and fix it, and tell me in one line what went wrong.
```

### Keep in mind
- Copilot changes **what people see**. Anything that saves data, handles logins, sends emails, or takes payments lives in the backend Lovable manages, so build those **in Lovable**.
- Review every change in the diff and check it at localhost before you keep it. Nothing is committed until you commit.

New to writing prompts? The [Build Your First App with Lovable](https://littleparrot.app/5e86e580-264c-442c-8cc4-be5645f13e87/course-overview) course and its [toolkit](https://littleparrot.app/nest/toolkit?course=Build+Your+First+App+With+Lovable) cover crafting prompts in detail, and the same skills apply here.
