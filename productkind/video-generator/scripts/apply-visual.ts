/**
 * Applies a chosen visual to one section of a video definition.
 *
 *   npm run apply-visual -- --video pm-... --section 14 --src section-14-bulb.gif \
 *       --provider giphy --id abc123 --search "lightbulb idea" [--color '#298c8c'] [--rate 0.72] \
 *       [--place above-captions]
 *
 * A stock clip is the same command with `--kind clip`, which keeps it a `clip(...)`: a gif and a
 * clip are not interchangeable, and writing one as the other would turn a six-second clip into a
 * frozen frame.
 *
 * The desk's API shells out to this rather than editing the file itself, so the one piece of code
 * that rewrites a hand-authored definition lives in the package that owns those definitions and is
 * covered by its tests.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { isProvider, PROVIDERS } from '../src/narration/definition'
import type { AppliedVisual } from '../src/videos/apply-visual'
import { withVisualApplied } from '../src/videos/apply-visual'

const valueOf = ({ name }: { name: string }): string | undefined => {
  const index = process.argv.indexOf(`--${name}`)
  return index === -1 ? undefined : process.argv[index + 1]
}

const required = ({ name }: { name: string }): string => {
  const value = valueOf({ name })
  if (value === undefined || value === '') {
    throw new Error(`--${name} is required.`)
  }
  return value
}

const main = (): void => {
  const video = required({ name: 'video' })
  const section = Number(required({ name: 'section' }))
  const rate = valueOf({ name: 'rate' })
  const trim = valueOf({ name: 'trim' })
  const provider = required({ name: 'provider' })
  if (!isProvider(provider)) {
    throw new Error(`--provider must be one of: ${PROVIDERS.join(', ')}`)
  }
  const id = valueOf({ name: 'id' })
  const author = valueOf({ name: 'author' })
  const found = {
    provider,
    // Absent when a pick predates ids being kept; never invented.
    ...(id === undefined ? {} : { id }),
    search: required({ name: 'search' }),
    // Pexels asks for the credit, which cannot be written without the name.
    ...(author === undefined ? {} : { author }),
  }
  const src = required({ name: 'src' })
  // Where the section already sat. Carried rather than assumed: every gif in the repo sits above
  // the captions and stock clips fill the frame, so a kind change that dropped this would move
  // the picture.
  const place = valueOf({ name: 'place' }) === 'above-captions' ? 'above-captions' : undefined
  const visual: AppliedVisual =
    valueOf({ name: 'kind' }) === 'clip'
      ? {
          kind: 'clip',
          src,
          ...(place === undefined ? {} : { place }),
          ...(trim === undefined ? {} : { trimBefore: Number(trim) }),
          source: found,
        }
      : {
          kind: 'gif',
          src,
          ...(place === undefined ? {} : { place }),
          color: valueOf({ name: 'color' }),
          playbackRate: rate === undefined ? undefined : Number(rate),
          source: found,
        }

  const path = resolve(process.cwd(), 'src', 'videos', `${video}.ts`)
  const source = readFileSync(path, 'utf8')
  writeFileSync(path, withVisualApplied({ source, section, visual }))
  console.log(`${video} §${String(section).padStart(2, '0')} -> ${visual.src}`)
}

main()
