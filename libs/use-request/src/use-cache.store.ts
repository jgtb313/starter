import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type CacheRecord<T> = {
  data: T
  ttl: number
}

export type UseCacheStoreState = {
  data: Record<string, CacheRecord<unknown>>
  get: <T>(key: string) => T | undefined
  set: <T>(key: string, data: T, ttl?: number) => void
  remove: (key: string) => void
}

export type CacheStore = ReturnType<typeof createCacheStore>

export let cacheStore: CacheStore | null = null

export const createCacheStore = (storage: Storage) => {
  const store = create(
    persist<UseCacheStoreState>(
      (set, get) => ({
        data: {},

        get: <T>(key: string): T | undefined => {
          const { data } = get()
          const record = data[key]

          if (!record) {
            return
          }

          const now = Date.now()

          if (record.ttl !== undefined && now >= record.ttl) {
            return
          }

          return record.data as T
        },

        set: <T>(key: string, data: T, ttl?: number): void => {
          if (ttl === undefined) {
            return
          }

          const now = Date.now()
          const ttlExpiration = ttl === Infinity ? Number.MAX_SAFE_INTEGER : now + ttl

          set((state) => ({
            data: {
              ...state.data,
              [key]: { data, ttl: ttlExpiration },
            },
          }))
        },

        remove: (key) => {
          set((state) => {
            const data = Object.fromEntries(Object.entries(state.data).filter(([k]) => !k.startsWith(key)))

            return { data }
          })
        },
      }),
      {
        name: 'cacheData',
        storage: createJSONStorage(() => storage),
      },
    ),
  )

  return store
}

export const runCacheGarbageCollector = () => {
  const cache = cacheStore?.getState()

  if (!cache) {
    return
  }

  const now = Date.now()

  Object.entries(cache.data).forEach(([key, { ttl }]) => {
    if (ttl && ttl < now) {
      cache.remove(key)
    }
  })
}

export const setCacheStorage = (storage: Storage) => {
  if (!cacheStore) {
    cacheStore = createCacheStore(storage)
  }

  return cacheStore
}
