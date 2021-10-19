import React from 'react'
import { useTranslation } from 'react-i18next'
import { IPoultry } from '@cig-platform/types'

import { preventDefaultHandler } from 'utils/dom'

import { StyledForm, StyledFormField, StyledSubtitle } from './NewPoultryForm.styles'
import NewPoultryFormBirthDate from './NewPoultryFormBirthDate'
import NewPoultryFormColors from './NewPoultryFormColors'
import NewPoultryFormType from './NewPoultryFormType'
import NewPoultryFormVideos from './NewPoultryFormVideos'
import NewPoultryFormSubmitButton from './NewPoultryFormSubmitButton'

export interface NewPoultryFormProps {
  onSubmit: (poultry: Partial<IPoultry>) => void;
}

export default function NewPoultryForm({ onSubmit }: NewPoultryFormProps) {
  const { t } = useTranslation()

  return (
    <StyledForm onSubmit={preventDefaultHandler}>
      <StyledFormField>
        <NewPoultryFormType />
      </StyledFormField>
      <StyledFormField>
        <NewPoultryFormBirthDate />
      </StyledFormField>
      <StyledSubtitle>{t('poultry.fields.colors')}</StyledSubtitle>
      <NewPoultryFormColors />
      <StyledSubtitle>{t('poultry.fields.videos')}</StyledSubtitle>
      <NewPoultryFormVideos />
      <StyledFormField>
        <NewPoultryFormSubmitButton onSubmit={onSubmit} />
      </StyledFormField>
    </StyledForm>
  )
}
