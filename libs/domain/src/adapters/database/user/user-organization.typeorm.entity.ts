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
import { RoleEntity } from '@/adapters/database/role/role.typeorm.entity'
import { UserEntity } from '@/adapters/database/user/user.typeorm.entity'

@Entity('user_organization')
export class UserOrganizationEntity {
	@PrimaryGeneratedColumn('uuid')
	userOrganizationId: string

	@ManyToOne(
		() => UserEntity,
		(user) => user.userOrganizations,
	)
	@JoinColumn({
		name: 'userId',
	})
	user: UserEntity

	@ManyToOne(
		() => OrganizationEntity,
		(organization) => organization.userOrganizations,
	)
	@JoinColumn({
		name: 'organizationId',
	})
	organization: OrganizationEntity

	@ManyToOne(
		() => RoleEntity,
		(role) => role.userOrganizations,
	)
	@JoinColumn({
		name: 'roleId',
	})
	role: RoleEntity

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
