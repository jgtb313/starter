import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { Permission } from '@/core/permission/permission.schema'
import type { RolePermissionEntity } from '@/adapters/database/role/role-permission.typeorm.entity'
import type { UserPermissionEntity } from '@/adapters/database/user/user-permission.typeorm.entity'

@Entity('permission')
export class PermissionEntity {
	@PrimaryGeneratedColumn('uuid')
	permissionId: Permission['permissionId']

	@OneToMany(
		'RolePermissionEntity',
		(rolePermission: RolePermissionEntity) => rolePermission.permission,
	)
	rolePermissions: RolePermissionEntity[]

	@OneToMany(
		'UserPermissionEntity',
		(userPermission: UserPermissionEntity) => userPermission.permission,
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
