import { UseRequestProviderProps, MakeRequestEvents } from '@starter/use-request'

import { StoreEvents } from '@/stores.generated'

export type StoreContextProps = {
  events: StoreEvents
  onError?: MakeRequestEvents<{}, {}>['onError']
}

export type StoreProviderProps = {
  cache: UseRequestProviderProps['cacheProvider']
  events?: StoreEvents
  onError?: MakeRequestEvents<{}, {}>['onError']
}
