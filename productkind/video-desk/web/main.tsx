import { App } from './App'
import './styles.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const root = document.getElementById('root')
if (root === null) {
  throw new Error('index.html has no #root to mount the desk in.')
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
