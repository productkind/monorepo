import { $ } from 'zx'

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
} else {
  console.error('Not supported OS')
  process.exit(1)
}
