import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { OrganizationEntity } from '@/adapters/database/organization/organization.typeorm.entity'
import { PermissionEntity } from '@/adapters/database/permission/permission.typeorm.entity'
import { UserEntity } from '@/adapters/database/user/user.typeorm.entity'

@Entity('user_permissions')
export class UserPermissionEntity {
	@PrimaryGeneratedColumn('uuid')
	userPermissionId: string

	@ManyToOne(
		() => UserEntity,
		(user) => user.userPermissions,
	)
	user: UserEntity

	@ManyToOne(
		() => PermissionEntity,
		(permission) => permission.userPermissions,
	)
	permission: PermissionEntity

	@ManyToOne(
		() => OrganizationEntity,
		(organization) => organization.userPermissions,
	)
	organization: OrganizationEntity

	@Column({
		type: 'uuid',
	})
	userId: string

	@Column({
		type: 'uuid',
	})
	permissionId: string

	@Column({
		type: 'uuid',
		nullable: true,
	})
	organizationId?: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
