import { type AuditDependenciesEvent, eventCreators } from './events.ts'
import {
  auditPackages,
  isOutsideNodeModules,
  type PackageManifest,
  parseManifest,
  readFiles,
} from './operations.ts'

import type { FileSystemService } from '@dungarees/fs/service.ts'
import { catchAndRethrow } from '@dungarees/rxjs/util.ts'

import { concat, forkJoin, from, map, mergeMap, type Observable, of } from 'rxjs'

export type AuditDependenciesFeatureOutput = {
  events$: Observable<AuditDependenciesEvent>
}

export type AuditDependenciesBehavior = {
  auditDependencies: (args: { dir: string }) => AuditDependenciesFeatureOutput
}

export type CreateAuditDependenciesBehaviorOptions = {
  fileSystem: FileSystemService
}

// tsc and vitest run as commands; react arrives via the react-jsx runtime. None of them appear
// in an import, so a package may declare them without using them in code.
const USED_WITHOUT_IMPORT = ['typescript', 'vitest', 'react']

export const createAuditDependenciesBehavior = ({
  fileSystem,
}: CreateAuditDependenciesBehaviorOptions): AuditDependenciesBehavior => {
  const readFile = (filePath: string): Observable<string> => fileSystem.readFile(filePath, 'utf-8')

  const globOutsideNodeModules = (pattern: string): Observable<string[]> =>
    fileSystem.glob(pattern).pipe(map((paths) => paths.filter(isOutsideNodeModules)))

  const auditDependencies: AuditDependenciesBehavior['auditDependencies'] = ({ dir }) => {
    const sourceDir = `${dir}/src`
    const manifests$ = globOutsideNodeModules(`${sourceDir}/**/package.json`).pipe(
      readFiles(readFile),
      map((files): PackageManifest[] =>
        files.map(({ path, content }) => parseManifest({ manifestPath: path, content })),
      ),
      catchAndRethrow((cause) => new Error(`Invalid package.json: ${cause.message}`, { cause })),
    )
    const sources$ = globOutsideNodeModules(`${sourceDir}/**/*.{ts,tsx}`).pipe(readFiles(readFile))

    const audit$ = forkJoin({ manifests: manifests$, sources: sources$ }).pipe(
      mergeMap(({ manifests, sources }) => {
        const findings = auditPackages({
          manifests,
          sources,
          usedWithoutImport: USED_WITHOUT_IMPORT,
        })
        return concat(
          from(findings.map((finding) => eventCreators.packageFindings(finding))),
          of(
            findings.length === 0
              ? eventCreators.auditPassed({ packageCount: manifests.length })
              : eventCreators.auditFailed({ packageCount: manifests.length }),
          ),
        )
      }),
    )

    return { events$: concat(of(eventCreators.auditStart({ dir })), audit$) }
  }

  return { auditDependencies }
}
