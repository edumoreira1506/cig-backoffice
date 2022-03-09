import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from '@cig-platform/ui'

import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectAvailableGenderCategories, selectGenderCategory } from 'contexts/PoultryContext/poultrySelectors'
import { setGenderCategory } from 'contexts/PoultryContext/poultryActions'

export interface PoultryFormGenderCategoryProps {
  disabled?: boolean;
}

export default function PoultryFormGenderCategory({ disabled = false }: PoultryFormGenderCategoryProps) {
  const { t } = useTranslation()

  const dispatch = usePoultryDispatch()

  const genderCategory = usePoultrySelector(selectGenderCategory)
  const availableGenderCategories = usePoultrySelector(selectAvailableGenderCategories)

  const handleChangeGenderCategory = useCallback((newGenderCategory: string | number) => {
    dispatch(setGenderCategory(String(newGenderCategory)))
  }, [dispatch])

  const options = useMemo(() => availableGenderCategories.map(genderCategory => ({
    value: genderCategory,
    label: genderCategory
  })), [availableGenderCategories])

  return (
    <Select
      options={options}
      label={t('poultry.fields.gender-category')}
      value={genderCategory}
      onChange={handleChangeGenderCategory}
      showEmptyOption
      disabled={disabled}
      name="poultry-gender-category"
      emptyOptionText={t('common.select-the-gender-category')}
    />
  )
}
