import { getBrowserServices } from './browser-services.ts'

import { createApplication } from '@dungarees/core/application.ts'
import { baseApplication } from '@dungarees/todo-mvc-base-app-ssr-react/base-app.ts'

createApplication({ getServices: () => getBrowserServices() }, () => baseApplication).run({
  environment: import.meta.env.DEV ? 'test' : 'prod',
  runtime: 'browser',
})
