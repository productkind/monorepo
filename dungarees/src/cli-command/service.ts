import { type SubProcessService } from '@dungarees/sub-process/service.ts'

export type NpmCommands = {
  publish: (options?: { registry?: string | undefined; cwd?: string }) => RunResult
  viewVersions: (options: { name: string; registry?: string | undefined }) => RunResult
}

export type GitCommands = {
  diff: (options: { ref: string; cwd?: string }) => RunResult
}

export type CliCommands = {
  npm: NpmCommands
  git: GitCommands
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

export const createGitCommands = (subProcess: SubProcessService): GitCommands => ({
  diff: ({ ref, cwd }) =>
    // Enough context to show what a comment sits above, without dragging in the rest of the
    // function.
    subProcess.run('git', ['diff', ref, '--unified=2'], {
      ...(cwd === undefined ? {} : { cwd }),
    }),
})

export const createCliCommands = (subProcess: SubProcessService): CliCommands => ({
  npm: createNpmCommands(subProcess),
  git: createGitCommands(subProcess),
})
