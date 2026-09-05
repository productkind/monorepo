/**
 * Turns one hand-written video component into a definition file.
 *
 * The hand-tuned `durationInFrames` values are not thrown away, they are the input: each cumulative
 * boundary names the word the author chose to cut on, and that word's position in the narration is
 * where the section text splits. So the migration recovers the author's intent rather than
 * re-deciding it, and the derived timeline lands back on the same frames.
 *
 *   npm run migrate -- --id social-016 --component SocialVideo016 \
 *     --alignment alignment-video-social-016-chloe.json --voice chloe --model eleven_v3
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

import type { Alignment, Word } from '../src/narration/words'
import { alignmentToWords } from '../src/narration/words'

const PROJECT_DIR = process.cwd()
// Retired: the hand-run ElevenLabs scripts that seeded this project's audio cache lived at
// little-parrot/content/audio and have been deleted. Every video in VIDEOS is already
// cached under public/<id>/audio, so nothing needs this; restore the folder from git
// history if you ever migrate one of the legacy LessonVideo compositions.
const LEGACY_AUDIO_DIR = resolve(PROJECT_DIR, '..', '..', 'little-parrot', 'content', 'audio')

type LegacySection = {
  durationInFrames: number
  visual: string
}

const argumentValue = ({ name }: { name: string }): string => {
  const argv = process.argv.slice(2)
  const index = argv.indexOf(`--${name}`)
  if (index === -1 || argv[index + 1] === undefined) {
    throw new Error(`Missing --${name}.`)
  }
  return argv[index + 1]
}

/** Evaluates the small sums the components use, such as `durationInFrames={87 + 15}`. */
const framesOf = ({ expression }: { expression: string }): number =>
  expression
    .split('+')
    .map((part) => Number(part.trim()))
    .reduce((total, part) => {
      if (Number.isNaN(part)) {
        throw new Error(`Cannot read durationInFrames={${expression}}.`)
      }
      return total + part
    }, 0)

const propOf = ({ tag, name }: { tag: string; name: string }): string | undefined => {
  const braced = new RegExp(`${name}=\\{([^}]*)\\}`).exec(tag)
  if (braced !== null) {
    return braced[1].trim()
  }
  const quoted = new RegExp(`${name}="([^"]*)"`).exec(tag)
  return quoted === null ? undefined : quoted[1]
}

const optionsOf = ({ entries }: { entries: [string, string | undefined][] }): string =>
  entries
    .filter((entry): entry is [string, string] => entry[1] !== undefined)
    .map(([name, value]) => `${name}: ${value}`)
    .join(', ')

/** `FullScreenImage` covered gifs and stills; `Video` covered clips. */
const visualOf = ({ tag, id }: { tag: string; id: string }): string => {
  const source = new RegExp(`staticFile\\('${id}/([^']+)'\\)`).exec(tag)
  if (source === null) {
    throw new Error(`No staticFile('${id}/…') in ${tag}`)
  }
  const src = source[1]
  const fit = propOf({ tag, name: 'fit' })
  const offset = propOf({ tag, name: 'offset' })
  const color = propOf({ tag, name: 'color' })
  const scale = propOf({ tag, name: 'scale' })

  if (tag.includes('<Video')) {
    const trimBefore = propOf({ tag, name: 'trimBefore' })
    return `clip({ ${optionsOf({
      entries: [
        ['src', `'${src}'`],
        ['trimBefore', trimBefore],
        ['offset', offset],
      ],
    })} })`
  }

  // `FullScreenImage` defaulted to fit "cover"; the new helpers default to "contain", which is
  // what all 451 explicit uses asked for. Where the old tag was silent, keep the old behaviour.
  const entries: [string, string | undefined][] = [
    ['src', `'${src}'`],
    ['offset', offset],
    ['color', color === undefined ? undefined : `'${color}'`],
    ['fit', fit === undefined ? "'cover'" : fit === 'contain' ? undefined : `'${fit}'`],
    ['scale', scale],
  ]
  const helper = src.endsWith('.gif') ? 'gif' : 'still'
  return `${helper}({ ${optionsOf({ entries })} })`
}

const legacySectionsOf = ({
  source,
  component,
  id,
}: {
  source: string
  component: string
  id: string
}): LegacySection[] => {
  const start = source.indexOf(`export const ${component}:`)
  if (start === -1) {
    throw new Error(`No component named ${component}.`)
  }
  const body = source.slice(start, source.indexOf('\nexport const ', start + 1))
  const sequences = [
    ...body.matchAll(/<Series\.Sequence durationInFrames=\{([^}]*)\}>([\s\S]*?)<\/Series\.Sequence>/g),
  ]
  if (sequences.length === 0) {
    throw new Error(`${component} has no Series.Sequence blocks.`)
  }
  return sequences.map((match) => ({
    durationInFrames: framesOf({ expression: match[1] }),
    visual: visualOf({ tag: match[2], id }),
  }))
}

