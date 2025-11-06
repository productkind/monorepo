import {test, expect} from "vitest";
import {lastValueFrom} from "rxjs";
import {createFakeNodeFs} from "@dungarees/fs/fake.ts";
import {createTranspileService} from "./service.ts";
import fs from "node:fs";

const srcFile = `
import { assertDefined } from '@dungarees/core/utils.ts';

export const fun = (input: string): string => {
  return assertDefined(input + ' world');
};
`;

test('transpile should transpile a single file', async () => {
  fs.mkdirSync('dist-test', { recursive: true })
  fs.writeFileSync('dist-test/src-file.ts', srcFile.trim())
  fs.mkdirSync('dist-test/dist', { recursive: true })

  const transpileService = createTranspileService(fs)
  await lastValueFrom(transpileService.transpile({
    input: 'dist-test/src-file.ts',
    output: 'dist-test/dist/file.js',
    type: 'dist-test/dist/file.d.ts',
  }))
  expect(fs.readFileSync('dist-test/dist/file.js', 'utf-8')).toBe('import { assertDefined } from \'@dungarees/core/utils.ts\';\nexport const fun = (input) => {\n    return assertDefined(input + \' world\');\n};\n')
  expect(fs.readFileSync('dist-test/dist/file.d.ts', 'utf-8')).toBe('export declare const fun: (input: string) => string;\n')
  fs.rmSync('dist-test', { recursive: true, force: true })
})
