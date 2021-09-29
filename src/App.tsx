import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from 'router'

import Container from './components/Container/Container'
import { BreederProvider } from './contexts/BreederContext/BreederContext'

export default function App() {
  return (
    <BrowserRouter>
      <BreederProvider>
        <Container>
          <Router />
        </Container>
      </BreederProvider>
    </BrowserRouter>
  )
}
