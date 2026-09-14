import { type AuditDependenciesEvent, eventCreators, type MisdeclaredDependency } from './events.ts'

import {
  DUNGAREES_LIBRARY_PATHS,
  type DungareesLibraryPaths,
} from '@dungarees/bin-shared-domain/library-paths.ts'
import {
  excludeInstalledDependencies,
  isTestFile,
} from '@dungarees/bin-shared-domain/source-files.ts'
import { createCausedError } from '@dungarees/core/error.ts'
import type { TextFileReader } from '@dungarees/fs/service.ts'
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
  dependencies: string[]
  devDependencies: string[]
  peerDependencies: string[]
  scriptCommands: string[]
}

export type SourceFile = {
  path: string
  content: string
}

export type DependencyFindings = {
  name: string
  missing: string[]
  unused: string[]
  misdeclared: MisdeclaredDependency[]
}

const MANIFEST = z.object({
  name: z.string(),
  dependencies: z.record(z.string()).optional(),
  devDependencies: z.record(z.string()).optional(),
  peerDependencies: z.record(z.string()).optional(),
  scripts: z.record(z.string()).optional(),
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
    dependencies: Object.keys(manifest.dependencies ?? {}),
    devDependencies: Object.keys(manifest.devDependencies ?? {}),
    peerDependencies: Object.keys(manifest.peerDependencies ?? {}),
    scriptCommands: Object.values(manifest.scripts ?? {}),
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
    .reduce<string | undefined>(
      (deepest, dir) => (deepest === undefined || dir.length > deepest.length ? dir : deepest),
      undefined,
    )

export const auditPackages = ({
  manifests,
  sources,
}: {
  manifests: PackageManifest[]
  sources: SourceFile[]
}): DependencyFindings[] => {
  const dirs = manifests.map(({ dir }) => dir)
  const importsByDir = new Map<string, { shipped: Set<string>; tested: Set<string> }>(
    dirs.map((dir) => [dir, { shipped: new Set<string>(), tested: new Set<string>() }]),
  )
  sources.forEach(({ path: filePath, content }) => {
    const owner = findOwnerDir({ filePath, dirs })
    if (owner === undefined) {
      return
    }
    const imports = importsByDir.get(owner)
    getImportedPackages(content).forEach((name) => {
      if (isTestFile(filePath)) {
        imports?.tested.add(name)
        return
      }
      imports?.shipped.add(name)
    })
  })

  return manifests.flatMap(
    ({ dir, name, dependencies, devDependencies, peerDependencies, scriptCommands }) => {
      const { shipped, tested } = importsByDir.get(dir) ?? {
        shipped: new Set<string>(),
        tested: new Set<string>(),
      }
      const shippedImports = [...shipped].filter((used) => used !== name)
      const imported = [...new Set([...shippedImports, ...tested])].filter((used) => used !== name)
      const declared = [...dependencies, ...devDependencies, ...peerDependencies]
      const missing = imported.filter((used) => !declared.includes(used))
      const unused = declared.filter(
        (dependency) =>
          !imported.includes(dependency) &&
          !isRunByAScript({ dependency, scriptCommands }) &&
          !isTypesPackage(dependency),
      )
      const misdeclared: MisdeclaredDependency[] = [
        ...dependencies
          .filter(
            (dependency) =>
              tested.has(dependency) &&
              !shippedImports.includes(dependency) &&
              !isRunByAScript({ dependency, scriptCommands }),
          )
          .map((dependency) => ({ name: dependency, expected: 'devDependency' as const })),
        ...devDependencies
          .filter(
            (dependency) =>
              shippedImports.includes(dependency) && !peerDependencies.includes(dependency),
          )
          .map((dependency) => ({ name: dependency, expected: 'dependency' as const })),
      ]
      return missing.length === 0 && unused.length === 0 && misdeclared.length === 0
        ? []
        : [{ name, missing, unused, misdeclared }]
    },
  )
}

export const readFiles = (readFile: TextFileReader): OperatorFunction<string[], SourceFile[]> =>
  mergeMap((paths) =>
    paths.length === 0
      ? of<SourceFile[]>([])
      : forkJoin(
          paths.map((filePath) =>
            readFile(filePath).pipe(map((content) => ({ path: filePath, content }))),
          ),
        ),
  )

// A types package is never imported by name: it augments the module it provides types for, so tsc
// picks it up from the import of that module instead.
const isTypesPackage = (dependency: string): boolean => dependency.startsWith('@types/')

// A package run as a command is used without being imported, but the binary it installs cannot be
// derived from its name, so the ones this repo runs are named here.
const COMMAND_BINARIES: Record<string, string> = {
  typescript: 'tsc',
  vitest: 'vitest',
}

const isRunByAScript = ({
  dependency,
  scriptCommands,
}: {
  dependency: string
  scriptCommands: string[]
}): boolean => {
  const binary = COMMAND_BINARIES[dependency]
  return (
    binary !== undefined && scriptCommands.some((command) => command.split(/\s+/).includes(binary))
  )
}

export const getAuditStartEvent = ({ dir }: { dir: string }): Observable<AuditDependenciesEvent> =>
  of(eventCreators.auditStart({ dir }))

const readManifests = (readFile: TextFileReader): OperatorFunction<string[], PackageManifest[]> =>
  pipe(
    excludeInstalledDependencies(),
    readFiles(readFile),
    map((files) =>
      files.map(({ path: manifestPath, content }) => parseManifest({ manifestPath, content })),
    ),
    catchAndRethrow((cause: unknown) =>
      createCausedError({ message: 'Invalid package.json', cause }),
    ),
  )

const readSources = (readFile: TextFileReader): OperatorFunction<string[], SourceFile[]> =>
  pipe(excludeInstalledDependencies(), readFiles(readFile))

export type DependencyAuditPaths = DungareesLibraryPaths & {
  sources: string
}

const DEPENDENCY_AUDIT_PATHS: DependencyAuditPaths = {
  ...DUNGAREES_LIBRARY_PATHS,
  sources: '**/*.{ts,tsx}',
}

export const getManifestsAndSources = ({
  dir,
  glob,
  readFile,
  paths = DEPENDENCY_AUDIT_PATHS,
}: {
  dir: string
  glob: (pattern: string) => Observable<string[]>
  readFile: TextFileReader
  paths?: DependencyAuditPaths
}): Observable<{ manifests: PackageManifest[]; sources: SourceFile[] }> => {
  const sourceDir = `${dir}/${paths.sourceDir}`
  return forkJoin({
    manifests: glob(`${sourceDir}/${paths.manifests}`).pipe(readManifests(readFile)),
    sources: glob(`${sourceDir}/${paths.sources}`).pipe(readSources(readFile)),
  })
}

export const reportFindings = (): OperatorFunction<
  { manifests: PackageManifest[]; sources: SourceFile[] },
  AuditDependenciesEvent
> =>
  mergeMap(({ manifests, sources }) => {
    const findings = auditPackages({ manifests, sources })
    return concat(
      from(findings.map((finding) => eventCreators.packageFindings(finding))),
      of(
        findings.length === 0
          ? eventCreators.auditPassed({ packageCount: manifests.length })
          : eventCreators.auditFailed({
              packageCount: manifests.length,
              findingCount: findings.length,
            }),
      ),
    )
  })
