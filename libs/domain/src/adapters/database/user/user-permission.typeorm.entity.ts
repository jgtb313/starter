import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
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
	@JoinColumn({
		name: 'userId',
	})
	user: UserEntity

	@ManyToOne(
		() => PermissionEntity,
		(permission) => permission.userPermissions,
	)
	@JoinColumn({
		name: 'permissionId',
	})
	permission: PermissionEntity

	@ManyToOne(() => OrganizationEntity, {
		nullable: true,
	})
	@JoinColumn({
		name: 'organizationId',
	})
	organization?: OrganizationEntity

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
