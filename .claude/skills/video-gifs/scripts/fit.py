#!/usr/bin/env python3
"""Check every gif against the slot its narration actually gave it.

  scripts/fit.py --prefix pm-technical-fluency        # every narrated video in a campaign
  scripts/fit.py --video pm-technical-fluency-validation-06

`verify.py` covers one video and also renders stills; this is the timing half alone, across a
whole campaign, for the pass you make straight after `npm run narrate`.

Slots estimated from word counts are routinely 20% out, and narration is the only way to learn the
real ones, so a rate set before narrating is a guess that has to be re-checked afterwards. Editing
narration re-opens it too: adding an ElevenLabs `[pause]` tag to a closing question lengthened the
*previous* section by 1.3 seconds, because a section starts on its first spoken word and the
silence therefore belongs to the beat before it.
"""

import argparse
import re

from common import assets_dir, gif_seconds, loop_seam, slots, video_root

# A repeat only shows if the loop seam is visible; a clean seam reads as continuous motion.
REPEAT_LIMIT = 1.15
VISIBLE_SEAM = 0.15
SLOW_FLOOR = 0.6


def definitions(prefix=None, video=None, root=None):
    folder = video_root(root) / 'src' / 'videos'
    if video:
        return [folder / f'{video}.ts']
    return [p for p in sorted(folder.glob('*.ts'))
            if p.name != 'index.ts' and (not prefix or p.name.startswith(prefix))]


def sections_of(path):
    """Each section's gif filename and playbackRate, in order."""
    for block in path.read_text().split('    {\n')[1:]:
        name = re.search(r"src: '([^']+)'", block)
        if not name:
            continue
        rate = re.search(r'playbackRate: ([0-9.]+)', block)
        yield name.group(1), float(rate.group(1)) if rate else 1.0


def report(path, root=None):
    video = path.stem
    try:
        real = slots(video, root)
    except (FileNotFoundError, SystemExit):
        return f'{video}: not narrated yet', 0
    folder = assets_dir(video, root)
    lines, problems = [], 0
    for index, (name, rate) in enumerate(sections_of(path)):
        gif = folder / name
        if not gif.exists() or index >= len(real):
            continue
        plays = gif_seconds(gif)[0] / rate
        repeats = real[index] / plays
        if repeats <= REPEAT_LIMIT or loop_seam(gif) <= VISIBLE_SEAM:
            continue
        problems += 1
        wanted = round(plays * rate / real[index], 2)
        floor = '  (under the 0.6 floor, so it wants a longer gif)' if wanted < SLOW_FLOOR else ''
        lines.append(f'    §{index:02d} {name:36} plays {plays:.2f}s in {real[index]:.2f}s '
                     f'({repeats:.2f}x); playbackRate {rate} -> {wanted}{floor}')
    head = f'{video}: ' + ('every beat covered' if not problems else f'{problems} section(s) loop')
    return '\n'.join([head, *lines]), problems


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--prefix', help='only definitions whose filename starts with this')
    parser.add_argument('--video', help='a single video id')
    parser.add_argument('--root')
    args = parser.parse_args()

    total = 0
    for path in definitions(args.prefix, args.video, args.root):
        text, problems = report(path, args.root)
        total += problems
        print(text)
    print(f'\n{total} section(s) need a new playbackRate.' if total else '\nNothing to change.')


if __name__ == '__main__':
    main()
