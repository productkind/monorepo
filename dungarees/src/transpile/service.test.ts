import {test, expect} from "vitest";
import {lastValueFrom} from "rxjs";
import {createFakeFileSystem} from "@dungarees/fs/fake.ts";
import {createTranspilerService} from "./service.ts";

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

const srcDirFile3 = `
console.log('File 3');
`;

test('transpile should transpile a directory', async () => {
  const fs = createFakeFileSystem({
    '/src-dir/file1.ts': srcDirFile1.trim(),
    '/src-dir/file2.ts': srcDirFile2.trim(),
    '/src-dir/sub-dir/file3.ts': srcDirFile3.trim(),
  });

  const transpileService = createTranspilerService(fs)
  const files = await lastValueFrom(transpileService.transpileDir({
    input: '/src-dir',
    output: '/dist-dir',
  }))

  expect(fs.readFileSync('/dist-dir/file1.js', 'utf-8')).toBe('import { assertDefined } from \'@dungarees/core/utils.ts\';\nexport const fun1 = (input) => {\n    return assertDefined(input + \' from file1\');\n};\n')
  expect(fs.readFileSync('/dist-dir/file1.d.ts', 'utf-8')).toBe('export declare const fun1: (input: string) => string;\n')
  expect(fs.readFileSync('/dist-dir/file2.js', 'utf-8')).toBe('import { fun1 } from \'./file1.js\';\nexport const fun2 = (input) => {\n    return fun1(input + \' and file2\');\n};\n')
  expect(fs.readFileSync('/dist-dir/file2.d.ts', 'utf-8')).toBe('export declare const fun2: (input: string) => string;\n')
  expect(fs.readFileSync('/dist-dir/sub-dir/file3.js', 'utf-8')).toBe('console.log(\'File 3\');\n')
  expect(fs.readFileSync('/dist-dir/sub-dir/file3.d.ts', 'utf-8')).toBe('')
  expect(files).toEqual([
    { input: '/src-dir/file1.ts', output: '/dist-dir/file1.js', type: '/dist-dir/file1.d.ts' },
    { input: '/src-dir/file2.ts', output: '/dist-dir/file2.js', type: '/dist-dir/file2.d.ts' },
    { input: '/src-dir/sub-dir/file3.ts', output: '/dist-dir/sub-dir/file3.js', type: '/dist-dir/sub-dir/file3.d.ts' },
  ])
})
