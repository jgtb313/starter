import { Injectable, Inject } from '@nestjs/common'
import { AclForbiddenException } from '@starter/nestjs-error-handling'
import { Pagination } from '@starter/schema'

import { createWorkspaceReference, WithWorkspaceReference } from '@/support/workspace-reference'
import { Role, BaseRole } from '@/schemas'
import { IRoleRepository } from '@/ports/database/role'

type RoleWorkspaceReference = WithWorkspaceReference<'roleId'>
const getRoleWorkspaceReference = createWorkspaceReference('roleId')

@Injectable()
export class RoleService {
  constructor(@Inject('ROLE_REPOSITORY') private readonly roleRepository: IRoleRepository) {}

  async findAll(input: Pagination<Role>) {
    const result = await this.roleRepository.findAll({
      ...input,
    })

    return result
  }

  async findById(reference: RoleWorkspaceReference) {
    const { roleId, workspaceId } = getRoleWorkspaceReference(reference)

    const role = await this.roleRepository.findById(roleId)

    if (role.workspaceId !== workspaceId) {
      throw new AclForbiddenException()
    }

    return role
  }

  async findOne(input: Partial<Role>) {
    const role = await this.roleRepository.findOne({
      ...input,
    })

    return role
  }

  async create(input: BaseRole) {
    const role = await this.roleRepository.create({
      ...input,
    })

    return role
  }

  async updateById(reference: RoleWorkspaceReference, input: Partial<Role>) {
    const role = await this.findById(reference)

    const result = await this.roleRepository.updateById(role.roleId, input)

    return result
  }

  async deleteById(reference: RoleWorkspaceReference) {
    const role = await this.findById(reference)

    await this.roleRepository.deleteById(role.roleId)
  }

  async validateRoleIds(roleIds: string[]) {
    return this.roleRepository.findByIds(roleIds)
  }
}
