import { useState } from 'react'

import { useWatch } from './use-watch'
import { makeRequest, MakeRequestOptions } from './make-request'

type UseRequestOptions<T, K> = {
  initialValues?: T
} & MakeRequestOptions<T, K>

type UseRequestFetch<F extends (input: Parameters<F>[number]) => ReturnType<F>> = (
  input: {
    params: Parameters<F>[number]
    options?: Pick<MakeRequestOptions<Awaited<ReturnType<F>>, Parameters<F>[number]>, 'onPreFetch' | 'onSuccess' | 'onError' | 'onFinally'>
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

  const fetch: UseRequestFetch<F> = async ({ params, options, onPreFetch, onSuccess, onError, onFinally }) => {
    const value = await makeRequest(handler, {
      params,
      options,
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
