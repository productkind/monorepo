import { defer, from, type Observable } from 'rxjs'

import { eventCreators, type VideoDeskEvent } from './events.ts'
import {
  chooseKey,
  edgeColourOf,
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
  type ProviderState,
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
  writeDefinition: (options: { video: string; source: string }) => Promise<void>
  /** Section slots in seconds, from the timeline narrate wrote, or null when it has not run. */
  readSlots: (options: { video: string }) => Promise<number[] | null>
  readFlags: (options: { video: string }) => Promise<Flags>
  writeFlags: (options: { video: string; flags: Flags }) => Promise<void>
  readAsset: (options: { video: string; name: string }) => Promise<Uint8Array | null>
  writeAsset: (options: { video: string; name: string; bytes: Uint8Array }) => Promise<void>
  assetPath: (options: { video: string; name: string }) => string
  readCandidate: (options: { video: string; id: string }) => Promise<Uint8Array | null>
  writeCandidate: (options: { video: string; id: string; bytes: Uint8Array }) => Promise<void>
  candidatePath: (options: { video: string; id: string }) => string
  fetchJson: (options: { url: string }) => Promise<unknown>
  fetchBytes: (options: { url: string }) => Promise<Uint8Array>
  /** Colours on the gif's border ring, across every frame. */
  ringHistogram: (options: { path: string }) => Promise<Parameters<typeof edgeColourOf>[0]['histogram']>
  motion: (options: { path: string }) => Promise<number>
  loopSeam: (options: { path: string }) => Promise<number | null>
  /** Eight evenly spaced frames side by side: how late-appearing text gets caught. */
  frameStrip: (options: { gif: string; out: string }) => Promise<void>
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

  const sections = await Promise.all(
    parseSections({ source }).map(async (parsed) => {
      const bytes = await io.readAsset({ video, name: parsed.src })
      const slot = slots?.[parsed.index] ?? null
      const seconds = bytes === null ? null : gifDurationInSeconds({ bytes })
      return {
        ...parsed,
        slotSeconds: slot,
        gifSeconds: seconds,
        repeats: repeatsIn({ slot, seconds, playbackRate: parsed.playbackRate }),
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
        const bytes = await io.readAsset({ video, name: section.src })
        if (bytes === null) {
          return eventCreators.sectionMeasured({ section })
        }
        const path = io.assetPath({ video, name: section.src })
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
              .map(async (id) => ({ video: id, source: await io.readDefinition({ video: id }) })),
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
  applyVisual,
  video,
  index,
  candidate,
}: {
  io: DeskIo
  applyVisual: (options: {
    source: string
    section: number
    visual: { src: string; color?: string; playbackRate?: number }
    provenance: { search: string; url: string }
  }) => string
  video: string
  index: number
  candidate: { id: string; name: string; search: string; sourceUrl: string; provider: string }
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

        const source = await io.readDefinition({ video })
        await io.writeDefinition({
          video,
          source: applyVisual({
            source,
            section: index,
            visual: {
              src: name,
              ...(background === null ? {} : { color: background.colour }),
              ...(fit.rate === null ? {} : { playbackRate: fit.rate }),
            },
            provenance: { search: candidate.search, url: candidate.sourceUrl },
          }),
        })

        const { sections } = await sectionsOf({ io, video })
        const section = sections[index]
        return section === undefined
          ? eventCreators.deskFailed({ reason: `${video} lost section ${String(index)}` })
          : eventCreators.gifPicked({ section, applied: name })
      })(),
    ),
  )
