import type { Fit, ProviderItem } from './types.ts'

import { z } from 'zod'

/**
 * Everything the desk decides, with no filesystem, no network and no subprocess in sight.
 *
 * These are ports of the sourcing engine's rules, and the numbers in them are not arbitrary: each
 * one came from a defect in a real video, and the comments say which.
 */

/** Squarish, because anything wider renders as a thin band between the platform bar and captions. */
const ASPECT = { least: 0.7, most: 1.5 }

/** Under this it cannot hold the frame's width at 1080. */
const MIN_WIDTH = 380

/** Slowing a gif below this reads as slow motion rather than as a gif filling its beat. */
const SLOW_FLOOR = 0.6

/** A flat background has to cover this much of the border ring to be worth letterboxing to. */
const UNIFORM_EDGE = 0.9

/** Palette dithering shifts a flat colour a few levels, so exact equality would reject it. */
const EDGE_TOLERANCE = 10

/** The catalogues gifs come from. Their ids are not interchangeable. */
export const PROVIDERS = ['giphy', 'klipy'] as const

export type Provider = (typeof PROVIDERS)[number]

/** Narrows a provider name from outside the code, falling back rather than asserting. */
export const providerFrom = ({ name }: { name: string }): Provider =>
  PROVIDERS.find((provider) => provider === name) ?? 'giphy'

/** Giphy allows this many searches per key per hour, resetting on the hour. */
const SEARCHES_PER_HOUR = 100

const skipSubBlocks = ({ bytes, from }: { bytes: Uint8Array; from: number }): number => {
  let at = from
  while (at < bytes.length && bytes[at] !== 0) {
    at += (bytes[at] ?? 0) + 1
  }
  return at + 1
}

const colourTableSize = ({ packed }: { packed: number }): number =>
  (packed & 0x80) === 0 ? 0 : 3 * 2 ** ((packed & 0x07) + 1)

/**
 * Every frame delay in a gif, in hundredths of a second.
 *
 * The blocks are walked properly rather than scanned for the control-extension marker, because
 * that byte sequence occurs inside compressed image data too, and a false hit would add a frame
 * that does not exist — and every fit in the desk is calculated from this number.
 */
const frameDelays = ({ bytes }: { bytes: Uint8Array }): number[] => {
  const delays: number[] = []
  let at = 13 + colourTableSize({ packed: bytes[10] ?? 0 })

  while (at < bytes.length) {
    const marker = bytes[at]
    if (marker === 0x3b || marker === undefined) {
      break
    }
    if (marker === 0x21) {
      const label = bytes[at + 1]
      if (label === 0xf9) {
        // 0x21 0xF9, then the block size, then the packed field: the delay is the two bytes after
        // that, little-endian.
        delays.push((bytes[at + 4] ?? 0) | ((bytes[at + 5] ?? 0) << 8))
      }
      at = skipSubBlocks({ bytes, from: at + 2 })
      continue
    }
    if (marker === 0x2c) {
      const local = bytes[at + 9] ?? 0
      // The descriptor, then any local colour table, then the LZW minimum code size.
      at = skipSubBlocks({
        bytes,
        from: at + 10 + colourTableSize({ packed: local }) + 1,
      })
      continue
    }
    break
  }
  return delays
}

export const gifDurationInSeconds = ({ bytes }: { bytes: Uint8Array }): number => {
  const delays = frameDelays({ bytes })
  // A gif that declares 0 is rendered at 100ms by browsers, so it counts as 10 hundredths here.
  return delays.reduce((total, delay) => total + (delay === 0 ? 10 : delay), 0) / 100
}

export const gifFrameCount = ({ bytes }: { bytes: Uint8Array }): number =>
  frameDelays({ bytes }).length

export const gifSize = ({ bytes }: { bytes: Uint8Array }): { width: number; height: number } => ({
  width: (bytes[6] ?? 0) | ((bytes[7] ?? 0) << 8),
  height: (bytes[8] ?? 0) | ((bytes[9] ?? 0) << 8),
})

/**
 * How to fit a gif to a slot, as a rate and the sentence explaining it.
 *
 * The house preference is a slowdown, never a held last frame: `pause-after-finish` freezes the
 * picture and reads as a stall in the middle of a video where everything else keeps moving.
 */
