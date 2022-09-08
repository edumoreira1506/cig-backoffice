import React from 'react'
import { Route, Routes as ReactRouterRoutes } from 'react-router'

import { Routes } from 'constants/routes'
import EditBreeder from 'pages/EditBreeder/EditBreeder'
import EditPassword from 'pages/EditPassword/EditPassword'
import ListPoultries from 'pages/ListPoultries/ListPoultries'
import NewPoultry from 'pages/NewPoultry/NewPoultry'
import EditPoultry from 'pages/EditPoultry/EditPoultry'
import ViewPoultry from 'pages/ViewPoultry/ViewPoultry'
import NewRegister from 'pages/NewRegister/NewRegister'
import Logout from 'pages/Logout/Logout'
import Sales from 'pages/Sales/Sales'
import Purchases from 'pages/Purchases/Purchases'
import Purchase from 'pages/Purchase/Purchase'
import Sale from 'pages/Sale/Sale'
import EditProfile from 'pages/EditProfile/EditProfile'
import ReviewPurchase from 'pages/ReviewPurchase/ReviewPurchase'
import ManageTree from 'pages/ManageTree/ManageTree'

export default function Router() {
  return (
    <ReactRouterRoutes>
      <Route path={Routes.Home} element={<ListPoultries />} />
      <Route path={Routes.EditBreeder} element={<EditBreeder />} />
      <Route path={Routes.EditPassword} element={<EditPassword />} />
      <Route path={Routes.EditProfile} element={<EditProfile />} />
      <Route path={Routes.NewPoultry} element={<NewPoultry />} />
      <Route path={Routes.EditPoultry} element={<EditPoultry />} />
      <Route path={Routes.ViewPoultry} element={<ViewPoultry />} />
      <Route path={Routes.NewRegister} element={<NewRegister />} />
      <Route path={Routes.Logout} element={<Logout />} />
      <Route path={Routes.Sales} element={<Sales />} />
      <Route path={Routes.Purchases} element={<Purchases />} />
      <Route path={Routes.Purchase} element={<Purchase />} />
      <Route path={Routes.Sale} element={<Sale />} />
      <Route path={Routes.ReviewPurchase} element={<ReviewPurchase />} />
      <Route path={Routes.ManagePoultryTree} element={<ManageTree />} />
    </ReactRouterRoutes>
  )
}
