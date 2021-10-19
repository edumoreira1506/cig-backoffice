import React, { ReactChild, useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AiFillHome, AiOutlinePoweroff } from 'react-icons/ai'
import { GiChicken } from 'react-icons/gi'
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
import { useAppSelector } from '../../contexts/AppContext/AppContext'
import { selectError } from '../../contexts/AppContext/appSelectors'
import { error as showError } from '../../utils/alert'
import useLogout from '../../hooks/useLogout'

export interface ContainerProps {
  children: ReactChild;
}

export const items = [
  {
    title: 'Home',
    icon: <AiFillHome />,
    route: Routes.Home
  },
  {
    title: 'Meu criatório',
    icon: <AiFillHome />,
    route: Routes.EditBreeder
  },
  {
    title: 'Minhas aves',
    icon: <GiChicken />,
    route: Routes.ListPoultries
  },
  {
    title: 'Sair',
    icon: <AiOutlinePoweroff />
  }
]

export const shortcuts = ['Sair', 'Editar senha']

const shortcutLinks = {
  [shortcuts[1]]: Routes.EditPassword
}

export default function Container({ children }: ContainerProps) {
  const { remove: removeQueryParamToken } = useQueryParam('token')

  const logout = useLogout()

  const { set } = useLocalStorage('token')

  const dispatch = useBreederDispatch()

  const error = useAppSelector(selectError)

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
      if (item.route) {
        history.push(item.route)
      } else {
        logout()
      }
    }
  }, [history, logout])

  const handleShortcutClick = useCallback((shortcut: string) => {
    if (shortcut === 'Sair') {
      logout()
    } else {
      history.push(shortcutLinks[shortcut])
    }
  }, [history, logout])

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
    >
      {children}
    </UIContainer>
  )  
}
