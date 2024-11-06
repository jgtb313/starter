import { create } from 'zustand'
import client from '@ss/client'
import { makeRequest, toast } from '@ss/components'

import { InventoryState } from './Inventory.types'

const store = create<InventoryState>()

export const useInventory = store((set) => ({
  inventories: undefined,
  loadingInventories: false,
  loadingDeleteInventory: false,

  async fetchInventories(params, options) {
    return makeRequest(client.inventory.list, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingInventories: true
        }),
      onSuccess: (inventories) => {
        set({
          inventories
        })
      },
      onFinally: () =>
        set({
          loadingInventories: false
        })
    })
  },

  async deleteInventory(params, options) {
    return makeRequest(client.inventory.destroy, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingDeleteInventory: true
        }),
      onSuccess: () => {
        toast.success({
          message: 'Inventário excluído com sucesso.'
        })
      },
      onFinally: () =>
        set({
          loadingDeleteInventory: false
        })
    })
  }
}))
