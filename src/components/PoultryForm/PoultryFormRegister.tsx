import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '@cig-platform/ui'

import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectRegister } from 'contexts/PoultryContext/poultrySelectors'
import { setRegister } from 'contexts/PoultryContext/poultryActions'

export default function PoultryFormRegister() {
  const { t } = useTranslation()

  const register = usePoultrySelector(selectRegister)

  const dispatch = usePoultryDispatch()

  const handleChangeRegister = useCallback((newRegister: string | number) => {
    dispatch(setRegister(String(newRegister)))
  }, [dispatch])
  
  return (
    <Input
      type="text"
      label={t('poultry.fields.register')}
      value={register}
      onChange={handleChangeRegister}
      helpMessage={t('poultry.fields.register.help-text')}
    />
  )
}
