import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from '@cig-platform/ui'
import { PoultryCrestEnum } from '@cig-platform/enums'

import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectCrest } from 'contexts/PoultryContext/poultrySelectors'
import { setCrest } from 'contexts/PoultryContext/poultryActions'

const availableCrests = [
  {
    value: PoultryCrestEnum.Ball,
    label: 'Bola'
  },
  {
    value: PoultryCrestEnum.Pea,
    label: 'Ervilha'
  }
]

export interface PoultryFormCrestProps {
  disabled?: boolean;
}

export default function PoultryFormCrest({ disabled = false }: PoultryFormCrestProps) {
  const { t } = useTranslation()

  const dispatch = usePoultryDispatch()

  const crest = usePoultrySelector(selectCrest)

  const handleChangeCrest = useCallback((newCrest: string | number) => {
    dispatch(setCrest(String(newCrest)))
  }, [dispatch])

  return (
    <Select
      options={availableCrests}
      label={t('poultry.fields.crest')}
      value={crest}
      onChange={handleChangeCrest}
      showEmptyOption
      disabled={disabled}
      name="poultry-crest"
      emptyOptionText={t('common.select-the-crest')}
    />
  )
}
