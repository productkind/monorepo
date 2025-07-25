import { mtest } from '@dungarees/core/marbles-vitest.ts'
import { stdout, stderr } from '@dungarees/cli/utils.ts'
import { createOutDir } from './operations.ts'

mtest('create output directory', ({expect, coldStepAndClose}) => {
  const createOutDir$ = createOutDir(coldStepAndClose(undefined), '/out')
  expect(createOutDir$).toBeObservableStepAndClose(stdout('Output directory created: /out'))
})

mtest('create output directory with error', ({expect, coldError}) => {
  const input$ = coldError(new Error('Could not create directory'))
  const createOutDir$ = createOutDir(input$, '/out')
  expect(createOutDir$).toBeObservableStepAndError(
    stderr('Error creating output directory (/out): Could not create directory'),
    new Error('Could not read directory'),
  )
})
