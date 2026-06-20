# Extract User Insights From Mixed Sources

## About
- Tool: Claude Code
- Skills used: none (data extraction + analysis task)
- Needed beforehand: authenticate into GitHub via the terminal; export the data to CSV (course feedback, in-course step responses, and the profiles/users table)
- Output: a folder of markdown files holding verbatim user insights (one per source/course), a cross-cutting patterns synthesis, and a README index

## Prompt
I created a /Users/kingamagyar/Documents/productkind/monorepo/little-parrot/user-insights folder that I want to populate with md files that include insighs of our Little Parrot users. There are 3 sources that I'd like you to extract insights from and add each insight into a markdown file. It's important to keep the insights verbatim, so we exactly want to see what the user wrote and who it was. The three sources:
1. We have some user insights in our GitHub backlog in the following issues from different events/sources: #176, #224, #50, #250
2. We have feedback from ourses who completed either of our courses: /Users/kingamagyar/Documents/productkind/monorepo/little-parrot/user-insights/all_course_feedback_rows.csv
3. We have inputs that the user provided throughout completing each course (for one we have several files, as there were several pages in the DB). The insight the user provided can be found in the `response_data` column, then within there's either a "text" field or "userText" field. Focus on `reflection` or `free-text-exercise` step_type. You can find the user responses in this folder: /Users/kingamagyar/Documents/productkind/monorepo/little-parrot/user-insights/2026-06-20-course-step-responses

## Follow-up prompts
1. Enrich attribution by joining the users/profiles table:
   > I do have the users table in two csv files. When adding the name, also add the full_name, nickname, role, company_name that you can find in the files: [profiles_rows (2).csv, profiles_rows (3).csv]
2. Find patterns across everything:
   > Now I want you to identify patterns across all the user insights. What do users find useful in our courses? What do they miss? What could help them learn better? What do they want to learn next? Anything else that stands out.

## How the insights were extracted

A three-step process: collect verbatim, attribute, then synthesise.

### 1. Collect each source verbatim
- **GitHub issues (#176, #224, #50, #250)** were pulled with `gh issue view` and hand-curated into `01-event-and-community-feedback.md`, keeping the real names/handles already in the issues.
- **Course-completion feedback** (`all_course_feedback_rows.csv`, 25 rows) was parsed with a Python script into `02-course-completion-feedback.md`, grouped by course, one section per submission with each free-text field (most useful, unclear, recommend reason, future learning, other).
- **In-course step responses** (the large CSVs in `2026-06-20-course-step-responses/`) were parsed with Python. The script kept only `reflection` and `free-text-exercise` rows, pulled the learner's writing from the `text` / `userText` field inside the `response_data` JSON, and grouped responses by course and by step (with the step prompt for context). One markdown file per course (`03`–`09`); the four "Build Your First App" export pages were merged into one.
- Python `csv` + `json` parsing was used throughout (not shell `grep`/`sed`) because the cells contain embedded JSON with quotes and newlines.

### 2. Filter out the noise (without rewording anything)
The raw step responses contained a lot of junk. A filter excluded: empty responses; test/throwaway answers ("test", "333", "asdf", single characters); and unedited template scaffolds (answers left as "I am [your user]... I am trying to [desired outcome]..."). Nothing kept was reworded; entries were only filtered in or out. This took ~2,000 raw rows down to ~1,155 genuine insights.

### 3. Attribute against the users table
Each `user_id` was joined to the profiles table (`profiles_rows (2).csv` + `(3).csv`) and shown as **Full name (nickname) · role · company size · id prefix**. 521 of 555 learners matched; the rest show only their `user_id`. Note: there is no `company_name` column in the profiles export, only `company_type` (a company-size bucket), so size was used as the closest field.

### 4. Synthesise the patterns
To find cross-cutting patterns without one context window having to hold ~1,155 responses, the reading was split across four parallel sub-agents (one for feedback+events, one for the largest course, two covering the rest). Each returned themes mapped to the five questions, with verbatim supporting quotes. Those were then merged into `00-insights-synthesis.md`, marking a pattern "strong" when it recurred across more than one source and "emerging" when concentrated in one place.

### Output files (in `little-parrot/user-insights/`)
- `00-insights-synthesis.md` - cross-cutting patterns + top actionable signals
- `01-event-and-community-feedback.md` - GitHub issues
- `02-course-completion-feedback.md` - completion feedback form
- `03`–`09` - one file per course of verbatim in-course responses
- `README.md` - index + attribution and filtering notes
