import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormField, Input, Button } from '@cig-platform/ui'
import { useNavigate } from 'react-router-dom'

import PageTitle from '../../components/PageTitle/PageTitle'
import Main from '../../components/Main/Main'
import useEditPassword from '../../hooks/useEditPassword'
import { success } from '../../utils/alert'
import useAuth from '../../hooks/useAuth'
import { Routes } from '../../constants/routes'

import { StyledForm, StyledField } from './EditPassword.styles'
import { UserRegisterTypeEnum } from '@cig-platform/enums'

export default function EditPasswordPage() {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const { userData } = useAuth()

  const handleSuccessEditPassword = useCallback(() => {
    success(t('common.updated'), t)
  }, [])

  const editPassword = useEditPassword({ onSuccess: handleSuccessEditPassword })

  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setIsLoading(true)

    await editPassword(password, confirmPassword)

    setIsLoading(false)
  }, [password, confirmPassword, editPassword])

  const handleChangePassword = useCallback((newPassword: string | number) =>
    setPassword(String(newPassword))
  , [])

  const handleChangeConfirmPassword = useCallback((newConfirmPassword: string | number) =>
    setConfirmPassword(String(newConfirmPassword))
  , [])

  useEffect(() => {
    if (userData?.registerType !== UserRegisterTypeEnum.Default) {
      navigate(Routes.Home)
    }
  }, [navigate, userData?.registerType])

  return (
    <Main>
      <PageTitle>
        {t('user.edit-password')}
      </PageTitle>
      <StyledForm onSubmit={handleSubmit}>
        <StyledField>
          <FormField>
            <Input
              onChange={handleChangePassword}
              value={password}
              type="password"
              label={t('user.fields.password')}
            />
          </FormField>
        </StyledField>
        <StyledField>
          <FormField>
            <Input
              onChange={handleChangeConfirmPassword}
              value={confirmPassword}
              type="password"
              label={t('user.fields.confirm-password')}
            />
          </FormField>
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
