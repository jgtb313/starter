import type { Required } from '@starter/common'
import {
	AfterLoad,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { Workspace } from '@/core/workspace/workspace.schema'

@Entity('workspaces')
export class WorkspaceEntity {
	@PrimaryGeneratedColumn('uuid')
	workspaceId: Workspace['workspaceId']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	recurrenceCustomerId?: Workspace['recurrenceCustomerId']

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
	addressState?: Required<Workspace['address']>['state']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressCity?: Required<Workspace['address']>['city']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressZipCode?: Required<Workspace['address']>['zipCode']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressNeighborhood?: Required<Workspace['address']>['neighborhood']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressStreet?: Required<Workspace['address']>['street']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressNumber?: Required<Workspace['address']>['number']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressComplement?: Required<Workspace['address']>['complement']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressLandmark?: Required<Workspace['address']>['landmark']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressLocationLat?: Required<Workspace['address']>['location']['lat']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressLocationLng?: Required<Workspace['address']>['location']['lng']

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

		if (this.address) {
			this.addressState = this.address.state
			this.addressCity = this.address.city
			this.addressZipCode = this.address.zipCode
			this.addressNeighborhood = this.address.neighborhood
			this.addressStreet = this.address.street
			this.addressNumber = this.address.number
			this.addressComplement = this.address.complement
			this.addressLandmark = this.address.landmark
			this.addressLocationLat = this.address.location.lat
			this.addressLocationLng = this.address.location.lng
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

		if (
			this.addressState &&
			this.addressCity &&
			this.addressZipCode &&
			this.addressNeighborhood &&
			this.addressStreet &&
			this.addressNumber &&
			this.addressComplement &&
			this.addressLandmark &&
			this.addressLocationLat &&
			this.addressLocationLng
		) {
			this.address = {
				state: this.addressState,
				city: this.addressCity,
				zipCode: this.addressZipCode,
				neighborhood: this.addressNeighborhood,
				street: this.addressStreet,
				number: this.addressNumber,
				complement: this.addressComplement,
				landmark: this.addressLandmark,
				location: {
					lat: this.addressLocationLat,
					lng: this.addressLocationLng,
				},
			}
		}
	}
}
