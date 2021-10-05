import React, { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'
import { IBreeder } from '@cig-platform/types'

import EditBreederForm from '../../components/EditBreederForm/EditBreederForm'
import { useEditBreederDispatch, useEditBreederSelector } from '../../contexts/EditBreederContext/EditBreederContext'
import { setDescription, setFoundationDate, setName, setAddressField, setId, setProfileImage } from '../../contexts/EditBreederContext/editBreederActions'
import useEditBreeder from '../../hooks/useEditBreeder'
import { success } from '../../utils/alert'
import { Routes } from '../../constants/routes'
import { useBreederDispatch, useBreederSelector } from '../../contexts/BreederContext/BreederContext'
import { selectBreeders } from '../../contexts/BreederContext/breederSelectors'
import { setBreeders } from '../../contexts/BreederContext/breederActions'
import { selectId } from '../../contexts/EditBreederContext/editBreederSelectors'
import useAuth from '../../hooks/useAuth'
import useRefreshToken from '../../hooks/useRefreshToken'
import { PROFILE_IMAGE_PLACEHOLDER } from '../../constants/s3'

export interface EditBreederContainerProps {
  breeder: IBreeder;
}

export default function EditBreederContainer({ breeder }: EditBreederContainerProps) {
  const { token } = useAuth()

  const refreshToken = useRefreshToken(token)

  const breeders = useBreederSelector(selectBreeders)

  const breederId = useEditBreederSelector(selectId)

  const breederDispatch = useBreederDispatch()

  const history = useHistory()

  const { t } = useTranslation()

  const handleSuccess = useCallback((breeder: Partial<IBreeder>) => {
    const newBreeders = breeders.map((b) => b.id === breederId ? ({ ...breeder, id: breederId }) : b) as any

    breederDispatch(setBreeders(newBreeders))

    refreshToken()
    success(t('common.updated'), t, () => history.push(Routes.Home))
  }, [t, history, breeders, breederDispatch, breederId, refreshToken])

  const editBreeder = useEditBreeder({ onSuccess: handleSuccess })

  const dispatch = useEditBreederDispatch()

  useEffect(() => {
    (async () => {
      dispatch(setName(breeder.name))
      dispatch(setFoundationDate(breeder?.foundationDate?.toString() ?? ''))
      dispatch(setDescription(breeder?.description ?? ''))
      dispatch(setAddressField('city', breeder?.address?.city ?? ''))
      dispatch(setAddressField('number', breeder?.address?.number ?? ''))
      dispatch(setAddressField('province', breeder?.address?.province ?? ''))
      dispatch(setAddressField('zipcode', breeder?.address?.zipcode ?? ''))
      dispatch(setAddressField('street', breeder?.address?.street ?? ''))
      dispatch(setId(breeder.id))
  
      const profileImageUrl = breeder?.profileImageUrl || PROFILE_IMAGE_PLACEHOLDER

      dispatch(setProfileImage(new File([''], profileImageUrl)))
    })()
  }, [breeder])

  return (
    <EditBreederForm onSubmit={editBreeder} />
  )
}
