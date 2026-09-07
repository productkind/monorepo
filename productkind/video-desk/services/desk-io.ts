import { execFile } from 'node:child_process'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { promisify } from 'node:util'

import type { DeskIo, Flags } from '../domain/flows.ts'
import { parseHistogram, parseRmse, type ProviderState } from '../domain/operations.ts'
import type { VideoDeskServices } from './services.ts'

/**
 * The boundary the flows are handed: the video package's files, the two providers, and ImageMagick.
 *
 * Only translation lives here. Every decision about what the numbers mean belongs to the domain,
 * so this file has no thresholds in it.
 */

export type DeskConfig = {
  /** The video-generator package: its definitions and its public folder are the desk's data. */
  videoPackage: string
}

/** How many frames the motion metric compares; the engine's number, kept so the value matches. */
const MOTION_SAMPLES = 6

const EDGES = [
  { gravity: 'North', crop: 'x2+0+0' },
  { gravity: 'South', crop: 'x2+0+0' },
  { gravity: 'West', crop: '2x+0+0' },
  { gravity: 'East', crop: '2x+0+0' },
]

/** Text read as latin1 is byte-for-byte, which is how a text-only service reads a gif. */
const bytesOf = ({ text }: { text: string }): Uint8Array =>
  Uint8Array.from(text, (character) => character.charCodeAt(0))

