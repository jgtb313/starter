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
	avatar: User['avatar']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	socialGoogleId: Required<User['socialGoogleId']>

	@Column({
		type: 'varchar',
		nullable: true,
	})
	socialFacebookId: Required<User['socialFacebookId']>

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
