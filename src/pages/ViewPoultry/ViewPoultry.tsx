import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Button, Modal, Autocomplete } from '@cig-platform/ui'
import {
  IAdvertising,
  IBreeder,
  IPoultry,
  IPoultryImage,
  IPoultryRegister,
} from '@cig-platform/types'
import { useDebouncedEffect } from '@cig-platform/hooks'

import BackofficeBffService from 'services/BackofficeBffService'
import ContentSearchService from 'services/ContentSearchService'
import useBreeder from 'hooks/useBreeder'
import useAuth from 'hooks/useAuth'
import MicroFrontend from 'components/MicroFrontend/MicroFrontend'
import { POULTRY_PAGE_URL } from 'constants/url'
import { Routes } from 'constants/routes'
import { success, withInput, info } from 'utils/alert'
import useSavePoultryAdvertising from 'hooks/useSavePoultryAdvertising'
import useRemovePoultryAdvertising from 'hooks/useRemovePoultryAdvertising'

import {
  StyledContainer,
  StyledButton,
  StyledButtons,
  StyledTransferButton,
  StyledAutocomplete
} from './ViewPoultry.styles'
import useTransferPoultry from 'hooks/useTransferPoultry'

export default function ViewPoultry() {
  const [poultry, setPoultry] = useState<undefined | IPoultry & { images: IPoultryImage[]; registers: IPoultryRegister[]; }>()
  const [advertising, setAdvertising] = useState<undefined | IAdvertising>()
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingBreeders, setIsLoadingBreeders] = useState(false)
  const [showTrasnferModal, setShowTransferModal] = useState(false)
  const [searchedBreeder, setSearchedBreeder] = useState('')
  const [breeders, setBreeders] = useState<IBreeder[]>([])

  const { t } = useTranslation()

  const history = useHistory()

  const { poultryId } = useParams<{ poultryId: string }>()

  const breeder = useBreeder()

  const breederNames = useMemo(() => breeders.map(breeder => breeder.name), [breeders])

  const selectedBreeder = useMemo(() => breeders.find(breeder => breeder.name === searchedBreeder), [
    searchedBreeder,
    breeders
  ])

  const { token } = useAuth()

  const handleSaveSuccess = useCallback(() => {
    success(t('action-success'), t, () => window.location.reload())
  }, [t])

  const handleTransferPoultrySuccess = useCallback(() => {
    success(t('action-success'), t, () => history.push(Routes.ListPoultries))
  }, [t, history])

  const saveAdvertising = useSavePoultryAdvertising({ poultryId: poultry?.id ?? '', onSuccess: handleSaveSuccess })

  const removeAdvertising = useRemovePoultryAdvertising({
    poultryId,
    advertisingId: advertising?.id ?? '',
    onSuccess: handleSaveSuccess,
  })

  const transferPoultry = useTransferPoultry({
    onSuccess: handleTransferPoultrySuccess,
    poultryId: poultryId
  })

  useEffect(() => {
    if (!poultryId || !breeder) return

    setIsLoading(true);
   
    (async () => {
      const { poultry: poultryData, advertisings } = await BackofficeBffService.getPoultry(breeder.id, poultryId, token)

      setPoultry({
        ...poultryData,
        birthDate: new Date(poultryData.birthDate),
        registers: poultryData.registers.map((register) => ({
          ...register,
          date: new Date(register.date),
        }))
      })

      setAdvertising(advertisings?.[0])
      setIsLoading(false)
    })()
  }, [poultryId, token, breeder])

  useDebouncedEffect(() => {
    (async () => {
      if (!breeder || !searchedBreeder) {
        setBreeders([])

        return
      }

      try {
        setIsLoadingBreeders(true)

        const breedersData = await ContentSearchService.getBreeders(searchedBreeder)
        const filteredBreeders = breedersData?.breeders.filter((b) => b.id !== breeder.id)

        setBreeders(filteredBreeders)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoadingBreeders(false)
      }
    })()
  }, 1500, [searchedBreeder, breeder])

  const handleNavigateToNewRegisterPage = useCallback(() =>
    history.push(Routes.NewRegister.replaceAll(':poultryId', poultryId))
  , [history, poultryId])

  const handleNavigateToEditPage = useCallback(() =>
    history.push(Routes.EditPoultry.replaceAll(':poultryId', poultryId))
  , [history, poultryId])

  const handleAnnouncePoultry = useCallback(() => {
    withInput(t('create-poultry-advertising'), t, (a) => {
      const price = Number(a.replace(/[^0-9]/g,''))

      saveAdvertising({ price })
    })

    document.querySelector('.swal2-input')?.addEventListener('keyup', () => {
      const inputElement = document.querySelector('.swal2-input') as HTMLInputElement

      if (!inputElement) return

      const typed = inputElement.value
      const numbers = typed.replace(/[^0-9]/g,'')

      if (typed.includes('R')) {
        inputElement.value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(numbers) / 100)
      } else {
        inputElement.value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(numbers))
      }
    })
  }, [t, saveAdvertising])

  const handleRemoveAdvertising = useCallback(() => {
    info(t('remove-poultry-advertising'), t, removeAdvertising)
  }, [t, removeAdvertising])

  const hasAdvertising = Boolean(advertising)

  const handleClickAdvertisingButton = useCallback(() =>
    hasAdvertising ? handleRemoveAdvertising() : handleAnnouncePoultry(),
  [hasAdvertising, handleRemoveAdvertising, handleAnnouncePoultry]
  )

  const handleTransferPoultry = useCallback(() => {
    if (!selectedBreeder) return

    transferPoultry(selectedBreeder.id)
  }, [selectedBreeder, transferPoultry])

  const handleShowTransferModal = useCallback(() => setShowTransferModal(true), [])
  const handleCloseTransferModal = useCallback(() => setShowTransferModal(false), [])

  if (!poultry) return null

  return (
    <StyledContainer>
      <Modal isOpen={showTrasnferModal} onClose={handleCloseTransferModal}>
        <StyledAutocomplete>
          <Autocomplete
            onChange={setSearchedBreeder}
            items={breederNames} 
            inputProps={{
              placeholder: t('search-breeder'),
              isLoading: isLoadingBreeders
            }}
          />
        </StyledAutocomplete>
        <StyledTransferButton>
          <Button onClick={handleTransferPoultry} disabled={!selectedBreeder}>
            {t('confirm-transfer')}
          </Button>
        </StyledTransferButton>
      </Modal>
      <StyledButtons>
        <StyledButton>
          <Button onClick={handleNavigateToNewRegisterPage}>
            {t('new-register')}
          </Button>
        </StyledButton>
        <StyledButton>
          <Button onClick={handleNavigateToEditPage}>
            {t('edit-poultry')}
          </Button>
        </StyledButton>
        <StyledButton>
          <Button onClick={handleClickAdvertisingButton}>
            {t(hasAdvertising ? 'remove-poultry' : 'announce-poultry')}
          </Button>
        </StyledButton>
        <StyledButton>
          <Button onClick={handleShowTransferModal}>
            {t('transfer-poultry')}
          </Button>
        </StyledButton>
      </StyledButtons>
      {!isLoading && (
        <div id="poultry-preview">
          <MicroFrontend
            name="PoultryPage"
            host={POULTRY_PAGE_URL}
            containerId="poultry-preview"
            poultry={poultry}
            images={poultry.images}
            registers={poultry.registers}
            advertising={advertising}
          />
        </div>
      )}
    </StyledContainer>
  )
}
