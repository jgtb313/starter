import { SubscriptionSchema, CreateSubscriptionSchema, CreateSubscriptionSchemaOutput } from '@starter/schema'

import { IDependencies } from '@/core/shared/types'
import { IRouter } from '@/ports/http'

export const SubscriptionRouter = (dependencies: IDependencies): IRouter => ({
  name: 'Subscriptions',

  description: 'Module to manage file storage and access using cloud integration services.',

  schemas: {
    Subscription: {
      schema: SubscriptionSchema
    }
  },

  paths: {
    createSubscription: {
      summary: 'Creates Subscription',
      description: 'Returns a subscription.',

      method: 'POST',

      path: '/subscriptions',

      parameters: {
        body: CreateSubscriptionSchema
      },

      responses: {
        201: {
          description: '201',
          schema: CreateSubscriptionSchemaOutput
        }
      },

      execute({ body }) {
        CreateSubscriptionSchema.parse(body)
        return body
      }
    }
  }
})
