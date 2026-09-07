#!/usr/bin/env python3
"""The desk's API: read the videos, search for gifs, apply a pick.

  python3 api/serve.py [--port 5274]

Stdlib only, and deliberately so: this is a local single-user tool, the engine it wraps is stdlib
too, and adding a framework would mean a venv story for something that has none today.

Nothing here decides anything about gifs. Searching, measuring, downloading and the fit rule all
come from the sourcing skill's engine, which is the same code the CLI scripts and the sourcing
agent use — so the desk cannot drift from them. Writing a definition is likewise delegated, to
`apply-visual` in the video package, where the definitions live and the tests for editing them are.
"""

import argparse
import importlib.util
import json
import mimetypes
import re
import subprocess
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse

DESK = Path(__file__).resolve().parent.parent
REPO = DESK.parent.parent
VIDEO_PACKAGE = REPO / 'productkind' / 'video-generator'
ENGINE = REPO / '.claude' / 'skills' / 'video-gifs' / 'scripts'

# The engine lives with the skill because the CLI scripts and the sourcing agent are its first
# callers. It belongs in a package of its own once the desk has to run outside this repo; until
# then, importing it here beats a second copy that drifts.
sys.path.insert(0, str(ENGINE))

from common import (assets_dir, candidates_dir, download_original, edge_colour,  # noqa: E402
                     fit_advice, gif_seconds, gif_size, loop_seam, motion, slots, strip)
from harvest import harvest, keep_moving  # noqa: E402


def _module(name, path):
    """used-ids.py cannot be imported by name, so load it by path."""
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


USED_IDS = _module('used_ids', ENGINE / 'used-ids.py')

SECTION_SPLIT = '    {\n'
# Four definitions are double-quoted throughout and the rest single-quoted, so both are read.
TEXT = re.compile(r'text: (["\'])(.*?)\1,\n')
SRC = re.compile(r'src: (["\'])([^"\']+)\1')
COLOUR = re.compile(r'color: (["\'])([^"\']+)\1')
RATE = re.compile(r'playbackRate: ([\d.]+)')
SEARCH_TERM = re.compile(r'// \w+ "([^"]*)"')


def definitions():
    folder = VIDEO_PACKAGE / 'src' / 'videos'
    return sorted(p for p in folder.glob('*.ts')
                  if p.name != 'index.ts' and not p.name.endswith('.test.ts')
                  and p.name != 'apply-visual.ts')


def parse_sections(path):
    """Each section of a definition as the desk needs it. Read-side twin of `apply-visual.ts`."""
    sections = []
    for block in path.read_text().split(SECTION_SPLIT)[1:]:
        src = SRC.search(block)
        text = TEXT.search(block)
        if not src or not text:
            continue
        colour = COLOUR.search(block)
        rate = RATE.search(block)
        term = SEARCH_TERM.search(block)
        sections.append({
            'index': len(sections),
            'text': text.group(2),
            'src': src.group(2),
            'color': colour.group(2) if colour else None,
            'playbackRate': float(rate.group(1)) if rate else None,
            'search': term.group(1) if term else None,
        })
    return sections


def flags_path(video):
    return assets_dir(video, None) / 'flags.json'


def read_flags(video):
    path = flags_path(video)
    if not path.exists():
        return {}
    try:
        return json.loads(path.read_text() or '{}')
    except ValueError:
        return {}


def video_slots(video):
    try:
        return slots(video, None)
    except (FileNotFoundError, SystemExit):
        return []


def video_summary(path):
    video = path.stem
    sections = parse_sections(path)
    flags = read_flags(video)
    return {
        'id': video,
        'sections': len(sections),
        'flagged': sum(1 for section in sections
                       if flags.get(str(section['index']), {}).get('src') == section['src']),
        'narrated': bool(video_slots(video)),
    }


def video_detail(video):
    path = VIDEO_PACKAGE / 'src' / 'videos' / f'{video}.ts'
    if not path.exists():
        return None
    sections = parse_sections(path)
    folder = assets_dir(video, None)
    fits = video_slots(video)
    flags = read_flags(video)

    for section in sections:
        gif = folder / section['src']
        slot = fits[section['index']] if section['index'] < len(fits) else None
        # Duration is one `identify` call, so the whole list stays fast. Motion, loop seam and
        # edge colour each need a full decode and are measured per section, on demand.
        seconds = gif_seconds(gif)[0] if gif.exists() else None
        section['slotSeconds'] = slot
        section['gifSeconds'] = seconds
        section['repeats'] = (
            slot / (seconds / (section['playbackRate'] or 1))
            if slot and seconds else None
        )
        section['flagged'] = flags.get(str(section['index']), {}).get('src') == section['src']
        section['exists'] = gif.exists()
    return {'id': video, 'narrated': bool(fits), 'sections': sections}


def measure_section(video, index):
    """The costly measurements for one section, taken when its panel is opened."""
    detail = video_detail(video)
    if detail is None or index >= len(detail['sections']):
        return None
    section = detail['sections'][index]
    gif = assets_dir(video, None) / section['src']
    if not gif.exists():
        return section
    background = edge_colour(gif)
    width, height = gif_size(gif)
    section['motion'] = motion(gif)
    section['seam'] = loop_seam(gif)
    section['edgeColour'] = background['colour'] if background else None
    section['edgeCoverage'] = background['coverage'] if background else None
    section['width'] = width
    section['height'] = height
    if section['slotSeconds'] and section['gifSeconds']:
        section['fit'] = fit_advice(section['gifSeconds'], section['slotSeconds'])
    return section


