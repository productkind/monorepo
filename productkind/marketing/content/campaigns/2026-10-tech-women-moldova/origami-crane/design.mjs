import { geometry, simulate, SIZE } from './crane.mjs'
import { flyerConfig } from './flyer.config.mjs'
import {
  apply,
  bottomFacetAt,
  containsPoint,
  foldedPolygon,
  invert,
  isPrintedSideUp,
  topFacetAt,
} from './origami.mjs'

import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const GRADIENT = [
  [0.05, '#eb9600'],
  [0.3, '#f1c000'],
  [0.5, '#fbfb00'],
  [0.7, '#aeff37'],
  [0.95, '#00ed70'],
]
const INK = '#0b0b0d'

const format = (n) => Number(n.toFixed(3))
const matrix = (m) => `matrix(${m.map(format).join(' ')})`
const points = (poly) => poly.map((p) => p.map(format).join(',')).join(' ')

const toFolded = { front: ([x, y]) => [x, y], back: ([x, y]) => [-x, y] }
const viewMatrix = { front: [1, 0, 0, 1, 0, 0], back: [-1, 0, 0, 1, 0, 0] }

const visibleFacetAt = (facets, side, point) =>
  side === 'front' ? topFacetAt(facets, point) : bottomFacetAt(facets, point)

const decal = ({ facets, side, samples, step, body, id, on }) => {
  const cells = new Map()
  for (const sample of samples) {
    const f = visibleFacetAt(facets, side, toFolded[side](sample))
    if (!f || !on.includes(f.src)) continue
    if (!cells.has(f)) cells.set(f, [])
    cells.get(f).push(sample)
  }
  const half = step * 0.52
  return [...cells.entries()]
    .map(([f, visible], index) => {
      const printedOutside = side === 'front' ? isPrintedSideUp(f) : !isPrintedSideUp(f)
      if (!printedOutside) {
        console.warn(`${id}: ${visible.length} cells on unprinted ${f.src}`, visible.slice(0, 3))
        return ''
      }
      const clip = `${id}-${index}`
      const sheetFromView = [invert(f.m), viewMatrix[side]].reduce((acc, m) => [
        acc[0] * m[0] + acc[2] * m[1],
        acc[1] * m[0] + acc[3] * m[1],
        acc[0] * m[2] + acc[2] * m[3],
        acc[1] * m[2] + acc[3] * m[3],
        acc[0] * m[4] + acc[2] * m[5] + acc[4],
        acc[1] * m[4] + acc[3] * m[5] + acc[5],
      ])
      // Cells merge into one strip per row; one rectangle per cell made the PDF crawl.
      const rows = new Map()
      for (const [x, y] of visible) {
        const key = Math.round(y / step)
        if (!rows.has(key)) rows.set(key, [])
        rows.get(key).push(x)
      }
      const rects = [...rows.entries()]
        .flatMap(([key, xs]) => {
          xs.sort((a, b) => a - b)
          const runs = []
          for (const x of xs) {
            const run = runs.at(-1)
            if (run && x - run[1] < step * 1.5) run[1] = x
            else runs.push([x, x])
          }
          const y = key * step
          return runs.map(
            ([from, to]) =>
              `<rect x="${format(from - half)}" y="${format(y - half)}" width="${format(to - from + 2 * half)}" height="${format(2 * half)}"/>`,
          )
        })
        .join('')
      return `<clipPath id="${clip}"><polygon points="${points(f.poly)}"/></clipPath>
<g clip-path="url(#${clip})"><g transform="${matrix(sheetFromView)}"><clipPath id="${clip}-v">${rects}</clipPath><g clip-path="url(#${clip}-v)">${body}</g></g></g>`
    })
    .join('\n')
}

const STEP = 0.2

const grid = ({ centre, radius, step = STEP }) => {
  const result = []
  for (let dx = -radius; dx <= radius; dx += step)
    for (let dy = -radius; dy <= radius; dy += step) result.push([centre[0] + dx, centre[1] + dy])
  return result
}

const subtract = (a, b) => [a[0] - b[0], a[1] - b[1]]

