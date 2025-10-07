import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { RolePermissionEntity } from '@/adapters/database/role/role-permission.typeorm.entity'
import type { Permission } from '@/core/permission/permission.schema'

@Entity('permissions')
export class PermissionEntity {
	@PrimaryGeneratedColumn('uuid')
	permissionId: Permission['permissionId']

	@OneToMany(
		() => RolePermissionEntity,
		(rolePermission) => rolePermission.permission,
	)
	rolePermissions: RolePermissionEntity[]

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

	@CreateDateColumn()
	createdAt: Permission['createdAt']

	@UpdateDateColumn()
	updatedAt: Permission['updatedAt']
}
