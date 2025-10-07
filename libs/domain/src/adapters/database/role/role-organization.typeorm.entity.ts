import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { OrganizationEntity } from '@/adapters/database/organization/organization.typeorm.entity'
import { RoleEntity } from '@/adapters/database/role/role.typeorm.entity'
import type { Organization } from '@/core/organization/organization.schema'
import type { Role } from '@/core/role/role.schema'

@Entity('role_organizations')
export class RoleOrganizationEntity {
	@PrimaryGeneratedColumn('uuid')
	roleOrganizationId: string

	@ManyToOne(
		() => RoleEntity,
		(role) => role.roleOrganizations,
	)
	role: RoleEntity

	@ManyToOne(
		() => OrganizationEntity,
		(organization) => organization.roleOrganizations,
	)
	organization: OrganizationEntity

	@Column({
		type: 'uuid',
	})
	roleId: Role['roleId']

	@Column({
		type: 'uuid',
	})
	organizationId: Organization['organizationId']

	@DeleteDateColumn()
	deletedAt?: Date

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
