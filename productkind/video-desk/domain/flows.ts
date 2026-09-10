import { defer, from, type Observable } from 'rxjs'

import { eventCreators, type VideoDeskEvent } from './events.ts'
import {
  chooseKey,
  clipFit,
  FRAME,
  edgeColourOf,
  HEADROOM_SECONDS,
  keepThatCoverTheBeat,
  pexelsClips,
  pexelsSearchUrl,
  pixabayClips,
  pixabaySearchUrl,
  type StockClip,
  fitAdvice,
  gifDurationInSeconds,
  gifFrameCount,
  gifSize,
  giphyItems,
  giphySearchUrl,
  keepThatFitTheFrame,
  klipyItems,
  klipySearchUrl,
  parseSections,
  placeFor,
  type ProviderState,
  unreadSections,
  repeatsIn,
  usedIdsIn,
} from './operations.ts'
import type { Candidate, ProviderItem, Section, VideoDetail, VideoSummary } from './types.ts'

/**
 * What the desk does, expressed over a boundary it is handed rather than one it reaches for.
 *
 * The pure rules live in `operations.ts`; these compose them with reads and writes. Everything
 * here is testable by passing a fake `DeskIo`, which is the point of keeping the real filesystem,
 * the providers and ImageMagick behind it.
 */

export type Flags = Record<string, { src: string }>

export type DeskIo = {
  listVideos: () => Promise<string[]>
  readDefinition: (options: { video: string }) => Promise<string>
  /** Section slots in seconds, from the timeline narrate wrote, or null when it has not run. */
  readSlots: (options: { video: string }) => Promise<number[] | null>
  readFlags: (options: { video: string }) => Promise<Flags>
  writeFlags: (options: { video: string; flags: Flags }) => Promise<void>
  readAsset: (options: { video: string; name: string }) => Promise<Uint8Array | null>
  writeAsset: (options: { video: string; name: string; bytes: Uint8Array }) => Promise<void>
  assetPath: (options: { video: string; name: string }) => string
  /**
   * When the file was last written.
   *
   * A pick can replace a section's visual without changing its name — the name comes from the
   * search, so two candidates from one search share it — and then nothing in a URL changes and
   * the browser shows what it already had. The version is what makes the change visible.
   */
  assetVersion: (options: { video: string; name: string }) => Promise<number | null>
  readCandidate: (options: { video: string; id: string }) => Promise<Uint8Array | null>
  writeCandidate: (options: { video: string; id: string; bytes: Uint8Array }) => Promise<void>
  candidatePath: (options: { video: string; id: string }) => string
  fetchJson: (options: { url: string; headers?: Record<string, string> }) => Promise<unknown>
  fetchBytes: (options: { url: string }) => Promise<Uint8Array>
  /** Colours on the gif's border ring, across every frame. */
  ringHistogram: (options: { path: string }) => Promise<Parameters<typeof edgeColourOf>[0]['histogram']>
  motion: (options: { path: string }) => Promise<number>
  /** How long a video file runs, which a gif's frame delays cannot answer. */
  videoSeconds: (options: { path: string }) => Promise<number | null>
  videoSize: (options: { path: string }) => Promise<{ width: number; height: number } | null>
  /**
   * Trims a downloaded clip to the beat plus its headroom, strips the audio and re-encodes.
   *
   * Not only about disk: a clip has no rate and no loop, so keeping a known margin past the beat
   * is what guarantees it cannot run out and hold a frozen frame. Audio goes because every clip
   * is muted anyway — the narration is the only sound.
   */
  trimClip: (options: { from: string; to: string; seconds: number }) => Promise<void>
  removeAsset: (options: { video: string; name: string }) => Promise<void>
  /** A frame from a clip, so a list of clips shows pictures rather than empty boxes. */
  posterFrame: (options: { video: string; name: string }) => Promise<string | null>
  pexelsKey: () => string | undefined
  pixabayKey: () => string | undefined
  loopSeam: (options: { path: string }) => Promise<number | null>
  /** Eight evenly spaced frames side by side: how late-appearing text gets caught. */
  frameStrip: (options: { gif: string; out: string }) => Promise<void>
  /**
   * Rewrites one section of a definition.
   *
   * Delegated whole rather than done here: the definitions belong to the video package, and so do
   * the tests for editing them. The desk decides what the fields should say and nothing more.
   */
  applyVisual: (options: {
    video: string
    section: number
    visual:
      | {
          kind: 'gif'
          src: string
          /** Where the section already sat, kept even when the kind changes. */
          place: 'frame' | 'above-captions'
          color?: string
          playbackRate?: number
          source: { provider: string; id?: string; search: string; author?: string }
        }
      | {
          kind: 'clip'
          src: string
          place: 'frame' | 'above-captions'
          trimBefore?: number
          source: { provider: string; id?: string; search: string; author?: string }
        }
  }) => Promise<void>
  keys: () => { giphy: string[]; klipy: string | undefined }
  readProviderState: () => Promise<ProviderState>
  writeProviderState: (options: { state: ProviderState }) => Promise<void>
  hour: () => string
}

