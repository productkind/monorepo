import { animationData } from './animation.mjs'
import { geometry } from './crane.mjs'
import { creasePattern } from './creases.mjs'
import { backDesign, buildDesign, flatSvg } from './design.mjs'

import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const design = buildDesign()
writeFileSync('debug/paper.svg', flatSvg(design, { rotate: 0 }))
execFileSync('rsvg-convert', ['-w', '1200', '-o', 'debug/paper.png', 'debug/paper.svg'])
execFileSync('magick', ['debug/paper.png', '-quality', '88', 'debug/paper.webp'])
const paper = `data:image/webp;base64,${readFileSync('debug/paper.webp').toString('base64')}`
writeFileSync(
  'debug/paper-back.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">${backDesign(creasePattern())}</svg>`,
)
execFileSync('rsvg-convert', ['-w', '1200', '-o', 'debug/paper-back.png', 'debug/paper-back.svg'])
execFileSync('magick', ['debug/paper-back.png', '-quality', '88', 'debug/paper-back.webp'])
const paperBack = `data:image/webp;base64,${readFileSync('debug/paper-back.webp').toString('base64')}`

const headZoom = (() => {
  const xs = [geometry.headTip[0], geometry.neckTip[0]]
  const ys = [geometry.headTip[1], geometry.neckTip[1]]
  const pad = 12
  return [
    Math.min(...xs) - pad,
    Math.min(...ys) - pad,
    Math.max(...xs) + pad,
    Math.max(...ys) + pad + 8,
  ]
})()

const copy = {
  'book-folds': {
    title: 'Crease it in half both ways',
    body: 'Start with the colourful side face down, so you see the dashed fold lines. Fold the sheet in half edge to edge and unfold it. Then fold it in half the other way and unfold it again.',
  },
  diagonals: {
    title: 'Crease the diagonals',
    body: 'Turn the sheet over so the colours face you. Fold it in half corner to corner and unfold, then do the same with the other two corners.',
  },
  collapse: {
    title: 'Collapse it into a small square',
    body: 'Push the centre down gently and bring all four corners together at the bottom. The creases do most of the work. Flatten it with the colours on the outside and the loose corners pointing down. <strong>The corner on top should be a plain one, with no eye and no writing.</strong> If it isn’t, swing one flap across like turning a page.',
  },
  kite: {
    title: 'Make three guide creases',
    body: 'Fold the lower edges of the top layer in to the centre line. Fold the small triangle at the top down over them. Crease firmly, then unfold all three.',
  },
  petal: {
    title: 'Lift the top layer up',
    body: 'Lift the bottom corner of the top layer and fold it up along the crease you made under the triangle. The sides fold inwards along the other two creases. Flatten it into a long diamond.',
  },
  repeat: {
    title: 'Repeat on the back',
    body: 'Turn it over and repeat the last two steps on this side. The two loose points at the bottom become the neck and the tail.',
  },
  'neck-tail': {
    title: 'Fold up the neck and the tail',
    body: 'Look at the two bottom points: the one with the eye on it is the neck. Inside reverse fold each point up between the wings: open its layers a little, push the point up inside along a slanted crease, then flatten it.',
  },
  head: {
    title: 'Fold the head',
    body: 'Inside reverse fold the tip of the neck down, about 1.5 cm from the end, just above the eye.',
    zoom: headZoom,
  },
  wings: {
    title: 'Fold the wings down',
    body: 'Fold the front wing down along its base, where it meets the body, then fold the back wing down the same way. Hold the base of the neck and the tail and pull gently to spread the wings. One side winks, the other one is looking at you. Lift the wing on that side to find an arrow pointing to the QR code on top.',
  },
}

const data = animationData().map((step) => ({ ...step, ...copy[step.id] }))

const stepsHtml = data
  .map(
    (step, index) => `<li class="step" id="step-${step.id}">
  <div class="stage" data-step="${index}" role="img" aria-label="Animation of step ${index + 1}: ${step.title}"></div>
  <div class="text">
    <p class="number">Step ${index + 1}</p>
    <h3>${step.title}</h3>
    <p>${step.body}</p>
    <button type="button" class="toggle" data-step="${index}" aria-pressed="false">Pause</button>
  </div>
</li>`,
  )
  .join('\n')

