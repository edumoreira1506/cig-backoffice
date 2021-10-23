import React from 'react'
import { useTranslation } from 'react-i18next'
import { IPoultry } from '@cig-platform/types'

import { preventDefaultHandler } from 'utils/dom'
import { PoultryState } from 'contexts/PoultryContext/poultryReducer'

import { StyledForm, StyledFormField, StyledSubtitle } from './PoultryForm.styles'
import PoultryFormBirthDate from './PoultryFormBirthDate'
import PoultryFormColors from './PoultryFormColors'
import PoultryFormType from './PoultryFormType'
import PoultryFormVideos from './PoultryFormVideos'
import PoultryFormSubmitButton from './PoultryFormSubmitButton'
import PoultryFormImages from './PoultryFormImages'
import PoultryFormGender from './PoultryFormGender'
import PoultryFormName from './PoultryFormName'
import PoultryFormRegister from './PoultryFormRegister'
import PoultryFormCrest from './PoultryFormCrest'
import PoultryFormDewlap from './PoultryFormDewlap'

export interface PoultryFormProps {
  onSubmit: (poultry: Partial<IPoultry> & { images: PoultryState['images'] }) => void;
  disabledFields?: (keyof IPoultry)[]
}

export default function PoultryForm({ onSubmit, disabledFields }: PoultryFormProps) {
  const { t } = useTranslation()

  return (
    <StyledForm onSubmit={preventDefaultHandler}>
      <StyledFormField>
        <PoultryFormType disabled={disabledFields?.includes('type')} />
      </StyledFormField>
      <StyledFormField>
        <PoultryFormGender disabled={disabledFields?.includes('gender')} />
      </StyledFormField>
      <StyledFormField>
        <PoultryFormCrest />
      </StyledFormField>
      <StyledFormField>
        <PoultryFormDewlap />
      </StyledFormField>
      <StyledFormField>
        <PoultryFormName />
      </StyledFormField>
      <StyledFormField>
        <PoultryFormRegister />
      </StyledFormField>
      <StyledFormField>
        <PoultryFormBirthDate />
      </StyledFormField>
      <StyledSubtitle>{t('poultry.fields.colors')}</StyledSubtitle>
      <PoultryFormColors />
      <StyledSubtitle>{t('poultry.fields.videos')}</StyledSubtitle>
      <PoultryFormVideos />
      <StyledSubtitle>{t('poultry.fields.images')}</StyledSubtitle>
      <PoultryFormImages />
      <StyledFormField>
        <PoultryFormSubmitButton onSubmit={onSubmit} />
      </StyledFormField>
    </StyledForm>
  )
}