/** Below this frame-to-frame change a gif reads as a still image, whatever its duration says. */
const STILL = 0.02

const sectionsOf = async ({
  io,
  video,
}: {
  io: DeskIo
  video: string
}): Promise<{ sections: Section[]; narrated: boolean }> => {
  const source = await io.readDefinition({ video })
  const slots = await io.readSlots({ video })
  const flags = await io.readFlags({ video })

  const parsed = parseSections({ source })
  const unread = unreadSections({ source, read: parsed })
  if (unread > 0) {
    // Refusing beats mis-indexing: a section the parser skipped shifts every index after it, and
    // a pick would then rewrite a beat nobody chose.
    throw new Error(
      `${video} has ${String(unread)} visual(s) this desk cannot read, so its section numbers ` +
        'cannot be trusted. Fix the parser before picking anything for it.',
    )
  }

  const sections = await Promise.all(
    parsed.map(async (parsed) => {
      const slot = slots?.[parsed.index] ?? null
      const version = await io.assetVersion({ video, name: parsed.src })
      // A clip is a video file: its length comes from the container, not from frame delays, and
      // it plays once rather than repeating, so a repeat count would be meaningless.
      if (parsed.kind === 'clip') {
        const seconds = await io.videoSeconds({ path: io.assetPath({ video, name: parsed.src }) })
        return {
          ...parsed,
          slotSeconds: slot,
          gifSeconds: seconds,
          repeats: null,
          version,
          flagged: flags[String(parsed.index)]?.src === parsed.src,
          exists: seconds !== null,
        }
      }
      const bytes = await io.readAsset({ video, name: parsed.src })
      const seconds = bytes === null ? null : gifDurationInSeconds({ bytes })
      return {
        ...parsed,
        slotSeconds: slot,
        gifSeconds: seconds,
        repeats: repeatsIn({ slot, seconds, playbackRate: parsed.playbackRate }),
        version,
        flagged: flags[String(parsed.index)]?.src === parsed.src,
        exists: bytes !== null,
      }
    }),
  )
  return { sections, narrated: slots !== null }
}

export const listVideos = ({ io }: { io: DeskIo }): Observable<VideoDeskEvent> =>
  defer(() =>
    from(
      (async () => {
        const ids = await io.listVideos()
        const videos: VideoSummary[] = await Promise.all(
          ids.map(async (id) => {
            const source = await io.readDefinition({ video: id })
            const flags = await io.readFlags({ video: id })
            const sections = parseSections({ source })
            return {
              id,
              sections: sections.length,
              flagged: sections.filter(
                (section) => flags[String(section.index)]?.src === section.src,
              ).length,
              narrated: (await io.readSlots({ video: id })) !== null,
            }
          }),
        )
        return eventCreators.videosListed({ videos })
      })(),
    ),
  )

