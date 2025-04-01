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

  async getPaginatedWorkspaces(input: Pagination<Workspace>) {
    const result = await this.workspaceRepository.findAllPaginated(input)

    return result
  }

  async getWorkspace(workspaceId: string) {
    const workspace = await this.workspaceRepository.findById(workspaceId)

    return workspace
  }

  async createWorkspace(user: User, input: BaseWorkspace) {
    if (user.workspaceId) {
      throw new ConflictException('Workspace already exists.')
    }

    const workspace = await this.workspaceRepository.create(input)

    await this.userService.updateUser(user.userId, {
      workspaceId: workspace.workspaceId,
    })

    return workspace
  }

  async updateById(workspaceId: string, input: Partial<Workspace>) {
    const workspace = await this.workspaceRepository.findById(workspaceId)

    const result = await this.workspaceRepository.updateById(workspace.workspaceId, input)

    return result
  }
}
