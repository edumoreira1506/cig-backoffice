import React, { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'
import { PoultryGenderCategoryEnum } from '@cig-platform/enums'

import { Routes } from 'constants/routes'
import { success, info } from 'utils/alert'
import useEditPoultry from 'hooks/useEditPoultry'
import PoultryForm from 'components/PoultryForm/PoultryForm'
import { useAppDispatch } from 'contexts/AppContext/AppContext'
import { setIsLoading, setName } from 'contexts/EditBreederContext/editBreederActions'
import { setError } from 'contexts/AppContext/appActions'
import BackofficeBffService from 'services/BackofficeBffService'
import useBreeder from 'hooks/useBreeder'
import useAuth from 'hooks/useAuth'
import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import {
  setBirthDate,
  setColor,
  setCrest,
  setDewlap,
  setGender,
  setImages,
  setRegister,
  setTail,
  setType,
  setVideo,
  setDescription,
  setGenderCategory,
} from 'contexts/PoultryContext/poultryActions'
import { selectBirthDate, selectGenderCategory } from 'contexts/PoultryContext/poultrySelectors'
import { selectImages } from 'contexts/PoultryContext/poultrySelectors'
import useSavePoultryimages from 'hooks/useSavePoultryImages'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const MONTH = 30 * DAY

export default function EditPoultryContainer() {
  const { t } = useTranslation()

  const appDispatch = useAppDispatch()

  const poultryDispatch = usePoultryDispatch()

  const birthDate = usePoultrySelector(selectBirthDate)
  const genderCategory = usePoultrySelector(selectGenderCategory)
  const poultryImages = usePoultrySelector(selectImages)

  const navigate = useNavigate()

  const { token } = useAuth()

  const breeder = useBreeder()

  const { poultryId } = useParams<{ poultryId: string }>()

  const needsToSeeWarningAutoGenderCategoryChange = useMemo(() => {
    const now = new Date()
    const poultryTimeInMonths = Math.floor((now.getTime() - new Date(birthDate).getTime()) / MONTH)
    const isInAdultTarget = poultryTimeInMonths >= 11
    const isFemaleOrMaleChicken = PoultryGenderCategoryEnum.FemaleChicken === genderCategory || genderCategory === PoultryGenderCategoryEnum.MaleChicken

    return isFemaleOrMaleChicken && isInAdultTarget
  }, [birthDate, genderCategory])

  const handleSuccess = useCallback(() => {
    success(t('common.saved'), t, () => navigate(Routes.ViewPoultry.replaceAll(':poultryId', poultryId ?? '')))
  }, [t, navigate, poultryId])

  const editPoultry = useEditPoultry({ onSuccess: handleSuccess, poultryId: poultryId ?? '' })

  const saveImages = useSavePoultryimages({ onSuccess: () => null, poultryId: poultryId ?? '' })

  useEffect(() => {
    if (!poultryImages?.length || !breeder || !poultryId) return

    const allImagesIsPersisted = poultryImages.every(image => !image.isDeleted && !image.isNew)

    if (allImagesIsPersisted) return

    (async () => {
      await saveImages(poultryImages)

      const { poultry } = await BackofficeBffService.getPoultry(breeder.id, poultryId, token)

      setTimeout(() => {
        if (poultry?.images) {
          poultryDispatch(setImages(poultry.images))
        }
      }, 1000)
    })()
  }, [poultryImages])

  useEffect(() => {
    if (!breeder || !poultryId) return

    (async () => {
      try {
        appDispatch(setIsLoading(true))

        const { poultry } = await BackofficeBffService.getPoultry(breeder.id, poultryId, token)

        poultryDispatch(setType(poultry.type))
        poultryDispatch(setBirthDate(poultry.birthDate?.toString() ?? ''))
        poultryDispatch(setGenderCategory(poultry.genderCategory))

        if (poultry.description) {
          poultryDispatch(setDescription(poultry.description))
        }

        if (poultry.tail) {
          poultryDispatch(setTail(poultry.tail))
        }

        if (poultry.crest) {
          poultryDispatch(setCrest(poultry.crest))
        }

        if (poultry.dewlap) {
          poultryDispatch(setDewlap(poultry.dewlap))
        }

        if (poultry.register) {
          poultryDispatch(setRegister(poultry.register))
        }

        if (poultry.name) {
          poultryDispatch(setName(poultry.name))
        }

        if (poultry.colors?.eyes) {
          poultryDispatch(setColor(poultry.colors?.eyes ?? '', 'eyes'))
        }

        if (poultry.colors?.plumage) {
          poultryDispatch(setColor(poultry.colors?.plumage ?? '', 'plumage'))
        }

        if (poultry.colors?.shins) {
          poultryDispatch(setColor(poultry.colors?.shins ?? '', 'shins'))
        }

        if (poultry.videos?.presentation) {
          poultryDispatch(setVideo(poultry.videos?.presentation ?? '', 'presentation'))
        }

        if (poultry.videos?.walking) {
          poultryDispatch(setVideo(poultry.videos?.walking ?? '', 'walking'))
        }

        if (poultry.videos?.measurement) {
          poultryDispatch(setVideo(poultry.videos?.measurement ?? '', 'measurement'))
        }

        if (poultry.gender) {
          poultryDispatch(setGender(poultry.gender))
        }

        if (poultry?.images) {
          poultryDispatch(setImages(poultry.images))
        }
      } catch(error) {
        appDispatch(setError(error))
      } finally {
        appDispatch(setIsLoading(false))
      }
    })()
  }, [appDispatch, breeder, poultryId, token, poultryDispatch])

  useEffect(() => {
    if (needsToSeeWarningAutoGenderCategoryChange) {
      info(t('edit-gender-category'), t, () => {
        if (genderCategory === PoultryGenderCategoryEnum.FemaleChicken) {
          editPoultry({ genderCategory: PoultryGenderCategoryEnum.Matrix })
        } else if (genderCategory === PoultryGenderCategoryEnum.MaleChicken) {
          editPoultry({ genderCategory: PoultryGenderCategoryEnum.Reproductive })
        }
      })
    }
  }, [needsToSeeWarningAutoGenderCategoryChange, t, genderCategory, editPoultry])

  return (
    <PoultryForm onSubmit={editPoultry} disabledFields={['gender', 'type']} />
  )
}
