import { createContext, type Provider, useContext } from 'react'

export type BehaviorsContext<BEHAVIORS> = {
  BehaviorsProvider: Provider<BEHAVIORS | undefined>
  useBehaviors: () => BEHAVIORS
  useBehavior: <NAME extends keyof BEHAVIORS>(name: NAME) => BEHAVIORS[NAME]
}

// Made per application rather than exported as one shared context, so the behaviors a component
// reads are typed as that application's and not as an open record.
export const createBehaviorsContext = <BEHAVIORS>(): BehaviorsContext<BEHAVIORS> => {
  const Context = createContext<BEHAVIORS | undefined>(undefined)

  const useBehaviors = (): BEHAVIORS => {
    const behaviors = useContext(Context)
    if (behaviors === undefined) {
      throw new Error('BehaviorsProvider is missing above this component')
    }
    return behaviors
  }

  return {
    BehaviorsProvider: Context.Provider,
    useBehaviors,
    useBehavior: (name) => useBehaviors()[name],
  }
}
