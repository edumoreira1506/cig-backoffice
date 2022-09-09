import { IPoultry } from '@cig-platform/types'
import { Autocomplete, Button, Modal, Tree } from '@cig-platform/ui'
import useBreeder from 'hooks/useBreeder'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import ContentSearchService from 'services/ContentSearchService'

import { useAppDispatch } from 'contexts/AppContext/AppContext'
import { setIsLoading } from 'contexts/AppContext/appActions'
import BackofficeBffService from 'services/BackofficeBffService'
import useAuth from 'hooks/useAuth'
import { StyledAutocomplete, StyledModalButton } from './ManagreTree.styles'
import { useDebouncedEffect } from '@cig-platform/hooks'
import { useTranslation } from 'react-i18next'

const ManageTreePage = () => {
  const { poultryId } = useParams<{ poultryId: string }>()

  const [parentModalContext, setParentModalContext] = useState<undefined | 'dadId' | 'momId'>()
  const [parentModalPoultryId, setParentModalPoultryId] = useState<string>()
  const [poultrySearchKeyword, setPoultrySearchKeyword] = useState<string>()
  const [searchedPoultries, setSearchedPoultries] = useState<IPoultry[]>([])

  const breeder = useBreeder()

  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const { token } = useAuth()

  const [poultries, setPoultries] = useState<IPoultry[]>([])

  const selectedPoultry = useMemo(() => searchedPoultries.find(breeder => breeder.name === poultrySearchKeyword), [
    searchedPoultries,
    poultrySearchKeyword
  ])

  useEffect(() => {
    if (!poultryId || !breeder?.id) return

    (async () => {
      dispatch(setIsLoading(true))

      try {
        const poultryData = await ContentSearchService.getPoultry(breeder.id, poultryId)
        const poultry = poultryData?.poultry
        const parents = []

        if (poultry?.mom) {
          parents.push(poultry.mom)
        }

        if (poultry?.dad) {
          parents.push(poultry.dad)
        }

        setPoultries([
          poultry,
          ...parents
        ])
      } catch (error) {
        console.log(error)
      } finally {
        dispatch(setIsLoading(false))
      }
    })()
  }, [poultryId, breeder?.id])

  useDebouncedEffect(() => {
    if (!poultrySearchKeyword) return

    (async () => {
      try {
        dispatch(setIsLoading(true))

        const { all } = await ContentSearchService.getBreederPoultries(
          breeder?.id,
          {},
          poultrySearchKeyword
        )

        setSearchedPoultries(all)
      } catch (error) {
        console.log(error)
      } finally {
        dispatch(setIsLoading(false))
      }
    })()
  }, 1000, [poultrySearchKeyword, dispatch, breeder?.id])

  const handleCloseParentModal = useCallback(() => {
    setParentModalContext(undefined)
    setParentModalPoultryId(undefined)
    setSearchedPoultries([])
    setPoultrySearchKeyword('')
  }, [])

  const handleClickExpandButton = useCallback(async (poultryId: string) => {
    dispatch(setIsLoading(true))

    try {
      const poultryData = await ContentSearchService.getPoultry(breeder?.id, poultryId)
      const poultry = poultryData?.poultry
      const parents: IPoultry[] = []

      if (poultry?.mom) {
        parents.push(poultry.mom)
      }

      if (poultry?.dad) {
        parents.push(poultry.dad)
      }

      setPoultries(prevPoultries => [
        ...prevPoultries,
        ...parents
      ])
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }, [breeder?.id, dispatch])

  const handleAddParent = useCallback(async ({ dadId, momId }: { dadId?: string; momId?: string }, poultryId: string) => {
    if (!breeder) return

    try {
      dispatch(setIsLoading(true))

      await BackofficeBffService.updatePoultry(breeder.id, poultryId, token, { dadId, momId })

      setPoultries(prevPoultries => prevPoultries.map(p => p.id === poultryId ? ({
        ...p,
        ...(dadId ? { dadId } : {}),
        ...(momId ? { momId } : {})
      }) : ({ ...p })))

      handleClickExpandButton(poultryId)
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }, [handleClickExpandButton, dispatch, breeder?.id, token])

  const handleAddDad = useCallback((poultryId: string) => {
    setParentModalContext('dadId')
    setParentModalPoultryId(poultryId)
  }, [])

  const handleAddMom = useCallback((poultryId: string) => {
    setParentModalContext('momId')
    setParentModalPoultryId(poultryId)
  }, [])

  const handleSaveParent = useCallback(async () => {
    if (!parentModalContext || !parentModalPoultryId) return

    await handleAddParent({
      [parentModalContext]: selectedPoultry?.id
    }, parentModalPoultryId)

    handleCloseParentModal()
  }, [handleCloseParentModal, parentModalContext, handleAddParent, parentModalPoultryId, selectedPoultry])

  const poultryOptions = useMemo(() => searchedPoultries.map(poultry => ({
    content: poultry.name,
    key: poultry.id,
  })), [searchedPoultries])

  const autocompleteInputProps = useMemo(() => ({
    placeholder: t('search-poultry'),
  }), [t])

  if (!poultries.length) return null

  return (
    <>
      <Tree
        poultries={poultries}
        onAddDad={handleAddDad}
        onAddMom={handleAddMom}
        onExpand={handleClickExpandButton}
        rootId={poultryId ?? ''}
      />

      <Modal onClose={handleCloseParentModal} isOpen={Boolean(parentModalContext)}>
        <StyledAutocomplete>
          <Autocomplete
            onChange={setPoultrySearchKeyword}
            items={poultryOptions} 
            inputProps={autocompleteInputProps}
          />
        </StyledAutocomplete>

        <StyledModalButton>
          <Button onClick={handleSaveParent}>
            Salvar
          </Button>
        </StyledModalButton>
      </Modal>
    </>
    
  )
}

export default ManageTreePage
