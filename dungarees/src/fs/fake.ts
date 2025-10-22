import {syncFunctionToObservable} from '@dungarees/rxjs/util.ts'
import { createFileSystem, type FileSystem, type NodeFs } from './service.ts'

import { type DirectoryJSON, Volume } from 'memfs'

type FakeVolume = {
  toJSON: () => DirectoryJSON<string | null>
  toTree: () => string
  reset: () => void
}

type FakeFs = NodeFs & FakeVolume

export const createFakeNodeFs = (files?: Record<string, string>): FakeFs => {
  if (files !== undefined) {
    return Volume.fromJSON(files) as unknown as FakeFs
  }
  return new Volume() as unknown as FakeFs
}

type FakeFileSystem = FileSystem & FakeVolume

export const createFakeFileSystem = (files?: Record<string, string>): FakeFileSystem => {
  const fs = createFakeNodeFs(files)

  const fileSystem: FileSystem = createFileSystem(fs)

  const observableMethodNames = ['writeFile', 'readDir', 'readDirDeep', 'mkdir', 'glob'] as const;

  const observableMethods = observableMethodNames.map((methodName) => {
    return [methodName, syncFunctionToObservable(fileSystem[`${methodName}Sync`], 1)] as const
  })

  return {
    ...fileSystem,
    ...Object.fromEntries(observableMethods),
    toJSON: () => fs.toJSON(),
    toTree: () => fs.toTree(),
    reset: () => fs.reset(),
  }
}