export const loadVideo = ({
  io,
  video,
}: {
  io: DeskIo
  video: string
}): Observable<VideoDeskEvent> =>
  defer(() =>
    from(
      (async () => {
        const { sections, narrated } = await sectionsOf({ io, video })
        const detail: VideoDetail = { id: video, narrated, sections }
        return eventCreators.videoLoaded({ video: detail })
      })(),
    ),
  )

/**
 * One section with the measurements a decision needs.
 *
 * Duration and size come from the gif's own bytes, which is why the sections list is cheap. Motion,
 * the loop seam and the border colour each need every frame decoded, so they are taken here, when
 * a section is actually opened.
 */
export const measureSection = ({
  io,
  video,
  index,
}: {
  io: DeskIo
  video: string
  index: number
}): Observable<VideoDeskEvent> =>
  defer(() =>
    from(
      (async () => {
        const { sections } = await sectionsOf({ io, video })
        const section = sections[index]
        if (section === undefined) {
          return eventCreators.deskFailed({ reason: `${video} has no section ${String(index)}` })
        }
        const path = io.assetPath({ video, name: section.src })
        if (section.kind === 'clip') {
          // No loop seam and no letterbox: a clip plays once and fills the frame. What matters is
          // whether it outlasts its beat.
          const size = await io.videoSize({ path })
          return eventCreators.sectionMeasured({
            section: {
              ...section,
              ...(size === null ? {} : size),
              ...(section.slotSeconds === null || section.gifSeconds === null
                ? {}
                : {
                    clip: clipFit({ seconds: section.gifSeconds, slot: section.slotSeconds }),
                  }),
            },
          })
        }
        const bytes = await io.readAsset({ video, name: section.src })
        if (bytes === null) {
          return eventCreators.sectionMeasured({ section })
        }
        const background = edgeColourOf({ histogram: await io.ringHistogram({ path }) })
        const seam = await io.loopSeam({ path })
        return eventCreators.sectionMeasured({
          section: {
            ...section,
            ...gifSize({ bytes }),
            motion: await io.motion({ path }),
            ...(seam === null ? {} : { seam }),
            edgeColour: background?.colour ?? null,
            edgeCoverage: background?.coverage ?? null,
            ...(section.slotSeconds === null || section.gifSeconds === null
              ? {}
              : { fit: fitAdvice({ seconds: section.gifSeconds, slot: section.slotSeconds }) }),
          },
        })
      })(),
    ),
  )

const searchOneTerm = async ({
  io,
  term,
  limit,
  provider,
}: {
  io: DeskIo
  term: string
  limit: number
  provider: string
}): Promise<{ items: ProviderItem[]; exhausted: boolean }> => {
  const { giphy, klipy } = io.keys()
  const hour = io.hour()
  const state = await io.readProviderState()

  const key = provider === 'klipy' ? null : chooseKey({ keys: giphy, state, now: hour })
  if (key !== null) {
    const payload = await io.fetchJson({ url: giphySearchUrl({ key, term, limit }) })
    const counts = state.hour === hour ? state.counts : {}
    await io.writeProviderState({
      state: {
        hour,
        counts: { ...counts, [key]: (counts[key] ?? 0) + 1 },
        cooling: state.hour === hour ? state.cooling : {},
      },
    })
    return { items: giphyItems({ payload }), exhausted: false }
  }
  // Every giphy key is inside its hourly cap, so klipy serves the search instead. The two
  // catalogues are not interchangeable — giphy is deeper in footage, klipy in flat illustration —
  // which is why the caller is told which one answered.
  if (klipy === undefined || klipy === '') {
    return { items: [], exhausted: true }
  }
  const payload = await io.fetchJson({ url: klipySearchUrl({ key: klipy, term, limit }) })
  return { items: klipyItems({ payload }), exhausted: false }
}

/**
 * Stock footage for one beat.
 *
 * A clip section asks a different question from a gif one: not what reads well in a loop, but what
 * covers the beat without running out. So the catalogues are different, the filter is duration
 * rather than aspect, and nothing is measured for motion — footage moves by definition.
 */
