/**
 * Which narrated take on disk can serve a video.
 *
 * Audio is a pure function of what was sent to the voice API: `audioCacheKey` covers the text, the
 * voice, the model and the settings, and nothing else — not the video id. Two videos narrating the
 * same words in the same voice therefore want byte-identical audio, so a second cut of a video
 * (same script, different visuals) can read the first cut's take instead of paying to generate it
 * again. The cache still lives per video, under `public/<id>/audio`, so each video's folder stays
 * self-contained; this is the lookup that lets one seed another.
 */

/** One video's audio folder: the video it belongs to, and the filenames in it. */
export type AudioCache = {
  video: string
  names: string[]
}

export type CachedTakeFiles = {
  /** The video whose folder holds these files. */
  video: string
  audio: string
  alignment: string
}

const ALIGNMENT_SUFFIX = '.alignment.json'

/**
 * The audio half of a cached take. The dot matters: keys are hashes, so one key can be a prefix of
 * another, and `<key>.` is what separates a key from its extension.
 */
export const audioNameFor = ({
  key,
  names,
}: {
  key: string
  names: string[]
}): string | undefined =>
  names.find((name) => name.startsWith(`${key}.`) && !name.endsWith(ALIGNMENT_SUFFIX))

/**
 * The first cache holding both halves of the take. Order is the caller's preference, so passing a
 * video's own cache first makes it use its own copy rather than a sibling's.
 *
 * A cache with an alignment but no audio, or the reverse, is skipped rather than trusted: a
 * half-written cache would otherwise surface as a broken render instead of a missing take.
 */
export const cachedTakeIn = ({
  key,
  caches,
}: {
  key: string
  caches: AudioCache[]
}): CachedTakeFiles | undefined => {
  const alignment = `${key}${ALIGNMENT_SUFFIX}`
  for (const { video, names } of caches) {
    const audio = audioNameFor({ key, names })
    if (audio !== undefined && names.includes(alignment)) {
      return { video, audio, alignment }
    }
  }
  return undefined
}
