import React from 'react'

import Route from 'components/Route/Route'
import Home from 'pages/Home/Home'

export default function Router() {
  return (
    <>
      <Route path="/" component={Home} />
    </>
  )
}
