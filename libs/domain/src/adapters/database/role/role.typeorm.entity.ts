import {
	AfterLoad,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { Role } from '@/core/role/role.schema'
import type { OrganizationEntity } from '@/adapters/database/organization/organization.typeorm.entity'
import type { PermissionEntity } from '@/adapters/database/permission/permission.typeorm.entity'
import type { RoleOrganizationEntity } from '@/adapters/database/role/role-organization.typeorm.entity'
import type { RolePermissionEntity } from '@/adapters/database/role/role-permission.typeorm.entity'
import type { UserOrganizationEntity } from '@/adapters/database/user/user-organization.typeorm.entity'
import type { WorkspaceEntity } from '@/adapters/database/workspace/workspace.typeorm.entity'

@Entity('role')
export class RoleEntity {
	@PrimaryGeneratedColumn('uuid')
	roleId: Role['roleId']

	@OneToMany(
		'RoleOrganizationEntity',
		(roleOrganization: RoleOrganizationEntity) => roleOrganization.role,
	)
	roleOrganizations: RoleOrganizationEntity[]

	@OneToMany(
		'RolePermissionEntity',
		(rolePermission: RolePermissionEntity) => rolePermission.role,
	)
	rolePermissions: RolePermissionEntity[]

	@OneToMany(
		'UserOrganizationEntity',
		(userOrganization: UserOrganizationEntity) => userOrganization.role,
	)
	userOrganizations: UserOrganizationEntity[]

	@ManyToOne('WorkspaceEntity', (workspace: WorkspaceEntity) => workspace.roles)
	@JoinColumn({
		name: 'workspaceId',
	})
	workspace: WorkspaceEntity

	@Column({
		type: 'varchar',
	})
	name: Role['name']

	@Column({
		type: 'simple-array',
		nullable: true,
	})
	tags: Role['tags']

	organizations: OrganizationEntity[]

	permissions: PermissionEntity[]

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
