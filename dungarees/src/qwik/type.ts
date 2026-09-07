import type { QwikAppIdentity } from './identity.ts'

import type {
  Application,
  ApplicationRunReturn,
  ApplicationTypeConfig,
} from '@dungarees/core/application.ts'
import type { GetValueByKey, PartialBesides, RecordToEntries } from '@dungarees/core/type-util.ts'

export type RequiredApplicationConfig = PartialBesides<
  ApplicationTypeConfig,
  'behaviors' | 'exportState' | 'identity'
>

// The hooks put the identity into a Qwik context, which is declared with one concrete shape, so an
// application driven through them identifies itself that way.
export type QwikApplicationConfig = RequiredApplicationConfig & { identity: QwikAppIdentity }

export type BehaviorName<APPLICATION extends RequiredApplicationConfig> =
  keyof APPLICATION['behaviors'] & string

export type BehaviorByName<
  APPLICATION extends RequiredApplicationConfig,
  NAME extends BehaviorName<APPLICATION>,
> = GetValueByKey<RecordToEntries<APPLICATION['behaviors']>, NAME>

export type LoadBehaviorsByName<APPLICATION extends RequiredApplicationConfig> = <
  NAME extends BehaviorName<APPLICATION>,
>(
  identity: APPLICATION['identity'],
  name: NAME,
) => BehaviorByName<APPLICATION, NAME>

export type LoadBehaviors<APPLICATION extends RequiredApplicationConfig> = {
  <NAME extends BehaviorName<APPLICATION>>(
    identity: APPLICATION['identity'],
    name: NAME,
  ): BehaviorByName<APPLICATION, NAME>
  (identity: APPLICATION['identity']): APPLICATION['behaviors']
}

export type BehaviorsTools<APPLICATION extends RequiredApplicationConfig> = {
  loadBehaviors: LoadBehaviors<APPLICATION>
  setServerBehaviors: (args: {
    behaviors: APPLICATION['behaviors']
    exportState?: () => APPLICATION['exportState']
  }) => void
  exportBehaviorsState: (identity: APPLICATION['identity']) => APPLICATION['exportState']
  importBehaviorsState: (args: {
    identity: APPLICATION['identity']
    state: APPLICATION['exportState']
  }) => void
}

export type ApplicationFactory<APPLICATION extends RequiredApplicationConfig> =
  () => Application<APPLICATION>

export type ApplicationRun<APPLICATION extends RequiredApplicationConfig> =
  ApplicationRunReturn<APPLICATION>
