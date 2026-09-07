/**
 * Rewrites one section's visual in a video definition.
 *
 * The definitions are hand-authored and full of comments that explain why a beat looks the way it
 * does, so this replaces exactly two things — the provenance comment and the `gif(...)` call — and
 * leaves every other character in the file alone. Nothing here parses TypeScript: a definition is
 * a literal with one section per `{` block, and a targeted replacement is both simpler to reason
 * about and impossible to reformat the rest of the file with.
 */

const LIMIT = 100

export type AppliedVisual = {
  src: string
  color?: string
  playbackRate?: number
}

export type Provenance = {
  /** The search that found it, quoted into the comment. */
  search: string
  /** The gif's page on whichever provider served it. */
  url: string
}

/** Giphy or klipy, taken from the URL — a klipy id at giphy.com is somebody else's gif. */
const providerOf = ({ url }: { url: string }): string => {
  const host = url.replace(/^https?:\/\//, '').split('/')[0] ?? url
  const labels = host.split('.')
  return labels[labels.length - 2] ?? host
}

/**
 * Which quote a definition writes its strings with. Four of them are double-quoted throughout and
 * the rest single-quoted; writing the wrong one leaves a file that prettier would rewrite whole.
 */
const quoteOf = ({ source }: { source: string }): string =>
  (source.match(/src: "/g) ?? []).length > (source.match(/src: '/g) ?? []).length ? '"' : "'"

/**
 * `place` comes last, as `pick.py` prints it. The order is not cosmetic: every definition in the
 * repo reads src, colour, rate, place, and a diff that reorders fields hides what changed.
 */
const fieldsOf = ({ visual, quote }: { visual: AppliedVisual; quote: string }): string[] => [
  `src: ${quote}${visual.src}${quote}`,
  ...(visual.color === undefined ? [] : [`color: ${quote}${visual.color}${quote}`]),
  ...(visual.playbackRate === undefined || visual.playbackRate === 1
    ? []
    : [`playbackRate: ${String(visual.playbackRate)}`]),
  `place: ${quote}above-captions${quote}`,
]

const callFor = ({
  visual,
  indent,
  quote,
}: {
  visual: AppliedVisual
  indent: string
  quote: string
}): string => {
  const fields = fieldsOf({ visual, quote })
  const oneLine = `${indent}visual: gif({ ${fields.join(', ')} }),`
  if (oneLine.length <= LIMIT) {
    return oneLine
  }
  return [
    `${indent}visual: gif({`,
    ...fields.map((field) => `${indent}  ${field},`),
    `${indent}}),`,
  ].join('\n')
}

/** The `{` blocks of the sections array, in section order. */
const sectionBlocks = ({ source }: { source: string }): { start: number; end: number }[] => {
  const blocks: { start: number; end: number }[] = []
  const opening = /\n {4}\{\n/g
  let match = opening.exec(source)
  while (match !== null) {
    const start = match.index + 1
    const closing = source.indexOf('\n    },\n', start)
    blocks.push({ start, end: closing === -1 ? source.length : closing + 1 })
    match = opening.exec(source)
  }
  return blocks
}

export const withVisualApplied = ({
  source,
  section,
  visual,
  provenance,
}: {
  source: string
  section: number
  visual: AppliedVisual
  provenance: Provenance
}): string => {
  const block = sectionBlocks({ source })[section]
  if (block === undefined) {
    throw new Error(
      `This definition has no section ${section}, so there is nothing to apply the visual to.`,
    )
  }

  const original = source.slice(block.start, block.end)
  const indentMatch = /^(\s*)visual: gif\(/m.exec(original)
  if (indentMatch === null) {
    throw new Error(`Section ${section} has no gif to replace.`)
  }
  const indent = indentMatch[1] ?? ''

  // The whole call, whether it was written on one line or as a block.
  const replaced = original.replace(
    /^\s*visual: gif\(\{[^}]*\}\),$/m,
    callFor({ visual, indent, quote: quoteOf({ source }) }),
  )

  const comment = `${indent}// ${providerOf(provenance)} "${provenance.search}": ${provenance.url}`
  const withComment = /^\s*\/\/ \w+ "[^"]*": http.*$/m.test(replaced)
    ? replaced.replace(/^\s*\/\/ \w+ "[^"]*": http.*$/m, comment)
    : replaced.replace(/^(\s*)(text: )/m, `${comment}\n$1$2`)

  return source.slice(0, block.start) + withComment + source.slice(block.end)
}
