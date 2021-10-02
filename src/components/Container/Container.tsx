import React, { ReactChild, useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { IoMdHome } from 'react-icons/io'
import { useHistory } from 'react-router'
import { Container as UIContainer } from '@cig-platform/ui'
import { useLocalStorage } from '@cig-platform/hooks'

import useAuth from '../../hooks/useAuth'
import { Routes } from '../../constants/routes'
import { useBreederDispatch } from '../../contexts/BreederContext/BreederContext'
import { setBreeders, setSelected } from '../../contexts/BreederContext/breederActions'
import useQueryParam from '../../hooks/useQueryParam'
import { LOGIN_URL } from '../../constants/url'
import useRefreshToken from '../../hooks/useRefreshToken'

export interface ContainerProps {
  children: ReactChild;
}

export const items = [
  {
    title: 'Home',
    icon: <IoMdHome />,
    route: Routes.Home
  },
  {
    title: 'Meu criatório',
    icon: <IoMdHome />,
    route: Routes.EditBreeder
  }
]

export default function Container({ children }: ContainerProps) {
  const { remove: removeQueryParamToken } = useQueryParam('token')

  const { set } = useLocalStorage('token')

  const dispatch = useBreederDispatch()

  const { t } = useTranslation()

  const { userData, token } = useAuth()

  const refreshToken = useRefreshToken(token)

  const history = useHistory()

  const user = useMemo(() => ({
    image: 'https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png',
    name: userData?.name ?? ''
  }), [userData?.name])

  const handleNavigate = useCallback((pageTitle: string) => {
    const item = items.find(({ title }) => title === pageTitle)

    if (item) {
      history.push(item.route)
    }
  }, [history])

  useEffect(() => {
    dispatch(setBreeders(userData?.breeders))

    const { id: firstBreederId } = userData?.breeders?.[0] ?? {}

    dispatch(setSelected(firstBreederId))
  }, [userData?.breeders, dispatch])

  useEffect(() => {
    if (!token) return window.location.assign(LOGIN_URL)

    set(token)

    removeQueryParamToken()
  }, [token, set, removeQueryParamToken])

  useEffect(() => {
    refreshToken()
  }, [refreshToken])

  return (
    <UIContainer title={t('app-name')} items={items} onMenuClick={handleNavigate} user={user}>
      {children}
    </UIContainer>
  )  
}
