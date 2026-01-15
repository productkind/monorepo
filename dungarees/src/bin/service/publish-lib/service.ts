import type { StdioMessageFeatureOutput } from "@dungarees/cli/type.ts";
import type { FileSystem } from "@dungarees/fs/service.ts"

import { concat, map, forkJoin, mergeMap, defer } from 'rxjs'
import { createOutDir, transformPackageJson, copyFiles, publishLib } from "./operations.ts";
import { createFileOperations } from "@dungarees/fs/file-operations.ts";
import { createTranspilerService } from "@dungarees/transpile/service.ts";
import type { ProcessService } from "@dungarees/sub-process/type.ts";
import { stdout, stderr } from '@dungarees/cli/utils.ts'

import { of } from 'rxjs'

export type PublishLib = {
  build: (args: { srcDir: string; outDir: string, version: string | undefined }) =>
    StdioMessageFeatureOutput
  publishSingleLib: (args: { srcDir: string; outDir: string, version: string | undefined, registry: string | undefined }) =>
    StdioMessageFeatureOutput
  publishMultiLib: (args: { dir: string, registry: string | undefined }) => StdioMessageFeatureOutput
}

export type PublishLibArgs = {
  fileSystem: FileSystem,
  process: ProcessService,
}

export const createPublishLibService = ({ fileSystem, process }: PublishLibArgs): PublishLib => {
  const fileOperations = createFileOperations(fileSystem)
  const transpileService = createTranspilerService(fileSystem)

  const build: PublishLib['build'] = ({ srcDir, outDir, version }) => {
    const originalPackageJsonPath = `${srcDir}/package.json`
    const startMessage = `Building package from ${srcDir} to ${outDir} with version: ${version ?? 'original version'}`
    const transformer = fileOperations.transformFileContext<string>(
      {
        input: originalPackageJsonPath,
        output: `${outDir}/package.json`,
      }
    )
    const createOutDir$ = createOutDir(fileSystem.mkdir(outDir), outDir)
    const transpile$ = transpileService.transpileDir({
      input: srcDir,
      output: outDir,
    }).pipe(
      mergeMap((transpiledFiles) => transformPackageJson(
        transformer,
        { srcDir, outDir, version, transpiledFiles },
      ))
    )
    return {
      stdio$: concat(
        of(stdout(startMessage)),
        createOutDir$,
        transpile$,
      )
    }
  }

  const publishSingleLib: PublishLib['publishSingleLib'] = ({ srcDir, outDir, version, registry }) => {
    const { stdio$ } = build({ srcDir, outDir, version })
    const publish$ = defer(() => publishLib(process.run(
      'npm',
      ['publish', '--access', 'public', ...(registry ? ['--registry', registry] : [])],
      { cwd: outDir },
    ).output$))

    return {
      stdio$: concat(stdio$, publish$),
    }
  }

  const publishMultiLib: PublishLib['publishMultiLib'] = ({ dir, registry }) => {
    const sourceDir = `${dir}/src`
    const packageDirs$ = fileSystem.readDir(sourceDir)
    const readVersion$ = fileSystem.readFile(`${dir}/config/version.json`, 'utf-8').pipe(
      map((content) => {
        const parsed = JSON.parse(content)
        console.log('Parsed version.json:', parsed)
        return parsed.version as string
      })
    )

    const packageDirsWithVersion$ = forkJoin([packageDirs$, readVersion$]).pipe(
      map(([packageDirs, version]) => ({ packageDirs, version }))
    )
    const publishAll$ = packageDirsWithVersion$.pipe(
      mergeMap(({packageDirs, version}) => {
        const publishObservables = packageDirs.map((packageDir) => {
          const srcDir = `${sourceDir}/${packageDir}`
          const outDir = `${dir}/dist/${packageDir}`
          const { stdio$ } = publishSingleLib({ srcDir, outDir, version, registry })
          return stdio$
        })
        return forkJoin(publishObservables).pipe(
          map(() => stdout('All packages published successfully')),
        )
      })
    )

    return {
      stdio$: publishAll$,
    }
  }

  return {
    build,
    publishSingleLib,
    publishMultiLib,
  }
}
