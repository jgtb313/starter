import { isBoolean } from '@starter/common'

import { useRequest, UseRequestOptions, UseMutationOptions, UseRequestFetch, UseRequestResult, InvalidateQuery } from './use-request'
import { useCache, createCacheKey } from './use-cache'

export const useMutation = <F extends (input: Parameters<F>[number]) => ReturnType<F>, T extends InvalidateQuery>(
  handler: F,
  options: Partial<UseRequestOptions<Awaited<ReturnType<F>>, Parameters<F>[number]>> & UseMutationOptions<T>,
): [UseRequestFetch<F>, UseRequestResult<F>] => {
  const cache = useCache()
  const [fetch, { data, error, loading, updateData }] = useRequest(handler, { defaultValues: options.defaultValues, events: options.events })

  const handleMutationFetch: UseRequestFetch<F> = async (input) => {
    const response = await fetch({
      ...input,
      onSuccess: (data, params) => {
        if (options.invalidateQueries) {
          Object.entries(options.invalidateQueries).forEach(([queryKey, queryValue]) => {
            const cacheKey = isBoolean(queryValue) ? queryKey : createCacheKey(queryKey, queryValue ?? {})
            cache.remove(cacheKey)
          })
        }

        input.onSuccess?.(data, params)
      },
    })

    return response
  }

  return [handleMutationFetch, { data, error, loading, updateData }]
}
