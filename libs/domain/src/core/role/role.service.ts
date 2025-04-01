import { Injectable, Inject } from '@nestjs/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'
import { Pagination } from '@starter/schema'

import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'
import { Role, BaseRole } from '@/schemas'
import { IRoleRepository } from '@/ports/database/role'
import { OrganizationService } from '@/core/organization'

type RoleWorkspaceReference = WithWorkspaceReference<'roleId'>
const getRoleWorkspaceReference = createWorkspaceReference('roleId')

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY') private readonly roleRepository: IRoleRepository,
    private readonly organizationService: OrganizationService,
  ) {}

  async getPaginatedRoles(input: Pagination<Role>) {
    const result = await this.roleRepository.findAll({
      ...input,
    })

    return result
  }

  async getRole(reference: RoleWorkspaceReference) {
    const { roleId, workspaceId } = getRoleWorkspaceReference(reference)

    const role = await this.roleRepository.findById(roleId)

    if (role.workspaceId !== workspaceId) {
      throw new AclForbiddenException()
    }

    return role
  }

  async createRole(input: BaseRole) {
    await this.organizationService.validateOrganizationIds(input.organizationIds)

    const role = await this.roleRepository.create({
      ...input,
    })

    return role
  }

  async updateRole(reference: RoleWorkspaceReference, input: Partial<Role>) {
    const role = await this.getRole(reference)

    const result = await this.roleRepository.updateById(role.roleId, input)

    return result
  }

  async deleteRole(reference: RoleWorkspaceReference) {
    const role = await this.getRole(reference)

    role.deletedAt = new Date()

    await this.roleRepository.updateById(role.roleId, role)
  }

  async validateRoleIdsByOrganizationId(organizationId: string, roleIds: string[]) {
    return this.roleRepository.validateIdsByOrganizationId(organizationId, roleIds)
  }
}
