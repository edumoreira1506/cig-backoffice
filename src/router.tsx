import React from 'react'
import { Route } from 'react-router'

import { Routes } from 'constants/routes'
import Home from 'pages/Home/Home'
import EditBreeder from 'pages/EditBreeder/EditBreeder'
import EditPassword from 'pages/EditPassword/EditPassword'
import ListPoultries from 'pages/ListPoultries/ListPoultries'
import NewPoultry from 'pages/NewPoultry/NewPoultry'
import EditPoultry from 'pages/EditPoultry/EditPoultry'
import ViewPoultry from 'pages/ViewPoultry/ViewPoultry'
import NewRegister from 'pages/NewRegister/NewRegister'
import Logout from 'pages/Logout/Logout'

export default function Router() {
  return (
    <>
      <Route exact path={Routes.Home} component={Home} />
      <Route exact path={Routes.EditBreeder} component={EditBreeder} />
      <Route exact path={Routes.EditPassword} component={EditPassword} />
      <Route exact path={Routes.ListPoultries} component={ListPoultries} />
      <Route exact path={Routes.NewPoultry} component={NewPoultry} />
      <Route exact path={Routes.EditPoultry} component={EditPoultry} />
      <Route exact path={Routes.ViewPoultry} component={ViewPoultry} />
      <Route exact path={Routes.NewRegister} component={NewRegister} />
      <Route exact path={Routes.Logout} component={Logout} />
    </>
  )
}
