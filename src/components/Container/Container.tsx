import React, { ReactChild, useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AiFillHome, AiOutlinePoweroff } from 'react-icons/ai'
import { GiReceiveMoney } from 'react-icons/gi'
import { useNavigate } from 'react-router'
import { Container as UIContainer } from '@cig-platform/ui'
import { useLocalStorage } from '@cig-platform/hooks'

import useAuth from '../../hooks/useAuth'
import { Routes } from '../../constants/routes'
import { useBreederDispatch } from '../../contexts/BreederContext/BreederContext'
import { setBreeders, setSelected } from '../../contexts/BreederContext/breederActions'
import useQueryParam from '../../hooks/useQueryParam'
import { LOGIN_URL, LOGO_URL } from '../../constants/url'
import useRefreshToken from '../../hooks/useRefreshToken'
import { useAppSelector } from '../../contexts/AppContext/AppContext'
import { selectError, selectIsLoading } from '../../contexts/AppContext/appSelectors'
import { error as showError } from '../../utils/alert'
import { UserRegisterTypeEnum } from '@cig-platform/enums'

export interface ContainerProps {
  children: ReactChild;
}

export const items = [
  {
    title: 'Meu plantel',
    icon: <AiFillHome />,
    route: Routes.Home
  },
  {
    title: 'Meu criatório',
    icon: <AiFillHome />,
    route: Routes.EditBreeder
  },
  {
    title: 'Vendas',
    icon: <GiReceiveMoney />,
    route: Routes.Sales
  },
  {
    title: 'Compras',
    icon: <GiReceiveMoney />,
    route: Routes.Purchases
  },
  {
    title: 'Sair',
    icon: <AiOutlinePoweroff />,
    route: Routes.Logout
  }
]

enum Shortcuts {
  LOGOUT = 'Sair',
  EDIT_PASSWORD = 'Editar senha'
}

const shortcutLinks = {
  [Shortcuts.LOGOUT]: Routes.Logout,
  [Shortcuts.EDIT_PASSWORD]: Routes.EditPassword,
}

export default function Container({ children }: ContainerProps) {
  const { remove: removeQueryParamToken } = useQueryParam('token')

  const { set } = useLocalStorage('token')

  const dispatch = useBreederDispatch()

  const isLoading = useAppSelector(selectIsLoading)

  const error = useAppSelector(selectError)

  const { t } = useTranslation()

  const { userData, token } = useAuth()

  const refreshToken = useRefreshToken(token)

  const navigate = useNavigate()

  const user = useMemo(() => ({
    image: 'https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png',
    name: userData?.name ?? ''
  }), [userData?.name])

  const shortcuts = useMemo(() => userData?.registerType === UserRegisterTypeEnum.Default
    ? [Shortcuts.EDIT_PASSWORD, Shortcuts.LOGOUT]
    : [Shortcuts.LOGOUT],
  [
    userData?.registerType
  ])

  const handleNavigate = useCallback((pageTitle: string) => {
    const item = items.find(({ title }) => title === pageTitle)

    if (item) {
      if (item.route) {
        navigate(item.route)
      }
    }
  }, [navigate])

  const handleShortcutClick = useCallback((shortcut: string) => {
    navigate(shortcutLinks[shortcut as Shortcuts])
  }, [navigate])

  const handleNavigateToMainPage = useCallback(() => navigate('/'), [navigate])

  useEffect(() => {
    dispatch(setBreeders(userData?.breeders ?? []))

    const { id: firstBreederId } = userData?.breeders?.[0] ?? {}

    if (firstBreederId) dispatch(setSelected(firstBreederId))
  }, [userData?.breeders, dispatch])

  useEffect(() => {
    if (!token) return window.location.assign(LOGIN_URL)

    set(token)

    removeQueryParamToken()
  }, [token, set, removeQueryParamToken])

  useEffect(() => {
    refreshToken()
  }, [refreshToken])

  useEffect(() => {
    if (error) {
      showError(error?.message ?? t('common.something-wrong'), t)
    }
  }, [error])

  return (
    <UIContainer
      title={t('app-name')}
      items={items}
      onMenuClick={handleNavigate}
      user={user}
      shortcuts={shortcuts}
      onShortcutClick={handleShortcutClick}
      logoUrl={LOGO_URL}
      isLoading={isLoading}
      onClickTitle={handleNavigateToMainPage}
    >
      {children}
    </UIContainer>
  )  
}
