/**
 * Builds the narration for every video: generates or reuses the audio for each take, then writes
 * the frame timeline the composition renders from.
 *
 * Nothing here runs inside Remotion. `calculateMetadata` is evaluated in a browser (verified), so
 * it can neither read the filesystem nor hold an API key. It fetches the `timeline.json` this
 * script writes.
 *
 * Audio is cached per video under `public/<id>/audio`, keyed by everything audible — the take's
 * text, the voice, the model and the settings — and by nothing else. So a second cut of a video,
 * same script and different visuals, adopts the first cut's takes instead of paying to generate
 * them again; the copy is logged and the bytes are identical.
 *
 *   npm run narrate              build every video, reusing cached audio
 *   npm run narrate -- --check   fail if any timeline is missing or stale, never call the API
 *   npm run narrate -- --watch   rebuild when a definition changes
 *   npm run narrate -- --import  seed the cache from previously generated audio
 */
import type { AudioCache } from '../src/narration/audio-cache'
import { cachedTakeIn } from '../src/narration/audio-cache'
import type { VideoDefinition } from '../src/narration/definition'
import { audioCacheKey, spokenOnly, timelineHash } from '../src/narration/definition'
import { planTakes } from '../src/narration/takes'
import type { RenderedTake } from '../src/narration/timeline'
import { buildTimeline } from '../src/narration/timeline'
import { HOUSE_VOICE_SETTINGS, voiceIdFor } from '../src/narration/voices'
import type { Alignment } from '../src/narration/words'
import { VIDEOS } from '../src/videos/index'

import { existsSync, mkdirSync, readdirSync, readFileSync, watch, writeFileSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'

/** Run as an npm script, so the working directory is the video package. */
const PROJECT_DIR = process.cwd()
const PUBLIC_DIR = resolve(PROJECT_DIR, 'public')
// Retired: the hand-run ElevenLabs scripts that seeded this project's audio cache lived at
// little-parrot/content/audio and have been deleted. Every video in VIDEOS is already
// cached under public/<id>/audio, so nothing needs this; restore the folder from git
// history if you ever migrate one of the legacy LessonVideo compositions.
const LEGACY_AUDIO_DIR = resolve(PROJECT_DIR, '..', '..', 'little-parrot', 'content', 'audio')
const ELEVENLABS_ENDPOINT = 'https://api.elevenlabs.io/v1/text-to-speech'

type Mode = 'build' | 'check' | 'watch'

type CachedTake = {
  /** Path relative to the public folder, which is what the composition loads. */
  audio: string
  alignment: Alignment
}

const audioDirFor = ({ id }: { id: string }): string => join(PUBLIC_DIR, id, 'audio')

/**
 * The extension has to describe the actual bytes. ElevenLabs has returned both over time: the
 * older narration is real RIFF, the newer is MP3 that was nonetheless saved as `.wav`.
 */
const extensionFor = ({ bytes }: { bytes: Buffer }): string => {
  if (bytes.subarray(0, 4).toString('latin1') === 'RIFF') {
    return 'wav'
  }
  if (bytes.subarray(0, 3).toString('latin1') === 'ID3' || bytes[0] === 0xff) {
    return 'mp3'
  }
  throw new Error('Unrecognised audio; expected RIFF or MP3.')
}

const alignmentPathFor = ({ id, key }: { id: string; key: string }): string =>
  join(audioDirFor({ id }), `${key}.alignment.json`)

const readAlignment = ({ path }: { path: string }): Alignment => {
  const parsed: unknown = JSON.parse(readFileSync(path, 'utf8'))
  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    !('characters' in parsed) ||
    !('character_start_times_seconds' in parsed) ||
    !('character_end_times_seconds' in parsed)
  ) {
    throw new Error(`${path} is not an ElevenLabs alignment.`)
  }
  const { characters, character_start_times_seconds, character_end_times_seconds } = parsed
  if (
    !Array.isArray(characters) ||
    !Array.isArray(character_start_times_seconds) ||
    !Array.isArray(character_end_times_seconds)
  ) {
    throw new Error(`${path} has an alignment with non-array fields.`)
  }
  return { characters, character_start_times_seconds, character_end_times_seconds }
}

