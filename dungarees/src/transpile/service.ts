import type {Observable} from "rxjs";
import {asyncFunctionToObservable} from "@dungarees/rxjs/util.ts";
import path from "node:path";
import ts from "typescript";
import type {FileSystem} from "@dungarees/fs/service.ts";

type Transpiler = {
  transpileDir(options: { input: string; output: string }): Observable<TranspileDirOutput[]>
}

export type TranspileDirOutput = { input: string, output: string, type: string }

export const createTranspilerService = (fileSystem: FileSystem): Transpiler => {
  const transpileDirAsync = async ({
    input,
    output,
  }: {
    input: string;
    output: string;
  }): Promise<TranspileDirOutput[]> => {
    const tsFiles = await fileSystem.globAsync(path.join(input, '**', '*.ts'))

    const pathAndContentPairs = Object.entries(await fileSystem.readBulkAsync(tsFiles))

    const sources = new Map<string, string>(pathAndContentPairs);

    const compilerOptions: ts.CompilerOptions = {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
      declaration: true, // Always generate declarations for directory transpilation
      sourceMap: false,
      removeComments: false,
      esModuleInterop: true,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      noResolve: false, // Allow resolving imports between files
      skipLibCheck: true,
      skipDefaultLibCheck: true,
    };

    const host: ts.CompilerHost = {
      getSourceFile: (fileName, languageVersion) => {
        if (sources.has(fileName)) {
          return ts.createSourceFile(fileName, sources.get(fileName)!, languageVersion, true);
        }
        return undefined;
      },
      getDefaultLibFileName: () => "lib.d.ts",
      writeFile: () => {},
      getCurrentDirectory: () => input,
      getDirectories: () => [],
      fileExists: (fileName) => sources.has(fileName),
      readFile: (fileName) => sources.get(fileName),
      getCanonicalFileName: (fileName) => fileName,
      useCaseSensitiveFileNames: () => true,
      getNewLine: () => "\n",
      resolveModuleNames: (moduleNames, containingFile) => {
        return moduleNames.map((moduleName) => {
          if (moduleName.startsWith('./') || moduleName.startsWith('../')) {
            const resolved = path.join(path.dirname(containingFile), moduleName);
            if (sources.has(resolved)) {
              return { resolvedFileName: resolved };
            }
          }
          return undefined;
        });
      },
    };

    const rewriteImportsTransformer: ts.TransformerFactory<ts.SourceFile> = (context) => {
      return (sourceFile) => {
        const visitor = (node: ts.Node): ts.Node => {
          if (ts.isImportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
            const importPath = node.moduleSpecifier.text;
            if ((importPath.startsWith('./') || importPath.startsWith('../')) && importPath.endsWith('.ts')) {
              const newPath = importPath.replace(/\.ts$/, '.js');
              return ts.factory.updateImportDeclaration(
                node,
                node.modifiers,
                node.importClause,
                ts.factory.createStringLiteral(newPath, true),
                node.attributes
              );
            }
          }
          if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
            const importPath = node.moduleSpecifier.text;
            if ((importPath.startsWith('./') || importPath.startsWith('../')) && importPath.endsWith('.ts')) {
              const newPath = importPath.replace(/\.ts$/, '.js');
              return ts.factory.updateExportDeclaration(
                node,
                node.modifiers,
                node.isTypeOnly,
                node.exportClause,
                ts.factory.createStringLiteral(newPath, true),
                node.attributes
              );
            }
          }
          return ts.visitEachChild(node, visitor, context);
        };
        return ts.visitNode(sourceFile, visitor) as ts.SourceFile;
      };
    };

    const outputs: Map<string, string> = new Map();
    const writeFile = (fileName: string, data: string) => {
      outputs.set(fileName, data);
    };

    const program = ts.createProgram(tsFiles, compilerOptions, host);
    program.emit(
      undefined,
      writeFile,
      undefined,
      undefined,
      { after: [rewriteImportsTransformer] }
    );

    for (const inputFile of tsFiles) {
      const sourceFile = program.getSourceFile(inputFile);
      if (sourceFile) {
        const syntacticDiagnostics = program.getSyntacticDiagnostics(sourceFile);
        if (syntacticDiagnostics.length > 0) {
          const formatted = ts.formatDiagnosticsWithColorAndContext(
            syntacticDiagnostics,
            {
              getCanonicalFileName: (f) => f,
              getCurrentDirectory: () => input,
              getNewLine: () => "\n",
            }
          );
          throw new Error(`TypeScript transpile error:\n${formatted}`);
        }
      }
    }

    await fileSystem.mkdirAsync(output)

    for (const [fileName, content] of outputs.entries()) {
      const relativePath = path.relative(input, fileName);
      const outputPath = path.join(output, relativePath);

      await fileSystem.mkdirAsync(path.dirname(outputPath))
      await fileSystem.writeFileAsync(outputPath, content)
    }

    const fileNames = tsFiles.map(f => path.relative(input, f)).sort();

    return fileNames.map((file: string) => ({
      input: path.join(input, file),
      output: path.join(output, file.replace(/\.ts$/, '.js')),
      type: path.join(output, file.replace(/\.ts$/, '.d.ts'))
    }))
  }

  return {
    transpileDir: asyncFunctionToObservable(transpileDirAsync),
  }
}
