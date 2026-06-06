import {createFakeFileSystem} from "@dungarees/fs/fake.ts"
import type {DungareesBinExternalServices} from "./index.ts"

export const getExternalServicesFake = (): DungareesBinExternalServices => {
  const fileSystem = createFakeFileSystem()
  return {
    fileSystem,
  }
}
