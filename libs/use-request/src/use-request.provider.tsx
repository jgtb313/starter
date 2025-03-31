import { PropsWithChildren } from 'react'

import { CacheProvider, CacheProviderProps } from './use-cache.provider'

export type UseRequestProviderProps = {
  cacheProvider: CacheProviderProps
}

export const UseRequestProvider = ({ cacheProvider, children }: PropsWithChildren<UseRequestProviderProps>) => {
  return <CacheProvider {...cacheProvider}>{children}</CacheProvider>
}
