import { useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router'
import { z, ZodSchema } from '@starter/schema'
import { set } from '@starter/common'

type SchemaType<T> = T extends ZodSchema ? z.infer<T> : never
type EmptySchema = never

export type UseRouterOptions<Q extends ZodSchema | undefined = undefined, P extends ZodSchema | undefined = undefined> = {
  query?: Q
  params?: P
}

const isEmptyString = (value: unknown): value is string => typeof value === 'string' && value.length === 0

const queryParamsToObject = (search: string): Record<string, unknown> => {
  const params = new URLSearchParams(search)
  const obj: Record<string, unknown> = {}

  for (const [key, value] of params.entries()) {
    set(obj, key, value)
  }

  return obj
}

export const useRouter = <Q extends ZodSchema | undefined = undefined, P extends ZodSchema | undefined = undefined>({
  query: querySchema,
  params: paramsSchema,
}: UseRouterOptions<Q, P> = {}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const routeParams = useParams()
  const [locationSearch, setLocationSearch] = useState(location.search)
  const path = `${location.pathname}${locationSearch}`
  const parsedQuery = querySchema ? (querySchema.parse(queryParamsToObject(locationSearch)) as SchemaType<Q>) : ({} as EmptySchema)
  const parsedParams = paramsSchema ? (paramsSchema.parse(routeParams) as SchemaType<P>) : ({} as EmptySchema)

  const push = (path: string) => {
    navigate(path)
  }

  const replace = (path: string) => {
    navigate(path, { replace: true })
  }

  const update = (query: Partial<Q extends ZodSchema ? SchemaType<Q> : EmptySchema>) => {
    const url = new URL(window.location.href)

    if (!Object.keys(query).length) {
      setLocationSearch('')
      const newUrl = new URL(window.location.href)
      newUrl.search = ''
      window.history.replaceState({}, '', newUrl)
      return
    }

    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || isEmptyString(value)) {
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
    pathname: location.pathname,
    search: location.search,
    path,
    query: parsedQuery,
    params: parsedParams,
    push,
    replace,
    update,
    back,
  }
}
