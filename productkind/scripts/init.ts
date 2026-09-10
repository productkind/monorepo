import { fileURLToPath } from 'node:url'
import { $, fs, os, path } from 'zx'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '../..')

// Git hooks first, and outside the platform check below: the hook is plain git config and works
// wherever git does, so a contributor on any OS gets the pre-commit formatting.
const HOOKS_PATH = '.githooks'
const configuredHooksPath = (
  await $`git -C ${repoRoot} config --get core.hooksPath`.quiet().nothrow()
).stdout.trim()
if (configuredHooksPath === HOOKS_PATH) {
  console.log(`✔︎ git hooks already read from ${HOOKS_PATH}`)
} else {
  await $`git -C ${repoRoot} config core.hooksPath ${HOOKS_PATH}`
  console.log(`Pointed git hooks at ${HOOKS_PATH}`)
}
// The committed mode bit should cover this, but a checkout that dropped it would leave git
// silently ignoring the hook.
await $`chmod +x ${path.join(repoRoot, HOOKS_PATH, 'pre-commit')}`.quiet()

if (process.platform === 'darwin') {
  if (!(await $`which brew`.quiet()).stdout.trim()) {
    console.error('Homebrew is not installed. Please install Homebrew first: https://brew.sh')
    process.exit(1)
  }
  // Only install what's missing, so init stays re-runnable without swallowing
  // real errors. Two things count as "already there": brew already tracks it,
  // or (for casks) an untracked artifact — e.g. a font already on disk — is
  // present, which makes brew refuse. Any other failure still aborts init.
  const brewInstall = async (name: string, cask = false) => {
    const listArgs = cask ? ['list', '--cask', name] : ['list', '--formula', name]
    const installed = (await $`brew ${listArgs}`.quiet().nothrow()).exitCode === 0
    if (installed) {
      console.log(`✔︎ ${name} already installed`)
      return
    }
    const result = cask
      ? await $`brew install --cask ${name}`.nothrow()
      : await $`brew install ${name}`.nothrow()
    if (result.exitCode === 0) return
    if (/already/i.test(result.stderr + result.stdout)) {
      console.log(`✔︎ ${name} already present (not brew-managed)`)
      return
    }
    throw new Error(`Failed to install ${name}:\n${result.stderr}`)
  }

  await brewInstall('font-montserrat', true)
  await brewInstall('font-josefin-slab', true)
  await brewInstall('font-nanum-pen-script', true)
  await brewInstall('font-vt323', true)
  await brewInstall('inkscape')

  // Dependencies for the media scripts in dungarees/bin
  await brewInstall('imagemagick')
  await brewInstall('ffmpeg')
  await brewInstall('sox')

  // Add dungarees/bin to the zsh PATH (idempotent)
  const binDir = path.resolve(repoRoot, 'dungarees/bin')
  const zshrc = path.join(os.homedir(), '.zshrc')
  const marker = '# dungarees/bin (media scripts)'
  const block = `\n${marker}\nexport PATH="${binDir}:$PATH"\n`

  const current = fs.existsSync(zshrc) ? await fs.readFile(zshrc, 'utf8') : ''
  if (current.includes(marker)) {
    console.log(`${binDir} already on PATH in ${zshrc}`)
  } else {
    await fs.appendFile(zshrc, block)
    console.log(`Added ${binDir} to PATH in ${zshrc}. Run 'source ~/.zshrc' or open a new shell.`)
  }
} else {
  console.error('Not supported OS')
  process.exit(1)
}
