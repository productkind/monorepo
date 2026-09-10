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

/**
 * Where a visual sits. Carried across a kind change, because the two kinds are placed differently
 * in practice: every gif in the repo sits above the captions, and stock clips fill the frame.
 * Writing the wrong one moves the picture.
 */
export type Place = 'frame' | 'above-captions'

export type AppliedVisual =
  | {
      kind: 'gif'
      src: string
      place?: Place
      color?: string
      playbackRate?: number
      source?: VisualSource
    }
  | {
      kind: 'clip'
      src: string
      place?: Place
      /** The frame the clip starts on, when it was trimmed in the definition rather than on disk. */
      trimBefore?: number
      source?: VisualSource
    }

/** The old shape: a provider, a search, sometimes an author, and a URL, written as a comment. */
export type Provenance = { provider: string; search: string; author?: string; url?: string }

/** Which visual a section holds. A gif and a clip are not interchangeable. */
export type VisualKind = 'gif' | 'clip' | 'still'

export type ReadVisual = {
  index: number
  kind: VisualKind
  src: string
  /** Absent means the whole frame, which is what `place` defaults to. */
  place?: string
  color?: string
  playbackRate?: number
  trimBefore?: number
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
  /^[ \t]*\/\/ (\w+) "([^"]*)"(?: by ([^:]+))?:[ \t]*(?:(https?:\/\/[^\s'")]+)[ \t]*\n|\n[ \t]*\/\/[ \t]*(https?:\/\/[^\s'")]+)[ \t]*\n)/m

/**
 * The same record with a note where the url should be. Forty sections read this way, and the note
 * is the only place that reasoning exists — so this one is read but never removed.
 */
const PROVENANCE_WITHOUT_URL = /^[ \t]*\/\/ (\w+) "([^"]*)"(?: by ([^:]+))?:[ \t]*(?!https?:)\S/m
const SRC = /src: (["'])([^"']+)\1/
const COLOUR = /color: (["'])([^"']+)\1/
const RATE = /playbackRate: ([\d.]+)/
const TRIM = /trimBefore: (\d+)/
const PLACE = /place: (["'])([a-z-]+)\1/
const KIND = /visual: (gif|clip|still)\(/

/** Which quote a definition writes its strings with; four are double-quoted, the rest single. */
const quoteOf = ({ source }: { source: string }): string =>
  (source.match(/src: "/g) ?? []).length > (source.match(/src: '/g) ?? []).length ? '"' : "'"

const quoted = ({ value, quote }: { value: string; quote: string }): string =>
  `${quote}${value.split(quote).join(`\\${quote}`)}${quote}`

/**
 * `place` comes last, as every definition already reads: src, source, colour, rate, place. The
 * order is not cosmetic — a diff that reorders fields hides what actually changed.
 */
const sourceField = ({ source, quote }: { source: VisualSource; quote: string }): string =>
  `source: { provider: ${quoted({ value: source.provider, quote })}, ` +
  (source.id === undefined ? '' : `id: ${quoted({ value: source.id, quote })}, `) +
  `search: ${quoted({ value: source.search, quote })}` +
  (source.author === undefined ? '' : `, author: ${quoted({ value: source.author, quote })}`) +
  ' }'

/**
 * The fields a visual is written with, in the order every definition already reads them.
 *
 * Keyed by kind rather than switched on: a clip has an in-point where a gif has a rate and a
 * letterbox, and writing one as the other would turn a six-second clip into a still frame.
 */
/** Nothing is written for the whole frame, because that is what `place` already defaults to. */
const placeField = ({ place, quote }: { place: Place | undefined; quote: string }): string[] =>
  place === undefined || place === 'frame' ? [] : [`place: ${quoted({ value: place, quote })}`]

const FIELDS: {
  [KIND in AppliedVisual['kind']]: (options: {
    visual: Extract<AppliedVisual, { kind: KIND }>
    quote: string
  }) => string[]
} = {
  gif: ({ visual, quote }) => [
    `src: ${quoted({ value: visual.src, quote })}`,
    ...(visual.source === undefined ? [] : [sourceField({ source: visual.source, quote })]),
    ...(visual.color === undefined ? [] : [`color: ${quoted({ value: visual.color, quote })}`]),
    ...(visual.playbackRate === undefined || visual.playbackRate === 1
      ? []
      : [`playbackRate: ${String(visual.playbackRate)}`]),
    ...placeField({ place: visual.place, quote }),
  ],
  // A clip is trimmed on disk to its beat rather than played at a rate.
  clip: ({ visual, quote }) => [
    `src: ${quoted({ value: visual.src, quote })}`,
    ...(visual.source === undefined ? [] : [sourceField({ source: visual.source, quote })]),
    ...(visual.trimBefore === undefined || visual.trimBefore === 0
      ? []
      : [`trimBefore: ${String(visual.trimBefore)}`]),
    ...placeField({ place: visual.place, quote }),
  ],
}

const fieldsOf = <KIND extends AppliedVisual['kind']>({
  visual,
  quote,
}: {
  visual: Extract<AppliedVisual, { kind: KIND }>
  quote: string
}): string[] => FIELDS[visual.kind]({ visual, quote })

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
  const oneLine = `${indent}visual: ${visual.kind}({ ${fields.join(', ')} }),`
  if (oneLine.length <= LIMIT) {
    return oneLine
  }
  return [
    `${indent}visual: ${visual.kind}({`,
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
      const kind = KIND.exec(block)
      if (src === null || kind === null) {
        return []
      }
      const colour = COLOUR.exec(block)
      const rate = RATE.exec(block)
      const trim = TRIM.exec(block)
      const place = PLACE.exec(block)
      const recorded = PROVENANCE.exec(block)
      const noted = recorded === null ? PROVENANCE_WITHOUT_URL.exec(block) : null
      const provenance =
        recorded !== null
          ? {
              provider: recorded[1] ?? '',
              search: recorded[2] ?? '',
              ...(recorded[3] === undefined ? {} : { author: recorded[3].trim() }),
              url: recorded[4] ?? recorded[5] ?? '',
            }
          : noted !== null
            ? {
                provider: noted[1] ?? '',
                search: noted[2] ?? '',
                ...(noted[3] === undefined ? {} : { author: noted[3].trim() }),
              }
            : undefined
      return [
        {
          kind: kindOf({ name: kind[1] ?? 'gif' }),
          src: src[2] ?? '',
          ...(place === null ? {} : { place: place[2] ?? '' }),
          ...(colour === null ? {} : { color: colour[2] ?? '' }),
          ...(rate === null ? {} : { playbackRate: Number(rate[1]) }),
          ...(trim === null ? {} : { trimBefore: Number(trim[1]) }),
          ...(provenance === undefined ? {} : { provenance }),
        },
      ]
    })
    .map((visual, index) => ({ index, ...visual }))

const IMPORT = /^import \{ ([^}]+) \} from (["'])\.\.\/narration\/definition\2/m

/**
 * The definition's import, with the factory this visual needs in it.
 *
 * A section that changes kind calls a factory the file may never have imported, and the video
 * then fails to render with `clip is not defined` — which is how this was found. Names stay in
 * the alphabetical order every definition already keeps them in.
 */
const withFactoryImported = ({
  source,
  kind,
}: {
  source: string
  kind: AppliedVisual['kind']
}): string => {
  const line = IMPORT.exec(source)
  if (line === null) {
    return source
  }
  const names = (line[1] ?? '').split(',').map((name) => name.trim())
  if (names.includes(kind)) {
    return source
  }
  const quote = line[2] ?? "'"
  const sorted = [...names, kind].sort((left, right) => left.localeCompare(right))
  return source.replace(
    line[0],
    `import { ${sorted.join(', ')} } from ${quote}../narration/definition${quote}`,
  )
}

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
  const indentMatch = /^(\s*)visual: (?:gif|clip|still)\(/m.exec(original)
  if (indentMatch === null) {
    throw new Error(`Section ${section} has no visual to replace.`)
  }
  const indent = indentMatch[1] ?? ''

  // The whole call, whether it was written on one line or as a block, and whatever kind it is.
  const replaced = original.replace(
    /^\s*visual: (?:gif|clip|still)\(\{(?:[^}]|\}(?!\),))*\}\),$/m,
    callFor({ visual, indent, quote: quoteOf({ source }) }),
  )

  const written =
    source.slice(0, block.start) +
    // The record the data replaces. A note is left exactly where it was.
    replaced.replace(PROVENANCE, '') +
    source.slice(block.end)

  return withFactoryImported({ source: written, kind: visual.kind })
}

const GIPHY_ID = /giphy\.com\/gifs\/([A-Za-z0-9]+)/
/** Pexels and pixabay put the id at the end of a slugged url. */
const TRAILING_ID = /-(\d+)\/?$/

const VISUAL_KINDS: VisualKind[] = ['gif', 'clip', 'still']

const kindOf = ({ name }: { name: string }): VisualKind =>
  VISUAL_KINDS.find((kind) => kind === name) ?? 'gif'

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
    return {
      provider: provenance.provider,
      search: provenance.search,
      ...(provenance.author === undefined ? {} : { author: provenance.author }),
    }
  }
  const url = provenance.url
  const id =
    provenance.provider === 'giphy'
      ? GIPHY_ID.exec(url)?.[1]
      : (TRAILING_ID.exec(url)?.[1] ?? byUrl[url])
  return id === undefined
    ? null
    : {
        provider: provenance.provider,
        id,
        search: provenance.search,
        ...(provenance.author === undefined ? {} : { author: provenance.author }),
      }
}
