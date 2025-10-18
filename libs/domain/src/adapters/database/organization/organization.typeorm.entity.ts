import type { Required } from '@starter/common'

import {
	AfterLoad,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { Organization } from '@/core/organization/organization.schema'
import { RoleOrganizationEntity } from '@/adapters/database/role/role-organization.typeorm.entity'
import { UserOrganizationEntity } from '@/adapters/database/user/user-organization.typeorm.entity'
import { UserPermissionEntity } from '@/adapters/database/user/user-permission.typeorm.entity'
import { WorkspaceEntity } from '@/adapters/database/workspace/workspace.typeorm.entity'

@Entity('organization')
export class OrganizationEntity {
	@PrimaryGeneratedColumn('uuid')
	organizationId: Organization['organizationId']

	@OneToMany(
		() => UserOrganizationEntity,
		(userOrganization) => userOrganization.organization,
	)
	userOrganizations: UserOrganizationEntity[]

	@OneToMany(
		() => RoleOrganizationEntity,
		(roleOrganization) => roleOrganization.organization,
	)
	roleOrganizations: RoleOrganizationEntity[]

	@OneToMany(
		() => UserPermissionEntity,
		(userPermission) => userPermission.organization,
	)
	userPermissions: UserPermissionEntity[]

	@ManyToOne(
		() => WorkspaceEntity,
		(workspace) => workspace.organizations,
	)
	@JoinColumn({
		name: 'workspaceId',
	})
	workspace: WorkspaceEntity

	@Column({
		type: 'varchar',
	})
	name: Organization['name']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	email: Organization['email']

	phone: Organization['phone']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	phoneISO: Required<Organization['phone']>['iso']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	phoneDDI: Required<Organization['phone']>['ddi']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	phoneNumber: Required<Organization['phone']>['number']

	document: Organization['document']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	documentType: Required<Organization['document']>['type']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	documentNumber: Required<Organization['document']>['number']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	logo: Organization['logo']

	@Column({
		type: 'varchar',
		nullable: true,
	})
	domain: Organization['domain']

	@Column({
		type: 'varchar',
	})
	status: Organization['status']

	@CreateDateColumn()
	createdAt: Organization['createdAt']

	@UpdateDateColumn()
	updatedAt: Organization['updatedAt']

	@BeforeInsert()
	@BeforeUpdate()
	mapDocumentToColumns() {
		if (this.phone) {
			this.phoneISO = this.phone.iso
			this.phoneDDI = this.phone.ddi
			this.phoneNumber = this.phone.number
		}

		if (this.document) {
			this.documentType = this.document.type
			this.documentNumber = this.document.number
		}
	}

	@AfterLoad()
	loadDocument() {
		if (this.phoneISO && this.phoneDDI && this.phoneNumber) {
			this.phone = {
				iso: this.phoneISO,
				ddi: this.phoneDDI,
				number: this.phoneNumber,
			}
		}

		if (this.documentType && this.documentNumber) {
			this.document = {
				type: this.documentType,
				number: this.documentNumber,
			}
		}
	}
}
