import type { DungareesBinExternalServices } from '@dungarees/bin/delivery/external-services/index.ts'
import { createFileSystem } from '@dungarees/fs/service.ts'
import { createSubProcessService } from '@dungarees/sub-process/service.ts'

import { spawn } from 'node:child_process'
import * as fs from 'node:fs'

export const getExternalServices = (): DungareesBinExternalServices => {
  const fileSystem = createFileSystem(fs)
  const process = createSubProcessService(spawn)
  return {
    fileSystem,
    process,
  }
}
