import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from '@cig-platform/ui'
import { PoultryGenderEnum } from '@cig-platform/enums'

import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectGender } from 'contexts/PoultryContext/poultrySelectors'
import { setGender } from 'contexts/PoultryContext/poultryActions'

const availableGenders = [
  {
    value: PoultryGenderEnum.Male,
    label: 'Macho'
  },
  {
    value: PoultryGenderEnum.Female,
    label: 'Fêmea'
  },
]

export interface PoultryFormGenderProps {
  disabled?: boolean;
}

export default function PoultryFormGender({ disabled = false }: PoultryFormGenderProps) {
  const { t } = useTranslation()

  const dispatch = usePoultryDispatch()

  const gender = usePoultrySelector(selectGender)

  const handleChangeGender = useCallback((newType: string | number) => {
    dispatch(setGender(String(newType)))
  }, [dispatch])

  return (
    <Select
      options={availableGenders}
      label={t('poultry.fields.gender')}
      value={gender}
      onChange={handleChangeGender}
      showEmptyOption
      disabled={disabled}
      name="poultry-gender"
      emptyOptionText={t('common.select-the-gender')}
    />
  )
}
