import { createFileSystem } from '@dungarees/fs/service.ts'
import { createSubProcessService } from '@dungarees/sub-process/service.ts'

import { spawn } from 'node:child_process'
import * as fs from 'node:fs'

import type { VideoDeskServices } from './services.ts'

export const getServices = (): VideoDeskServices => ({
  fileSystem: createFileSystem(fs),
  subProcess: createSubProcessService(spawn),
  http: { fetch: (input, init) => fetch(input, init) },
  clock: { now: () => new Date() },
  env: process.env,
})
