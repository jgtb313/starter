import { createContext, useContext } from 'react'

export type CacheContextProps = {
  storage: Storage
}

export const CacheContext = createContext<CacheContextProps | undefined>(undefined)

export const useCacheContext = () => {
  const context = useContext(CacheContext)

  if (!context) {
    throw new Error('useCacheContext must be used within a CacheProvider')
  }

  return context
}
