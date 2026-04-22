---
challenge: "3 - How Developers Investigate Bugs"
---
## Debugging Investigation Checklist

A step-by-step investigation flow to follow every time something goes wrong in your app. Work through the steps in order. Stop as soon as you find a clue, and share it with Lovable.

### Step 1: Reproduce the bug

- [ ] **Open browser DevTools first** (F12 on Windows, Cmd+Option+I on Mac), then trigger the bug again while watching for errors.
- [ ] **Note exactly what you did** when the bug appeared: which page, which button, what data you entered.
- [ ] **Try it a second time.** Does it happen every time, or only sometimes? This matters for the fix.

### Step 2: Check the Console for frontend errors

- [ ] **Look at the Console tab** in DevTools. Are there any red error messages?
- [ ] **Copy the full error message**, including the stack trace (the lines underneath that show file names and line numbers). Lovable needs the whole thing, not just the first line.

### Step 3: Check the Network tab for failed requests

- [ ] **Switch to the Network tab** in DevTools and reproduce the bug again.
- [ ] **Look for red entries** or status codes that aren't 200.
- [ ] **Note the status code and the request name** (e.g., "POST /rest/v1/votes returned 401").

### Step 4: Check Lovable Cloud logs

- [ ] **Open the Cloud tab** in Lovable, then go to Logs and select Function logs from the dropdown.
- [ ] **Look for error messages or unexpected values** around the time you triggered the bug.
- [ ] **Copy anything that looks relevant**, especially lines with "error", "failed", or unexpected data.

### Step 5: Check the database directly

- [ ] **Open the Cloud tab**, then go to the Database section and click the relevant table.
- [ ] **Check if the data you expected is there.** For example, if you submitted a form, is there a new row? If you deleted something, is the row gone?
- [ ] **Check if the data looks correct.** Are any columns empty that shouldn't be? Does a foreign key point to the right record?

### Step 6: Still no clues? Add logging

If nothing above revealed the problem, ask Lovable to add temporary logging so you can see what the code is doing step by step.

**Copy this prompt and fill in the blanks:**

```markdown
There is a bug in the [feature name] feature, but I can't find any clues in the Console, Network
tab, Cloud logs, or database.

The bug happens when I [describe the steps to reproduce the bug].
[Describe what you expected to happen, and what actually happened instead.]

Add logging to the [feature name] process to show:
- What data is being sent
- What response is received
- Any errors that occur

Then I'll reproduce the bug and check the Console for the new log messages.
```

After reproducing the bug, check the Console for the new log messages and share what you find with Lovable.

### What to do with your clues

Once you've found something, share it with Lovable using the [Debugging Prompt Formula Template](https://littleparrot.app/nest/toolkit/PLACEHOLDER) in the Toolkit. The more specific your clues, the faster the fix.
