/**
 * Moves every provenance comment into the definition as data.
 *
 *   npm run migrate-provenance -- --check    say what would change, write nothing
 *   npm run migrate-provenance
 *
 * Run once. A comment records where a gif came from in prose, which means the id — the thing that
 * says whether a campaign is about to use the same gif twice — has to be re-derived from a URL,
 * and only a giphy URL carries one. Two of video 7's picks repeated video 5 for that reason.
 *
 * Time matters for the klipy records: their ids come back only through the mapping the harvest
 * wrote to a temporary folder. Once that is cleared they cannot be recovered from the definitions
 * at all.
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

import { readVisuals, sourceFor, withVisualApplied } from '../src/videos/apply-visual'

const VIDEOS = resolve(process.cwd(), 'src', 'videos')
const RECORDED = join(tmpdir(), 'gif-candidates', '.sources.json')

/** The harvest recorded id to url; a migration needs it the other way round. */
const byUrl = (): Record<string, string> => {
  try {
    const recorded: unknown = JSON.parse(readFileSync(RECORDED, 'utf8'))
    if (typeof recorded !== 'object' || recorded === null) {
      return {}
    }
    return Object.fromEntries(
      Object.entries(recorded).flatMap(([id, url]) => (typeof url === 'string' ? [[url, id]] : [])),
    )
  } catch {
    return {}
  }
}

const definitions = (): string[] =>
  readdirSync(VIDEOS)
    .filter((name) => name.endsWith('.ts') && !name.endsWith('.test.ts'))
    .filter((name) => name !== 'index.ts' && name !== 'apply-visual.ts')
    .sort((left, right) => left.localeCompare(right))

const migrate = ({
  name,
  recorded,
  check,
}: {
  name: string
  recorded: Record<string, string>
  check: boolean
}): { moved: number; withoutId: number; unresolved: string[] } => {
  const path = join(VIDEOS, name)
  const unresolved: string[] = []
  let withoutId = 0
  let source = readFileSync(path, 'utf8')
  let moved = 0

  // Read once, then apply one section at a time: each write shifts the offsets of the next.
  const visuals = readVisuals({ source })
  for (const visual of visuals) {
    if (visual.provenance === undefined) {
      continue
    }
    const found = sourceFor({ provenance: visual.provenance, byUrl: recorded })
    if (found === null) {
      unresolved.push(
        `§${String(visual.index).padStart(2, '0')} ${visual.provenance.provider} ${visual.provenance.url}`,
      )
      continue
    }
    if (visual.kind === 'still') {
      // A still was made rather than found, so no provider ever described one.
      unresolved.push(`§${String(visual.index).padStart(2, '0')} a still, left alone`)
      continue
    }
    source = withVisualApplied({
      source,
      section: visual.index,
      visual:
        visual.kind === 'clip'
          ? {
              kind: 'clip',
              src: visual.src,
              ...(visual.place === 'above-captions' ? { place: 'above-captions' as const } : {}),
              ...(visual.trimBefore === undefined ? {} : { trimBefore: visual.trimBefore }),
              source: found,
            }
          : {
              kind: 'gif',
              src: visual.src,
              ...(visual.place === 'above-captions' ? { place: 'above-captions' as const } : {}),
              ...(visual.color === undefined ? {} : { color: visual.color }),
              ...(visual.playbackRate === undefined ? {} : { playbackRate: visual.playbackRate }),
              source: found,
            },
    })
    moved += 1
    if (found.id === undefined) {
      withoutId += 1
    }
  }

  if (!check && moved > 0) {
    writeFileSync(path, source)
  }
  return { moved, withoutId, unresolved }
}

const main = (): void => {
  const check = process.argv.includes('--check')
  const recorded = byUrl()
  console.log(
    `${String(Object.keys(recorded).length)} harvested urls available to resolve ids from` +
      (Object.keys(recorded).length === 0 ? ` — ${RECORDED} is gone, klipy ids cannot come back` : ''),
  )

  let moved = 0
  let stuck = 0
  let idless = 0
  for (const name of definitions()) {
    const result = migrate({ name, recorded, check })
    moved += result.moved
    stuck += result.unresolved.length
    idless += result.withoutId
    if (result.moved > 0 || result.unresolved.length > 0) {
      console.log(
        `${name}: ${String(result.moved)} recorded` +
          (result.withoutId === 0 ? '' : `, ${String(result.withoutId)} without an id`) +
          (check ? ' (unchanged)' : ''),
      )
      result.unresolved.forEach((line) => {
        console.log(`    unresolved ${line}`)
      })
    }
  }
  console.log(
    `\n${String(moved)} section(s) ${check ? 'would move' : 'moved'} to data` +
      (idless === 0
        ? ''
        : `, of which ${String(idless)} keep their comment because only a note was written where ` +
          'the url should be, and their id was never recorded') +
      (stuck === 0 ? '' : `, ${String(stuck)} unresolved`),
  )
}

main()
