import { compose, flatSheet, rotation, runOperation, translation } from './origami.mjs'

export const SIZE = 100

const d = SIZE / 2 / Math.SQRT2
const h = (2 - Math.SQRT2) * d
const B = [0, 2 * d]
const K_R = [h, h]
const K_L = [-h, h]

const unit = ([x, y]) => {
  const l = Math.hypot(x, y)
  return [x / l, y / l]
}

const bisectorFrom = (apex, a, b) => {
  const u = unit([a[0] - apex[0], a[1] - apex[1]])
  const v = unit([b[0] - apex[0], b[1] - apex[1]])
  const w = unit([u[0] + v[0], u[1] + v[1]])
  return { from: apex, to: [apex[0] + w[0] * 10, apex[1] + w[1] * 10] }
}

const mirror = ({ from, to }) => ({ from: [-from[0], from[1]], to: [-to[0], to[1]] })

const kiteRight = bisectorFrom(B, [d, d], [0, 0])
const kiteLeft = mirror(kiteRight)
const topFold = { from: K_L, to: K_R }

const direction = (degrees) => [
  Math.cos((degrees * Math.PI) / 180),
  Math.sin((degrees * Math.PI) / 180),
]

const lineThrough = (point, degrees) => {
  const [dx, dy] = direction(degrees)
  return { from: point, to: [point[0] + dx * 10, point[1] + dy * 10] }
}

const reflectPoint = ({ from, to }, p) => {
  const u = unit([to[0] - from[0], to[1] - from[1]])
  const t = (p[0] - from[0]) * u[0] + (p[1] - from[1]) * u[1]
  const foot = [from[0] + u[0] * t, from[1] + u[1] * t]
  return [2 * foot[0] - p[0], 2 * foot[1] - p[1]]
}

const along = (p, degrees, distance) => {
  const [dx, dy] = direction(degrees)
  return [p[0] + dx * distance, p[1] + dy * distance]
}

// Angles are in screen degrees: 0 points right, positive turns clockwise (down).
// They describe the parrot drawn with its neck on the right; the real neck is
// on the left, so every line is mirrored afterwards.
const NECK_RISE = -55
const HEAD_POINTS = 20
const HEAD_LENGTH = 15

const mirrorPoint = ([x, y]) => [-x, y]

const tailLine = lineThrough([0, 21.5], (90 + NECK_RISE) / 2)
const tailTip = reflectPoint(tailLine, B)
const headLineOnRight = lineThrough(
  along(tailTip, NECK_RISE, -HEAD_LENGTH),
  (HEAD_POINTS + NECK_RISE) / 2,
)
const neckLine = mirror(tailLine)
const neckTip = mirrorPoint(tailTip)
const headLine = mirror(headLineOnRight)
const headTip = mirrorPoint(reflectPoint(headLineOnRight, tailTip))
const headSeed = mirrorPoint(along(tailTip, NECK_RISE, -1.5))
const wingLine = topFold

export const squareBaseFrame = compose(translation([0, -2 * d]), rotation({ degrees: 45 }))

// The petal sides are reverse folds, not valley folds: folding the sides over
// the front first leaves them on top after the lift and turns the wings to the
// unprinted side.
export const operations = [
  { id: 'square-base', type: 'square-base', size: SIZE, frame: squareBaseFrame },
  { id: 'sink-right-1', type: 'reverse', line: kiteRight, seeds: [{ point: [18.7, 42.3] }] },
  { id: 'sink-left-1', type: 'reverse', line: kiteLeft, seeds: [{ point: [-18.7, 42.3] }] },
  {
    id: 'petal-1',
    type: 'fold',
    line: topFold,
    seeds: [{ point: [0.5, 45], src: ['T1', 'T2'] }],
    direction: 'valley',
  },
  { id: 'turn-1', type: 'turn' },
  { id: 'sink-right-2', type: 'reverse', line: kiteRight, seeds: [{ point: [18.7, 42.3] }] },
  { id: 'sink-left-2', type: 'reverse', line: kiteLeft, seeds: [{ point: [-18.7, 42.3] }] },
  {
    id: 'petal-2',
    type: 'fold',
    line: topFold,
    seeds: [{ point: [0.5, 45], src: ['T5', 'T6'] }],
    direction: 'valley',
  },
  { id: 'neck', type: 'reverse', line: neckLine, seeds: [{ point: [-1, 65] }], frontSrc: ['T7'] },
  { id: 'tail', type: 'reverse', line: tailLine, seeds: [{ point: [1, 65] }], frontSrc: ['T4'] },
  { id: 'head', type: 'reverse', line: headLine, seeds: [{ point: headSeed }], frontSrc: ['T7'] },
  {
    id: 'wing-front',
    type: 'fold',
    line: wingLine,
    seeds: [{ point: [0.5, -5] }],
    direction: 'valley',
  },
  {
    id: 'wing-back',
    type: 'fold',
    line: wingLine,
    seeds: [{ point: [0.5, -5], bottom: true }],
    direction: 'mountain',
  },
]

export const simulate = () => {
  const warnings = []
  const states = [{ id: 'flat', facets: flatSheet(SIZE) }]
  for (const op of operations) {
    const previous = states[states.length - 1].facets
    try {
      states.push({ id: op.id, facets: runOperation(previous, op, warnings) })
    } catch (error) {
      warnings.push(`${op.id}: ${error.message}`)
      break
    }
  }
  return { states, warnings }
}

export const geometry = {
  d,
  h,
  B,
  K_R,
  K_L,
  kiteRight,
  neckTip,
  tailTip,
  headTip,
  headLine,
  tailLine,
}
