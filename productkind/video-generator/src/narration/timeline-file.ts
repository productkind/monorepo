import { staticFile } from 'remotion'

import type { VideoDefinition } from './definition'
import { timelineHash } from './definition'
import type { Timeline } from './timeline'

/**
 * `calculateMetadata` runs in a browser, in Studio and while rendering alike, so it cannot build
 * the narration itself. It reads what `npm run narrate` wrote, and refuses a timeline that no
 * longer matches its definition rather than rendering a video whose cuts are quietly wrong.
 */
export const loadTimeline = async ({
  definition,
}: {
  definition: VideoDefinition
}): Promise<Timeline> => {
  const path = `${definition.id}/timeline.json`
  const response = await fetch(staticFile(path))
  if (!response.ok) {
    throw new Error(
      `No ${path}. Run "npm run narrate" to build the narration for ${definition.id}.`,
    )
  }

  const parsed: unknown = await response.json()
  if (typeof parsed !== 'object' || parsed === null || !('hash' in parsed)) {
    throw new Error(`${path} is not a timeline. Re-run "npm run narrate".`)
  }
  if (parsed.hash !== timelineHash({ definition })) {
    throw new Error(
      `${path} was built from a different script than ${definition.id} now has. Run ` +
        '"npm run narrate" so the cuts match the narration.',
    )
  }

  return asTimeline({ value: parsed, path })
}

const asTimeline = ({ value, path }: { value: object; path: string }): Timeline => {
  if (
    !('fps' in value) ||
    !('durationInFrames' in value) ||
    !('words' in value) ||
    !('takes' in value) ||
    !('sections' in value) ||
    typeof value.fps !== 'number' ||
    typeof value.durationInFrames !== 'number' ||
    !Array.isArray(value.words) ||
    !Array.isArray(value.takes) ||
    !Array.isArray(value.sections)
  ) {
    throw new Error(`${path} is missing timeline fields. Re-run "npm run narrate".`)
  }
  return {
    fps: value.fps,
    durationInFrames: value.durationInFrames,
    words: value.words,
    takes: value.takes,
    sections: value.sections,
  }
}
