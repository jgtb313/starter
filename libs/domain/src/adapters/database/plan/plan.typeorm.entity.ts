import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { Plan, PlanIntervalEnum, PlanStatusEnum } from '@/schemas'

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

  @Column({ type: 'enum', enum: PlanIntervalEnum })
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

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Plan['deletedAt']

  @CreateDateColumn()
  createdAt: Plan['createdAt']

  @UpdateDateColumn()
  updatedAt: Plan['updatedAt']
}
