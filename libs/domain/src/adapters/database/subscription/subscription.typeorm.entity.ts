import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { RecurrencePaymentMethodEnum } from '@/ports/recurrence'
import {
  Subscription,
  SubscriptionCreditCard,
  SubscriptionDebitCard,
  SubscriptionPix,
  SubscriptionBoleto,
  SubscriptionStatusEnum,
} from '@/core/subscription/subscription.schema'

@Entity('subscriptions')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  subscriptionId: Subscription['subscriptionId']

  @Column({ type: 'uuid' })
  workspaceId: Subscription['workspaceId']

  @Column({ type: 'uuid' })
  planId: Subscription['planId']

  @Column({ type: 'varchar' })
  externalId: Subscription['externalId']

  @Column({ type: 'enum', enum: RecurrencePaymentMethodEnum })
  paymentMethod: Subscription['paymentMethod']

  @Column({ type: 'json' })
  payer?: SubscriptionCreditCard['payer']

  @Column({ type: 'json', nullable: true })
  creditCard?: SubscriptionCreditCard['creditCard']

  @Column({ type: 'json', nullable: true })
  debitCard?: SubscriptionDebitCard['debitCard']

  @Column({ type: 'json', nullable: true })
  pix?: SubscriptionPix['pix']

  @Column({ type: 'json', nullable: true })
  boleto?: SubscriptionBoleto['boleto']

  @Column({ type: 'int' })
  amount: SubscriptionCreditCard['amount']

  @Column({
    type: 'timestamp',
  })
  deadline: Subscription['deadline']

  @Column({
    type: 'timestamp',
  })
  billingDueDate: Subscription['billingDueDate']

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  canceledAt: Subscription['canceledAt']

  @Column({ type: 'enum', enum: SubscriptionStatusEnum, default: SubscriptionStatusEnum.TRIAL })
  status: Subscription['status']

  @CreateDateColumn({})
  createdAt: Subscription['createdAt']

  @UpdateDateColumn({})
  updatedAt: Subscription['updatedAt']
}
