import path from 'node:path'
import { forkJoin, map, mergeMap, type Observable, of, type OperatorFunction } from 'rxjs'
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
