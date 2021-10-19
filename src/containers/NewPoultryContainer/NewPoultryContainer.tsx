import React, { useCallback } from 'react'

import NewPoultryForm from 'components/NewPoultryForm/NewPoultryForm'
import useSavePoultry from 'hooks/useSavePoultry'
import { success } from 'utils/alert'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { Routes } from 'constants/routes'

export default function NewPoultryContainer() {
  const { t } = useTranslation()

  const history = useHistory()

  const handleSuccess = useCallback(() => {
    success(t('common.saved'), t, () => history.push(Routes.ListPoultries))
  }, [t, history])

  const savePoultry = useSavePoultry({ onSuccess: handleSuccess })

  return (
    <NewPoultryForm onSubmit={savePoultry} />
  )
}
