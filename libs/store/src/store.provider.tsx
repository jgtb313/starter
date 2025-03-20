import { PropsWithChildren } from 'react'
import { CacheProvider } from '@starter/use-request'

import { StoreContext } from '@/store.context'
import { StoreProviderProps } from '@/store.context.types'

export const StoreProvider = ({ cache, events = {}, onError, children }: PropsWithChildren<StoreProviderProps>) => {
  return (
    <CacheProvider {...cache}>
      <StoreContext.Provider
        value={{
          events,
          onError,
        }}
      >
        {children}
      </StoreContext.Provider>
    </CacheProvider>
  )
}
