import type { PublishLibEvent } from '@dungarees/bin-publish-lib-domain/events.ts'
import { exit, stderr, stdout } from '@dungarees/cli/message.ts'
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
  'publish-succeeded': ({ packageDir, version }) =>
    stdout(`Published ${packageDir} version ${version}`),
  'publish-skipped': ({ packageDir, version }) =>
    stdout(`Skipped ${packageDir}: version ${version} is already published`),
  'publish-needs-bootstrap': ({ packageDir, name }) =>
    stderr(
      `Skipped ${packageDir}: ${name} is not on the registry yet, and trusted publishing cannot create a package. Bootstrap the name by hand, then publish again.`,
    ),
  'publish-failed': ({ packageDir, exitCode, stderr: error }) =>
    stderr(`Publish failed for ${packageDir} with exit code ${exitCode}, and error: ${error}`),
  'publishes-failed': ({ packageDirs }) => [
    stderr(`Failed to publish: ${packageDirs.join(', ')}`),
    exit(1),
  ],
  'all-published': () => stdout('All packages published successfully'),
  'npm-too-old': ({ version, minimum }) => [
    stderr(
      `npm ${version} has no trust command. Install npm ${minimum} or newer with: npm install -g npm@latest`,
    ),
    exit(1),
  ],
  'manifest-not-found': ({ srcDir }) => stderr(`No package.json in ${srcDir}`),
  'package-not-publishable': ({ srcDir }) =>
    stderr(`${srcDir} is private or has no name, so it is never published`),
  'registry-unreachable': ({ name }) =>
    stderr(`Could not reach the registry to ask about ${name}. Try again when it answers.`),
  'name-already-on-registry': ({ name }) =>
    stdout(`${name} is already on the registry, so only its publisher is missing`),
  'name-reserved': ({ name, version, tag }) =>
    stdout(`Reserved ${name} with a placeholder ${version} under the ${tag} tag`),
  'placeholder-publish-failed': ({ name }) =>
    stderr(`Could not reserve ${name}. npm's own output is above.`),
  'deprecate-failed': ({ name, version }) =>
    stderr(`Could not deprecate ${name}@${version}; do it by hand when you can`, 'warn'),
  'publisher-trusted': ({ name }) => stdout(`${name} now trusts this workflow to publish it`),
  'trust-failed': ({ name }) =>
    stderr(`Could not configure the publisher for ${name}. npm's own output is above.`),
  'bootstrap-succeeded': ({ name }) =>
    stdout(`${name} is ready. CI publishes it from the next green push to main.`),
  'bootstrap-failed': ({ srcDir }) => [stderr(`Did not bootstrap ${srcDir}`), exit(1)],
  'trusting-packages': ({ count }) => stdout(`${count} public packages to configure`),
  'all-trusted': ({ count }) => stdout(`All ${count} packages configured`),
  'new-package-not-on-registry': ({ name, srcDir, outDir, bootstrapCommand }) => [
    stderr(`${name} is not on the registry`),
    stderr(
      bootstrapCommand === undefined
        ? `  bootstrap it from ${srcDir} into ${outDir}`
        : `  ${bootstrapCommand} ${srcDir} ${outDir}`,
    ),
  ],
  'new-packages-need-bootstrap': ({ count }) => [
    stderr(
      `${count} packages are not on the registry, and trusted publishing cannot create them. Bootstrap each one, then try again.`,
    ),
    exit(1),
  ],
  // Silence is the point: this runs on every push, and a push with nothing new to say should not
  // print anything at all.
  'no-new-packages': () => [],
  'not-logged-in': () => [stderr('Not logged in to the registry. Run: npm login'), exit(1)],
  'bootstrapping-missing': ({ count }) =>
    stdout(count === 0 ? 'Nothing to bootstrap' : `${count} packages to bootstrap`),
  'some-not-trusted': ({ names }) => [
    stderr(
      `Not configured: ${names.join(', ')}. npm rejects a package that is already set up rather than duplicating it, so re-running a finished migration reports every package here. Check one with: npm trust list <package>`,
    ),
    exit(1),
  ],
}
