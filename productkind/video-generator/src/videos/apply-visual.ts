import type { VisualSource } from '../narration/definition'
import { isProvider } from '../narration/definition'

/**
 * Reads and rewrites one section's visual in a video definition.
 *
 * The definitions are hand-authored and full of comments that explain why a beat looks the way it
 * does, so a rewrite replaces the `gif(...)` call and nothing else, and only deletes a comment
 * when that comment was a machine record — a provenance line — now that the same facts live in
 * the call as data. Notes stay.
 *
 * Nothing here parses TypeScript: a definition is a literal with one section per `{` block, and a
 * targeted replacement is both simpler to reason about and impossible to reformat the file with.
 */

const LIMIT = 100

export type AppliedVisual = {
  src: string
  color?: string
  playbackRate?: number
  source?: VisualSource
}

/** The old shape: a provider, a search and a URL, written as a comment above the line. */
export type Provenance = { provider: string; search: string; url?: string }

export type ReadVisual = {
  index: number
  src: string
  color?: string
  playbackRate?: number
  provenance?: Provenance
}

/**
 * A provenance comment: a record rather than a note, so it can be replaced by data.
 *
 * Two shapes are in the campaign. Giphy records fit the url beside the search; every klipy record
 * wrapped it onto the next comment line, because a klipy url is long. Both are one record and both
 * are removed whole.
 */
const PROVENANCE =
  /^[ \t]*\/\/ (\w+) "([^"]*)":[ \t]*(?:(https?:\/\/[^\s'")]+)[ \t]*\n|\n[ \t]*\/\/[ \t]*(https?:\/\/[^\s'")]+)[ \t]*\n)/m

/**
 * The same record with a note where the url should be. Forty sections read this way, and the note
 * is the only place that reasoning exists — so this one is read but never removed.
 */
const PROVENANCE_WITHOUT_URL = /^[ \t]*\/\/ (\w+) "([^"]*)":[ \t]*(?!https?:)\S/m
const SRC = /src: (["'])([^"']+)\1/
const COLOUR = /color: (["'])([^"']+)\1/
const RATE = /playbackRate: ([\d.]+)/

/** Which quote a definition writes its strings with; four are double-quoted, the rest single. */
const quoteOf = ({ source }: { source: string }): string =>
  (source.match(/src: "/g) ?? []).length > (source.match(/src: '/g) ?? []).length ? '"' : "'"

const quoted = ({ value, quote }: { value: string; quote: string }): string =>
  `${quote}${value.split(quote).join(`\\${quote}`)}${quote}`

/**
 * `place` comes last, as every definition already reads: src, source, colour, rate, place. The
 * order is not cosmetic — a diff that reorders fields hides what actually changed.
 */
const fieldsOf = ({ visual, quote }: { visual: AppliedVisual; quote: string }): string[] => [
  `src: ${quoted({ value: visual.src, quote })}`,
  ...(visual.source === undefined
    ? []
    : [
        `source: { provider: ${quoted({ value: visual.source.provider, quote })}, ` +
          (visual.source.id === undefined
            ? ''
            : `id: ${quoted({ value: visual.source.id, quote })}, `) +
          `search: ${quoted({ value: visual.source.search, quote })} }`,
      ]),
  ...(visual.color === undefined ? [] : [`color: ${quoted({ value: visual.color, quote })}`]),
  ...(visual.playbackRate === undefined || visual.playbackRate === 1
    ? []
    : [`playbackRate: ${String(visual.playbackRate)}`]),
  `place: ${quoted({ value: 'above-captions', quote })}`,
]

/** A field too long for its own line is broken across the object it describes. */
const spread = ({ field, indent }: { field: string; indent: string }): string[] => {
  const inner = /^(\w+): \{ (.*) \}$/.exec(field)
  if (inner === null || `${indent}  ${field},`.length <= LIMIT) {
    return [`${indent}  ${field},`]
  }
  return [
    `${indent}  ${inner[1] ?? ''}: {`,
    ...(inner[2] ?? '').split(', ').map((part) => `${indent}    ${part},`),
    `${indent}  },`,
  ]
}

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
    ...fields.flatMap((field) => spread({ field, indent })),
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

export const readVisuals = ({ source }: { source: string }): ReadVisual[] =>
  sectionBlocks({ source })
    .map((block) => source.slice(block.start, block.end))
    .flatMap((block) => {
      const src = SRC.exec(block)
      if (src === null) {
        return []
      }
      const colour = COLOUR.exec(block)
      const rate = RATE.exec(block)
      const recorded = PROVENANCE.exec(block)
      const noted = recorded === null ? PROVENANCE_WITHOUT_URL.exec(block) : null
      const provenance =
        recorded !== null
          ? {
              provider: recorded[1] ?? '',
              search: recorded[2] ?? '',
              url: recorded[3] ?? recorded[4] ?? '',
            }
          : noted !== null
            ? { provider: noted[1] ?? '', search: noted[2] ?? '' }
            : undefined
      return [
        {
          src: src[2] ?? '',
          ...(colour === null ? {} : { color: colour[2] ?? '' }),
          ...(rate === null ? {} : { playbackRate: Number(rate[1]) }),
          ...(provenance === undefined ? {} : { provenance }),
        },
      ]
    })
    .map((visual, index) => ({ index, ...visual }))

export const withVisualApplied = ({
  source,
  section,
  visual,
}: {
  source: string
  section: number
  visual: AppliedVisual
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
    /^\s*visual: gif\(\{[^}]*\}\),$|^\s*visual: gif\(\{(?:[^}]|\}(?!\),))*\}\),$/m,
    callFor({ visual, indent, quote: quoteOf({ source }) }),
  )

  return (
    source.slice(0, block.start) +
    // The record the data replaces. A note is left exactly where it was.
    replaced.replace(PROVENANCE, '') +
    source.slice(block.end)
  )
}

const GIPHY_ID = /giphy\.com\/gifs\/([A-Za-z0-9]+)/

/**
 * The source a provenance comment was recording, or null when its id cannot be known.
 *
 * Only a giphy url carries its id. Everything harvested elsewhere was recorded by the harvest in
 * a mapping of id to url, which is where a klipy id comes back from — and that mapping lives in a
 * temporary folder, so a record not resolved before it is cleared is lost for good.
 */
export const sourceFor = ({
  provenance,
  byUrl,
}: {
  provenance: Provenance
  byUrl: Record<string, string>
}): VisualSource | null => {
  if (!isProvider(provenance.provider)) {
    return null
  }
  if (provenance.url === undefined) {
    // Provider and search are all that was ever written down. Recorded without an id rather than
    // left in prose, and never with an invented one.
    return { provider: provenance.provider, search: provenance.search }
  }
  const url = provenance.url
  const id = provenance.provider === 'giphy' ? GIPHY_ID.exec(url)?.[1] : byUrl[url]
  return id === undefined
    ? null
    : { provider: provenance.provider, id, search: provenance.search }
}
