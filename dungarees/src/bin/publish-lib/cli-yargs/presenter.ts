import type { PublishLibEvent } from '@dungarees/bin-publish-lib-domain/events.ts'
import { stderr, stdout } from '@dungarees/cli/utils.ts'
import type { Presenter } from '@dungarees/cli/yargs-prompt-app.ts'

export const publishLibPresenter: Presenter<PublishLibEvent> = {
  'build-start': ({ srcDir, outDir, version }) =>
    stdout(
      `Building package from ${srcDir} to ${outDir} with version: ${version ?? 'original version'}`,
    ),
  'out-dir-created': ({ outDir }) => stdout(`Output directory created: ${outDir}`),
  'package-json-written': ({ path, version }) =>
    stdout(`Package.json written to ${path}/package.json with version: ${version}`),
  'publish-succeeded': () => stdout('Published successfully'),
  'publish-failed': ({ exitCode, stderror }) =>
    stderr(`Publish failed with exit code ${exitCode}, and error: ${stderror}`),
  'all-published': () => stdout('All packages published successfully'),
}
