import { steps } from './animation.mjs'
import { sharedEdge } from './origami.mjs'

const EPS = 1e-3

const differentMaps = (a, b) => a.m.some((v, i) => Math.abs(v - b.m[i]) > 1e-6)

// Every line the paper is folded along at some point in the instructions,
// guide creases included, merged so each fold is one unbroken segment.
export const creasePattern = () => {
  const segments = []
  for (const { frames } of steps)
    for (const facets of frames)
      for (let i = 0; i < facets.length; i++)
        for (let j = i + 1; j < facets.length; j++) {
          if (!differentMaps(facets[i], facets[j])) continue
          const edge = sharedEdge(facets[i], facets[j])
          if (edge) segments.push(edge.flat())
        }

  // Overlapping pieces of the same line become one interval, or the dashes
  // drawn twice would fall out of step.
  const lines = new Map()
  for (const [x1, y1, x2, y2] of segments) {
    let angle = Math.atan2(y2 - y1, x2 - x1)
    if (angle < 0) angle += Math.PI
    if (angle > Math.PI - 1e-4) angle = 0
    const dir = [Math.cos(angle), Math.sin(angle)]
    const offset = x1 * dir[1] - y1 * dir[0]
    const key = `${Math.abs(angle) < 5e-5 ? '0' : angle.toFixed(4)}:${Math.abs(offset) < 5e-4 ? '0' : offset.toFixed(3)}`
    if (!lines.has(key)) lines.set(key, { dir, offset, intervals: [] })
    const t1 = x1 * dir[0] + y1 * dir[1]
    const t2 = x2 * dir[0] + y2 * dir[1]
    lines.get(key).intervals.push([Math.min(t1, t2), Math.max(t1, t2)])
  }
  const merged = []
  for (const { dir, offset, intervals } of lines.values()) {
    intervals.sort((a, b) => a[0] - b[0])
    let current = null
    for (const interval of intervals) {
      if (current && interval[0] <= current[1] + EPS) current[1] = Math.max(current[1], interval[1])
      else {
        if (current) merged.push([dir, offset, current])
        current = [...interval]
      }
    }
    if (current) merged.push([dir, offset, current])
  }
  const normal = (dir, offset) => [dir[1] * offset, -dir[0] * offset]
  return merged.map(([dir, offset, [from, to]]) => {
    const base = normal(dir, offset)
    return [
      [base[0] + dir[0] * from, base[1] + dir[1] * from],
      [base[0] + dir[0] * to, base[1] + dir[1] * to],
    ]
  })
}
