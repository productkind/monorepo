import { getServices } from './get-services.ts'

import { firstValueFrom } from 'rxjs'
import { expect, test } from 'vitest'

test('the production services hand on the process boundary unchanged', () => {
  const services = getServices()

  expect(services.process.argv).toBe(process.argv)
  expect(services.process.stdout).toBe(process.stdout)
  expect(services.process.stderr).toBe(process.stderr)
})

test('the production file system reads from the real disk', async () => {
  const manifest = await firstValueFrom(
    getServices().fileSystem.readFile(`${import.meta.dirname}/package.json`, 'utf-8'),
  )

  expect(JSON.parse(manifest)).toMatchObject({ name: '@dungarees/bin-runtime-cli-yargs' })
})
