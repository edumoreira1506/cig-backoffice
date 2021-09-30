import React from 'react'
import { Route } from 'react-router'

import { Routes } from 'constants/routes'
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
