---
challenge: "2 - Preventing Bugs Before They Happen"
---
## Bug Prevention Checklist

Run through this checklist every time you're about to prompt Lovable to add new functionality and again after it finishes. These habits catch most bugs before they become problems.

### Before you prompt

- [ ] **Is this one feature only?** Your prompt should do one thing. If you can describe it with "and" (e.g., "add voting *and* notifications *and* a leaderboard"), split it into separate prompts.
- [ ] **Is this feature small?** If the feature is complex, break it down into smaller parts. For example, instead of "add voting to books," start with "add a vote button to each book. When clicked, it stores the vote in the database." Then you can add "display the total votes on each book" in a separate prompt.
- [ ] **Did you bookmark your current stable version?** Before changing anything, bookmark what's working. If the next change breaks something, you have a safe point to return to.
- [ ] **Is the prompt specific enough?** Does it name the page, the component, the expected behaviour and the edge cases? Vague prompts lead to unexpected changes.

### After Lovable finishes

- [ ] **Did you test the new feature?** Click through the feature yourself. Try the happy path (smoothest way a user can use it successfully, without any errors or complications). Then try the possible unhappy paths (what happens when something goes wrong, like submitting an empty form).
- [ ] **Did you check that nothing else broke?** Quickly visit the pages and features closest to what changed. If you added a vote button to the books page, also check that books still load and display correctly.
- [ ] **Did you check the design?** Does the new feature look like it belongs? Does it match the style of the rest of the app? If not, consider asking Lovable to fix the design before moving on.
- [ ] **Is the change what you expected?** Compare what you see to what you asked for. If Lovable made additional changes you didn't request, consider reverting and reprompting with clearer guardrails.
- [ ] **Did you bookmark this version?** If everything works, bookmark it. This becomes your new safe point.

### Quick reference: the prevention loop

```
Bookmark → Prompt one feature → Test → Check surroundings → Bookmark → Repeat
```

Sticking to this loop means you always have a working version to fall back to, and bugs stay small and easy to find.