const overlaysOf = ({
  source,
  component,
  durationInFrames,
}: {
  source: string
  component: string
  durationInFrames: number
}): string[] => {
  const start = source.indexOf(`export const ${component}:`)
  const body = source.slice(start, source.indexOf('\nexport const ', start + 1))
  return [
    ...body.matchAll(
      /<Sequence from=\{titleDuration(?:\s*\+\s*(\d+))?\}>\s*(?:[\s\S]*?)staticFile\('([^']*\.riv)'\)/g,
    ),
  ]
    .map((match) => ({ frame: match[1] === undefined ? 0 : Number(match[1]), rive: match[2] }))
    .filter((overlay) => {
      if (overlay.frame >= durationInFrames) {
        console.log(
          `  dropping ${overlay.rive} at frame ${overlay.frame}: past the end of a ` +
            `${durationInFrames}-frame video, so it never rendered`,
        )
        return false
      }
      return true
    })
    .map((overlay) => `riveAtFrame({ rive: '${overlay.rive}', frame: ${overlay.frame} })`)
}

/** The word the author cut on: the one whose start frame is closest to their chosen boundary. */
const wordNearest = ({
  words,
  frame,
  fps,
  after,
}: {
  words: Word[]
  frame: number
  fps: number
  after: number
}): number => {
  let best = after
  let bestDistance = Number.POSITIVE_INFINITY
  words.forEach((word, index) => {
    if (index <= after) {
      return
    }
    const distance = Math.abs(Math.ceil(word.start * fps) - frame)
    if (distance < bestDistance) {
      best = index
      bestDistance = distance
    }
  })
  return best
}

const main = (): void => {
  const id = argumentValue({ name: 'id' })
  const component = argumentValue({ name: 'component' })
  const voice = argumentValue({ name: 'voice' })
  const model = argumentValue({ name: 'model' })
  const fps = 30

  const alignmentPath = join(LEGACY_AUDIO_DIR, argumentValue({ name: 'alignment' }))
  if (!existsSync(alignmentPath)) {
    throw new Error(`No alignment at ${alignmentPath}.`)
  }
  const alignment: Alignment = JSON.parse(readFileSync(alignmentPath, 'utf8'))
  const text = alignment.characters.join('')
  const words = alignmentToWords({ alignment })

  const source = readFileSync(join(PROJECT_DIR, 'src', 'LessonVideo.tsx'), 'utf8')
  const legacy = legacySectionsOf({ source, component, id })

  let cumulative = 0
  let previousWord = 0
  const boundaries = [0]
  legacy.slice(0, -1).forEach((section) => {
    cumulative += section.durationInFrames
    const wordIndex = wordNearest({ words, frame: cumulative, fps, after: previousWord })
    boundaries.push(wordIndex)
    previousWord = wordIndex
  })

  const sections = boundaries.map((wordIndex, index) => {
    const from = wordIndex === 0 ? 0 : words[wordIndex].charFrom
    const next = boundaries[index + 1]
    const to = next === undefined ? text.length : words[next].charFrom
    const raw = text.slice(from, to)
    return {
      // Section text is readable copy, so the whitespace the template literal carried is dropped
      // here and put back by planTakes. A blank line becomes `endsParagraph` instead.
      text: raw.replace(/\s+/g, ' ').trim(),
      endsParagraph: /\n\s*\n/.test(raw),
      visual: legacy[index].visual,
    }
  })

  const spokenOf = (value: string): string => value.replace(/\s+/g, ' ').trim()
  if (spokenOf(sections.map((section) => section.text).join(' ')) !== spokenOf(text)) {
    throw new Error('The sections do not reassemble the script, so a boundary was misplaced.')
  }

  const overlays = overlaysOf({
    source,
    component,
    durationInFrames: Math.ceil(words[words.length - 1].end * fps) + 6,
  })
  const helpers = [
    ...new Set(sections.map((section) => section.visual.replace(/\(.*/s, ''))),
    'defineVideo',
    ...(overlays.length > 0 ? ['riveAtFrame'] : []),
  ].sort()

  const file = [
    `import { ${helpers.join(', ')} } from '../narration/definition'`,
    '',
    'export default defineVideo({',
    `  id: '${id}',`,
    `  voice: '${voice}',`,
    `  model: '${model}',`,
    ...(overlays.length > 0
      ? ['  overlays: [', ...overlays.map((overlay) => `    ${overlay},`), '  ],']
      : []),
    '  sections: [',
    ...sections.flatMap((section) => [
      '    {',
      `      text: ${JSON.stringify(section.text)},`,
      `      visual: ${section.visual},`,
      ...(section.endsParagraph ? ['      endsParagraph: true,'] : []),
      '    },',
    ]),
    '  ],',
    '})',
    '',
  ].join('\n')

  const output = join(PROJECT_DIR, 'src', 'videos', `${id}.ts`)
  writeFileSync(output, file)
  console.log(
    `Wrote ${output}: ${sections.length} sections, ${overlays.length} overlay(s), ` +
      `${text.length} characters of script.`,
  )
}

main()
