import React from 'react'
import { useTranslation } from 'react-i18next'
import { IBreeder } from '@cig-platform/types'

import { preventDefaultHandler } from '../../utils/dom'

import EditBreederFormName from './EditBreederFormName'
import EditBreederFormDescription from './EditBreederFormDescription'
import EditBreederFormFoundationDate from './EditBreederFormFoundationDate'
import EditBreederFormSubmitButton from './EditBreederFormSubmitButton'
import EditBreederFormAddress from './EditBreederFormAddress'

import { StyledForm, StyledFormField, StyledAddressTitle } from './EditBreederForm.styles'

export interface EditBreederFormProps {
  onSubmit: (breeder: Partial<IBreeder>) => void;
}

export default function EditBreederForm({ onSubmit }: EditBreederFormProps) {
  const { t } = useTranslation()

  return (
    <StyledForm onSubmit={preventDefaultHandler}>
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
