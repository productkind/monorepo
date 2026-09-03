const config = {
  printWidth: 100,
  tabWidth: 2,
  trailingComma: 'all',
  singleQuote: true,
  semi: false,
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx', '*.mjs', '*.cjs'],
      options: {
        plugins: ['@trivago/prettier-plugin-sort-imports'],
        // Belongs with the plugin that defines it: at the top level prettier validates it
        // against its own options for every file type and reports it as unknown.
        importOrder: [
          // all local imports beside entry.ssr
          '^(?![./]/entry.ssr$)[./]',
          '^(@dungarees|@)/(.*)$',
          '<THIRD_PARTY_MODULES>',
          // entry.ssr has to be the last import to prevent failing build in qwik apps
          './entry.ssr',
        ],
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
