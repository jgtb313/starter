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

@Entity('role_organization')
export class RoleOrganizationEntity {
	@PrimaryGeneratedColumn('uuid')
	roleOrganizationId: string

	@ManyToOne(
		() => RoleEntity,
		(role) => role.roleOrganizations,
	)
	@JoinColumn({
		name: 'roleId',
	})
	role: RoleEntity

	@ManyToOne(
		() => OrganizationEntity,
		(organization) => organization.roleOrganizations,
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
