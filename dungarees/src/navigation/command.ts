import { createChangeLocation, type NavigationEvent } from './store.ts'
import type { Location } from './type.ts'

import type { EventReceiver } from '@dungarees/store/type.ts'

export type NavigationCommand = {
  appNavigation: (location: Location) => void
}

export const navigationCommand = <APP_STORE_EVENT extends NavigationEvent>(
  appStore: EventReceiver<APP_STORE_EVENT | NavigationEvent>,
): NavigationCommand => ({
  appNavigation: (location) => {
    appStore.send(createChangeLocation(location))
  },
})
