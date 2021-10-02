import React from 'react'
import { useTranslation } from 'react-i18next'

import { preventDefaultHandler } from '../../utils/dom'
import { BreederWithFiles } from '../../@types/breeder'

import EditBreederFormName from './EditBreederFormName'
import EditBreederFormDescription from './EditBreederFormDescription'
import EditBreederFormFoundationDate from './EditBreederFormFoundationDate'
import EditBreederFormSubmitButton from './EditBreederFormSubmitButton'
import EditBreederFormAddress from './EditBreederFormAddress'
import EditBreederFormProfileImage from './EditBreederFormProfileImage'

import { StyledForm, StyledFormField, StyledAddressTitle, StyledProfileImage } from './EditBreederForm.styles'

export interface EditBreederFormProps {
  onSubmit: (breeder: Partial<BreederWithFiles>) => void;
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
      <StyledAddressTitle>{t('breeder.fields.address')}</StyledAddressTitle>
      <EditBreederFormAddress />
      <StyledFormField>
        <EditBreederFormSubmitButton onSubmit={onSubmit} />
      </StyledFormField>
    </StyledForm>
  )
}
