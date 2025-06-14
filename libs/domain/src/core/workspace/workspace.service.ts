import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { ConflictException } from '@starter/nestjs-error-handling'
import { Pagination } from '@starter/schema'

import { IWorkspaceRepository } from '@/ports/database/workspace'
import { UserService } from '@/core/user/user.service'
import { User } from '@/core/user/user.schema'
import { Workspace, BaseWorkspace } from '@/core/workspace/workspace.schema'

@Injectable()
export class WorkspaceService {
  constructor(
    @Inject('WORKSPACE_REPOSITORY') private readonly workspaceRepository: IWorkspaceRepository,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
  ) {}

  async getPaginatedWorkspaces(input: Pagination<Workspace>) {
    return this.workspaceRepository.findAllPaginated(input)
  }

  async getWorkspace(workspaceId: string) {
    return this.workspaceRepository.findById(workspaceId)
  }

  async createWorkspace(user: User, input: Omit<BaseWorkspace, 'integrations'>) {
    if (user.workspaceId) {
      throw new ConflictException('Workspace already exists.')
    }

    const workspace = await this.workspaceRepository.create(input)

    await this.userService.updateUser(user.userId, {
      workspaceId: workspace.state.workspaceId,
    })

    return workspace
  }

  async updateWorkspace(workspaceId: string, input: Partial<Workspace>) {
    const workspace = await this.workspaceRepository.findById(workspaceId)

    return this.workspaceRepository.updateById(workspace.state.workspaceId, input)
  }

  async activeWorkspace(workspaceId: string) {
    const workspace = await this.getWorkspace(workspaceId)

    workspace.markAsActive()

    return this.workspaceRepository.updateById(workspace.state.workspaceId, workspace.state)
  }

  async inactiveWorkspace(workspaceId: string) {
    const workspace = await this.getWorkspace(workspaceId)

    workspace.markAsInactive()

    return this.workspaceRepository.updateById(workspace.state.workspaceId, workspace.state)
  }
}
