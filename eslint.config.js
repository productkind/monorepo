import prettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/reports/**',
      '.claude/**',
      '.agents/**',
      'productkind/site/**',
      // Remotion project with its own eslint config, run from inside it via `npm run lint`.
      'productkind/video-generator/**',
      'little-parrot/**',
    ],
  },
  {
    files: ['dungarees/src/**/*.ts', 'dungarees/src/**/*.tsx', 'dungarees/e2e/src/**/*.ts'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        // The root tsconfig already covers every dungarees source file, so one program serves the
        // whole run. `projectService` would build one per package tsconfig — about forty of them,
        // held at once — and exhaust the heap.
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' },
      ],
      // Replaces eslint-plugin-deprecation, which typescript-eslint v8 superseded.
      '@typescript-eslint/no-deprecated': 'error',
      // A promise-returning function stays `async`, so a synchronous throw still reaches the
      // caller as a rejection. require-await pushes the other way and is off for that reason.
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/require-await': 'off',
      // No escape hatch in production code: an unused binding there is a defect, not a
      // convention. Tests get one, see the override below.
      // An unused parameter is usually mandated by an interface, so `_` is allowed anywhere.
      // An unused variable is a defect, so it is not — tests get an escape, see the override.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    // Type-aware rules cannot run on plain JS; lint it with the syntactic set only.
    files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  {
    // A test may need a binding purely to host a `@ts-expect-error` or to satisfy a callback
    // signature. It has to say so in its name; `_` is avoided because it also reads as
    // "private". Allowed only here, so production code cannot use the same excuse.
    // Scoped to the same files as the type-aware block above: this is a dungarees convention, and
    // matching `**/*.test.ts` would also claim test files elsewhere in the repo that this config
    // gives no TypeScript parser.
    files: ['dungarees/src/**/*.test.ts', 'dungarees/src/**/*.test.tsx'],
    // The rule below belongs to the plugin, so this object has to register it too: a flat config
    // object cannot borrow one from a sibling.
    plugins: { '@typescript-eslint': tseslint.plugin },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^[Tt]estUnused_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*-react/**/*.jsx', '**/*-react/**/*.tsx'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  prettier,
)
