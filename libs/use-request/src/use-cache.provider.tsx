import { PropsWithChildren } from 'react'
import { useInterval } from '@starter/use-hooks'

import { cacheStore, setCacheStorage, runCacheGarbageCollector } from './use-cache.store'
import { CacheContext } from './use-cache.context'

export type CacheProviderProps = {
  storage: Storage
  gcInterval?: number
}

export const CacheProvider = ({ storage, gcInterval = 5000, children }: PropsWithChildren<CacheProviderProps>) => {
  if (!cacheStore) {
    setCacheStorage(storage)
  }

  useInterval(runCacheGarbageCollector, gcInterval)

  return <CacheContext.Provider value={{ storage }}>{children}</CacheContext.Provider>
}
