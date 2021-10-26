import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Tabs } from '@cig-platform/ui'

import { useRegisterDispatch } from 'contexts/RegisterContext/RegisterContext'
import { setType } from 'contexts/RegisterContext/registerActions'
import RegisterImageForm from 'components/RegisterImageForm/RegisterImageForm'

const registerTypes = ['IMAGENS', 'MEDIÇÃO', 'PESAGEM', 'VACINAÇÃO']

export default function NewRegisterContainer() {
  const { t } = useTranslation()

  const dispatch = useRegisterDispatch()

  const handleChangeType = useCallback((newTypeIndex: number) => {
    dispatch(setType(registerTypes[newTypeIndex]))
  }, [dispatch])

  return (
    <Tabs setTab={handleChangeType}>
      <RegisterImageForm title={t('register.fields.type.images')} />
      <div title={t('register.fields.type.measurement')}>
        Medição
      </div>
      <div title={t('register.fields.type.weighing')}>
        Pesagem
      </div>
      <div title={t('register.fields.type.vaccination')}>
        Vacinação
      </div>
    </Tabs>
  )
}
