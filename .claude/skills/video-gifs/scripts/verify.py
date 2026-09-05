#!/usr/bin/env python3
"""Check the chosen gifs: every frame for hidden text, every section in frame, every file served.

  scripts/verify.py --video pm-technical-fluency-validation-00            # all three checks
  scripts/verify.py --video ... --frames                                  # text check only
  scripts/verify.py --video ... --stills                                  # composed frames only
  scripts/verify.py --video ... --serve                                   # studio can load them

--frames is the one that catches the usual defect: captions and watermarks that appear only in
the last third of a gif, which a four-frame glance misses.
"""

import argparse
import json
import re
import subprocess
import time
import urllib.request

from common import (assets_dir, candidates_dir, edge_colour, gif_seconds, loop_seam, motion,
                    slots, stack, strip, timeline, video_root)


def chosen_visuals(video, root=None):
    """Each section's gif and its playbackRate, in section order, as the definition has them."""
    return [(name, rate) for name, rate, _ in declared(video, root)]


def declared(video, root=None):
    """Each section's gif, playbackRate and letterbox colour, in section order."""
    definition = video_root(root) / 'src' / 'videos' / f'{video}.ts'
    if not definition.exists():
        raise SystemExit(f'No definition at {definition}.')
    found = re.findall(
        r"src: '([^']+\.gif)',(?:\s*color: '([^']+)',)?(?:\s*playbackRate: ([\d.]+),)?",
        definition.read_text())
    return [(name, float(rate) if rate else None, colour or None)
            for name, colour, rate in found]


def chosen_gifs(video, root=None):
    return [name for name, _ in chosen_visuals(video, root)]


def check_flags(video, root=None):
    """Sections a reviewer flagged in Studio's annotated pass as wanting a different gif.

    The flag records the gif it was made against, so replacing that gif answers the complaint and
    the flag stops applying — a flag pointing at a gif the section no longer has is stale, not a
    job still waiting.
    """
    path = assets_dir(video, root) / 'flags.json'
    if not path.exists():
        print('  nothing flagged')
        return
    flagged = json.loads(path.read_text() or '{}')
    if not flagged:
        print('  nothing flagged')
        return
    current = {index: name for index, (name, _, _) in enumerate(declared(video, root))}
    for section in sorted(flagged, key=int):
        wanted = flagged[section].get('src')
        index = int(section)
        if current.get(index) != wanted:
            print(f'  {index:02d} flag was raised against {wanted}, which the section no longer '
                  'has — clear it')
        else:
            print(f'  {index:02d} {wanted:32} re-source this one')


def check_backgrounds(video, root=None):
    """Sections whose gif sits on a flat colour the letterbox is not matching.

    Worth a pass of its own because the defect is invisible in a frame grab of the gif: it only
    shows once the gif is placed on the house purple and a hard rectangle appears around it.
    """
    folder = assets_dir(video, root)
    changes = 0
    for index, (name, _, colour) in enumerate(declared(video, root)):
        gif = folder / name
        if not gif.exists():
            continue
        found = edge_colour(gif)
        if found and found['colour'] != colour:
            changes += 1
            print(f"  {index:02d} {name:32} sits on {found['colour']} "
                  f"({found['coverage']:.0%} of its border) — "
                  + (f"declared {colour}" if colour else "letterboxed on house purple"))
        elif colour and not found:
            changes += 1
            print(f'  {index:02d} {name:32} declares {colour} but has no flat border '
                  '— the gif was probably replaced')
    print('  every section letterboxed to match' if not changes
          else f'  {changes} section(s) want a colour change')


