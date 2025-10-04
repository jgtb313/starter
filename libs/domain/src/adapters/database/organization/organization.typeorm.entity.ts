import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { RoleEntity } from '@/adapters/database/role/role.typeorm.entity'
import type { Organization } from '@/core/organization/organization.schema'

@Entity('organizations')
export class OrganizationEntity {
	@PrimaryGeneratedColumn('uuid')
	organizationId: Organization['organizationId']

	@ManyToMany(
		() => RoleEntity,
		(role) => role.organizations,
	)
	roles: RoleEntity[]

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

	@DeleteDateColumn({})
	deletedAt: Organization['deletedAt']

	@CreateDateColumn({})
	createdAt: Organization['createdAt']

	@UpdateDateColumn({})
	updatedAt: Organization['updatedAt']
}
