import { PropsWithChildren } from 'react'
import { UseRequestProvider } from '@starter/use-request'

import { StoreContext } from '@/store.context'
import { StoreProviderProps } from '@/store.context.types'

export const StoreProvider = ({ cache, events = {}, onError, children }: PropsWithChildren<StoreProviderProps>) => {
  return (
    <UseRequestProvider cacheProvider={cache}>
      <StoreContext.Provider
        value={{
          events,
          onError,
        }}
      >
        {children}
      </StoreContext.Provider>
    </UseRequestProvider>
  )
}
