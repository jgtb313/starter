import { Injectable, Inject } from '@nestjs/common'
import { ConflictException } from '@starter/nestjs-error-handling'
import { Pagination } from '@starter/schema'

import { User, Workspace, BaseWorkspace } from '@/schemas'
import { IWorkspaceRepository } from '@/ports/database/workspace'
import { UserService } from '@/core/user'

@Injectable()
export class WorkspaceService {
  constructor(
    @Inject('WORKSPACE_REPOSITORY') private readonly workspaceRepository: IWorkspaceRepository,
    private readonly userService: UserService,
  ) {}

  async findAll(input: Pagination<Workspace>) {
    const result = await this.workspaceRepository.findAll(input)

    return result
  }

  async findById(workspaceId: string) {
    const workspace = await this.workspaceRepository.findById(workspaceId)

    return workspace
  }

  async findOne(input: Partial<Workspace>) {
    const workspace = await this.workspaceRepository.findOne(input)

    return workspace
  }

  async create(user: User, input: BaseWorkspace) {
    if (user.workspaceId) {
      throw new ConflictException('Workspace already exists.')
    }

    const workspace = await this.workspaceRepository.create(input)

    await this.userService.updateById(user.userId, {
      workspaceId: workspace.workspaceId,
    })

    return workspace
  }

  async updateById(workspaceId: string, input: Partial<Workspace>) {
    const workspace = await this.workspaceRepository.findById(workspaceId)

    const result = await this.workspaceRepository.updateById(workspace.workspaceId, input)

    return result
  }

  async deleteById(workspaceId: string) {
    await this.workspaceRepository.deleteById(workspaceId)
  }
}
