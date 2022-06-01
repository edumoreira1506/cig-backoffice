import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormField, Input, Button, DatePicker } from '@cig-platform/ui'

import PageTitle from '../../components/PageTitle/PageTitle'
import Main from '../../components/Main/Main'
import useEditProfile from '../../hooks/useEditProfile'
import { success } from '../../utils/alert'

import { StyledForm, StyledField } from './EditProfile.styles'

export default function EditProfilePage() {
  const { t } = useTranslation()

  const handleSuccessEditProfile = useCallback(() => {
    success(t('common.updated'), t)
  }, [])

  const editProfile = useEditProfile({ onSuccess: handleSuccessEditProfile })

  const [isLoading, setIsLoading] = useState(false)
  const [register, setRegister] = useState('')
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState<Date>()
  const [email, setEmail] = useState('')

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setIsLoading(true)

    await editProfile({
      register,
      birthDate,
      email,
      name
    })

    setIsLoading(false)
  }, [editProfile, register, birthDate, email, name])

  return (
    <Main>
      <PageTitle>
        {t('user.edit-profile')}
      </PageTitle>
      <StyledForm onSubmit={handleSubmit}>
        <StyledField>
          <FormField>
            <Input
              onChange={(newName) => setName(newName.toString())}
              value={name}
              type="text"
              label={t('user.fields.name')}
            />
          </FormField>
        </StyledField>

        <StyledField>
          <FormField>
            <Input
              onChange={(newEmail) => setEmail(newEmail.toString())}
              value={email}
              type="email"
              label={t('user.fields.email')}
            />
          </FormField>
        </StyledField>

        <StyledField>
          <FormField>
            <Input
              onChange={(newRegister) => setRegister(newRegister.toString())}
              value={register}
              type="number"
              label={t('user.fields.register')}
              mask="###.###.###-##"
            />
          </FormField>
        </StyledField>

        <StyledField>
          <DatePicker
            label={t('user.fields.birth-date')}
            value={birthDate as any}
            onChange={(newDate) => setBirthDate(new Date(newDate))}
            name="date"
          />
        </StyledField>

        <StyledField>
          <Button onClick={handleSubmit} isLoading={isLoading} type="submit">
            {t('common.save')}
          </Button>
        </StyledField>
      </StyledForm>
    </Main>
  )
}
