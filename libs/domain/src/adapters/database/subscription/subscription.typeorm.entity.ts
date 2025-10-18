import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type {
	Subscription,
	SubscriptionCard,
} from '@/core/subscription/subscription.schema'
import { InvoiceEntity } from '@/adapters/database/invoice/invoice.typeorm.entity'
import { PlanEntity } from '@/adapters/database/plan/plan.typeorm.entity'
import { WorkspaceEntity } from '@/adapters/database/workspace/workspace.typeorm.entity'

@Entity('subscription')
export class SubscriptionEntity {
	@PrimaryGeneratedColumn('uuid')
	subscriptionId: Subscription['subscriptionId']

	@ManyToOne(
		() => WorkspaceEntity,
		(workspace) => workspace.subscriptions,
	)
	@JoinColumn({
		name: 'workspaceId',
	})
	workspace: WorkspaceEntity

	@ManyToOne(
		() => PlanEntity,
		(plan) => plan.subscriptions,
	)
	@JoinColumn({
		name: 'planId',
	})
	plan: PlanEntity

	@OneToMany(
		() => InvoiceEntity,
		(invoice) => invoice.subscription,
	)
	invoices: InvoiceEntity[]

	@Column({
		type: 'varchar',
	})
	externalId: Subscription['externalId']

	@Column({
		type: 'varchar',
	})
	paymentMethod: Subscription['paymentMethod']

	@Column({
		type: 'json',
		nullable: true,
	})
	card: SubscriptionCard['card']

	@Column({
		type: 'json',
	})
	payer: Subscription['payer']

	@Column({
		type: 'datetime',
	})
	nextBillingDate: Subscription['nextBillingDate']

	@Column({
		type: 'datetime',
	})
	deadline: Subscription['deadline']

	@Column({
		type: 'datetime',
		nullable: true,
	})
	canceledAt: Subscription['canceledAt']

	@Column({
		type: 'varchar',
	})
	status: Subscription['status']

	@CreateDateColumn({})
	createdAt: Subscription['createdAt']

	@UpdateDateColumn({})
	updatedAt: Subscription['updatedAt']
}
