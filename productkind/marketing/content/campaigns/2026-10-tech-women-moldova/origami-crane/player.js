const SVG_NS = 'http://www.w3.org/2000/svg'
const ACTIVE_FOLD = '#0b0b0d'
const SEGMENT_MS = 1500
const PAUSE_MS = 450
const END_PAUSE_MS = 1800
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const lerp = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t)
const compose = (o, i) => [
  o[0] * i[0] + o[2] * i[1],
  o[1] * i[0] + o[3] * i[1],
  o[0] * i[2] + o[2] * i[3],
  o[1] * i[2] + o[3] * i[3],
  o[0] * i[4] + o[2] * i[5] + o[4],
  o[1] * i[4] + o[3] * i[5] + o[5],
]
const applyMatrix = (m, x, y) => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]]

const element = (name, attributes = {}) => {
  const node = document.createElementNS(SVG_NS, name)
  for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value)
  return node
}

const bounds = (segments, view) => {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const pieces of segments)
    for (const piece of pieces)
      for (const t of [0, 0.5, 1]) {
        const m = compose(view, lerp(piece.a, piece.b, t))
        for (let i = 0; i < piece.p.length; i += 2) {
          const [x, y] = applyMatrix(m, piece.p[i], piece.p[i + 1])
          minX = Math.min(minX, x)
          minY = Math.min(minY, y)
          maxX = Math.max(maxX, x)
          maxY = Math.max(maxY, y)
        }
      }
  return [minX, minY, maxX - minX, maxY - minY]
}

let clipCount = 0

const createScene = ({
  container,
  segments,
  view = [1, 0, 0, 1, 0, 0],
  reverseLayers = false,
  box,
}) => {
  const [x, y, w, h] = box ?? bounds(segments, view)
  const pad = Math.max(w, h) * 0.08
  const svg = element('svg', {
    viewBox: `${x - pad} ${y - pad} ${w + 2 * pad} ${h + 2 * pad}`,
    preserveAspectRatio: 'xMidYMid meet',
  })
  container.appendChild(svg)
  let groups = []
  let currentSegment = -1
  let currentOrder = ''

  const build = (pieces) => {
    svg.replaceChildren()
    groups = pieces.map((piece) => {
      const id = `clip-${clipCount++}`
      const points = []
      for (let i = 0; i < piece.p.length; i += 2) points.push(`${piece.p[i]},${piece.p[i + 1]}`)
      const g = element('g')
      const clip = element('clipPath', { id })
      clip.appendChild(element('polygon', { points: points.join(' ') }))
      const paper = element('use', { href: '#paper', 'clip-path': `url(#${id})` })
      const back = element('use', { href: '#paper-back', 'clip-path': `url(#${id})` })
      const face = element('polygon', {
        points: points.join(' '),
        stroke: 'rgba(0,0,0,0.28)',
        'stroke-width': '0.18',
        'stroke-linejoin': 'round',
      })
      g.append(clip, paper, back, face)
      if (piece.f) {
        let d = ''
        for (let i = 0; i < piece.f.length; i += 4)
          d += `M${piece.f[i]} ${piece.f[i + 1]}L${piece.f[i + 2]} ${piece.f[i + 3]}`
        g.append(
          element('path', {
            d,
            stroke: ACTIVE_FOLD,
            'stroke-width': '0.55',
            'stroke-linecap': 'round',
            fill: 'none',
          }),
        )
      }
      return { piece, g, paper, back, face }
    })
  }

  const render = (segmentIndex, t) => {
    if (segmentIndex !== currentSegment) {
      build(segments[segmentIndex])
      currentSegment = segmentIndex
      currentOrder = ''
    }
    const eased = ease(t)
    for (const item of groups) {
      const m = compose(view, lerp(item.piece.a, item.piece.b, eased))
      const det = m[0] * m[3] - m[1] * m[2]
      item.g.setAttribute('transform', `matrix(${m.map((v) => v.toFixed(4)).join(' ')})`)
      item.g.style.display = Math.abs(det) < 1e-4 ? 'none' : ''
      const tilt = 1 - Math.min(1, Math.abs(det))
      item.paper.style.display = det > 0 ? '' : 'none'
      item.back.style.display = det > 0 ? 'none' : ''
      item.face.setAttribute('fill', '#000')
      item.face.setAttribute('fill-opacity', (tilt * 0.5).toFixed(3))
      item.z = eased < 0.5 ? item.piece.za : item.piece.zb
    }
    const ordered = [...groups].sort((a, b) => (reverseLayers ? b.z - a.z : a.z - b.z))
    const order = ordered.map((item) => groups.indexOf(item)).join(',')
    if (order !== currentOrder) {
      for (const item of ordered) svg.appendChild(item.g)
      currentOrder = order
    }
  }

  return { render }
}

const players = []

const createPlayer = ({ container, step, button }) => {
  const box = step.zoom
    ? [step.zoom[0], step.zoom[1], step.zoom[2] - step.zoom[0], step.zoom[3] - step.zoom[1]]
    : undefined
  const scene = createScene({ container, segments: step.segments, box })
  const count = step.segments.length
  const cycle = count * (SEGMENT_MS + PAUSE_MS) + END_PAUSE_MS
  let elapsed = reducedMotion ? cycle - 1 : 0
  let playing = !reducedMotion
  let visible = false
  let last = null

  const draw = () => {
    const time = elapsed % cycle
    const index = Math.min(count - 1, Math.floor(time / (SEGMENT_MS + PAUSE_MS)))
    const within = time - index * (SEGMENT_MS + PAUSE_MS)
    scene.render(index, Math.min(1, within / SEGMENT_MS))
  }

  const tick = (now) => {
    if (!playing || !visible) {
      last = null
      return
    }
    if (last !== null) elapsed += now - last
    last = now
    draw()
    requestAnimationFrame(tick)
  }

  const setPlaying = (value) => {
    playing = value
    button.textContent = playing ? 'Pause' : 'Play'
    button.setAttribute('aria-pressed', String(!playing))
    if (playing) requestAnimationFrame(tick)
  }

  button.addEventListener('click', () => setPlaying(!playing))
  setPlaying(playing)
  draw()

  return {
    container,
    setVisible(value) {
      visible = value
      if (visible && playing) requestAnimationFrame(tick)
    },
  }
}

document.querySelectorAll('.stage[data-step]').forEach((container) => {
  const index = Number(container.dataset.step)
  const button = document.querySelector(`.toggle[data-step="${index}"]`)
  players.push(createPlayer({ container, step: STEPS[index], button }))
})

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const player = players.find((p) => p.container === entry.target)
    if (player) player.setVisible(entry.isIntersecting)
  }
})
players.forEach((player) => observer.observe(player.container))

const finished = STEPS[STEPS.length - 1].segments.at(-1)
document.querySelectorAll('.stage[data-final]').forEach((container) => {
  const back = container.dataset.final === 'back'
  const scene = createScene({
    container,
    segments: [finished],
    view: back ? [-1, 0, 0, 1, 0, 0] : [1, 0, 0, 1, 0, 0],
    reverseLayers: back,
  })
  scene.render(0, 1)
})
