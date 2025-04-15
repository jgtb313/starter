import { Injectable, Inject } from '@nestjs/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'

import { IRoleRepository } from '@/ports/database/role'
import { IOrganizationService } from '@/core/organization/organization.service.interface'
import { getRoleWorkspaceReference, IRoleService } from '@/core/role/role.service.interface'

@Injectable()
export class RoleService implements IRoleService {
  constructor(
    @Inject('ROLE_REPOSITORY') private readonly roleRepository: IRoleRepository,
    @Inject('ORGANIZATION_SERVICE') private readonly organizationService: IOrganizationService,
  ) {}

  getPaginatedRoles: IRoleService['getPaginatedRoles'] = async (input) => {
    const result = await this.roleRepository.findAll({
      ...input,
    })

    return result
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

    const role = await this.roleRepository.create({
      ...input,
    })

    return role
  }

  updateRole: IRoleService['updateRole'] = async (reference, input) => {
    const role = await this.getRole(reference)

    const result = await this.roleRepository.updateById(role.roleId, input)

    return result
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
