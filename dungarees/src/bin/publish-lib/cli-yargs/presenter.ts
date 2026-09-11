import type { PublishLibEvent } from '@dungarees/bin-publish-lib-domain/events.ts'
import { exit, stderr, stdout } from '@dungarees/cli/utils.ts'
import type { Presenter } from '@dungarees/cli/yargs-prompt-app.ts'

export const publishLibPresenter: Presenter<PublishLibEvent> = {
  'build-start': ({ srcDir, outDir, version }) =>
    stdout(
      `Building package from ${srcDir} to ${outDir} with version: ${version ?? 'original version'}`,
    ),
  'out-dir-created': ({ outDir }) => stdout(`Output directory created: ${outDir}`),
  'package-json-written': ({ path, version }) =>
    stdout(`Package.json written to ${path}/package.json with version: ${version}`),
  'asset-copied': ({ path }) => stdout(`Asset copied to ${path}`),
  'publish-succeeded': ({ packageDir, version, created }) =>
    stdout(
      created
        ? `Created ${packageDir} on the registry at version ${version}`
        : `Published ${packageDir} version ${version}`,
    ),
  'publish-skipped': ({ packageDir, version }) =>
    stdout(`Skipped ${packageDir}: version ${version} is already published`),
  'publish-failed': ({ packageDir, exitCode, stderror }) =>
    stderr(`Publish failed for ${packageDir} with exit code ${exitCode}, and error: ${stderror}`),
  'publishes-failed': ({ packageDirs }) => [
    stderr(`Failed to publish: ${packageDirs.join(', ')}`),
    exit(1),
  ],
  'all-published': () => stdout('All packages published successfully'),
}
