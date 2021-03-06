import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { DatePicker } from '@cig-platform/ui'

import { useEditBreederDispatch, useEditBreederSelector } from '../../contexts/EditBreederContext/EditBreederContext'
import { selectFoundationDate } from '../../contexts/EditBreederContext/editBreederSelectors'
import { setFoundationDate } from '../../contexts/EditBreederContext/editBreederActions'

export default function EditBreederFormFoundationDate() {
  const { t } = useTranslation()

  const foundationDate = useEditBreederSelector(selectFoundationDate)

  const dispatch = useEditBreederDispatch()

  const handleChangeFoundationDate = useCallback((newFoundationDate: Date) => {
    dispatch(setFoundationDate(newFoundationDate?.toISOString?.()?.split?.('T')?.[0]))
  }, [dispatch])

  return (
    <DatePicker
      label={t('breeder.fields.foundation-date')}
      value={foundationDate ? new Date(foundationDate) : undefined as any}
      onChange={handleChangeFoundationDate as any}
    />
  )
}
