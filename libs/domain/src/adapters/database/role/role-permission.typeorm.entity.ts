import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { Permission } from '@/core/permission/permission.schema'
import type { Role } from '@/core/role/role.schema'
import { PermissionEntity } from '@/adapters/database/permission/permission.typeorm.entity'
import { RoleEntity } from '@/adapters/database/role/role.typeorm.entity'

@Entity('role_permission')
export class RolePermissionEntity {
	@PrimaryGeneratedColumn('uuid')
	rolePermissionId: string

	@ManyToOne(
		() => RoleEntity,
		(role) => role.rolePermissions,
	)
	@JoinColumn({
		name: 'roleId',
	})
	role: RoleEntity

	@ManyToOne(
		() => PermissionEntity,
		(permission) => permission.rolePermissions,
	)
	@JoinColumn({
		name: 'permissionId',
	})
	permission: PermissionEntity

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
