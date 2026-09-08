#!/usr/bin/env python3
"""Search stock footage for one beat and lay the candidates out for a decision.

  scripts/harvest.py --video <id> --run 3 --seconds 4.5 \
      --terms "closed gate barrier" "shipping containers stacked"

Filters to clips that can actually serve the beat — portrait, a native 1080x1920 file, and long
enough to cover the beat with headroom — then writes a montage of their poster frames. Posters are
used for the first pass because they cost one small image per candidate instead of a 10MB download,
so a whole beat can be judged before anything is fetched.

The script chooses nothing. Read the montage, then hand ids to pick.py.
"""

import argparse

from common import exact_frame_file, fetch, row as poster_row, search, work_dir

# A clip must outlast its beat: `clip` has no loop and no playback rate, so one that runs out holds
# a frozen frame while the captions keep moving.
HEADROOM_SECONDS = 1.0


def harvest(video, run, seconds, terms, skip, provider, limit):
    needed = seconds + HEADROOM_SECONDS
    folder = work_dir(video)
    seen, rows = set(skip), []

    for term in terms:
        for candidate in search(term, limit=limit, provider=provider):
            if candidate['id'] in seen:
                continue
            seen.add(candidate['id'])
            if candidate['seconds'] < needed or exact_frame_file(candidate) is None:
                continue
            candidate['term'] = term
            rows.append(candidate)

    # Shortest first: the least footage left unused, and the least to download.
    rows.sort(key=lambda row: row['seconds'])

    print(f'run {run:02d}  beat {seconds:.2f}s, so a clip needs {needed:.2f}s+  '
          f'{len(rows)} candidates')
    posters = []
    for index, entry in enumerate(rows[:12]):
        print(f"  {index} {entry['id']:>10} {entry['seconds']:>3}s  {entry['term'][:34]:34} "
              f"by {entry['author'][:22]}")
        if not entry['poster']:
            continue
        path = folder / f"run-{run:02d}-{entry['id']}.jpg"
        if not path.exists():
            path.write_bytes(fetch(entry['poster']))
        posters.append(path)

    if posters:
        sheet = poster_row(posters, folder / f'run-{run:02d}-posters.png')
        print(f'  posters (left to right = the list above): {sheet}')
    return rows


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--video', required=True)
    parser.add_argument('--run', type=int, required=True)
    parser.add_argument('--seconds', type=float, required=True, help='the beat this must cover')
    parser.add_argument('--terms', nargs='+', required=True)
    parser.add_argument('--skip', default='', help='comma-separated ids already rejected')
    parser.add_argument('--provider', default='pexels', choices=['pexels', 'pixabay'])
    parser.add_argument('--limit', type=int, default=40)
    args = parser.parse_args()

    harvest(args.video, args.run, args.seconds, args.terms,
            [value for value in args.skip.split(',') if value], args.provider, args.limit)


if __name__ == '__main__':
    main()
