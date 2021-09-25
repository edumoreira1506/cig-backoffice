import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ptBrTranslations from 'static/locales/pt-BR.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': {
        translation: ptBrTranslations
      }
    },
    lng: 'pt-BR',
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false
    }
  })
