"""Shared helpers for the video-gifs scripts: paths, gif measurement, giphy access."""

import hashlib
import json
import os
import pathlib
import re
import subprocess
import time
import urllib.error
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
    return repo_root() / 'productkind' / 'video-generator'


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


# Below this share of the border ring, the colour is not a background — it is one element of a
# picture that happens to reach the edge. Set from the real library: the obvious cases (a flat
# card behind an illustration) sit at 0.94–1.00, while a white card whose artwork bleeds off the
# edge lands near 0.78 and is left alone rather than guessed at.
UNIFORM_EDGE = 0.90

# Palette dithering shifts a flat colour by a few levels between frames, so exact equality would
# reject backgrounds that read as one colour on screen.
EDGE_TOLERANCE = 10

_EDGES = (('North', 'x%d+0+0'), ('South', 'x%d+0+0'), ('West', '%dx+0+0'), ('East', '%dx+0+0'))
_HISTOGRAM_LINE = re.compile(r'^\s*(\d+):\s*\(([^)]*)\)')


def _ring_histogram(path, ring):
    """Every colour on the gif's border ring, counted across every frame."""
    counts = {}
    for gravity, shape in _EDGES:
        out = subprocess.run(
            ['magick', str(path), '-coalesce', '-gravity', gravity, '-crop', shape % ring,
             '+repage', '+append', '-depth', '8', '-format', '%c', 'histogram:info:-'],
            capture_output=True, text=True).stdout
        for line in out.splitlines():
            match = _HISTOGRAM_LINE.match(line)
            if match:
                channels = tuple(int(float(v)) for v in match.group(2).split(',')[:4])
                counts[channels] = counts.get(channels, 0) + int(match.group(1))
    return counts


def edge_colour(path, ring=2):
    """The flat colour a gif sits on, or None when it does not sit on one.

    A gif with a solid background renders with a visible seam where its edge meets the house
    letterbox, and the fix is to letterbox in the gif's own colour. Reading the ring rather than
    a corner pixel is what makes it safe to act on unasked: a photograph never covers 90% of its
    own border with one colour, so it is never mistaken for a card.

    Transparent edges return None. The gif composites onto whatever is behind it, so there is no
    seam to remove and the house background is already right.
    """
    counts = _ring_histogram(path, ring)
    if not counts:
        return None
    total = sum(counts.values())
    mode = max(counts, key=counts.get)
    if len(mode) > 3 and mode[3] < 250:
        return None
    near = sum(count for colour, count in counts.items()
               if max(abs(a - b) for a, b in zip(colour[:3], mode[:3])) <= EDGE_TOLERANCE)
    coverage = near / total
    if coverage < UNIFORM_EDGE:
        return None
    return {'colour': '#%02x%02x%02x' % mode[:3], 'coverage': coverage}


class RateLimited(Exception):
    """A provider said no more requests this hour."""


def fetch(url, timeout=60):
    """The giphy Referer belongs only on giphy requests; other hosts get a plain user agent."""
    headers = GIPHY_HEADERS if 'giphy.com' in url else {'User-Agent': GIPHY_HEADERS['User-Agent']}
    request = urllib.request.Request(url, headers=headers)
    return urllib.request.urlopen(request, timeout=timeout).read()


# Giphy allows 100 searches per key per hour and resets on the hour. Three keys are pooled in
# .env; a key that returns 429 is not touched again until the hour rolls over, and the count is
# tracked on disk so the ban survives the many short-lived processes a video's harvest runs.
GIPHY_SEARCHES_PER_HOUR = 100


def shared_dir():
    """One directory for provider state, shared by every video and every script invocation."""
    base = pathlib.Path(os.environ.get('TMPDIR', '/tmp')) / 'gif-candidates'
    base.mkdir(parents=True, exist_ok=True)
    return base


def env_value(name):
    """The environment first, then .env at the repo root, which is where the other keys live."""
    value = os.environ.get(name, '').strip()
    if value:
        return value
    env_file = repo_root() / '.env'
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            key, _, raw = line.partition('=')
            if key.strip() == name:
                return raw.strip().strip('"\'')
    return ''


def giphy_keys():
    """The pooled keys in order: GIPHY_API_KEY_POOL_0, _1, _2, … plus a plain GIPHY_API_KEY."""
    keys = []
    index = 0
    while True:
        value = env_value(f'GIPHY_API_KEY_POOL_{index}')
        if not value:
            break
        keys.append(value)
        index += 1
    single = env_value('GIPHY_API_KEY')
    if single and single not in keys:
        keys.append(single)
    return keys


def fingerprint(key):
    """A stable short id for a key, so state files never contain the secret."""
    import hashlib

    return hashlib.sha256(key.encode()).hexdigest()[:12]


