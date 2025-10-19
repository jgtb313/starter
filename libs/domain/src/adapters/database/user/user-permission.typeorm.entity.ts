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
import { OrganizationEntity } from '@/adapters/database/organization/organization.typeorm.entity'
import { UserEntity } from '@/adapters/database/user/user.typeorm.entity'

@Entity('user_permission')
export class UserPermissionEntity {
	@PrimaryGeneratedColumn('uuid')
	userPermissionId: string

	@ManyToOne(
		() => UserEntity,
		(user) => user.userPermissions,
	)
	@JoinColumn({
		name: 'userId',
	})
	user: UserEntity

	@Column({
		type: 'varchar',
	})
	permissionId: Permission

	@ManyToOne(
		() => OrganizationEntity,
		(organization) => organization.userPermissions,
		{
			nullable: true,
		},
	)
	@JoinColumn({
		name: 'organizationId',
	})
	organization: OrganizationEntity

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
