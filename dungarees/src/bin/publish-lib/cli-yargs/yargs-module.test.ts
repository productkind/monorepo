import { publishLibYargsModule } from './yargs-module.ts'

import type { PublishLibBehaviour } from '@dungarees/bin-publish-lib-domain/behavior.ts'
import type { PublishLibEvent } from '@dungarees/bin-publish-lib-domain/events.ts'
import type { CliIo } from '@dungarees/cli/yargs-prompt-app.ts'

import { type Observable, of } from 'rxjs'
import { expect, test } from 'vitest'

test('publish-multi-lib command registers the events from publishMultiLib', async () => {
  const events$ = of<PublishLibEvent>({ type: 'all-published', payload: undefined })
  const publishMultiLibCalls: Array<{ dir: string; registry: string | undefined }> = []
  const registered: Array<Observable<PublishLibEvent>> = []

  const behavior: PublishLibBehaviour = {
    build: () => ({ events$: of() }),
    publishSingleLib: () => ({ events$: of() }),
    publishMultiLib: (args) => {
      publishMultiLibCalls.push(args)
      return { events$ }
    },
  }
  const io: CliIo<PublishLibEvent> = {
    registerEvents: (event$) => registered.push(event$),
    select: () => of(''),
  }

  const command = publishLibYargsModule({ publishLib: behavior })(io)

  expect(command.command).toBe('publish-multi-lib [lib-path]')
  expect(command.describe).toBe('Publish a library')

  await command.handler({ libPath: '/libs', registry: 'https://registry' })

  expect(publishMultiLibCalls).toEqual([{ dir: '/libs', registry: 'https://registry' }])
  expect(registered).toEqual([events$])
})
