import React, { ReactChild, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AiFillHome } from 'react-icons/ai'
import { useHistory } from 'react-router'
import { Container as UIContainer } from '@cig-platform/ui'

import useAuth from 'hooks/useAuth'
import { Routes } from 'constants/routes'

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
  }
]

export default function Container({ children }: ContainerProps) {
  const { t } = useTranslation()

  const { userData } = useAuth()

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

  return (
    <UIContainer title={t('app-name')} items={items} onMenuClick={handleNavigate} user={user}>
      {children}
    </UIContainer>
  )  
}
