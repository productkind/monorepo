/**
 * Prints every narrated video's sections as JSON, for the checking scripts to read.
 *
 * They used to recover this by regex from each definition file, which silently reported "every
 * beat covered" for the hook experiments: their sections come from a shared module, so the text
 * parser found none and read zero problems as zero defects. Evaluating the definition is the only
 * way to see sections wherever they are assembled.
 *
 *   npx tsx scripts/sections.ts [--video <id>]
 */
import { VIDEOS } from '../src/videos/index'
import { selectVideos } from '../src/videos/select'

import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const PUBLIC_DIR = resolve(process.cwd(), 'public')

type Timeline = { sections: { durationInFrames: number }[] }

const argv = process.argv.slice(2)
const only = argv.flatMap((arg, index) => (argv[index - 1] === '--video' ? [arg] : []))

const videos = selectVideos({ videos: VIDEOS, only }).map((definition) => {
  const timeline = resolve(PUBLIC_DIR, definition.id, 'timeline.json')
  const slots: number[] = existsSync(timeline)
    ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      (JSON.parse(readFileSync(timeline, 'utf8')) as Timeline).sections.map(
        (section) => section.durationInFrames / definition.fps,
      )
    : []

  return {
    id: definition.id,
    assets: definition.assets,
    narrated: slots.length > 0,
    sections: definition.sections.map((section, index) => ({
      index,
      kind: section.visual.kind,
      src: section.visual.src,
      playbackRate: 'playbackRate' in section.visual ? section.visual.playbackRate : 1,
      color: section.visual.color,
      slotSeconds: slots[index] ?? null,
      text: section.text,
    })),
  }
})

console.log(JSON.stringify(videos, null, 2))
