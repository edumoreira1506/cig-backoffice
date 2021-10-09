import React from 'react'
import { useTranslation } from 'react-i18next'
import { IBreeder } from '@cig-platform/types'

import { preventDefaultHandler } from '../../utils/dom'

import EditBreederFormName from './EditBreederFormName'
import EditBreederFormDescription from './EditBreederFormDescription'
import EditBreederFormFoundationDate from './EditBreederFormFoundationDate'
import EditBreederFormSubmitButton from './EditBreederFormSubmitButton'
import EditBreederFormAddress from './EditBreederFormAddress'
import EditBreederFormProfileImage from './EditBreederFormProfileImage'

import { StyledForm, StyledFormField, StyledSubtitle, StyledProfileImage } from './EditBreederForm.styles'

export interface EditBreederFormProps {
  onSubmit: (breeder: Partial<IBreeder>) => void;
}

export default function EditBreederForm({ onSubmit }: EditBreederFormProps) {
  const { t } = useTranslation()

  return (
    <StyledForm onSubmit={preventDefaultHandler}>
      <StyledProfileImage>
        <EditBreederFormProfileImage />
      </StyledProfileImage>
      <StyledFormField>
        <EditBreederFormName />
      </StyledFormField>
      <StyledFormField>
        <EditBreederFormDescription />
      </StyledFormField>
      <StyledFormField>
        <EditBreederFormFoundationDate />
      </StyledFormField>
      <StyledSubtitle>{t('breeder.images')}</StyledSubtitle>
      <StyledSubtitle>{t('breeder.fields.address')}</StyledSubtitle>
      <EditBreederFormAddress />
      <StyledFormField>
        <EditBreederFormSubmitButton onSubmit={onSubmit} />
      </StyledFormField>
    </StyledForm>
  )
}
