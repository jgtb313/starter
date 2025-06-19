import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

import { Plan } from '@/core/plan/plan.schema'

@Entity('plans')
export class PlanEntity {
  @PrimaryGeneratedColumn('uuid')
  planId: Plan['planId']

  @Column({ type: 'varchar' })
  externalId: Plan['externalId']

  @Column({ type: 'varchar' })
  name: Plan['name']

  @Column({ type: 'varchar' })
  description: Plan['description']

  @Column({ type: 'int' })
  amount: Plan['amount']

  @Column({ type: 'varchar' })
  interval: Plan['interval']

  @Column({ type: 'int', default: 1 })
  intervalCount: Plan['intervalCount']

  @Column({ type: 'int' })
  trialDays: Plan['trialDays']

  @Column({ type: 'json', nullable: true })
  features: Plan['features']

  @Column({ type: 'boolean', default: false })
  highlight: Plan['highlight']

  @Column({ type: 'varchar' })
  status: Plan['status']

  @DeleteDateColumn({})
  deletedAt: Plan['deletedAt']

  @CreateDateColumn({})
  createdAt: Plan['createdAt']

  @UpdateDateColumn({})
  updatedAt: Plan['updatedAt']
}
