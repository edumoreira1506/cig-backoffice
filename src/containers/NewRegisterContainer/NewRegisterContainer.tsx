import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { Button, Tabs } from '@cig-platform/ui'

import { useRegisterDispatch, useRegisterSelector } from 'contexts/RegisterContext/RegisterContext'
import { setType } from 'contexts/RegisterContext/registerActions'
import RegisterImageForm from 'components/RegisterImageForm/RegisterImageForm'
import RegisterVaccinationForm from 'components/RegisterVaccinationForm/RegisterVaccinationForm'
import RegisterMeasurementAndWeighingForm from 'components/RegisterMeasurementAndWeighingForm/RegisterMeasurementAndWeighingForm'
import useSaveRegister from 'hooks/useSaveRegister'
import {
  selectType,
  selectDescription,
  selectFiles,
  selectVaccination,
  selectMeasurementAndWeighing,
} from 'contexts/RegisterContext/registerSelectors'
import { Routes } from 'constants/routes'
import { success } from 'utils/alert'

import { StyledButton } from './NewRegisterContainer.styles'

const registerTypes = ['IMAGENS', 'MEDIÇÃO E PESAGEM', 'VACINAÇÃO']

export default function NewRegisterContainer() {
  const { t } = useTranslation()

  const history = useHistory()

  const type = useRegisterSelector(selectType)
  const description = useRegisterSelector(selectDescription)
  const files = useRegisterSelector(selectFiles)
  const vaccination = useRegisterSelector(selectVaccination)
  const measurementAndWeighing = useRegisterSelector(selectMeasurementAndWeighing)

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
    case 'MEDIÇÃO E PESAGEM':
      saveRegister({
        description,
        type,
        date: new Date(measurementAndWeighing.date),
        metadata: { weight: measurementAndWeighing.weight, measurement: measurementAndWeighing.measurement }
      })
      break
    }
  }, [saveRegister, type, description, files, vaccination, measurementAndWeighing])

  return (
    <>
      <Tabs setTab={handleChangeType}>
        <RegisterImageForm title={t('register.fields.type.images')} />
        <RegisterMeasurementAndWeighingForm title={t('register.fields.type.measurement-and-weighing')} />
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
