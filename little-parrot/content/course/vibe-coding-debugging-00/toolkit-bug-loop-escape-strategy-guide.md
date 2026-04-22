---
challenge: "5 - Escaping Bug Loops"
---
## Bug Loop Escape Strategy Guide

When a fix breaks something else, and fixing that breaks the first thing again, you're in a bug loop. This guide helps you break out. Follow the decision flow, then use the strategy that fits your situation.

### When to use this guide

You've tried to fix the same bug three times and it's still not working, or fixing it keeps breaking something else. Stop prompting and open this guide instead.

### Pick your escape strategy

Ask yourself these questions in order. Use the first strategy that fits.

| Question | If yes, use this strategy |
|---|---|
| Did the feature work before a recent change? | **1. Revert** |
| Did it work at your last bookmark but you're not sure what broke it? | **2. Compare versions** |
| Have you been trying different fixes but none of them worked? | **3. Explain before fixing** |
| Does the fix work for one part but break another? | **4. Isolate the problem** |
| Has the feature become so tangled that every fix creates a new bug? | **5. Rewrite the feature** |

---

### Strategy 1: Revert

**When to use it:** The feature was working, then a recent change broke it and attempts to fix it are making things worse.

**Steps:**
1. Look at the responses in the chat. Each one has a revert option underneath.
2. Find the last response where the feature was still working.
3. Click **Revert** to go back to that point.
4. Try a different, more specific prompt this time.

**Pro tip:** The revert undoes the code changes but keeps your messages visible, so you can see what went wrong and avoid repeating it.

---

### Strategy 2: Compare versions

**When to use it:** The feature worked at your last bookmark, but something broke it and you're not sure which change caused the problem.

**Steps:**
1. Switch from Build mode to **Plan mode** (in the chat, at the bottom of the screen).
2. Prompt:
```
Compare the current version to the last bookmarked version. What files changed? List the differences and highlight anything that could cause [describe the bug].
```
3. Read the comparison, you might spot the change that introduced the bug.
4. Ask Lovable to investigate that change and find what broke the feature.

---

### Strategy 3: Explain before fixing

**When to use it:** You've tried several different fixes, but none of them work or they introduce new problems. You need Lovable to investigate the root cause before trying again.

**Steps:**
1. Switch to **Plan mode**.
2. Prompt:
```
We've been going back and forth on this bug. Before making any more changes, explain what might be the root cause of [explain bug]. I want to understand before we proceed.
```
3. Review Lovable's proposed plan. If it makes sense, click **Implement the plan** to apply the fix. If something sounds off or unclear, ask follow-up questions before proceeding.

---

### Strategy 4: Isolate the problem

**When to use it:** The fix works for one part of the feature but breaks another part. Multiple things are tangled together.

**Steps:**
1. Identify the simplest version of the feature that's broken. For example, if the vote button doesn't work and the count display is wrong, focus only on the vote button first.
2. Prompt:
```
Let's fix only [the specific part]. Ignore [the other parts] for now. Get [the specific part] working first without changing anything else.
```
3. Test just that one part.
4. Once it works, move to the next part in a separate prompt.

**Why this works:** Fixing one thing at a time prevents changes from interfering with each other. It's slower but far more reliable than trying to fix everything at once.

---

### Strategy 5: Rewrite the feature

**When to use it:** The code has become so patched and layered with fixes that every change creates a new problem. It's faster to start the feature fresh than to untangle it.

**Steps:**
1. Revert to the version before the feature existed (your last bookmark).
2. Write a clear, specific prompt for the feature from scratch, incorporating everything you've learned about what went wrong. The first version of the feature should be simple and focused on the core action your user will do in your product. Then build on it in a next prompt.
3. Prompt:
```
I want to add new functionality. Here's exactly what it should do:
[Describe the simplest possible first version of the feature, no extra details yet].
```
4. Test thoroughly before moving on.

**Why this works:** Rebuilding with Lovable is fast. A clean rebuild based on what you now know is often more reliable than layers of patches on top of a broken foundation.

---

### After you escape the loop

Once the bug is fixed:
- [ ] **Bookmark the working version** immediately.
- [ ] **Test the surrounding features** to make sure nothing else was affected.
- [ ] **Note what went wrong** so you can spot the pattern next time (too many things in one prompt? Missing guardrails? Skipped testing?).
