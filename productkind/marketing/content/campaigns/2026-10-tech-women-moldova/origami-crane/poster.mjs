import { buildDesign, qrModules } from './design.mjs'
import { flyerConfig } from './flyer.config.mjs'
import { foldedSvg } from './folded-svg.mjs'

import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const FONTS = `${process.env.HOME}/Library/Fonts`

const design = buildDesign()
const parrot = foldedSvg({ facets: design.finalFacets, ...design, side: 'front', background: null })
  .replace(/ width="\d+" height="\d+"/, '')
  .replace('stroke="#00000055"', 'stroke="#00000040"')

const modules = qrModules(flyerConfig.qrUrl)
const quiet = 2
const size = modules.length + quiet * 2
const qr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges"><rect width="${size}" height="${size}" fill="#fff"/><g fill="#080809">${modules
  .flatMap((row, y) =>
    row.map((dark, x) =>
      dark ? `<rect x="${x + quiet}" y="${y + quiet}" width="1" height="1"/>` : '',
    ),
  )
  .join('')}</g></svg>`

const logo = `data:image/svg+xml;base64,${readFileSync('logo-little-parrot.svg').toString('base64')}`

const steps = [
  ['Fold your flyer into a parrot.', 'Scan the QR code for an animation of every step.'],
  ['Post a public photo of it on LinkedIn by 15:00 on 24 October', 'and tag @Little Parrot.'],
  [
    'This enters you into the raffle',
    'for one of three free places on our learning journey, Launch Your App Idea with Lovable.',
  ],
]

const html = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<title>Fold your Little Parrot, and win!</title>
<style>
  @font-face { font-family: 'Inter'; src: url('file://${FONTS}/Inter-VariableFont_opsz,wght.ttf'); font-weight: 100 900; }
  @font-face { font-family: 'Space Mono'; src: url('file://${FONTS}/SpaceMono-Bold.ttf'); font-weight: 700; }
  @page { size: A4; margin: 0; }
  :root {
    --foreground: #080809;
    --muted-foreground: hsl(245 3% 42%);
    --brand-gradient: linear-gradient(120deg, #ffb65b, #fdd825, #fbfb00, #8efd23, #00ed70);
    --brand-gradient-bg: linear-gradient(120deg, #ffb65b20, #fdd82520, #fbfb0020, #8efd2320, #00ed7020);
    --shadow-rect: 1.2mm 1.2mm 0.6mm rgba(8 8 9 / 0.25);
  }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  html, body { margin: 0; }
  body { width: 210mm; height: 297mm; font-family: Inter, sans-serif; color: var(--foreground); background: #fff; overflow: hidden; }
  .page { position: relative; height: 297mm; padding: 14mm 16mm 12mm; display: flex; flex-direction: column; background: var(--brand-gradient-bg); }
  .logo { height: 15mm; width: auto; align-self: flex-start; }
  .eyebrow { font: 700 10pt/1.4 'Space Mono', monospace; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted-foreground); margin: 7mm 0 3mm; }
  h1 { font: 700 30pt/1.12 'Space Mono', monospace; margin: 0 0 9mm; }
  .highlight { background: var(--brand-gradient) center / 100% 0.9em no-repeat; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
  .parrot { min-height: 0; height: 100%; display: flex; align-items: flex-end; justify-content: center; }
  .parrot svg { height: 100%; max-width: 100%; filter: drop-shadow(1.2mm 1.2mm 0.6mm rgba(8 8 9 / 0.25)); }
  .bottom { flex: 1; min-height: 0; display: grid; grid-template-columns: 1fr 56mm; gap: 10mm; align-items: end; margin-top: 7mm; }
  ol { list-style: none; margin: 0; padding: 0; display: grid; gap: 7mm; }
  li { display: grid; grid-template-columns: 18mm 1fr; gap: 6mm; align-items: start; font-size: 25pt; line-height: 1.22; }
  .n { width: 18mm; height: 18mm; display: grid; place-items: center; font: 700 26pt/1 'Space Mono', monospace; background: var(--brand-gradient); border: 0.5mm solid var(--foreground); box-shadow: var(--shadow-rect); }
  li strong { font-weight: 800; }
  .qr { background: #fff; border: 0.5mm solid var(--foreground); box-shadow: var(--shadow-rect); padding: 4mm 4mm 3mm; text-align: center; }
  .qr svg { width: 100%; display: block; }
  .qr p { margin: 2mm 0 0; font-size: 11pt; line-height: 1.35; }
  .footer { margin-top: 8mm; padding-top: 4mm; border-top: 0.5mm solid var(--foreground); display: flex; justify-content: space-between; font-size: 10pt; color: var(--muted-foreground); }
  .footer { gap: 6mm; align-items: flex-end; }
  .footer b { font-family: 'Space Mono', monospace; color: var(--foreground); white-space: nowrap; }
</style>
</head>
<body>
<div class="page">
  <img class="logo" src="${logo}" alt="Little Parrot">
  <p class="eyebrow">Tech Women Summit Moldova · 24 October 2026</p>
  <h1>Fold your <span class="highlight">Little Parrot</span>, and win!</h1>
  <ol>
${steps.map(([lead, rest], i) => `    <li><span class="n">${i + 1}</span><span><strong>${lead}</strong> ${rest}</span></li>`).join('\n')}
  </ol>
  <div class="bottom">
    <div class="parrot">${parrot}</div>
    <div class="qr">${qr}<p>Folding steps, a post to copy and 70% off if you don’t win</p></div>
  </div>
  <div class="footer"><span>We’ll announce the three winners in the last hour of the conference.</span><b>littleparrot.app/tech-women-moldova</b></div>
</div>
</body>
</html>
`

writeFileSync('debug/poster.html', html)
execFileSync(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--allow-file-access-from-files',
    '--virtual-time-budget=3000',
    `--print-to-pdf=${process.cwd()}/debug/poster-chrome.pdf`,
    `file://${process.cwd()}/debug/poster.html`,
  ],
  { stdio: 'ignore' },
)
// Chrome embeds the variable Inter font as Type 3 glyphs, which some print
// shops' systems handle poorly, so every letter is outlined instead.
execFileSync('/Applications/Inkscape.app/Contents/MacOS/inkscape', [
  'debug/poster-chrome.pdf',
  '--pdf-poppler',
  '--export-text-to-path',
  '--export-filename=crane-poster-a4.pdf',
])
console.log('crane-poster-a4.pdf')
