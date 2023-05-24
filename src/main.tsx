import { MantineProvider } from '@mantine/core'
import { QueryFunction } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { Toaster, toast } from 'react-hot-toast'
import invariant from 'tiny-invariant'
import wretch from 'wretch'
import { App } from './App'
import './index.css'
import { createQueryClient, delay, randomInt } from './lib'
import { StateProvider } from './lib/StateProvider'

const queryFn: QueryFunction = async ({ queryKey }) => {
  await delay(500)
  if (randomInt(0, 4) === 3) {
    throw new Error('random error: fetch failed')
  }

  const result = await wretch('https://jsonplaceholder.typicode.com/')
    .get(queryKey.join('/'))
    .json()

  return result
}

// if (import.meta.env.DEV) {
//   const { worker } = await import('./mocks/browser')
//   worker.start({ onUnhandledRequest: 'bypass' }).catch(console.error)
// }

const container = document.getElementById('root')
invariant(container, 'Root element not found')

const root = createRoot(container)

const queryClient = createQueryClient({
  isProd: import.meta.env.PROD,
  onError: () => {
    toast('Error fetching data', { duration: 1000 })
  },
  queryFn,
  defaultOptions: {
    queries: { useErrorBoundary: false },
  },
})

root.render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <StateProvider queryClient={queryClient}>
      <App />
    </StateProvider>
    <Toaster />
  </MantineProvider>,
)
