import { create } from 'zustand'
import client from '@ss/client'
import { makeRequest, toast } from '@ss/components'

import { StoreState } from './Store.types'

export const useStore = create<StoreState>()((set) => ({
  stores: undefined,
  loadingStores: false,
  loadingCreateStore: false,
  loadingUpdateStore: false,
  loadingDeleteStore: false,

  async fetchStores(params, options) {
    return makeRequest(client.store.list, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingStores: true
        }),
      onSuccess: (stores) => {
        set({
          stores
        })
      },
      onFinally: () =>
        set({
          loadingStores: false
        })
    })
  },

  async createStore(params, options) {
    return makeRequest(client.store.create, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingCreateStore: true
        }),
      onSuccess: () => {
        toast.success({
          message: 'Loja criada com sucesso.'
        })

        useStore.getState().fetchStores({})
      },
      onFinally: () =>
        set({
          loadingCreateStore: false
        })
    })
  },

  async updateStore(params, options) {
    return makeRequest(client.store.update, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingUpdateStore: true
        }),
      onSuccess: () => {
        toast.success({
          message: 'Loja atualizada com sucesso.'
        })

        useStore.getState().fetchStores({})
      },
      onFinally: () =>
        set({
          loadingUpdateStore: false
        })
    })
  },

  async deleteStore(params, options) {
    return makeRequest(client.store.destroy, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingDeleteStore: true
        }),
      onSuccess: () => {
        toast.success({
          message: 'Loja excluída com sucesso.'
        })

        useStore.getState().fetchStores({})
      },
      onFinally: () =>
        set({
          loadingDeleteStore: false
        })
    })
  }
}))
