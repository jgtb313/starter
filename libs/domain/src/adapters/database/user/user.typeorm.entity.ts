import type { Required } from '@starter/common'
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { User } from '@/core/user/user.schema'

@Entity('users')
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	userId: User['userId']

	@Column({
		type: 'uuid',
		nullable: true,
	})
	workspaceId: User['workspaceId']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	googleProviderId: Required<User['googleProviderId']>

	@Column({
		type: 'varchar',
		nullable: true,
	})
	facebookProviderId: Required<User['facebookProviderId']>

	@Column({
		type: 'varchar',
	})
	name: User['name']

	@Column({
		type: 'varchar',
	})
	email: User['email']

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

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressMain: Required<User['address']>['main']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressTitle: Required<User['address']>['title']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressState: Required<User['address']>['state']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressCity: Required<User['address']>['city']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressZipCode: Required<User['address']>['zipCode']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressNeighborhood: Required<User['address']>['neighborhood']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressStreet: Required<User['address']>['street']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressNumber: Required<User['address']>['number']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressComplement: Required<User['address']>['complement']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressLandmark: Required<User['address']>['landmark']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressLocationLat: Required<User['address']>['location']['lat']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	addressLocationLng: Required<User['address']>['location']['lng']

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
}
