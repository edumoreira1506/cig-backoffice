import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from '@cig-platform/ui'

import { PoultryDewlaps } from 'constants/poultry'
import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectDewlap } from 'contexts/PoultryContext/poultrySelectors'
import { setDewlap } from 'contexts/PoultryContext/poultryActions'

const availableDewlaps = [
  {
    value: PoultryDewlaps.DOUBLE,
    label: 'Dupla'
  },
  {
    value: PoultryDewlaps.EMPTY,
    label: 'Ausência total'
  },
  {
    value: PoultryDewlaps.SINGLE,
    label: 'Única (Barbela de Boi)'
  }
]

export interface PoultryFormDewlapProps {
  disabled?: boolean;
}

export default function PoultryFormDewlap({ disabled = false }: PoultryFormDewlapProps) {
  const { t } = useTranslation()

  const dispatch = usePoultryDispatch()

  const dewlap = usePoultrySelector(selectDewlap)

  const handleChangeDewlap = useCallback((newDewlap: string | number) => {
    dispatch(setDewlap(String(newDewlap)))
  }, [dispatch])

  return (
    <Select
      options={availableDewlaps}
      label={t('poultry.fields.dewlap')}
      value={dewlap}
      onChange={handleChangeDewlap}
      showEmptyOption
      disabled={disabled}
      emptyOptionText={t('common.select-the-dewlap')}
    />
  )
}
