import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormField, Input, Button } from '@cig-platform/ui'

import PageTitle from '../../components/PageTitle/PageTitle'
import Main from '../../components/Main/Main'

import { StyledForm, StyledField } from './EditPassword.styles'

export default function EditPasswordPage() {
  const { t } = useTranslation()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    console.log({ password, confirmPassword })
  }, [password, confirmPassword])

  const handleChangePassword = useCallback((newPassword: string | number) =>
    setPassword(String(newPassword))
  , [])

  const handleChangeConfirmPassword = useCallback((newConfirmPassword: string | number) =>
    setConfirmPassword(String(newConfirmPassword))
  , [])

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
          <Button onClick={handleSubmit}>
            {t('common.save')}
          </Button>
        </StyledField>
      </StyledForm>
    </Main>
  )
}
