import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { Organization } from '@/core/organization/organization.schema'
import type { Role } from '@/core/role/role.schema'
import type { OrganizationEntity } from '@/adapters/database/organization/organization.typeorm.entity'
import type { RoleEntity } from '@/adapters/database/role/role.typeorm.entity'

@Entity('role_organization')
export class RoleOrganizationEntity {
	@PrimaryGeneratedColumn('uuid')
	roleOrganizationId: string

	@ManyToOne('RoleEntity', (role: RoleEntity) => role.roleOrganizations)
	@JoinColumn({
		name: 'roleId',
	})
	role: RoleEntity

	@ManyToOne(
		'OrganizationEntity',
		(organization: OrganizationEntity) => organization.roleOrganizations,
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
