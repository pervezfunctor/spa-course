import {
  QueryClient,
  type QueryClientConfig,
  type QueryFunction,
} from '@tanstack/react-query'

const isProd = !import.meta.env.DEV

export function createQueryClient(
  options: QueryClientConfig & {
    onError: (error: unknown) => void
    queryFn: QueryFunction
  },
) {
  return new QueryClient({
    ...options,
    defaultOptions: {
      ...options.defaultOptions,
      queries: {
        refetchOnWindowFocus: isProd,
        retry: isProd ? 3 : 0,
        staleTime: isProd ? 0 : 5 * 60 * 1000,
        useErrorBoundary: true,
        suspense: true,
        ...options.defaultOptions?.queries,
        onError: options.onError,
      },
    },
  })
}
