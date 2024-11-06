import client from '@ss/client'
import { RequestReturnType, RequestOptions } from '@ss/components'

export type InventoryState = {
  inventories?: RequestReturnType<typeof client.inventory.list>
  loadingInventories: boolean
  loadingDeleteInventory: boolean

  fetchInventories: RequestOptions<typeof client.inventory.list>
  deleteInventory: RequestOptions<typeof client.inventory.destroy>
}
