#!/usr/bin/env python3
"""List every gif id already used by the project's video definitions.

  scripts/used-ids.py                       # one id per line
  scripts/used-ids.py --prefix pm-technical-fluency  # only one campaign
  scripts/used-ids.py --where               # id, then the sections using it

Hand the output to a sourcer so a video does not repeat a gif an earlier one already used.

A definition's provenance comment holds a URL, not an id, and only giphy URLs carry the id in the
path. Anything sourced elsewhere has to be resolved through `.sources.json`, which `remember_source`
wrote when the gif was harvested. Grepping the ids straight out of the definitions therefore misses
every non-giphy pick, which is not a cosmetic gap: two of video 7's picks repeated video 5 because
the list they were checked against held klipy URLs where the sourcer was comparing klipy ids.
"""

import argparse
import collections
import json
import re

from common import shared_dir, video_root

GIPHY_ID = re.compile(r'giphy\.com/gifs/([A-Za-z0-9]+)')
OTHER_URL = re.compile(r'(https://\S+\.(?:gif|mp4|webp))')


def by_url():
    """The reverse of `.sources.json`: a real URL back to the id it was harvested under."""
    path = shared_dir() / '.sources.json'
    if not path.exists():
        return {}
    try:
        return {url: gif_id for gif_id, url in json.loads(path.read_text()).items()}
    except (ValueError, OSError):
        return {}


def used(prefix=None, root=None):
    """Every id in the definitions, mapped to the `<video>§<section>` places it appears."""
    sources, places = by_url(), collections.defaultdict(list)
    definitions = sorted((video_root(root) / 'src' / 'videos').glob('*.ts'))
    for path in definitions:
        if path.name == 'index.ts' or (prefix and not path.name.startswith(prefix)):
            continue
        # Sections are split the way the definitions are written, so a pick keeps its section
        # number in the report rather than just naming the file it came from.
        for index, section in enumerate(path.read_text().split('    {\n')[1:]):
            for gif_id in GIPHY_ID.findall(section):
                places[gif_id].append(f'{path.stem}§{index:02d}')
            for url in OTHER_URL.findall(section):
                if 'giphy.com' in url:
                    continue
                gif_id = sources.get(url.strip())
                places[gif_id or url.strip()].append(f'{path.stem}§{index:02d}')
    return places


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--prefix', help='only definitions whose filename starts with this')
    parser.add_argument('--where', action='store_true', help='also print where each id is used')
    parser.add_argument('--root')
    args = parser.parse_args()

    places = used(args.prefix, args.root)
    for gif_id in sorted(places):
        print(f'{gif_id}\t{", ".join(places[gif_id])}' if args.where else gif_id)
    unresolved = [gif_id for gif_id in places if gif_id.startswith('http')]
    if unresolved:
        print(f'\n{len(unresolved)} url(s) had no id in .sources.json; the cache may have been '
              'cleared since they were harvested. A sourcer comparing ids cannot match these.')


if __name__ == '__main__':
    main()
