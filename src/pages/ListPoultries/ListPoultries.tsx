import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { IPoultry } from '@cig-platform/types'
import { Button, PoultriesCarousel } from '@cig-platform/ui'

import Main from 'components/Main/Main'
import PageTitle from 'components/PageTitle/PageTitle'
import { useAppDispatch } from 'contexts/AppContext/AppContext'
import { setError } from 'contexts/AppContext/appActions'
import BackofficeBffService from 'services/BackofficeBffService'
import useBreeder from 'hooks/useBreeder'
import useAuth from 'hooks/useAuth'
import { Routes } from 'constants/routes'

import {
  StyledNewPoultry,
  StyledPoultriesCarousel,
  StyledPoultriesCarouselTitle,
} from './ListPoultries.styles'
import { createImageUrl } from 'utils/s3'
import { S3Folders, S3Subfolders } from 'constants/s3'

interface Poultry extends IPoultry {
  mainImage: string;
}

export default function ListPoultriesPage() {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const history = useHistory()

  const breeder = useBreeder()

  const { token } = useAuth()

  const [poultries, setPoultries] = useState<{
    reproductives: Poultry[];
    matrix: Poultry[];
    male: Poultry[];
    female: Poultry[];
  }>({
    reproductives: [],
    male: [],
    matrix: [],
    female: []
  })

  const handleNavigateToNewPoultry = useCallback(() => {
    history.push(Routes.NewPoultry)
  }, [history])

  const handleClickMatrixPoultry = useCallback((imageSrc: string) => {
    const poultry = poultries.matrix.find((poultry) => poultry.mainImage.includes(imageSrc))

    if (poultry) {
      history.push(Routes.EditPoultry.replace(':poultryId', poultry.id))
    }
  }, [poultries.matrix])

  const handleClickReproductivePoultry = useCallback((imageSrc: string) => {
    const poultry = poultries.reproductives.find((poultry) => poultry.mainImage.includes(imageSrc))

    if (poultry) {
      history.push(Routes.EditPoultry.replace(':poultryId', poultry.id))
    }
  }, [poultries.reproductives])

  const handleClickFemalePoultry = useCallback((imageSrc: string) => {
    const poultry = poultries.female.find((poultry) => poultry.mainImage.includes(imageSrc))

    if (poultry) {
      history.push(Routes.EditPoultry.replace(':poultryId', poultry.id))
    }
  }, [poultries.female])

  const handleClickMalePoultry = useCallback((imageSrc: string) => {
    const poultry = poultries.male.find((poultry) => poultry.mainImage.includes(imageSrc))

    if (poultry) {
      history.push(Routes.EditPoultry.replace(':poultryId', poultry.id))
    }
  }, [poultries.male])

  useEffect(() => {
    if (!breeder) return

    (async () => {
      try {
        const newPoultries = await BackofficeBffService.getPoultries(breeder.id, token)
        const poultries = {
          reproductives: newPoultries.reproductives.map((poultry) => ({
            ...poultry,
            mainImage: poultry.mainImage
              ? createImageUrl({
                folder: S3Folders.Poultries,
                subfolder: S3Subfolders.Images,
                fileName: poultry.mainImage
              })
              : 'https://farmhousepoultry.ca/wp-content/uploads/2016/03/Product_ImageComingSoon_592x592-380x400.jpg'
          })),
          matrix: newPoultries.matrix.map((poultry) => ({
            ...poultry,
            mainImage: poultry.mainImage
              ? createImageUrl({
                folder: S3Folders.Poultries,
                subfolder: S3Subfolders.Images,
                fileName: poultry.mainImage
              })
              : 'https://farmhousepoultry.ca/wp-content/uploads/2016/03/Product_ImageComingSoon_592x592-380x400.jpg'
          })),
          male: newPoultries.male.map((poultry) => ({
            ...poultry,
            mainImage: poultry.mainImage
              ? createImageUrl({
                folder: S3Folders.Poultries,
                subfolder: S3Subfolders.Images,
                fileName: poultry.mainImage
              })
              : 'https://farmhousepoultry.ca/wp-content/uploads/2016/03/Product_ImageComingSoon_592x592-380x400.jpg'
          })),
          female: newPoultries.female.map((poultry) => ({
            ...poultry,
            mainImage: poultry.mainImage
              ? createImageUrl({
                folder: S3Folders.Poultries,
                subfolder: S3Subfolders.Images,
                fileName: poultry.mainImage
              })
              : 'https://farmhousepoultry.ca/wp-content/uploads/2016/03/Product_ImageComingSoon_592x592-380x400.jpg'
          })),
        }

        setPoultries(poultries)
      } catch (error) {
        dispatch(setError(error))
      }
    })()
  }, [breeder])

  return (
    <Main>
      <PageTitle>
        {t('list-poultries')}
      </PageTitle>
      <StyledNewPoultry>
        <Button onClick={handleNavigateToNewPoultry} type="button">
          {t('create-poultry')}
        </Button>
      </StyledNewPoultry>
      {Boolean(poultries.matrix.length) && (
        <StyledPoultriesCarousel>
          <StyledPoultriesCarouselTitle>
            {t('poultry.fields.gender.matrix')}
          </StyledPoultriesCarouselTitle>
          <PoultriesCarousel
            onClickImage={handleClickMatrixPoultry}
            poultries={poultries.matrix}
          />
        </StyledPoultriesCarousel>
      )}
      {Boolean(poultries.reproductives.length) && (
        <StyledPoultriesCarousel>
          <StyledPoultriesCarouselTitle>
            {t('poultry.fields.gender.reproductive')}
          </StyledPoultriesCarouselTitle>
          <PoultriesCarousel
            onClickImage={handleClickReproductivePoultry}
            poultries={poultries.reproductives}
          />
        </StyledPoultriesCarousel>
      )}
      {Boolean(poultries.male.length) && (
        <StyledPoultriesCarousel>
          <StyledPoultriesCarouselTitle>
            {t('poultry.fields.gender.male')}
          </StyledPoultriesCarouselTitle>
          <PoultriesCarousel
            onClickImage={handleClickMalePoultry}
            poultries={poultries.male}
          />
        </StyledPoultriesCarousel>
      )}
      {Boolean(poultries.female.length) && (
        <StyledPoultriesCarousel>
          <StyledPoultriesCarouselTitle>
            {t('poultry.fields.gender.female')}
          </StyledPoultriesCarouselTitle>
          <PoultriesCarousel
            onClickImage={handleClickFemalePoultry}
            poultries={poultries.female}
          />
        </StyledPoultriesCarousel>
      )}
    </Main>
  )
}
