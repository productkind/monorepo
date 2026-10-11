import { application } from './app.ts'

application.run({ environment: import.meta.env.DEV ? 'test' : 'prod', runtime: 'browser' })
