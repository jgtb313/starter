import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { Subscription, SubscriptionCreditCard, SubscriptionDebitCard, SubscriptionPaymentMethodEnum, SubscriptionStatusEnum } from '@/schemas'

@Entity('invoices')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  subscriptionId: Subscription['subscriptionId']

  @Column({ type: 'uuid' })
  workspaceId: Subscription['workspaceId']

  @Column({ type: 'uuid' })
  planId: Subscription['planId']

  @Column({ type: 'enum', enum: SubscriptionPaymentMethodEnum })
  paymentMethod: Subscription['paymentMethod']

  @Column({ type: 'json' })
  payer?: SubscriptionCreditCard['payer']

  @Column({ type: 'json', nullable: true })
  creditCard?: SubscriptionCreditCard['creditCard']

  @Column({ type: 'json', nullable: true })
  debitCard?: SubscriptionDebitCard['debitCard']

  @Column({ type: 'timestamp' })
  deadline: Subscription['deadline']

  @Column({ type: 'timestamp' })
  billingDueDate: Subscription['billingDueDate']

  @Column({ type: 'timestamp', nullable: true })
  canceledAt: Subscription['canceledAt']

  @Column({ type: 'enum', enum: SubscriptionStatusEnum, default: SubscriptionStatusEnum.TRIAL })
  status: Subscription['status']

  @CreateDateColumn()
  createdAt: Subscription['createdAt']

  @UpdateDateColumn()
  updatedAt: Subscription['updatedAt']
}

// const Payer = z.object({
//   name: z.string().min(1),
//   email: EmailSchema,
//   phone: PhoneSchema,
//   document: DocumentExplicitSchema,
//   address: BaseAddressSchema,
// })

// const Status = z.nativeEnum(SubscriptionStatusEnum).default(SubscriptionStatusEnum.ACTIVE)

// const BaseSubscriptionSchema = z.object({
//   subscriptionId: SubscriptionId,
//   workspaceId: WorkspaceId,
//   planId: PlanId,
//   deadline: Deadline,
//   billingDueDate: BillingDueDate,
//   canceledAt: CanceledAt,
//   payer: Payer,
//   status: Status,
//   createdAt: CreatedAt,
//   updatedAt: UpdatedAt,
// })

// const SubscriptionCreditCardSchema = BaseSubscriptionSchema.extend({
//   paymentMethod: z.literal(SubscriptionPaymentMethodEnum.CREDIT_CARD),
//   creditCard: CreditCardSchema,
// })
// export type SubscriptionCreditCard = z.infer<typeof SubscriptionCreditCardSchema>

// const SubscriptionDebitCardSchema = BaseSubscriptionSchema.extend({
//   paymentMethod: z.literal(SubscriptionPaymentMethodEnum.DEBIT_CARD),
//   debitCard: CreditCardSchema,
// })
// export type SubscriptionDebitCard = z.infer<typeof SubscriptionDebitCardSchema>

// export const SubscriptionSchema = z.discriminatedUnion('paymentMethod', [SubscriptionCreditCardSchema, SubscriptionDebitCardSchema])

// export type Subscription = z.infer<typeof SubscriptionSchema>
// export type BaseSubscription = BaseSchema<'subscriptionId', Subscription>
