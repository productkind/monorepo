#!/usr/bin/env python3
"""Assemble cached browser runs into the four PM Trends datasets."""

from __future__ import annotations

import argparse
import csv
import json
from collections import Counter, defaultdict
from pathlib import Path


TERMS = [
    "what happens when you type a url in the browser",
    "frontend backend database",
    "application architecture explained",
    "what is an api",
    "how does an api work",
    "api integration",
    "webhook vs api",
    "ci/cd",
    "continuous deployment",
    "staging vs production",
    "how to reproduce a bug",
    "bug triage process",
    "technical debt",
    "what is technical debt",
    "mvp vs prototype vs poc",
    "prototype vs production software",
    "vibe coding",
    "what is vibe coding",
    "vibe coding for beginners",
    "how to vibe code",
    "build mvp with ai",
    "ai coding tools for beginners",
    "claude code for non technical people",
    "lovable for beginners",
    "vibe coding production apps",
]

COMPARISON_ORDER = [
    "api_questions",
    "technical_debt_questions",
    "vibe_coding_questions",
    "delivery_terms",
    "ai_building_terms",
]
GEO_ORDER = {"US": 0, "UK": 1, "Worldwide": 2}
RANGE_ORDER = {
    "2024-08-01 to 2026-08-24": 0,
    "2021-08-24 to 2026-08-24": 1,
}

A_FIELDS = [
    "term", "fallback_term", "term_type", "geography", "date_range",
    "date", "interest", "data_status", "run_id", "source_term",
    "geo_code", "search_type", "category", "retrieval_date", "is_partial",
]
B_FIELDS = [
    "term", "geography", "date_range", "query", "type_top_or_rising",
    "value_or_growth", "breakout", "run_id", "fallback_term", "source_term",
    "term_type", "geo_code", "search_type", "category", "retrieval_date",
    "data_status",
]
C_FIELDS = [
    "term", "geography", "date_range", "topic", "type_top_or_rising",
    "value_or_growth", "breakout", "run_id", "fallback_term", "source_term",
    "term_type", "topic_type", "topic_mid", "geo_code", "search_type",
    "category", "retrieval_date", "data_status",
]
D_FIELDS = [
    "comparison_group", "terms", "geography", "date_range", "date", "term",
    "interest", "run_id", "term_type", "geo_code", "search_type", "category",
    "retrieval_date", "is_partial", "data_status",
]
META_FIELDS = [
    "run_id", "run_kind", "input_term", "source_term", "fallback_term",
    "comparison_group", "comparison_terms", "term_type", "geography", "geo_code",
    "date_range", "api_timeframe", "search_type", "category_id", "category",
    "retrieval_date", "data_status", "time_points", "nonzero_points",
    "top_queries", "rising_queries", "top_topics", "rising_topics",
    "partial_points", "extraction_route", "extraction_note", "source_url",
]


def write_csv(path: Path, fields: list[str], rows: list[dict]) -> None:
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def display_status(run: dict) -> str:
    if run["run_kind"] == "fallback":
        return f"fallback_{run['data_status']}"
    return run["data_status"]


def run_sort_key(run: dict) -> tuple:
    if run["run_kind"] == "comparison":
        return (
            COMPARISON_ORDER.index(run["comparison_group"]),
            GEO_ORDER[run["geography"]],
            RANGE_ORDER[run["date_range"]],
        )
    return (
        TERMS.index(run["input_term"]),
        GEO_ORDER[run["geography"]],
        RANGE_ORDER[run["date_range"]],
        0 if run["run_kind"] == "exact" else 1,
    )


