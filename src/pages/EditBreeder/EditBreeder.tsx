import React from 'react'
import { useTranslation } from 'react-i18next'

import EditBreederContainer from '../../containers/EditBreederContainer/EditBreederContainer'
import { EditBreederProvider } from '../../contexts/EditBreederContext/EditBreederContext'
import useBreeder from '../../hooks/useBreeder'
import PageTitle from '../../components/PageTitle/PageTitle'
import Main from '../../components/Main/Main'

import { StyledTitle } from './EditBreeder.styles'

export default function EditBreederPage() {
  const breeder = useBreeder()

  const { t } = useTranslation()

  return (
    <Main>
      <PageTitle>
        {t('edit-breeder')}
      </PageTitle>
      <StyledTitle>{breeder?.name}</StyledTitle>
      <EditBreederProvider>
        {breeder && <EditBreederContainer breeder={breeder} />}
      </EditBreederProvider>
    </Main>
  )
}
