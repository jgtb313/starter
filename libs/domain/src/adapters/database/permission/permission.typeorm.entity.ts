import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { Permission } from '@/core/permission/permission.schema'

@Entity('permissions')
export class PermissionEntity {
	@PrimaryGeneratedColumn('uuid')
	permissionId: Permission['permissionId']

	@Column({
		type: 'varchar',
	})
	action: Permission['action']

	@Column({
		type: 'varchar',
	})
	name: Permission['name']

	@Column({
		type: 'varchar',
	})
	description: Permission['description']

	@CreateDateColumn({})
	createdAt: Permission['createdAt']

	@UpdateDateColumn({})
	updatedAt: Permission['updatedAt']
}
