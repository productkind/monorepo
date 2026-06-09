import type { DungareesBinServices } from '@dungarees/bin-cli-yargs-base-app/services.ts'
import { createFileSystem } from '@dungarees/fs/service.ts'
import { createSubProcessService } from '@dungarees/sub-process/service.ts'

import { spawn } from 'node:child_process'
import * as fs from 'node:fs'

export const getServices = (): DungareesBinServices => {
  const fileSystem = createFileSystem(fs)
  const subProcess = createSubProcessService(spawn)
  return {
    fileSystem,
    subProcess,
  }
}
