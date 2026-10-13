import Home from './Home'

import type { RouteRecord } from 'vite-react-ssg'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Home />,
    entry: 'src/Home.tsx',
  },
]
