import { animationData } from './animation.mjs'
import { campaign } from './campaign.mjs'
import { geometry } from './crane.mjs'
import { creasePattern } from './creases.mjs'
import { backDesign, buildDesign, flatSvg } from './design.mjs'

import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const design = buildDesign()
writeFileSync('debug/paper.svg', flatSvg(design, { rotate: 0 }))
execFileSync('rsvg-convert', ['-w', '1200', '-o', 'debug/paper.png', 'debug/paper.svg'])
execFileSync('magick', ['debug/paper.png', '-quality', '88', 'debug/paper.webp'])
const logo = `data:image/svg+xml;base64,${readFileSync('logo-little-parrot.svg').toString('base64')}`
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
  <div class="stage-wrap">
    <div class="stage" data-step="${index}" role="img" aria-label="Animation of step ${index + 1}: ${step.title}"></div>
    <button type="button" class="toggle" data-step="${index}" aria-pressed="false">Pause</button>
  </div>
  <div class="text">
    <p class="number">Step ${index + 1}</p>
    <h3>${step.title}</h3>
    <p>${step.body}</p>
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
<link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
  /* Little Parrot design system (little-parrot-awakens/src/styles.css). */
  :root {
    --foreground: hsl(245 7% 3%);
    --muted-foreground: hsl(245 3% 42%);
    --gray-900: hsl(245 4% 9%);
    --orange-200: hsl(33 100% 68%);
    --footer: #1a0044;
    --brand-gradient: linear-gradient(120deg, #ffb65b, #fdd825, #fbfb00, #8efd23, #00ed70);
    --brand-gradient-bg: linear-gradient(120deg, #ffb65b20, #fdd82520, #fbfb0020, #8efd2320, #00ed7020);
    --shadow-rect: 0.25rem 0.25rem 0.125rem rgba(8 8 9 / 0.25);
    --shadow-rect-light: 0.25rem 0.25rem 0.125rem rgba(8 8 9 / 0.125);
    --shadow-rect-hover: 0.25rem 0.25rem 0.125rem rgba(8 8 9 / 0.125);
    --shadow-rect-active: 0.125rem 0.125rem 0.125rem rgba(8 8 9 / 0.125);
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
  body {
    margin: 0;
    background: #fff;
    color: var(--foreground);
    font: 400 17px/1.625 Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  h1, h2, h3 { font-family: 'Space Mono', monospace; font-weight: 700; }
  .container { max-width: 1100px; margin-inline: auto; padding-inline: 16px; }
  .navbar { position: sticky; top: 0; z-index: 10; background: #fff; border-bottom: 2px solid var(--foreground); box-shadow: var(--shadow-rect-light); }
  .navbar a { display: inline-block; transition: opacity 0.15s; }
  .navbar a:hover { opacity: 0.8; }
  .navbar img { display: block; height: 48px; width: auto; margin: 16px 0; }
  .hero { padding: 48px 0 56px; }
  h1 { font-size: clamp(36px, 6vw, 64px); line-height: 1.1; margin: 0 0 24px; }
  .highlight {
    background: var(--brand-gradient) center / 100% 0.9em no-repeat;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }
  .lead { font-size: 20px; max-width: 62ch; margin: 0 0 40px; }
  .finished { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .finished figure { margin: 0; }
  .finished .stage { aspect-ratio: 4 / 3; }
  .finished figcaption { font-size: 14px; color: var(--muted-foreground); margin-top: 12px; }
  .band { background: var(--brand-gradient-bg); padding: 48px 0; }
  .card { background: #fff; border: 2px solid var(--foreground); box-shadow: var(--shadow-rect); }
  .tips { padding: 24px 28px; }
  .tips h2 { font-size: 22px; margin: 0 0 12px; }
  .tips ul { margin: 0; padding-left: 20px; }
  .tips li + li { margin-top: 8px; }
  .how { padding: 56px 0 72px; }
  .how > .container > h2 { font-size: clamp(28px, 4vw, 40px); margin: 0 0 32px; }
  ol.steps { list-style: none; margin: 0; padding: 0; display: grid; gap: 40px; }
  .step { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 40px; align-items: center; }
  .stage { background: var(--gray-900); border: 2px solid var(--foreground); box-shadow: var(--shadow-rect); aspect-ratio: 1 / 1; overflow: hidden; }
  .stage svg { width: 100%; height: 100%; display: block; }
  /* The play/pause button sits on the animation's bottom-right corner. */
  .stage-wrap { position: relative; }
  .stage-wrap .toggle { position: absolute; right: 12px; bottom: 12px; }
  .number { font: 700 13px/1 'Space Mono', monospace; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted-foreground); margin: 0 0 10px; }
  .step h3 { font-size: 24px; line-height: 1.25; margin: 0 0 12px; }
  .step p { margin: 0 0 20px; max-width: 60ch; }
  .toggle {
    font: 700 14px/1 Inter, sans-serif;
    height: 40px;
    padding: 0 16px;
    border: 2px solid var(--foreground);
    border-radius: 0;
    background: var(--brand-gradient);
    color: var(--foreground);
    box-shadow: var(--shadow-rect);
    cursor: pointer;
    transition: all 75ms;
  }
  .toggle:hover { filter: brightness(0.95); box-shadow: var(--shadow-rect-hover); }
  .toggle:active { box-shadow: var(--shadow-rect-active); transform: translate(2px, 2px); }
  .toggle:focus-visible, .navbar a:focus-visible, footer a:focus-visible { outline: 2px solid transparent; box-shadow: 0 0 0 2px #fff, 0 0 0 4px var(--orange-200); }
  footer { background: var(--footer); color: #fff; border-top: 2px solid var(--foreground); padding: 48px 0; text-align: center; }
  footer p { margin: 0; font-size: 18px; }
  footer a { color: #fff; font-weight: 700; text-underline-offset: 4px; }
  .eyebrow { font: 700 13px/1.4 'Space Mono', monospace; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted-foreground); margin: 0 0 16px; }
  .hero-grid { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 48px; align-items: center; }
  .hero-parrot { margin: 0; }
  .hero-parrot .stage { aspect-ratio: 4 / 3; }
  .section { padding: 56px 0; }
  .section h2 { font-size: clamp(26px, 3.6vw, 36px); line-height: 1.2; margin: 0 0 24px; }
  .narrow > * { max-width: 760px; }
  .entry { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
  .entry .card { padding: 24px; }
  .entry h3 { font-size: 20px; line-height: 1.3; margin: 0 0 8px; }
  .entry p:last-child { margin: 0; }
  .entry a, .note a, .section p a { color: var(--foreground); font-weight: 700; text-underline-offset: 3px; }
  .ticks { margin: 0; padding-left: 22px; }
  .ticks li + li { margin-top: 8px; }
  .post { padding: 24px; }
  .post-text { white-space: pre-line; margin: 0 0 20px; font-size: 18px; }
  .note { font-size: 15px; color: var(--muted-foreground); margin: 16px 0 0; }
  .discount { display: flex; flex-wrap: wrap; gap: 16px; align-items: center; margin-top: 8px; }
  .code { display: inline-flex; align-items: center; gap: 12px; padding: 6px 6px 6px 16px; font: 700 18px/1 'Space Mono', monospace; }
  .button {
    display: inline-flex; align-items: center; justify-content: center;
    font: 700 15px/1 Inter, sans-serif; height: 44px; padding: 0 20px;
    border: 2px solid var(--foreground); border-radius: 0;
    background: var(--brand-gradient); color: var(--foreground); text-decoration: none;
    box-shadow: var(--shadow-rect); cursor: pointer; transition: all 75ms;
  }
  .button.outline { background: #fff; height: 36px; font-size: 14px; }
  .button:hover { filter: brightness(0.95); box-shadow: var(--shadow-rect-hover); }
  .button:active { box-shadow: var(--shadow-rect-active); transform: translate(2px, 2px); }
  .button:focus-visible { outline: 2px solid transparent; box-shadow: 0 0 0 2px #fff, 0 0 0 4px var(--orange-200); }
  #fold .finished { margin-bottom: 32px; }
  #fold .tips { margin-bottom: 48px; }
  #fold .tips h3 { font-size: 22px; margin: 0 0 12px; }
  @media (max-width: 760px) {
    .hero-grid, .entry { grid-template-columns: 1fr; }
    .hero { padding-top: 32px; }
    .finished { grid-template-columns: 1fr; }
    .step { grid-template-columns: 1fr; gap: 20px; }
  }
</style>
</head>
<body>
<header class="navbar">
  <div class="container">
    <a href="https://littleparrot.app" aria-label="Little Parrot home"><img src="${logo}" alt="Little Parrot"></a>
  </div>
</header>

<main>
  <section class="hero">
    <div class="container hero-grid">
      <div>
        <p class="eyebrow">Tech Women Summit Moldova · 24 October 2026</p>
        <h1>Fold your <span class="highlight">Little Parrot</span>, and win!</h1>
        <p class="lead">${campaign.lead}</p>
        <a class="button" href="#enter">How to enter</a>
      </div>
      <figure class="hero-parrot">
        <div class="stage" data-final="front" role="img" aria-label="The finished parrot, side with the open eye and the LittleParrot.app tail"></div>
      </figure>
    </div>
  </section>

  <section class="section band" id="enter" aria-labelledby="enter-title">
    <div class="container">
      <h2 id="enter-title">How to enter</h2>
      <ol class="entry">
${campaign.entry.map(({ title, body }, i) => `        <li class="card"><p class="number">${i + 1}</p><h3>${title}</h3><p>${body}</p></li>`).join('\n')}
      </ol>
    </div>
  </section>

  <section class="section" aria-labelledby="prize-title">
    <div class="container narrow">
      <h2 id="prize-title">${campaign.prize.title}</h2>
      <p>${campaign.prize.intro}</p>
      <ul class="ticks">
${campaign.prize.items.map((item) => `        <li>${item}</li>`).join('\n')}
      </ul>
    </div>
  </section>

  <section class="section band" aria-labelledby="post-title">
    <div class="container narrow">
      <h2 id="post-title">${campaign.post.title}</h2>
      <div class="card post">
        <p id="post-text" class="post-text">${campaign.post.text}</p>
        <button type="button" class="button" data-copy="post-text">Copy the post</button>
      </div>
      <p class="note">${campaign.post.note}</p>
    </div>
  </section>

  <section class="section" aria-labelledby="discount-title">
    <div class="container narrow">
      <h2 id="discount-title">${campaign.discount.title}</h2>
      <p>${campaign.discount.body}</p>
      <div class="discount">
        <a class="button" href="${campaign.discount.url}">${campaign.discount.cta}</a>
        <span class="code card"><span id="coupon">${campaign.discount.code}</span><button type="button" class="button outline" data-copy="coupon">Copy code</button></span>
      </div>
    </div>
  </section>

  <section class="section band" aria-labelledby="why-title">
    <div class="container narrow">
      <h2 id="why-title">${campaign.why.title}</h2>
      <p>${campaign.why.body}</p>
    </div>
  </section>

  <section class="section" id="fold" aria-labelledby="how-title">
    <div class="container">
      <h2 id="how-title">How to fold it</h2>
      <div class="finished">
        <figure>
          <div class="stage" data-final="front" role="img" aria-label="The finished parrot, side with the open eye and the LittleParrot.app tail"></div>
          <figcaption>This side looks at you.</figcaption>
        </figure>
        <figure>
          <div class="stage" data-final="back" role="img" aria-label="The finished parrot, side with the wink"></div>
          <figcaption>This side winks.</figcaption>
        </figure>
      </div>
      <div class="card tips">
        <h3 id="tips-title">Before you start</h3>
        <ul>
          <li>Work on a hard, flat table and run a fingernail along every crease. Sharp creases make the later steps much easier.</li>
          <li>The <strong>inside reverse fold</strong> in steps 7 and 8 is the trickiest part. Pre-crease the line first by folding the point over both ways, then open the layers and push the point in along that crease.</li>
          <li>If a step goes wrong, unfold it and try again. The creases you already made are still there to guide you.</li>
        </ul>
      </div>
      <ol class="steps">
${stepsHtml}
      </ol>
    </div>
  </section>
</main>

<footer>
  <div class="container">
    <p>Folded it? Learn to build your own ideas with AI on <a href="https://littleparrot.app">LittleParrot.app</a>.</p>
  </div>
</footer>

<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <image id="paper" href="${paper}" x="0" y="0" width="100" height="100" preserveAspectRatio="none"/>
    <image id="paper-back" href="${paperBack}" x="0" y="0" width="100" height="100" preserveAspectRatio="none"/>
  </defs>
</svg>

<script>
const STEPS = ${JSON.stringify(data.map(({ segments, zoom }) => ({ segments, zoom })))};
${readFileSync('player.js', 'utf8')}
document.querySelectorAll('[data-copy]').forEach((button) => {
  const label = button.textContent
  button.addEventListener('click', async () => {
    await navigator.clipboard.writeText(document.getElementById(button.dataset.copy).innerText.trim())
    button.textContent = 'Copied'
    setTimeout(() => { button.textContent = label }, 2000)
  })
})
</script>
</body>
</html>
`

writeFileSync('fold.html', html)
console.log('fold.html', Math.round(html.length / 1024), 'KB')
