import { IdentityContext } from './identity-context.ts'
import type {
  BehaviorByName,
  BehaviorName,
  BehaviorsTools,
  LoadBehaviorsByName,
  QwikApplicationConfig,
} from './type.ts'

import {
  type QRL,
  type Signal,
  useContext,
  useContextProvider,
  useSignal,
  useTask$,
  useVisibleTask$,
} from '@builder.io/qwik'
import type { Observable } from 'rxjs'

export type QwikHooks<APPLICATION extends QwikApplicationConfig> = {
  useInitApp: (identity: APPLICATION['identity']) => void
  useObservableBehavior: <VALUE, NAME extends BehaviorName<APPLICATION>>(args: {
    behaviorName: NAME
    get: (behavior: BehaviorByName<APPLICATION, NAME>) => Promise<Observable<VALUE>>
    startingValue: VALUE
  }) => Signal<VALUE>
}

export const createQwikHooks = <APPLICATION extends QwikApplicationConfig>({
  exportBehaviorsState,
  importBehaviorsState,
  loadBehaviors,
}: {
  exportBehaviorsState: QRL<BehaviorsTools<APPLICATION>['exportBehaviorsState']>
  importBehaviorsState: QRL<BehaviorsTools<APPLICATION>['importBehaviorsState']>
  // Typed by name only: the hook always asks for one behaviour, and the overloaded LoadBehaviors
  // satisfies this signature, so either form can be handed over.
  loadBehaviors: QRL<LoadBehaviorsByName<APPLICATION>>
}): QwikHooks<APPLICATION> => ({
  // The state is exported while rendering and imported once the document is ready, which is what
  // carries the server's state across to the browser without a second run of the application.
  useInitApp: (identity) => {
    useContextProvider(IdentityContext, { identity })
    const appState = exportBehaviorsState(identity)
    useVisibleTask$(
      async () => {
        await importBehaviorsState({ identity, state: await appState })
      },
      { strategy: 'document-ready' },
    )
  },

  useObservableBehavior: <VALUE, NAME extends BehaviorName<APPLICATION>>({
    behaviorName,
    get,
    startingValue,
  }: {
    behaviorName: NAME
    get: (behavior: BehaviorByName<APPLICATION, NAME>) => Promise<Observable<VALUE>>
    startingValue: VALUE
  }): Signal<VALUE> => {
    const { identity } = useContext(IdentityContext)
    const signal = useSignal<VALUE>(startingValue)
    // Tracked so the subscription is set up again in the browser once hydration flips it, rather
    // than being left with whatever the server rendered.
    const hydrate = useSignal<boolean>(false)

    // The task context is used through itself rather than destructured, because track and cleanup
    // are methods on it and lose their receiver when pulled off.
    useTask$(async (taskContext) => {
      taskContext.track(() => hydrate.value)
      // QRL erases the generic parameter of the function it wraps, so the awaited value widens to
      // the union of every behaviour. The name it was just looked up by is what makes it this one.
      const behavior = (await loadBehaviors(identity, behaviorName)) as BehaviorByName<
        APPLICATION,
        NAME
      >
      const subscription = (await get(behavior)).subscribe((value) => {
        signal.value = value
      })
      taskContext.cleanup(() => {
        subscription.unsubscribe()
      })
    })

    useVisibleTask$(() => {
      hydrate.value = true
    })

    return signal
  },
})
