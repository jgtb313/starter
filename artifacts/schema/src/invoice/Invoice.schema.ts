import { z } from '@/zod'

import { ID, DateSchema, DeletedAtSchema, CreatedAtSchema, UpdatedAtSchema } from '@/common'
import { WorkspaceSchema } from '../workspace/Workspace.schema'
import { SubscriptionSchema } from '../subscription/Subscription.schema'
import { SubscriptionPaymentMethodEnum } from '../subscription/Subscription.enums'
import { PlanSchema } from '../plan/Plan.schema'
import { InvoiceStatusEnum } from './Invoice.enums'

const WorkspaceId = ID

const Workspace = WorkspaceSchema

const SubscriptionId = ID

const Subscription = SubscriptionSchema

const PlanId = ID

const Plan = PlanSchema

const PaymentMethod = z.nativeEnum(SubscriptionPaymentMethodEnum)

const PaidAt = DateSchema.nullish().transform((value) => value ?? null)

const BillingDate = DateSchema

const Amount = z.number()

const BoletoURL = z
  .string()
  .nullish()
  .transform((value) => value ?? null)

const BoletoExpirationDate = DateSchema.nullish().transform((value) => value ?? null)

const CanceledAt = DateSchema.nullish()

const Status = z.nativeEnum(InvoiceStatusEnum)

export const InvoiceSchema = z.object({
  id: ID,
  workspaceId: WorkspaceId,
  workspace: Workspace,
  subscriptionId: SubscriptionId,
  subscription: Subscription,
  planId: PlanId,
  plan: Plan,
  paymentMethod: PaymentMethod,
  paidAt: PaidAt,
  billingDate: BillingDate,
  amount: Amount,
  // card: Card,
  boletoURL: BoletoURL,
  boletoExpirationDate: BoletoExpirationDate,
  canceledAt: CanceledAt,
  status: Status,
  deletedAt: DeletedAtSchema,
  createdAt: CreatedAtSchema,
  updatedAt: UpdatedAtSchema
})
export type Invoice = z.infer<typeof InvoiceSchema>
