const EPS = 1e-6

export const IDENTITY = [1, 0, 0, 1, 0, 0]

export const apply = (m, [x, y]) => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]]

export const compose = (outer, inner) => [
  outer[0] * inner[0] + outer[2] * inner[1],
  outer[1] * inner[0] + outer[3] * inner[1],
  outer[0] * inner[2] + outer[2] * inner[3],
  outer[1] * inner[2] + outer[3] * inner[3],
  outer[0] * inner[4] + outer[2] * inner[5] + outer[4],
  outer[1] * inner[4] + outer[3] * inner[5] + outer[5],
]

export const determinant = (m) => m[0] * m[3] - m[1] * m[2]

export const invert = (m) => {
  const det = determinant(m)
  const a = m[3] / det
  const b = -m[1] / det
  const c = -m[2] / det
  const d = m[0] / det
  return [a, b, c, d, -(a * m[4] + c * m[5]), -(b * m[4] + d * m[5])]
}

export const reflection = ({ from, to }) => {
  const dx = to[0] - from[0]
  const dy = to[1] - from[1]
  const lengthSquared = dx * dx + dy * dy
  const c = (dx * dx - dy * dy) / lengthSquared
  const s = (2 * dx * dy) / lengthSquared
  const m = [c, s, s, -c, 0, 0]
  const moved = apply(m, from)
  return [c, s, s, -c, from[0] - moved[0], from[1] - moved[1]]
}

export const rotation = ({ degrees, centre = [0, 0] }) => {
  const r = (degrees * Math.PI) / 180
  const c = Math.cos(r)
  const s = Math.sin(r)
  const m = [c, s, -s, c, 0, 0]
  const moved = apply(m, centre)
  return [c, s, -s, c, centre[0] - moved[0], centre[1] - moved[1]]
}

export const translation = ([x, y]) => [1, 0, 0, 1, x, y]

const affineFromTriangles = (source, target) => {
  const [[x1, y1], [x2, y2], [x3, y3]] = source
  const toSource = [x2 - x1, y2 - y1, x3 - x1, y3 - y1, x1, y1]
  const [[u1, v1], [u2, v2], [u3, v3]] = target
  const toTarget = [u2 - u1, v2 - v1, u3 - u1, v3 - v1, u1, v1]
  return compose(toTarget, invert(toSource))
}

const cross = (a, b, p) => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])

const signedDistance = ({ from, to }, p) =>
  cross(from, to, p) / Math.hypot(to[0] - from[0], to[1] - from[1])

const centroid = (poly) => {
  let area = 0
  let cx = 0
  let cy = 0
  for (let i = 0; i < poly.length; i++) {
    const [x0, y0] = poly[i]
    const [x1, y1] = poly[(i + 1) % poly.length]
    const f = x0 * y1 - x1 * y0
    area += f
    cx += (x0 + x1) * f
    cy += (y0 + y1) * f
  }
  return [cx / (3 * area), cy / (3 * area)]
}

export const area = (poly) => {
  let total = 0
  for (let i = 0; i < poly.length; i++) {
    const [x0, y0] = poly[i]
    const [x1, y1] = poly[(i + 1) % poly.length]
    total += x0 * y1 - x1 * y0
  }
  return Math.abs(total) / 2
}

const splitPolygon = (poly, value) => {
  const negative = []
  const positive = []
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i]
    const q = poly[(i + 1) % poly.length]
    const vp = value(p)
    const vq = value(q)
    if (vp <= EPS) negative.push(p)
    if (vp >= -EPS) positive.push(p)
    if ((vp < -EPS && vq > EPS) || (vp > EPS && vq < -EPS)) {
      const t = vp / (vp - vq)
      const cut = [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]
      negative.push(cut)
      positive.push(cut)
    }
  }
  const keep = (piece) => (piece.length >= 3 && area(piece) > 1e-4 ? piece : null)
  return { negative: keep(negative), positive: keep(positive) }
}

export const foldedPolygon = (facet) => facet.poly.map((p) => apply(facet.m, p))

const containsPoint = (poly, p) => {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]
    const [xj, yj] = poly[j]
    if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi)
      inside = !inside
  }
  return inside
}

let nextId = 1

const facet = ({ poly, m, z, src }) => ({ id: nextId++, poly, m, z, src })

// Returns copies: unmoved facets are shared with the previous state, and
// renumbering them in place rewrote the layer order of states already stored.
const renumberLayers = (facets) => {
  const rank = new Map([...facets].sort((a, b) => a.z - b.z).map((f, index) => [f, index]))
  return facets.map((f) => ({ ...f, z: rank.get(f) }))
}

