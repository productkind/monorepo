"""Shared helpers for the stock-video scripts: paths, Pexels/Pixabay access, clip measurement."""

import hashlib
import json
import os
import pathlib
import subprocess
import urllib.error
import urllib.parse
import urllib.request

# Pexels answers a scripted request with 403 unless it looks like a browser, the same as giphy.
HEADERS = {
    'User-Agent': (
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36'
    ),
}

FRAME_WIDTH, FRAME_HEIGHT = 1080, 1920


def repo_root(start=None):
    here = pathlib.Path(start or os.getcwd()).resolve()
    for candidate in [here, *here.parents]:
        if (candidate / '.git').is_dir():
            return candidate
    raise SystemExit('Not inside a git repository; pass --root explicitly.')


def video_root(root=None):
    return pathlib.Path(root).resolve() if root else repo_root() / 'productkind' / 'video-generator'


def assets_dir(video, root=None):
    return video_root(root) / 'public' / video


def work_dir(video):
    """Candidate posters and downloads, outside the repo so nothing half-chosen is committed."""
    path = pathlib.Path(os.environ.get('TMPDIR', '/tmp')) / 'stock-candidates' / video
    path.mkdir(parents=True, exist_ok=True)
    return path


def env_value(name):
    if os.environ.get(name):
        return os.environ[name]
    path = repo_root() / '.env'
    if not path.exists():
        return None
    for line in path.read_text().splitlines():
        if line.strip().startswith(f'{name}='):
            return line.split('=', 1)[1].strip().strip('"').strip("'")
    return None


def fetch(url, headers=None, timeout=60):
    request = urllib.request.Request(url, headers={**HEADERS, **(headers or {})})
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return response.read()


def search(term, limit=40, provider='pexels'):
    """Portrait clips for a term, normalised to one shape across both providers.

    Neither provider can filter by duration in a search — pexels only offers it on
    `/videos/popular`, pixabay not at all — so duration is carried through and filtered by the
    caller. Pixabay cannot filter orientation either, which is why pexels leads.
    """
    if provider == 'pexels':
        key = env_value('PEXELS_API_KEY')
        if not key:
            raise SystemExit('PEXELS_API_KEY is not in the environment or .env.')
        url = ('https://api.pexels.com/videos/search'
               f'?query={urllib.parse.quote(term)}&orientation=portrait&per_page={limit}')
        payload = json.loads(fetch(url, {'Authorization': key}))
        return [
            {
                'provider': 'pexels',
                'id': str(video['id']),
                'seconds': video.get('duration') or 0,
                'page': video.get('url', ''),
                'poster': video.get('image', ''),
                'author': (video.get('user') or {}).get('name', ''),
                'files': [
                    {'width': f.get('width'), 'height': f.get('height'), 'link': f.get('link')}
                    for f in video.get('video_files', [])
                ],
            }
            for video in payload.get('videos', [])
        ]

    key = env_value('PIXABAY_API_KEY')
    if not key:
        raise SystemExit('PIXABAY_API_KEY is not in the environment or .env.')
    url = (f'https://pixabay.com/api/videos/?key={key}'
           f'&q={urllib.parse.quote(term)}&per_page={limit}')
    payload = json.loads(fetch(url))
    return [
        {
            'provider': 'pixabay',
            'id': str(hit.get('id')),
            'seconds': hit.get('duration') or 0,
            'page': hit.get('pageURL', ''),
            'poster': '',
            'author': hit.get('user', ''),
            'files': [
                {'width': v.get('width'), 'height': v.get('height'), 'link': v.get('url')}
                for v in (hit.get('videos') or {}).values()
            ],
        }
        for hit in payload.get('hits', [])
    ]


def lookup(video_id, provider='pexels'):
    """One clip by id. Search cannot find a clip by its own id, so picking needs this."""
    if provider == 'pexels':
        key = env_value('PEXELS_API_KEY')
        if not key:
            raise SystemExit('PEXELS_API_KEY is not in the environment or .env.')
        video = json.loads(fetch(f'https://api.pexels.com/videos/videos/{video_id}',
                                 {'Authorization': key}))
        return {
            'provider': 'pexels',
            'id': str(video['id']),
            'seconds': video.get('duration') or 0,
            'page': video.get('url', ''),
            'poster': video.get('image', ''),
            'author': (video.get('user') or {}).get('name', ''),
            'files': [
                {'width': f.get('width'), 'height': f.get('height'), 'link': f.get('link')}
                for f in video.get('video_files', [])
            ],
        }
    raise SystemExit(f'No id lookup implemented for {provider}.')


def exact_frame_file(candidate):
    """The file that is already 1080x1920, so nothing is scaled at render time."""
    for entry in candidate['files']:
        if entry['width'] == FRAME_WIDTH and entry['height'] == FRAME_HEIGHT:
            return entry
    return None


def portrait_files(candidate):
    return [f for f in candidate['files']
            if f['width'] and f['height'] and f['height'] > f['width']]


def probe(path):
    """Duration, dimensions and codec of a file on disk, from the container rather than metadata."""
    out = subprocess.run(
        ['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries',
         'stream=width,height,codec_name:format=duration', '-of', 'json', str(path)],
        capture_output=True, text=True)
    data = json.loads(out.stdout or '{}')
    stream = (data.get('streams') or [{}])[0]
    return {
        'seconds': float((data.get('format') or {}).get('duration') or 0),
        'width': stream.get('width'),
        'height': stream.get('height'),
        'codec': stream.get('codec_name'),
    }


def contact_sheet(path, out, frames=6, height=320):
    """A row of frames sampled across the whole clip, which is how you judge footage."""
    seconds = probe(path)['seconds'] or 1
    step = max(seconds / frames, 0.1)
    subprocess.run(
        ['ffmpeg', '-y', '-v', 'error', '-i', str(path), '-vf',
         f'fps=1/{step:.3f},scale=-1:{height},tile={frames}x1', '-frames:v', '1', str(out)],
        capture_output=True)
    return pathlib.Path(out)


def stack(images, out):
    subprocess.run(['magick', *[str(image) for image in images], '-background', '#111',
                    '-gravity', 'west', '-append', str(out)], capture_output=True)
    return pathlib.Path(out)


def row(images, out, height=360):
    """Portrait posters laid left to right.

    Stacking portrait frames vertically makes a sliver thousands of pixels tall that nothing can
    be judged from; side by side keeps each one big enough to read.
    """
    scaled = []
    for index, image in enumerate(images):
        target = pathlib.Path(out).with_name(f'{pathlib.Path(out).stem}-{index:02d}.png')
        subprocess.run(['magick', str(image), '-resize', f'x{height}', str(target)],
                       capture_output=True)
        scaled.append(target)
    subprocess.run(['magick', *[str(image) for image in scaled], '-background', '#111',
                    '+append', str(out)], capture_output=True)
    return pathlib.Path(out)


def fingerprint(path):
    """Content hash of the first frame, to catch the same footage under two provider ids."""
    frame = subprocess.run(
        ['ffmpeg', '-v', 'error', '-i', str(path), '-frames:v', '1', '-vf',
         'scale=16:16,format=gray', '-f', 'rawvideo', '-'],
        capture_output=True)
    return hashlib.sha256(frame.stdout).hexdigest()[:16]
