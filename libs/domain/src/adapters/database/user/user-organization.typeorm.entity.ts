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

@Entity('user_organizations')
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

	@Column({
		type: 'uuid',
	})
	userId: string

	@ManyToOne(
		() => OrganizationEntity,
		(organization) => organization.userOrganizations,
	)
	@JoinColumn({
		name: 'organizationId',
	})
	organization: OrganizationEntity

	@Column({
		type: 'uuid',
	})
	organizationId: string

	@ManyToOne(
		() => RoleEntity,
		(role) => role.roleOrganizations,
	)
	@JoinColumn({
		name: 'roleId',
	})
	role: RoleEntity

	@Column({
		type: 'uuid',
	})
	roleId: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