const intersectLines = (l1, l2) => {
  const d1 = subtract(l1.to, l1.from)
  const d2 = subtract(l2.to, l2.from)
  const t =
    ((l2.from[0] - l1.from[0]) * d2[1] - (l2.from[1] - l1.from[1]) * d2[0]) /
    (d1[0] * d2[1] - d1[1] * d2[0])
  return [l1.from[0] + d1[0] * t, l1.from[1] + d1[1] * t]
}

const reflect = ({ from, to }, p) => {
  const u = unit(subtract(to, from))
  const t = (p[0] - from[0]) * u[0] + (p[1] - from[1]) * u[1]
  return [2 * (from[0] + u[0] * t) - p[0], 2 * (from[1] + u[1] * t) - p[1]]
}

const unit = ([x, y]) => {
  const l = Math.hypot(x, y)
  return [x / l, y / l]
}

export const buildDesign = ({
  qrUrl = flyerConfig.qrUrl,
  message = flyerConfig.message,
  headMessage = flyerConfig.headMessage,
} = {}) => {
  const { states, warnings } = simulate()
  if (warnings.length) throw new Error(warnings.join('\n'))
  const finalFacets = states.at(-1).facets
  const byId = Object.fromEntries(states.map((s) => [s.id, s.facets]))
  const { headTip, tailTip, eye, tail } = landmarks(finalFacets, byId)

  const headX = headTip[0]
  const tailX = tailTip[0]
  const stops = GRADIENT.map(
    ([offset, colour]) => `<stop offset="${offset}" stop-color="${colour}"/>`,
  ).join('')

  const base = finalFacets
    .map((f) => {
      const inverse = invert(f.m)
      const [x1, y1] = apply(inverse, [headX, 0])
      const [x2, y2] = apply(inverse, [tailX, 0])
      const id = `g${f.id}`
      return `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${format(x1)}" y1="${format(y1)}" x2="${format(x2)}" y2="${format(y2)}">${stops}</linearGradient>
<polygon points="${points(f.poly)}" fill="url(#${id})" stroke="url(#${id})" stroke-width="0.15" stroke-linejoin="round"/>`
    })
    .join('\n')

  // Bleed for trimming: every facet on the sheet's edge grows outward with its
  // own gradient, so the colour carries on past the cut instead of stretching.
  const onEdge = ([x, y]) =>
    [
      x < 1e-6 ? [-1, 0] : null,
      x > SIZE - 1e-6 ? [1, 0] : null,
      y < 1e-6 ? [0, -1] : null,
      y > SIZE - 1e-6 ? [0, 1] : null,
    ].filter(Boolean)
  const isCorner = (p) => onEdge(p).length === 2
  const bleed = finalFacets
    .flatMap((f) =>
      f.poly.map((p, i) => {
        const q = f.poly[(i + 1) % f.poly.length]
        const side = onEdge(p).find(([nx, ny]) =>
          onEdge(q).some(([mx, my]) => mx === nx && my === ny),
        )
        if (!side) return ''
        const along = unit(subtract(q, p))
        const start = isCorner(p) ? [p[0] - along[0] * BLEED, p[1] - along[1] * BLEED] : p
        const end = isCorner(q) ? [q[0] + along[0] * BLEED, q[1] + along[1] * BLEED] : q
        const out = (r) => [r[0] + side[0] * BLEED, r[1] + side[1] * BLEED]
        return `<polygon points="${points([start, end, out(end), out(start)])}" fill="url(#g${f.id})" stroke="url(#g${f.id})" stroke-width="0.15"/>`
      }),
    )
    .join('')

  const openEye = decal({
    facets: finalFacets,
    side: eye.openSide,
    on: NECK[eye.openSide],
    id: 'eye-open',
    samples: grid({ centre: eye.view[eye.openSide], radius: eye.radius + 0.2 }),
    step: STEP,
    body: `<circle cx="${format(eye.view[eye.openSide][0])}" cy="${format(eye.view[eye.openSide][1])}" r="${eye.radius}" fill="${INK}"/>`,
  })

  const winkSide = eye.openSide === 'front' ? 'back' : 'front'
  const [wx, wy] = eye.view[winkSide]
  const r = eye.radius * WINK_WIDTH
  const wink = decal({
    facets: finalFacets,
    side: winkSide,
    on: NECK[winkSide],
    id: 'eye-wink',
    samples: grid({ centre: [wx, wy], radius: eye.radius * 1.6 + 0.2 }),
    step: STEP,
    body: `<path d="M ${format(wx - r)} ${format(wy + r * 0.35)} Q ${format(wx)} ${format(wy - r * 0.9)} ${format(wx + r)} ${format(wy + r * 0.35)}" fill="none" stroke="${INK}" stroke-width="${format(eye.radius * 0.55)}" stroke-linecap="round"/>`,
  })

  const text = decal({
    facets: finalFacets,
    side: tail.side,
    on: TAIL[tail.side],
    id: 'tail-text',
    samples: tail.samples,
    step: STEP,
    body: `<text transform="translate(${format(tail.anchor[0])} ${format(tail.anchor[1])}) rotate(${format(tail.angle)})" font-family="Space Mono" font-weight="700" font-size="${tail.fontSize}" text-anchor="middle" dominant-baseline="central" fill="${INK}">LittleParrot.app</text>`,
  })

  const qr = qrDecal({ facets: finalFacets, url: qrUrl })
  const note = noteDecal({ facets: byId.head, message, headMessage })

  return { finalFacets, states, base, bleed, decals: [openEye, wink, text, qr, note].join('\n') }
}