def common(run: dict) -> dict:
    return {
        "term": run["input_term"],
        "fallback_term": run.get("fallback_term", ""),
        "term_type": run["term_type"],
        "geography": run["geography"],
        "date_range": run["date_range"],
        "data_status": display_status(run),
        "run_id": run["run_id"],
        "source_term": run["source_term"],
        "geo_code": run["geo_code"],
        "search_type": run["search_type"],
        "category": run["category"],
        "retrieval_date": run["retrieval_date"],
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--data-dir", required=True, type=Path)
    args = parser.parse_args()
    data_dir = args.data_dir.resolve()
    cache_dir = data_dir / "browser-run-cache"

    runs = []
    for path in cache_dir.glob("*.json"):
        if "invalid-test" in path.name:
            continue
        runs.append(json.loads(path.read_text(encoding="utf-8")))
    counts = Counter(run["run_kind"] for run in runs)
    if counts["exact"] != 150 or counts["comparison"] != 30:
        raise SystemExit(f"Incomplete cache: {dict(counts)}")
    runs.sort(key=run_sort_key)

    dataset_a, dataset_b, dataset_c, dataset_d, metadata = [], [], [], [], []
    for run in runs:
        if run["run_kind"] == "comparison":
            terms_label = " | ".join(run["terms"])
            for point in run.get("series", []):
                for index, term in enumerate(run["terms"]):
                    values = point.get("values", [])
                    dataset_d.append({
                        "comparison_group": run["comparison_group"],
                        "terms": terms_label,
                        "geography": run["geography"],
                        "date_range": run["date_range"],
                        "date": point["date"],
                        "term": term,
                        "interest": values[index] if index < len(values) else "",
                        "run_id": run["run_id"],
                        "term_type": run["term_type"],
                        "geo_code": run["geo_code"],
                        "search_type": run["search_type"],
                        "category": run["category"],
                        "retrieval_date": run["retrieval_date"],
                        "is_partial": point.get("is_partial", False),
                        "data_status": run["data_status"],
                    })
        else:
            base = common(run)
            series = run.get("series", [])
            if series:
                for point in series:
                    dataset_a.append({
                        **base,
                        "date": point["date"],
                        "interest": (point.get("values") or [""])[0],
                        "is_partial": point.get("is_partial", False),
                    })
            else:
                dataset_a.append({**base, "date": "", "interest": "", "is_partial": ""})

            related_base = {
                "term": run["input_term"],
                "geography": run["geography"],
                "date_range": run["date_range"],
                "run_id": run["run_id"],
                "fallback_term": run.get("fallback_term", ""),
                "source_term": run["source_term"],
                "term_type": run["term_type"],
                "geo_code": run["geo_code"],
                "search_type": run["search_type"],
                "category": run["category"],
                "retrieval_date": run["retrieval_date"],
                "data_status": display_status(run),
            }
            for item in run.get("queries", []):
                dataset_b.append({
                    **related_base,
                    "query": item.get("query", ""),
                    "type_top_or_rising": item.get("type_top_or_rising", ""),
                    "value_or_growth": item.get("value_or_growth", ""),
                    "breakout": item.get("breakout", ""),
                })
            for item in run.get("topics", []):
                dataset_c.append({
                    **related_base,
                    "topic": item.get("topic", ""),
                    "type_top_or_rising": item.get("type_top_or_rising", ""),
                    "value_or_growth": item.get("value_or_growth", ""),
                    "breakout": item.get("breakout", ""),
                    "topic_type": item.get("topic_type", ""),
                    "topic_mid": item.get("topic_mid", ""),
                })

        query_counts = Counter(item.get("type_top_or_rising") for item in run.get("queries", []))
        topic_counts = Counter(item.get("type_top_or_rising") for item in run.get("topics", []))
        unavailable = []
        if run["run_kind"] != "comparison":
            availability = run.get("related_availability", {})
            if not availability.get("queries"):
                unavailable.append("Related queries panel unavailable")
            if not availability.get("topics"):
                unavailable.append("Related topics panel unavailable")
        metadata.append({
            "run_id": run["run_id"],
            "run_kind": run["run_kind"],
            "input_term": run.get("input_term", ""),
            "source_term": run.get("source_term", ""),
            "fallback_term": run.get("fallback_term", ""),
            "comparison_group": run.get("comparison_group", ""),
            "comparison_terms": " | ".join(run.get("terms", [])) if run["run_kind"] == "comparison" else "",
            "term_type": run["term_type"],
            "geography": run["geography"],
            "geo_code": run["geo_code"],
            "date_range": run["date_range"],
            "api_timeframe": run["api_timeframe"],
            "search_type": run["search_type"],
            "category_id": run["category_id"],
            "category": run["category"],
            "retrieval_date": run["retrieval_date"],
            "data_status": display_status(run),
            "time_points": len(run.get("series", [])),
            "nonzero_points": " | ".join(str(value) for value in run.get("nonzero_points", [])),
            "top_queries": query_counts["top"],
            "rising_queries": query_counts["rising"],
            "top_topics": topic_counts["top"],
            "rising_topics": topic_counts["rising"],
            "partial_points": sum(bool(point.get("is_partial")) for point in run.get("series", [])),
            "extraction_route": "Signed-in Google Trends rendered interface",
            "extraction_note": "; ".join(unavailable),
            "source_url": run["source_url"],
        })

    dataset_d.sort(key=lambda row: (
        COMPARISON_ORDER.index(row["comparison_group"]), GEO_ORDER[row["geography"]],
        RANGE_ORDER[row["date_range"]], row["date"], row["terms"].split(" | ").index(row["term"]),
    ))
    write_csv(data_dir / "dataset-a-interest-over-time.csv", A_FIELDS, dataset_a)
    write_csv(data_dir / "dataset-b-related-queries.csv", B_FIELDS, dataset_b)
    write_csv(data_dir / "dataset-c-related-topics.csv", C_FIELDS, dataset_c)
    write_csv(data_dir / "dataset-d-comparison-runs.csv", D_FIELDS, dataset_d)
    write_csv(data_dir / "run-metadata.csv", META_FIELDS, metadata)

    insufficient = [run for run in runs if run["run_kind"] == "exact" and run["data_status"].startswith("insufficient")]
    fallbacks = [run for run in runs if run["run_kind"] == "fallback"]
    by_term = defaultdict(list)
    for run in insufficient:
        by_term[run["input_term"]].append(f"{run['geography']} — {run['date_range']}")
    fallback_by_pair = defaultdict(list)
    for run in fallbacks:
        fallback_by_pair[(run["input_term"], run["fallback_term"])].append(
            f"{run['geography']} — {run['date_range']}"
        )

    quality_items = []
    for term in TERMS:
        if term in by_term:
            quality_items.append({
                "section": "Insufficient exact data",
                "item": term,
                "details": "; ".join(by_term[term]),
            })
    for (term, fallback), contexts in fallback_by_pair.items():
        quality_items.append({
            "section": "Fallback used",
            "item": f"{term} → {fallback}",
            "details": "; ".join(contexts),
        })
    fixed_quality = [
        ("Ambiguous term/category", "how to reproduce a bug / reproduce a bug", "May include non-software meanings. Collected as Search terms in All categories; no category override was applied."),
        ("Ambiguous term/category", "mvp vs prototype vs poc / mvp vs prototype", "MVP can have non-product meanings. The exact phrases and fallback were retained in All categories."),
        ("Ambiguous term/category", "Lovable", "Required comparison term can also be an adjective. It was preserved exactly as a Search term in All categories."),
        ("Ambiguous term/category", "application architecture explained", "May include broader software-architecture learning intent. It was retained in All categories."),
        ("Category change", "None", "Every run used Google Web Search and All categories (category 0)."),
        ("Unavailable field", "Absolute query volume", "Google Trends supplies normalised 0–100 interest, not absolute searches."),
        ("Unavailable field", "Rising percentage for Breakout", "Google reports Breakout without a percentage; Breakout is preserved exactly and value_or_growth is blank."),
        ("Unavailable field", "Related panels on insufficient exact runs", "Google returned no related-query or related-topic panels when the exact term had no series."),
        ("Extraction limitation", "Independent normalisation", "Dataset A runs are independently normalised. Only rows sharing a Dataset D run_id are on a common comparison scale."),
        ("Extraction limitation", "Weekly boundary", "Google may return a week beginning before the requested start date when that week overlaps the selected period; the returned date is preserved."),
        ("Extraction limitation", "Partial final week", "The final current-week point is flagged is_partial=true in the assembled datasets."),
        ("Extraction limitation", "Rendered-interface route", "The anonymous endpoint was rate-limited after validation. Final datasets were assembled from cached signed-in Google Trends rendered results; early anonymous-endpoint caches are not included."),
    ]
    for section, item, details in fixed_quality:
        quality_items.append({"section": section, "item": item, "details": details})
    write_csv(data_dir / "data-quality-items.csv", ["section", "item", "details"], quality_items)

    lines = [
        "# Google Trends data-quality note",
        "",
        "Retrieval date: **24 August 2026**  ",
        "Search type: **Google Web Search**  ",
        "Category: **All categories (0)**",
        "",
        "This note documents collection quality only. It does not interpret the trends.",
        "",
        "## Terms with insufficient exact data",
        "",
    ]
    for term in TERMS:
        if term in by_term:
            lines.append(f"- `{term}` — " + "; ".join(by_term[term]))
    lines += ["", "## Fallback terms used", ""]
    for (term, fallback), contexts in fallback_by_pair.items():
        lines.append(f"- `{term}` → `{fallback}` — " + "; ".join(contexts))
    lines += ["", "Fallback series remain labelled with the original input term and the separate `fallback_term`/`source_term`. They are not treated as equivalent to the original query.", "", "## Ambiguous terms and categories", ""]
    for section, item, details in fixed_quality:
        if section == "Ambiguous term/category":
            lines.append(f"- `{item}` — {details}")
    lines += ["", "No category changes were made. Every run used All categories.", "", "## Unavailable fields", ""]
    for section, item, details in fixed_quality:
        if section == "Unavailable field":
            lines.append(f"- **{item}:** {details}")
    lines += ["", "## Extraction limitations", ""]
    for section, item, details in fixed_quality:
        if section == "Extraction limitation":
            lines.append(f"- **{item}:** {details}")
    lines += ["", f"Run counts: {counts['exact']} exact, {counts['fallback']} fallback and {counts['comparison']} comparison runs.", ""]
    (data_dir / "data-quality-note.md").write_text("\n".join(lines), encoding="utf-8")

    manifest = {
        "retrieval_date": "2026-08-24",
        "search_type": "Google Web Search",
        "category_id": 0,
        "category": "All categories",
        "extraction_route": "Signed-in Google Trends rendered interface",
        "run_counts": dict(counts),
        "row_counts": {
            "dataset_a": len(dataset_a),
            "dataset_b": len(dataset_b),
            "dataset_c": len(dataset_c),
            "dataset_d": len(dataset_d),
            "run_metadata": len(metadata),
        },
    }
    (data_dir / "collection-manifest.json").write_text(
        json.dumps(manifest, indent=2) + "\n", encoding="utf-8"
    )
    print(json.dumps(manifest, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
