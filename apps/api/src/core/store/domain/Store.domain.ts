import { StoreSchema, Store as IStore } from '@starter/schema'

import { setupDomain, SetupDomain } from '@/support/utilities'

export type StoreDomain = SetupDomain<IStore>

export class Store {
  state!: IStore

  constructor(store: StoreDomain) {
    Object.assign(this, {
      state: setupDomain(
        {
          ...store
        },
        StoreSchema
      )
    })
  }
}
