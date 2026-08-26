import { FRAME_RATE } from '../config'

/** The letterbox colour behind a `contain` fit, unless a visual sets its own. */
const HOUSE_BACKGROUND = '#1a0044'

/**
 * Every visual so far is one of three things. The `kind` is the dispatch key the renderer keys
 * off, so no part of the pipeline has to guess from a file extension.
 */
export const VISUAL_KINDS = ['gif', 'still', 'clip'] as const

export type VisualKind = (typeof VISUAL_KINDS)[number]

export type FitMode = 'contain' | 'cover' | 'fill'

/** Matches `GifLoopBehavior` in @remotion/gif; the compiler checks it where it is passed on. */
export type LoopBehavior = 'loop' | 'pause-after-finish' | 'unmount-after-finish'

/**
 * How a visual is fitted to the frame.
 *
 * `frame` fits the media to the whole 1080x1920 frame and leaves the rest to `offset` — what every
 * published video does, kept as the default so none of them change.
 *
 * `above-captions` hands the geometry to `placeMedia`, which keeps the media clear of the platform
 * bars and sits it on the captions without anything being hand-tuned.
 */
export type Place = 'frame' | 'above-captions'

type Framing = {
  /** Vertical nudge in pixels, used to lift the subject clear of the caption band. */
  offset: number
  color: string
  fit: FitMode
  scale: number
  place: Place
}

export type GifVisual = Framing & {
  kind: 'gif'
  src: string
  loopBehavior: LoopBehavior
  playbackRate: number
}

export type StillVisual = Framing & {
  kind: 'still'
  src: string
}

export type ClipVisual = {
  kind: 'clip'
  src: string
  trimBefore: number
  offset: number
  muted: boolean
  place: Place
  color: string
}

export type Visual = GifVisual | StillVisual | ClipVisual

const framing = ({
  offset = 0,
  color = HOUSE_BACKGROUND,
  fit = 'contain',
  scale = 1,
  place = 'frame',
}: Partial<Framing>): Framing => ({ offset, color, fit, scale, place })

export const gif = ({
  src,
  loopBehavior = 'loop',
  playbackRate = 1,
  ...rest
}: {
  src: string
  loopBehavior?: LoopBehavior
  playbackRate?: number
} & Partial<Framing>): GifVisual => ({
  kind: 'gif',
  src,
  loopBehavior,
  playbackRate,
  ...framing(rest),
})

export const still = ({ src, ...rest }: { src: string } & Partial<Framing>): StillVisual => ({
  kind: 'still',
  src,
  ...framing(rest),
})

export const clip = ({
  src,
  trimBefore = 0,
  offset = 0,
  muted = true,
  place = 'frame',
  color = HOUSE_BACKGROUND,
}: {
  src: string
  trimBefore?: number
  offset?: number
  muted?: boolean
  place?: Place
  color?: string
}): ClipVisual => ({ kind: 'clip', src, trimBefore, offset, muted, place, color })

export type Section = {
  /**
   * The narration for this section, as readable copy. No leading newline, no blank line to
   * separate it from the next section: the paragraph structure lives in `endsParagraph`, and the
   * whitespace is reassembled when the narration is generated.
   */
  text: string
  visual: Visual
  /** Ends the paragraph, so a blank line follows this section in the narration. */
  endsParagraph?: boolean
}

/**
 * A Rive animation laid over the whole video from some point onwards.
 *
 * Two ways to place one. `frame` reproduces exactly what the published videos do, which is what
 * migration needs. `section` anchors the overlay to a cut instead, so it travels with the
 * narration when the script is edited — the better choice for anything new.
 */
export type Overlay =
  | { kind: 'frame'; rive: string; fromFrame: number }
  | { kind: 'section'; rive: string; fromSection: number }

export const riveAtFrame = ({ rive, frame }: { rive: string; frame: number }): Overlay => ({
  kind: 'frame',
  rive,
  fromFrame: frame,
})

