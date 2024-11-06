import client from '@ss/client'
import { RequestReturnType, RequestOptions } from '@ss/components'

export type DeliveryState = {
  deliveries?: RequestReturnType<typeof client.delivery.list>
  loadingDeliveries: boolean
  loadingDeleteDelivery: boolean

  fetchDeliveries: RequestOptions<typeof client.delivery.list>
  deleteDelivery: RequestOptions<typeof client.delivery.destroy>
}
