"""Assemble each *.body into an SVG with the shared defs, then export a PNG with headless Chrome."""
import glob, subprocess, sys, html, os
OUT = '/Users/kingamagyar/Documents/productkind/little-parrot-awakens/public/guides/get-your-website-to-show-up-on-google'
os.makedirs(OUT, exist_ok=True)
defs = open('_defs.svgpart').read()
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
for body in sorted(glob.glob('*.body')) if len(sys.argv) < 2 else sys.argv[1:]:
    name = body[:-5]
    head, content = open(body).read().split('---\n', 1)
    meta = dict(l.split('=', 1) for l in head.strip().splitlines() if '=' in l and not l.startswith('W='))
    w, h = [int(x.split('=')[1]) for x in head.splitlines()[0].split()]
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-labelledby="t d">
  <title id="t">{html.escape(meta['TITLE'])}</title>
  <desc id="d">{html.escape(meta['DESC'])}</desc>
{defs}
  <rect width="{w}" height="{h}" fill="#fbfaf7"/>
  <rect x="0" y="0" width="{w}" height="14" fill="url(#brand-gradient)"/>
{content}</svg>
'''
    page = f'/tmp/{name}.html'
    open(page, 'w').write(f'<html><body style="margin:0">{svg}</body></html>')
    subprocess.run([CHROME, '--headless', '--disable-gpu', '--hide-scrollbars', f'--window-size={w},{h}', f'--screenshot={OUT}/{name}.png', f'file://{page}'], check=True, capture_output=True)
    subprocess.run(['magick', f'{OUT}/{name}.png', '-alpha', 'off', f'{OUT}/{name}.png'], check=True)
    print('rendered', name)