export const riveAtSection = ({ rive, section }: { rive: string; section: number }): Overlay => ({
  kind: 'section',
  rive,
  fromSection: section,
})

export type VideoDefinition = {
  id: string
  /** Folder under `public/` the visuals load from. Defaults to `id`. */
  assets: string
  voice: string
  model: string
  sections: Section[]
  overlays: Overlay[]
  fps: number
  /** Frames held after the last spoken word, so the video does not cut on the final syllable. */
  tailFrames: number
  /** Generate one take per blank line instead of one take for the whole script. */
  splitOnBlankLines: boolean
  /** The sections' narration as one string — the copy that was approved, reassembled. */
  script: string
}

export const defineVideo = ({
  id,
  assets,
  voice,
  model,
  sections,
  overlays = [],
  fps = FRAME_RATE,
  tailFrames = 6,
  splitOnBlankLines = false,
}: {
  id: string
  assets?: string
  voice: string
  model: string
  sections: Section[]
  overlays?: Overlay[]
  fps?: number
  tailFrames?: number
  splitOnBlankLines?: boolean
}): VideoDefinition => {
  if (sections.length === 0) {
    throw new Error(`Video ${id} has no sections.`)
  }
  return {
    id,
    assets: assets ?? id,
    voice,
    model,
    sections,
    overlays,
    fps,
    tailFrames,
    splitOnBlankLines,
    script: sections.map((section) => section.text).join(''),
  }
}

/**
 * FNV-1a, run twice with different offset bases for a 64-bit result. Hand-rolled because this
 * has to produce the same value in Node (where the cache is written) and in the browser (where
 * calculateMetadata checks the timeline is not stale), and node:crypto is not available in both.
 */
const FNV_PRIME = 0x01000193
const FNV_OFFSET_BASES = [0x811c9dc5, 0x7fffffff]

const fnv1a = ({ text, basis }: { text: string; basis: number }): number => {
  let hash = basis
  for (let index = 0; index < text.length; index += 1) {
    hash = Math.imul(hash ^ text.charCodeAt(index), FNV_PRIME)
  }
  return hash >>> 0
}

/**
 * Whitespace is not part of what these hashes identify. The narration cares about the words: the
 * same script laid out with or without blank lines is the same take, so it keeps the same cached
 * audio instead of being re-narrated at a cost. It follows that a whitespace-only edit will not
 * re-generate audio, which is the intended trade.
 */
export const spokenOnly = (text: string): string => text.replace(/\s+/g, ' ').trim()

const hash = (text: string): string =>
  FNV_OFFSET_BASES.map((basis) => fnv1a({ text, basis }).toString(16).padStart(8, '0')).join('')

/** How the voice is asked to deliver the line. Part of the cache key, because it is audible. */
export type VoiceSettings = {
  stability?: number
  similarity_boost?: number
  speed?: number
}

const settingsKey = (settings: VoiceSettings): string =>
  Object.entries(settings)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, value]) => `${name}=${String(value)}`)
    .join(',')

/** Names the cached audio for one take. Covers exactly what changes how the take sounds. */
export const audioCacheKey = ({
  text,
  voice,
  model,
  settings = {},
}: {
  text: string
  voice: string
  model: string
  settings?: VoiceSettings
}): string => hash([voice, model, settingsKey(settings), spokenOnly(text)].join(' '))

/**
 * Detects a `timeline.json` that no longer matches its definition. Deliberately blind to how
 * visuals are framed: nudging a gif changes no timing, so it must not force a rebuild.
 */
export const timelineHash = ({ definition }: { definition: VideoDefinition }): string =>
  hash(
    [
      definition.voice,
      definition.model,
      String(definition.fps),
      String(definition.tailFrames),
      String(definition.splitOnBlankLines),
      ...definition.sections.map((section) => spokenOnly(section.text)),
    ].join(' '),
  )
