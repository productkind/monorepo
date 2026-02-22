import { createFileSystem, type FileSystem, type NodeFs } from './service.ts'

import {
  getObservableMethodsFromSync,
  getUnsafeMethodNames,
  UnsafeService,
} from '@dungarees/rxjs/util.ts'

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

export const createFakeFileSystem = (filesOrFs?: Record<string, string>): FakeFileSystem => {
  const fs = createFakeNodeFs(filesOrFs)
  const fileSystem: UnsafeService<FileSystem> = createFileSystem(fs)

  const observableMethodNames = getUnsafeMethodNames(fileSystem)

  const observableFake = getObservableMethodsFromSync(fileSystem, observableMethodNames, 1)

  return {
    ...fileSystem,
    ...observableFake,
    toJSON: () => fs.toJSON(),
    toTree: () => fs.toTree(),
    reset: () => fs.reset(),
  }
}
