import { type AuditDependenciesEvent, eventCreators } from './events.ts'

import { createCausedError } from '@dungarees/core/error.ts'
import { catchAndRethrow } from '@dungarees/rxjs/util.ts'

import path from 'node:path'
import {
  concat,
  forkJoin,
  from,
  map,
  mergeMap,
  type Observable,
  of,
  type OperatorFunction,
  pipe,
} from 'rxjs'
import ts from 'typescript'
import { z } from 'zod'

export type PackageManifest = {
  dir: string
  name: string
  declared: string[]
}

export type SourceFile = {
  path: string
  content: string
}

export type DependencyFindings = {
  name: string
  missing: string[]
  unused: string[]
}

const MANIFEST = z.object({
  name: z.string(),
  dependencies: z.record(z.string()).optional(),
  devDependencies: z.record(z.string()).optional(),
})

// TypeScript's own scanner, so specifiers quoted inside template literals, strings and comments
// are not mistaken for imports — test fixtures are full of them.
export const getImportedPackages = (content: string): string[] => [
  ...new Set(
    ts
      .preProcessFile(content, true, true)
      .importedFiles.map(({ fileName }) => fileName)
      .filter((specifier) => !specifier.startsWith('.') && !specifier.startsWith('node:'))
      .map(toPackageName),
  ),
]

const toPackageName = (specifier: string): string => {
  const segments = specifier.split('/')
  return specifier.startsWith('@') ? segments.slice(0, 2).join('/') : (segments[0] ?? specifier)
}

export const parseManifest = ({
  manifestPath,
  content,
}: {
  manifestPath: string
  content: string
}): PackageManifest => {
  const manifest = MANIFEST.parse(JSON.parse(content))
  return {
    dir: path.dirname(manifestPath),
    name: manifest.name,
    declared: [
      ...Object.keys(manifest.dependencies ?? {}),
      ...Object.keys(manifest.devDependencies ?? {}),
    ],
  }
}

export const findOwnerDir = ({
  filePath,
  dirs,
}: {
  filePath: string
  dirs: string[]
}): string | undefined =>
  dirs
    .filter((dir) => filePath.startsWith(`${dir}/`))
    .reduce<
      string | undefined
    >((deepest, dir) => (deepest === undefined || dir.length > deepest.length ? dir : deepest), undefined)

export const isOutsideNodeModules = (filePath: string): boolean =>
  !filePath.split('/').includes('node_modules')

export const auditPackages = ({
  manifests,
  sources,
  usedWithoutImport = [],
}: {
  manifests: PackageManifest[]
  sources: SourceFile[]
  // Declaring these without importing them is legitimate — they are invoked as commands, or
  // pulled in by a runtime. Importing one undeclared is still a finding.
  usedWithoutImport?: string[]
}): DependencyFindings[] => {
  const dirs = manifests.map(({ dir }) => dir)
  const importsByDir = new Map<string, Set<string>>(dirs.map((dir) => [dir, new Set<string>()]))
  sources.forEach(({ path: filePath, content }) => {
    const owner = findOwnerDir({ filePath, dirs })
    if (owner === undefined) {
      return
    }
    getImportedPackages(content).forEach((name) => importsByDir.get(owner)?.add(name))
  })

  return manifests.flatMap(({ dir, name, declared }) => {
    const imported = [...(importsByDir.get(dir) ?? [])].filter((used) => used !== name)
    const missing = imported.filter((used) => !declared.includes(used))
    const unused = declared.filter(
      (dependency) => !imported.includes(dependency) && !usedWithoutImport.includes(dependency),
    )
    return missing.length === 0 && unused.length === 0 ? [] : [{ name, missing, unused }]
  })
}

export const readFiles = (
  readFile: (filePath: string) => Observable<string>,
): OperatorFunction<string[], SourceFile[]> =>
  mergeMap((paths) =>
    paths.length === 0
      ? of<SourceFile[]>([])
      : forkJoin(
          paths.map((filePath) =>
            readFile(filePath).pipe(map((content) => ({ path: filePath, content }))),
          ),
        ),
  )

// Declaring these without importing them is legitimate — tsc and vitest run as commands, and
// react arrives through the react-jsx runtime.
const PACKAGES_USED_WITHOUT_IMPORT = ['typescript', 'vitest', 'react']

export const getAuditStartEvent = ({ dir }: { dir: string }): Observable<AuditDependenciesEvent> =>
  of(eventCreators.auditStart({ dir }))

const excludeNodeModules = (): OperatorFunction<string[], string[]> =>
  map((paths) => paths.filter(isOutsideNodeModules))

const readManifests = (
  readFile: (filePath: string) => Observable<string>,
): OperatorFunction<string[], PackageManifest[]> =>
  pipe(
    excludeNodeModules(),
    readFiles(readFile),
    map((files) =>
      files.map(({ path: manifestPath, content }) => parseManifest({ manifestPath, content })),
    ),
    catchAndRethrow((cause: unknown) =>
      createCausedError({ message: 'Invalid package.json', cause }),
    ),
  )

const readSources = (
  readFile: (filePath: string) => Observable<string>,
): OperatorFunction<string[], SourceFile[]> => pipe(excludeNodeModules(), readFiles(readFile))

export const getManifestsAndSources = ({
  manifestPaths$,
  sourcePaths$,
  readFile,
}: {
  manifestPaths$: Observable<string[]>
  sourcePaths$: Observable<string[]>
  readFile: (filePath: string) => Observable<string>
}): Observable<{ manifests: PackageManifest[]; sources: SourceFile[] }> =>
  forkJoin({
    manifests: manifestPaths$.pipe(readManifests(readFile)),
    sources: sourcePaths$.pipe(readSources(readFile)),
  })

export const reportFindings = ({
  usedWithoutImport = PACKAGES_USED_WITHOUT_IMPORT,
}: { usedWithoutImport?: string[] } = {}): OperatorFunction<
  { manifests: PackageManifest[]; sources: SourceFile[] },
  AuditDependenciesEvent
> =>
  mergeMap(({ manifests, sources }) => {
    const findings = auditPackages({ manifests, sources, usedWithoutImport })
    return concat(
      from(findings.map((finding) => eventCreators.packageFindings(finding))),
      of(
        findings.length === 0
          ? eventCreators.auditPassed({ packageCount: manifests.length })
          : eventCreators.auditFailed({ packageCount: manifests.length }),
      ),
    )
  })
