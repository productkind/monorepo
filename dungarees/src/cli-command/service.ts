import { type SubProcessService } from '@dungarees/sub-process/type.ts'

export type CliCommandsService = {
  npm: {
    publish: (options?: { registry?: string | undefined; cwd?: string }) => RunResult
    // Exits non-zero when that exact version is not on the registry, which is also how a package
    // that does not exist at all reports itself.
    viewVersion: (options: {
      name: string
      version: string
      registry?: string | undefined
    }) => RunResult
  }
}

type RunResult = ReturnType<SubProcessService['run']>

export const createCliCommands = (subProcess: SubProcessService): CliCommandsService => {
  return {
    npm: {
      publish: ({ registry, cwd } = {}) =>
        subProcess.run(
          'npm',
          ['publish', '--access', 'public', ...(registry ? ['--registry', registry] : [])],
          { ...(cwd === undefined ? {} : { cwd }) },
        ),
      viewVersion: ({ name, version, registry }) =>
        subProcess.run(
          'npm',
          ['view', `${name}@${version}`, 'version', ...(registry ? ['--registry', registry] : [])],
          {},
        ),
    },
  }
}
