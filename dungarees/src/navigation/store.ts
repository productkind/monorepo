import { NAVIGATION_NAMESPACE } from './config.ts'
import type { Location } from './type.ts'

import { createStoreSlice, identityReducer } from '@dungarees/store/service.ts'
import type { NamespacedState, NamespacedStoreEvent } from '@dungarees/store/type.ts'

export type NavigationState = Location

type NavigationStoreEvent<
  SUB_TYPE extends string,
  PAYLOAD extends Location = Location,
> = NamespacedStoreEvent<typeof NAVIGATION_NAMESPACE, SUB_TYPE, PAYLOAD>

export type NavigationEventChangeLocation = NavigationStoreEvent<'changeLocation'>

export type NavigationEventAppNavigation = NavigationStoreEvent<'appNavigation'>

export type NavigationEventPlatformNavigation = NavigationStoreEvent<'platformNavigation'>

export type NavigationEvent =
  | NavigationEventChangeLocation
  | NavigationEventAppNavigation
  | NavigationEventPlatformNavigation

const INITIAL_STATE: NavigationState = {
  pathname: '/',
  search: '',
  hash: '',
}

// appNavigation and platformNavigation leave the state alone on purpose: they are what the effects
// listen for, and it is the changeLocation they lead to that moves the location.
const navigationSlice = createStoreSlice({
  name: NAVIGATION_NAMESPACE,
  initialState: INITIAL_STATE,
  reducers: {
    changeLocation: (
      _: NavigationState,
      event: NavigationEventChangeLocation,
    ): NavigationState => ({
      ...event.payload,
    }),
    appNavigation: identityReducer<NavigationState, NavigationEventAppNavigation>,
    platformNavigation: identityReducer<NavigationState, NavigationEventPlatformNavigation>,
  },
})

export type AppStoreNavigationStateSlice = NamespacedState<typeof navigationSlice>

// Renamed on the way out because the bare reducer keys would collide with the reducers above.
export const {
  eventCreators: {
    changeLocation: createChangeLocation,
    appNavigation: createAppNavigation,
    platformNavigation: createPlatformNavigation,
  },
  reducer: navigationReducer,
  stateToNavigation,
} = navigationSlice
