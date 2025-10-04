import type { Required } from '@starter/common'
import {
	AfterLoad,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { UserOrganizationEntity } from './user-organization.entity'

import type { User } from '@/core/user/user.schema'

@Entity('users')
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	userId: User['userId']

	@OneToMany(
		() => UserOrganizationEntity,
		(userOrganization) => userOrganization.user,
	)
	organizations: UserOrganizationEntity[]

	@Column({
		type: 'uuid',
		nullable: true,
	})
	workspaceId: User['workspaceId']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	googleProviderId?: Required<User['googleProviderId']>

	@Column({
		type: 'varchar',
		nullable: true,
	})
	facebookProviderId?: Required<User['facebookProviderId']>

	@Column({
		type: 'varchar',
	})
	name: User['name']

	@Column({
		type: 'varchar',
	})
	email: User['email']

	phone?: User['phone']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	phoneISO?: string

	@Column({
		type: 'varchar',
		nullable: true,
	})
	phoneDDI?: string

	@Column({
		type: 'varchar',
		nullable: true,
	})
	phoneNumber?: string

	@Column({
		type: 'date',
		nullable: true,
	})
	birthday?: User['birthday']

	document?: User['document']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	documentType?: Required<User['document']>['type']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	documentNumber?: Required<User['document']>['number']

	address?: User['address']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressMain?: Required<User['address']>['main']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressTitle?: Required<User['address']>['title']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressState?: Required<User['address']>['state']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressCity?: Required<User['address']>['city']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressZipCode?: Required<User['address']>['zipCode']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressNeighborhood?: Required<User['address']>['neighborhood']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressStreet?: Required<User['address']>['street']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressNumber?: Required<User['address']>['number']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressComplement?: Required<User['address']>['complement']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressLandmark?: Required<User['address']>['landmark']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressLocationLat?: Required<User['address']>['location']['lat']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressLocationLng?: Required<User['address']>['location']['lng']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	avatar?: User['avatar']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	localePreference?: User['localePreference']

	@Column({
		type: 'varchar',
	})
	password?: User['password']

	@Column({
		type: 'varchar',
	})
	status: User['status']

	@DeleteDateColumn({})
	deletedAt: User['deletedAt']

	@CreateDateColumn({})
	createdAt: User['createdAt']

	@UpdateDateColumn({})
	updatedAt: User['updatedAt']

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
			this.addressMain = this.address.main
			this.addressTitle = this.address.title
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
			this.addressMain &&
			this.addressTitle &&
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
				main: this.addressMain,
				title: this.addressTitle,
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
