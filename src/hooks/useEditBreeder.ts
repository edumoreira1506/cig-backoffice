import { useCallback } from 'react'

import BackofficeBffService from '../services/BackofficeBffService'
import { useEditBreederDispatch, useEditBreederSelector } from '../contexts/EditBreederContext/EditBreederContext'
import { setIsLoading } from '../contexts/EditBreederContext/editBreederActions'
import { setError } from '../contexts/AppContext/appActions'
import { selectId } from '../contexts/EditBreederContext/editBreederSelectors'
import useAuth from './useAuth'
import useRefreshToken from './useRefreshToken'
import { filterObject } from '../utils/object'
import { EditBreederFormProps } from 'components/EditBreederForm/EditBreederForm'
import { BreederWithFilesAndContacts } from '../@types/breeder'
import { useAppDispatch } from '../contexts/AppContext/AppContext'

export default function useEditBreeder({ onSuccess }: { onSuccess: EditBreederFormProps['onSubmit'] }) {
  const editBreederDispatch = useEditBreederDispatch()
  const appDispatch = useAppDispatch()

  const breederId = useEditBreederSelector(selectId)

  const { token } = useAuth()

  const refreshToken = useRefreshToken(token)

  const handleEditBreeder = useCallback(async (breeder: Partial<BreederWithFilesAndContacts>) => {
    editBreederDispatch(setIsLoading(true))
    appDispatch(setIsLoading(true))

    const removedContactIds = breeder?.contacts?.filter(contact => contact.isDeleted).map(contact => contact.id) ?? []
    const contacts = breeder?.contacts?.filter(contact => !contact.isDeleted)

    delete breeder['images']
    delete breeder['contacts']

    const filteredObject = filterObject(breeder)

    try {
      await BackofficeBffService.updateBreeder(
        breederId,
        token,
        { ...filteredObject, ...(filteredObject.address ? ({ address: JSON.stringify(filteredObject.address) }) : ({})) } as any,
        [],
        [],
        removedContactIds,
        contacts
      )

      refreshToken()
      onSuccess({ ...breeder, foundationDate: String(breeder.foundationDate?.toString() ?? '') })
    } catch (error) {
      appDispatch(setError(error))
    } finally {
      editBreederDispatch(setIsLoading(false))
      appDispatch(setIsLoading(false))
    }
  }, [token, onSuccess, breederId, editBreederDispatch, appDispatch, refreshToken])

  return handleEditBreeder
}
