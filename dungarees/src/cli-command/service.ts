import { type SubProcessService } from '@dungarees/sub-process/type.ts'

export type CliCommandsService = {
  npm: {
    publish: (options?: { registry?: string | undefined; cwd?: string }) => RunResult
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
          {
            cwd,
          },
        ),
    },
  }
}
