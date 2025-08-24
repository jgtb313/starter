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
		type: 'simple-array',
	})
	scopes: User['scopes']

	@Column({
		type: 'simple-array',
	})
	permissions: User['permissions']

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
		type: 'varchar',
		nullable: true,
	})
	avatar: User['avatar']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	socialGoogleId: Required<User['social']>['googleId']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	socialFacebookId: Required<User['social']>['facebookId']

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
