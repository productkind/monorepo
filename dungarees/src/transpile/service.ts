import type {NodeFs} from "@dungarees/fs/service";
import type {Observable} from "rxjs";
import * as rollup from "rollup";
import {asyncFunctionToObservable} from "@dungarees/rxjs/util";
import typescript from '@rollup/plugin-typescript'
import { build } from 'vite'
import path from "node:path";
import * as ts from "typescript";


type Transpile = {
  transpile(options: { input: string; output: string }): Observable<void>;
}

		/*
		const bundle = await rollup.rollup({
			input: input,
			fs: fs.promises,
			plugins: [typescript()],
		})

		await bundle.write({
			file: output,
			format: 'esm'
		})
    await bundle.close();
		*/

export const createTranspileService = (fs: NodeFs): Transpile => {
  const fsp = fs.promises;

  const transpileAsync = async ({
    input,
    output,
  }: {
    input: string;
    output: string;
  }): Promise<void> => {
    // 1) Read the source
    const source = await fsp.readFile(input, "utf8");

    // 2) Transpile with TS (no typechecking/bundling; just strip types -> ESM)
    const compilerOptions: ts.CompilerOptions = {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX, // harmless for .ts; useful if you later pass .tsx
      declaration: false,
      sourceMap: false,
      removeComments: false,
      esModuleInterop: true,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      // keep exports as-is; no bundling/renaming occurs with TS alone
    };

    const result = ts.transpileModule(source, {
      compilerOptions,
      fileName: input,
      reportDiagnostics: true,
    });

    // 3) Fail on diagnostics (optional but helpful)
    if (result.diagnostics?.length) {
      const formatted = ts.formatDiagnosticsWithColorAndContext(
        result.diagnostics,
        {
          getCanonicalFileName: (f) => f,
          getCurrentDirectory: () => process.cwd(),
          getNewLine: () => "\n",
        }
      );
      throw new Error(`TypeScript transpile error:\n${formatted}`);
    }

    // 4) Write output exactly where requested
    await fsp.mkdir(path.dirname(output), { recursive: true });
    await fsp.writeFile(output, result.outputText, "utf8");
  }
  /*
  const transpileAsync = async ({ input, output }: { input: string; output: string }): Promise<void> => {
    const viteConfig = {
      logLevel: 'silent' as const,
      build: {
        write: false,
        emptyOutDir: false,
        lib: { entry: input, formats: ['es' as const], fileName: () => 'bundle' },
        rollupOptions: {
          output: {
            format: 'es' as const,
            inlineDynamicImports: true,
            entryFileNames: 'bundle.js',
          },
        },
      },
    }

    const res = await build(viteConfig)
    const outputs = Array.isArray(res) ? res : [res]

    const first = outputs[0]
    if (!('output' in first)) throw new Error('Unexpected Vite build output')

    const entryChunk = first.output.find(
      (o) => o.type === 'chunk' && (o as any).isEntry
    ) as import('rollup').OutputChunk | undefined

    if (!entryChunk) throw new Error('No entry chunk produced')
    await fs.promises.mkdir(path.dirname(output), { recursive: true })
    await fs.promises.writeFile(output, entryChunk.code, 'utf8')
  }*/

  return {
    transpile: asyncFunctionToObservable(transpileAsync),
  }
}