export const fitAdvice = ({ seconds, slot }: { seconds: number; slot: number }): Fit => {
  if (seconds >= slot) {
    return {
      rate: null,
      why:
        `${(100 * (seconds / slot)).toFixed(0)}% of the gif plays before the cut. If the motion ` +
        `has to finish (a drawing, a build, a reveal), speed it up with playbackRate: ` +
        `${(seconds / slot).toFixed(2)}`,
    }
  }
  const rate = Math.round((seconds / slot) * 100) / 100
  const repeats = slot / seconds
  if (rate >= SLOW_FLOOR) {
    return {
      rate,
      why: `repeats ${repeats.toFixed(2)}x at full speed; at ${String(rate)} it covers the beat in a single pass`,
    }
  }
  return {
    rate: null,
    why:
      `repeats ${repeats.toFixed(1)}x and slowing it to ${String(rate)} would look like slow ` +
      'motion; let it loop if the motion is cyclic, otherwise pick another gif',
  }
}

export const repeatsIn = ({
  slot,
  seconds,
  playbackRate,
}: {
  slot: number | null
  seconds: number | null
  playbackRate: number | null
}): number | null =>
  slot === null || seconds === null || seconds === 0 ? null : slot / (seconds / (playbackRate ?? 1))

export const keepThatFitTheFrame = ({
  items,
  skip = [],
}: {
  items: ProviderItem[]
  skip?: string[]
}): ProviderItem[] => {
  const rejected = new Set(skip)
  const seen = new Set<string>()
  return items.filter((item) => {
    const aspect = item.width / item.height
    if (rejected.has(item.id) || seen.has(item.id)) {
      return false
    }
    seen.add(item.id)
    return aspect > ASPECT.least && aspect < ASPECT.most && item.width >= MIN_WIDTH
  })
}

export type HistogramEntry = { rgba: readonly [number, number, number, number]; count: number }

const hex = ({ rgb }: { rgb: readonly number[] }): string =>
  `#${rgb
    .slice(0, 3)
    .map((channel) => channel.toString(16).padStart(2, '0'))
    .join('')}`

/**
 * The flat colour a gif sits on, or null when it does not sit on one.
 *
 * A gif with a solid background renders with a visible seam where its edge meets the house
 * letterbox, and the fix is to letterbox in the gif's own colour. Reading the whole border ring is
 * what makes it safe to act on unasked: a photograph never covers 90% of its own border with one
 * colour. What that misses is the awkward middle — a white card whose artwork bleeds off one edge
 * scores about 0.78 — and those are left alone rather than guessed at.
 */
export const edgeColourOf = ({
  histogram,
}: {
  histogram: HistogramEntry[]
}): { colour: string; coverage: number } | null => {
  if (histogram.length === 0) {
    return null
  }
  const total = histogram.reduce((sum, entry) => sum + entry.count, 0)
  const mode = histogram.reduce((best, entry) => (entry.count > best.count ? entry : best))
  // A transparent edge composites onto whatever is behind it, so there is no seam to remove.
  if (mode.rgba[3] < 250) {
    return null
  }
  const near = histogram
    .filter(
      (entry) =>
        Math.max(
          ...[0, 1, 2].map((channel) =>
            Math.abs((entry.rgba[channel] ?? 0) - (mode.rgba[channel] ?? 0)),
          ),
        ) <= EDGE_TOLERANCE,
    )
    .reduce((sum, entry) => sum + entry.count, 0)
  const coverage = near / total
  return coverage < UNIFORM_EDGE ? null : { colour: hex({ rgb: mode.rgba }), coverage }
}

const SECTION_SPLIT = '    {\n'
/**
 * The narration expression, up to the visual that follows it.
 *
 * A line is sometimes written as a concatenation across several lines, and a pattern that needs
 * the quote to sit right after `text:` skips those sections entirely — which shifts every index
 * after them, so a pick lands on a beat nobody chose.
 */
