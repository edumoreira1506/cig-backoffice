import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { IPoultry, IPoultryImage } from '@cig-platform/types'

import BackofficeBffService from 'services/BackofficeBffService'
import useBreeder from 'hooks/useBreeder'
import useAuth from 'hooks/useAuth'
import MicroFrontend from 'components/MicroFrontend/MicroFrontend'
import { POULTRY_PAGE_URL } from 'constants/url'

export default function ViewPoultry() {
  const [poultry, setPoultry] = useState<undefined | IPoultry & { images: IPoultryImage[] }>()

  const { poultryId } = useParams<{ poultryId: string }>()

  const breeder = useBreeder()

  const { token } = useAuth()

  useEffect(() => {
    if (!poultryId || !breeder) return
   
    (async () => {
      const poultryData = await BackofficeBffService.getPoultry(breeder.id, poultryId, token)

      setPoultry(poultryData)
    })()
  }, [poultryId, token, breeder])

  if (!poultry) return null

  return (
    <div id="poultry-preview">
      <MicroFrontend
        name="PoultryPage"
        host={POULTRY_PAGE_URL}
        containerId="poultry-preview"
        poultry={poultry}
        images={poultry.images}
      />
    </div>
  )
}
