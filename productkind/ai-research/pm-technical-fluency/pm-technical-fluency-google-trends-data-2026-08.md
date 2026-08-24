# PM technical-fluency Google Trends data

Collected on **24 August 2026** for the 25 terms shortlisted in the preceding
search-demand analysis. This is a data-collection output only; it does not
interpret growth, stability, decline, attractiveness or opportunity.

## Collection scope

- Geographies: United States, United Kingdom and Worldwide.
- Date ranges: 1 August 2024–24 August 2026 and 24 August 2021–24 August 2026.
- Search type: Google Web Search.
- Category: All categories (0). No category overrides were applied.
- Input type: Search term for every exact, fallback and comparison input.
- Runs: 150 exact, 22 labelled fallback and 30 same-request comparison runs.

The final datasets were assembled from cached results collected through the
signed-in Google Trends rendered interface. Each cached run preserves its
source URL, settings, status, time series and available related data.

## Datasets

| Dataset | Rows | File |
|---|---:|---|
| A — Interest over time | 27,847 | [`dataset-a-interest-over-time.csv`](outputs/01a033b6-25b5-7020-b6ae-58bf9f1895d4/google-trends-data/dataset-a-interest-over-time.csv) |
| B — Related queries | 2,743 | [`dataset-b-related-queries.csv`](outputs/01a033b6-25b5-7020-b6ae-58bf9f1895d4/google-trends-data/dataset-b-related-queries.csv) |
| C — Related topics | 4,779 | [`dataset-c-related-topics.csv`](outputs/01a033b6-25b5-7020-b6ae-58bf9f1895d4/google-trends-data/dataset-c-related-topics.csv) |
| D — Comparison runs | 14,469 | [`dataset-d-comparison-runs.csv`](outputs/01a033b6-25b5-7020-b6ae-58bf9f1895d4/google-trends-data/dataset-d-comparison-runs.csv) |
| Run metadata | 202 | [`run-metadata.csv`](outputs/01a033b6-25b5-7020-b6ae-58bf9f1895d4/google-trends-data/run-metadata.csv) |

The consolidated workbook is
[`pm-technical-fluency-google-trends-data.xlsx`](outputs/01a033b6-25b5-7020-b6ae-58bf9f1895d4/pm-technical-fluency-google-trends-data.xlsx).

## Reading the files correctly

- Dataset A runs are independently normalised. Do not compare their 0–100
  values as if they shared a scale.
- Dataset D values are comparable only within rows sharing the same `run_id`.
- A fallback is always separated into `fallback_term` and `source_term`. It is
  not treated as equivalent to the original input.
- Exact inputs with no series remain in Dataset A as placeholder rows with an
  insufficient-data status.
- Google can return a weekly bucket beginning before the selected start date
  when that week overlaps the requested period. The returned date is preserved.
- The final current-week point is flagged `is_partial=true`.

The complete list of insufficient exact contexts, fallbacks, ambiguities,
unavailable fields and extraction limitations is in
[`data-quality-note.md`](outputs/01a033b6-25b5-7020-b6ae-58bf9f1895d4/google-trends-data/data-quality-note.md).

