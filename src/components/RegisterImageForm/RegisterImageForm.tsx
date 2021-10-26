import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FileImagesCarousel, TextField } from '@cig-platform/ui'

import { useRegisterDispatch, useRegisterSelector } from 'contexts/RegisterContext/RegisterContext'
import { setDescription, setFiles } from 'contexts/RegisterContext/registerActions'
import { selectDescription, selectFiles } from 'contexts/RegisterContext/registerSelectors'
import { info } from 'utils/alert'

import { StyledForm, StyledFormField } from './RegisterImageForm.styles'

export interface RegisterImageFormProps {
  title: string;
}

export default function RegisterImageForm({ title }: RegisterImageFormProps) {
  const { t } = useTranslation()

  const dispatch = useRegisterDispatch()

  const description = useRegisterSelector(selectDescription)
  const files = useRegisterSelector(selectFiles)

  const handleChangeDescription = useCallback((newDescription: number | string) => {
    dispatch(setDescription(String(newDescription)))
  }, [dispatch])

  const handleUploadImage = useCallback((newFile: File) => {
    const fr = new FileReader()

    fr.readAsDataURL(newFile)
    fr.onload = function() {
      const src = String(this.result)
      const file = {
        file: newFile,
        src,
      }

      dispatch(setFiles([...files, file]))
    } 
  }, [files, dispatch])

  const handleRemoveImage = useCallback((fileSrc: string) => {
    info(t('common.confirm-delete-image'), t, () => {
      const image = files.find((file) => fileSrc.includes(file.src))

      if (!image) return

      const newFiles = files.filter((file) => !fileSrc.includes(file.src))

      dispatch(setFiles(newFiles))
    })
  }, [t, dispatch, files])

  const formattedImagesOfCarousel = useMemo(() => files.map((file) => ({
    src: file.src,
    alt: ''
  })), [files])

  return (
    <StyledForm title={title}>
      <StyledFormField>
        <TextField
          value={description}
          onChange={handleChangeDescription}
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae laoreet nisi. Cras sed libero consectetur, sodales lorem at, rutrum nulla."
          label={t('register.fields.description')}
        />
      </StyledFormField>
      <FileImagesCarousel
        images={formattedImagesOfCarousel}
        onUpload={handleUploadImage}
        onDeleteImage={handleRemoveImage}
        onClickImage={() => null}
        uploadMessage={t('common.select-files')}
      />
    </StyledForm>
  )
}