/** The audio's spoken length. Taken from the alignment so no audio file has to be decoded. */
const spokenSecondsOf = ({ alignment }: { alignment: Alignment }): number => {
  const ends = alignment.character_end_times_seconds
  return ends.length === 0 ? 0 : ends[ends.length - 1]
}

/** Every video's audio folder, this video's first so it always prefers its own copy. */
const cachesFor = ({ id }: { id: string }): AudioCache[] => {
  const others = existsSync(PUBLIC_DIR) ? readdirSync(PUBLIC_DIR).filter((name) => name !== id) : []
  return [id, ...others]
    .filter((video) => existsSync(audioDirFor({ id: video })))
    .map((video) => ({ video, names: readdirSync(audioDirFor({ id: video })) }))
}

/**
 * The cached take for this video, or another video's copy of the same narration.
 *
 * A second cut of a video — same script, different visuals — has the same take text in the same
 * voice, so `audioCacheKey` gives it the same key. Without this it would be a cache miss purely
 * because the folder is named after the other video, and the narration would be paid for twice.
 */
const findCached = ({ id, key }: { id: string; key: string }): CachedTake | undefined => {
  const found = cachedTakeIn({ key, caches: cachesFor({ id }) })
  if (found === undefined || found.video !== id) {
    return undefined
  }
  return {
    audio: `${id}/audio/${found.audio}`,
    alignment: readAlignment({ path: join(audioDirFor({ id }), found.alignment) }),
  }
}

/**
 * Copies a sibling video's take into this video's folder, so each `public/<id>/` stays
 * self-contained and no render depends on another video's assets still being there.
 */
const adoptCached = ({ id, key }: { id: string; key: string }): CachedTake | undefined => {
  const found = cachedTakeIn({ key, caches: cachesFor({ id }) })
  if (found === undefined || found.video === id) {
    return undefined
  }
  const directory = audioDirFor({ id: found.video })
  console.log(`  ${id} <- reusing the narration already generated for ${found.video}`)
  return writeCached({
    id,
    key,
    audio: readFileSync(join(directory, found.audio)),
    alignment: readAlignment({ path: join(directory, found.alignment) }),
  })
}

const writeCached = ({
  id,
  key,
  audio,
  alignment,
}: {
  id: string
  key: string
  audio: Buffer
  alignment: Alignment
}): CachedTake => {
  const directory = audioDirFor({ id })
  mkdirSync(directory, { recursive: true })
  const name = `${key}.${extensionFor({ bytes: audio })}`
  writeFileSync(join(directory, name), audio)
  writeFileSync(alignmentPathFor({ id, key }), `${JSON.stringify(alignment, null, 2)}\n`)
  return { audio: `${id}/audio/${name}`, alignment }
}

/**
 * Seeds the cache from narration that was generated before this pipeline existed, matching purely
 * on the text: an ElevenLabs alignment echoes its input character for character, so a legacy
 * alignment whose characters rebuild a take's text was generated from exactly that take.
 */
const importLegacyAudio = ({ definitions }: { definitions: VideoDefinition[] }): void => {
  if (!existsSync(LEGACY_AUDIO_DIR)) {
    console.log(`No legacy audio at ${LEGACY_AUDIO_DIR}; nothing to import.`)
    return
  }

  const legacyByText = new Map<string, { alignment: Alignment; audioPath: string }>()
  readdirSync(LEGACY_AUDIO_DIR)
    .filter((name) => name.startsWith('alignment-') && name.endsWith('.json'))
    .forEach((name) => {
      const stem = basename(name, '.json').replace(/^alignment-/, '')
      const audioPath = join(LEGACY_AUDIO_DIR, `generated_speech-${stem}.wav`)
      if (!existsSync(audioPath)) {
        return
      }
      const alignment = readAlignment({ path: join(LEGACY_AUDIO_DIR, name) })
      legacyByText.set(spokenOnly(alignment.characters.join('')), { alignment, audioPath })
    })

  let imported = 0
  let missing = 0
  definitions.forEach((definition) => {
    planTakes({
      sections: definition.sections,
      splitOnBlankLines: definition.splitOnBlankLines,
    }).forEach((take) => {
      const key = audioCacheKey({
        text: take.text,
        voice: definition.voice,
        model: definition.model,
        settings: HOUSE_VOICE_SETTINGS,
      })
      if (findCached({ id: definition.id, key }) !== undefined) {
        return
      }
      const legacy = legacyByText.get(spokenOnly(take.text))
      if (legacy === undefined) {
        missing += 1
        console.log(`  no legacy audio matches a take of ${definition.id}`)
        return
      }
      writeCached({
        id: definition.id,
        key,
        audio: readFileSync(legacy.audioPath),
        alignment: legacy.alignment,
      })
      imported += 1
      console.log(`  ${definition.id} <- ${basename(legacy.audioPath)}`)
    })
  })

  console.log(
    `Imported ${imported} take(s) from ${LEGACY_AUDIO_DIR}` +
      (missing > 0 ? `; ${missing} still need generating.` : '.'),
  )
}

