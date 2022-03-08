import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import PoultryForm from 'components/PoultryForm/PoultryForm'
import useSavePoultry from 'hooks/useSavePoultry'
import { success } from 'utils/alert'
import { Routes } from 'constants/routes'

export default function NewPoultryContainer() {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const handleSuccess = useCallback(() => {
    success(t('common.saved'), t, () => navigate(Routes.ListPoultries))
  }, [t, navigate])

  const savePoultry = useSavePoultry({ onSuccess: handleSuccess })

  return (
    <PoultryForm onSubmit={savePoultry} showMeasurementAndWeight />
  )
}
