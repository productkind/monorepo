// Where a dungarees library keeps the things a command has to find, relative to its root.
export type DungareesLibraryPaths = {
  sourceDir: string
  manifests: string
}

export const DUNGAREES_LIBRARY_PATHS: DungareesLibraryPaths = {
  sourceDir: 'src',
  manifests: '**/package.json',
}
