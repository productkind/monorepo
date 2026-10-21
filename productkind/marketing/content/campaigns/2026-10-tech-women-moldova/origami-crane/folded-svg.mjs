import { foldedPolygon, isPrintedSideUp } from './origami.mjs'

const format = (n) => Number(n.toFixed(3))
const points = (poly) => poly.map((p) => p.map(format).join(',')).join(' ')

export const foldedSvg = ({
  facets,
  base,
  decals,
  side = 'front',
  pixelsPerMm = 10,
  background = '#1d2433',
}) => {
  const all = facets.flatMap(foldedPolygon)
  const xs = all.map((p) => p[0])
  const ys = all.map((p) => p[1])
  const pad = 4
  const minX = Math.min(...xs) - pad
  const minY = Math.min(...ys) - pad
  const w = Math.max(...xs) - Math.min(...xs) + 2 * pad
  const h = Math.max(...ys) - Math.min(...ys) + 2 * pad
  const ordered = [...facets].sort((a, b) => (side === 'front' ? a.z - b.z : b.z - a.z))
  const body = ordered
    .map((f) => {
      const printed = side === 'front' ? isPrintedSideUp(f) : !isPrintedSideUp(f)
      const m = f.m.map(format).join(' ')
      const outline = `<polygon points="${points(f.poly)}" fill="none" stroke="#00000055" stroke-width="0.12"/>`
      if (!printed)
        return `<g transform="matrix(${m})"><polygon points="${points(f.poly)}" fill="#f4f1ea"/>${outline}</g>`
      return `<g transform="matrix(${m})"><clipPath id="c${f.id}"><polygon points="${points(f.poly)}"/></clipPath><g clip-path="url(#c${f.id})"><use href="#design"/></g>${outline}</g>`
    })
    .join('\n')
  const flip = side === 'back' ? `transform="translate(${format(2 * minX + w)} 0) scale(-1 1)"` : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${format(minX)} ${format(minY)} ${format(w)} ${format(h)}" width="${Math.round(w * pixelsPerMm)}" height="${Math.round(h * pixelsPerMm)}">
<defs><g id="design">${base}${decals}</g></defs>
${background ? `<rect x="${format(minX)}" y="${format(minY)}" width="${format(w)}" height="${format(h)}" fill="${background}"/>` : ''}
<g ${flip}>${body}</g></svg>`
}
