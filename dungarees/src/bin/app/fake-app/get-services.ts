import type { DungareesBinServices } from '@dungarees/bin-cli-yargs-base-app/services.ts'
import { createFakeFileSystem } from '@dungarees/fs/fake.ts'

export const getExternalServicesFake = (): DungareesBinServices => {
  const fileSystem = createFakeFileSystem()
  return {
    fileSystem,
  }
}
