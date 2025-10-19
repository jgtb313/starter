import type { Required } from '@starter/common'

import {
	AfterLoad,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	RelationId,
	UpdateDateColumn,
} from 'typeorm'

import type { User } from '@/core/user/user.schema'
import { OTPEntity } from '@/adapters/database/otp/otp.typeorm.entity'
import { UserAddressEntity } from '@/adapters/database/user/user-address.typeorm.entity'
import { UserOrganizationEntity } from '@/adapters/database/user/user-organization.typeorm.entity'
import { UserPermissionEntity } from '@/adapters/database/user/user-permission.typeorm.entity'
import { WorkspaceEntity } from '@/adapters/database/workspace/workspace.typeorm.entity'

@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	userId: User['userId']

	@ManyToOne(
		() => WorkspaceEntity,
		(workspace) => workspace.workspaceUsers,
		{
			nullable: true,
		},
	)
	@JoinColumn({
		name: 'workspaceId',
	})
	workspace: WorkspaceEntity | null

	@OneToMany(
		() => OTPEntity,
		(otp) => otp.user,
	)
	otps: OTPEntity[]

	@OneToMany(
		() => UserOrganizationEntity,
		(userOrganization) => userOrganization.user,
	)
	userOrganizations: UserOrganizationEntity[]

	@OneToMany(
		() => UserAddressEntity,
		(userAddress) => userAddress.user,
		{
			cascade: true,
		},
	)
	userAddresses: UserAddressEntity[]

	@OneToMany(
		() => UserPermissionEntity,
		(userPermission) => userPermission.user,
		{
			cascade: true,
		},
	)
	userPermissions: UserPermissionEntity[]

	@RelationId((user: UserEntity) => user.workspace)
	workspaceId: string | null

	@Column({
		type: 'varchar',
		nullable: true,
	})
	googleProviderId: User['googleProviderId']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	facebookProviderId: User['facebookProviderId']

	@Column({
		type: 'varchar',
	})
	name: User['name']

	@Column({
		type: 'varchar',
	})
	email: User['email']

	phone: User['phone']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	phoneISO: string

	@Column({
		type: 'varchar',
		nullable: true,
	})
	phoneDDI: string

	@Column({
		type: 'varchar',
		nullable: true,
	})
	phoneNumber: string

	@Column({
		type: 'date',
		nullable: true,
	})
	birthday: User['birthday']

	document: User['document']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	documentType: Required<User['document']>['type']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	documentNumber: Required<User['document']>['number']

	addresses: User['addresses']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	avatar: User['avatar']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	localePreference: User['localePreference']

	@Column({
		type: 'varchar',
	})
	password: User['password']

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

		if (this.userAddresses) {
			this.addresses = this.userAddresses.map((userAddress) => ({
				title: userAddress.title,
				state: userAddress.state,
				city: userAddress.city,
				zipCode: userAddress.zipCode,
				neighborhood: userAddress.neighborhood,
				street: userAddress.street,
				number: userAddress.number,
				complement: userAddress.complement ?? null,
				landmark: userAddress.landmark ?? null,
				location: {
					lat: userAddress.lat,
					lng: userAddress.lng,
				},
				main: userAddress.main,
			}))
		}
	}
}
