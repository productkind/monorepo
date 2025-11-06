import type {NodeFs} from "@dungarees/fs/service";
import type {Observable} from "rxjs";
import {asyncFunctionToObservable} from "@dungarees/rxjs/util";
import path from "node:path";
import * as ts from "typescript";


type Transpile = {
  transpile(options: { input: string; output: string; type?: string }): Observable<void>;
  transpileDir(options: { input: string; output: string }): Observable<void>;
}

export const createTranspileService = (fs: NodeFs): Transpile => {
  const fsp = fs.promises;

  const transpileAsync = async ({
    input,
    output,
    type,
  }: {
    input: string;
    output: string;
    type?: string;
  }): Promise<void> => {
    // 1) Read the source using the provided fs
    const source = await fsp.readFile(input, "utf8");

    // 2) Setup compiler options
    const compilerOptions: ts.CompilerOptions = {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
      declaration: !!type, // Generate declarations if type path is provided
      sourceMap: false,
      removeComments: false,
      esModuleInterop: true,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      noResolve: true, // Don't resolve module imports
      skipLibCheck: true,
      skipDefaultLibCheck: true,
    };

    // 3) Create a custom compiler host that uses the provided fs
    const host: ts.CompilerHost = {
      getSourceFile: (fileName, languageVersion) => {
        if (fileName === input) {
          return ts.createSourceFile(fileName, source, languageVersion, true);
        }
        // For any other files (like lib.d.ts), return undefined
        // since we're using noResolve
        return undefined;
      },
      getDefaultLibFileName: () => "lib.d.ts",
      writeFile: () => {}, // We'll handle writing ourselves
      getCurrentDirectory: () => path.dirname(input),
      getDirectories: () => [],
      fileExists: (fileName) => fileName === input,
      readFile: (fileName) => (fileName === input ? source : undefined),
      getCanonicalFileName: (fileName) => fileName,
      useCaseSensitiveFileNames: () => true,
      getNewLine: () => "\n",
    };

    // Store output in memory
    const outputs: Map<string, string> = new Map();
    const writeFile = (fileName: string, data: string) => {
      outputs.set(fileName, data);
    };

    // 4) Create program and emit
    const program = ts.createProgram([input], compilerOptions, host);
    const emitResult = program.emit(undefined, writeFile);

    // 5) Check for syntax diagnostics only (skip semantic checks)
    const sourceFile = program.getSourceFile(input);
    const syntacticDiagnostics = sourceFile
      ? program.getSyntacticDiagnostics(sourceFile)
      : [];

    if (syntacticDiagnostics.length > 0) {
      const formatted = ts.formatDiagnosticsWithColorAndContext(
        syntacticDiagnostics,
        {
          getCanonicalFileName: (f) => f,
          getCurrentDirectory: () => path.dirname(input),
          getNewLine: () => "\n",
        }
      );
      throw new Error(`TypeScript transpile error:\n${formatted}`);
    }

    // 6) Write outputs using the provided fs
    await fsp.mkdir(path.dirname(output), { recursive: true });

    // Write JS output
    const jsOutput = outputs.get(input.replace(/\.ts$/, '.js'));
    if (jsOutput) {
      await fsp.writeFile(output, jsOutput, "utf8");
    }

    // Write declaration file if requested
    if (type) {
      await fsp.mkdir(path.dirname(type), { recursive: true });
      const dtsOutput = outputs.get(input.replace(/\.ts$/, '.d.ts'));
      if (dtsOutput) {
        await fsp.writeFile(type, dtsOutput, "utf8");
      }
    }
  }

  const transpileDirAsync = async ({
    input,
    output,
  }: {
    input: string;
    output: string;
  }): Promise<void> => {
    // 1) Read all .ts files from the input directory
    const entries = await fsp.readdir(input);
    const tsFiles = entries.filter((entry: string) => entry.endsWith('.ts'));
    const inputFiles = tsFiles.map((file: string) => path.join(input, file));

    // 2) Read all source files
    const sources = new Map<string, string>();
    for (const inputFile of inputFiles) {
      const source = await fsp.readFile(inputFile, "utf8");
      sources.set(inputFile, source);
    }

    // 3) Setup compiler options
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

    // 4) Create a custom compiler host that uses the provided fs
    const host: ts.CompilerHost = {
      getSourceFile: (fileName, languageVersion) => {
        // Check if it's one of our input files
        if (sources.has(fileName)) {
          return ts.createSourceFile(fileName, sources.get(fileName)!, languageVersion, true);
        }
        // For lib files and external imports, return undefined
        return undefined;
      },
      getDefaultLibFileName: () => "lib.d.ts",
      writeFile: () => {}, // We'll handle writing ourselves
      getCurrentDirectory: () => input,
      getDirectories: () => [],
      fileExists: (fileName) => sources.has(fileName),
      readFile: (fileName) => sources.get(fileName),
      getCanonicalFileName: (fileName) => fileName,
      useCaseSensitiveFileNames: () => true,
      getNewLine: () => "\n",
      resolveModuleNames: (moduleNames, containingFile) => {
        // Custom module resolution for relative imports
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

    // 5) Create a transformer to rewrite .ts extensions to .js for relative imports only
    const rewriteImportsTransformer: ts.TransformerFactory<ts.SourceFile> = (context) => {
      return (sourceFile) => {
        const visitor = (node: ts.Node): ts.Node => {
          // Handle import declarations: import { x } from './file.ts'
          if (ts.isImportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
            const importPath = node.moduleSpecifier.text;
            // Only rewrite relative imports
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
          // Handle export declarations: export { x } from './file.ts'
          if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
            const importPath = node.moduleSpecifier.text;
            // Only rewrite relative imports
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

    // 6) Store output in memory
    const outputs: Map<string, string> = new Map();
    const writeFile = (fileName: string, data: string) => {
      outputs.set(fileName, data);
    };

    // 7) Create program and emit with transformer
    const program = ts.createProgram(inputFiles, compilerOptions, host);
    const emitResult = program.emit(
      undefined,
      writeFile,
      undefined,
      undefined,
      { after: [rewriteImportsTransformer] }
    );

    // 8) Check for syntax diagnostics only (skip semantic checks for external imports)
    for (const inputFile of inputFiles) {
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

    // 9) Write all outputs to the output directory
    await fsp.mkdir(output, { recursive: true });

    for (const [fileName, content] of outputs.entries()) {
      // Determine the output file name
      const relativePath = path.relative(input, fileName);
      const outputPath = path.join(output, relativePath);

      await fsp.mkdir(path.dirname(outputPath), { recursive: true });
      await fsp.writeFile(outputPath, content, "utf8");
    }
  }

  return {
    transpile: asyncFunctionToObservable(transpileAsync),
    transpileDir: asyncFunctionToObservable(transpileDirAsync),
  }
}
