import React from 'react'

import { RegisterProvider } from 'contexts/RegisterContext/RegisterContext'
import NewRegisterContainer from 'containers/NewRegisterContainer/NewRegisterContainer'

export default function NewRegister() {
  return (
    <RegisterProvider>
      <NewRegisterContainer />
    </RegisterProvider>
  )
}
