import { NAVIGATION_NAMESPACE } from './config.ts'
import { createNavigationService, type NavigationService } from './service.ts'
import { navigationReducer } from './store.ts'

import { createStoreTools } from '@dungarees/store/fake.ts'

import { createMemoryHistory } from 'history'

export const createNavigationServiceFake = (): NavigationService =>
  createNavigationService(createMemoryHistory())

export const { createAppStore, getStateReadable } = createStoreTools({
  namespace: NAVIGATION_NAMESPACE,
  reducer: navigationReducer,
})

export const baseStore = { [NAVIGATION_NAMESPACE]: navigationReducer }
