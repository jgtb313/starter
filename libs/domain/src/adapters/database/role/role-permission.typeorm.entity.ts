import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { PermissionEntity } from '@/adapters/database/permission/permission.typeorm.entity'
import { RoleEntity } from '@/adapters/database/role/role.typeorm.entity'
import type { Permission } from '@/core/permission/permission.schema'
import type { Role } from '@/core/role/role.schema'

@Entity('role_permissions')
export class RolePermissionEntity {
	@PrimaryGeneratedColumn('uuid')
	rolePermissionId: string

	@ManyToOne(
		() => RoleEntity,
		(role) => role.rolePermissions,
	)
	role: RoleEntity

	@ManyToOne(
		() => PermissionEntity,
		(permission) => permission.rolePermissions,
	)
	permission: PermissionEntity

	@Column({
		type: 'uuid',
	})
	roleId: Role['roleId']

	@Column({
		type: 'uuid',
	})
	permissionId: Permission['permissionId']

	@DeleteDateColumn()
	deletedAt?: Date

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
