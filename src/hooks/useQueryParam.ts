import { useMemo, useCallback } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

export default function useQueryParam(paramName: string) {
  const { search } = useLocation()

  const history = useHistory()

  const urlSearchParams = useMemo(() => new URLSearchParams(search), [])

  const value = useMemo(() => {
    return urlSearchParams.get(paramName)
  }, [urlSearchParams, paramName])

  const remove = useCallback(() => {
    if (urlSearchParams.has(paramName)) {
      urlSearchParams.delete(paramName)

      history.replace({
        search: urlSearchParams.toString(),
      })
    }
  }, [urlSearchParams, paramName])

  return { value, remove }
}
