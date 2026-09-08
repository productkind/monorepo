#!/usr/bin/env python3
"""Download chosen stock clips, trim them to their beats, and report what to paste.

Where a clip came from is printed as data — `source: { provider, id, search, author }` — because
the id is what says whether a campaign is about to use the same footage twice, and the author is
the credit pexels asks for. It used to be a comment holding a page URL.

  scripts/pick.py --video <id> --pick 0=37892573:meeting-room:4.70 --pick 1=37476076:barrier:6.10

Each pick is `run=providerId:keyword:beatSeconds`. The clip is fetched at its native 1080x1920,
trimmed to the beat plus headroom, stripped of audio and re-encoded to H.264 with BT.709 tags.

Trimming is not just about disk. A `clip` has no playback rate and no loop, so a clip that runs
out holds a frozen frame while the captions keep moving; keeping a known margin past the beat is
what guarantees it cannot. Audio goes because every clip is muted anyway — the narration is the
only sound — and dropping it takes roughly a tenth off the file.

No grade is applied. The house grade (`eq=saturation=1.35:contrast=1.15`) exists to rescue 10-bit
HLG footage that converts flat; stock arrives as SDR BT.709 and comes out over-saturated if it is
graded again.
"""

import argparse
import subprocess

from common import (FRAME_HEIGHT, FRAME_WIDTH, assets_dir, contact_sheet, exact_frame_file,
                    fetch, fingerprint, lookup, probe, stack, work_dir)

HEADROOM_SECONDS = 1.0


def download(candidate, target):
    entry = exact_frame_file(candidate)
    if entry is None:
        raise SystemExit(f"{candidate['id']} has no 1080x1920 file.")
    target.write_bytes(fetch(entry['link']))
    return target


def trim(source, target, seconds, start):
    subprocess.run(
        ['ffmpeg', '-y', '-v', 'error', '-ss', f'{start:.2f}', '-i', str(source),
         '-t', f'{seconds:.2f}', '-an',
         '-c:v', 'libx264', '-crf', '23', '-preset', 'veryfast', '-pix_fmt', 'yuv420p',
         '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
         '-movflags', '+faststart', str(target)],
        capture_output=True, check=True)
    return target


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--video', required=True)
    parser.add_argument('--pick', action='append', required=True,
                        help='run=providerId:keyword:beatSeconds')
    parser.add_argument('--start', type=float, default=0.0, help='seconds into the source clip')
    parser.add_argument('--term', default='',
                        help='the search that found it, recorded in the definition as data')
    parser.add_argument('--root', default=None)
    args = parser.parse_args()

    folder = assets_dir(args.video, args.root)
    folder.mkdir(parents=True, exist_ok=True)
    cache = work_dir(args.video)
    sheets = []

    for spec in args.pick:
        run, rest = spec.split('=', 1)
        provider_id, keyword, beat = rest.split(':')
        beat = float(beat)
        wanted = beat + HEADROOM_SECONDS

        candidate = lookup(provider_id)

        source = cache / f"source-{provider_id}.mp4"
        if not source.exists():
            download(candidate, source)
        target = folder / f'clip-{int(run):02d}-{keyword}.mp4'
        trim(source, target, wanted, args.start)

        measured = probe(target)
        # Pexels' reported dimensions cannot be trusted: 6000421 is listed as 1080x1920, its file
        # is even named hd_1080_1920, and the stream inside is 720x1280. Upscaling that to the
        # frame is visibly soft, so the real numbers decide.
        if (measured['width'], measured['height']) != (FRAME_WIDTH, FRAME_HEIGHT):
            target.unlink()
            raise SystemExit(
                f"{provider_id} claims 1080x1920 but its stream is "
                f"{measured['width']}x{measured['height']}. Pick another clip; this one would be "
                'upscaled into the frame.')
        sheets.append(contact_sheet(target, cache / f'check-{int(run):02d}.png'))
        print(f'\n{target.name}  {measured["seconds"]:.2f}s covering a {beat:.2f}s beat  '
              f'{measured["width"]}x{measured["height"]} {measured["codec"]}  '
              f'{target.stat().st_size / 1e6:.1f}MB  print {fingerprint(target)}')
        # Recorded as data rather than as a comment: the id is what says whether the campaign is
        # about to use the same footage twice, and only a giphy url ever carried one in its path.
        # The author comes with it because pexels asks for the credit.
        print('      visual: clip({')
        print(f"        src: '{target.name}',")
        print('        source: {')
        print(f"          provider: '{candidate['provider']}',")
        print(f"          id: '{provider_id}',")
        print(f"          search: '{args.term}',")
        if candidate.get('author'):
            print(f"          author: '{candidate['author']}',")
        print('        },')
        print('      }),')

    if sheets:
        print(f'\ncontact sheets: {stack(sheets, work_dir(args.video) / "checks.png")}')


if __name__ == '__main__':
    main()
