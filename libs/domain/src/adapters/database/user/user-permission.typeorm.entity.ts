import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { OrganizationEntity } from '@/adapters/database/organization/organization.typeorm.entity'
import type { PermissionEntity } from '@/adapters/database/permission/permission.typeorm.entity'
import type { UserEntity } from '@/adapters/database/user/user.typeorm.entity'

@Entity('user_permission')
export class UserPermissionEntity {
	@PrimaryGeneratedColumn('uuid')
	userPermissionId: string

	@ManyToOne('UserEntity', (user: UserEntity) => user.userPermissions)
	@JoinColumn({
		name: 'userId',
	})
	user: UserEntity

	@ManyToOne(
		'PermissionEntity',
		(permission: PermissionEntity) => permission.userPermissions,
	)
	@JoinColumn({
		name: 'permissionId',
	})
	permission: PermissionEntity

	@ManyToOne(
		'OrganizationEntity',
		(organization: OrganizationEntity) => organization.userPermissions,
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
