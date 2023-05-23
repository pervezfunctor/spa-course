import { createRoot } from 'react-dom/client'
import invariant from 'tiny-invariant'
import { App } from './App'
import './index.css'

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser')
  worker.start({ onUnhandledRequest: 'bypass' }).catch(console.error)
}

const container = document.getElementById('root')
invariant(container, 'Root element not found')

const root = createRoot(container)

root.render(<App />)
