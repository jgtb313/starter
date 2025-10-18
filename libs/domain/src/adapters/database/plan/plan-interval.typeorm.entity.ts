import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { Plan } from '@/core/plan/plan.schema'
import type { PlanEntity } from '@/adapters/database/plan/plan.typeorm.entity'

@Entity('plan_interval')
export class PlanIntervalEntity {
	@PrimaryGeneratedColumn('uuid')
	planIntervalId: Plan['intervals'][number]['planIntervalId']

	@ManyToOne('PlanEntity', (plan: PlanEntity) => plan.planIntervals)
	@JoinColumn({
		name: 'planId',
	})
	plan: PlanEntity

	@Column({
		type: 'varchar',
	})
	externalId: Plan['intervals'][number]['externalId']

	@Column({
		type: 'int',
	})
	amount: Plan['intervals'][number]['amount']

	@Column({
		type: 'varchar',
	})
	interval: Plan['intervals'][number]['interval']

	@Column({
		type: 'int',
	})
	intervalCount: Plan['intervals'][number]['intervalCount']

	@Column({
		type: 'int',
	})
	trialDays: Plan['intervals'][number]['trialDays']

	@Column({
		type: 'varchar',
	})
	status: Plan['intervals'][number]['status']

	@DeleteDateColumn()
	deletedAt: Date

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