def check_frames(video, root=None):
    folder = assets_dir(video, root)
    cache = candidates_dir(video)
    names = chosen_gifs(video, root)
    print(f'{len(names)} gifs, 8 frames each — look for captions, watermarks, channel branding')
    for batch in range((len(names) + 2) // 3):
        group = names[batch * 3:(batch + 1) * 3]
        strips = [strip(folder / name, cache / f'verify-{name}.png') for name in group]
        out = stack(strips, cache / f'verify-batch-{batch}.png')
        print(f'  {out}   {", ".join(group)}')


def check_stills(video, root=None):
    """One composed frame per section, mid-slot: captions, letterbox and overlays as shipped."""
    cache = candidates_dir(video)
    sections = timeline(video, root)['sections']
    package = video_root(root)
    for index, section in enumerate(sections):
        frame = section['fromFrame'] + section['durationInFrames'] // 2
        subprocess.run(
            ['npx', 'remotion', 'still', video, str(cache / f'frame-{index:02d}.png'),
             f'--frame={frame}', '--log=error'],
            cwd=package, capture_output=True,
        )
    for batch in range((len(sections) + 5) // 6):
        group = range(batch * 6, min((batch + 1) * 6, len(sections)))
        subprocess.run(
            ['magick', *[str(cache / f'frame-{index:02d}.png') for index in group],
             '-resize', 'x400', '+append', str(cache / f'stills-{batch}.png')],
            capture_output=True,
        )
        print(f'  {cache}/stills-{batch}.png   sections {group.start}-{group.stop - 1}')


def check_serve(video, root=None, port=3999):
    """Remotion serves public/ under /static-<hash>/ and its file map skips symlinks, so a
    symlinked placeholder 404s here while looking fine on disk."""
    package = video_root(root)
    studio = subprocess.Popen(
        ['npx', 'remotion', 'studio', '--port', str(port), '--no-open'],
        cwd=package, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    try:
        index = ''
        for _ in range(30):
            time.sleep(1)
            try:
                index = urllib.request.urlopen(f'http://localhost:{port}/', timeout=2).read().decode()
                break
            except Exception:
                continue
        match = re.search(r'static-[a-zA-Z0-9]+', index)
        if not match:
            raise SystemExit('Studio did not start, or its static prefix could not be read.')
        prefix = match.group(0)

        failures = []
        for name in chosen_gifs(video, root):
            url = f'http://localhost:{port}/{prefix}/{video}/{name}'
            try:
                code = urllib.request.urlopen(url, timeout=30).status
            except Exception as error:
                code = getattr(error, 'code', 'error')
            if code != 200:
                failures.append(f'{name} -> {code}')
        print('  all gifs serve 200' if not failures else '  FAILED: ' + '; '.join(failures))
    finally:
        studio.terminate()
        studio.wait()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--video', required=True)
    parser.add_argument('--frames', action='store_true')
    parser.add_argument('--stills', action='store_true')
    parser.add_argument('--serve', action='store_true')
    parser.add_argument('--backgrounds', action='store_true')
    parser.add_argument('--flags', action='store_true')
    parser.add_argument('--root', default=None)
    args = parser.parse_args()
    everything = not (args.frames or args.stills or args.serve or args.backgrounds
                      or args.flags)

    if args.frames or everything:
        check_frames(args.video, args.root)
    if args.stills or everything:
        print('composed stills:')
        check_stills(args.video, args.root)
    if args.flags or everything:
        print('flagged for re-sourcing:')
        check_flags(args.video, args.root)
    if args.backgrounds or everything:
        print('letterbox colours:')
        check_backgrounds(args.video, args.root)
    if args.serve or everything:
        print('serving:')
        check_serve(args.video, args.root)

    if not everything:
        return

    folder = assets_dir(args.video, args.root)
    timeline_path = folder / 'timeline.json'
    if not timeline_path.exists():
        print(f'\nNo {timeline_path.name}: run narrate before the fits can be checked.')
        return
    fits = slots(args.video, args.root)
    print('\nfit per section:')
    for index, (name, rate) in enumerate(chosen_visuals(args.video, args.root)):
        seconds = gif_seconds(folder / name)[0]
        slot = fits[index]
        covered = seconds / rate if rate else seconds
        if rate:
            note = f'rate {rate} covers {covered:.2f}s'
            if abs(covered - slot) > 0.15:
                note += f' — recompute: {seconds / slot:.2f}'
        elif covered >= slot - 0.05:
            note = f'plays {covered / slot:.0%}, cut at the beat'
        else:
            seam = loop_seam(folder / name)
            note = f'loops {slot / covered:.2f}x, seam {seam:.2f}'
            note += ' (invisible)' if seam < 0.1 else (
                f' (visible jump: slow to {seconds / slot:.2f})' if seconds / slot >= 0.6
                else ' (visible jump, but slowing would be under the 0.6 floor)')
        moves = motion(folder / name)
        if moves < 0.02:
            note += f'  ** motion {moves:.3f}: this is a still image, replace it **'
        print(f'  {index:02d} {name:32} {seconds:5.2f}s  slot {slot:5.2f}s  {note}')


if __name__ == '__main__':
    main()
