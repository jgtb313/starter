import { useState } from 'react'

import { toast } from '@/components'
import { useWatch } from './useWatch'

type UseRequestOptions<T, K> = {
  initialValues?: T
  params?: Partial<K>
  onPreFetch?: () => void
  onSuccess?: (data: T, params: K) => void
  onError?: (error: string) => void
  onFinally?: () => void
}

type UseRequestOpts<F extends (input: Parameters<F>[number]) => ReturnType<F>> = Pick<
  UseRequestOptions<Awaited<ReturnType<F>>, Parameters<F>[number]>,
  'initialValues'
>

type UseRequestFetchOptions<F extends (input: Parameters<F>[number]) => ReturnType<F>> = Omit<
  UseRequestOptions<Awaited<ReturnType<F>>, Parameters<F>[number]>,
  'initalvalues'
>

type UseRequestFetch<F extends (input: Parameters<F>[number]) => ReturnType<F>> = (
  input: {
    params: Parameters<F>[number]
    options?: UseRequestFetchOptions<F>
  } & UseRequestFetchOptions<F>
) => Promise<Awaited<ReturnType<F>>>

type UseRequestData<F extends (input: Parameters<F>[number]) => ReturnType<F>> = Awaited<ReturnType<F>>

type UseRequestResult<F extends (input: Parameters<F>[number]) => ReturnType<F>> = {
  data?: UseRequestData<F>
  loading: boolean
  updateData: (data?: UseRequestData<F>) => void
}

export const useRequest = <F extends (input: Parameters<F>[number]) => ReturnType<F>>(
  handler: F,
  opts?: UseRequestOpts<F>
): [UseRequestFetch<F>, UseRequestResult<F>] => {
  const [data, setData] = useState<Awaited<ReturnType<F>> | undefined>(opts?.initialValues)
  const [loading, setLoading] = useState(false)

  const updateData: UseRequestResult<F>['updateData'] = (value) => {
    setData(value)
  }

  const fetch: UseRequestFetch<F> = async ({ params, options, onPreFetch, onSuccess, onError, onFinally }) => {
    try {
      setLoading(true)

      options?.onPreFetch?.()
      onPreFetch?.()

      const value = (await handler(params)) as Awaited<ReturnType<F>>

      updateData(value)
      options?.onSuccess?.(value, params)
      onSuccess?.(value, params)

      return value as never
    } catch (err) {
      const error = err as Error

      options?.onError?.(error.message)
      onError?.(error.message)

      toast.error({ message: error.message })

      throw error
    } finally {
      setLoading(false)
      options?.onFinally?.()
      onFinally?.()
    }
  }

  useWatch(() => {
    setData(opts?.initialValues)
  }, [opts?.initialValues])

  return [fetch, { data, loading, updateData }]
}
