import React from 'react'

import { Routes } from 'constants/routes'
import Route from 'components/Route/Route'
import Home from 'pages/Home/Home'
import EditBreeder from 'pages/EditBreeder/EditBreeder'

export default function Router() {
  return (
    <>
      <Route exact path={Routes.Home} component={Home} />
      <Route exact path={Routes.EditBreeder} component={EditBreeder} />
    </>
  )
}
