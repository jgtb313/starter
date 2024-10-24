import { toast } from '@/components'

export type RequestEvents<T, K> = {
  onPreFetch?: () => void
  onSuccess?: (data: T, params: K) => void
  onError?: (error: string) => void
  onFinally?: () => void
}

export type MakeRequestOptions<T, K> = {
  params?: Partial<K>
} & RequestEvents<T, K>

export type RequestOptions<T extends (...args: any) => any> = (
  input: Parameters<T>[number],
  options?: Pick<MakeRequestOptions<Awaited<ReturnType<T>>, Parameters<T>[number]>, 'onPreFetch' | 'onSuccess' | 'onError' | 'onFinally'>
) => Promise<Awaited<ReturnType<T>>>

export type RequestReturnType<T extends (...args: any) => any> = Awaited<ReturnType<RequestOptions<T>>>

export const makeRequest = async <T extends (input: Parameters<T>[number]) => ReturnType<T>>(
  handler: T,
  {
    params,
    options,
    onPreFetch,
    onSuccess,
    onError,
    onFinally
  }: MakeRequestOptions<Awaited<ReturnType<T>>, Parameters<T>[number]> & {
    options?: Pick<MakeRequestOptions<Awaited<ReturnType<T>>, Parameters<T>[number]>, 'onPreFetch' | 'onSuccess' | 'onError' | 'onFinally'>
  }
) => {
  try {
    options?.onPreFetch?.()
    onPreFetch?.()

    const value = (await handler(params)) as Awaited<ReturnType<T>>

    options?.onSuccess?.(value, params)
    onSuccess?.(value, params)

    return value
  } catch (err) {
    const error = err as Error

    options?.onError?.(error.message)
    onError?.(error.message)

    toast.error({ message: error.message })

    throw error
  } finally {
    options?.onFinally?.()
    onFinally?.()
  }
}
