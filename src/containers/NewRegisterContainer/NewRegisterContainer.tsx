import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Tabs } from '@cig-platform/ui'

import { useRegisterDispatch, useRegisterSelector } from 'contexts/RegisterContext/RegisterContext'
import { setType } from 'contexts/RegisterContext/registerActions'
import RegisterImageForm from 'components/RegisterImageForm/RegisterImageForm'

import { StyledButton } from './NewRegisterContainer.styles'
import useSaveRegister from 'hooks/useSaveRegister'
import { selectType, selectDescription, selectFiles } from 'contexts/RegisterContext/registerSelectors'

const registerTypes = ['IMAGENS', 'MEDIÇÃO', 'PESAGEM', 'VACINAÇÃO']

export default function NewRegisterContainer() {
  const { t } = useTranslation()

  const type = useRegisterSelector(selectType)
  const description = useRegisterSelector(selectDescription)
  const files = useRegisterSelector(selectFiles)

  const dispatch = useRegisterDispatch()

  const handleChangeType = useCallback((newTypeIndex: number) => {
    dispatch(setType(registerTypes[newTypeIndex]))
  }, [dispatch])

  const saveRegister = useSaveRegister({ onSuccess: () => alert('deu bão!') })

  const handleSave = useCallback(() => {
    saveRegister({ description, type }, files.map(file => file.file))
  }, [saveRegister, type, description, files])

  return (
    <>
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
      <StyledButton>
        <Button onClick={handleSave}>
          {t('common.save')}
        </Button>
      </StyledButton>
    </>
  )
}
