import { type AuditDependenciesBehavior, createAuditDependenciesBehavior } from './behavior.ts'

import { createFakeFileSystem, type FakeFileSystem } from '@dungarees/fs/fake.ts'

export type FakeAuditDependenciesWorld = {
  files?: Record<string, string>
}

export type FakeAuditDependencies = AuditDependenciesBehavior & {
  fileSystem: FakeFileSystem
}

export const createFakeAuditDependencies = ({
  files = {},
}: FakeAuditDependenciesWorld = {}): FakeAuditDependencies => {
  const fileSystem = createFakeFileSystem(files)
  return {
    ...createAuditDependenciesBehavior({ fileSystem }),
    fileSystem,
  }
}
