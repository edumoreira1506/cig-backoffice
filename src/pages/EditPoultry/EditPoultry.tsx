import React from 'react'
import { useTranslation } from 'react-i18next'

import Main from 'components/Main/Main'
import PageTitle from 'components/PageTitle/PageTitle'
import { PoultryProvider } from 'contexts/PoultryContext/PoultryContext'
import EditPoultryContainer from 'containers/EditPoultryContainer/EditPoultryContainer'

export default function EditPoultryPage() {
  const { t } = useTranslation()

  return (
    <Main>
      <PageTitle>
        {t('edit-poultry')}
      </PageTitle>
      <PoultryProvider>
        <EditPoultryContainer />
      </PoultryProvider>
    </Main>
  )
}
