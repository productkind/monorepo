import { type SubProcessService } from '@dungarees/sub-process/type.ts'

export type NpmCommands = {
  publish: (options?: { registry?: string | undefined; cwd?: string }) => RunResult
  viewVersions: (options: { name: string; registry?: string | undefined }) => RunResult
}

export type CliCommandsService = {
  npm: NpmCommands
}

type RunResult = ReturnType<SubProcessService['run']>

export const createNpmCommands = (subProcess: SubProcessService): NpmCommands => ({
  publish: ({ registry, cwd } = {}) =>
    subProcess.run(
      'npm',
      ['publish', '--access', 'public', ...(registry ? ['--registry', registry] : [])],
      { ...(cwd === undefined ? {} : { cwd }) },
    ),
  viewVersions: ({ name, registry }) =>
    subProcess.run(
      'npm',
      ['view', name, 'versions', '--json', ...(registry ? ['--registry', registry] : [])],
      {},
    ),
})

export const createCliCommands = (subProcess: SubProcessService): CliCommandsService => ({
  npm: createNpmCommands(subProcess),
})
