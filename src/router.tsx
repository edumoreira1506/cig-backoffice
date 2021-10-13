import React from 'react'
import { Route } from 'react-router'

import { Routes } from './constants/routes'
import Home from './pages/Home/Home'
import EditBreeder from './pages/EditBreeder/EditBreeder'
import EditPassword from 'pages/EditPassword/EditPassword'

export default function Router() {
  return (
    <>
      <Route exact path={Routes.Home} component={Home} />
      <Route exact path={Routes.EditBreeder} component={EditBreeder} />
      <Route exact path={Routes.EditPassword} component={EditPassword} />
    </>
  )
}
