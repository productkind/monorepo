import type { PublishLibEvent } from '@dungarees/bin-publish-lib-domain/events.ts'
import type { Presenter } from '@dungarees/cli/yargs-prompt-app.ts'

export const publishLibPresenter: Presenter<PublishLibEvent> = {
  'build-start': ({ srcDir, outDir, version }) => ({
    type: 'stdout',
    level: 'info',
    message: `Building package from ${srcDir} to ${outDir} with version: ${version ?? 'original version'}`,
  }),
  'out-dir-created': ({ outDir }) => ({
    type: 'stdout',
    level: 'info',
    message: `Output directory created: ${outDir}`,
  }),
  'package-json-written': ({ path, version }) => ({
    type: 'stdout',
    level: 'info',
    message: `Package.json written to ${path}/package.json with version: ${version}`,
  }),
  'publish-succeeded': () => ({
    type: 'stdout',
    level: 'info',
    message: 'Published successfully',
  }),
  'publish-failed': ({ exitCode, stderror }) => ({
    type: 'stderr',
    level: 'error',
    message: `Publish failed with exit code ${exitCode}, and error: ${stderror}`,
  }),
  'all-published': () => ({
    type: 'stdout',
    level: 'info',
    message: 'All packages published successfully',
  }),
}
