import type { VideoDefinition } from '../narration/definition'

/**
 * Narrows a run to the videos named on the command line.
 *
 * Generating audio costs credits per character, so a run that was meant for one video must not
 * quietly pay for its siblings — which is exactly what a whole-catalogue default does once a
 * script has variants. An unmatched name throws rather than narrowing to nothing, because the
 * cheap-looking outcome of a typo is the expensive one: no filter applied.
 */
export const selectVideos = ({
  videos,
  only,
}: {
  videos: VideoDefinition[]
  only: string[]
}): VideoDefinition[] => {
  if (only.length === 0) {
    return videos
  }
  const missing = only.filter((id) => !videos.some((video) => video.id === id))
  if (missing.length > 0) {
    throw new Error(
      `No video named ${missing.join(', ')}. Known videos: ${videos.map((video) => video.id).join(', ')}.`,
    )
  }
  return videos.filter((video) => only.includes(video.id))
}