const NECK = { front: ['T7'], back: ['T8'] }
const EYE_RADIUS = 0.8
const WINK_WIDTH = 1.25

// Points along the wink's quadratic arc, matching the path drawn for it.
const winkArc = ([x, y], radius) => {
  const r = radius * WINK_WIDTH
  const start = [x - r, y + r * 0.35]
  const control = [x, y - r * 0.9]
  const end = [x + r, y + r * 0.35]
  return Array.from({ length: 11 }, (_, i) => {
    const t = i / 10
    const u = 1 - t
    return [0, 1].map((k) => u * u * start[k] + 2 * u * t * control[k] + t * t * end[k])
  })
}
const TAIL = { front: ['T4'], back: ['T3'] }

const landmarks = (facets, byId) => {
  const { headTip, tailTip, headLine, tailLine, K_R } = geometry

  // The eye sits on the neck tucked into the corner where the head crease
  // meets the top edge of the neck, as close as the whole eye still fits.
  const neckLine = {
    from: [-tailLine.from[0], tailLine.from[1]],
    to: [-tailLine.to[0], tailLine.to[1]],
  }
  const corner = [reflect(neckLine, [0, 0]), reflect(neckLine, [-K_R[0], K_R[1]])]
    .map((edgeEnd) => intersectLines(headLine, { from: geometry.neckTip, to: edgeEnd }))
    .reduce((top, p) => (p[1] < top[1] ? p : top))
  const spot = (side, outline) => {
    let best = null
    for (let x = headTip[0] - 2; x <= headLine.from[0] + 6; x += STEP)
      for (
        let y = Math.min(headTip[1], headLine.from[1]) - 6;
        y <= Math.max(headTip[1], headLine.from[1]) + 6;
        y += STEP
      ) {
        const view = side === 'front' ? [x, y] : [-x, y]
        const f = visibleFacetAt(facets, side, [x, y])
        if (!f || !NECK[side].includes(f.src)) continue
        const sheet = apply(invert(f.m), [x, y])
        const before = byId.tail.find((g) => containsPoint(g.poly, sheet))
        const moved = before && Math.hypot(...subtract(apply(before.m, sheet), [x, y])) > 0.5
        if (moved) continue
        // Keep clear of the trimmed edge so a slightly off cut can't take the eye.
        if (Math.min(sheet[0], sheet[1], SIZE - sheet[0], SIZE - sheet[1]) < 2) continue
        if (!outline(x, y).every((p) => visibleFacetAt(facets, side, p) === f)) continue
        const distance = Math.hypot(...subtract([x, y], corner))
        if (!best || distance < best.distance) best = { view, distance }
      }
    return best
  }
  const around = ([x, y], r) =>
    Array.from({ length: 32 }, (_, k) => [
      x + r * Math.cos((k * Math.PI) / 16),
      y + r * Math.sin((k * Math.PI) / 16),
    ])
  const dotOutline = (x, y) => [0.5, 1, 1.3].flatMap((k) => around([x, y], EYE_RADIUS * k + 0.05))
  // The wink is tested along its actual arc, so it can sit as high as the dot.
  const winkOutline = (x, y) =>
    winkArc([x, y], EYE_RADIUS).flatMap((p) => around(p, EYE_RADIUS * 0.3 + 0.25))
  const front = spot('front', dotOutline)
  const back = spot('back', winkOutline)
  const eye = {
    openSide: 'front',
    radius: EYE_RADIUS,
    view: { front: front.view, back: back.view },
  }

  // The tail's edges are the leg's spine and kite crease reflected through the tail reverse fold.
  const spineEdge = unit(subtract(reflect(tailLine, [0, 0]), tailTip))
  const outerEdge = unit(subtract(reflect(tailLine, K_R), tailTip))
  const axis = unit([spineEdge[0] + outerEdge[0], spineEdge[1] + outerEdge[1]])
  const halfAngle = Math.acos(spineEdge[0] * axis[0] + spineEdge[1] * axis[1])
  const at = (t, s = 0) => [
    tailTip[0] + axis[0] * t - axis[1] * s,
    tailTip[1] + axis[1] * t + axis[0] * s,
  ]
  const onTail = (p) => TAIL.front.includes(visibleFacetAt(facets, 'front', p)?.src)
  let visibleLength = 0
  while (onTail(at(visibleLength + STEP))) visibleLength += STEP

  let fontSize = 4
  let start
  let length
  do {
    fontSize -= 0.1
    length = fontSize * 9.9
    start = (fontSize * 1.3) / (2 * Math.tan(halfAngle)) + 0.5
  } while (start + length > visibleLength - 1.5)

  const centre = start + length / 2
  const samples = []
  for (let t = start - 1; t <= start + length + 1; t += STEP) {
    // Samples right on the tail edge pick up inner layers that share the edge.
    const width = Math.tan(halfAngle) * t - 0.25
    for (let s = -width; s <= width; s += STEP) samples.push(at(t, s))
  }
  const tail = {
    side: 'front',
    anchor: at(centre),
    angle: (Math.atan2(-axis[1], -axis[0]) * 180) / Math.PI,
    fontSize: Number(fontSize.toFixed(1)),
    samples,
  }
  return { headTip, tailTip, eye, tail }
}

