import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

import { RecurrenceIntervalEnum } from '@/ports/recurrence'
import { Plan, PlanStatusEnum } from '@/core/plan/plan.schema'

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

  @Column({ type: 'enum', enum: RecurrenceIntervalEnum })
  interval: Plan['interval']

  @Column({ type: 'int', default: 1 })
  intervalCount: Plan['intervalCount']

  @Column({ type: 'int' })
  trialDays: Plan['trialDays']

  @Column({ type: 'jsonb', nullable: true })
  features: Plan['features']

  @Column({ type: 'boolean', default: false })
  highlight: Plan['highlight']

  @Column({ type: 'enum', enum: PlanStatusEnum, default: PlanStatusEnum.ACTIVE })
  status: Plan['status']

  @DeleteDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date | null) => (value ? value.toISOString() : null),
    },
  })
  deletedAt: Plan['deletedAt']

  @CreateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.toISOString(),
    },
  })
  createdAt: Plan['createdAt']

  @UpdateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.toISOString(),
    },
  })
  updatedAt: Plan['updatedAt']
}
