import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type {
	Invoice,
	InvoiceBoleto,
	InvoiceCard,
	InvoicePix,
} from '@/core/invoice/invoice.schema'
import { SubscriptionEntity } from '@/adapters/database/subscription/subscription.typeorm.entity'
import { WorkspaceEntity } from '@/adapters/database/workspace/workspace.typeorm.entity'

@Entity('invoice')
export class InvoiceEntity {
	@PrimaryGeneratedColumn('uuid')
	invoiceId: Invoice['invoiceId']

	@ManyToOne(
		() => WorkspaceEntity,
		(workspace) => workspace.invoices,
	)
	@JoinColumn({
		name: 'workspaceId',
	})
	workspace: WorkspaceEntity

	@ManyToOne(
		() => SubscriptionEntity,
		(subscription) => subscription.invoices,
	)
	@JoinColumn({
		name: 'subscriptionId',
	})
	subscription: SubscriptionEntity

	@Column({
		type: 'varchar',
	})
	externalId: Invoice['externalId']

	@Column({
		type: 'varchar',
	})
	description: Invoice['description']

	@Column({
		type: 'varchar',
	})
	paymentMethod: Invoice['paymentMethod']

	@Column({
		type: 'json',
		nullable: true,
	})
	card: InvoiceCard['card']

	@Column({
		type: 'json',
		nullable: true,
	})
	pix: InvoicePix['pix']

	@Column({
		type: 'json',
		nullable: true,
	})
	boleto: InvoiceBoleto['boleto']

	@Column({
		type: 'int',
	})
	amount: Invoice['amount']

	@Column({
		type: 'timestamp',
	})
	issuedAt: Invoice['issuedAt']

	@Column({
		type: 'timestamp',
	})
	dueDate: Invoice['dueDate']

	@Column({
		type: 'timestamp',
		nullable: true,
	})
	paidAt: Invoice['paidAt']

	@Column({
		type: 'timestamp',
		nullable: true,
	})
	overdueAt: Invoice['overdueAt']

	@Column({
		type: 'timestamp',
		nullable: true,
	})
	canceledAt: Invoice['canceledAt']

	@Column({
		type: 'varchar',
	})
	status: Invoice['status']

	@CreateDateColumn({})
	createdAt: Invoice['createdAt']

	@UpdateDateColumn({})
	updatedAt: Invoice['updatedAt']
}
