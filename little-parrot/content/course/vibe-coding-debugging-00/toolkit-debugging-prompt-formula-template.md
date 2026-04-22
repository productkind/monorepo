---
challenge: "6 - How to Guide Lovable to Fix Bugs"
---
## Debugging Prompt Formula Template

A copy-paste template for reporting bugs to Lovable. The more detail you include, the faster and more accurate the fix. Fill in each section and delete any that don't apply.

### The template

```
**What I was doing:**
I was on the [page name/URL] and I [action, e.g., "clicked the Vote button on a book suggestion"].

**What I expected:**
[Describe the correct behaviour, e.g., "The vote count should increase by 1 and the button should show as voted."]

**What actually happened:**
[Describe what you saw instead, e.g., "Nothing changed on screen. The vote count stayed the same."]

**Clues I found:**
- Console: [Paste any error messages, or "No errors in Console"]
- Network tab: [e.g., "POST /rest/v1/votes returned 401" or "All requests returned 200"]
- Cloud logs: [e.g., "Function log shows 'user_id is null'" or "No errors in logs"]
- Database: [e.g., "No new row appeared in the votes table" or "Row exists but vote_count is still 0"]

**What I've already tried:**
[e.g., "I tried logging out and back in, but same result. I also tried from a different browser."]

**What NOT to touch:**
[e.g., "Don't change the book listing page layout or the navigation. Only fix the voting logic."]
```

### Filled-in example

Here's how the template looks when filled in for a real bug:

```
**What I was doing:**
I was on the /books page and I clicked the Vote button next to "Atomic Habits".

**What I expected:**
The vote count should increase by 1 and the button should change to show I've already voted.

**What actually happened:**
Nothing happened. The vote count stayed at 3 and the button didn't change.

**Clues I found:**
- Console: No errors in Console
- Network tab: POST /rest/v1/votes returned 403
- Cloud logs: No function logs triggered for this action
- Database: No new row appeared in the votes table after clicking

**What I've already tried:**
I logged out and logged back in. Same result. I also tried a different book and got the same 403 error.

**What NOT to touch:**
Don't change the book listing layout, the navigation, or the user profile page. Only fix the voting functionality.
```

### Tips for better bug reports

- **Be specific about location.** "The Vote button on the /books page next to each book title" is much better than "the button doesn't work."
- **Include the status code** if you found one in the Network tab. It tells Lovable exactly where to look.
- **Always add guardrails.** The "What NOT to touch" section prevents Lovable from making unrelated changes that could introduce new bugs.
- **Copy the full error message.** If you found an error in the Console, paste the whole thing including the stack trace. The file names and line numbers in the stack trace point Lovable straight to the problem.
