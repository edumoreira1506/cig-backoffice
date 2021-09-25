import React from 'react'

import { Routes } from 'constants/routes'
import Route from 'components/Route/Route'
import Home from 'pages/Home/Home'

export default function Router() {
  return (
    <>
      <Route path={Routes.Home} component={Home} />
    </>
  )
}
