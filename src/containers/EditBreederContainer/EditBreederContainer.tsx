import React, { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'
import { IBreeder } from '@cig-platform/types'

import EditBreederForm from '../../components/EditBreederForm/EditBreederForm'
import { useEditBreederDispatch, useEditBreederSelector } from '../../contexts/EditBreederContext/EditBreederContext'
import { setDescription, setFoundationDate, setName, setAddressField, setId } from '../../contexts/EditBreederContext/editBreederActions'
import useEditBreeder from '../../hooks/useEditBreeder'
import { success, error as showError } from '../../utils/alert'
import { Routes } from '../../constants/routes'
import { useBreederDispatch, useBreederSelector } from '../../contexts/BreederContext/BreederContext'
import { selectBreeders } from '../../contexts/BreederContext/breederSelectors'
import { setBreeders } from '../../contexts/BreederContext/breederActions'
import { selectError, selectId } from '../../contexts/EditBreederContext/editBreederSelectors'

export interface EditBreederContainerProps {
  breeder: IBreeder;
}

export default function EditBreederContainer({ breeder }: EditBreederContainerProps) {
  const breeders = useBreederSelector(selectBreeders)

  const error = useEditBreederSelector(selectError)
  const breederId = useEditBreederSelector(selectId)

  const breederDispatch = useBreederDispatch()

  const history = useHistory()

  const { t } = useTranslation()

  const handleSuccess = useCallback((breeder: Partial<IBreeder>) => {
    const newBreeders = breeders.map((b) => b.id === breederId ? ({ ...breeder, id: breederId }) : b) as any

    breederDispatch(setBreeders(newBreeders))

    success(t('common.updated'), t, () => history.push(Routes.Home))
  }, [t, history, breeders, breederDispatch, breederId])

  const editBreeder = useEditBreeder({ onSuccess: handleSuccess })

  const dispatch = useEditBreederDispatch()

  useEffect(() => {
    dispatch(setName(breeder.name))
    dispatch(setFoundationDate(breeder?.foundationDate?.toString() ?? ''))
    dispatch(setDescription(breeder?.description ?? ''))
    dispatch(setAddressField('city', breeder?.address?.city ?? ''))
    dispatch(setAddressField('number', breeder?.address?.number ?? ''))
    dispatch(setAddressField('province', breeder?.address?.province ?? ''))
    dispatch(setAddressField('zipcode', breeder?.address?.zipcode ?? ''))
    dispatch(setAddressField('street', breeder?.address?.street ?? ''))
    dispatch(setId(breeder.id))
  }, [breeder])

  useEffect(() => {
    if (error) {
      showError(error?.message ?? t('common.something-wrong'), t)
    }
  }, [error])

  return (
    <EditBreederForm onSubmit={editBreeder} />
  )
}