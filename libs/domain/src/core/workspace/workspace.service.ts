import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { ConflictException } from '@starter/nestjs-error-handling'

import { IWorkspaceRepository } from '@/ports/database/workspace'
import { IWorkspaceService } from '@/core/workspace/workspace.service.interface'
import { UserService } from '@/core/user/user.service'

@Injectable()
export class WorkspaceService implements IWorkspaceService {
  constructor(
    @Inject('WORKSPACE_REPOSITORY') private readonly workspaceRepository: IWorkspaceRepository,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
  ) {}

  getPaginatedWorkspaces: IWorkspaceService['getPaginatedWorkspaces'] = async (input) => {
    return this.workspaceRepository.findAllPaginated(input)
  }

  getWorkspace: IWorkspaceService['getWorkspace'] = async (workspaceId) => {
    return this.workspaceRepository.findById(workspaceId)
  }

  createWorkspace: IWorkspaceService['createWorkspace'] = async (user, input) => {
    if (user.workspaceId) {
      throw new ConflictException('Workspace already exists.')
    }
    const workspace = await this.workspaceRepository.create(input)

    await this.userService.updateUser(user.userId, {
      workspaceId: workspace.workspaceId,
    })

    return workspace
  }

  updateWorkspace: IWorkspaceService['updateWorkspace'] = async (workspaceId, input) => {
    const workspace = await this.workspaceRepository.findById(workspaceId)

    return this.workspaceRepository.updateById(workspace.workspaceId, input)
  }
}