def run_search(payload):
    video = payload['video']
    index = int(payload['section'])
    terms = [term for term in payload.get('terms', []) if term.strip()]
    if not terms:
        return {'candidates': [], 'slot': None, 'error': 'No search terms.'}

    skip = payload.get('skip', [])
    show = int(payload.get('show', 12))
    provider = payload.get('provider', 'auto')
    slot, rows = harvest(video, index, terms, skip, int(payload.get('limit', 25)),
                         None, payload.get('slot'), provider)
    rows = keep_moving(rows, video, show)

    used = USED_IDS.used(prefix=video.rsplit('-', 1)[0])
    for row in rows:
        row['usedIn'] = used.get(row['id'], [])
        row['fit'] = fit_advice(row['seconds'], slot)
        row['gifUrl'] = f'/api/candidate/{video}/{row["id"]}.gif'
        row['stripUrl'] = f'/api/strip/{video}/{row["id"]}.png'
    return {'candidates': rows, 'slot': slot}


def run_pick(payload):
    video = payload['video']
    index = int(payload['section'])
    gif_id = payload['gifId']
    name = payload['name']
    folder = assets_dir(video, None)
    folder.mkdir(parents=True, exist_ok=True)
    target = folder / f'section-{index:02d}-{name}.gif'
    download_original(gif_id, target)

    seconds = gif_seconds(target)[0]
    fits = video_slots(video)
    slot = payload.get('slot') or (fits[index] if index < len(fits) else None)
    fit = fit_advice(seconds, slot) if slot else {'rate': None, 'why': 'not narrated yet'}
    background = edge_colour(target)

    command = ['npm', 'run', '--silent', 'apply-visual', '--',
               '--video', video, '--section', str(index), '--src', target.name,
               '--search', payload.get('search', 'unrecorded'),
               '--url', payload.get('url') or f'https://giphy.com/gifs/{gif_id}']
    if background:
        command += ['--color', background['colour']]
    if fit['rate']:
        command += ['--rate', str(fit['rate'])]
    written = subprocess.run(command, cwd=VIDEO_PACKAGE, capture_output=True, text=True)
    if written.returncode != 0:
        return {'error': written.stderr.strip() or written.stdout.strip()}

    return {'section': measure_section(video, index), 'applied': written.stdout.strip()}


def run_flag(payload):
    video = payload['video']
    index = str(int(payload['section']))
    flags = read_flags(video)
    if payload.get('flagged'):
        flags[index] = {'src': payload['src']}
    else:
        flags.pop(index, None)
    ordered = {key: flags[key] for key in sorted(flags, key=int)}
    flags_path(video).write_text(json.dumps(ordered, indent=2) + '\n')
    return {'flags': ordered}


class Desk(BaseHTTPRequestHandler):
    protocol_version = 'HTTP/1.1'

    def log_message(self, form, *args):  # quieter than the default one-line-per-asset
        if not self.path.startswith(('/api/candidate/', '/api/strip/', '/api/asset/')):
            sys.stderr.write(f'{self.command} {self.path}\n')

    def _json(self, payload, status=200):
        body = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _file(self, path):
        if not path.exists():
            self._json({'error': f'{path.name} not found'}, 404)
            return
        body = path.read_bytes()
        self.send_response(200)
        self.send_header('Content-Type', mimetypes.guess_type(path.name)[0] or 'application/octet-stream')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        route = unquote(urlparse(self.path).path)
        parts = [part for part in route.split('/') if part]

        if route == '/api/videos':
            self._json({'videos': [video_summary(path) for path in definitions()]})
            return
        if len(parts) == 3 and parts[:2] == ['api', 'videos']:
            detail = video_detail(parts[2])
            self._json(detail if detail else {'error': 'no such video'}, 200 if detail else 404)
            return
        if len(parts) == 5 and parts[1] == 'section' and parts[3] == 'measure':
            measured = measure_section(parts[2], int(parts[4]))
            self._json({'section': measured} if measured else {'error': 'no such section'})
            return
        if len(parts) == 4 and parts[1] == 'asset':
            self._file(assets_dir(parts[2], None) / parts[3])
            return
        if len(parts) == 4 and parts[1] == 'candidate':
            self._file(candidates_dir(parts[2]) / parts[3])
            return
        if len(parts) == 4 and parts[1] == 'strip':
            gif_id = parts[3].removesuffix('.png')
            cache = candidates_dir(parts[2])
            out = cache / f'{gif_id}-strip.png'
            if not out.exists() and (cache / f'{gif_id}.gif').exists():
                strip(cache / f'{gif_id}.gif', out)
            self._file(out)
            return
        self._json({'error': f'no route for {route}'}, 404)

    def do_POST(self):
        route = urlparse(self.path).path
        length = int(self.headers.get('Content-Length') or 0)
        try:
            payload = json.loads(self.rfile.read(length) or b'{}')
        except ValueError:
            self._json({'error': 'body was not json'}, 400)
            return

        actions = {'/api/search': run_search, '/api/pick': run_pick, '/api/flag': run_flag}
        action = actions.get(route)
        if action is None:
            self._json({'error': f'no route for {route}'}, 404)
            return
        try:
            self._json(action(payload))
        except Exception as error:  # a failed search must not take the desk down
            self._json({'error': f'{type(error).__name__}: {error}'}, 500)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=5274)
    args = parser.parse_args()
    print(f'desk api on http://127.0.0.1:{args.port}  (videos from {VIDEO_PACKAGE})')
    ThreadingHTTPServer(('127.0.0.1', args.port), Desk).serve_forever()


if __name__ == '__main__':
    main()
