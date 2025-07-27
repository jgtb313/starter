import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'

import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'
import { IRoleRepository } from '@/ports/database/role'
import { OrganizationService } from '@/core/organization/organization.service'
import { PermissionService } from '@/core/permission/permission.service'
import { RoleStatusEnum } from '@/core/role/role.schema'
import { IRoleService } from '@/core/role/role.service.interface'

export type RoleWorkspaceReference = WithWorkspaceReference<'roleId'>
export const getRoleWorkspaceReference = createWorkspaceReference('roleId')

@Injectable()
export class RoleService implements IRoleService {
  constructor(
    @Inject('ROLE_REPOSITORY') private readonly roleRepository: IRoleRepository,
    @Inject(forwardRef(() => OrganizationService)) private readonly organizationService: OrganizationService,
    @Inject(forwardRef(() => PermissionService)) private readonly permissionService: PermissionService,
  ) {}

  getPaginatedRoles: IRoleService['getPaginatedRoles'] = async (input) => {
    return this.roleRepository.findAllPaginated({
      ...input,
    })
  }

  getRole: IRoleService['getRole'] = async (reference) => {
    const { roleId, workspaceId } = getRoleWorkspaceReference(reference)

    const role = await this.roleRepository.findById(roleId)

    if (role.state.workspaceId !== workspaceId) {
      throw new AclForbiddenException()
    }

    return role
  }

  createRole: IRoleService['createRole'] = async ({ organizationIds, permissions, ...input }) => {
    await this.organizationService.validateOrganizationIds(organizationIds)

    await this.permissionService.validatePermissions(permissions)

    const role = await this.roleRepository.create({
      ...input,
      organizationIds,
      permissions,
      status: RoleStatusEnum.ACTIVE,
    })

    return role
  }

  updateRole: IRoleService['updateRole'] = async (reference, { organizationIds, permissions, ...input }) => {
    const role = await this.getRole(reference)

    if (organizationIds) {
      await this.organizationService.validateOrganizationIds(organizationIds)
    }

    if (permissions) {
      await this.permissionService.validatePermissions(permissions)
    }

    return this.roleRepository.updateById(role.state.roleId, {
      ...input,
      organizationIds,
      permissions,
    })
  }

  activeRole: IRoleService['activeRole'] = async (reference) => {
    const role = await this.getRole(reference)

    role.markAsActive()

    return this.roleRepository.updateById(role.state.roleId, role.state)
  }

  inactiveRole: IRoleService['inactiveRole'] = async (reference) => {
    const role = await this.getRole(reference)

    role.markAsInactive()

    return this.roleRepository.updateById(role.state.roleId, role.state)
  }

  deleteRole: IRoleService['deleteRole'] = async (reference) => {
    const role = await this.getRole(reference)

    await this.roleRepository.deleteById(role.state.roleId)
  }

  validateRoleIdsByOrganizationId: IRoleService['validateRoleIdsByOrganizationId'] = async (organizationId, roleIds) => {
    await this.roleRepository.validateIdsByOrganizationId(organizationId, roleIds)
  }
}
