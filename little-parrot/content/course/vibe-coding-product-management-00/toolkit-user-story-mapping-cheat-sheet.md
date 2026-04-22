---
challenge: "4 - Break Down Your Idea Into Buildable Steps"
---
## User Story Mapping Cheat Sheet

A quick-reference guide for breaking your idea into a structured map of everything your product needs to do. Keep this open while you're mapping out your sticky notes.

### The three layers

A user story map has three layers. Start at the top and work your way down.

| Layer | What it is | Question to ask | Example (Book Club Organiser) |
|---|---|---|---|
| **Activities** | The big things your user does to reach their goal. These sit across the top of your map. | "What are the main things my user wants to accomplish?" | Access the app, Set up book club, Choose next book |
| **Steps** | The actions your user takes within each activity. These sit under each activity in left-to-right order. | "How does my user do this activity, step by step?" | Create account, Sign in (under "Access the app") |
| **Details** | The specific things that happen at each step. These are the small, buildable pieces. | "What exactly happens here? What does the user see, click, or enter?" | Enter email and password, Use Google login (under "Create account") |

### How it looks

```
Activities:    [Access the app]     [Set up book club]     [Choose next book]
                    |                      |                      |
Steps:         Create account        Create club profile     Suggest books
               Sign in               Invite members          Browse suggestions
                                     Establish rules         Vote on books
                    |                                        Announce winner
Details:       Enter email               |                      |
               Use Google login      Enter club name         Add title and author
               Verify email          Add description         Add cover image
               Set display name      Set reading pace        Add recommendation note
```

### Writing good user stories at each layer

**Activities** are broad and goal-oriented:
- "Choose next book" (good: describes what the user wants to accomplish)
- "Book voting system" (not as good: describes the feature, not the user's goal)

**Steps** are short verb phrases:
- "Suggest books", "Browse suggestions", "Vote on books" (good: action-focused)
- "The book suggestion feature" (not as good: describes a thing, not what the user does)

**Details** start with an action word:
- "Enter club name", "Add title and author", "Cast vote" (good: specific and buildable)
- "Club name field" (not as good: describes a UI element, not what the user does)

### Common mistakes to avoid

| Mistake | How to fix it |
|---|---|
| **Too few activities** (trying to fit everything under one or two) | If an activity feels huge, it probably contains multiple activities. Split it. |
| **Steps that are actually details** (too specific for the second layer) | If a step mentions a specific UI element ("click the dropdown"), it's a detail. Move it down. |
| **Missing the user's perspective** | Every item should describe what the user does, not what the system does. "Send confirmation email" becomes "Receive confirmation email." |
| **Jumping to details before mapping activities and steps** | Work top-down. Get the full journey mapped at the activity level first, then add steps, then details. |

### After mapping

Once your map is complete, you'll use it to carve out your MVP. Draw a horizontal line across the map: everything above the line is your MVP, everything below is for later.
