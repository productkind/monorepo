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
    files: ['dungarees/src/**/*.ts', 'dungarees/src/**/*.tsx'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
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
    files: ['**/*.test.ts', '**/*.test.tsx'],
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
