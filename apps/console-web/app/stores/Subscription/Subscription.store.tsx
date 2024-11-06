import { create } from 'zustand'

import client from '@ss/client'
import { makeRequest } from '@ss/components'

import { SubscriptionState } from './Subscription.types'

const store = create<SubscriptionState>()

export const useSubscription = store((set) => ({
  loadingCreateSubscription: false,

  async createSubscription(params, options) {
    return makeRequest(client.subscription.create, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingCreateSubscription: true
        }),
      onFinally: () =>
        set({
          loadingCreateSubscription: false
        })
    })
  }
}))