const sharedEdge = (a, b) => {
  for (let i = 0; i < a.poly.length; i++) {
    const p = a.poly[i]
    const q = a.poly[(i + 1) % a.poly.length]
    const length = Math.hypot(q[0] - p[0], q[1] - p[1])
    for (let j = 0; j < b.poly.length; j++) {
      const r = b.poly[j]
      const s = b.poly[(j + 1) % b.poly.length]
      if (Math.abs(cross(p, q, r)) / length > 1e-3 || Math.abs(cross(p, q, s)) / length > 1e-3)
        continue
      const dir = [(q[0] - p[0]) / length, (q[1] - p[1]) / length]
      const tr = (r[0] - p[0]) * dir[0] + (r[1] - p[1]) * dir[1]
      const ts = (s[0] - p[0]) * dir[0] + (s[1] - p[1]) * dir[1]
      const lo = Math.max(0, Math.min(tr, ts))
      const hi = Math.min(length, Math.max(tr, ts))
      if (hi - lo > 1e-3) {
        const start = [p[0] + dir[0] * lo, p[1] + dir[1] * lo]
        const end = [p[0] + dir[0] * hi, p[1] + dir[1] * hi]
        return [start, end]
      }
    }
  }
  return null
}

const edgeOnLine = (facetOnSide, edge, line) =>
  edge.every((p) => Math.abs(signedDistance(line, apply(facetOnSide.m, p))) < 1e-3)

const splitAlong = (facets, line) => {
  const pieces = []
  const parents = new Map()
  for (const f of facets) {
    const toLine = (p) => signedDistance(line, apply(f.m, p))
    const { negative, positive } = splitPolygon(f.poly, toLine)
    if (negative && positive) {
      const a = facet({ ...f, poly: negative })
      const b = facet({ ...f, poly: positive })
      parents.set(a.id, f)
      parents.set(b.id, f)
      pieces.push(a, b)
    } else {
      pieces.push(f)
    }
  }
  return { pieces, parents }
}

const sideOf = (f, line) => Math.sign(signedDistance(line, centroid(foldedPolygon(f))))

const pickSeed = (facets, seed) => {
  const candidates = facets.filter(
    (f) => containsPoint(foldedPolygon(f), seed.point) && (!seed.src || seed.src.includes(f.src)),
  )
  if (candidates.length === 0) throw new Error(`no facet under seed ${JSON.stringify(seed)}`)
  return candidates.reduce((pick, f) => ((seed.bottom ? f.z < pick.z : f.z > pick.z) ? f : pick))
}

const floodMoving = ({ facets, line, seeds, warnings, label }) => {
  const seedFacets = seeds.map((seed) => pickSeed(facets, seed))
  const side = sideOf(seedFacets[0], line)
  const moving = new Set(seedFacets)
  const queue = [...seedFacets]
  const neighbours = (f) => facets.filter((g) => g !== f && sharedEdge(f, g))
  while (queue.length) {
    const f = queue.pop()
    for (const g of neighbours(f)) {
      if (moving.has(g)) continue
      const edge = sharedEdge(f, g)
      if (edgeOnLine(f, edge, line)) continue
      if (sideOf(g, line) !== side) {
        warnings.push(`${label}: facet ${f.src} would tear from ${g.src}`)
        continue
      }
      moving.add(g)
      queue.push(g)
    }
  }
  return moving
}

const mergeSplits = (facets, parents) => {
  const byParent = new Map()
  const result = []
  for (const f of facets) {
    const parent = parents.get(f.id)
    if (!parent) {
      result.push(f)
      continue
    }
    if (!byParent.has(parent.id)) byParent.set(parent.id, { parent, pieces: [] })
    byParent.get(parent.id).pieces.push(f)
  }
  for (const { parent, pieces } of byParent.values()) {
    const [a, b] = pieces
    const sameMap = a.m.every((v, i) => Math.abs(v - b.m[i]) < 1e-9)
    if (sameMap && a.z === b.z) result.push({ ...parent, m: a.m, z: a.z })
    else result.push(a, b)
  }
  return result
}

const fold = (facets, { line, seeds, direction }, warnings, label) => {
  const { pieces, parents } = splitAlong(facets, line)
  const moving = floodMoving({ facets: pieces, line, seeds, warnings, label })
  const r = reflection(line)
  const zs = pieces.map((f) => f.z)
  const movingZs = [...moving].map((f) => f.z)
  const top = Math.max(...zs)
  const bottom = Math.min(...zs)
  const movingTop = Math.max(...movingZs)
  const movingBottom = Math.min(...movingZs)
  const folded = pieces.map((f) => {
    if (!moving.has(f)) return f
    const z =
      direction === 'valley' ? top + 1 + (movingTop - f.z) : bottom - 1 - (f.z - movingBottom)
    return { ...f, m: compose(r, f.m), z }
  })
  return renumberLayers(mergeSplits(folded, parents))
}

