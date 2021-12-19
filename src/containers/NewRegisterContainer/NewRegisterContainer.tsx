import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { Button, Tabs } from '@cig-platform/ui'

import { useRegisterDispatch, useRegisterSelector } from 'contexts/RegisterContext/RegisterContext'
import { setType } from 'contexts/RegisterContext/registerActions'
import RegisterImageForm from 'components/RegisterImageForm/RegisterImageForm'
import RegisterVaccinationForm from 'components/RegisterVaccinationForm/RegisterVaccinationForm'
import useSaveRegister from 'hooks/useSaveRegister'
import { selectType, selectDescription, selectFiles, selectVaccination } from 'contexts/RegisterContext/registerSelectors'
import { Routes } from 'constants/routes'
import { success } from 'utils/alert'

import { StyledButton } from './NewRegisterContainer.styles'

const registerTypes = ['IMAGENS', 'MEDIÇÃO', 'PESAGEM', 'VACINAÇÃO']

export default function NewRegisterContainer() {
  const { t } = useTranslation()

  const history = useHistory()

  const type = useRegisterSelector(selectType)
  const description = useRegisterSelector(selectDescription)
  const files = useRegisterSelector(selectFiles)
  const vaccination = useRegisterSelector(selectVaccination)

  const dispatch = useRegisterDispatch()

  const handleChangeType = useCallback((newTypeIndex: number) => {
    dispatch(setType(registerTypes[newTypeIndex]))
  }, [dispatch])

  const handleSuccess = useCallback(() => {
    success(t('common.saved'), t, () => history.push(Routes.ListPoultries))
  }, [t, history])

  const saveRegister = useSaveRegister({ onSuccess: handleSuccess })

  const handleSave = useCallback(() => {
    switch (type) {
    case 'IMAGENS':
      saveRegister({ description, type }, files.map(file => file.file))
      break
    case 'VACINAÇÃO':
      saveRegister({
        description,
        type,
        date: new Date(vaccination.date),
        metadata: { dose: vaccination.dose, name: vaccination.name }
      })
      break
    }
  }, [saveRegister, type, description, files, vaccination])

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
        <RegisterVaccinationForm title={t('register.fields.type.vaccination')} />
      </Tabs>
      <StyledButton>
        <Button onClick={handleSave}>
          {t('common.save')}
        </Button>
      </StyledButton>
    </>
  )
}
