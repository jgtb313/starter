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
import { RoleOrganizationEntity } from '@/adapters/database/role/role-organization.typeorm.entity'
import { RolePermissionEntity } from '@/adapters/database/role/role-permission.typeorm.entity'
import { UserOrganizationEntity } from '@/adapters/database/user/user-organization.typeorm.entity'
import { WorkspaceEntity } from '@/adapters/database/workspace/workspace.typeorm.entity'

@Entity('role')
export class RoleEntity {
	@PrimaryGeneratedColumn('uuid')
	roleId: Role['roleId']

	@OneToMany(
		() => RoleOrganizationEntity,
		(roleOrganization) => roleOrganization.role,
	)
	roleOrganizations: RoleOrganizationEntity[]

	@OneToMany(
		() => RolePermissionEntity,
		(rolePermission) => rolePermission.role,
	)
	rolePermissions: RolePermissionEntity[]

	@OneToMany(
		() => UserOrganizationEntity,
		(userOrganization) => userOrganization.role,
	)
	userOrganizations: UserOrganizationEntity[]

	@ManyToOne(
		() => WorkspaceEntity,
		(workspace) => workspace.roles,
	)
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

	// permissions: Role['permissions']

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

		// if (this.rolePermissions) {
		// 	this.permissions = this.rolePermissions.map(
		// 		(rolePermission) => rolePermission.permission,
		// 	)
		// }
	}
}
