import { simulate } from './crane.mjs'
import { centroid, foldedPolygon, isPrintedSideUp } from './origami.mjs'

import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const palette = {
  T1: '#e6194b',
  T2: '#3cb44b',
  T3: '#ffe119',
  T4: '#4363d8',
  T5: '#f58231',
  T6: '#911eb4',
  T7: '#46f0f0',
  T8: '#f032e6',
}

const renderState = (facets, { side = 'front' } = {}) => {
  const all = facets.flatMap(foldedPolygon)
  const xs = all.map((p) => p[0])
  const ys = all.map((p) => p[1])
  const pad = 8
  const minX = Math.min(...xs) - pad
  const minY = Math.min(...ys) - pad
  const w = Math.max(...xs) - Math.min(...xs) + 2 * pad
  const hgt = Math.max(...ys) - Math.min(...ys) + 2 * pad
  const ordered = [...facets].sort((a, b) => (side === 'front' ? a.z - b.z : b.z - a.z))
  const shapes = ordered
    .map((f) => {
      const poly = foldedPolygon(f)
      const pts = poly.map((p) => p.join(',')).join(' ')
      const printed = side === 'front' ? isPrintedSideUp(f) : !isPrintedSideUp(f)
      const fill = printed ? palette[f.src] : '#ffffff'
      const [cx, cy] = centroid(poly)
      return `<polygon points="${pts}" fill="${fill}" fill-opacity="0.85" stroke="#222" stroke-width="0.3"/>
<text x="${cx}" y="${cy}" font-size="2.2" text-anchor="middle" fill="#000">${f.src}${printed ? '' : "'"}·${f.z}</text>`
    })
    .join('\n')
  const flip = side === 'back' ? `transform="translate(${2 * minX + w},0) scale(-1,1)"` : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX} ${minY} ${w} ${hgt}" width="${w * 8}" height="${hgt * 8}">
<rect x="${minX}" y="${minY}" width="${w}" height="${hgt}" fill="#ddd"/>
<g ${flip}>${shapes}</g></svg>`
}

const { states, warnings } = simulate()
console.log(warnings.join('\n') || 'no warnings')
const only = process.argv[2]
states.forEach((state, index) => {
  if (only && !new RegExp(only).test(state.id)) return
  const name = `debug/${String(index).padStart(2, '0')}-${state.id}`
  for (const side of ['front', 'back']) {
    writeFileSync(`${name}-${side}.svg`, renderState(state.facets, { side }))
    execFileSync('rsvg-convert', ['-o', `${name}-${side}.png`, `${name}-${side}.svg`])
  }
  console.log(name, state.facets.length, 'facets')
})
