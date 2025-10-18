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
import type { PermissionEntity } from '@/adapters/database/permission/permission.typeorm.entity'
import type { RoleEntity } from '@/adapters/database/role/role.typeorm.entity'

@Entity('role_permission')
export class RolePermissionEntity {
	@PrimaryGeneratedColumn('uuid')
	rolePermissionId: string

	@ManyToOne('RoleEntity', (role: RoleEntity) => role.rolePermissions)
	@JoinColumn({
		name: 'roleId',
	})
	role: RoleEntity

	@ManyToOne(
		'PermissionEntity',
		(permission: PermissionEntity) => permission.rolePermissions,
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
