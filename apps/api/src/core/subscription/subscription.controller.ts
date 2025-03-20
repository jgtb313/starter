import { Controller, Route, Request, RequestInput } from '@starter/nestjs-server-hoisting'
import { SubscriptionService, SubscriptionSchema } from '@starter/domain'

import { ListSubscriptionsSchema, ListSubscriptionsSchemaOutput } from './subscription.controller.schema'

@Controller({
  name: 'Subscription',

  description: 'Handles operations for managing and retrieving subscriptions.',

  basePath: 'subscriptions',

  schemas: {
    Subscription: {
      schema: SubscriptionSchema,
    },
  },
})
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Route({
    summary: 'List Subscriptions',

    description: 'Retrieves a list of subscriptions.',

    method: 'GET',

    parameters: {
      query: ListSubscriptionsSchema,
    },

    responses: {
      200: {
        schema: ListSubscriptionsSchemaOutput,
      },
    },
  })
  example(@Request() {}: RequestInput<{}, {}, {}>) {
    return ''
  }
}
