import { useCache, createCacheKey } from './use-cache'

export const useReadCache = <T, K extends {} = {}>(key: string, value?: K): T | undefined => {
  const cacheKey = createCacheKey(key, value ?? {})
  const cache = useCache()

  return cache.get<T>(cacheKey)
}
