import { create } from 'zustand'
import client from '@ss/client'
import { makeRequest, toast } from '@ss/components'

import { DeliveryState } from './Delivery.types'

const store = create<DeliveryState>()

export const useDelivery = store((set) => ({
  deliveries: undefined,
  loadingDeliveries: false,
  loadingDeleteDelivery: false,

  async fetchDeliveries(params, options) {
    return makeRequest(client.delivery.list, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingDeliveries: true
        }),
      onSuccess: (deliveries) => {
        set({
          deliveries
        })
      },
      onFinally: () =>
        set({
          loadingDeliveries: false
        })
    })
  },

  async deleteDelivery(params, options) {
    return makeRequest(client.delivery.destroy, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingDeleteDelivery: true
        }),
      onSuccess: () => {
        toast.success({
          message: 'Entrega excluída com sucesso.'
        })
      },
      onFinally: () =>
        set({
          loadingDeleteDelivery: false
        })
    })
  }
}))
