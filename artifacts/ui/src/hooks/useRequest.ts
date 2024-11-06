import { useState } from 'react'

import { makeRequest, MakeRequestOptions } from '@/support/make-request'
import { useWatch } from './useWatch'

type UseRequestOptions<T, K> = {
  initialValues?: T
} & MakeRequestOptions<T, K>

type UseRequestFetch<F extends (input: Parameters<F>[number]) => ReturnType<F>> = (
  input: {
    params: Parameters<F>[number]
  } & MakeRequestOptions<Awaited<ReturnType<F>>, Parameters<F>[number]>,
) => Promise<Awaited<ReturnType<F>>>

type UseRequestData<F extends (input: Parameters<F>[number]) => ReturnType<F>> = Awaited<ReturnType<F>>

type UseRequestResult<F extends (input: Parameters<F>[number]) => ReturnType<F>> = {
  data?: UseRequestData<F>
  loading: boolean
  updateData: (data?: UseRequestData<F>) => void
}

export const useRequest = <F extends (input: Parameters<F>[number]) => ReturnType<F>>(
  handler: F,
  opts?: UseRequestOptions<Awaited<ReturnType<F>>, Parameters<F>[number]>,
): [UseRequestFetch<F>, UseRequestResult<F>] => {
  const [data, setData] = useState<Awaited<ReturnType<F>> | undefined>(opts?.initialValues)
  const [loading, setLoading] = useState(false)

  const updateData: UseRequestResult<F>['updateData'] = (value) => {
    setData(value)
  }

  const fetch: UseRequestFetch<F> = async ({ params, onPreFetch, onSuccess, onError, onFinally }) => {
    const value = await makeRequest(handler, {
      params,
      onPreFetch: () => {
        setLoading(true)
        onPreFetch?.()
      },
      onSuccess: (data, params) => {
        updateData(data)
        onSuccess?.(data, params)
      },
      onError,
      onFinally: () => {
        setLoading(false)
        onFinally?.()
      },
    })

    return value as never
  }

  useWatch(() => {
    setData(opts?.initialValues)
  }, [opts?.initialValues])

  return [fetch, { data, loading, updateData }]
}