export const searchStock = ({
  io,
  video,
  index,
  terms,
  provider = 'pexels',
  show = 12,
  limit = 40,
  skip = [],
}: {
  io: DeskIo
  video: string
  index: number
  terms: string[]
  provider?: string
  show?: number
  limit?: number
  skip?: string[]
}): Observable<VideoDeskEvent> =>
  defer(() =>
    from(
      (async () => {
        const slots = await io.readSlots({ video })
        const slot = slots?.[index] ?? null
        if (slot === null) {
          return eventCreators.deskFailed({
            reason: `${video} has no timeline, so no beat length to fit a clip to`,
          })
        }

        const pexels = io.pexelsKey()
        const pixabay = io.pixabayKey()
        const wanted = provider === 'pixabay' ? 'pixabay' : 'pexels'
        const key = wanted === 'pexels' ? pexels : pixabay
        if (key === undefined || key === '') {
          return eventCreators.deskFailed({
            reason: `${wanted.toUpperCase()}_API_KEY is not set, so ${wanted} cannot be searched`,
          })
        }

        const found: StockClip[] = []
        for (const term of terms) {
          const payload =
            wanted === 'pexels'
              ? await io.fetchJson({
                  url: pexelsSearchUrl({ term, limit }),
                  headers: { Authorization: key },
                })
              : await io.fetchJson({ url: pixabaySearchUrl({ key, term, limit }) })
          const clips = wanted === 'pexels' ? pexelsClips({ payload }) : pixabayClips({ payload })
          found.push(...clips.map((clip) => ({ ...clip, term })))
        }

        const usable = keepThatCoverTheBeat({ items: found, slot, skip }).slice(0, show)
        return eventCreators.clipsFound({
          slot,
          clips: usable.map((clip) => ({
            ...clip,
            term: 'term' in clip && typeof clip.term === 'string' ? clip.term : terms[0] ?? '',
            fit: clipFit({ seconds: clip.seconds, slot }),
          })),
        })
      })(),
    ),
  )

export const searchSection = ({
  io,
  video,
  index,
  terms,
  provider = 'auto',
  show = 12,
  limit = 25,
  skip = [],
}: {
  io: DeskIo
  video: string
  index: number
  terms: string[]
  provider?: string
  show?: number
  limit?: number
  skip?: string[]
}): Observable<VideoDeskEvent> =>
  defer(() =>
    from(
      (async () => {
        const slots = await io.readSlots({ video })
        const slot = slots?.[index] ?? null
        const found: ProviderItem[] = []
        for (const term of terms) {
          const { items, exhausted } = await searchOneTerm({ io, term, limit, provider })
          if (exhausted) {
            const { giphy } = io.keys()
            return eventCreators.searchUnavailable({ minutes: 60 - new Date().getMinutes(), keys: giphy.map((key) => key.slice(0, 6)) })
          }
          found.push(...items.map((item) => ({ ...item, term })))
        }

        const fitting = keepThatFitTheFrame({ items: found, skip })
        const used = usedIdsIn({
          definitions: await Promise.all(
            (await io.listVideos())
              .filter((id) => id.startsWith(video.replace(/-\d+$/, '')))
              .map(async (id) => ({
                video: id,
                sections: parseSections({ source: await io.readDefinition({ video: id }) }),
              })),
          ),
        })

        // Measured in fit order and stopped at `show`, because motion costs a full decode and only
        // the candidates that could be chosen are worth paying for.
        const measured: Candidate[] = []
        const withTerm = fitting as (ProviderItem & { term: string })[]
        const ordered = await Promise.all(
          withTerm.map(async (item) => {
            const cached = await io.readCandidate({ video, id: item.id })
            const bytes = cached ?? (await io.fetchBytes({ url: item.previewUrl }))
            if (cached === null) {
              await io.writeCandidate({ video, id: item.id, bytes })
            }
            const seconds = gifDurationInSeconds({ bytes })
            return { item, seconds, frames: gifFrameCount({ bytes }) }
          }),
        )
        ordered.sort((left, right) =>
          slot === null
            ? 0
            : Math.abs(slot / left.seconds - 1) - Math.abs(slot / right.seconds - 1),
        )

        for (const { item, seconds, frames } of ordered) {
          if (measured.length === show) {
            break
          }
          if (seconds === 0) {
            continue
          }
          const motion = await io.motion({ path: io.candidatePath({ video, id: item.id }) })
          // A still photo with a jittering overlay carries frames and seconds and still reads as
          // frozen on screen; no other measurement notices.
          if (motion < STILL) {
            continue
          }
          measured.push({
            id: item.id,
            provider: item.provider,
            term: item.term,
            title: item.title,
            seconds,
            frames,
            width: item.width,
            height: item.height,
            repeats: slot === null ? 0 : slot / seconds,
            motion,
            usedIn: used[item.id] ?? [],
            fit: slot === null ? { rate: null, why: 'not narrated yet' } : fitAdvice({ seconds, slot }),
            gifUrl: `/api/candidate/${video}/${item.id}.gif`,
            stripUrl: `/api/strip/${video}/${item.id}.png`,
            sourceUrl: item.sourceUrl,
          })
        }

        return eventCreators.candidatesFound({ slot, candidates: measured })
      })(),
    ),
  )

