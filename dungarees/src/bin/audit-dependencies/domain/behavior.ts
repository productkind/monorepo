import type { AuditDependenciesEvent } from './events.ts'
import { getAuditStartEvent, getManifestsAndSources, reportFindings } from './operations.ts'

import type { FileSystemService } from '@dungarees/fs/service.ts'

import { concat, type Observable } from 'rxjs'

export type AuditDependenciesFeatureOutput = {
  events$: Observable<AuditDependenciesEvent>
}

export type AuditDependenciesBehavior = {
  audit: (args: { dir: string }) => AuditDependenciesFeatureOutput
}

export type CreateAuditDependenciesBehaviorOptions = {
  fileSystem: FileSystemService
}

export const createAuditDependenciesBehavior = ({
  fileSystem,
}: CreateAuditDependenciesBehaviorOptions): AuditDependenciesBehavior => {
  const audit: AuditDependenciesBehavior['audit'] = ({ dir }) => {
    const startEvent$ = getAuditStartEvent({ dir })
    const audit$ = getManifestsAndSources({
      dir,
      glob: fileSystem.glob,
      readFile: (filePath) => fileSystem.readFile(filePath, 'utf-8'),
    }).pipe(reportFindings())

    return {
      events$: concat(startEvent$, audit$),
    }
  }

  return { audit }
}
