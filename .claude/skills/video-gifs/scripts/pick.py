#!/usr/bin/env python3
"""Download chosen gifs at full size into the video's asset folder and report how each one fits.

  scripts/pick.py --video pm-technical-fluency-validation-00 \
      --pick 10=w5xEwipLyIBMdINSvn:hand-up --pick 13=Ie8ncfWOhpNeH9morB:question

Prints the definition line for each pick, including the loopBehavior or playbackRate the fit calls
for. Nothing is written to the definition: paste the lines, so the file stays hand-authored.
"""

import argparse
from urllib.parse import urlsplit

from common import (assets_dir, download_original, edge_colour, fit_advice, gif_seconds,
                    gif_size, repeats_existing_artwork, slots, source_url)


def advise(seconds, slot):
    """The knob line for the definition, and the sentence explaining it. Rule lives in common."""
    fit = fit_advice(seconds, slot)
    knob = None if fit['rate'] is None else f"playbackRate: {fit['rate']}"
    return knob, fit['why']


def provenance(gif_id):
    """Where the pick came from, for the definition's comment.

    Giphy originals are addressable from the id alone, so a giphy id needs no record. Anything
    harvested elsewhere was recorded by `remember_source`, and that URL is its only real address:
    a klipy id at giphy.com/gifs/<id> is either a 404 or, worse, somebody else's gif.
    """
    url = source_url(gif_id)
    if not url:
        return 'giphy', f'https://giphy.com/gifs/{gif_id}'
    labels = (urlsplit(url).hostname or '').split('.')
    return (labels[-2] if len(labels) > 1 else url), url


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--video', required=True)
    parser.add_argument('--pick', action='append', required=True,
                        help='section=gifId:name, e.g. 10=w5xEwipLyIBMdINSvn:hand-up')
    parser.add_argument('--slot', type=float, default=None,
                        help='seconds on screen, when timeline.json does not exist yet')
    parser.add_argument('--root', default=None)
    args = parser.parse_args()

    folder = assets_dir(args.video, args.root)
    folder.mkdir(parents=True, exist_ok=True)
    slot_of = {} if args.slot else slots(args.video, args.root)

    for spec in args.pick:
        section, rest = spec.split('=', 1)
        gif_id, name = rest.split(':', 1)
        index = int(section)
        target = folder / f'section-{index:02d}-{name}.gif'
        download_original(gif_id, target)

        # An id check cannot see that the same artwork was uploaded twice, so compare the file.
        repeats = repeats_existing_artwork(target, args.video.rsplit('-', 1)[0], args.root)
        if repeats:
            print(f'\n!! {target.name} is the same artwork as '
                  + ', '.join(f'{p.parent.name[-2:]}/{p.name}' for p in repeats)
                  + '\n   Pick something else: it is already in the campaign under another id.')

        seconds, frames = gif_seconds(target)
        width, height = gif_size(target)
        slot = args.slot if args.slot else slot_of[index]
        knob, why = advise(seconds, slot)
        background = edge_colour(target)

        print(f'\n{target.name}  {seconds:.2f}s {frames}f {width}x{height} '
              f'{target.stat().st_size / 1e6:.1f}MB  slot {slot:.1f}s')
        print(f'  {why}')
        if background:
            print(f"  sits on {background['colour']} across {background['coverage']:.0%} of its "
                  'border, so the letterbox takes that colour and the edge disappears')
        provider, origin = provenance(gif_id)
        print(f'      // {provider} "<search that found it>": {origin}')

        fields = [f"src: '{target.name}'"]
        if background:
            fields.append(f"color: '{background['colour']}'")
        if knob:
            fields.append(knob)
        fields.append("place: 'above-captions'")
        if len(fields) == 2:
            print(f"      visual: gif({{ {', '.join(fields)} }}),")
        else:
            print('      visual: gif({')
            for field in fields:
                print(f'        {field},')
            print('      }),')


if __name__ == '__main__':
    main()