export const setFlag = ({
  io,
  video,
  index,
  src,
  flagged,
}: {
  io: DeskIo
  video: string
  index: number
  src: string
  flagged: boolean
}): Observable<VideoDeskEvent> =>
  defer(() =>
    from(
      (async () => {
        const flags = await io.readFlags({ video })
        const key = String(index)
        const next = flagged
          ? { ...flags, [key]: { src } }
          : Object.fromEntries(Object.entries(flags).filter(([at]) => at !== key))
        await io.writeFlags({ video, flags: next })
        return eventCreators.flagsChanged({ flags: next })
      })(),
    ),
  )

/**
 * Apply a candidate to a section: fetch it at full size, measure what the definition needs, and
 * write it in.
 *
 * The definition is rewritten by `apply-visual` in the video package, where the definitions live
 * and where the tests for editing them are — this flow only decides what the fields should say.
 */
export const pickGif = ({
  io,
  video,
  index,
  candidate,
}: {
  io: DeskIo
  video: string
  index: number
  candidate: {
    id: string
    name: string
    search: string
    sourceUrl: string
    provider: 'giphy' | 'klipy'
  }
}): Observable<VideoDeskEvent> =>
  defer(() =>
    from(
      (async () => {
        const name = `section-${String(index).padStart(2, '0')}-${candidate.name}.gif`
        // Giphy originals are addressable from the id alone. Anything else is only at its own url.
        const url =
          candidate.provider === 'giphy'
            ? `https://media.giphy.com/media/${candidate.id}/giphy.gif`
            : candidate.sourceUrl
        const bytes = await io.fetchBytes({ url })
        await io.writeAsset({ video, name, bytes })

        const slots = await io.readSlots({ video })
        const slot = slots?.[index] ?? null
        const seconds = gifDurationInSeconds({ bytes })
        const fit = slot === null ? { rate: null } : fitAdvice({ seconds, slot })
        const background = edgeColourOf({
          histogram: await io.ringHistogram({ path: io.assetPath({ video, name }) }),
        })

        const existing = parseSections({ source: await io.readDefinition({ video }) })[index]
        await io.applyVisual({
          video,
          section: index,
          visual: {
            kind: 'gif',
            src: name,
            place: placeFor({
              was: existing?.kind ?? 'gif',
              now: 'gif',
              place: existing?.place ?? 'above-captions',
            }),
            source: { provider: candidate.provider, id: candidate.id, search: candidate.search },
            ...(background === null ? {} : { color: background.colour }),
            ...(fit.rate === null ? {} : { playbackRate: fit.rate }),
          },
        })

        const { sections } = await sectionsOf({ io, video })
        const section = sections[index]
        if (section === undefined) {
          return eventCreators.deskFailed({ reason: `${video} lost section ${String(index)}` })
        }
        return eventCreators.gifPicked({
          section:
            section.slotSeconds === null || section.gifSeconds === null
              ? section
              : {
                  ...section,
                  clip: clipFit({ seconds: section.gifSeconds, slot: section.slotSeconds }),
                },
          applied: name,
        })
      })(),
    ),
  )

