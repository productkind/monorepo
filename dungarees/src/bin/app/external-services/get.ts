import type { DungareesBinExternalServices } from "@dungarees/bin/delivery/external-services/index.ts"
import { createFileSystem } from "@dungarees/fs/service.ts"
import * as fs from "fs"

export const getExternalServices = (): DungareesBinExternalServices => {
  const fileSystem = createFileSystem(fs)
  return {
    fileSystem,
  }
}
