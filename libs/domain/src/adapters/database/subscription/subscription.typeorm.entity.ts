import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { RecurrencePaymentMethodEnum } from '@/ports/recurrence'
import { Subscription, SubscriptionCreditCard, SubscriptionDebitCard, SubscriptionStatusEnum } from '@/core/subscription/subscription.schema'

@Entity('invoices')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  subscriptionId: Subscription['subscriptionId']

  @Column({ type: 'uuid' })
  workspaceId: Subscription['workspaceId']

  @Column({ type: 'uuid' })
  planId: Subscription['planId']

  @Column({ type: 'enum', enum: RecurrencePaymentMethodEnum })
  paymentMethod: Subscription['paymentMethod']

  @Column({ type: 'json' })
  payer?: SubscriptionCreditCard['payer']

  @Column({ type: 'json', nullable: true })
  creditCard?: SubscriptionCreditCard['creditCard']

  @Column({ type: 'json', nullable: true })
  debitCard?: SubscriptionDebitCard['debitCard']

  @Column({
    type: 'timestamp',
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.toISOString(),
    },
  })
  deadline: Subscription['deadline']

  @Column({
    type: 'timestamp',
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.toISOString(),
    },
  })
  billingDueDate: Subscription['billingDueDate']

  @Column({
    type: 'timestamp',
    transformer: {
      to: (value: Date) => value,
      from: (value: Date | null) => (value ? value.toISOString() : null),
    },
    nullable: true,
  })
  canceledAt: Subscription['canceledAt']

  @Column({ type: 'enum', enum: SubscriptionStatusEnum, default: SubscriptionStatusEnum.TRIAL })
  status: Subscription['status']

  @CreateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.toISOString(),
    },
  })
  createdAt: Subscription['createdAt']

  @UpdateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.toISOString(),
    },
  })
  updatedAt: Subscription['updatedAt']
}
