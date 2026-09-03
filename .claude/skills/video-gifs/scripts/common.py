"""Shared helpers for the video-gifs scripts: paths, gif measurement, giphy access."""

import json
import os
import pathlib
import subprocess
import urllib.parse
import urllib.request

GIPHY_HEADERS = {
    'Referer': 'https://giphy.com/',
    'User-Agent': (
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36'
    ),
}


def repo_root(start=None):
    """Walk up until a .git directory turns up, so the scripts work from any cwd."""
    here = pathlib.Path(start or os.getcwd()).resolve()
    for candidate in [here, *here.parents]:
        if (candidate / '.git').is_dir():
            return candidate
    raise SystemExit('Not inside a git repository; pass --root explicitly.')


def video_root(root=None):
    if root:
        return pathlib.Path(root).resolve()
    return repo_root() / 'little-parrot' / 'content' / 'video'


def assets_dir(video, root=None):
    return video_root(root) / 'public' / video


def timeline(video, root=None):
    """Section slots come from the timeline npm run narrate wrote; nothing here recomputes them."""
    path = assets_dir(video, root) / 'timeline.json'
    if not path.exists():
        raise SystemExit(f'No {path}. Run "npm run narrate -- --allow-generate" first.')
    return json.loads(path.read_text())


def slots(video, root=None):
    """Section index -> seconds on screen."""
    data = timeline(video, root)
    fps = data['fps']
    return {
        index: section['durationInFrames'] / fps
        for index, section in enumerate(data['sections'])
    }


def gif_seconds(path):
    """Sum the GIF frame delays. A delay of 0 is rendered as 100ms by browsers, so count it as 10cs."""
    out = subprocess.run(
        ['identify', '-format', '%T ', str(path)], capture_output=True, text=True
    ).stdout.split()
    delays = [int(value) for value in out if value.isdigit()]
    if not delays:
        return 0.0, 0
    return sum(delay if delay else 10 for delay in delays) / 100, len(delays)


def gif_size(path):
    out = subprocess.run(
        ['identify', '-format', '%w %h', str(path) + '[0]'], capture_output=True, text=True
    ).stdout.split()
    return (int(out[0]), int(out[1])) if len(out) >= 2 else (0, 0)


def api_key():
    """The environment first, then .env at the repo root, which is where the other keys live."""
    key = os.environ.get('GIPHY_API_KEY', '').strip()
    if not key:
        env_file = repo_root() / '.env'
        if env_file.exists():
            for line in env_file.read_text().splitlines():
                name, _, value = line.partition('=')
                if name.strip() == 'GIPHY_API_KEY':
                    key = value.strip().strip('"\'')
    if not key:
        raise SystemExit(
            'No GIPHY_API_KEY. Create a free key at https://developers.giphy.com/ and add\n'
            'GIPHY_API_KEY=... to .env at the repo root (it is gitignored, like the other keys).'
        )
    return key


def fetch(url, timeout=60):
    request = urllib.request.Request(url, headers=GIPHY_HEADERS)
    return urllib.request.urlopen(request, timeout=timeout).read()


def search(term, limit=25):
    """One giphy search. rating=g because these go on brand accounts."""
    url = (
        'https://api.giphy.com/v1/gifs/search'
        f'?api_key={api_key()}&q={urllib.parse.quote(term)}&limit={limit}&rating=g'
    )
    payload = json.loads(fetch(url, timeout=30))
    if payload.get('meta', {}).get('status') != 200:
        raise SystemExit(f'giphy refused the search: {payload.get("meta")}')
    return payload.get('data', [])


def download_original(gif_id, target):
    """media.giphy.com serves the original directly; the website itself blocks scripted requests."""
    target.write_bytes(fetch(f'https://media.giphy.com/media/{gif_id}/giphy.gif'))
    return target


def strip(path, out, frames=8, height=130):
    """A single row of evenly spaced frames, for reading what a gif actually does."""
    count = gif_seconds(path)[1]
    step = max(1, count // frames)
    subprocess.run(
        ['ffmpeg', '-y', '-v', 'error', '-i', str(path), '-vf',
         f"select='not(mod(n\\,{step}))',scale=-1:{height},tile={frames}x1",
         '-frames:v', '1', str(out)],
        capture_output=True,
    )
    return pathlib.Path(out)


def stack(images, out):
    subprocess.run(
        ['magick', *[str(image) for image in images], '-background', '#111',
         '-gravity', 'west', '-append', str(out)],
        capture_output=True,
    )
    return pathlib.Path(out)


def candidates_dir(video):
    """Candidates stay outside the repo: they are throwaway and there are a lot of them."""
    base = pathlib.Path(os.environ.get('TMPDIR', '/tmp')) / 'gif-candidates' / video
    base.mkdir(parents=True, exist_ok=True)
    return base
