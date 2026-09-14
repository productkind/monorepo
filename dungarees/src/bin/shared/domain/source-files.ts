import { map, type OperatorFunction } from 'rxjs'

export const isTestFile = (filePath: string): boolean => /\.(test|spec)\.tsx?$/.test(filePath)

// Matched as a path segment, so a directory that merely starts with the word is still ours.
export const isOutsideNodeModules = (filePath: string): boolean =>
  !filePath.split('/').includes('node_modules')

export const excludeInstalledDependencies = (): OperatorFunction<string[], string[]> =>
  map((paths) => paths.filter(isOutsideNodeModules))
