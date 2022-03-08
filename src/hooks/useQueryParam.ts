import { useMemo, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function useQueryParam(paramName: string) {
  const { search } = useLocation()

  const navigate = useNavigate()

  const urlSearchParams = useMemo(() => new URLSearchParams(search), [])

  const value = useMemo(() => {
    return urlSearchParams.get(paramName)
  }, [urlSearchParams, paramName])

  const remove = useCallback(() => {
    if (urlSearchParams.has(paramName)) {
      urlSearchParams.delete(paramName)

      navigate({
        search: urlSearchParams.toString(),
      })
    }
  }, [urlSearchParams, paramName, navigate])

  return { value, remove }
}
