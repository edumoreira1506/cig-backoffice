import React from 'react'
import { useTranslation } from 'react-i18next'

import EditBreederContainer from '../../containers/EditBreederContainer/EditBreederContainer'
import { EditBreederProvider } from '../../contexts/EditBreederContext/EditBreederContext'
import useBreeder from '../../hooks/useBreeder'

import { StyledContainer, StyledDescription, StyledTitle } from './EditBreeder.styles'

export default function EditBreederPage() {
  const breeder = useBreeder()

  const { t } = useTranslation()

  return (
    <StyledContainer>
      <StyledDescription>{t('edit-breeder')}</StyledDescription>
      <StyledTitle>{breeder?.name}</StyledTitle>
      <EditBreederProvider>
        {breeder && <EditBreederContainer breeder={breeder} />}
      </EditBreederProvider>
    </StyledContainer>
  )
}
