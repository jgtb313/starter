import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { Subscription, SubscriptionCard } from '@/core/subscription/subscription.schema'

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

  @Column({ type: 'int' })
  amount: Subscription['amount']

  @Column({ type: 'varchar' })
  paymentMethod: Subscription['paymentMethod']

  @Column({ type: 'json', nullable: true })
  card?: SubscriptionCard['card']

  @Column({ type: 'json' })
  payer: Subscription['payer']

  @Column({
    type: 'datetime',
  })
  deadline: Subscription['deadline']

  @Column({
    type: 'datetime',
    nullable: true,
  })
  canceledAt: Subscription['canceledAt']

  @Column({ type: 'varchar' })
  status: Subscription['status']

  @CreateDateColumn({})
  createdAt: Subscription['createdAt']

  @UpdateDateColumn({})
  updatedAt: Subscription['updatedAt']
}
