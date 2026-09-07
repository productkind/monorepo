/**
 * Applies a chosen gif to one section of a video definition.
 *
 *   npm run apply-visual -- --video pm-... --section 14 --src section-14-bulb.gif \
 *       --search "lightbulb idea" --url https://giphy.com/gifs/abc123 [--color '#298c8c'] [--rate 0.72]
 *
 * The desk's API shells out to this rather than editing the file itself, so the one piece of code
 * that rewrites a hand-authored definition lives in the package that owns those definitions and is
 * covered by its tests.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import type { AppliedVisual, Provenance } from '../src/videos/apply-visual'
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
  const visual: AppliedVisual = {
    src: required({ name: 'src' }),
    color: valueOf({ name: 'color' }),
    playbackRate: rate === undefined ? undefined : Number(rate),
  }
  const provenance: Provenance = {
    search: required({ name: 'search' }),
    url: required({ name: 'url' }),
  }

  const path = resolve(process.cwd(), 'src', 'videos', `${video}.ts`)
  const source = readFileSync(path, 'utf8')
  writeFileSync(path, withVisualApplied({ source, section, visual, provenance }))
  console.log(`${video} §${String(section).padStart(2, '0')} -> ${visual.src}`)
}

main()
