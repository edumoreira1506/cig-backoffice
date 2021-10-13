import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Router from './router'
import Container from './components/Container/Container'
import { BreederProvider } from './contexts/BreederContext/BreederContext'
import { AppProvider } from './contexts/AppContext/AppContext'

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <BreederProvider>
          <Container>
            <Router />
          </Container>
        </BreederProvider>
      </AppProvider>
    </BrowserRouter>
  )
}
