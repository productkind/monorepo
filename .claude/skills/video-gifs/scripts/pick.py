#!/usr/bin/env python3
"""Download chosen gifs at full size into the video's asset folder and report how each one fits.

  scripts/pick.py --video pm-technical-fluency-validation-00 \
      --pick 10=w5xEwipLyIBMdINSvn:hand-up --pick 13=Ie8ncfWOhpNeH9morB:question

Prints the definition line for each pick, including the loopBehavior or playbackRate the fit calls
for. Nothing is written to the definition: paste the lines, so the file stays hand-authored.
"""

import argparse
from urllib.parse import urlsplit

from common import assets_dir, download_original, gif_seconds, gif_size, slots, source_url


def advise(seconds, slot):
    """How to fit the gif to the slot.

    The house preference is a slowdown, never a held last frame: `pause-after-finish` freezes the
    picture and reads as a stall in the middle of a video where everything else keeps moving.
    """
    if seconds >= slot:
        return None, (
            f'{seconds / slot:.0%} of the gif plays before the cut. If the motion has to finish '
            f'(a drawing, a build, a reveal), speed it up with playbackRate: {seconds / slot:.2f}'
        )
    rate = round(seconds / slot, 2)
    repeats = slot / seconds
    if rate >= 0.6:
        return (
            f'playbackRate: {rate}',
            f'repeats {repeats:.2f}x at full speed; at {rate} it covers the beat in a single pass',
        )
    return None, (
        f'repeats {repeats:.1f}x and slowing it to {rate} would look like slow motion; '
        'let it loop if the motion is cyclic, otherwise pick another gif'
    )


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

        seconds, frames = gif_seconds(target)
        width, height = gif_size(target)
        slot = args.slot if args.slot else slot_of[index]
        knob, why = advise(seconds, slot)

        print(f'\n{target.name}  {seconds:.2f}s {frames}f {width}x{height} '
              f'{target.stat().st_size / 1e6:.1f}MB  slot {slot:.1f}s')
        print(f'  {why}')
        provider, origin = provenance(gif_id)
        print(f'      // {provider} "<search that found it>": {origin}')
        if knob:
            print('      visual: gif({')
            print(f"        src: '{target.name}',")
            print(f'        {knob},')
            print("        place: 'above-captions',")
            print('      }),')
        else:
            print(f"      visual: gif({{ src: '{target.name}', place: 'above-captions' }}),")


if __name__ == '__main__':
    main()
