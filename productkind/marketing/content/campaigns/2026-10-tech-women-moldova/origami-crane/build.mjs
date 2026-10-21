import { SIZE } from './crane.mjs'
import { creasePattern } from './creases.mjs'
import { backSvg, buildDesign, flatSvg, gradientSvg, inkSvg } from './design.mjs'
import { foldedSvg } from './folded-svg.mjs'

import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const design = buildDesign()
writeFileSync('debug/crane-flyer-text.svg', flatSvg(design))
// Outlined text so the flyer prints the same without Montserrat installed.
execFileSync('/Applications/Inkscape.app/Contents/MacOS/inkscape', [
  'debug/crane-flyer-text.svg',
  '--export-text-to-path',
  '--export-plain-svg',
  '--export-filename=crane-flyer.svg',
])
execFileSync('rsvg-convert', ['-w', '1000', '-o', 'debug/flyer.png', 'crane-flyer.svg'])
const creases = creasePattern()
writeFileSync('crane-flyer-back.svg', backSvg(creases))
execFileSync('rsvg-convert', ['-w', '1000', '-o', 'debug/flyer-back.png', 'crane-flyer-back.svg'])
execFileSync('rsvg-convert', [
  '-f',
  'pdf',
  '-o',
  'crane-flyer-10cm.pdf',
  'crane-flyer.svg',
  'crane-flyer-back.svg',
])

// Print-shop file: gradient with 2 mm bleed, the black artwork, then the back.
writeFileSync('debug/print-gradient.svg', gradientSvg(design))
writeFileSync('debug/print-ink-text.svg', inkSvg(design))
execFileSync('/Applications/Inkscape.app/Contents/MacOS/inkscape', [
  'debug/print-ink-text.svg',
  '--export-text-to-path',
  '--export-plain-svg',
  '--export-filename=debug/print-ink.svg',
])
execFileSync('rsvg-convert', [
  '-f',
  'pdf',
  '-o',
  'crane-flyer-print-layers.pdf',
  'debug/print-gradient.svg',
  'debug/print-ink.svg',
  'crane-flyer-back.svg',
])

const A4 = { w: 210, h: 297 }
const grid = { x: (A4.w - 2 * SIZE) / 2, y: 30 }
const flyer = readFileSync('crane-flyer.svg', 'utf8').replace(/<\?xml[^>]*>/, '')
const cells = [0, 1]
  .flatMap((row) => [0, 1].map((col) => [grid.x + col * SIZE, grid.y + row * SIZE]))
  .map(
    ([x, y]) =>
      `<svg x="${x}" y="${y}" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">${flyer.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')}</svg>`,
  )
const cuts = [0, 1, 2].flatMap((i) => {
  const x = grid.x + i * SIZE
  const y = grid.y + i * SIZE
  const top = grid.y
  const bottom = grid.y + 2 * SIZE
  const left = grid.x
  const right = grid.x + 2 * SIZE
  return [
    `<line x1="${x}" y1="${top - 8}" x2="${x}" y2="${top - 2}"/>`,
    `<line x1="${x}" y1="${bottom + 2}" x2="${x}" y2="${bottom + 8}"/>`,
    `<line x1="${Math.max(0, left - 8)}" y1="${y}" x2="${left - 1}" y2="${y}"/>`,
    `<line x1="${right + 1}" y1="${y}" x2="${Math.min(A4.w, right + 8)}" y2="${y}"/>`,
  ]
})
const sheet = `<svg xmlns="http://www.w3.org/2000/svg" width="${A4.w}mm" height="${A4.h}mm" viewBox="0 0 ${A4.w} ${A4.h}">
${cells.join('\n')}
<g stroke="#000" stroke-width="0.2">${cuts.join('')}</g>
<text x="${A4.w / 2}" y="${grid.y + 2 * SIZE + 18}" font-family="Montserrat" font-size="4" text-anchor="middle" fill="#55555c">Print at 100% (actual size), cut along the marks, then fold: LittleParrot.app</text>
</svg>`
writeFileSync('debug/crane-flyer-a4.svg', sheet)

// The back page mirrors the front page left to right, so each flyer's fold
// lines land behind it when printed double-sided and flipped on the long edge.
const back = readFileSync('crane-flyer-back.svg', 'utf8')
const backCells = [0, 1]
  .flatMap((row) => [0, 1].map((col) => [A4.w - grid.x - (col + 1) * SIZE, grid.y + row * SIZE]))
  .map(
    ([x, y]) =>
      `<svg x="${x}" y="${y}" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">${back.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')}</svg>`,
  )
const backSheet = `<svg xmlns="http://www.w3.org/2000/svg" width="${A4.w}mm" height="${A4.h}mm" viewBox="0 0 ${A4.w} ${A4.h}">
${backCells.join('\n')}
<text x="${A4.w / 2}" y="${grid.y + 2 * SIZE + 18}" font-family="Montserrat" font-size="4" text-anchor="middle" fill="#55555c">Back: fold lines. Print double-sided, flip on the long edge.</text>
</svg>`
writeFileSync('debug/crane-flyer-a4-back.svg', backSheet)
execFileSync('rsvg-convert', [
  '-f',
  'pdf',
  '-o',
  'crane-flyer-a4.pdf',
  'debug/crane-flyer-a4.svg',
  'debug/crane-flyer-a4-back.svg',
])
execFileSync('rsvg-convert', [
  '-w',
  '800',
  '-o',
  'debug/a4-back.png',
  'debug/crane-flyer-a4-back.svg',
])
execFileSync('rsvg-convert', ['-w', '800', '-o', 'debug/a4.png', 'debug/crane-flyer-a4.svg'])
for (const side of ['front', 'back']) {
  writeFileSync(
    `debug/final-${side}.svg`,
    foldedSvg({ facets: design.finalFacets, ...design, side, pixelsPerMm: 14 }),
  )
  execFileSync('rsvg-convert', ['-o', `debug/final-${side}.png`, `debug/final-${side}.svg`])
}
console.log('built', SIZE)
