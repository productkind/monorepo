# Fix Bugs with Confidence Debugging Your Lovable App — Learner responses (verbatim)

Source: in-course `reflection` and `free-text-exercise` step responses (`2026-06-20-course-step-responses/`).  
Responses are reproduced **verbatim**. Attribution joins the profiles table on `user_id`: **name (nickname) · role · company size · `id`**. `company_type` is a company-*size* bucket (the table has no company name). Where a learner isn't in the profiles table, only the `user_id` prefix is shown.  
Junk/test/empty/unedited-template responses were excluded.  
Total responses below: **12**

---

## Step 18 — Practice: Describe a bug clearly

*Prompt: Imagine Sarah's Book Club Organiser has a bug: when she tries to add a new book suggestion, she types the title and author, clicks Submit, but the book doesn't appear in the list.   Write a clear, specific description of this bug that Sarah could use in Chat mode to ask Lovable for help.*

`97b719f1` · 2025-12-11 · _free-text-exercise_

> When I add a new book suggestion, I type the title and author, click Submit, but the book doesn't appear in the list.

---

## Step 23 — Reflection: Debugging mindset

*Prompt: What is one mindset shift you can make to approach bugs more effectively?*

`e27f3ece` · 2026-01-28 · _reflection_

> One mindset shift I can make is that I think about bugs as investigating like a detective.

---

## Step 24 — Reflection: Your project

*Prompt: What are you building with Lovable, and how will knowing more about debugging will help you?*

**Lara** · Business Operations Manager · medium-sized-company-201-1000-employees · `a4822511` · 2026-03-24 · _reflection_

> this was very helpful

**Michelle Hummel** · CEO of Digital Marketing Agency · small-business-51-200-employees · `3b40aacb` · 2026-03-03 · _reflection_

> when i read the security messages

**Carolina Rodrigues** · `b048415f` · 2026-02-25 · _reflection_

> Help me identify the possible errors that may occur and how to fix them.

---

## Step 28 — Break it down

*Prompt: Sarah wants to add a feature where book club members can leave comments on book suggestions. Instead of one big prompt, break this down into small, testable steps. What would be the first 3-4 small prompts she should use?*

`97b719f1` · 2025-12-11 · _free-text-exercise_

> 1. Book club members can leave comments.
> 2. Book club members can see comments.
> 3. Book club members can reply to comments.

---

## Step 34 — Practice: Break it down

*Prompt: Dalmie wants to add a comments feature where book club members can discuss each book suggestion. What are the best practices she should follow to prevent bugs while building this feature?*

`e27f3ece` · 2026-01-28 · _free-text-exercise_

> 1. Save comments
> 2. See comments
> 3. Edit comments

---

## Step 38 — Practice: Write a frontend bug report

*Prompt: Imagine you're Sarah. The book suggestion list shows "undefined" instead of book titles. You open the Console and see:  `TypeError: Cannot read properties of null (reading 'title')`  Write a clear message to send to Lovable in Chat mode, including what's happening, what you expected, and the error.*

`97b719f1` · 2025-12-11 · _free-text-exercise_

> The book suggestion list shows "undefined" instead of book titles. I open the Console and see:
> 
> TypeError: Cannot read properties of null (reading 'title')

---

## Step 59 — Practice: Investigation plan

*Prompt: Dalmie's Book Club Organiser has a bug: when she adds a new book, it shows on screen briefly, but disappears after she refreshes the page.  Describe how she should investigate this bug. What places should she check, and in what order? What clues might she find?*

`e27f3ece` · 2026-01-29 · _free-text-exercise_

> 1. Network and Console tabs
> 2. Backend function logs
> 3. Database

---

## Step 72 — Practice: Match tools to problems

*Prompt: For each bug Dalmie encounters, write which tool she should use (Chat mode, Visual edits, or Try to Fix) and briefly explain why:  1. The "Add Book" button is grey but should be teal. 2. After adding a book, it appears but disappears when she refreshes the page. 3. A red "Build unsuccessful" error appeared after her last prompt. 4. The list of books shows "undefined" for each title.*

`e27f3ece` · 2026-01-29 · _free-text-exercise_

> 1. Visual edits
> 2. Check Database
> 3. Click "Try to fix"
> 4. Check the database

---

## Step 96 — Practice: Write a complete debugging prompt

*Prompt: Dalmie's Book Club Organiser has a bug: The "Add Book" form submits successfully (she sees a success message), but the new book doesn't appear in the list. She checked the database and the book IS saved with correct data. She's on the `/books` page logged in as an organiser.  Write a complete debugging prompt using the formula we learned.*

`e27f3ece` · 2026-01-29 · _free-text-exercise_

> I'm on the /books page, submitted a book, but it doesn't appear in the list.

---

## Step 116 — Practice: Prioritise Dalmie's security warnings

*Prompt: Dalmie's Book Club Organiser is ready to publish. The security scanner shows these findings:  1. Error: RLS not enabled on the "members" table 2. Warning: Leaked password protection is disabled 3. Info: Missing X-Frame-Options header 4. Warning: An API key for her email service is visible in the frontend code  She wants to share the app with her 15 book club members. Which warnings should she fix …*

`97b719f1` · 2026-02-10 · _free-text-exercise_

> Fix the "Error: RLS not enabled on the "members" table" first

---
