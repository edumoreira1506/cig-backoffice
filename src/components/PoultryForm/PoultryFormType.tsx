import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from '@cig-platform/ui'
import { PoultryTypeEnum } from '@cig-platform/enums'

import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectType } from 'contexts/PoultryContext/poultrySelectors'
import { setType } from 'contexts/PoultryContext/poultryActions'

export interface PoultryFormTypeProps {
  disabled?: boolean;
}

const availableTypes = [
  {
    value: PoultryTypeEnum.IndioGigante,
    label: 'Indio Gigante'
  }
]

export default function PoultryFormType({ disabled = false }: PoultryFormTypeProps) {
  const { t } = useTranslation()

  const dispatch = usePoultryDispatch()

  const type = usePoultrySelector(selectType)

  const handleChangeType = useCallback((newType: string | number) => {
    dispatch(setType(String(newType)))
  }, [dispatch])

  return (
    <Select
      options={availableTypes}
      label={t('poultry.fields.type')}
      value={type}
      onChange={handleChangeType}
      showEmptyOption
      disabled={disabled}
      name="poultry-type"
      emptyOptionText={t('common.select-the-type')}
    />
  )
}
