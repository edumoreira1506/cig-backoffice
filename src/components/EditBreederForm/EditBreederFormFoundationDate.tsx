import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '@cig-platform/ui'

import { useEditBreederDispatch, useEditBreederSelector } from '../../contexts/EditBreederContext/EditBreederContext'
import { selectFoundationDate } from '../../contexts/EditBreederContext/editBreederSelectors'
import { setFoundationDate } from '../../contexts/EditBreederContext/editBreederActions'

export default function EditBreederFormFoundationDate() {
  const { t } = useTranslation()

  const foundationDate = useEditBreederSelector(selectFoundationDate)

  const dispatch = useEditBreederDispatch()

  const handleChangeFoundationDate = useCallback((newFoundationDate: string | number) => {
    dispatch(setFoundationDate(String(newFoundationDate)))
  }, [dispatch])

  return (
    <Input type="date" label={t('breeder.fields.foundation-date')} value={foundationDate} onChange={handleChangeFoundationDate} />
  )
}
