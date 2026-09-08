#!/usr/bin/env python3
"""List every gif id already used by the project's video definitions.

  scripts/used-ids.py                       # one id per line
  scripts/used-ids.py --prefix pm-technical-fluency  # only one campaign
  scripts/used-ids.py --where               # id, then the sections using it

Hand the output to a sourcer so a video does not repeat a gif an earlier one already used.

Each section records where its gif came from as data — `source: { provider, id, search }` — so the
id is read, not re-derived. It used to live in a provenance comment as a URL, and only giphy URLs
carry an id in the path: that gap is why two of video 7's picks repeated video 5. Forty sections
predate ids being kept and carry a provider and a search only; they are listed at the end, because
nothing can be compared against them.
"""

import argparse
import collections
import json
import re

from common import shared_dir, video_root

# Where a gif came from is recorded in the definition as data now, so the id is read rather than
# re-derived from a url. Only a giphy url ever carried one, which is how two of video 7's picks
# repeated video 5.
SOURCE_ID = re.compile(r'source: \{[^}]*?id: ["\']([^"\']+)["\']', re.S)
# Records written before ids were kept: a provider and a search, and no id anywhere.
SOURCE_NO_ID = re.compile(r'source: \{(?![^}]*id:)[^}]*?search: ["\']([^"\']+)["\']', re.S)


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
    places = collections.defaultdict(list)
    definitions = sorted((video_root(root) / 'src' / 'videos').glob('*.ts'))
    for path in definitions:
        if path.name in ('index.ts', 'apply-visual.ts') or path.name.endswith('.test.ts'):
            continue
        if prefix and not path.name.startswith(prefix):
            continue
        # Sections are split the way the definitions are written, so a pick keeps its section
        # number in the report rather than just naming the file it came from.
        for index, section in enumerate(path.read_text().split('    {\n')[1:]):
            for gif_id in SOURCE_ID.findall(section):
                places[gif_id].append(f'{path.stem}§{index:02d}')
    return places


def without_ids(prefix=None, root=None):
    """Sections whose record has no id, so nothing can be compared against them."""
    stuck = []
    for path in sorted((video_root(root) / 'src' / 'videos').glob('*.ts')):
        if path.name in ('index.ts', 'apply-visual.ts') or path.name.endswith('.test.ts'):
            continue
        if prefix and not path.name.startswith(prefix):
            continue
        for index, section in enumerate(path.read_text().split('    {\n')[1:]):
            for search in SOURCE_NO_ID.findall(section):
                stuck.append(f'{path.stem}§{index:02d} "{search}"')
    return stuck


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--prefix', help='only definitions whose filename starts with this')
    parser.add_argument('--where', action='store_true', help='also print where each id is used')
    parser.add_argument('--root')
    args = parser.parse_args()

    places = used(args.prefix, args.root)
    for gif_id in sorted(places):
        print(f'{gif_id}\t{", ".join(places[gif_id])}' if args.where else gif_id)
    unresolved = without_ids(args.prefix, args.root)
    if unresolved:
        print(f'\n{len(unresolved)} section(s) record a provider and a search but no id, because '
              'none was written down when they were picked. Nothing can be compared against them:')
        for line in unresolved:
            print(f'  {line}')


if __name__ == '__main__':
    main()
