import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

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
	permissionId: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
