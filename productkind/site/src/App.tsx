import type { RouteRecord } from 'vite-react-ssg'
import Home from './Home'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Home />,
    entry: 'src/Home.tsx',
  },
]