def _next_hour():
    now = time.time()
    return now - (now % 3600) + 3600


def _current_hour():
    return time.strftime('%Y-%m-%dT%H', time.gmtime())


def _load_state():
    """Per-hour search counts and per-key cooldowns. Counts reset when the hour rolls over."""
    path = shared_dir() / '.provider-state.json'
    state = {'hour': _current_hour(), 'counts': {}, 'cooldown': {}}
    if path.exists():
        try:
            stored = json.loads(path.read_text())
            if stored.get('hour') == state['hour']:
                state = stored
            else:
                # New hour: counts start again, but keep cooldowns that still have time on them.
                now = time.time()
                state['cooldown'] = {
                    fp: until for fp, until in stored.get('cooldown', {}).items() if until > now
                }
        except (ValueError, OSError):
            pass
    return state


def _save_state(state):
    (shared_dir() / '.provider-state.json').write_text(f'{json.dumps(state, indent=1)}\n')


def _usable(state, key):
    fp = fingerprint(key)
    if state['cooldown'].get(fp, 0) > time.time():
        return False
    return state['counts'].get(fp, 0) < GIPHY_SEARCHES_PER_HOUR


def _cool_down(state, key, reason):
    """Take a key out of service until the hour rolls over. Never retried before then."""
    fp = fingerprint(key)
    state['cooldown'][fp] = _next_hour()
    state['counts'][fp] = GIPHY_SEARCHES_PER_HOUR
    _save_state(state)
    left = int((_next_hour() - time.time()) / 60)
    print(f'  giphy key {fp} out for this hour ({reason}); {left} min until reset')


def _giphy_search(key, term, limit):
    url = (
        'https://api.giphy.com/v1/gifs/search'
        f'?api_key={key}&q={urllib.parse.quote(term)}&limit={limit}&rating=g'
    )
    payload = json.loads(fetch(url, timeout=30))
    status = payload.get('meta', {}).get('status')
    if status == 429:
        raise RateLimited(payload.get('meta', {}).get('msg', 'rate limited'))
    if status != 200:
        raise SystemExit(f'giphy refused the search: {payload.get("meta")}')
    return payload.get('data', [])


def _klipy_search(key, term, limit):
    """Klipy is Tenor-shaped. Normalise its items into the giphy shape the callers already read."""
    url = (
        'https://api.klipy.com/v2/search'
        f'?key={key}&q={urllib.parse.quote(term)}&limit={limit}&contentfilter=high'
    )
    payload = json.loads(fetch(url, timeout=30))
    rows = []
    for item in payload.get('results', []):
        formats = item.get('media_formats', {})
        full = formats.get('gif')
        if not full or not full.get('dims'):
            continue
        preview = formats.get('mediumgif') or formats.get('tinygif') or full
        width, height = full['dims'][0], full['dims'][1]
        rows.append({
            'id': str(item['id']),
            'title': item.get('title') or item.get('content_description') or '',
            'images': {
                'original': {'width': str(width), 'height': str(height), 'url': full['url']},
                'fixed_height': {'url': preview['url']},
            },
        })
        remember_source(str(item['id']), full['url'])
    return rows


def search(term, limit=25, provider='auto'):
    """One search, on whichever provider is available.

    Pooled giphy keys are used in order of least-used-this-hour, so the load spreads instead of
    burning the first key to its cap. A key that hits 429 is retired for the hour — never retried,
    in this process or a later one. When every giphy key is spent, Klipy serves the search instead.

    `provider` names one of them instead of letting availability decide. The two catalogues are not
    interchangeable: giphy is deeper in footage and reaction clips, klipy in flat vector
    illustration, so a beat giphy cannot serve at all is often one klipy answers on the first
    search. Video 7's "a woman running the discussion" took eight fruitless giphy rounds and one
    klipy search. Left on 'auto', klipy is only ever reached by exhausting 300 giphy searches.
    """
    state = _load_state()
    keys = giphy_keys() if provider in ('auto', 'giphy') else []

    for key in sorted((k for k in keys if _usable(state, k)),
                      key=lambda k: state['counts'].get(fingerprint(k), 0)):
        fp = fingerprint(key)
        state['counts'][fp] = state['counts'].get(fp, 0) + 1
        _save_state(state)
        try:
            return _giphy_search(key, term, limit)
        except RateLimited as limited:
            _cool_down(state, key, str(limited))
        except urllib.error.HTTPError as error:
            if error.code == 429:
                _cool_down(state, key, 'HTTP 429')
            else:
                _cool_down(state, key, f'HTTP {error.code}')

    if provider == 'giphy':
        raise SystemExit(
            'No usable giphy key this hour, and --provider giphy rules out the klipy fallback.'
        )

    klipy = env_value('KLIPY_API_KEY')
    if klipy:
        if provider == 'auto':
            print('  all giphy keys spent this hour; searching klipy')
        return _klipy_search(klipy, term, limit)

    cooling = sorted(state['cooldown'].items())
    raise SystemExit(
        'No search provider available. '
        + (f'{len(keys)} giphy key(s) are spent or cooling: '
           + ', '.join(f'{fp} for {int((until - time.time()) / 60)} min'
                       for fp, until in cooling if until > time.time())
           if keys else 'No GIPHY_API_KEY_POOL_0… in the environment or .env.')
        + ' Add KLIPY_API_KEY to .env for a fallback, or wait for the hour to roll over.'
    )