const readAlignmentFromValue = ({ value, id }: { value: unknown; id: string }): Alignment => {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('characters' in value) ||
    !('character_start_times_seconds' in value) ||
    !('character_end_times_seconds' in value) ||
    !Array.isArray(value.characters) ||
    !Array.isArray(value.character_start_times_seconds) ||
    !Array.isArray(value.character_end_times_seconds)
  ) {
    throw new Error(`ElevenLabs returned no usable alignment for ${id}.`)
  }
  return {
    characters: value.characters,
    character_start_times_seconds: value.character_start_times_seconds,
    character_end_times_seconds: value.character_end_times_seconds,
  }
}

const generateTake = async ({
  definition,
  text,
  key,
}: {
  definition: VideoDefinition
  text: string
  key: string
}): Promise<CachedTake> => {
  const apiKey = process.env.ELEVENLABS_API_KEY
  if (apiKey === undefined || apiKey === '') {
    throw new Error(
      'ELEVENLABS_API_KEY is not set, so this take cannot be narrated. Put the key in .env at ' +
        'the repo root (see .env.example).',
    )
  }

  const voiceId = voiceIdFor({ voice: definition.voice })
  console.log(
    `  generating ${definition.id} (${text.length} characters, voice ${definition.voice})`,
  )

  const response = await fetch(`${ELEVENLABS_ENDPOINT}/${voiceId}/with-timestamps`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'xi-api-key': apiKey },
    body: JSON.stringify({
      text,
      model_id: definition.model,
      voice_settings: HOUSE_VOICE_SETTINGS,
      output_format: 'mp3_44100_128',
    }),
  })
  if (!response.ok) {
    throw new Error(
      `ElevenLabs refused the request for ${definition.id}: ${response.status} ` +
        `${response.statusText} — ${await response.text()}`,
    )
  }

  const payload: unknown = await response.json()
  if (
    typeof payload !== 'object' ||
    payload === null ||
    !('audio_base64' in payload) ||
    !('alignment' in payload) ||
    typeof payload.audio_base64 !== 'string'
  ) {
    throw new Error(`ElevenLabs returned no audio for ${definition.id}.`)
  }

  return writeCached({
    id: definition.id,
    key,
    audio: Buffer.from(payload.audio_base64, 'base64'),
    alignment: readAlignmentFromValue({ value: payload.alignment, id: definition.id }),
  })
}

