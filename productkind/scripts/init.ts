import { $, path, fs, os } from 'zx'
import { fileURLToPath } from 'node:url'

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
  const scriptDir = path.dirname(fileURLToPath(import.meta.url))
  const binDir = path.resolve(scriptDir, '../../dungarees/bin')
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
