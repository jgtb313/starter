import { createRequestSchema, RequestInput } from '@starter/nestjs-server-hoisting'
import { ID, SubscriptionSchema } from '@starter/domain'
import { z } from '@starter/schema'

export const GetSubscriptionSchema = createRequestSchema({
  params: z.object({
    workspaceId: ID('workspace'),
    subscriptionId: ID('subscription'),
  }),
  output: SubscriptionSchema,
})
export type GetSubscriptionRequest = RequestInput<typeof GetSubscriptionSchema>

export const CreateSubscriptionSchema = createRequestSchema({
  params: z.object({
    workspaceId: ID('workspace'),
  }),
  body: SubscriptionSchema,
  output: SubscriptionSchema,
})
export type CreateSubscriptionRequest = RequestInput<typeof CreateSubscriptionSchema>
