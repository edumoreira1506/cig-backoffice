import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '@cig-platform/ui'
import { IPoultry, IPoultryImage, IPoultryRegister } from '@cig-platform/types'

import BackofficeBffService from 'services/BackofficeBffService'
import useBreeder from 'hooks/useBreeder'
import useAuth from 'hooks/useAuth'
import MicroFrontend from 'components/MicroFrontend/MicroFrontend'
import { POULTRY_PAGE_URL } from 'constants/url'

import { StyledContainer, StyledButton } from './ViewPoultry.styles'
import { Routes } from 'constants/routes'

export default function ViewPoultry() {
  const [poultry, setPoultry] = useState<undefined | IPoultry & { images: IPoultryImage[]; registers: IPoultryRegister[]; }>()

  const { t } = useTranslation()

  const history = useHistory()

  const { poultryId } = useParams<{ poultryId: string }>()

  const breeder = useBreeder()

  const { token } = useAuth()

  useEffect(() => {
    if (!poultryId || !breeder) return
   
    (async () => {
      const poultryData = await BackofficeBffService.getPoultry(breeder.id, poultryId, token)

      setPoultry({
        ...poultryData,
        birthDate: new Date(poultryData.birthDate),
        registers: poultryData.registers.map((register) => ({
          ...register,
          date: new Date(register.date),
        }))
      })
    })()
  }, [poultryId, token, breeder])

  const handleNavigateToNewRegisterPage = useCallback(() =>
    history.push(Routes.NewRegister.replaceAll(':poultryId', poultryId))
  , [history, poultryId])

  if (!poultry) return null

  return (
    <StyledContainer>
      <StyledButton>
        <Button onClick={handleNavigateToNewRegisterPage}>
          {t('new-register')}
        </Button>
      </StyledButton>
      <div id="poultry-preview">
        <MicroFrontend
          name="PoultryPage"
          host={POULTRY_PAGE_URL}
          containerId="poultry-preview"
          poultry={poultry}
          images={poultry.images}
          registers={poultry.registers}
        />
      </div>
    </StyledContainer>
  )
}
