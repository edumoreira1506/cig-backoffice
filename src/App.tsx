import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Router from 'router'
import Container from 'components/Container/Container'

export default function App() {
  return (
    <BrowserRouter>
      <Container>
        <Router />
      </Container>
    </BrowserRouter>
  )
}
