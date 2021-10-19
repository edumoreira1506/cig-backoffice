import React from 'react'
import { useTranslation } from 'react-i18next'

import Main from 'components/Main/Main'
import PageTitle from 'components/PageTitle/PageTitle'
import { PoultryProvider } from 'contexts/PoultryContext/PoultryContext'
import NewPoultryContainer from 'containers/NewPoultryContainer/NewPoultryContainer'

export default function NewPoultryPage() {
  const { t } = useTranslation()

  return (
    <Main>
      <PageTitle>
        {t('new-poultry')}
      </PageTitle>
      <PoultryProvider>
        <NewPoultryContainer />
      </PoultryProvider>
    </Main>
  )
}
