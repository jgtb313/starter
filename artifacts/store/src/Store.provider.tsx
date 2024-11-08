import { useEffect, PropsWithChildren } from 'react'

import { StoreState } from './Store.types'
import { Context, useStore } from './Store.context'

export const StoreProvider = ({ onError, children }: PropsWithChildren<Pick<StoreState, 'onError'>>) => {
  useEffect(() => {
    useStore.getState().apply({ onError })
  }, [onError])

  return <Context.Provider value={{}}>{children}</Context.Provider>
}
