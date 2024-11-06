import client from '@ss/client'
import { RequestReturnType, RequestOptions } from '@ss/components'

export type StoreState = {
  stores?: RequestReturnType<typeof client.store.list>
  loadingStores: boolean
  loadingCreateStore: boolean
  loadingUpdateStore: boolean
  loadingDeleteStore: boolean

  fetchStores: RequestOptions<typeof client.store.list>
  createStore: RequestOptions<typeof client.store.create>
  updateStore: RequestOptions<typeof client.store.update>
  deleteStore: RequestOptions<typeof client.store.destroy>
}