// A smooth curve through the points (Catmull-Rom), ending in an arrowhead.
const loopedArrow = (points) => {
  const at = (i) => points[Math.max(0, Math.min(points.length - 1, i))]
  let d = `M ${points[0].map(format).join(' ')}`
  for (let i = 0; i < points.length - 1; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C ${[...c1, ...c2, ...p2].map(format).join(' ')}`
  }
  const tip = points.at(-1)
  const before = points.at(-2)
  const back = unit(subtract(before, tip))
  const barb = (degrees) => {
    const r = (degrees * Math.PI) / 180
    const v = [
      back[0] * Math.cos(r) - back[1] * Math.sin(r),
      back[0] * Math.sin(r) + back[1] * Math.cos(r),
    ]
    return ` M ${tip.map(format).join(' ')} l ${format(v[0] * 1.4)} ${format(v[1] * 1.4)}`
  }
  d += barb(32) + barb(-32)
  return `<path d="${d}" fill="none" stroke="${INK}" stroke-width="0.35" stroke-linecap="round" stroke-linejoin="round"/>`
}

export const qrModules = (url) =>
  execFileSync('qrencode', ['-t', 'ASCII', '-m', '0', '-l', 'M', url], { encoding: 'utf8' })
    .trimEnd()
    .split('\n')
    .map((line) => Array.from({ length: line.length / 2 }, (_, i) => line[i * 2] === '#'))

const WING = ['T5', 'T6']
const QR_SIZE = 20

// The QR sits on the top face of the front wing once it is folded down. The
// two wing halves lie flat against each other there, so it prints as one square.
const qrDecal = ({ facets, url }) => {
  const modules = qrModules(url)
  const unit = QR_SIZE / modules.length
  const left = -QR_SIZE / 2
  const top = geometry.h + 1.5
  const rects = modules
    .flatMap((row, y) =>
      row.map((dark, x) =>
        dark
          ? `<rect x="${format(left + x * unit)}" y="${format(top + y * unit)}" width="${format(unit + 0.01)}" height="${format(unit + 0.01)}"/>`
          : '',
      ),
    )
    .join('')
  return decal({
    facets,
    side: 'front',
    on: WING,
    id: 'qr',
    step: STEP,
    samples: grid({ centre: [0, top + QR_SIZE / 2], radius: QR_SIZE / 2 + 0.3 }),
    body: `<g fill="${INK}">${rects}</g>`,
  })
}

// The arrow sits on the wing's tucked-in side flap, which faces the body once
// the wing is down: lift the wing and it points over the wing's edge to the QR
// on top. The message sits beside it on the panel that folds into the tail.
// Both are laid out in flyer coordinates (the flat sheet as printed).
const FLYER_TO_SHEET = [0, 1, -1, 0, SIZE, 0]

const ARROW_FILE = new URL('../arrow.svg', import.meta.url)
const ARROW_TIP = [45.271209, 95.451345]
const ARROW_STROKE = 0.45

const similarity = ([a, b], [c, d]) => {
  const from = subtract(b, a)
  const to = subtract(d, c)
  const scale = Math.hypot(...to) / Math.hypot(...from)
  const angle = Math.atan2(to[1], to[0]) - Math.atan2(from[1], from[0])
  const cos = scale * Math.cos(angle)
  const sin = scale * Math.sin(angle)
  return {
    m: [cos, sin, -sin, cos, c[0] - (cos * a[0] - sin * a[1]), c[1] - (sin * a[0] + cos * a[1])],
    scale,
  }
}

// The arrow file's line is four curves: the tail, two making the loop, and the
// lead into the head. The tail is stretched and the loop shrunk around the
// point where they meet.
const TAIL_STRETCH = 1.5
const LOOP_SCALE = 0.65

const absoluteCurves = (d) => {
  const numbers = d.match(/-?[\d.]+(?:e-?\d+)?/g).map(Number)
  let point = [numbers[0], numbers[1]]
  const curves = []
  for (let i = 2; i < numbers.length; i += 6) {
    const [c1, c2, end] = [0, 2, 4].map((k) => [
      point[0] + numbers[i + k],
      point[1] + numbers[i + k + 1],
    ])
    curves.push([point, c1, c2, end])
    point = end
  }
  return curves
}

const scaleAbout = (centre, k) => (p) => [
  centre[0] + (p[0] - centre[0]) * k,
  centre[1] + (p[1] - centre[1]) * k,
]

const reshapeArrow = (d) => {
  const [tail, loopUp, loopDown, lead] = absoluteCurves(d)
  const joint = tail[3]
  const stretched = tail.map(scaleAbout(joint, TAIL_STRETCH))
  const loop = [...loopUp, ...loopDown].map(scaleAbout(joint, LOOP_SCALE))
  const curves = [stretched, loop.slice(0, 4), loop.slice(4), [loop[7], ...lead.slice(1)]]
  const fmt = (p) => p.map(format).join(' ')
  return {
    d: `M ${fmt(curves[0][0])} ${curves.map(([, c1, c2, end]) => `C ${fmt(c1)} ${fmt(c2)} ${fmt(end)}`).join(' ')}`,
    start: curves[0][0],
  }
}

const arrowFromFile = ({ start, tip }) => {
  const svg = readFileSync(ARROW_FILE, 'utf8')
  const [line, head] = [...svg.matchAll(/<path[\s\S]*?\/>/g)].map(([tag]) => ({
    d: tag.match(/\sd="([^"]*)"/)[1],
    transform: tag.match(/transform="([^"]*)"/)?.[1] ?? '',
  }))
  const shaped = reshapeArrow(line.d)
  const { m, scale } = similarity([shaped.start, ARROW_TIP], [start, tip])
  return `<g transform="${matrix(m)}" fill="none" stroke="${INK}" stroke-width="${format(ARROW_STROKE / scale)}" stroke-linecap="round" stroke-linejoin="round"><path d="${shaped.d}"/><path d="${head.d}" transform="${head.transform}"/></g>`
}

// Mirrors the flyer across the line from its centre to the wing-tip corner,
// which runs through the middle of the QR: the tail side maps onto the neck side.
const MIRROR_ACROSS_WING = [0, -1, -1, 0, SIZE, SIZE]

const noteDecal = ({ facets, message, headMessage }) => {
  const tailFlap = topFacetAt(facets, [8, 5])
  const neckFlap = topFacetAt(facets, [-8, 5])
  const arrow = arrowFromFile({ start: [49.3, 95.6], tip: [34.8, 87.6] })
  const fontSize = 2.1
  const tailLines = message
    .map(
      (line, i) =>
        `<text x="54.6" y="${format(91.3 + i * fontSize * 1.3)}" font-family="Montserrat" font-weight="700" font-size="${fontSize}" fill="${INK}">${line}</text>`,
    )
    .join('')
  // Mirrored placement, but the letters themselves read normally: they run
  // down the left edge with their feet towards it.
  const headLines = headMessage
    .map((line, i) => {
      // Two lines centred on the band the tail's three lines fill.
      const x = 8.7 - (i + (message.length - headMessage.length) / 2) * fontSize * 1.3
      return `<text transform="translate(${format(x)} 44.5) rotate(90)" font-family="Montserrat" font-weight="700" font-size="${fontSize}" text-anchor="end" fill="${INK}">${line}</text>`
    })
    .join('')
  const clip = (id, flap) =>
    `<clipPath id="${id}"><polygon points="${flap.poly.map((p) => p.map(format).join(',')).join(' ')}"/></clipPath>`
  return `${clip('tail-flap', tailFlap)}${clip('neck-flap', neckFlap)}
<g clip-path="url(#tail-flap)"><g transform="${matrix(FLYER_TO_SHEET)}">${arrow}</g></g>
<g clip-path="url(#neck-flap)"><g transform="${matrix(FLYER_TO_SHEET)}"><g transform="${matrix(MIRROR_ACROSS_WING)}">${arrow}</g></g></g>
<g transform="${matrix(FLYER_TO_SHEET)}">${tailLines}${headLines}</g>`
}

const CREASE_GREY = '#808080'
export const BLEED = 2

// Print layers: the gradient alone with bleed, and the black artwork alone.
export const gradientSvg = ({ base, bleed }, { rotate = -90 } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE + 2 * BLEED}mm" height="${SIZE + 2 * BLEED}mm" viewBox="${-BLEED} ${-BLEED} ${SIZE + 2 * BLEED} ${SIZE + 2 * BLEED}">
<g transform="rotate(${rotate} ${SIZE / 2} ${SIZE / 2})">
${base}
${bleed}
</g>
</svg>`

export const inkSvg = ({ decals }, { rotate = -90 } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}mm" height="${SIZE}mm" viewBox="0 0 ${SIZE} ${SIZE}">
<g transform="rotate(${rotate} ${SIZE / 2} ${SIZE / 2})">
${decals}
</g>
</svg>`

// The back of the sheet carries only the fold lines, in sheet coordinates.
export const backDesign = (segments, { paper = true } = {}) =>
  `${paper ? `<rect x="0" y="0" width="${SIZE}" height="${SIZE}" fill="#ffffff"/>` : ''}
<g fill="none" stroke="${CREASE_GREY}" stroke-width="0.25" stroke-dasharray="1.2 0.9" stroke-linecap="butt">${segments
    .map(
      ([[x1, y1], [x2, y2]]) =>
        `<line x1="${format(x1)}" y1="${format(y1)}" x2="${format(x2)}" y2="${format(y2)}"/>`,
    )
    .join('')}</g>`

// Seen from the back the flyer is mirrored left to right, which is how a
// double-sided print flipped on its long edge lines up with the front.
export const backSvg = (segments, { rotate = -90 } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}mm" height="${SIZE}mm" viewBox="0 0 ${SIZE} ${SIZE}">
<g transform="translate(${SIZE} 0) scale(-1 1) rotate(${rotate} ${SIZE / 2} ${SIZE / 2})">
${backDesign(segments, { paper: false })}
</g>
</svg>`

export const flatSvg = ({ base, decals }, { rotate = -90 } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}mm" height="${SIZE}mm" viewBox="0 0 ${SIZE} ${SIZE}">
<g transform="rotate(${rotate} ${SIZE / 2} ${SIZE / 2})">
${base}
${decals}
</g>
</svg>`

export { foldedPolygon }
