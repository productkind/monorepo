import type { ReactElement } from 'react'
import { hydrateRoot } from 'react-dom/client'

export type HydrateAppArgs = {
  element: ReactElement
  container: Element | Document
}

export const hydrateApp = ({ element, container }: HydrateAppArgs): void => {
  hydrateRoot(container, element)
}
