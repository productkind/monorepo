#!/usr/bin/env python3
"""Collect the PM technical-fluency Google Trends research matrix.

This is a dated research collector, not an analysis script. It preserves exact
query runs, runs labelled fallbacks only when the exact query has no non-zero
interest, and keeps comparison runs separate so independently normalised
0-100 values are never presented as comparable.

Usage:
    python3 -u pm-technical-fluency-google-trends.py \
      --output-dir /absolute/path/to/output

Raw Google Trends responses are cached below OUTPUT/raw so interrupted runs can
be resumed without repeating successful requests.
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import hashlib
import json
import subprocess
import time
import urllib.parse
from pathlib import Path


USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
)
RETRIEVAL_DATE = "2026-08-24"
SEARCH_TYPE = "Google Web Search"
CATEGORY_ID = 0
CATEGORY_LABEL = "All categories"

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

FALLBACKS = {
    "what happens when you type a url in the browser": "what happens when you type a url",
    "frontend backend database": "frontend backend",
    "application architecture explained": "application architecture",
    "webhook vs api": "webhook api",
    "how to reproduce a bug": "reproduce a bug",
    "bug triage process": "bug triage",
    "mvp vs prototype vs poc": "mvp vs prototype",
    "prototype vs production software": "prototype vs production",
    "vibe coding for beginners": "vibe coding",
    "how to vibe code": "vibe coding",
    "build mvp with ai": "ai mvp",
    "ai coding tools for beginners": "ai coding tools",
    "claude code for non technical people": "Claude Code",
    "lovable for beginners": "Lovable AI",
    "vibe coding production apps": "vibe coding",
}

GEOGRAPHIES = [
    ("US", "US"),
    ("UK", "GB"),
    ("Worldwide", ""),
]

DATE_RANGES = [
    ("2024-08-01 to 2026-08-24", "2024-08-01 2026-08-24"),
    ("2021-08-24 to 2026-08-24", "2021-08-24 2026-08-24"),
]

COMPARISONS = [
    ("api_questions", ["what is an api", "how does an api work"]),
    ("technical_debt_questions", ["technical debt", "what is technical debt"]),
    (
        "vibe_coding_questions",
        ["vibe coding", "what is vibe coding", "vibe coding for beginners", "how to vibe code"],
    ),
    ("delivery_terms", ["ci/cd", "continuous deployment"]),
    ("ai_building_terms", ["vibe coding", "Claude Code", "Lovable"]),
]

A_FIELDS = [
    "term",
    "fallback_term",
    "term_type",
    "geography",
    "date_range",
    "date",
    "interest",
    "data_status",
    "run_id",
    "source_term",
    "geo_code",
    "search_type",
    "category",
    "retrieval_date",
    "is_partial",
]
B_FIELDS = [
    "term",
    "geography",
    "date_range",
    "query",
    "type_top_or_rising",
    "value_or_growth",
    "breakout",
    "run_id",
    "fallback_term",
    "source_term",
    "term_type",
    "geo_code",
    "search_type",
    "category",
    "retrieval_date",
    "data_status",
]
C_FIELDS = [
    "term",
    "geography",
    "date_range",
    "topic",
    "type_top_or_rising",
    "value_or_growth",
    "breakout",
    "run_id",
    "fallback_term",
    "source_term",
    "term_type",
    "topic_type",
    "topic_mid",
    "geo_code",
    "search_type",
    "category",
    "retrieval_date",
    "data_status",
]
D_FIELDS = [
    "comparison_group",
    "terms",
    "geography",
    "date_range",
    "date",
    "term",
    "interest",
    "run_id",
    "term_type",
    "geo_code",
    "search_type",
    "category",
    "retrieval_date",
    "is_partial",
    "data_status",
]
META_FIELDS = [
    "run_id",
    "run_kind",
    "input_term",
    "source_term",
    "fallback_term",
    "comparison_group",
    "comparison_terms",
    "term_type",
    "geography",
    "geo_code",
    "date_range",
    "api_timeframe",
    "search_type",
    "category_id",
    "category",
    "retrieval_date",
    "data_status",
    "time_points",
    "nonzero_points",
    "top_queries",
    "rising_queries",
    "top_topics",
    "rising_topics",
    "partial_points",
    "extraction_note",
]


def iso_date(epoch_seconds: str | int) -> str:
    return dt.datetime.fromtimestamp(int(epoch_seconds), tz=dt.timezone.utc).date().isoformat()


def write_csv(path: Path, fields: list[str], rows: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


class TrendsClient:
    def __init__(self, cache_dir: Path, request_gap: float):
        self.cache_dir = cache_dir
        self.cache_dir.mkdir(parents=True, exist_ok=True)
        self.cookie_jar = cache_dir / "cookies.txt"
        self.request_gap = request_gap
        self.last_request_at = 0.0
        self.network_requests = 0

    def boot(self) -> None:
        subprocess.run(
            [
                "curl",
                "-sS",
                "-L",
                "-c",
                str(self.cookie_jar),
                "-m",
                "30",
                "-A",
                USER_AGENT,
                "https://trends.google.com/trends/explore",
                "-o",
                "/dev/null",
            ],
            capture_output=True,
            check=False,
        )

    def _wait_for_gap(self) -> None:
        elapsed = time.monotonic() - self.last_request_at
        if elapsed < self.request_gap:
            time.sleep(self.request_gap - elapsed)

    def get(self, url: str, label: str) -> dict | None:
        digest = hashlib.sha256(url.encode("utf-8")).hexdigest()
        cache_path = self.cache_dir / f"{digest}.json"
        if cache_path.exists():
            try:
                cached = json.loads(cache_path.read_text(encoding="utf-8"))
                return cached["payload"]
            except (json.JSONDecodeError, KeyError):
                pass

        waits = [8, 20, 45, 90, 150]
        for attempt, wait_seconds in enumerate(waits, start=1):
            self._wait_for_gap()
            result = subprocess.run(
                [
                    "curl",
                    "-sS",
                    "-L",
                    "-b",
                    str(self.cookie_jar),
                    "-c",
                    str(self.cookie_jar),
                    "-m",
                    "45",
                    "-A",
                    USER_AGENT,
                    "-H",
                    "Referer: https://trends.google.com/trends/explore",
                    url,
                ],
                capture_output=True,
                text=True,
                check=False,
            )
            self.last_request_at = time.monotonic()
            self.network_requests += 1
            body = result.stdout
            if body.startswith(")]}'"):
                try:
                    payload = json.loads(body[5:])
                    cache_path.write_text(
                        json.dumps(
                            {
                                "url": url,
                                "label": label,
                                "retrieved_at": dt.datetime.now(dt.timezone.utc).isoformat(),
                                "payload": payload,
                            },
                            ensure_ascii=False,
                        ),
                        encoding="utf-8",
                    )
                    return payload
                except json.JSONDecodeError:
                    pass
            print(
                f"  retry {attempt}/{len(waits)} for {label}; "
                f"curl={result.returncode}, response={body[:80]!r}",
                flush=True,
            )
            if attempt < len(waits):
                time.sleep(wait_seconds)
                self.boot()
        return None

    def explore(self, terms: list[str], geo: str, timeframe: str) -> dict | None:
        request = {
            "comparisonItem": [
                {"keyword": term, "geo": geo, "time": timeframe} for term in terms
            ],
            "category": CATEGORY_ID,
            "property": "",
        }
        url = (
            "https://trends.google.com/trends/api/explore?hl=en-GB&tz=0&req="
            + urllib.parse.quote(json.dumps(request, separators=(",", ":")))
        )
        return self.get(url, f"explore:{geo or 'worldwide'}:{timeframe}:{'|'.join(terms)}")

    def widget(self, widget: dict, endpoint: str, label: str) -> dict | None:
        url = (
            f"https://trends.google.com/trends/api/widgetdata/{endpoint}?hl=en-GB&tz=0"
            f"&req={urllib.parse.quote(json.dumps(widget['request'], separators=(',', ':')))}"
            f"&token={urllib.parse.quote(widget['token'])}"
        )
        return self.get(url, label)


def widgets_by_prefix(explore_payload: dict | None) -> dict[str, dict]:
    output = {}
    if not explore_payload:
        return output
    for widget in explore_payload.get("widgets", []):
        widget_id = widget.get("id", "")
        if widget_id == "TIMESERIES":
            output["timeseries"] = widget
        elif widget_id.startswith("RELATED_QUERIES"):
            output["queries"] = widget
        elif widget_id.startswith("RELATED_TOPICS"):
            output["topics"] = widget
    return output


def parse_timeseries(payload: dict | None, term_count: int) -> tuple[list[dict], list[int]]:
    timeline = ((payload or {}).get("default") or {}).get("timelineData") or []
    rows = []
    nonzero = [0 for _ in range(term_count)]
    for point in timeline:
        values = point.get("value") or []
        has_data = point.get("hasData") or [True for _ in range(term_count)]
        for index in range(term_count):
            value = values[index] if index < len(values) else None
            if isinstance(value, (int, float)) and value > 0:
                nonzero[index] += 1
            rows.append(
                {
                    "date": iso_date(point["time"]),
                    "term_index": index,
                    "interest": value,
                    "has_data": has_data[index] if index < len(has_data) else "",
                    "is_partial": bool(point.get("isPartial", False)),
                }
            )
    return rows, nonzero


def parse_related(payload: dict | None, item_kind: str) -> list[dict]:
    ranked_lists = ((payload or {}).get("default") or {}).get("rankedList") or []
    rows = []
    for list_index, ranked_list in enumerate(ranked_lists):
        list_type = "top" if list_index == 0 else "rising"
        for item in ranked_list.get("rankedKeyword") or []:
            formatted = item.get("formattedValue")
            breakout = "Breakout" if formatted == "Breakout" else ""
            value_or_growth = "" if breakout else (formatted if formatted is not None else item.get("value", ""))
            row = {
                "type_top_or_rising": list_type,
                "value_or_growth": value_or_growth,
                "breakout": breakout,
            }
            if item_kind == "query":
                row["query"] = item.get("query", "")
            else:
                topic = item.get("topic") or {}
                row["topic"] = topic.get("title", "")
                row["topic_type"] = topic.get("type", "")
                row["topic_mid"] = topic.get("mid", "")
            rows.append(row)
    return rows


def status_for_timeseries(rows: list[dict], nonzero: int) -> str:
    if not rows:
        return "insufficient_no_series"
    if nonzero == 0:
        return "insufficient_all_zero"
    return "sufficient"


def run_id_for(parts: list[str]) -> str:
    return hashlib.sha1("|".join(parts).encode("utf-8")).hexdigest()[:12]


def collect_single(
    client: TrendsClient,
    original_term: str,
    source_term: str,
    fallback_term: str,
    geo_label: str,
    geo_code: str,
    date_label: str,
    timeframe: str,
    dataset_a: list[dict],
    dataset_b: list[dict],
    dataset_c: list[dict],
    metadata: list[dict],
) -> str:
    is_fallback = bool(fallback_term)
    run_id = run_id_for(["single", original_term, source_term, geo_code, timeframe])
    explore_payload = client.explore([source_term], geo_code, timeframe)
    widgets = widgets_by_prefix(explore_payload)
    timeseries_payload = (
        client.widget(widgets["timeseries"], "multiline", f"timeseries:{run_id}")
        if "timeseries" in widgets
        else None
    )
    timeseries_rows, nonzero_counts = parse_timeseries(timeseries_payload, 1)
    nonzero = nonzero_counts[0] if nonzero_counts else 0
    status = status_for_timeseries(timeseries_rows, nonzero)
    if is_fallback:
        status = "fallback_sufficient" if status == "sufficient" else f"fallback_{status}"

    common = {
        "term": original_term,
        "fallback_term": fallback_term,
        "term_type": "Search term",
        "geography": geo_label,
        "date_range": date_label,
        "data_status": status,
        "run_id": run_id,
        "source_term": source_term,
        "geo_code": geo_code,
        "search_type": SEARCH_TYPE,
        "category": CATEGORY_LABEL,
        "retrieval_date": RETRIEVAL_DATE,
    }
    if timeseries_rows:
        for item in timeseries_rows:
            dataset_a.append(
                {
                    **common,
                    "date": item["date"],
                    "interest": item["interest"],
                    "is_partial": item["is_partial"],
                }
            )
    else:
        dataset_a.append({**common, "date": "", "interest": "", "is_partial": ""})

    queries_payload = (
        client.widget(widgets["queries"], "relatedsearches", f"queries:{run_id}")
        if "queries" in widgets
        else None
    )
    topics_payload = (
        client.widget(widgets["topics"], "relatedsearches", f"topics:{run_id}")
        if "topics" in widgets
        else None
    )
    query_rows = parse_related(queries_payload, "query")
    topic_rows = parse_related(topics_payload, "topic")

    related_common = {
        "term": original_term,
        "geography": geo_label,
        "date_range": date_label,
        "run_id": run_id,
        "fallback_term": fallback_term,
        "source_term": source_term,
        "term_type": "Search term",
        "geo_code": geo_code,
        "search_type": SEARCH_TYPE,
        "category": CATEGORY_LABEL,
        "retrieval_date": RETRIEVAL_DATE,
        "data_status": status,
    }
    for row in query_rows:
        dataset_b.append({**related_common, **row})
    for row in topic_rows:
        dataset_c.append({**related_common, **row})

    top_queries = sum(row["type_top_or_rising"] == "top" for row in query_rows)
    rising_queries = sum(row["type_top_or_rising"] == "rising" for row in query_rows)
    top_topics = sum(row["type_top_or_rising"] == "top" for row in topic_rows)
    rising_topics = sum(row["type_top_or_rising"] == "rising" for row in topic_rows)
    partial_points = sum(bool(row["is_partial"]) for row in timeseries_rows)
    extraction_notes = []
    if not explore_payload:
        extraction_notes.append("Explore request unavailable after retries")
    if "timeseries" not in widgets:
        extraction_notes.append("Timeseries widget unavailable")
    if "queries" not in widgets:
        extraction_notes.append("Related-queries widget unavailable")
    elif queries_payload is None:
        extraction_notes.append("Related-queries extraction unavailable after retries")
    if "topics" not in widgets:
        extraction_notes.append("Related-topics widget unavailable")
    elif topics_payload is None:
        extraction_notes.append("Related-topics extraction unavailable after retries")

    metadata.append(
        {
            "run_id": run_id,
            "run_kind": "fallback" if is_fallback else "exact",
            "input_term": original_term,
            "source_term": source_term,
            "fallback_term": fallback_term,
            "comparison_group": "",
            "comparison_terms": "",
            "term_type": "Search term",
            "geography": geo_label,
            "geo_code": geo_code,
            "date_range": date_label,
            "api_timeframe": timeframe,
            "search_type": SEARCH_TYPE,
            "category_id": CATEGORY_ID,
            "category": CATEGORY_LABEL,
            "retrieval_date": RETRIEVAL_DATE,
            "data_status": status,
            "time_points": len(timeseries_rows),
            "nonzero_points": nonzero,
            "top_queries": top_queries,
            "rising_queries": rising_queries,
            "top_topics": top_topics,
            "rising_topics": rising_topics,
            "partial_points": partial_points,
            "extraction_note": "; ".join(extraction_notes),
        }
    )
    return status


def collect_comparison(
    client: TrendsClient,
    group: str,
    terms: list[str],
    geo_label: str,
    geo_code: str,
    date_label: str,
    timeframe: str,
    dataset_d: list[dict],
    metadata: list[dict],
) -> None:
    run_id = run_id_for(["comparison", group, geo_code, timeframe])
    explore_payload = client.explore(terms, geo_code, timeframe)
    widgets = widgets_by_prefix(explore_payload)
    timeseries_payload = (
        client.widget(widgets["timeseries"], "multiline", f"comparison-timeseries:{run_id}")
        if "timeseries" in widgets
        else None
    )
    timeseries_rows, nonzero_counts = parse_timeseries(timeseries_payload, len(terms))
    status = "sufficient" if timeseries_rows and any(nonzero_counts) else (
        "insufficient_all_zero" if timeseries_rows else "insufficient_no_series"
    )
    terms_label = " | ".join(terms)
    for row in timeseries_rows:
        index = row["term_index"]
        dataset_d.append(
            {
                "comparison_group": group,
                "terms": terms_label,
                "geography": geo_label,
                "date_range": date_label,
                "date": row["date"],
                "term": terms[index],
                "interest": row["interest"],
                "run_id": run_id,
                "term_type": "Search term",
                "geo_code": geo_code,
                "search_type": SEARCH_TYPE,
                "category": CATEGORY_LABEL,
                "retrieval_date": RETRIEVAL_DATE,
                "is_partial": row["is_partial"],
                "data_status": status,
            }
        )
    metadata.append(
        {
            "run_id": run_id,
            "run_kind": "comparison",
            "input_term": "",
            "source_term": "",
            "fallback_term": "",
            "comparison_group": group,
            "comparison_terms": terms_label,
            "term_type": "Search term",
            "geography": geo_label,
            "geo_code": geo_code,
            "date_range": date_label,
            "api_timeframe": timeframe,
            "search_type": SEARCH_TYPE,
            "category_id": CATEGORY_ID,
            "category": CATEGORY_LABEL,
            "retrieval_date": RETRIEVAL_DATE,
            "data_status": status,
            "time_points": len(timeseries_rows),
            "nonzero_points": sum(nonzero_counts),
            "top_queries": "",
            "rising_queries": "",
            "top_topics": "",
            "rising_topics": "",
            "partial_points": sum(bool(row["is_partial"]) for row in timeseries_rows),
            "extraction_note": "" if timeseries_rows else "Comparison timeseries unavailable",
        }
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output-dir", required=True, type=Path)
    parser.add_argument("--request-gap", type=float, default=2.0)
    parser.add_argument("--only-term", choices=TERMS)
    parser.add_argument("--skip-comparisons", action="store_true")
    parser.add_argument("--max-exact-runs", type=int, default=0)
    args = parser.parse_args()

    output_dir = args.output_dir.resolve()
    output_dir.mkdir(parents=True, exist_ok=True)
    client = TrendsClient(output_dir / "raw-google-trends", args.request_gap)
    client.boot()

    dataset_a: list[dict] = []
    dataset_b: list[dict] = []
    dataset_c: list[dict] = []
    dataset_d: list[dict] = []
    metadata: list[dict] = []

    selected_terms = [args.only_term] if args.only_term else TERMS
    exact_counter = 0
    total_exact = len(selected_terms) * len(GEOGRAPHIES) * len(DATE_RANGES)
    stop = False
    for term in selected_terms:
        for geo_label, geo_code in GEOGRAPHIES:
            for date_label, timeframe in DATE_RANGES:
                exact_counter += 1
                print(
                    f"[{exact_counter}/{total_exact}] exact | {term} | {geo_label} | {date_label}",
                    flush=True,
                )
                status = collect_single(
                    client,
                    term,
                    term,
                    "",
                    geo_label,
                    geo_code,
                    date_label,
                    timeframe,
                    dataset_a,
                    dataset_b,
                    dataset_c,
                    metadata,
                )
                if status.startswith("insufficient") and term in FALLBACKS:
                    fallback = FALLBACKS[term]
                    print(f"  fallback | {fallback}", flush=True)
                    collect_single(
                        client,
                        term,
                        fallback,
                        fallback,
                        geo_label,
                        geo_code,
                        date_label,
                        timeframe,
                        dataset_a,
                        dataset_b,
                        dataset_c,
                        metadata,
                    )
                if args.max_exact_runs and exact_counter >= args.max_exact_runs:
                    stop = True
                    break
            if stop:
                break
        if stop:
            break

    if not args.skip_comparisons and not stop and not args.only_term:
        total_comparisons = len(COMPARISONS) * len(GEOGRAPHIES) * len(DATE_RANGES)
        comparison_counter = 0
        for group, terms in COMPARISONS:
            for geo_label, geo_code in GEOGRAPHIES:
                for date_label, timeframe in DATE_RANGES:
                    comparison_counter += 1
                    print(
                        f"[{comparison_counter}/{total_comparisons}] comparison | "
                        f"{group} | {geo_label} | {date_label}",
                        flush=True,
                    )
                    collect_comparison(
                        client,
                        group,
                        terms,
                        geo_label,
                        geo_code,
                        date_label,
                        timeframe,
                        dataset_d,
                        metadata,
                    )

    write_csv(output_dir / "dataset-a-interest-over-time.csv", A_FIELDS, dataset_a)
    write_csv(output_dir / "dataset-b-related-queries.csv", B_FIELDS, dataset_b)
    write_csv(output_dir / "dataset-c-related-topics.csv", C_FIELDS, dataset_c)
    write_csv(output_dir / "dataset-d-comparison-runs.csv", D_FIELDS, dataset_d)
    write_csv(output_dir / "run-metadata.csv", META_FIELDS, metadata)
    manifest = {
        "retrieval_date": RETRIEVAL_DATE,
        "search_type": SEARCH_TYPE,
        "category_id": CATEGORY_ID,
        "category": CATEGORY_LABEL,
        "terms": selected_terms,
        "fallbacks": FALLBACKS,
        "geographies": GEOGRAPHIES,
        "date_ranges": DATE_RANGES,
        "comparisons": COMPARISONS,
        "network_requests_this_run": client.network_requests,
        "row_counts": {
            "dataset_a": len(dataset_a),
            "dataset_b": len(dataset_b),
            "dataset_c": len(dataset_c),
            "dataset_d": len(dataset_d),
            "run_metadata": len(metadata),
        },
    }
    (output_dir / "collection-manifest.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    print(json.dumps(manifest["row_counts"], indent=2), flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
