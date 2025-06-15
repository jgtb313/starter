import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'
import { Pagination } from '@starter/schema'

import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'
import { IRoleRepository } from '@/ports/database/role'
import { OrganizationService } from '@/core/organization/organization.service'
import { Role, BaseRole } from '@/core/role/role.schema'

export type RoleWorkspaceReference = WithWorkspaceReference<'roleId'>
export const getRoleWorkspaceReference = createWorkspaceReference('roleId')

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY') private readonly roleRepository: IRoleRepository,
    @Inject(forwardRef(() => OrganizationService)) private readonly organizationService: OrganizationService,
  ) {}

  async getPaginatedRoles(input: Pagination<Role>) {
    return this.roleRepository.findAllPaginated({
      ...input,
    })
  }

  async getRole(reference: RoleWorkspaceReference) {
    const { roleId, workspaceId } = getRoleWorkspaceReference(reference)

    const role = await this.roleRepository.findById(roleId)

    if (role.state.workspaceId !== workspaceId) {
      throw new AclForbiddenException()
    }

    return role
  }

  async createRole(input: BaseRole) {
    await this.organizationService.validateOrganizationIds(input.organizationIds)

    return this.roleRepository.create({
      ...input,
    })
  }

  async updateRole(reference: RoleWorkspaceReference, input: Partial<Role>) {
    const role = await this.getRole(reference)

    return this.roleRepository.updateById(role.state.roleId, input)
  }

  async activeRole(reference: RoleWorkspaceReference) {
    const role = await this.getRole(reference)

    role.markAsActive()

    return this.roleRepository.updateById(role.state.roleId, role.state)
  }

  async inactiveRole(reference: RoleWorkspaceReference) {
    const role = await this.getRole(reference)

    role.markAsInactive()

    return this.roleRepository.updateById(role.state.roleId, role.state)
  }

  async deleteRole(reference: RoleWorkspaceReference) {
    const role = await this.getRole(reference)

    await this.roleRepository.deleteById(role.state.roleId)
  }

  async validateRoleIdsByOrganizationId(organizationId: string, roleIds: string[]) {
    await this.roleRepository.validateIdsByOrganizationId(organizationId, roleIds)
  }
}
