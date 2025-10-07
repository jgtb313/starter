import {
	AfterLoad,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { RoleOrganizationEntity } from '@/adapters/database/role/role-organization.typeorm.entity'
import { RolePermissionEntity } from '@/adapters/database/role/role-permission.typeorm.entity'
import type { Role } from '@/core/role/role.schema'

@Entity('roles')
export class RoleEntity {
	@PrimaryGeneratedColumn('uuid')
	roleId: Role['roleId']

	@OneToMany(
		() => RoleOrganizationEntity,
		(roleOrganization) => roleOrganization,
	)
	roleOrganizations: RoleOrganizationEntity[]

	@OneToMany(
		() => RolePermissionEntity,
		(rolePermission) => rolePermission,
	)
	rolePermissions: RolePermissionEntity[]

	@Column({
		type: 'uuid',
	})
	workspaceId: Role['workspaceId']

	@Column({
		type: 'varchar',
	})
	name: Role['name']

	@Column({
		type: 'simple-array',
		nullable: true,
	})
	tags: Role['tags']

	organizations: Role['organizations']

	permissions: Role['permissions']

	@Column({
		type: 'varchar',
	})
	status: Role['status']

	@DeleteDateColumn()
	deletedAt: Role['deletedAt']

	@CreateDateColumn()
	createdAt: Role['createdAt']

	@UpdateDateColumn()
	updatedAt: Role['updatedAt']

	@AfterLoad()
	loadDocument() {
		if (this.roleOrganizations) {
			this.organizations = this.roleOrganizations.map(
				(roleOrganization) => roleOrganization.organization,
			)
		}

		if (this.rolePermissions) {
			this.permissions = this.rolePermissions.map(
				(rolePermission) => rolePermission.permission,
			)
		}
	}
}
