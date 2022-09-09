import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Router from './router'
import Container from './components/Container/Container'
import { BreederProvider } from './contexts/BreederContext/BreederContext'
import { AppProvider } from './contexts/AppContext/AppContext'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppProvider>
          <BreederProvider>
            <Container>
              <Router />
            </Container>
          </BreederProvider>
        </AppProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
