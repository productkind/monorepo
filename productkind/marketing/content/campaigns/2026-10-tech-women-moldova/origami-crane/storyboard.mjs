import { animationData } from './animation.mjs'

import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const lerp = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t)
const only = process.argv[2]

const frameSvg = (pieces, t, box) => {
  const ordered = pieces
    .map((p) => ({ p, m: lerp(p.a, p.b, t), z: t < 0.5 ? p.za : p.zb }))
    .sort((x, y) => x.z - y.z)
  const body = ordered
    .map(({ p, m }, i) => {
      const pts = []
      for (let k = 0; k < p.p.length; k += 2) pts.push(`${p.p[k]},${p.p[k + 1]}`)
      const det = m[0] * m[3] - m[1] * m[2]
      const fill =
        det > 0
          ? `fill="#000" fill-opacity="${((1 - Math.min(1, Math.abs(det))) * 0.5).toFixed(2)}"`
          : 'fill="#f3efe6"'
      const paper =
        det > 0 ? `<image href="paper.png" width="100" height="100" clip-path="url(#c${i})"/>` : ''
      return `<g transform="matrix(${m.join(' ')})"><clipPath id="c${i}"><polygon points="${pts.join(' ')}"/></clipPath>${paper}<polygon points="${pts.join(' ')}" ${fill} stroke="rgba(0,0,0,.3)" stroke-width="0.2"/></g>`
    })
    .join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box.join(' ')}" width="${process.env.PX ?? 260}" height="${process.env.PX ?? 260}"><rect x="${box[0]}" y="${box[1]}" width="${box[2]}" height="${box[3]}" fill="#17171b"/>${body}</svg>`
}

for (const step of animationData()) {
  if (only && step.id !== only) continue
  const box = [-75, -75, 150, 150]
  const files = []
  step.segments.forEach((pieces, s) =>
    (process.env.TS ? process.env.TS.split(',').map(Number) : [0.25, 0.45, 0.75, 1]).forEach(
      (t) => {
        const file = `debug/sb-${step.id}-${s}-${t}.svg`
        writeFileSync(file, frameSvg(pieces, t, box))
        execFileSync('rsvg-convert', ['-o', file.replace('.svg', '.png'), file])
        files.push(file.replace('.svg', '.png'))
      },
    ),
  )
  const rows = []
  for (let i = 0; i < files.length; i += 4) {
    const row = `debug/row-${step.id}-${i}.png`
    execFileSync('magick', [...files.slice(i, i + 4), '+append', row])
    rows.push(row)
  }
  execFileSync('magick', [...rows, '-append', `debug/storyboard-${step.id}.png`])
  console.log(step.id)
}
