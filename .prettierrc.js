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
  // Markdown paragraphs stay on one line each: rules and docs here get copied into chat and
  // review comments, and a hard-wrapped paragraph arrives full of stray newlines.
  proseWrap: 'never',
  endOfLine: 'lf',
}

export default config
