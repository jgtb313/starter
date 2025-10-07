import type { Required } from '@starter/common'
import {
	AfterLoad,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { Workspace } from '@/core/workspace/workspace.schema'
import { WorkspaceAddressEntity } from '@/adapters/database/workspace/workspace-address.typeorm.entity'

@Entity('workspaces')
export class WorkspaceEntity {
	@PrimaryGeneratedColumn('uuid')
	workspaceId: Workspace['workspaceId']

	@OneToOne(
		() => WorkspaceAddressEntity,
		(workspaceAddress) => workspaceAddress.workspace,
	)
	workspaceAddress: WorkspaceAddressEntity

	@Column({
		type: 'varchar',
		nullable: true,
	})
	recurrenceExternalId?: Workspace['recurrenceExternalId']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	name: Workspace['name']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	email?: Workspace['email']

	phone?: Workspace['phone']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	phoneISO?: Required<Workspace['phone']>['iso']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	phoneDDI?: Required<Workspace['phone']>['ddi']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	phoneNumber?: Required<Workspace['phone']>['number']

	document?: Workspace['document']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	documentType?: Required<Workspace['document']>['type']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	documentNumber?: Required<Workspace['document']>['number']

	address?: Workspace['address']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	logo?: Workspace['logo']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	domain?: Workspace['domain']

	@Column({
		type: 'simple-json',
		nullable: true,
	})
	locale?: Workspace['locale']

	@Column({
		type: 'datetime',
		nullable: true,
	})
	trialEndsAt?: Workspace['trialEndsAt']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	status?: Workspace['status']

	@CreateDateColumn({})
	createdAt: Workspace['createdAt']

	@UpdateDateColumn({})
	updatedAt: Workspace['updatedAt']

	@BeforeInsert()
	@BeforeUpdate()
	mapDocumentToColumns() {
		if (this.phone) {
			this.phoneISO = this.phone.iso
			this.phoneDDI = this.phone.ddi
			this.phoneNumber = this.phone.number
		}

		if (this.document) {
			this.documentType = this.document.type
			this.documentNumber = this.document.number
		}
	}

	@AfterLoad()
	loadDocument() {
		if (this.phoneISO && this.phoneDDI && this.phoneNumber) {
			this.phone = {
				iso: this.phoneISO,
				ddi: this.phoneDDI,
				number: this.phoneNumber,
			}
		}

		if (this.documentType && this.documentNumber) {
			this.document = {
				type: this.documentType,
				number: this.documentNumber,
			}
		}

		if (this.workspaceAddress) {
			this.address = {
				state: this.workspaceAddress.state,
				city: this.workspaceAddress.city,
				zipCode: this.workspaceAddress.zipCode,
				neighborhood: this.workspaceAddress.neighborhood,
				street: this.workspaceAddress.street,
				number: this.workspaceAddress.number,
				complement: this.workspaceAddress.complement,
				landmark: this.workspaceAddress.landmark,
				location: {
					lat: this.workspaceAddress.lat,
					lng: this.workspaceAddress.lng,
				},
			}
		}
	}
}
