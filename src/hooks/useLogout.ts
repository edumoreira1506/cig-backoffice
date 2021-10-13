import { useCallback } from 'react'

import { LOGIN_URL } from '../constants/url'

export default function useLogout() {
  const handleLogout = useCallback(() => {
    window.localStorage.clear()
    window.location.assign(`${LOGIN_URL}?logout=true`)

    return 
  }, [])

  return handleLogout
}
