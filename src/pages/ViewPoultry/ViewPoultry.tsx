import React, { Fragment, ReactNode, useCallback, useMemo, useState, VFC } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Button, Modal, Autocomplete, ListModal, Checkbox } from '@cig-platform/ui'
import { IBreeder } from '@cig-platform/types'
import { useDebouncedEffect, useRefetch } from '@cig-platform/hooks'
import MicroFrontend from '@cig-platform/microfrontend-helper'

import ContentSearchService from 'services/ContentSearchService'
import useBreeder from 'hooks/useBreeder'
import { POULTRY_PAGE_URL } from 'constants/url'
import { Routes } from 'constants/routes'
import { success, withInput, info } from 'utils/alert'
import useSavePoultryAdvertising from 'hooks/useSavePoultryAdvertising'
import useRemovePoultryAdvertising from 'hooks/useRemovePoultryAdvertising'
import useTransferPoultry from 'hooks/useTransferPoultry'
import useEditPoultryAdvertising from 'hooks/useEditPoultryAdvertising'
import useAnswerAdvertisingQuestion from 'hooks/useAnswerAdvertisingQuestion'
import { createImageUrl } from 'utils/s3'
import useKillPoultry from 'hooks/useKillPoultry'

import {
  StyledContainer,
  StyledTransferButton,
  StyledAutocomplete,
  StyledTransferCheckbox,
  GlobalStyle
} from './ViewPoultry.styles'
import usePoultryAdvertising from 'hooks/usePoultryAdvertising'
import { Link } from 'react-router-dom'

type LinkComponentProps = {
  identifier: 'list-modal-link'
  params?: { label?: string };
  children?: ReactNode
}

export default function ViewPoultry() {
  const [isLoadingBreeders, setIsLoadingBreeders] = useState(false)
  const [showTrasnferModal, setShowTransferModal] = useState(false)
  const [searchedBreeder, setSearchedBreeder] = useState('')
  const [breeders, setBreeders] = useState<IBreeder[]>([])
  const [isOpenModalConfig, setIsOpenModalConfig] = useState(false)
  const [isTransferAllowed, setIsTransferAllowed] = useState(false)

  const { refetch: refetchMicroFrontendData, setRefetch: setRefetchMicroFrontendData } = useRefetch()

  const { t } = useTranslation()

  const navigate = useNavigate()

  const { poultryId } = useParams<{ poultryId: string }>()

  const { advertising, isLoading, refetch: refetchAdvertising } = usePoultryAdvertising(poultryId ?? '')

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

  const toggleTransferAllowed = useCallback(() => setIsTransferAllowed(
    prevIsTransferAllowed => !prevIsTransferAllowed
  ), [])

  const handleCloseModalConfig = useCallback(() => setIsOpenModalConfig(false), [])
  const handleOpenModalConfig = useCallback(() => setIsOpenModalConfig(true), [])

  const handleSaveSuccess = useCallback(() => {
    success(t('action-success'), t, () => {
      setRefetchMicroFrontendData(true)
      refetchAdvertising()
    })
  }, [t, refetchAdvertising])

  const handleTransferPoultrySuccess = useCallback(() => {
    success(t('action-success'), t, () => navigate(Routes.Home))
  }, [t, navigate])

  const killPoultry = useKillPoultry({ poultryId: poultryId ||  '', onSuccess: handleSaveSuccess })

  const saveAdvertising = useSavePoultryAdvertising({ poultryId: poultryId || '', onSuccess: handleSaveSuccess })

  const saveAdvertisingQuestionAnswer = useAnswerAdvertisingQuestion({
    poultryId: poultryId || '',
    onSuccess: handleSaveSuccess,
    advertisingId: String(advertising?.id ?? '')
  })

  const editAdvertising = useEditPoultryAdvertising({
    poultryId: poultryId || '',
    onSuccess: handleSaveSuccess,
    advertisingId: String(advertising?.id ?? '')
  })

  const removeAdvertising = useRemovePoultryAdvertising({
    poultryId: poultryId || '',
    advertisingId: advertising?.id ?? '',
    onSuccess: handleSaveSuccess,
  })

  const transferPoultry = useTransferPoultry({
    onSuccess: handleTransferPoultrySuccess,
    poultryId: poultryId || '',
  })

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

        setBreeders(filteredBreeders as any)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoadingBreeders(false)
      }
    })()
  }, 1500, [searchedBreeder, breeder])

  const handleAnnouncePoultry = useCallback(() => {
    withInput(t('create-poultry-advertising'), (a) => {
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
    withInput(t('edit-poultry-advertising'), (a) => {
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
      onClick: killPoultry,
      label: t('kill-poultry')
    },
    {
      label: t('new-register')
    },
    {
      label: t('edit-poultry')
    },
    {
      onClick: handleClickAdvertisingButton,
      label: t(hasAdvertising ? 'remove-poultry' : 'announce-poultry')
    },
    {
      onClick: handleShowTransferModal,
      label: t('transfer-poultry')
    },
    {
      label: t('poultry-tree')
    }
  ])
  , [
    handleClickAdvertisingButton,
    handleShowTransferModal,
    hasAdvertising,
    killPoultry,
    t
  ])

  const LinkComponent: VFC<LinkComponentProps> = ({
    children,
    params
  }) => {
    const label = params?.label ?? ''
    const needsOfLink = [
      t('new-register'),
      t('edit-poultry'),
      t('poultry-tree')
    ].includes(label)

    const Wrapper = needsOfLink ? Link : Fragment

    const link = (() => {
      const newRegisterPage = Routes.NewRegister.replaceAll(':poultryId', poultryId || '')
      const editPoultryPage = Routes.EditPoultry.replaceAll(':poultryId', poultryId || '')
      const managreTreePage = Routes.ManagePoultryTree.replaceAll(':poultryId', poultryId || '')


      if (label === t('new-register')) {
        return newRegisterPage
      }

      if (label === t('edit-poultry')) {
        return editPoultryPage
      }

      if (label === t('poultry-tree')) {
        return managreTreePage
      }

      return '/'
    })()

    return (
      <Wrapper to={link}>
        {children}
      </Wrapper>
    )
  }

  const microFrontendParams = useMemo(() => ({
    breederId: breeder?.id ?? '',
    poultryId: poultryId || '',
    refetch: refetchMicroFrontendData,
    linkComponent: Fragment
  }), [breeder?.id, poultryId, refetchMicroFrontendData])

  const autocompleteInputProps = useMemo(() => ({
    placeholder: t('search-breeder'),
    isLoading: isLoadingBreeders
  }), [isLoadingBreeders, t])

  return (
    <StyledContainer>
      <GlobalStyle />
      
      <Modal
        isOpen={showTrasnferModal}
        onClose={handleCloseTransferModal}
        className='transfer-modal'
      >
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

      <ListModal
        isOpen={isOpenModalConfig}
        onClose={handleCloseModalConfig}
        items={configModalItems}
        linkComponent={LinkComponent}
      />

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