/**
 * Apply a stock clip to a beat: fetch the native 1080x1920 file, trim it to the beat plus its
 * headroom, and write it in as a clip.
 *
 * Written as a `clip`, never a `gif`: the two are not interchangeable, and a six-second piece of
 * footage written as a gif would render as a still frame.
 */
export const pickClip = ({
  io,
  video,
  index,
  clip,
}: {
  io: DeskIo
  video: string
  index: number
  clip: {
    id: string
    name: string
    term: string
    author: string
    provider: 'pexels' | 'pixabay'
    downloadUrl: string
  }
}): Observable<VideoDeskEvent> =>
  defer(() =>
    from(
      (async () => {
        const slots = await io.readSlots({ video })
        const slot = slots?.[index] ?? null
        if (slot === null) {
          return eventCreators.deskFailed({
            reason: `${video} has no timeline, so there is no beat to trim a clip to`,
          })
        }

        const name = `clip-${String(index).padStart(2, '0')}-${clip.name}.mp4`
        const untrimmed = `${name}.download`
        await io.writeAsset({
          video,
          name: untrimmed,
          bytes: await io.fetchBytes({ url: clip.downloadUrl }),
        })

        // What a provider says a file is cannot be trusted: pexels lists 6000421 as 1080x1920,
        // names the file hd_1080_1920, and the stream inside is 720x1280 — which would be upscaled
        // into the frame and read as visibly soft. The stream decides.
        const measured = await io.videoSize({ path: io.assetPath({ video, name: untrimmed }) })
        if (measured === null || measured.width !== FRAME.width || measured.height !== FRAME.height) {
          await io.removeAsset({ video, name: untrimmed })
          return eventCreators.deskFailed({
            reason:
              `${clip.provider} ${clip.id} claims ${String(FRAME.width)}x${String(FRAME.height)} ` +
              `but its stream is ${measured === null ? 'unreadable' : `${String(measured.width)}x${String(measured.height)}`}. ` +
              'Pick another clip; this one would be upscaled into the frame.',
          })
        }

        await io.trimClip({
          from: io.assetPath({ video, name: untrimmed }),
          to: io.assetPath({ video, name }),
          seconds: slot + HEADROOM_SECONDS,
        })
        await io.removeAsset({ video, name: untrimmed })

        // Any source can serve any section, so a pick can change the kind. Re-sourcing keeps the
        // section where it was; a change takes the new kind's own treatment.
        const existing = parseSections({ source: await io.readDefinition({ video }) })[index]
        await io.applyVisual({
          video,
          section: index,
          visual: {
            kind: 'clip',
            src: name,
            place: placeFor({
              was: existing?.kind ?? 'clip',
              now: 'clip',
              place: existing?.place ?? 'frame',
            }),
            source: {
              provider: clip.provider,
              id: clip.id,
              search: clip.term,
              author: clip.author,
            },
          },
        })

        const { sections } = await sectionsOf({ io, video })
        const section = sections[index]
        if (section === undefined) {
          return eventCreators.deskFailed({ reason: `${video} lost section ${String(index)}` })
        }
        return eventCreators.gifPicked({
          section:
            section.slotSeconds === null || section.gifSeconds === null
              ? section
              : {
                  ...section,
                  clip: clipFit({ seconds: section.gifSeconds, slot: section.slotSeconds }),
                },
          applied: name,
        })
      })(),
    ),
  )
