import React from 'react'
import { Route } from 'react-router-dom'

import Home from 'pages/Home/Home'

export default function Routes() {
  return (
    <>
      <Route path="/" component={Home} />
    </>
  )
}
