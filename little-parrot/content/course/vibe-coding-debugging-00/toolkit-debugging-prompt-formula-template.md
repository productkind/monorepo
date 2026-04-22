---
challenge: "6 - How to Guide Lovable to Fix Bugs"
---
## Debugging Prompt Formula Template

A copy-paste template for reporting bugs to Lovable. The more detail you include, the faster and more accurate the fix. Fill in each section and delete any that don't apply.

### The template

The template below is a bit more detailed as in the course we want to encourage you to include as
much information as possible. You can remove any sections that don't apply to your bug, but try to
be as thorough as you can in the ones you do fill in. The more information you provide, the easier
it will be for Lovable to find and fix the bug without needing to ask you follow-up questions.

```markdown
# Bug

[A one-line title describing the bug, e.g., "Vote button doesn't work on /books page"]

## Background
[Describe what was the state of the app before you did anything, e.g., "I was logged in as a regular
user and on the book listing page that had 3 books."]

## What I was doing
I was on the [page name/URL] and I [action, e.g., "clicked the Vote button on a book suggestion"].

## Expected behaviour
[Describe the correct behaviour, e.g., "The vote count should increase by 1 and the button should show as voted."]

## Actual behaviour 
[Describe what you saw instead, e.g., "Nothing changed on screen. The vote count stayed the same."]

## Clues found

- Console: [Paste any error messages, or "No errors in Console"]
- Network tab: [e.g., "POST /rest/v1/votes returned 401" or "All requests returned 200"]
- Cloud logs: [e.g., "Function log shows 'user_id is null'" or "No errors in logs"]
- Database: [e.g., "No new row appeared in the votes table" or "Row exists but vote_count is still 0"]

## Tried 
[e.g., "I tried logging out and back in, but same result. I also tried from a different browser."]

## What NOT to touch
[e.g., "Don't change the book listing page layout or the navigation. Only fix the voting logic."]
```

### Filled-in example

Here's how the template looks when filled in for a real bug:

```markdown
# Bug 

Vote button doesn't work on /books page

## Background
I was logged in as a regular user and on the /books page that had 3 books
listed, including "Atomic Habits" which had 3 votes.

## What I was doing
I was on the /books page and I clicked the Vote button next to "Atomic Habits".

## Expected behaviour
The vote count should increase by 1 and the button should change to show I've already voted.

## Actual behaviour
Nothing happened. The vote count stayed at 3 and the button didn't change.

## Clues found
- Console: No errors in Console
- Network tab: POST /rest/v1/votes returned 403
- Cloud logs: No function logs triggered for this action
- Database: No new row appeared in the votes table after clicking

## Tried
I logged out and logged back in. Same result. I also tried a different book and got the same 403 error.

## What NOT to touch
Don't change the book listing layout, the navigation, or the user profile page. Only fix the voting functionality.
```

### Tips for better bug reports

- **Describe the state of the app before you did anything.** This helps Lovable understand the context and reproduce the bug.
- **Be specific about location.** "The Vote button on the /books page next to each book title" is much better than "the button doesn't work."
- **Include the status code** if you found one in the Network tab. It tells Lovable exactly where to look.
- **Always add guardrails.** The "What NOT to touch" section prevents Lovable from making unrelated changes that could introduce new bugs.
- **Copy the full error message.** If you found an error in the Console, paste the whole thing including the stack trace. The file names and line numbers in the stack trace point Lovable straight to the problem.
