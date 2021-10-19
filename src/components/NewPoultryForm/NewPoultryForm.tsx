import React from 'react'
import { useTranslation } from 'react-i18next'

import { StyledForm, StyledFormField, StyledSubtitle } from './NewPoultryForm.styles'
import NewPoultryFormBirthDate from './NewPoultryFormBirthDate'
import NewPoultryFormColors from './NewPoultryFormColors'
import NewPoultryFormType from './NewPoultryFormType'
import NewPoultryFormVideos from './NewPoultryFormVideos'

export default function NewPoultryForm() {
  const { t } = useTranslation()

  return (
    <StyledForm>
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
    </StyledForm>
  )
}
