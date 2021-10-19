import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router'

import { Routes } from 'constants/routes'
import { success } from 'utils/alert'
import useEditPoultry from 'hooks/useEditPoultry'
import PoultryForm from 'components/PoultryForm/PoultryForm'

export default function EditPoultryContainer() {
  const { t } = useTranslation()

  const history = useHistory()

  const { poultryId } = useParams<{ poultryId: string }>()

  const handleSuccess = useCallback(() => {
    success(t('common.saved'), t, () => history.push(Routes.ListPoultries))
  }, [t, history])

  const editPoultry = useEditPoultry({ onSuccess: handleSuccess, poultryId })

  return (
    <PoultryForm onSubmit={editPoultry} />
  )
}
