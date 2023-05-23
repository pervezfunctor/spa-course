/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser')
  worker.start({ onUnhandledRequest: 'bypass' })
}

const root = createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
