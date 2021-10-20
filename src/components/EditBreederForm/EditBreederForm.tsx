import React from 'react'
import { useTranslation } from 'react-i18next'
import { IBreeder } from '@cig-platform/types'

import { preventDefaultHandler } from '../../utils/dom'
import { EditBreederState } from '../../contexts/EditBreederContext/editBreederReducer'

import EditBreederFormName from './EditBreederFormName'
import EditBreederFormDescription from './EditBreederFormDescription'
import EditBreederFormFoundationDate from './EditBreederFormFoundationDate'
import EditBreederFormSubmitButton from './EditBreederFormSubmitButton'
import EditBreederFormAddress from './EditBreederFormAddress'
import EditBreederFormProfileImage from './EditBreederFormProfileImage'
import EditBreederFormImages from './EditBreederFormImages'
import EditBreederFormMainVideo from './EditBreederFormMainVideo'
import EditBreederFormContacts from './EditBreederFormContacts'

import { StyledForm, StyledFormField, StyledSubtitle, StyledProfileImage } from './EditBreederForm.styles'

export interface EditBreederFormProps {
  onSubmit: (breeder: Partial<IBreeder & { images: EditBreederState['images'] }>) => void;
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
      <StyledFormField>
        <EditBreederFormMainVideo />
      </StyledFormField>
      <StyledSubtitle>{t('breeder.images')}</StyledSubtitle>
      <EditBreederFormImages />
      <StyledSubtitle>{t('breeder.fields.address')}</StyledSubtitle>
      <EditBreederFormAddress />
      <StyledSubtitle>{t('breeder.fields.contacts')}</StyledSubtitle>
      <EditBreederFormContacts />
      <StyledFormField>
        <EditBreederFormSubmitButton onSubmit={onSubmit} />
      </StyledFormField>
    </StyledForm>
  )
}
