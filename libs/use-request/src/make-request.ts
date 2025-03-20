import { ApiError } from '@starter/client'

export type MakeRequestEvents<T, K> = {
  onPreFetch?: () => void
  onSuccess?: (data: T, params: K) => void
  onError?: (error: ApiError) => void
  onFinally?: () => void
}

export type MakeRequestOptions<T, K> = {
  params?: Partial<K>
} & MakeRequestEvents<T, K>

export type RequestOptions<T extends (...args: any) => any> = (
  input: Parameters<T>[number],
  options?: MakeRequestEvents<Awaited<ReturnType<T>>, Parameters<T>[number]>,
) => Promise<Awaited<ReturnType<T>>>

export type RequestReturnType<T extends (...args: any) => any> = Awaited<ReturnType<RequestOptions<T>>>

export const makeRequest = async <T extends (input: Parameters<T>[number]) => ReturnType<T>>(
  handler: T,
  {
    params,
    events,
    onPreFetch,
    onSuccess,
    onError,
    onFinally,
  }: MakeRequestOptions<Awaited<ReturnType<T>>, Parameters<T>[number]> & {
    events?: MakeRequestEvents<Awaited<ReturnType<T>>, Parameters<T>[number]>
  },
) => {
  try {
    await events?.onPreFetch?.()
    await onPreFetch?.()

    const value = (await handler(params)) as Awaited<ReturnType<T>>

    await events?.onSuccess?.(value, params)
    await onSuccess?.(value, params)

    return value
  } catch (err) {
    const error = err as ApiError

    await events?.onError?.(error)
    await onError?.(error)

    throw error
  } finally {
    events?.onFinally?.()
    onFinally?.()
  }
}
