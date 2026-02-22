const config = {
  printWidth: 100,
  tabWidth: 2,
  trailingComma: 'all',
  singleQuote: true,
  semi: false,
  importOrder: [
    // all local imports beside entry.ssr
    '^(?![./]/entry.ssr$)[./]',
    '^(@dungarees|@)/(.*)$',
    '<THIRD_PARTY_MODULES>',
    // entry.ssr has to be the last import to prevent failing build in qwik apps
    './entry.ssr',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx', '*.mjs', '*.cjs'],
      options: {
        plugins: ['@trivago/prettier-plugin-sort-imports'],
        importOrderParserPlugins: ['explicitResourceManagement', 'typescript', 'jsx'],
        importOrderSeparation: true,
        importOrderSortSpecifiers: true,
        importOrderCaseInsensitive: true,
      },
    },
  ],
  proseWrap: 'always',
  endOfLine: 'lf',
}

export default config
