import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router'

import { Routes } from 'constants/routes'
import { success } from 'utils/alert'
import useEditPoultry from 'hooks/useEditPoultry'
import PoultryForm from 'components/PoultryForm/PoultryForm'
import { useAppDispatch } from 'contexts/AppContext/AppContext'
import { setIsLoading } from 'contexts/EditBreederContext/editBreederActions'
import { setError } from 'contexts/AppContext/appActions'
import BackofficeBffService from 'services/BackofficeBffService'
import useBreeder from 'hooks/useBreeder'
import useAuth from 'hooks/useAuth'
import { usePoultryDispatch } from 'contexts/PoultryContext/PoultryContext'
import { setBirthDate, setColor, setType, setVideo } from 'contexts/PoultryContext/poultryActions'

export default function EditPoultryContainer() {
  const { t } = useTranslation()

  const appDispatch = useAppDispatch()

  const poultryDispatch = usePoultryDispatch()

  const history = useHistory()

  const { token } = useAuth()

  const breeder = useBreeder()

  const { poultryId } = useParams<{ poultryId: string }>()

  const handleSuccess = useCallback(() => {
    success(t('common.saved'), t, () => history.push(Routes.ListPoultries))
  }, [t, history])

  const editPoultry = useEditPoultry({ onSuccess: handleSuccess, poultryId })

  useEffect(() => {
    if (!breeder || !poultryId) return

    (async () => {
      try {
        appDispatch(setIsLoading(true))

        const poultry = await BackofficeBffService.getPoultry(breeder.id, poultryId, token)

        poultryDispatch(setType(poultry.type))
        poultryDispatch(setBirthDate(poultry.birthDate?.toString() ?? ''))

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
      } catch(error) {
        appDispatch(setError(error))
      } finally {
        appDispatch(setIsLoading(false))
      }
    })()
  }, [appDispatch, breeder, poultryId, token, poultryDispatch])

  return (
    <PoultryForm onSubmit={editPoultry} />
  )
}