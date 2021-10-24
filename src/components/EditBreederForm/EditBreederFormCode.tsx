import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '@cig-platform/ui'

import { useEditBreederDispatch, useEditBreederSelector } from '../../contexts/EditBreederContext/EditBreederContext'
import { selectCode } from '../../contexts/EditBreederContext/editBreederSelectors'
import { setCode } from '../../contexts/EditBreederContext/editBreederActions'

export default function EditBreederFormCode() {
  const { t } = useTranslation()

  const code = useEditBreederSelector(selectCode)

  const dispatch = useEditBreederDispatch()

  const handleChangeCode = useCallback((newCode: string | number) => {
    dispatch(setCode(String(newCode)))
  }, [dispatch])

  return (
    <Input
      label={t('breeder.fields.code')}
      value={code}
      onChange={handleChangeCode}
      disabled
      helpMessage={t('breeder.fields.code.help-text')}
    />
  )
}
