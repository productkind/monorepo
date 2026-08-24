# Google Trends data-quality note

Retrieval date: **24 August 2026**  
Search type: **Google Web Search**  
Category: **All categories (0)**

This note documents collection quality only. It does not interpret the trends.

## Terms with insufficient exact data

- `what happens when you type a url in the browser` — US — 2024-08-01 to 2026-08-24
- `frontend backend database` — UK — 2024-08-01 to 2026-08-24; UK — 2021-08-24 to 2026-08-24
- `how to reproduce a bug` — UK — 2024-08-01 to 2026-08-24
- `bug triage process` — UK — 2024-08-01 to 2026-08-24
- `mvp vs prototype vs poc` — UK — 2024-08-01 to 2026-08-24; UK — 2021-08-24 to 2026-08-24
- `prototype vs production software` — US — 2024-08-01 to 2026-08-24; US — 2021-08-24 to 2026-08-24; UK — 2024-08-01 to 2026-08-24; Worldwide — 2024-08-01 to 2026-08-24; Worldwide — 2021-08-24 to 2026-08-24
- `vibe coding for beginners` — UK — 2024-08-01 to 2026-08-24; UK — 2021-08-24 to 2026-08-24
- `build mvp with ai` — UK — 2024-08-01 to 2026-08-24; UK — 2021-08-24 to 2026-08-24
- `claude code for non technical people` — US — 2024-08-01 to 2026-08-24; UK — 2024-08-01 to 2026-08-24; Worldwide — 2024-08-01 to 2026-08-24; Worldwide — 2021-08-24 to 2026-08-24
- `lovable for beginners` — UK — 2024-08-01 to 2026-08-24
- `vibe coding production apps` — US — 2024-08-01 to 2026-08-24

## Fallback terms used

- `what happens when you type a url in the browser` → `what happens when you type a url` — US — 2024-08-01 to 2026-08-24
- `frontend backend database` → `frontend backend` — UK — 2024-08-01 to 2026-08-24; UK — 2021-08-24 to 2026-08-24
- `how to reproduce a bug` → `reproduce a bug` — UK — 2024-08-01 to 2026-08-24
- `bug triage process` → `bug triage` — UK — 2024-08-01 to 2026-08-24
- `mvp vs prototype vs poc` → `mvp vs prototype` — UK — 2024-08-01 to 2026-08-24; UK — 2021-08-24 to 2026-08-24
- `prototype vs production software` → `prototype vs production` — US — 2024-08-01 to 2026-08-24; US — 2021-08-24 to 2026-08-24; UK — 2024-08-01 to 2026-08-24; Worldwide — 2024-08-01 to 2026-08-24; Worldwide — 2021-08-24 to 2026-08-24
- `vibe coding for beginners` → `vibe coding` — UK — 2024-08-01 to 2026-08-24; UK — 2021-08-24 to 2026-08-24
- `build mvp with ai` → `ai mvp` — UK — 2024-08-01 to 2026-08-24; UK — 2021-08-24 to 2026-08-24
- `claude code for non technical people` → `Claude Code` — US — 2024-08-01 to 2026-08-24; UK — 2024-08-01 to 2026-08-24; Worldwide — 2024-08-01 to 2026-08-24; Worldwide — 2021-08-24 to 2026-08-24
- `lovable for beginners` → `Lovable AI` — UK — 2024-08-01 to 2026-08-24
- `vibe coding production apps` → `vibe coding` — US — 2024-08-01 to 2026-08-24

Fallback series remain labelled with the original input term and the separate `fallback_term`/`source_term`. They are not treated as equivalent to the original query.

## Ambiguous terms and categories

- `how to reproduce a bug / reproduce a bug` — May include non-software meanings. Collected as Search terms in All categories; no category override was applied.
- `mvp vs prototype vs poc / mvp vs prototype` — MVP can have non-product meanings. The exact phrases and fallback were retained in All categories.
- `Lovable` — Required comparison term can also be an adjective. It was preserved exactly as a Search term in All categories.
- `application architecture explained` — May include broader software-architecture learning intent. It was retained in All categories.

No category changes were made. Every run used All categories.

## Unavailable fields

- **Absolute query volume:** Google Trends supplies normalised 0–100 interest, not absolute searches.
- **Rising percentage for Breakout:** Google reports Breakout without a percentage; Breakout is preserved exactly and value_or_growth is blank.
- **Related panels on insufficient exact runs:** Google returned no related-query or related-topic panels when the exact term had no series.

## Extraction limitations

- **Independent normalisation:** Dataset A runs are independently normalised. Only rows sharing a Dataset D run_id are on a common comparison scale.
- **Weekly boundary:** Google may return a week beginning before the requested start date when that week overlaps the selected period; the returned date is preserved.
- **Partial final week:** The final current-week point is flagged is_partial=true in the assembled datasets.
- **Rendered-interface route:** The anonymous endpoint was rate-limited after validation. Final datasets were assembled from cached signed-in Google Trends rendered results; early anonymous-endpoint caches are not included.

Run counts: 150 exact, 22 fallback and 30 comparison runs.
