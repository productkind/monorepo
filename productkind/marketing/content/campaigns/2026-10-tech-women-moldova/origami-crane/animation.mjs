import { geometry, simulate, SIZE, squareBaseFrame } from './crane.mjs'
import { area, compose, flatSheet, invert, runOperation, sharedEdge } from './origami.mjs'

const { states, warnings } = simulate()
if (warnings.length) throw new Error(warnings.join('\n'))
const sim = Object.fromEntries(states.map((s) => [s.id, s.facets]))

const run = (facets, op) => {
  const opWarnings = []
  const result = runOperation(facets, op, opWarnings)
  if (opWarnings.length) throw new Error(opWarnings.join('\n'))
  return result
}

const valley = (line, point) => ({ type: 'fold', line, seeds: [{ point }], direction: 'valley' })
const turn = { type: 'turn' }

const { kiteRight, K_L, K_R } = geometry
const kiteLeft = {
  from: [-kiteRight.from[0], kiteRight.from[1]],
  to: [-kiteRight.to[0], kiteRight.to[1]],
}
const topFold = { from: K_L, to: K_R }

const flatPrintedUp = flatSheet(SIZE).map((f) => ({ ...f, m: compose(squareBaseFrame, f.m) }))
const flatPrintedDown = run(flatPrintedUp, turn)

const precreaseSquareBase = (base) => {
  const kiteOne = run(base, valley(kiteRight, [18.7, 42.3]))
  const kiteBoth = run(kiteOne, valley(kiteLeft, [-18.7, 42.3]))
  const topDown = run(kiteBoth, valley(topFold, [0, 8]))
  return [kiteOne, kiteBoth, topDown, kiteBoth, base]
}

const foldAndUnfold = (state, line, point) => [run(state, valley(line, point)), state]

export const steps = [
  {
    id: 'book-folds',
    frames: [
      flatPrintedDown,
      ...foldAndUnfold(flatPrintedDown, { from: [0, 0], to: [10, 10] }, [-20, 5]),
      ...foldAndUnfold(flatPrintedDown, { from: [0, 0], to: [10, -10] }, [-20, -5]),
    ],
  },
  {
    id: 'diagonals',
    frames: [
      flatPrintedDown,
      flatPrintedUp,
      ...foldAndUnfold(flatPrintedUp, { from: [-10, 0], to: [10, 0] }, [0, -20]),
      ...foldAndUnfold(flatPrintedUp, { from: [0, -10], to: [0, 10] }, [20, 0]),
    ],
  },
  { id: 'collapse', frames: [flatPrintedUp, sim['square-base']] },
  { id: 'kite', frames: [sim['square-base'], ...precreaseSquareBase(sim['square-base'])] },
  { id: 'petal', frames: [sim['square-base'], sim['petal-1']] },
  {
    id: 'repeat',
    frames: [sim['petal-1'], sim['turn-1'], ...precreaseSquareBase(sim['turn-1']), sim['petal-2']],
  },
  { id: 'neck-tail', frames: [sim['petal-2'], sim['neck'], sim['tail']] },
  { id: 'head', frames: [sim['tail'], sim['head']] },
  { id: 'wings', frames: [sim['head'], sim['wing-front'], sim['wing-back']] },
]

const intersect = (subject, clip) => {
  const orientation = Math.sign(
    clip.reduce((sum, p, i) => {
      const q = clip[(i + 1) % clip.length]
      return sum + (p[0] * q[1] - q[0] * p[1])
    }, 0),
  )
  let output = subject
  for (let i = 0; i < clip.length && output.length; i++) {
    const a = clip[i]
    const b = clip[(i + 1) % clip.length]
    const inside = (p) =>
      orientation * ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) >= -1e-9
    const input = output
    output = []
    for (let j = 0; j < input.length; j++) {
      const p = input[j]
      const q = input[(j + 1) % input.length]
      if (inside(p)) output.push(p)
      if (inside(p) !== inside(q)) {
        const dx = q[0] - p[0]
        const dy = q[1] - p[1]
        const ex = b[0] - a[0]
        const ey = b[1] - a[1]
        const t = (ex * (a[1] - p[1]) - ey * (a[0] - p[0])) / (ex * dy - ey * dx)
        output.push([p[0] + t * dx, p[1] + t * dy])
      }
    }
  }
  return output.length >= 3 && area(output) > 1e-3 ? output : null
}

const round = (n) => Math.round(n * 100) / 100

const segment = (from, to) => {
  const pieces = []
  for (const a of from)
    for (const b of to) {
      const poly = intersect(a.poly, b.poly)
      if (!poly) continue
      pieces.push({
        p: poly.flat().map(round),
        a: a.m.map((v) => Math.round(v * 10000) / 10000),
        b: b.m.map((v) => Math.round(v * 10000) / 10000),
        za: a.z,
        zb: b.z,
        poly,
      })
    }
  return withActiveFolds(pieces)
}

const sameMap = (m, n) => m.every((v, i) => Math.abs(v - n[i]) < 1e-3)

// A fold is active when the two pieces either side of an edge end up in a
// different relation to each other than they started in.
const withActiveFolds = (pieces) => {
  const folds = pieces.map(() => [])
  for (let i = 0; i < pieces.length; i++)
    for (let j = i + 1; j < pieces.length; j++) {
      const p = pieces[i]
      const q = pieces[j]
      if (sameMap(compose(invert(q.a), p.a), compose(invert(q.b), p.b))) continue
      const edge = sharedEdge(p, q)
      if (!edge) continue
      const flat = edge.flat().map(round)
      folds[i].push(...flat)
      folds[j].push(...flat)
    }
  return pieces.map(({ poly, ...piece }, i) =>
    folds[i].length ? { ...piece, f: folds[i] } : piece,
  )
}

export const animationData = () =>
  steps.map(({ id, frames }) => ({
    id,
    segments: frames.slice(1).map((frame, index) => segment(frames[index], frame)),
  }))
