---
challenge: "6 - Make a Bigger Change with Copilot"
type: "Prompt library"
---
## Asking Copilot for Changes

Ready-to-adapt requests for GitHub Copilot, each written with the recipe that gets a good result first time: **what** you want, **where** it goes, and an **example** of the result. Send them in **Agent** mode (or **Ask** mode for the understanding ones), and swap in your own app's details.

The examples use Dalmie's Book Club Organiser; change the headings, labels, and wording to match your own app.

### The recipe
> **What** to change, **where** it is, and an **example** of the result.

The clearer the request, the better the result. With about 50 requests a month on the free plan, one well-aimed ask beats three vague ones.

### Add something small
```
On the home page, under the "On the shelf" heading, add a small line that shows how many books are on the list, for example "5 books suggested so far".
```
```
When the book list is empty, show a friendly line in its place that reads "No books suggested yet, be the first!", instead of leaving a blank space.
```

### Adjust how something looks
```
On each book card, move the author's name to sit just under the title, in a smaller, muted grey font.
```
```
Make the "Suggest a book" button stand out more: give it the same accent colour as the page heading, and a little more padding.
```

### Understand before you change (Ask mode)
```
What happens when a member votes for a book? Can they vote more than once?
```
```
Which file holds the home page text, and where in it is the "What shall we read next?" heading?
```

### Tweak the agent's first attempt
```
That works, but make the new line smaller and grey, and move it below the list instead of above it.
```

### When something breaks
```
After your change, the app shows this error: [paste the full error text]. Can you fix it?
```

### Keep in mind
- Copilot changes **what people see**. Anything that saves data, handles logins, sends emails, or takes payments lives in the backend Lovable manages, so build those **in Lovable**.
- Review every change in the diff and check it at localhost before you keep it. Nothing is committed until you commit.

New to writing prompts? The [Build Your First App with Lovable](https://littleparrot.app/5e86e580-264c-442c-8cc4-be5645f13e87/course-overview) course and its [toolkit](https://littleparrot.app/nest/toolkit?course=Build+Your+First+App+With+Lovable) cover crafting prompts in detail, and the same skills apply here.
