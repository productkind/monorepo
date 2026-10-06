import Home from './Home'
import TechnicalProductManager from './TechnicalProductManager'

import type { RouteRecord } from 'vite-react-ssg'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Home />,
    entry: 'src/Home.tsx',
  },
  {
    path: '/technical-product-manager',
    element: <TechnicalProductManager />,
    entry: 'src/TechnicalProductManager.tsx',
  },
]
