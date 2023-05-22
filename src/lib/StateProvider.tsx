/* eslint-disable @typescript-eslint/naming-convention */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import { ErrorBoundary, type ErrorBoundaryProps } from 'react-error-boundary'
import { Toaster } from 'react-hot-toast'

const DefaultErrorFallback: ErrorBoundaryProps['FallbackComponent'] = ({
  error,
}) => <div>{error.message}</div>

const DefaultSuspenseFallback = <div>Loading...</div>

type StateProviderProps = Readonly<{
  children: React.ReactNode
  queryClient: QueryClient
  ErrorFallback?: ErrorBoundaryProps['FallbackComponent']
  SuspenseFallback?: React.ReactNode
}>

export const StateProvider = ({
  children,
  queryClient,
  ErrorFallback = DefaultErrorFallback,
  SuspenseFallback = DefaultSuspenseFallback,
}: StateProviderProps) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Suspense fallback={SuspenseFallback}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </Suspense>
  </ErrorBoundary>
)
