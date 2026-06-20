# Little Parrot — User insights

Verbatim user insights collected from three sources. Everything here is reproduced **exactly as the user wrote it**, with attribution.

Extracted 2026-06-20.

## Attribution

For events/email/Discord (file `01`) names and handles are kept as recorded.

For in-app data (files `02`–`09`) each `user_id` is joined to the **profiles** table (`profiles_rows (2).csv` + `profiles_rows (3).csv`) and shown as:

> **Full name (nickname) · role · company size · `user_id` prefix**

Notes:
- `company_type` is a company-**size** bucket (e.g. `startup-1-50-employees`). The profiles table has no actual company *name*, so size is the closest field available.
- 521 of 555 distinct learners matched a profile; the other 34 show only their `user_id` prefix.

## Files

| File | Source | What's in it |
|------|--------|--------------|
| [`01-event-and-community-feedback.md`](01-event-and-community-feedback.md) | GitHub backlog issues #176, #224, #50, #250 | Feedback from events, AMAs, Discord, email, and the prompting-course preview. Named where known. |
| [`02-course-completion-feedback.md`](02-course-completion-feedback.md) | `all_course_feedback_rows.csv` | End-of-course feedback form (25 submissions): most useful, what was unclear, recommendation reasons, future learning interests. Grouped by course. |
| [`03-basics-of-software-for-vibe-coding.md`](03-basics-of-software-for-vibe-coding.md) | In-course step responses | Verbatim `reflection` / `free-text-exercise` answers, grouped by step. |
| [`04-build-your-first-app-with-lovable.md`](04-build-your-first-app-with-lovable.md) | In-course step responses | "" |
| [`05-build-your-business.md`](05-build-your-business.md) | In-course step responses | "" |
| [`06-build-a-valuable-product.md`](06-build-a-valuable-product.md) | In-course step responses | "" |
| [`07-fix-bugs-with-confidence.md`](07-fix-bugs-with-confidence.md) | In-course step responses | "" |
| [`08-launch-and-grow-your-lovable-app.md`](08-launch-and-grow-your-lovable-app.md) | In-course step responses | "" |
| [`09-write-better-with-ai.md`](09-write-better-with-ai.md) | In-course step responses | "" |

## How the in-course data was filtered

From the `2026-06-20-course-step-responses/` CSVs we kept only `reflection` and `free-text-exercise` step types, and pulled the user's writing from the `text` / `userText` field of `response_data`. We excluded:

- empty responses;
- test/junk responses (e.g. "test", "333", "asdf", single characters);
- unedited template scaffolds (e.g. answers left as "I am [your user]… I am trying to [desired outcome]…").

Nothing kept was reworded — only filtered in or out.
