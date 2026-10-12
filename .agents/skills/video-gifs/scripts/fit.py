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
import json
import subprocess
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
            if p.name not in ('index.ts', 'apply-visual.ts') and not p.name.endswith('.test.ts')
            and (not prefix or p.name.startswith(prefix))]


def sections_of(path, root=None):
    """The assets folder, and each section's filename and playbackRate in order.

    Read from the definition itself, through the video package, rather than by matching text in
    the file. Sections assembled from a shared module are invisible to a text parser, and a video
    whose sections it cannot see reads as a video with nothing wrong with it.
    """
    package = video_root(root)
    dump = subprocess.run(
        ['npx', 'tsx', 'scripts/sections.ts', '--video', path.stem],
        cwd=package, capture_output=True, text=True)
    if dump.returncode != 0:
        raise RuntimeError(f'could not read {path.stem}: {dump.stderr.strip().splitlines()[-1:]}')
    read = json.loads(dump.stdout)
    if not read:
        raise RuntimeError(f'{path.stem} is not a known video')
    return (read[0]['assets'],
            [(section['src'], float(section['playbackRate'])) for section in read[0]['sections']])


def report(path, root=None):
    video = path.stem
    try:
        real = slots(video, root)
    except (FileNotFoundError, SystemExit):
        return f'{video}: not narrated yet', 0
    assets, read = sections_of(path, root)
    # The folder a video loads from is its own `assets`, which is not always its id: the hook
    # experiments share one folder between variants so a body gif is sourced once.
    folder = assets_dir(assets, root)
    lines, problems = [], 0
    if not read:
        return f'{video}: no sections could be read — the fit is UNCHECKED', 1
    for index, (name, rate) in enumerate(read):
        gif = folder / name
        if index >= len(real):
            continue
        if not gif.exists():
            problems += 1
            lines.append(f'    §{index:02d} {name:36} MISSING from {folder.name}/')
            continue
        seconds = gif_seconds(gif)[0]
        # A `clip()` section holds an mp4, which has no frame delays to sum. Timing a video
        # against a slot is a different question and this pass is about gifs.
        if seconds == 0:
            continue
        plays = seconds / rate
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
