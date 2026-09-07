import type {
  ApplicationFactory,
  BehaviorsTools,
  LoadBehaviors,
  RequiredApplicationConfig,
} from './type.ts'

import { createCausedError } from '@dungarees/core/error.ts'

// An identity is any JSON value, so an object one has to be described rather than stringified.
const describeIdentity = (identity: unknown): string =>
  typeof identity === 'string' ? identity : JSON.stringify(identity)

// Held across calls so a component tree can reach a behaviour without running the application
// again on every render.
export const createBehaviorsHook = <const APPLICATION extends RequiredApplicationConfig>({
  application,
  identityTransform = (identity) => identity,
}: {
  application: ApplicationFactory<APPLICATION>
  identityTransform?: (identity: APPLICATION['identity']) => APPLICATION['identity']
}): BehaviorsTools<APPLICATION> => {
  let storedBehaviors: APPLICATION['behaviors'] | undefined
  let storedExportState: (() => APPLICATION['exportState']) | undefined
  let storedImportState: ((state: APPLICATION['exportState']) => void) | undefined

  const loadFromApplication = (identity: APPLICATION['identity']): void => {
    if (storedBehaviors !== undefined) {
      return
    }
    try {
      const run = application().run(identityTransform(identity))
      storedBehaviors = run.behaviors
      storedExportState = run.exportState
      storedImportState = run.importState
    } catch (cause: unknown) {
      throw createCausedError({
        message: `Behaviors are not set for "${describeIdentity(identity)}"`,
        cause,
      })
    }
  }

  const loadBehaviors = ((
    identity: APPLICATION['identity'],
    name?: keyof APPLICATION['behaviors'],
  ) => {
    loadFromApplication(identity)
    if (storedBehaviors === undefined) {
      throw new Error('Could not load behaviors')
    }
    return name !== undefined ? storedBehaviors[name] : storedBehaviors
    // The two call shapes cannot be written as one implementation signature TypeScript accepts,
    // which is what the overloaded LoadBehaviors type describes.
  }) as LoadBehaviors<APPLICATION>

  return {
    loadBehaviors,

    setServerBehaviors: ({ behaviors, exportState }) => {
      storedBehaviors = behaviors
      storedExportState = exportState
    },

    exportBehaviorsState: (identity) => {
      loadFromApplication(identity)
      if (storedExportState === undefined) {
        throw new Error('Export state is not defined')
      }
      return storedExportState()
    },

    importBehaviorsState: ({ identity, state }) => {
      loadFromApplication(identity)
      if (storedImportState === undefined) {
        throw new Error('Import state is not defined')
      }
      storedImportState(state)
    },
  }
}
