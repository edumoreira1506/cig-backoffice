import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from '@cig-platform/ui'
import { PoultryTailEnum } from '@cig-platform/enums'

import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectTail } from 'contexts/PoultryContext/poultrySelectors'
import { setTail } from 'contexts/PoultryContext/poultryActions'

const availableTails = [
  {
    value: PoultryTailEnum.HIGH,
    label: 'Alto'
  },
  {
    value: PoultryTailEnum.MEDIUM,
    label: 'Médio'
  },
  {
    value: PoultryTailEnum.LOW,
    label: 'Baixo'
  }
]

export interface PoultryFormTailProps {
  disabled?: boolean;
}

export default function PoultryFormTail({ disabled = false }: PoultryFormTailProps) {
  const { t } = useTranslation()

  const dispatch = usePoultryDispatch()

  const tail = usePoultrySelector(selectTail)

  const handleChangeTail = useCallback((newTail: string | number) => {
    dispatch(setTail(String(newTail)))
  }, [dispatch])

  return (
    <Select
      options={availableTails}
      label={t('poultry.fields.tail')}
      value={tail}
      onChange={handleChangeTail}
      showEmptyOption
      disabled={disabled}
      emptyOptionText={t('common.select-the-tail')}
    />
  )
}
