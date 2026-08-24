#!/usr/bin/env python3
"""Move browser-exported Google Trends CSVs into a controlled research cache.

The watcher only handles the three filenames created by Google Trends and only
when a request file in the supplied control directory names the target run.
It is intended for browser-assisted collection when the anonymous Trends API is
rate-limited but the signed-in Google Trends interface remains available.
"""

from __future__ import annotations

import argparse
import json
import shutil
import time
from pathlib import Path


PREFIXES = {
    "timeseries": "multiTimeline",
    "topics": "relatedEntities",
    "queries": "relatedQueries",
}


def newest_candidate(downloads_dir: Path, prefix: str, not_before: float) -> Path | None:
    candidates = []
    for path in downloads_dir.glob(f"{prefix}*.csv"):
        try:
            modified = path.stat().st_mtime
        except FileNotFoundError:
            continue
        if modified >= not_before - 1:
            candidates.append((modified, path))
    return max(candidates, default=(0, None))[1]


def process_request(request_path: Path, downloads_dir: Path) -> bool:
    try:
        request = json.loads(request_path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, FileNotFoundError):
        return False

    run_id = request["run_id"]
    output_dir = Path(request["output_dir"])
    expected = request.get("expected", [])
    not_before = float(request["not_before"])
    output_dir.mkdir(parents=True, exist_ok=True)

    moved = {}
    for kind in expected:
        target = output_dir / f"{run_id}-{kind}.csv"
        if target.exists():
            moved[kind] = str(target)
            continue
        prefix = PREFIXES[kind]
        source = newest_candidate(downloads_dir, prefix, not_before)
        if source is None:
            continue
        shutil.move(str(source), str(target))
        moved[kind] = str(target)

    if len(moved) != len(expected):
        return False

    done_path = request_path.with_suffix(".done.json")
    done_path.write_text(
        json.dumps(
            {
                "run_id": run_id,
                "expected": expected,
                "moved": moved,
                "completed_at": time.time(),
            },
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    request_path.rename(request_path.with_suffix(".processed.json"))
    return True


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--control-dir", required=True, type=Path)
    parser.add_argument(
        "--downloads-dir",
        default=Path.home() / "Downloads",
        type=Path,
    )
    parser.add_argument("--poll-seconds", default=0.25, type=float)
    args = parser.parse_args()

    control_dir = args.control_dir.resolve()
    downloads_dir = args.downloads_dir.resolve()
    control_dir.mkdir(parents=True, exist_ok=True)
    print(f"Watching {downloads_dir} for Google Trends exports", flush=True)

    while not (control_dir / "STOP").exists():
        for request_path in sorted(control_dir.glob("*.request.json")):
            process_request(request_path, downloads_dir)
        time.sleep(args.poll_seconds)
    print("Watcher stopped", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
