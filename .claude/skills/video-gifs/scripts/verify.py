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
import re
import subprocess
import time
import urllib.request

from common import assets_dir, candidates_dir, gif_seconds, slots, stack, strip, timeline, video_root


def chosen_gifs(video, root=None):
    """The gifs the definition actually references, in section order."""
    definition = video_root(root) / 'src' / 'videos' / f'{video}.ts'
    if not definition.exists():
        raise SystemExit(f'No definition at {definition}.')
    return re.findall(r"src: '([^']+\.gif)'", definition.read_text())


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
    parser.add_argument('--root', default=None)
    args = parser.parse_args()
    everything = not (args.frames or args.stills or args.serve)

    if args.frames or everything:
        check_frames(args.video, args.root)
    if args.stills or everything:
        print('composed stills:')
        check_stills(args.video, args.root)
    if args.serve or everything:
        print('serving:')
        check_serve(args.video, args.root)

    fits = slots(args.video, args.root)
    folder = assets_dir(args.video, args.root)
    print('\nfit per section:')
    for index, name in enumerate(chosen_gifs(args.video, args.root)):
        seconds = gif_seconds(folder / name)[0]
        slot = fits[index]
        note = 'cut' if seconds >= slot else f'{slot / seconds:.2f}x'
        print(f'  {index:02d} {name:32} {seconds:5.2f}s  slot {slot:4.1f}s  {note}')


if __name__ == '__main__':
    main()
