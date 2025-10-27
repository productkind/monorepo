import type { DungareesBinExternalServices } from "@dungarees/bin/delivery/external-services/index.ts"
import { createFileSystem } from "@dungarees/fs/service.ts"
import {createProcessService} from "@dungarees/process/service.ts"
import * as fs from "node:fs"
import { spawn } from 'node:child_process'

export const getExternalServices = (): DungareesBinExternalServices => {
  const fileSystem = createFileSystem(fs)
  const process = createProcessService(spawn)
  return {
    fileSystem,
    process,
  }
}