const reverseFold = (facets, { line, seeds, frontSrc }, warnings, label) => {
  const { pieces, parents } = splitAlong(facets, line)
  const moving = floodMoving({ facets: pieces, line, seeds, warnings, label })
  const seedSrc = pickSeed(pieces, seeds[0]).src
  // Halves are told apart by source triangle: other creases can lie on the
  // spine line (narrowed legs do this), so splitting at the spine mixes them.
  const front = new Set([...moving].filter((f) => (frontSrc ?? [seedSrc]).includes(f.src)))
  const back = [...moving].filter((f) => !front.has(f))
  const frontLowest = Math.min(...[...front].map((f) => f.z))
  const backHighest = Math.max(...back.map((f) => f.z))
  if (frontLowest < backHighest)
    warnings.push(
      `${label}: front and back halves interleave front=${[...front].map((f) => f.src + '@' + f.z)} back=${back.map((f) => f.src + '@' + f.z)}`,
    )
  const middle = (frontLowest + backHighest) / 2
  const step = 0.4 / (moving.size + 1)
  const frontTop = Math.max(...[...front].map((f) => f.z))
  const backBottom = Math.min(...back.map((f) => f.z))
  const r = reflection(line)
  const folded = pieces.map((f) => {
    if (!moving.has(f)) return f
    const z = front.has(f)
      ? middle + step * (1 + frontTop - f.z)
      : middle - step * (1 + f.z - backBottom)
    return { ...f, m: compose(r, f.m), z }
  })
  return renumberLayers(mergeSplits(folded, parents))
}

const transformAll = (facets, m, { flip }) =>
  renumberLayers(facets.map((f) => ({ ...f, m: compose(m, f.m), z: flip ? -f.z : f.z })))

const ring = (size) => {
  const c = size / 2
  return [
    { corner: false, p: [size, c] },
    { corner: true, p: [size, size] },
    { corner: false, p: [c, size] },
    { corner: true, p: [0, size] },
    { corner: false, p: [0, c] },
    { corner: true, p: [0, 0] },
    { corner: false, p: [c, 0] },
    { corner: true, p: [size, 0] },
  ]
}

// The sheet starts as the eight triangles around the centre so the square
// base collapse can give each one its own map.
export const flatSheet = (size) => {
  const C = [size / 2, size / 2]
  const points = ring(size)
  return Array.from({ length: 8 }, (_, i) =>
    facet({ poly: [C, points[i].p, points[(i + 1) % 8].p], m: IDENTITY, z: 0, src: `T${i + 1}` }),
  )
}

const squareBase = (facets, { size, frame }) => {
  const c = size / 2
  const C = [c, c]
  const halfA = ['T1', 'T8', 'T7', 'T6']
  const halfB = ['T2', 'T3', 'T4', 'T5']
  return renumberLayers(
    facets.map((f) => {
      const inA = halfA.includes(f.src)
      const [, a, b] = f.poly
      const aIsCorner = (a[0] === 0 || a[0] === size) && (a[1] === 0 || a[1] === size)
      const corner = aIsCorner ? a : b
      const mid = aIsCorner ? b : a
      const target = [C, [size, size], inA ? [size, c] : [c, size]]
      const m = compose(frame, affineFromTriangles([C, corner, mid], target))
      const z = 4 - (inA ? halfA : halfB).indexOf(f.src)
      return { ...f, m, z }
    }),
  )
}

export const runOperation = (facets, op, warnings) => {
  const label = op.id ?? op.type
  switch (op.type) {
    case 'fold':
      return fold(facets, op, warnings, label)
    case 'reverse':
      return reverseFold(facets, op, warnings, label)
    case 'turn':
      return transformAll(facets, reflection({ from: [op.axis ?? 0, 0], to: [op.axis ?? 0, 1] }), {
        flip: true,
      })
    case 'transform':
      return transformAll(facets, op.m, { flip: false })
    case 'square-base':
      return squareBase(facets, op)
    default:
      throw new Error(`unknown operation ${op.type}`)
  }
}

export const isPrintedSideUp = (f) => determinant(f.m) > 0

export const topFacetAt = (facets, point) => {
  const under = facets.filter((f) => containsPoint(foldedPolygon(f), point))
  if (under.length === 0) return null
  return under.reduce((top, f) => (f.z > top.z ? f : top))
}

export const bottomFacetAt = (facets, point) => {
  const under = facets.filter((f) => containsPoint(foldedPolygon(f), point))
  if (under.length === 0) return null
  return under.reduce((low, f) => (f.z < low.z ? f : low))
}

export { centroid, containsPoint, sharedEdge, signedDistance }
