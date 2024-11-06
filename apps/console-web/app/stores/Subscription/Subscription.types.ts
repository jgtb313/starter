import client from '@ss/client'
import { RequestOptions } from '@ss/components'

export type SubscriptionState = {
  loadingCreateSubscription: boolean

  createSubscription: RequestOptions<typeof client.subscription.create>
}