def remember_source(gif_id, url):
    """Record where a gif came from, so pick.py can download a non-giphy original later."""
    path = shared_dir() / '.sources.json'
    try:
        known = json.loads(path.read_text()) if path.exists() else {}
    except (ValueError, OSError):
        known = {}
    if known.get(gif_id) != url:
        known[gif_id] = url
        path.write_text(f'{json.dumps(known, indent=1)}\n')


def source_url(gif_id):
    path = shared_dir() / '.sources.json'
    if path.exists():
        try:
            return json.loads(path.read_text()).get(gif_id)
        except (ValueError, OSError):
            return None
    return None


def download_original(gif_id, target):
    """Download a gif at full size.

    media.giphy.com serves giphy originals from the id alone (the website itself blocks scripted
    requests). Anything harvested from another provider was recorded by `remember_source`, so its
    real URL is looked up rather than guessed.
    """
    url = source_url(gif_id) or f'https://media.giphy.com/media/{gif_id}/giphy.gif'
    target.write_bytes(fetch(url))
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


def artwork_signature(path):
    """A hash of the opening frame, reduced to a 16x16 grey thumbnail.

    Identifies the *artwork* rather than the upload. The same icon pack is hosted on giphy and on
    klipy under different ids, so checking a pick against a list of used ids misses it entirely:
    four of video 8's first picks turned out to be pixel-identical to gifs already used in videos
    5, 6 and 7, and every one of them had passed the id check.
    """
    frame = subprocess.run(
        ['magick', f'{path}[0]', '-coalesce', '-resize', '16x16!', '-colorspace', 'gray',
         '-depth', '8', 'gray:-'],
        capture_output=True,
    )
    return hashlib.sha256(frame.stdout).hexdigest()[:16]


def campaign_assets(prefix, root=None):
    """Every downloaded gif belonging to videos whose id starts with `prefix`."""
    return sorted((video_root(root) / 'public').glob(f'{prefix}*/section-*.gif'))


def repeats_existing_artwork(path, prefix, root=None):
    """The already-downloaded assets whose artwork matches `path`, ignoring `path` itself."""
    mine = artwork_signature(path)
    return [other for other in campaign_assets(prefix, root)
            if other.resolve() != path.resolve() and artwork_signature(other) == mine]


def loop_seam(path):
    """RMSE between a gif's last frame and its first, 0 to 1.

    Below about 0.1 the loop restarts invisibly, so letting the gif repeat inside a longer slot
    costs nothing. Above that the restart is a visible jump and the gif wants slowing instead.
    """
    import tempfile

    with tempfile.TemporaryDirectory() as tmp:
        for index, name in ((0, 'first'), (-1, 'last')):
            subprocess.run(['magick', f'{path}[{index}]', '-resize', '120x120!', f'{tmp}/{name}.png'],
                           capture_output=True)
        out = subprocess.run(
            ['magick', 'compare', '-metric', 'RMSE', f'{tmp}/first.png', f'{tmp}/last.png', 'null:'],
            capture_output=True, text=True).stderr
    return float(out.split('(')[1].split(')')[0]) if '(' in out else None


def motion(path, samples=6):
    """How much the picture actually changes, 0 to 1: the largest RMSE between sampled frames.

    Duration, frame count and a clean loop seam all say nothing about whether anything moves. A
    still photo with a jittering overlay can carry 16 frames and three seconds and still read as a
    frozen image on screen, which is the one defect none of the other checks can see.
    """
    import tempfile

    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(['magick', str(path), '-coalesce', f'{tmp}/f-%03d.png'], capture_output=True)
        frames = sorted(pathlib.Path(tmp).glob('f-*.png'))
        if len(frames) < 2:
            return 0.0
        step = max(1, len(frames) // samples)
        picked = frames[::step]
        worst = 0.0
        for first, second in zip(picked, picked[1:]):
            out = subprocess.run(
                ['magick', 'compare', '-metric', 'RMSE', str(first), str(second), 'null:'],
                capture_output=True, text=True).stderr
            if '(' in out:
                worst = max(worst, float(out.split('(')[1].split(')')[0]))
        return worst
