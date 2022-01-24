import { useEffect, VFC } from 'react'

import useLogout from '../../hooks/useLogout'

const LogoutPage: VFC = () => {
  const logout = useLogout()

  useEffect(() => {
    logout()
  }, [logout])

  return null
}

export default LogoutPage
