#!/usr/bin/env node

import { application } from './app/app.ts'

application.run({ environment: 'prod' })
