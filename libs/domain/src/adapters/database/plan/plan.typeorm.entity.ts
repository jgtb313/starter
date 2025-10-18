import {
	AfterLoad,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { Plan } from '@/core/plan/plan.schema'
import { PlanFeatureEntity } from '@/adapters/database/plan/plan-feature.typeorm.entity'
import { PlanIntervalEntity } from '@/adapters/database/plan/plan-interval.typeorm.entity'
import { SubscriptionEntity } from '@/adapters/database/subscription/subscription.typeorm.entity'

@Entity('plan')
export class PlanEntity {
	@PrimaryGeneratedColumn('uuid')
	planId: Plan['planId']

	@OneToMany(
		() => SubscriptionEntity,
		(subscription) => subscription.plan,
	)
	subscriptions: SubscriptionEntity[]

	@OneToMany(
		() => PlanIntervalEntity,
		(planInterval) => planInterval.plan,
	)
	planIntervals: PlanIntervalEntity[]

	@OneToMany(
		() => PlanFeatureEntity,
		(planFeature) => planFeature.plan,
	)
	planFeatures: PlanFeatureEntity[]

	@Column({
		type: 'varchar',
	})
	externalId: Plan['externalId']

	@Column({
		type: 'varchar',
	})
	name: Plan['name']

	@Column({
		type: 'varchar',
	})
	description: Plan['description']

	features: Plan['features']
	intervals: Plan['intervals']

	@Column({
		type: 'boolean',
		default: false,
	})
	highlight: Plan['highlight']

	@Column({
		type: 'varchar',
	})
	status: Plan['status']

	@DeleteDateColumn()
	deletedAt: Plan['deletedAt']

	@CreateDateColumn()
	createdAt: Plan['createdAt']

	@UpdateDateColumn()
	updatedAt: Plan['updatedAt']

	@AfterLoad()
	loadRelations() {
		if (this.planIntervals) {
			this.intervals = this.planIntervals.map((planInterval) => ({
				planIntervalId: planInterval.planIntervalId,
				externalId: planInterval.externalId,
				amount: planInterval.amount,
				interval: planInterval.interval,
				intervalCount: planInterval.intervalCount,
				trialDays: planInterval.trialDays,
				status: planInterval.status,
				deletedAt: planInterval.deletedAt?.toISOString(),
				createdAt: planInterval.createdAt.toISOString(),
				updatedAt: planInterval.updatedAt.toISOString(),
			}))
		}

		if (this.planFeatures) {
			this.features = this.planFeatures.map((planFeature) => ({
				planFeatureId: planFeature.planFeatureId,
				feature: planFeature.feature,
				description: planFeature.description,
				props: planFeature.props,
				createdAt: planFeature.createdAt.toISOString(),
				updatedAt: planFeature.updatedAt.toISOString(),
			}))
		}
	}
}
