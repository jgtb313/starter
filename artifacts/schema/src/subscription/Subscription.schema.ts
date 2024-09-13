import { z } from '@/zod'

import { ID, EmailSchema, DocumentExclusiveSchema, CreditCardSafeSchema, DeletedAtSchema, CreatedAtSchema, UpdatedAtSchema } from '@/common'
import { PlanSchema } from '../plan'
import { SubscriptionPaymentMethodEnum, SubscriptionStatusEnum } from './Subscription.enums'

const PlanId = ID

const Plan = PlanSchema

const Customer = z.object({
  name: z.string().min(1),
  email: EmailSchema,
  document: DocumentExclusiveSchema
})

const PaymentMethod = z.nativeEnum(SubscriptionPaymentMethodEnum)

export const SubscriptionCardSchema = CreditCardSafeSchema.nullish()

const Status = z.nativeEnum(SubscriptionStatusEnum)

export const SubscriptionSchema = z.object({
  id: ID,
  planId: PlanId,
  plan: Plan,
  customer: Customer,
  paymentMethod: PaymentMethod,
  card: SubscriptionCardSchema,
  status: Status,
  deletedAt: DeletedAtSchema,
  createdAt: CreatedAtSchema,
  updatedAt: UpdatedAtSchema
})
export type Subscription = z.infer<typeof SubscriptionSchema>
