import { useState } from 'react'
import { useNavigate, useLocation } from '@remix-run/react'
import { isString, isUndefined, set } from '@ss/shared'

const setupQueryParamsValue = (value: string) => {
  if (value === 'false') {
    return false
  }

  if (value === 'true') {
    return true
  }

  return value
}

const isEmptyString = (value: unknown) => isString(value) && !value

const queryParamsToObject = <T>(search: string) => {
  const params = new URLSearchParams(search)
  const obj = {} as T

  for (const [key, value] of params.entries()) {
    set(obj as object, key, setupQueryParamsValue(value))
  }

  return obj
}

export const useRouter = <T>() => {
  const navigate = useNavigate()
  const location = useLocation()
  const [locationSearch, setLocationSearch] = useState(location.search)

  const push = (path: string) => {
    navigate(path)
  }

  const replace = (path: string) => {
    navigate(path, {
      replace: true
    })
  }

  const update = (query: Record<string, unknown>) => {
    const url = new URL(window.location.href)

    if (!Object.keys(query).length) {
      setLocationSearch('')
      window.history.replaceState({}, '', location.pathname)

      return
    }

    Object.entries(query).forEach(([key, value]) => {
      if (isUndefined(value) || isEmptyString(value)) {
        url.searchParams.delete(key)
        return
      }

      url.searchParams.set(key, `${value}`)
    })

    setLocationSearch(url.search)
    window.history.replaceState({}, '', url)
  }

  const back = () => {
    navigate(-1)
  }

  return {
    path: `${location.pathname}${locationSearch}`,
    query: queryParamsToObject<T>(locationSearch),
    push,
    replace,
    update,
    back
  }
}
