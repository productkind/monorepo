#!/usr/bin/env python3
"""Search giphy for one section, keep what fits the frame, and montage it for judging.

  scripts/harvest.py --video pm-technical-fluency-validation-00 --section 10 \
      --terms "woman raising hand" "businesswoman asking question" "woman hand up meeting"

Candidates are ordered by how close one play is to filling the slot, so the top rows need the
least fixing. Nothing is chosen here: read the montage and pick with pick.py.
"""

import argparse

from common import candidates_dir, fetch, gif_seconds, search, slots, stack, strip


def harvest(video, section, terms, skip, limit, root=None):
    slot = slots(video, root)[section]
    cache = candidates_dir(video)
    seen, rows = set(skip), []

    for term in terms:
        for gif in search(term, limit=limit):
            gif_id = gif['id']
            if gif_id in seen:
                continue
            seen.add(gif_id)

            original = gif['images']['original']
            width, height = int(original['width']), int(original['height'])
            # Squarish and big enough to hold the frame width; the published videos look like this.
            if not 0.7 < width / height < 1.5 or width < 380:
                continue

            path = cache / f'{gif_id}.gif'
            if not path.exists():
                try:
                    # fixed_height keeps every frame, so its delays match the original's. The
                    # _downsampled variants drop frames and would report the wrong duration.
                    variant = gif['images'].get('fixed_height', original)
                    path.write_bytes(fetch(variant['url']))
                except Exception as error:  # a single dead candidate must not end the harvest
                    print(f'  skipped {gif_id}: {error}')
                    continue

            seconds, frames = gif_seconds(path)
            if not seconds:
                continue
            rows.append({
                'id': gif_id,
                'term': term,
                'title': (gif.get('title') or '')[:38],
                'seconds': seconds,
                'frames': frames,
                'size': f'{width}x{height}',
                'repeats': slot / seconds,
            })

    rows.sort(key=lambda row: abs(row['repeats'] - 1))
    return slot, rows


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--video', required=True)
    parser.add_argument('--section', type=int, required=True)
    parser.add_argument('--terms', nargs='+', required=True)
    parser.add_argument('--skip', default='', help='comma-separated gif ids already rejected')
    parser.add_argument('--show', type=int, default=7, help='how many to montage')
    parser.add_argument('--limit', type=int, default=25, help='results per search term')
    parser.add_argument('--root', default=None)
    args = parser.parse_args()

    skip = [value for value in args.skip.split(',') if value]
    slot, rows = harvest(args.video, args.section, args.terms, skip, args.limit, args.root)
    shown = rows[: args.show]

    print(f'section {args.section:02d}  slot {slot:.1f}s  {len(rows)} candidates after filtering')
    for index, row in enumerate(shown):
        print(
            f'  {index} {row["id"]:20} {row["seconds"]:5.2f}s {row["repeats"]:4.1f}x '
            f'{row["size"]:>9}  {row["term"][:26]:26} {row["title"]}'
        )

    cache = candidates_dir(args.video)
    strips = [strip(cache / f'{row["id"]}.gif', cache / f'{row["id"]}-strip.png') for row in shown]
    montage = stack(strips, cache / f'section-{args.section:02d}-candidates.png')
    print(f'montage (rows top to bottom = the list above): {montage}')


if __name__ == '__main__':
    main()