const html = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Fold your Little Parrot</title>
<meta name="description" content="How to fold the Little Parrot flyer into an origami parrot, step by step.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
  :root {
    --ink: #0b0b0d;
    --muted: #55555c;
    --page: #faf8f3;
    --stage: #17171b;
    --gradient: linear-gradient(120deg, #eb9600, #f1c000, #fbfb00, #aeff37, #00ed70);
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--page);
    color: var(--ink);
    font: 400 17px/1.6 Montserrat, system-ui, sans-serif;
  }
  main { max-width: 1040px; margin: 0 auto; padding: 48px 24px 64px; }
  .brand { font: 700 14px/1 'Space Mono', monospace; letter-spacing: 0.04em; margin: 0 0 32px; }
  .brand a { color: inherit; text-decoration: none; }
  h1 { font-size: clamp(36px, 6vw, 56px); line-height: 1.05; font-weight: 800; margin: 0 0 16px; }
  h1 span { background: var(--gradient); padding: 0 8px; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
  .lead { font-size: 19px; max-width: 60ch; margin: 0 0 32px; }
  .hero { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 0 0 48px; }
  .hero figure { margin: 0; }
  .hero .stage { aspect-ratio: 4 / 3; }
  .hero figcaption { font-size: 14px; color: var(--muted); margin-top: 8px; }
  .tips { background: #fff; border: 1px solid #e6e1d6; border-radius: 16px; padding: 24px; margin: 0 0 48px; }
  .tips h2 { font-size: 20px; margin: 0 0 8px; }
  .tips ul { margin: 0; padding-left: 20px; }
  .tips li + li { margin-top: 8px; }
  h2.steps-title { font-size: 28px; margin: 0 0 24px; }
  ol.steps { list-style: none; margin: 0; padding: 0; display: grid; gap: 32px; }
  .step { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 32px; align-items: center; }
  .stage { background: var(--stage); border-radius: 16px; aspect-ratio: 1 / 1; overflow: hidden; }
  .stage svg { width: 100%; height: 100%; display: block; }
  .number { font: 700 13px/1 'Space Mono', monospace; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin: 0 0 8px; }
  .step h3 { font-size: 24px; line-height: 1.2; margin: 0 0 12px; }
  .step p { margin: 0 0 16px; max-width: 60ch; }
  .toggle {
    font: 600 14px/1 Montserrat, sans-serif;
    padding: 10px 16px;
    border-radius: 999px;
    border: 2px solid var(--ink);
    background: transparent;
    color: var(--ink);
    cursor: pointer;
  }
  .toggle:hover { background: var(--ink); color: var(--page); }
  .toggle:focus-visible { outline: 3px solid #f1c000; outline-offset: 2px; }
  footer { margin-top: 64px; padding-top: 24px; border-top: 1px solid #e6e1d6; }
  footer a { color: var(--ink); font-weight: 700; }
  @media (max-width: 760px) {
    main { padding-top: 32px; }
    .hero { grid-template-columns: 1fr; }
    .step { grid-template-columns: 1fr; gap: 16px; }
  }
</style>
</head>
<body>
<main>
  <p class="brand"><a href="https://littleparrot.app">LittleParrot.app</a></p>
  <h1>Fold your <span>Little Parrot</span></h1>
  <p class="lead">Your flyer is a 10 cm square, and with the folds below it becomes a parrot: orange head, green tail, an eye on one side and a wink on the other. Every step has an animation that loops, so you can watch it as many times as you need.</p>

  <div class="hero">
    <figure>
      <div class="stage" data-final="front" role="img" aria-label="The finished parrot, side with the open eye and the LittleParrot.app tail"></div>
      <figcaption>This side looks at you.</figcaption>
    </figure>
    <figure>
      <div class="stage" data-final="back" role="img" aria-label="The finished parrot, side with the wink"></div>
      <figcaption>This side winks.</figcaption>
    </figure>
  </div>

  <section class="tips" aria-labelledby="tips-title">
    <h2 id="tips-title">Before you start</h2>
    <ul>
      <li>Work on a hard, flat table and run a fingernail along every crease. Sharp creases make the later steps much easier.</li>
      <li>The <strong>inside reverse fold</strong> in steps 7 and 8 is the trickiest part. Pre-crease the line first by folding the point over both ways, then open the layers and push the point in along that crease.</li>
      <li>If a step goes wrong, unfold it and try again. The creases you already made are still there to guide you.</li>
    </ul>
  </section>

  <h2 class="steps-title">How to fold it</h2>
  <ol class="steps">
${stepsHtml}
  </ol>

  <footer>
    <p>Folded it? Learn to build your own ideas with AI on <a href="https://littleparrot.app">LittleParrot.app</a>.</p>
  </footer>
</main>

<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <image id="paper" href="${paper}" x="0" y="0" width="100" height="100" preserveAspectRatio="none"/>
    <image id="paper-back" href="${paperBack}" x="0" y="0" width="100" height="100" preserveAspectRatio="none"/>
  </defs>
</svg>

<script>
const STEPS = ${JSON.stringify(data.map(({ segments, zoom }) => ({ segments, zoom })))};
${readFileSync('player.js', 'utf8')}
</script>
</body>
</html>
`

writeFileSync('fold.html', html)
console.log('fold.html', Math.round(html.length / 1024), 'KB')
