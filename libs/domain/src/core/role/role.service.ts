import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'

import { IRoleRepository } from '@/ports/database/role'
import { OrganizationService } from '@/core/organization/organization.service'
import { getRoleWorkspaceReference, IRoleService } from '@/core/role/role.service.interface'

@Injectable()
export class RoleService implements IRoleService {
  constructor(
    @Inject('ROLE_REPOSITORY') private readonly roleRepository: IRoleRepository,
    @Inject(forwardRef(() => OrganizationService)) private readonly organizationService: OrganizationService,
  ) {}

  getPaginatedRoles: IRoleService['getPaginatedRoles'] = async (input) => {
    return this.roleRepository.findAll({
      ...input,
    })
  }

  getRole: IRoleService['getRole'] = async (reference) => {
    const { roleId, workspaceId } = getRoleWorkspaceReference(reference)

    const role = await this.roleRepository.findById(roleId)

    if (role.workspaceId !== workspaceId) {
      throw new AclForbiddenException()
    }

    return role
  }

  createRole: IRoleService['createRole'] = async (input) => {
    await this.organizationService.validateOrganizationIds(input.organizationIds)

    return this.roleRepository.create({
      ...input,
    })
  }

  updateRole: IRoleService['updateRole'] = async (reference, input) => {
    const role = await this.getRole(reference)

    return this.roleRepository.updateById(role.roleId, input)
  }

  deleteRole: IRoleService['deleteRole'] = async (reference) => {
    const role = await this.getRole(reference)

    role.deletedAt = new Date()

    await this.roleRepository.updateById(role.roleId, role)
  }

  validateRoleIdsByOrganizationId: IRoleService['validateRoleIdsByOrganizationId'] = async (organizationId, roleIds) => {
    await this.roleRepository.validateIdsByOrganizationId(organizationId, roleIds)
  }
}