const buildVideo = async ({
  definition,
  mode,
  allowGenerate,
}: {
  definition: VideoDefinition
  mode: Mode
  allowGenerate: boolean
}): Promise<{ id: string; stale: boolean; reason?: string }> => {
  const takes = planTakes({
    sections: definition.sections,
    splitOnBlankLines: definition.splitOnBlankLines,
  })

  const rendered: RenderedTake[] = []
  for (const take of takes) {
    const key = audioCacheKey({
      text: take.text,
      voice: definition.voice,
      model: definition.model,
      settings: HOUSE_VOICE_SETTINGS,
    })
    // A check must not write, so adopting a sibling's take is left to a real run.
    const cached =
      findCached({ id: definition.id, key }) ??
      (mode === 'check' ? undefined : adoptCached({ id: definition.id, key }))
    if (cached === undefined) {
      if (mode === 'check') {
        const elsewhere = cachedTakeIn({ key, caches: cachesFor({ id: definition.id }) })
        return {
          id: definition.id,
          stale: true,
          reason:
            elsewhere === undefined
              ? 'a take has no narrated audio'
              : `a take is already narrated for ${elsewhere.video} and only needs copying in, ` +
                'so "npm run narrate" will fix this without calling the API',
        }
      }
      if (!allowGenerate) {
        return {
          id: definition.id,
          stale: true,
          reason:
            `a take of ${take.text.length} characters has no cached audio. Re-run with ` +
            '--allow-generate to narrate it (this calls ElevenLabs and costs credits).',
        }
      }
      const generated = await generateTake({ definition, text: take.text, key })
      rendered.push({
        ...take,
        ...generated,
        audioDurationInSeconds: spokenSecondsOf({ alignment: generated.alignment }),
      })
      continue
    }
    rendered.push({
      ...take,
      ...cached,
      audioDurationInSeconds: spokenSecondsOf({ alignment: cached.alignment }),
    })
  }

  const timeline = buildTimeline({
    takes: rendered,
    fps: definition.fps,
    tailFrames: definition.tailFrames,
  })
  const hash = timelineHash({ definition })
  const path = join(PUBLIC_DIR, definition.id, 'timeline.json')

  if (mode === 'check') {
    if (!existsSync(path)) {
      return { id: definition.id, stale: true, reason: 'timeline.json has not been built' }
    }
    const existing: unknown = JSON.parse(readFileSync(path, 'utf8'))
    const existingHash =
      typeof existing === 'object' && existing !== null && 'hash' in existing
        ? existing.hash
        : undefined
    if (existingHash !== hash) {
      return { id: definition.id, stale: true, reason: 'timeline.json is stale' }
    }
    return { id: definition.id, stale: false }
  }

  mkdirSync(join(PUBLIC_DIR, definition.id), { recursive: true })
  writeFileSync(path, `${JSON.stringify({ hash, ...timeline }, null, 2)}\n`)
  console.log(
    `  ${definition.id}: ${timeline.sections.length} sections, ` +
      `${timeline.durationInFrames} frames, ${timeline.words.length} words`,
  )
  return { id: definition.id, stale: false }
}

const runOnce = async ({
  mode,
  allowGenerate,
}: {
  mode: Mode
  allowGenerate: boolean
}): Promise<boolean> => {
  const results = []
  for (const definition of VIDEOS) {
    results.push(await buildVideo({ definition, mode, allowGenerate }))
  }

  const stale = results.filter((result) => result.stale)
  if (stale.length === 0) {
    console.log(mode === 'check' ? 'Every timeline is up to date.' : 'Done.')
    return true
  }
  stale.forEach((result) => {
    console.error(`  ${result.id}: ${result.reason ?? 'stale'}`)
  })
  console.error(
    mode === 'check'
      ? `${stale.length} video(s) need "npm run narrate" before they will render correctly.`
      : `${stale.length} video(s) could not be built.`,
  )
  return false
}

const main = async (): Promise<void> => {
  if (!existsSync(PUBLIC_DIR)) {
    throw new Error(
      `No public folder at ${PUBLIC_DIR}. Run this from the video package, via "npm run narrate".`,
    )
  }
  const argv = process.argv.slice(2)
  const mode: Mode = argv.includes('--check')
    ? 'check'
    : argv.includes('--watch')
      ? 'watch'
      : 'build'
  const allowGenerate = argv.includes('--allow-generate')

  if (argv.includes('--import')) {
    importLegacyAudio({ definitions: VIDEOS })
  }

  const ok = await runOnce({ mode: mode === 'watch' ? 'build' : mode, allowGenerate })

  if (mode !== 'watch') {
    process.exitCode = ok ? 0 : 1
    return
  }

  const watched = resolve(PROJECT_DIR, 'src')
  console.log(`Watching ${watched} for definition changes.`)
  let queued: NodeJS.Timeout | undefined = undefined
  watch(watched, { recursive: true }, (_event, filename) => {
    if (filename === null || !/\.(ts|tsx)$/.test(filename) || filename.includes('.test.')) {
      return
    }
    if (queued !== undefined) {
      clearTimeout(queued)
    }
    queued = setTimeout(() => {
      console.log(`\n${filename} changed, rebuilding.`)
      void runOnce({ mode: 'build', allowGenerate })
    }, 200)
  })
}

void main()