export const createDeskIo = ({
  services,
  config,
}: {
  services: VideoDeskServices
  config: DeskConfig
}): DeskIo => {
  const { fileSystem, http, clock, env } = services
  const run = promisify(execFile)

  const definitions = `${config.videoPackage}/src/videos`
  const assets = (video: string) => `${config.videoPackage}/public/${video}`
  // Candidates stay outside the repo: they are throwaway and there are a great many of them.
  const cache = `${tmpdir()}/gif-candidates`
  const statePath = `${cache}/.provider-state.json`

  const readTextOrNull = async ({
    path,
    encoding = 'utf-8',
  }: {
    path: string
    encoding?: BufferEncoding
  }): Promise<string | null> => {
    try {
      return await fileSystem.readFileAsync(path, encoding)
    } catch {
      return null
    }
  }

  const readBytesOrNull = async ({ path }: { path: string }): Promise<Uint8Array | null> => {
    // latin1, never utf-8: the service reads text, and only latin1 maps every byte to one
    // character unchanged. Read as utf-8, every byte above 0x7f becomes a replacement character
    // and the gif's own header stops parsing.
    const text = await readTextOrNull({ path, encoding: 'latin1' })
    return text === null ? null : bytesOf({ text })
  }

  const magick = async ({ args }: { args: string[] }): Promise<string> => {
    const { stdout, stderr } = await run('magick', args, { maxBuffer: 1 << 28 })
    return `${stdout}${stderr}`
  }

  return {
    listVideos: async () =>
      (await fileSystem.readDirAsync(definitions))
        .filter((name) => name.endsWith('.ts') && !name.endsWith('.test.ts'))
        .filter((name) => name !== 'index.ts' && name !== 'apply-visual.ts')
        .map((name) => name.replace(/\.ts$/, ''))
        .sort((left, right) => left.localeCompare(right)),

    readDefinition: ({ video }) => fileSystem.readFileAsync(`${definitions}/${video}.ts`, 'utf-8'),

    writeDefinition: ({ video, source }) =>
      fileSystem.writeFileAsync(`${definitions}/${video}.ts`, source),

    readSlots: async ({ video }) => {
      const text = await readTextOrNull({ path: `${assets(video)}/timeline.json` })
      if (text === null) {
        return null
      }
      const timeline: unknown = JSON.parse(text)
      if (
        typeof timeline !== 'object' ||
        timeline === null ||
        !('sections' in timeline) ||
        !('fps' in timeline) ||
        !Array.isArray(timeline.sections) ||
        typeof timeline.fps !== 'number'
      ) {
        return null
      }
      const fps = timeline.fps
      return timeline.sections.map((section: unknown) =>
        typeof section === 'object' && section !== null && 'durationInFrames' in section &&
        typeof section.durationInFrames === 'number'
          ? section.durationInFrames / fps
          : 0,
      )
    },

    readFlags: async ({ video }) => {
      const text = await readTextOrNull({ path: `${assets(video)}/flags.json` })
      if (text === null) {
        return {}
      }
      try {
        const parsed: unknown = JSON.parse(text)
        return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
          ? (parsed as Flags)
          : {}
      } catch {
        return {}
      }
    },

    writeFlags: ({ video, flags }) => {
      const ordered = Object.fromEntries(
        Object.entries(flags).sort(([left], [right]) => Number(left) - Number(right)),
      )
      return fileSystem.writeFileAsync(
        `${assets(video)}/flags.json`,
        `${JSON.stringify(ordered, null, 2)}\n`,
      )
    },

    readAsset: ({ video, name }) => readBytesOrNull({ path: `${assets(video)}/${name}` }),

    writeAsset: async ({ video, name, bytes }) => {
      await fileSystem.mkdirAsync(assets(video))
      await fileSystem.writeFileAsync(`${assets(video)}/${name}`, bytes)
    },

    assetPath: ({ video, name }) => `${assets(video)}/${name}`,

    readCandidate: ({ video, id }) => readBytesOrNull({ path: `${cache}/${video}/${id}.gif` }),

    writeCandidate: async ({ video, id, bytes }) => {
      await fileSystem.mkdirAsync(`${cache}/${video}`)
      await fileSystem.writeFileAsync(`${cache}/${video}/${id}.gif`, bytes)
    },

    candidatePath: ({ video, id }) => `${cache}/${video}/${id}.gif`,

    fetchJson: async ({ url }) => {
      const response = await http.fetch(url)
      return response.json()
    },

    fetchBytes: async ({ url }) => {
      const response = await http.fetch(url, { headers: { referer: 'https://giphy.com/' } })
      if (!response.ok) {
        throw new Error(`${url} answered ${String(response.status)}`)
      }
      return new Uint8Array(await response.arrayBuffer())
    },

    ringHistogram: async ({ path }) => {
      const histograms = await Promise.all(
        EDGES.map(({ gravity, crop }) =>
          magick({
            args: [path, '-coalesce', '-gravity', gravity, '-crop', crop, '+repage', '+append',
                   '-depth', '8', '-format', '%c', 'histogram:info:-'],
          }),
        ),
      )
      return histograms.flatMap((text) => parseHistogram({ text }))
    },

    motion: async ({ path }) => {
      // The largest difference between sampled frames, which is the one thing duration, frame
      // count and a clean loop seam all miss: a still photo with a jittering overlay.
      //
      // Ported metric for metric from the sourcing engine, because the threshold the domain
      // compares it against was measured against this number and no other.
      const folder = await mkdtemp(`${tmpdir()}/desk-motion-`)
      try {
        await run('magick', [path, '-coalesce', `${folder}/f-%03d.png`], { maxBuffer: 1 << 28 })
        const frames = (await fileSystem.readDirAsync(folder)).sort((left, right) =>
          left.localeCompare(right),
        )
        if (frames.length < 2) {
          return 0
        }
        const step = Math.max(1, Math.floor(frames.length / MOTION_SAMPLES))
        const picked = frames.filter((_name, index) => index % step === 0)
        const differences = await Promise.all(
          picked.slice(1).map(async (name, index) => {
            const text = await magick({
              args: ['compare', '-metric', 'RMSE', `${folder}/${picked[index] ?? name}`,
                     `${folder}/${name}`, 'null:'],
            }).catch((error: unknown) => (error instanceof Error ? error.message : ''))
            return parseRmse({ text }) ?? 0
          }),
        )
        return Math.max(0, ...differences)
      } finally {
        await rm(folder, { recursive: true, force: true })
      }
    },

    loopSeam: async ({ path }) => {
      // Both frames are resized to 120x120 before comparing, exactly as the sourcing engine does:
      // RMSE depends on the pixels compared, and the domain's "invisible seam" threshold was
      // calibrated against this number at this size.
      const folder = await mkdtemp(`${tmpdir()}/desk-seam-`)
      try {
        await Promise.all(
          [
            { frame: '[0]', name: 'first' },
            { frame: '[-1]', name: 'last' },
          ].map(({ frame, name }) =>
            run('magick', [`${path}${frame}`, '-resize', '120x120!', `${folder}/${name}.png`], {
              maxBuffer: 1 << 28,
            }),
          ),
        )
        const text = await magick({
          args: ['compare', '-metric', 'RMSE', `${folder}/first.png`, `${folder}/last.png`, 'null:'],
        }).catch((error: unknown) => (error instanceof Error ? error.message : ''))
        return parseRmse({ text })
      } finally {
        await rm(folder, { recursive: true, force: true })
      }
    },

    frameStrip: async ({ gif, out }) => {
      await run(
        'magick',
        [gif, '-coalesce', '-resize', 'x130', '-append'.replace('-append', '+append'), out],
        { maxBuffer: 1 << 28 },
      )
    },

    keys: () => ({
      giphy: [0, 1, 2]
        .map((index) => env[`GIPHY_API_KEY_POOL_${String(index)}`])
        .flatMap((key) => (key === undefined || key === '' ? [] : [key])),
      klipy: env.KLIPY_API_KEY,
    }),

    readProviderState: async () => {
      const text = await readTextOrNull({ path: statePath })
      const fallback: ProviderState = { hour: '', counts: {}, cooling: {} }
      if (text === null) {
        return fallback
      }
      try {
        const parsed: unknown = JSON.parse(text)
        return typeof parsed === 'object' && parsed !== null && 'hour' in parsed
          ? (parsed as ProviderState)
          : fallback
      } catch {
        return fallback
      }
    },

    writeProviderState: async ({ state }) => {
      await fileSystem.mkdirAsync(cache)
      await fileSystem.writeFileAsync(statePath, JSON.stringify(state, null, 2))
    },

    hour: () => clock.now().toISOString().slice(0, 13),
  }
}
