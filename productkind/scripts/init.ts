import { $, path, fs, os } from 'zx'
import { fileURLToPath } from 'node:url'

if (process.platform === 'darwin') {
  if (!(await $`which brew`.quiet()).stdout.trim()) {
    console.error('Homebrew is not installed. Please install Homebrew first: https://brew.sh')
    process.exit(1)
  }
  await $`brew install --cask font-montserrat`
  await $`brew install --cask font-josefin-slab`
  await $`brew install --cask font-nanum-pen-script`
  await $`brew install --cask font-vt323`
  await $`brew install inkscape`

  // Dependencies for the media scripts in dungarees/bin
  await $`brew install imagemagick`
  await $`brew install ffmpeg`
  await $`brew install sox`

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
