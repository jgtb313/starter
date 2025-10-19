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

	@Column({
		type: 'varchar',
	})
	permissionId: Permission

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
