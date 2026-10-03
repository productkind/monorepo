import { type SubProcessService } from '@dungarees/sub-process/service.ts'

export type NpmCommands = {
  publish: (options?: {
    registry?: string | undefined
    cwd?: string
    tag?: string
    interactive?: boolean
  }) => RunResult
  viewVersions: (options: { name: string; registry?: string | undefined }) => RunResult
  trust: (options: {
    name: string
    workflow: string
    repository: string
    environment?: string | undefined
    registry?: string | undefined
    dryRun?: boolean
  }) => RunResult
  deprecate: (options: {
    name: string
    version: string
    message: string
    registry?: string | undefined
  }) => RunResult
  version: () => RunResult
}

export type GitCommands = {
  diff: (options: { ref: string; cwd?: string }) => RunResult
  listAddedFiles: (options: { base: string; tip: string; cwd?: string }) => RunResult
  showFile: (options: { ref: string; path: string; cwd?: string }) => RunResult
}

export type CliCommands = {
  npm: NpmCommands
  git: GitCommands
}

type RunResult = ReturnType<SubProcessService['run']>

const registryArgs = (registry: string | undefined): string[] =>
  registry ? ['--registry', registry] : []

// Anything npm guards with a two-factor challenge has to own the terminal, or the prompt goes to
// a pipe nobody is typing into and the command waits for an answer that cannot arrive.
const INTERACTIVE = { stdio: 'inherit' } as const

export const createNpmCommands = (subProcess: SubProcessService): NpmCommands => ({
  publish: ({ registry, cwd, tag, interactive } = {}) =>
    subProcess.run(
      'npm',
      [
        'publish',
        '--access',
        'public',
        ...(tag === undefined ? [] : ['--tag', tag]),
        ...registryArgs(registry),
      ],
      {
        ...(cwd === undefined ? {} : { cwd }),
        ...(interactive === true ? INTERACTIVE : {}),
      },
    ),
  viewVersions: ({ name, registry }) =>
    subProcess.run('npm', ['view', name, 'versions', '--json', ...registryArgs(registry)], {}),
  trust: ({ name, workflow, repository, environment, registry, dryRun }) =>
    subProcess.run(
      'npm',
      [
        'trust',
        'github',
        name,
        '--file',
        workflow,
        '--repository',
        repository,
        ...(environment === undefined ? [] : ['--environment', environment]),
        '--allow-publish',
        '--yes',
        ...(dryRun === true ? ['--dry-run'] : []),
        ...registryArgs(registry),
      ],
      INTERACTIVE,
    ),
  deprecate: ({ name, version, message, registry }) =>
    subProcess.run(
      'npm',
      ['deprecate', `${name}@${version}`, message, ...registryArgs(registry)],
      INTERACTIVE,
    ),
  version: () => subProcess.run('npm', ['--version'], {}),
})

export const createGitCommands = (subProcess: SubProcessService): GitCommands => ({
  diff: ({ ref, cwd }) =>
    // Enough context to show what a comment sits above, without dragging in the rest of the
    // function.
    subProcess.run('git', ['diff', ref, '--unified=2'], {
      ...(cwd === undefined ? {} : { cwd }),
    }),
  listAddedFiles: ({ base, tip, cwd }) =>
    subProcess.run('git', ['diff', '--name-only', '--diff-filter=A', base, tip], {
      ...(cwd === undefined ? {} : { cwd }),
    }),
  // `<ref>:<path>` rather than reading the file: what matters is the version being pushed, which
  // is not necessarily what is sitting in the working tree.
  showFile: ({ ref, path, cwd }) =>
    subProcess.run('git', ['show', `${ref}:${path}`], {
      ...(cwd === undefined ? {} : { cwd }),
    }),
})

export const createCliCommands = (subProcess: SubProcessService): CliCommands => ({
  npm: createNpmCommands(subProcess),
  git: createGitCommands(subProcess),
})
