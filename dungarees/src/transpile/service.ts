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
    // 1) Read the source
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

    // 3) Create an in-memory host for the compiler
    const host = ts.createCompilerHost(compilerOptions);
    const originalGetSourceFile = host.getSourceFile;

    host.getSourceFile = (fileName, languageVersion, onError, shouldCreateNewSourceFile) => {
      if (fileName === input) {
        return ts.createSourceFile(fileName, source, languageVersion, true);
      }
      return originalGetSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile);
    };

    // Store output in memory
    const outputs: Map<string, string> = new Map();
    host.writeFile = (fileName, data) => {
      outputs.set(fileName, data);
    };

    // 4) Create program and emit
    const program = ts.createProgram([input], compilerOptions, host);
    const emitResult = program.emit();

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
          getCurrentDirectory: () => process.cwd(),
          getNewLine: () => "\n",
        }
      );
      throw new Error(`TypeScript transpile error:\n${formatted}`);
    }

    // 6) Write outputs to disk
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
