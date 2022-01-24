import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { IPoultry } from '@cig-platform/types'
import { PoultryGenderCategoryEnum, PoultryGenderEnum } from '@cig-platform/enums'

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
import PoultryFormGenderCategory from './PoultryFormGenderCategory'
import PoultryFormName from './PoultryFormName'
import PoultryFormRegister from './PoultryFormRegister'
import PoultryFormCrest from './PoultryFormCrest'
import PoultryFormDewlap from './PoultryFormDewlap'
import PoultryFormTail from './PoultryFormTail'
import PoultryFormDescription from './PoultryFormDescription'
import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectGender } from 'contexts/PoultryContext/poultrySelectors'
import { setAvailableGenderCategories } from 'contexts/PoultryContext/poultryActions'

export interface PoultryFormProps {
  onSubmit: (poultry: Partial<IPoultry> & { images: PoultryState['images'] }) => void;
  disabledFields?: (keyof IPoultry)[]
}

export default function PoultryForm({ onSubmit, disabledFields }: PoultryFormProps) {
  const { t } = useTranslation()

  const gender = usePoultrySelector(selectGender)

  const dispatch = usePoultryDispatch()

  useEffect(() => {
    if (gender === PoultryGenderEnum.Female) {
      dispatch(setAvailableGenderCategories([PoultryGenderCategoryEnum.FemaleChicken, PoultryGenderCategoryEnum.Matrix]))
    }

    if (gender === PoultryGenderEnum.Male) {
      dispatch(setAvailableGenderCategories([PoultryGenderCategoryEnum.MaleChicken, PoultryGenderCategoryEnum.Reproductive]))
    }
  }, [gender, dispatch])

  return (
    <StyledForm onSubmit={preventDefaultHandler}>
      <StyledFormField>
        <PoultryFormType disabled={disabledFields?.includes('type')} />
      </StyledFormField>
      <StyledFormField>
        <PoultryFormGender disabled={disabledFields?.includes('gender')} />
      </StyledFormField>
      <StyledFormField>
        <PoultryFormGenderCategory />
      </StyledFormField>
      <StyledFormField>
        <PoultryFormCrest />
      </StyledFormField>
      <StyledFormField>
        <PoultryFormDewlap />
      </StyledFormField>
      <StyledFormField>
        <PoultryFormTail />
      </StyledFormField>
      <StyledFormField>
        <PoultryFormName />
      </StyledFormField>
      <StyledFormField>
        <PoultryFormDescription />
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
