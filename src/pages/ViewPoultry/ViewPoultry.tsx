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
import { success, withInput } from 'utils/alert'
import useSavePoultryAdvertising from 'hooks/useSavePoultryAdvertising'

export default function ViewPoultry() {
  const [poultry, setPoultry] = useState<undefined | IPoultry & { images: IPoultryImage[]; registers: IPoultryRegister[]; }>()
  const [advertising, setAdvertising] = useState<undefined | IAdvertising>()

  const { t } = useTranslation()

  const history = useHistory()

  const { poultryId } = useParams<{ poultryId: string }>()

  const breeder = useBreeder()

  const { token } = useAuth()

  const handleSaveAdvertisingSuccess = useCallback(() => {
    success(t('save-poultry-advertising-success'), t, () => window.location.reload())
  }, [])

  const saveAdvertising = useSavePoultryAdvertising({ poultryId: poultry?.id ?? '', onSuccess: handleSaveAdvertisingSuccess })

  useEffect(() => {
    if (!poultryId || !breeder) return
   
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
          <Button disabled={Boolean(advertising)} onClick={handleAnnouncePoultry}>
            {t('announce-poultry')}
          </Button>
        </StyledButton>
      </StyledButtons>
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
    </StyledContainer>
  )
}
