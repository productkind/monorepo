import type {NodeFs} from "@dungarees/fs/service";
import type {Observable} from "rxjs";
import {asyncFunctionToObservable} from "@dungarees/rxjs/util";
import path from "node:path";
import * as ts from "typescript";


type Transpile = {
  transpile(options: { input: string; output: string; type?: string }): Observable<void>;
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

  return {
    transpile: asyncFunctionToObservable(transpileAsync),
  }
}
