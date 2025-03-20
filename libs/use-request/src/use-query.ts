import { useRequest, UseRequestOptions, UseQueryOptions, UseRequestFetch, UseRequestResult } from './use-request'
import { useCache, createCacheKey } from './use-cache'

export const useQuery = <F extends (input: Parameters<F>[number]) => ReturnType<F>>(
  handler: F,
  options: Partial<UseRequestOptions<Awaited<ReturnType<F>>, Parameters<F>[number]>> & UseQueryOptions,
): [UseRequestFetch<F>, UseRequestResult<F>] => {
  const cache = useCache()
  const [fetch, { data, error, loading, updateData }] = useRequest(handler, {
    defaultValues: options.defaultValues ?? cache.get(createCacheKey(options.queryKey, options.params ?? {}, options.ttl)),
    events: options.events,
  })

  const handleQueryFetch: UseRequestFetch<F> = async (input) => {
    const cacheKey = createCacheKey(options.queryKey, input.params ?? {}, options.ttl)

    const cached = cache.get<Awaited<ReturnType<F>>>(cacheKey)

    if (cached) {
      updateData(cached)
      return cached
    }

    const response = await fetch(input)

    cache.set(cacheKey, response, options.ttl)

    return response
  }

  return [handleQueryFetch, { data, error, loading, updateData }]
}
