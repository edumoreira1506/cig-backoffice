import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@cig-platform/data-helper'

import Router from './router'
import Container from './components/Container/Container'
import { BreederProvider } from './contexts/BreederContext/BreederContext'
import { AppProvider } from './contexts/AppContext/AppContext'

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
