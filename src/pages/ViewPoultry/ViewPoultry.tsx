import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '@cig-platform/ui'
import { IAdvertising, IPoultry, IPoultryImage, IPoultryRegister } from '@cig-platform/types'

import BackofficeBffService from 'services/BackofficeBffService'
import useBreeder from 'hooks/useBreeder'
import useAuth from 'hooks/useAuth'
import MicroFrontend from 'components/MicroFrontend/MicroFrontend'
import { POULTRY_PAGE_URL } from 'constants/url'

import {
  StyledContainer,
  StyledButton,
  StyledButtons
} from './ViewPoultry.styles'
import { Routes } from 'constants/routes'
import { success, withInput, info } from 'utils/alert'
import useSavePoultryAdvertising from 'hooks/useSavePoultryAdvertising'
import useRemovePoultryAdvertising from 'hooks/useRemovePoultryAdvertising'

export default function ViewPoultry() {
  const [poultry, setPoultry] = useState<undefined | IPoultry & { images: IPoultryImage[]; registers: IPoultryRegister[]; }>()
  const [advertising, setAdvertising] = useState<undefined | IAdvertising>()
  const [isLoading, setIsLoading] = useState(true)

  const { t } = useTranslation()

  const history = useHistory()

  const { poultryId } = useParams<{ poultryId: string }>()

  const breeder = useBreeder()

  const { token } = useAuth()

  const handleSaveSuccess = useCallback(() => {
    success(t('action-success'), t, () => window.location.reload())
  }, [])

  const saveAdvertising = useSavePoultryAdvertising({ poultryId: poultry?.id ?? '', onSuccess: handleSaveSuccess })

  const removeAdvertising = useRemovePoultryAdvertising({
    poultryId,
    advertisingId: advertising?.id ?? '',
    onSuccess: handleSaveSuccess,
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

  if (!poultry) return null

  return (
    <StyledContainer>
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
