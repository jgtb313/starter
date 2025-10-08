import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { Permission } from '@/core/permission/permission.schema'
import { RolePermissionEntity } from '@/adapters/database/role/role-permission.typeorm.entity'
import { UserPermissionEntity } from '@/adapters/database/user/user-permission.typeorm.entity'

@Entity('permissions')
export class PermissionEntity {
	@PrimaryGeneratedColumn('uuid')
	permissionId: Permission['permissionId']

	@OneToMany(
		() => RolePermissionEntity,
		(rolePermission) => rolePermission.permission,
	)
	rolePermissions: RolePermissionEntity[]

	@OneToMany(
		() => UserPermissionEntity,
		(userPermission) => userPermission.permission,
	)
	userPermissions: UserPermissionEntity[]

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
