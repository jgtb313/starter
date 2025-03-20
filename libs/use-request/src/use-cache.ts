import { useCacheContext } from './use-cache.context'
import { cacheStore, setCacheStorage } from './use-cache.store'

export const createCacheKey = (key: string, value = {}, ttl?: number) => {
  if (Object.keys(value).length === 0) {
    return key
  }

  let sortedEntries = Object.entries(value).sort(([a], [b]) => a.localeCompare(b))

  if (ttl) {
    sortedEntries.push(['ttl', ttl])
  }

  const formattedValue = sortedEntries.map(([k, v]) => `${k}=${v}`).join(',')

  return `${key}:${formattedValue}`
}

export const useCache = () => {
  const { storage } = useCacheContext()

  if (!cacheStore) {
    return setCacheStorage(storage)()
  }

  return cacheStore()
}
