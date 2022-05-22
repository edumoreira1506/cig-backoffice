import React from 'react'
import ReactDOM from 'react-dom'

import App from 'App'

import 'slick-carousel/slick/slick.css' 
import 'slick-carousel/slick/slick-theme.css'
import 'react-datepicker/dist/react-datepicker.css'

import 'config/i18n'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
