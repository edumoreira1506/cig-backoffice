import React from 'react'
import { useTranslation } from 'react-i18next'
import { IPoultry } from '@cig-platform/types'

import { preventDefaultHandler } from 'utils/dom'

import { StyledForm, StyledFormField, StyledSubtitle } from './PoultryForm.styles'
import PoultryFormBirthDate from './PoultryFormBirthDate'
import PoultryFormColors from './PoultryFormColors'
import PoultryFormType from './PoultryFormType'
import PoultryFormVideos from './PoultryFormVideos'
import PoultryFormSubmitButton from './PoultryFormSubmitButton'

export interface PoultryFormProps {
  onSubmit: (poultry: Partial<IPoultry>) => void;
}

export default function PoultryForm({ onSubmit }: PoultryFormProps) {
  const { t } = useTranslation()

  return (
    <StyledForm onSubmit={preventDefaultHandler}>
      <StyledFormField>
        <PoultryFormType />
      </StyledFormField>
      <StyledFormField>
        <PoultryFormBirthDate />
      </StyledFormField>
      <StyledSubtitle>{t('poultry.fields.colors')}</StyledSubtitle>
      <PoultryFormColors />
      <StyledSubtitle>{t('poultry.fields.videos')}</StyledSubtitle>
      <PoultryFormVideos />
      <StyledFormField>
        <PoultryFormSubmitButton onSubmit={onSubmit} />
      </StyledFormField>
    </StyledForm>
  )
}