const TEXT = /text:\s*([\s\S]*?),?\n\s*(?:visual|endsParagraph):/
const QUOTED = /(["'])((?:[^\\]|\\.)*?)\1/g
const SRC = /src: (["'])([^"']+)\1/
const COLOUR = /color: (["'])([^"']+)\1/
const RATE = /playbackRate: ([\d.]+)/
/**
 * Where a gif came from, read from the definition's own data.
 *
 * It used to be read out of a provenance comment, which meant the id had to be re-derived from a
 * url and only giphy urls carried one. The fields are machine-written now, so this reads a shape
 * rather than prose.
 */
const KIND = /visual: (gif|clip|still)\(/
const PLACE = /place: (["'])([a-z-]+)\1/
const SOURCE = /source: \{([^}]*)\}/
const FIELD = (name: string) => new RegExp(`${name}: (["'])(.*?)\\1`)

export type ParsedSource = {
  provider: string
  /** Null for the sections whose record predates ids being kept. */
  id: string | null
  search: string
  /** Who made it, where the provider names them. Pexels asks for the credit. */
  author?: string
}

/** Which visual a section holds. A gif loops in a slot; a clip plays once and must outlast it. */
export const VISUAL_KINDS = ['gif', 'clip', 'still'] as const

/** Where it sits. Absent in a definition means the whole frame, which is what `place` defaults to. */
export const PLACES = ['frame', 'above-captions'] as const

export type Place = (typeof PLACES)[number]

const placeFrom = ({ name }: { name: string | undefined }): Place =>
  PLACES.find((place) => place === name) ?? 'frame'

export type VisualKind = (typeof VISUAL_KINDS)[number]

const kindFrom = ({ name }: { name: string }): VisualKind =>
  VISUAL_KINDS.find((kind) => kind === name) ?? 'gif'

export type ParsedSection = {
  index: number
  text: string
  kind: VisualKind
  /** Where the visual sits, so a pick that changes the kind can keep it there. */
  place: Place
  src: string
  color: string | null
  playbackRate: number | null
  source: ParsedSource | null
  /** The search that found the gif, which is what a re-source starts from. */
  search: string | null
}

/** The pieces of a quoted, possibly concatenated expression, joined back into one line. */
const textIn = ({ block }: { block: string }): string | null => {
  const found = TEXT.exec(block)
  if (found === null) {
    return null
  }
  const pieces = [...(found[1] ?? '').matchAll(QUOTED)].map((match) => match[2] ?? '')
  return pieces.length === 0 ? null : pieces.join('')
}

const sourceIn = ({ block }: { block: string }): ParsedSource | null => {
  const found = SOURCE.exec(block)
  if (found === null) {
    return null
  }
  const fields = found[1] ?? ''
  const provider = FIELD('provider').exec(fields)?.[2]
  const search = FIELD('search').exec(fields)?.[2]
  if (provider === undefined || search === undefined) {
    return null
  }
  const author = FIELD('author').exec(fields)?.[2]
  return {
    provider,
    id: FIELD('id').exec(fields)?.[2] ?? null,
    search,
    ...(author === undefined ? {} : { author }),
  }
}

/** The read-side twin of `apply-visual.ts`, which writes the same shape back. */
export const parseSections = ({ source }: { source: string }): ParsedSection[] =>
  source
    .split(SECTION_SPLIT)
    .slice(1)
    .flatMap((block) => {
      const src = SRC.exec(block)
      const text = textIn({ block })
      const kind = KIND.exec(block)
      if (src === null || text === null || kind === null) {
        return []
      }
      const place = PLACE.exec(block)
      const colour = COLOUR.exec(block)
      const rate = RATE.exec(block)
      const source = sourceIn({ block })
      return [
        {
          text,
          kind: kindFrom({ name: kind[1] ?? 'gif' }),
          place: placeFrom({ name: place?.[2] }),
          src: src[2] ?? '',
          color: colour?.[2] ?? null,
          playbackRate: rate?.[1] === undefined ? null : Number(rate[1]),
          source,
          search: source?.search ?? null,
        },
      ]
    })
    .map((section, index) => ({ index, ...section }))

/**
 * Every gif id the campaign already uses, and where.
 *
 * A campaign of eight videos will repeat a gif unless the sourcer is told what is taken — two of
 * video 7's picks repeated video 5 before this existed.
 */
export const usedIdsIn = ({
  definitions,
}: {
  definitions: { video: string; sections: { source: ParsedSource | null }[] }[]
}): Record<string, string[]> => {
  const used: Record<string, string[]> = {}
  for (const { video, sections } of definitions) {
    sections.forEach((section, index) => {
      const id = section.source?.id
      if (id === undefined || id === null) {
        return
      }
      const place = `${video}§${String(index).padStart(2, '0')}`
      used[id] = [...(used[id] ?? []), place]
    })
  }
  return used
}

export type ProviderState = {
  /** The hour these counts belong to, as `YYYY-MM-DDTHH`. */
  hour: string
  counts: Record<string, number>
  /** Keys retired for an hour after the provider said no. */
  cooling: Record<string, string>
}

/**
 * Which key to search with: the one with the fewest searches this hour.
 *
 * A full video sits right at the hourly ceiling, so spreading the load matters more than it looks.
 * A key that hit the cap or was retired is never retried inside the hour, and the counts are
 * forgotten when the hour turns, because that is when the provider forgets them too.
 */
export const chooseKey = ({
  keys,
  state,
  now = state.hour,
}: {
  keys: string[]
  state: ProviderState
  now?: string
}): string | null => {
  const current = state.hour === now ? state : { hour: now, counts: {}, cooling: {} }
  const usable = keys
    .filter((key) => current.cooling[key] !== now)
    .filter((key) => (current.counts[key] ?? 0) < SEARCHES_PER_HOUR)
    .sort((left, right) => (current.counts[left] ?? 0) - (current.counts[right] ?? 0))
  return usable[0] ?? null
}

export const sectionName = ({ term }: { term: string }): string =>
  term
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .slice(-2)
    .join('-') || 'gif'

const HISTOGRAM_LINE = /^\s*(\d+):\s*\(([^)]*)\)/
const RMSE = /\(([\d.eE+-]+)\)/

/**
 * ImageMagick's `%c` histogram, as colours and counts.
 *
 * Parsing its text rather than decoding the gif here is deliberate: ImageMagick already coalesces
 * frames and resolves palettes and transparency correctly, and a hand-rolled LZW decoder would be
 * a second implementation of the hardest part of the format.
 */
export const parseHistogram = ({ text }: { text: string }): HistogramEntry[] =>
  text.split('\n').flatMap((line) => {
    const match = HISTOGRAM_LINE.exec(line)
    if (match === null) {
      return []
    }
    const channels = (match[2] ?? '')
      .split(',')
      .map((channel) => Math.round(Number(channel.trim())))
      .filter((channel) => Number.isFinite(channel))
    if (channels.length < 3) {
      return []
    }
    // `-alpha off` prints three channels; a missing alpha means opaque, not transparent.
    const [red = 0, green = 0, blue = 0, alpha = 255] = channels
    return [{ rgba: [red, green, blue, alpha] as const, count: Number(match[1]) }]
  })

/** The normalised figure in `magick compare -metric RMSE` output, 0 to 1. */
export const parseRmse = ({ text }: { text: string }): number | null => {
  const match = RMSE.exec(text)
  return match?.[1] === undefined ? null : Number(match[1])
}

const GIPHY_SEARCH = 'https://api.giphy.com/v1/gifs/search'
const KLIPY_SEARCH = 'https://api.klipy.com/v2/search'

export const giphySearchUrl = ({
  key,
  term,
  limit,
}: {
  key: string
  term: string
  limit: number
}): string =>
  `${GIPHY_SEARCH}?api_key=${key}&q=${encodeURIComponent(term)}&limit=${String(limit)}&rating=g`

export const klipySearchUrl = ({
  key,
  term,
  limit,
}: {
  key: string
  term: string
  limit: number
}): string =>
  `${KLIPY_SEARCH}?key=${key}&q=${encodeURIComponent(term)}&limit=${String(limit)}&contentfilter=high`

const GIPHY_ITEM = z.object({
  id: z.string(),
  title: z.string().optional(),
  images: z.object({
    original: z.object({ width: z.string(), height: z.string() }).optional(),
    fixed_height: z.object({ url: z.string() }).optional(),
  }),
})

/** A giphy search payload as provider items. */
export const giphyItems = ({ payload }: { payload: unknown }): ProviderItem[] => {
  const parsed = z.object({ data: z.array(z.unknown()) }).safeParse(payload)
  if (!parsed.success) {
    return []
  }
  return parsed.data.data.flatMap((raw) => {
    const item = GIPHY_ITEM.safeParse(raw)
    const original = item.success ? item.data.images.original : undefined
    if (!item.success || original === undefined) {
      return []
    }
    // `fixed_height` keeps every frame, so its delays match the original's; the `_downsampled`
    // variants drop frames and would report a duration the shipped file does not have.
    const preview = item.data.images.fixed_height?.url
    return [
      {
        id: item.data.id,
        provider: 'giphy' as const,
        title: item.data.title ?? '',
        width: Number(original.width),
        height: Number(original.height),
        previewUrl: preview ?? `https://media.giphy.com/media/${item.data.id}/giphy.gif`,
        sourceUrl: `https://giphy.com/gifs/${item.data.id}`,
      },
    ]
  })
}

const KLIPY_FORMAT = z.object({ url: z.string(), dims: z.array(z.number()).optional() })
const KLIPY_ITEM = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string().optional(),
  content_description: z.string().optional(),
  media_formats: z.object({
    gif: KLIPY_FORMAT.optional(),
    mediumgif: KLIPY_FORMAT.optional(),
    tinygif: KLIPY_FORMAT.optional(),
  }),
})

/** Klipy is Tenor-shaped, and its gif url is the item's only real address. */
export const klipyItems = ({ payload }: { payload: unknown }): ProviderItem[] => {
  const parsed = z.object({ results: z.array(z.unknown()) }).safeParse(payload)
  if (!parsed.success) {
    return []
  }
  return parsed.data.results.flatMap((raw) => {
    const item = KLIPY_ITEM.safeParse(raw)
    if (!item.success) {
      return []
    }
    const { gif, mediumgif, tinygif } = item.data.media_formats
    const dims = gif?.dims
    if (gif === undefined || dims === undefined || dims.length < 2) {
      return []
    }
    return [
      {
        id: String(item.data.id),
        provider: 'klipy' as const,
        title: item.data.title ?? item.data.content_description ?? '',
        width: dims[0] ?? 0,
        height: dims[1] ?? 0,
        previewUrl: (mediumgif ?? tinygif ?? gif).url,
        sourceUrl: gif.url,
      },
    ]
  })
}

/**
 * How a stock clip sits against its beat.
 *
 * A clip has no playback rate and no loop, so the question is not how often it repeats but whether
 * it lasts: one that runs out holds a frozen frame while the captions keep moving. The pipeline
 * trims every clip to its beat plus a second for exactly that reason.
 */
export const clipFit = ({
  seconds,
  slot,
}: {
  seconds: number
  slot: number
}): { covers: boolean; headroom: number; why: string } => {
  const headroom = Math.round((seconds - slot) * 10) / 10
  return headroom >= 0
    ? {
        covers: true,
        headroom,
        why: `covers the ${slot.toFixed(1)}s beat with ${headroom.toFixed(1)}s to spare`,
      }
    : {
        covers: false,
        headroom,
        why:
          `runs out ${Math.abs(headroom).toFixed(1)}s before the beat ends and would hold a ` +
          'frozen frame; needs a longer clip',
      }
}

/** The frame the videos render at. A file already this size is scaled by nothing. */
export const FRAME = { width: 1080, height: 1920 }

/** A clip is trimmed to its beat plus this, so it cannot run out while the captions move. */
export const HEADROOM_SECONDS = 1

export type StockClip = {
  provider: 'pexels' | 'pixabay'
  id: string
  seconds: number
  author: string
  posterUrl: string
  sourceUrl: string
  /** The native 1080x1920 file. A clip without one is not a candidate. */
  downloadUrl: string
}

const PEXELS_SEARCH = 'https://api.pexels.com/videos/search'
const PIXABAY_SEARCH = 'https://pixabay.com/api/videos/'

export const pexelsSearchUrl = ({ term, limit }: { term: string; limit: number }): string =>
  `${PEXELS_SEARCH}?query=${encodeURIComponent(term)}&orientation=portrait&per_page=${String(limit)}`

export const pixabaySearchUrl = ({
  key,
  term,
  limit,
}: {
  key: string
  term: string
  limit: number
}): string => `${PIXABAY_SEARCH}?key=${key}&q=${encodeURIComponent(term)}&per_page=${String(limit)}`

const FILE = z.object({ width: z.number(), height: z.number() })

const PEXELS_VIDEO = z.object({
  id: z.number(),
  duration: z.number().optional(),
  url: z.string().optional(),
  image: z.string().optional(),
  user: z.object({ name: z.string() }).optional(),
  video_files: z.array(FILE.extend({ link: z.string() })).optional(),
})

/** Neither provider can filter by duration in a search, so it is carried through and filtered here. */
export const pexelsClips = ({ payload }: { payload: unknown }): StockClip[] => {
  const parsed = z.object({ videos: z.array(z.unknown()) }).safeParse(payload)
  if (!parsed.success) {
    return []
  }
  return parsed.data.videos.flatMap((raw) => {
    const video = PEXELS_VIDEO.safeParse(raw)
    if (!video.success) {
      return []
    }
    const exact = (video.data.video_files ?? []).find(
      (file) => file.width === FRAME.width && file.height === FRAME.height,
    )
    if (exact === undefined) {
      return []
    }
    return [
      {
        provider: 'pexels' as const,
        id: String(video.data.id),
        seconds: video.data.duration ?? 0,
        author: video.data.user?.name ?? '',
        posterUrl: video.data.image ?? '',
        sourceUrl: video.data.url ?? '',
        downloadUrl: exact.link,
      },
    ]
  })
}

const PIXABAY_HIT = z.object({
  id: z.number(),
  duration: z.number().optional(),
  pageURL: z.string().optional(),
  user: z.string().optional(),
  videos: z.record(z.string(), FILE.extend({ url: z.string() })).optional(),
})

/** Pixabay keys its files by size name rather than listing them, and cannot filter orientation. */
export const pixabayClips = ({ payload }: { payload: unknown }): StockClip[] => {
  const parsed = z.object({ hits: z.array(z.unknown()) }).safeParse(payload)
  if (!parsed.success) {
    return []
  }
  return parsed.data.hits.flatMap((raw) => {
    const hit = PIXABAY_HIT.safeParse(raw)
    if (!hit.success) {
      return []
    }
    const exact = Object.values(hit.data.videos ?? {}).find(
      (file) => file.width === FRAME.width && file.height === FRAME.height,
    )
    if (exact === undefined) {
      return []
    }
    return [
      {
        provider: 'pixabay' as const,
        id: String(hit.data.id),
        seconds: hit.data.duration ?? 0,
        author: hit.data.user ?? '',
        posterUrl: '',
        sourceUrl: hit.data.pageURL ?? '',
        downloadUrl: exact.url,
      },
    ]
  })
}

/**
 * The clips that can actually serve a beat, shortest usable first.
 *
 * Shortest first because everything past the beat plus its headroom is thrown away by the trim,
 * and a twenty-second clip downloaded to keep five seconds is a slow way to get the same frames.
 */
export const keepThatCoverTheBeat = ({
  items,
  slot,
  skip = [],
}: {
  items: StockClip[]
  slot: number
  skip?: string[]
}): StockClip[] => {
  const rejected = new Set(skip)
  return items
    .filter((item) => !rejected.has(item.id) && item.seconds >= slot + HEADROOM_SECONDS)
    .sort((left, right) => left.seconds - right.seconds)
}

/**
 * How many visuals the parser failed to account for.
 *
 * A section it cannot read is not a missing row: every index after it shifts, so a pick writes to
 * a different beat from the one chosen. That happened — two beats in the stock cut write their
 * narration as a concatenation across lines — so the count is checked rather than assumed.
 */
export const unreadSections = ({
  source,
  read,
}: {
  source: string
  read: ParsedSection[]
}): number => Math.max(0, (source.match(/^\s*visual: /gm) ?? []).length - read.length)

/** Where each kind sits by house convention: a gif above the captions, footage across the frame. */
const HOUSE_PLACE: Record<VisualKind, Place> = {
  gif: 'above-captions',
  clip: 'frame',
  still: 'above-captions',
}

/**
 * Where a pick should sit.
 *
 * Re-sourcing the same kind leaves a section exactly where it was, including any placement someone
 * chose deliberately. Changing the kind takes that kind's own treatment instead: a gif inheriting
 * a clip's full frame renders letterboxed with the captions across it, which is not how any gif in
 * the repo is placed.
 */
export const placeFor = ({
  was,
  now,
  place,
}: {
  was: VisualKind
  now: VisualKind
  place: Place
}): Place => (was === now ? place : HOUSE_PLACE[now])
