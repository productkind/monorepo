#!/usr/bin/env node

import { application } from './app.ts'

// `main` renders asynchronously, so its rejection has to be awaited here — createApplication's
// try/catch is synchronous and cannot see it.
await application.run({ environment: 'prod' }).output
