import React, { ComponentType } from 'react'
import { Route as ReactRouterRoute, RouteProps as ReactRouterRouteProps } from 'react-router'

import useAuth from 'hooks/useAuth'
import { LOGIN_URL } from 'constants/url'

export interface RouteProps extends ReactRouterRouteProps {
  component: ComponentType;
}

export default function Route({ component: Component, ...rest }: RouteProps) {
  const { isAuthenticated } = useAuth()

  return (
    <ReactRouterRoute
      { ...rest }
      render={() =>
        isAuthenticated ? (
          <Component />
        ) : (
          window.location.assign(LOGIN_URL)
        ) as any
      }
    />
  )
}
