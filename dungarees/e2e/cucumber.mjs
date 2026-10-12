const suite = (name) => ({
  paths: [`features/${name}/**/*.feature`],
  import: [`src/${name}/**/*.ts`],
  format: [
    `json:../reports/${name}/cucumber-report.json`,
    `html:../reports/${name}/report.html`,
    'summary',
    'progress-bar',
    '@cucumber/pretty-formatter',
  ],
  formatOptions: { snippetInterface: 'async-await' },
})

export const publishLib = suite('publish-lib')
export const todoMvc = suite('todo-mvc')

// Cucumber will not load a config without a default export, and a run that loaded both suites
// would start the containers of both.
export default {}
