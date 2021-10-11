import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'
import { IBreeder } from '@cig-platform/types'
import { Button } from '@cig-platform/ui'

import EditBreederForm from '../../components/EditBreederForm/EditBreederForm'
import { useEditBreederDispatch, useEditBreederSelector } from '../../contexts/EditBreederContext/EditBreederContext'
import {
  setDescription,
  setFoundationDate,
  setName,
  setAddressField,
  setId,
  setProfileImage,
  setImages,
  setMainVideo,
} from '../../contexts/EditBreederContext/editBreederActions'
import useEditBreeder from '../../hooks/useEditBreeder'
import { success } from '../../utils/alert'
import { useBreederDispatch, useBreederSelector } from '../../contexts/BreederContext/BreederContext'
import { selectBreeders } from '../../contexts/BreederContext/breederSelectors'
import { setBreeders } from '../../contexts/BreederContext/breederActions'
import { selectId } from '../../contexts/EditBreederContext/editBreederSelectors'
import { PROFILE_IMAGE_PLACEHOLDER } from '../../constants/s3'
import BackofficeBffService from '../../services/BackofficeBffService'
import useAuth from '../../hooks/useAuth'
import Modal from '../../components/Modal/Modal'
import MicroFrontend from '../../components/MicroFrontend/MicroFrontend'

export interface EditBreederContainerProps {
  breeder: IBreeder;
}

export default function EditBreederContainer({ breeder }: EditBreederContainerProps) {
  const editedBreeder = useEditBreederSelector(state => state)

  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const breeders = useBreederSelector(selectBreeders)

  const breederId = useEditBreederSelector(selectId)

  const breederDispatch = useBreederDispatch()

  const history = useHistory()

  const { t } = useTranslation()

  const { token } = useAuth()

  const showPreview = useCallback(() => setIsPreviewOpen(true), [])
  const hidePreview = useCallback(() => setIsPreviewOpen(false), [])

  const handleSuccess = useCallback((breeder: Partial<IBreeder>) => {
    const newBreeders = breeders.map((b) => b.id === breederId ? ({ ...b, ...breeder, id: breederId }) : b) as any

    breederDispatch(setBreeders(newBreeders))

    success(t('common.updated'), t, () => window.location.reload())
  }, [t, history, breeders, breederDispatch, breederId])

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
      dispatch(setAddressField('longitude', breeder?.address?.longitude ?? 0))
      dispatch(setAddressField('latitude', breeder?.address?.latitude ?? 0))
      dispatch(setId(breeder.id))
      dispatch(setMainVideo(breeder?.mainVideo ?? ''))
  
      const profileImageUrl = breeder?.profileImageUrl || PROFILE_IMAGE_PLACEHOLDER

      dispatch(setProfileImage(new File([''], profileImageUrl)))
    })()
  }, [breeder])

  useEffect(() => {
    if (!token || !breederId) return

    (async  () => {
      try {
        const { breeder: { images } } = await BackofficeBffService.getBreeder(breederId, token)

        dispatch(setImages(images))
      } catch(error) {
        console.error('Error on EditBreederContainer::getBreeder')
        console.log(error)
      }
    })()
  }, [breederId, token])

  return (
    <>
      <EditBreederForm onSubmit={editBreeder} />
      <Button onClick={showPreview}>
        {t('breeder.preview')}
      </Button>
      <Modal isOpen={isPreviewOpen} onClose={hidePreview}>
        <div id="breeder-preview">
          <MicroFrontend
            name="BreederPage"
            host="https://cig-breeder-page.herokuapp.com"
            containerId="breeder-preview"
            breeder={{ ...editedBreeder, foundationDate: new Date(editedBreeder.foundationDate) }}
          />
        </div>
      </Modal>
    </>
  )
}
