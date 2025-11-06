import {test, expect} from "vitest";
import {lastValueFrom} from "rxjs";
import {createFakeNodeFs} from "@dungarees/fs/fake.ts";
import {createTranspileService} from "./service.ts";

const srcFile = `
import { assertDefined } from '@dungarees/core/utils.ts';

export const fun = (input: string): string => {
  return assertDefined(input + ' world');
};
`;

test('transpile should transpile a single file', async () => {
  const fs = createFakeNodeFs({
    '/src-file.ts': srcFile.trim()
  });

  const transpileService = createTranspileService(fs)
  await lastValueFrom(transpileService.transpile({
    input: '/src-file.ts',
    output: '/dist/file.js',
    type: '/dist/file.d.ts',
  }))

  expect(fs.readFileSync('/dist/file.js', 'utf-8')).toBe('import { assertDefined } from \'@dungarees/core/utils.ts\';\nexport const fun = (input) => {\n    return assertDefined(input + \' world\');\n};\n')
  expect(fs.readFileSync('/dist/file.d.ts', 'utf-8')).toBe('export declare const fun: (input: string) => string;\n')
})

const srcDirFile1 = `
import { assertDefined } from '@dungarees/core/utils.ts';

export const fun1 = (input: string): string => {
  return assertDefined(input + ' from file1');
};
`;

const srcDirFile2 = `
import { fun1 } from './file1.ts';

export const fun2 = (input: string): string => {
  return fun1(input + ' and file2');
};
`;

test('transpile should transpile a directory', async () => {
  const fs = createFakeNodeFs({
    '/src-dir/file1.ts': srcDirFile1.trim(),
    '/src-dir/file2.ts': srcDirFile2.trim(),
  });

  const transpileService = createTranspileService(fs)
  await lastValueFrom(transpileService.transpileDir({
    input: '/src-dir',
    output: '/dist-dir',
  }))

  expect(fs.readFileSync('/dist-dir/file1.js', 'utf-8')).toBe('import { assertDefined } from \'@dungarees/core/utils.ts\';\nexport const fun1 = (input) => {\n    return assertDefined(input + \' from file1\');\n};\n')
  expect(fs.readFileSync('/dist-dir/file1.d.ts', 'utf-8')).toBe('export declare const fun1: (input: string) => string;\n')
  expect(fs.readFileSync('/dist-dir/file2.js', 'utf-8')).toBe('import { fun1 } from \'./file1.js\';\nexport const fun2 = (input) => {\n    return fun1(input + \' and file2\');\n};\n')
  expect(fs.readFileSync('/dist-dir/file2.d.ts', 'utf-8')).toBe('export declare const fun2: (input: string) => string;\n')
})
