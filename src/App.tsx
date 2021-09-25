import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Container } from '@cig-platform/ui'

import Router from 'router'

export default function App() {
  return (
    <BrowserRouter>
      <Container title="" items={[]} onMenuClick={console.log} user={{ image: '', name: 'Eduardo' }}>
        <Router />
      </Container>
    </BrowserRouter>
  )
}
