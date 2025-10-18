import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { Plan } from '@/core/plan/plan.schema'
import { PlanEntity } from '@/adapters/database/plan/plan.typeorm.entity'

@Entity('plan_feature')
export class PlanFeatureEntity {
	@PrimaryGeneratedColumn('uuid')
	planFeatureId: Plan['features'][number]['planFeatureId']

	@ManyToOne(
		() => PlanEntity,
		(plan) => plan.planFeatures,
	)
	@JoinColumn({
		name: 'planId',
	})
	plan: PlanEntity

	@Column({
		type: 'varchar',
	})
	feature: Plan['features'][number]['feature']

	@Column({
		type: 'varchar',
	})
	description: Plan['features'][number]['description']

	@Column({
		type: 'json',
	})
	props: Plan['features'][number]['props']

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
