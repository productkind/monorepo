import { NodeFs } from './service.ts'

import { DirectoryJSON, Volume } from 'memfs'

type FakeFs = NodeFs & {
  toJSON: () => DirectoryJSON<string | null>
  toTree: () => string
  reset: () => void
}

export const createFakeFs = (files?: Record<string, string>): FakeFs => {
  if (files !== undefined) {
    return Volume.fromJSON(files) as unknown as FakeFs
  }
  return new Volume() as unknown as FakeFs
}
