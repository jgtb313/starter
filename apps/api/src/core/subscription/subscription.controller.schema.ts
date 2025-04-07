import { z, PaginationSchema, BasePaginationSchemaOutput } from '@starter/schema'
import { SubscriptionSchema } from '@starter/domain'

export const ListSubscriptionsSchema = z
  .object({
    // status: true,
  })
  .partial()
  .merge(
    z
      .object({
        // filter: FilterSchema(['name', 'email'], { example: 'John Doe' }),
      })
      .partial(),
  )
  .merge(PaginationSchema)
export const ListSubscriptionsSchemaOutput = BasePaginationSchemaOutput.merge(z.object({ values: z.array(SubscriptionSchema) }))
export type ListSubscriptionsInput = z.infer<typeof ListSubscriptionsSchema>
