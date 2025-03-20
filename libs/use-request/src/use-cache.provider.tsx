import { PropsWithChildren } from 'react'
import { useInterval } from '@starter/use-hooks'

import { cacheStore, UseCacheStoreState } from './use-cache.store'
import { CacheContext } from './use-cache.context'

export type CacheProviderProps = {
  storage: Storage
}

const runCacheGarbageCollector = (cache: UseCacheStoreState) => {
  const now = Date.now()

  Object.entries(cache.data).forEach(([key, { ttl }]) => {
    if (ttl && ttl < now) {
      cache.remove(key)
    }
  })
}

export const CacheProvider = ({ storage, children }: PropsWithChildren<CacheProviderProps>) => {
  useInterval(() => {
    const cache = cacheStore?.getState()

    if (cache) {
      runCacheGarbageCollector(cache)
    }
  }, 5000)

  return <CacheContext.Provider value={{ storage }}>{children}</CacheContext.Provider>
}
