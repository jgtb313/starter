import type { Merge } from '@starter/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'
import type { Pagination } from '@starter/schema'

import { forwardRef, Inject, Injectable } from '@nestjs/common'

import {
	createWorkspaceReference,
	type WithWorkspaceReference,
} from '@/support/workspace-reference'
import { OrganizationService } from '@/core/organization/organization.service'
import { PermissionService } from '@/core/permission/permission.service'
import type { IRoleRepository } from '@/ports/database/role'

export type RoleWorkspaceReference = WithWorkspaceReference<'roleId'>
export const getRoleWorkspaceReference = createWorkspaceReference('roleId')

@Injectable()
export class RoleService {
	constructor(
		@Inject('ROLE_REPOSITORY') private readonly roleRepository: IRoleRepository,
		@Inject(forwardRef(() => OrganizationService))
		private readonly organizationService: OrganizationService,
		@Inject(forwardRef(() => PermissionService))
		private readonly permissionService: PermissionService,
	) {}

	getPaginatedRoles = async (
		input: Merge<
			[
				Pagination,
			]
		>,
	) => {
		return this.roleRepository.findPaginated(input)
	}

	getRole = async (reference: RoleWorkspaceReference) => {
		const { roleId, workspaceId } = getRoleWorkspaceReference(reference)

		const role = await this.roleRepository.findById(roleId)

		if (role.state.workspaceId !== workspaceId) {
			throw new AclForbiddenException()
		}

		return role
	}

	createRole = async ({ organizationIds, permissionIds, ...input }: any) => {
		await this.organizationService.validateOrganizationIds(organizationIds)

		await this.permissionService.validatePermissionIds(permissionIds)

		const role = await this.roleRepository.create({
			...input,
			organizationIds,
			permissionIds,
			status: 'ACTIVE',
		})

		return role
	}

	updateRole = async (
		reference: RoleWorkspaceReference,
		{ organizationIds, permissionIds, ...input }: any,
	) => {
		const role = await this.getRole(reference)

		if (organizationIds) {
			await this.organizationService.validateOrganizationIds(organizationIds)
		}

		if (permissionIds) {
			await this.permissionService.validatePermissionIds(permissionIds)
		}

		return this.roleRepository.updateById(role.state.roleId, {
			...input,
			organizationIds,
			permissionIds,
		})
	}

	activateRole = async (reference: RoleWorkspaceReference) => {
		const role = await this.getRole(reference)

		return this.roleRepository.updateById(role.state.roleId, {
			status: 'ACTIVE',
		})
	}

	deactivateRole = async (reference: RoleWorkspaceReference) => {
		const role = await this.getRole(reference)

		return this.roleRepository.updateById(role.state.roleId, {
			status: 'INACTIVE',
		})
	}

	deleteRole = async (reference: RoleWorkspaceReference) => {
		const role = await this.getRole(reference)

		await this.roleRepository.deleteById(role.state.roleId)
	}

	validateRoleIds = async (roleIds: string[]) => {
		await this.roleRepository.validateIds(roleIds)
	}

	validateRoleIdsByOrganizationId = async (
		organizationId: string,
		roleIds: string[],
	) => {
		await this.roleRepository.validateIdsByOrganizationId(
			organizationId,
			roleIds,
		)
	}
}
