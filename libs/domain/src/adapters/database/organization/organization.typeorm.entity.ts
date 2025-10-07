import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { RoleOrganizationEntity } from '@/adapters/database/role/role-organization.typeorm.entity'
import type { Organization } from '@/core/organization/organization.schema'

@Entity('organizations')
export class OrganizationEntity {
	@PrimaryGeneratedColumn('uuid')
	organizationId: Organization['organizationId']

	@OneToMany(
		() => RoleOrganizationEntity,
		(roleOrganization) => roleOrganization.organization,
	)
	roleOrganizations: RoleOrganizationEntity[]

	@Column({
		type: 'uuid',
	})
	workspaceId: Organization['workspaceId']

	@Column({
		type: 'varchar',
	})
	name: Organization['name']

	@Column({
		type: 'varchar',
	})
	status: Organization['status']

	@DeleteDateColumn()
	deletedAt: Organization['deletedAt']

	@CreateDateColumn()
	createdAt: Organization['createdAt']

	@UpdateDateColumn()
	updatedAt: Organization['updatedAt']
}
