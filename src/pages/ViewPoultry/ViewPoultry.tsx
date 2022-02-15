import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Button, Modal, Autocomplete, ListModal, Checkbox } from '@cig-platform/ui'
import { IAdvertising, IBreeder } from '@cig-platform/types'
import { useDebouncedEffect } from '@cig-platform/hooks'
import MicroFrontend from '@cig-platform/microfrontend-helper'

import BackofficeBffService from 'services/BackofficeBffService'
import ContentSearchService from 'services/ContentSearchService'
import useBreeder from 'hooks/useBreeder'
import useAuth from 'hooks/useAuth'
import { POULTRY_PAGE_URL } from 'constants/url'
import { Routes } from 'constants/routes'
import { success, withInput, info } from 'utils/alert'
import useSavePoultryAdvertising from 'hooks/useSavePoultryAdvertising'
import useRemovePoultryAdvertising from 'hooks/useRemovePoultryAdvertising'
import useTransferPoultry from 'hooks/useTransferPoultry'
import useEditPoultryAdvertising from 'hooks/useEditPoultryAdvertising'
import useAnswerAdvertisingQuestion from 'hooks/useAnswerAdvertisingQuestion'
import { createImageUrl } from 'utils/s3'

import {
  StyledContainer,
  StyledTransferButton,
  StyledAutocomplete,
  StyledTransferCheckbox
} from './ViewPoultry.styles'

export default function ViewPoultry() {
  const [advertising, setAdvertising] = useState<undefined | IAdvertising>()
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingBreeders, setIsLoadingBreeders] = useState(false)
  const [showTrasnferModal, setShowTransferModal] = useState(false)
  const [searchedBreeder, setSearchedBreeder] = useState('')
  const [breeders, setBreeders] = useState<IBreeder[]>([])
  const [isOpenModalConfig, setIsOpenModalConfig] = useState(false)
  const [isTransferAllowed, setIsTransferAllowed] = useState(false)

  const { t } = useTranslation()

  const history = useHistory()

  const { poultryId } = useParams<{ poultryId: string }>()

  const breeder = useBreeder()

  const breederOptions = useMemo(() => breeders.map(breeder => ({
    content: breeder.name,
    key: breeder.id,
    image: createImageUrl({ folder: 'breeders', subfolder: 'profile', fileName: breeder.profileImageUrl })
  })), [breeders])

  const selectedBreeder = useMemo(() => breeders.find(breeder => breeder.name === searchedBreeder), [
    searchedBreeder,
    breeders
  ])

  const { token } = useAuth()

  const toggleTransferAllowed = useCallback(() => setIsTransferAllowed(
    prevIsTransferAllowed => !prevIsTransferAllowed
  ), [])

  const handleCloseModalConfig = useCallback(() => setIsOpenModalConfig(false), [])
  const handleOpenModalConfig = useCallback(() => setIsOpenModalConfig(true), [])

  const handleSaveSuccess = useCallback(() => {
    success(t('action-success'), t, () => window.location.reload())
  }, [t])

  const handleTransferPoultrySuccess = useCallback(() => {
    success(t('action-success'), t, () => history.push(Routes.ListPoultries))
  }, [t, history])

  const saveAdvertising = useSavePoultryAdvertising({ poultryId, onSuccess: handleSaveSuccess })

  const saveAdvertisingQuestionAnswer = useAnswerAdvertisingQuestion({
    poultryId,
    onSuccess: handleSaveSuccess,
    advertisingId: String(advertising?.id ?? '')
  })

  const editAdvertising = useEditPoultryAdvertising({
    poultryId,
    onSuccess: handleSaveSuccess,
    advertisingId: String(advertising?.id ?? '')
  })

  const removeAdvertising = useRemovePoultryAdvertising({
    poultryId,
    advertisingId: advertising?.id ?? '',
    onSuccess: handleSaveSuccess,
  })

  const transferPoultry = useTransferPoultry({
    onSuccess: handleTransferPoultrySuccess,
    poultryId
  })

  useEffect(() => {
    if (!poultryId || !breeder) return

    setIsLoading(true);
   
    (async () => {
      const { advertisings } = await BackofficeBffService.getPoultry(breeder.id, poultryId, token)

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
      if (a) {
        const price = Number(a.replace(/[^0-9]/g,''))

        saveAdvertising({ price })
      }
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

    info(t('common.confirm-transfer-poultry'), t, () => transferPoultry(selectedBreeder.id))
  }, [selectedBreeder, transferPoultry])

  const handleEditPoultryAdvertising = useCallback(() => {
    withInput(t('edit-poultry-advertising'), t, (a) => {
      if (a) {
        const price = Number(a.replace(/[^0-9]/g,''))

        editAdvertising(price)
      }
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
  }, [editAdvertising, t])

  const handleShowTransferModal = useCallback(() => {
    setShowTransferModal(true)
    setIsOpenModalConfig(false)
  }, [])

  const handleCloseTransferModal = useCallback(() => setShowTransferModal(false), [])

  const callbacks = useMemo<Record<string, any>>(() => ({
    onEditAdvertising: handleEditPoultryAdvertising,
    onSeeConfig: handleOpenModalConfig,
    onAnswer: saveAdvertisingQuestionAnswer
  }), [
    handleEditPoultryAdvertising,
    handleOpenModalConfig,
    saveAdvertisingQuestionAnswer
  ])

  const configModalItems = useMemo(() => ([
    {
      onClick: handleNavigateToNewRegisterPage,
      label: t('new-register')
    },
    {
      onClick: handleNavigateToEditPage,
      label: t('edit-poultry')
    },
    {
      onClick: handleClickAdvertisingButton,
      label: t(hasAdvertising ? 'remove-poultry' : 'announce-poultry')
    },
    {
      onClick: handleShowTransferModal,
      label: t('transfer-poultry')
    }
  ]), [
    handleNavigateToNewRegisterPage,
    handleNavigateToEditPage,
    handleClickAdvertisingButton,
    handleShowTransferModal,
    hasAdvertising,
    t
  ])

  const microFrontendParams = useMemo(() => ({
    breederId: breeder?.id ?? '',
    poultryId
  }), [breeder?.id, poultryId])

  const autocompleteInputProps = useMemo(() => ({
    placeholder: t('search-breeder'),
    isLoading: isLoadingBreeders
  }), [isLoadingBreeders, t])

  return (
    <StyledContainer>
      <Modal isOpen={showTrasnferModal} onClose={handleCloseTransferModal}>
        <StyledAutocomplete>
          <Autocomplete
            onChange={setSearchedBreeder}
            items={breederOptions} 
            inputProps={autocompleteInputProps}
          />
        </StyledAutocomplete>

        <StyledTransferCheckbox>
          <Checkbox
            checked={isTransferAllowed}
            onToggle={toggleTransferAllowed}
            label={t('confirm-poultry-transfer')}
          />
        </StyledTransferCheckbox>

        <StyledTransferButton>
          <Button onClick={handleTransferPoultry} disabled={!selectedBreeder || !isTransferAllowed}>
            {t('confirm-transfer')}
          </Button>
        </StyledTransferButton>
      </Modal>

      <ListModal isOpen={isOpenModalConfig} onClose={handleCloseModalConfig} items={configModalItems} />

      {!isLoading && (
        <div id="poultry-preview">
          <MicroFrontend
            name="PoultryPage"
            host={POULTRY_PAGE_URL}
            containerId="poultry-preview"
            params={microFrontendParams}
            callbacks={callbacks}
          />
        </div>
      )}
    </StyledContainer>
  )
}
