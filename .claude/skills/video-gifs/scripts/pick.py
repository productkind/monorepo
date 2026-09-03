#!/usr/bin/env python3
"""Download chosen gifs at full size into the video's asset folder and report how each one fits.

  scripts/pick.py --video pm-technical-fluency-validation-00 \
      --pick 10=w5xEwipLyIBMdINSvn:hand-up --pick 13=Ie8ncfWOhpNeH9morB:question

Prints the definition line for each pick, including the loopBehavior or playbackRate the fit calls
for. Nothing is written to the definition: paste the lines, so the file stays hand-authored.
"""

import argparse

from common import assets_dir, download_original, gif_seconds, gif_size, slots


def advise(seconds, slot):
    """The two knobs, from the gap. Anything longer than its slot simply gets cut, which is fine."""
    if seconds >= slot:
        return None, f'{seconds / slot:.0%} of the gif plays before the cut'
    repeats = slot / seconds
    if repeats < 1.15:
        return (
            "loopBehavior: 'pause-after-finish'",
            f'repeats {repeats:.2f}x — hold the last frame if the motion is one-shot, '
            'drop the knob if it loops cyclically',
        )
    rate = round(seconds / slot, 2)
    if rate >= 0.6:
        return (
            f'playbackRate: {rate}',
            f'repeats {repeats:.2f}x — at {rate} speed it fills the slot in a single pass',
        )
    return None, (
        f'repeats {repeats:.1f}x and slowing it to {rate} would look like slow motion; '
        'let it loop only if the motion is cyclic, otherwise pick another gif'
    )


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--video', required=True)
    parser.add_argument('--pick', action='append', required=True,
                        help='section=gifId:name, e.g. 10=w5xEwipLyIBMdINSvn:hand-up')
    parser.add_argument('--root', default=None)
    args = parser.parse_args()

    folder = assets_dir(args.video, args.root)
    folder.mkdir(parents=True, exist_ok=True)
    slot_of = slots(args.video, args.root)

    for spec in args.pick:
        section, rest = spec.split('=', 1)
        gif_id, name = rest.split(':', 1)
        index = int(section)
        target = folder / f'section-{index:02d}-{name}.gif'
        download_original(gif_id, target)

        seconds, frames = gif_seconds(target)
        width, height = gif_size(target)
        slot = slot_of[index]
        knob, why = advise(seconds, slot)

        print(f'\n{target.name}  {seconds:.2f}s {frames}f {width}x{height} '
              f'{target.stat().st_size / 1e6:.1f}MB  slot {slot:.1f}s')
        print(f'  {why}')
        print(f'      // giphy "<search that found it>": https://giphy.com/gifs/{gif_id}')
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
