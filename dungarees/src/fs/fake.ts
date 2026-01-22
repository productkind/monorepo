import {getObservableMethodsFromSync, UNSAFE_FOR_MARBLE_TESTING} from '@dungarees/rxjs/util.ts'
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

const isFakeFs = (value: unknown): value is FakeFs =>
  typeof value === 'object' && value !== null && 'toJSON' in value && typeof (value as FakeFs).toJSON === 'function'

export const createFakeFileSystem = (filesOrFs?: Record<string, string> | FakeFs): FakeFileSystem => {
  const fs = isFakeFs(filesOrFs) ? filesOrFs : createFakeNodeFs(filesOrFs)

  const fileSystem: FileSystem = createFileSystem(fs)

  const observableMethodNames = Object.keys(fileSystem)
  .filter((key): key is keyof FileSystem => key in fileSystem)
  .filter((key) => {
    return typeof fileSystem[key] === 'function' && fileSystem[key][UNSAFE_FOR_MARBLE_TESTING] === true
  }) as Array<keyof FileSystem>;


  const observableMethodNames2 = [
    'readFile',
    'writeFile',
    'readDir',
    'readDirDeep',
    'mkdir', 'glob', 'readBulk', 'getStat', 'chmod', 'chown', 'isExe'] as const;

  const eqSet = (xs, ys) =>
    xs.size === ys.size &&
    [...xs].every((x) => ys.has(x));

  console.log('Observable methods marked as unsafe for marble testing:', observableMethodNames2,
    eqSet(new Set(observableMethodNames2), new Set(observableMethodNames)));

  const observableFake = getObservableMethodsFromSync(
    fileSystem,
    observableMethodNames,
    1
  )

  return {
    ...fileSystem,
    ...observableFake,
    toJSON: () => fs.toJSON(),
    toTree: () => fs.toTree(),
    reset: () => fs.reset(),
  }
}
