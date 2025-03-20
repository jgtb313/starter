import { useState } from 'react'
import { ApiError } from '@starter/client'

import { makeRequest, MakeRequestOptions, MakeRequestEvents } from './make-request'

export type UseRequestOptions<T, K> = {
  defaultValues?: T
  params?: K
  events?: MakeRequestEvents<T, K>
}

export type UseQueryOptions = {
  queryKey: string
  ttl?: number
}

export type InvalidateQuery = Record<string, true | {}>

export type UseMutationOptions<T extends InvalidateQuery> = {
  invalidateQueries?: T
}

export type UseRequestFetch<F extends (input: Parameters<F>[number]) => ReturnType<F>> = (
  input: {
    params: Parameters<F>[number]
  } & MakeRequestOptions<Awaited<ReturnType<F>>, Parameters<F>[number]>,
) => Promise<ReturnType<F>>

export type UseRequestData<F extends (input: Parameters<F>[number]) => ReturnType<F>> = Awaited<ReturnType<F>>

export type UseRequestResult<F extends (input: Parameters<F>[number]) => ReturnType<F>> = {
  data?: UseRequestData<F>
  error?: ApiError
  loading: boolean
  updateData: (data?: UseRequestData<F>) => void
}

export const useRequest = <F extends (input: Parameters<F>[number]) => ReturnType<F>>(
  handler: F,
  options?: UseRequestOptions<Awaited<ReturnType<F>>, Parameters<F>[number]>,
): [UseRequestFetch<F>, UseRequestResult<F>] => {
  const [data, setData] = useState<Awaited<ReturnType<F>> | undefined>(options?.defaultValues)
  const [error, setError] = useState<ApiError>()
  const [loading, setLoading] = useState(false)

  const updateData: UseRequestResult<F>['updateData'] = (value) => {
    setData(value)
  }

  const fetch: UseRequestFetch<F> = ({ params, onPreFetch, onSuccess, onError, onFinally }) => {
    return makeRequest(handler, {
      params,
      events: options?.events,
      onPreFetch: () => {
        setLoading(true)
        onPreFetch?.()
      },
      onSuccess: (data, params) => {
        updateData(data)
        onSuccess?.(data, params)
      },
      onError: (error) => {
        setError(error)
        onError?.(error)
      },
      onFinally: () => {
        setLoading(false)
        onFinally?.()
      },
    })
  }

  return [fetch, { data, error, loading, updateData }]
}
