import { Injectable, Inject } from '@nestjs/common'
import { ConflictException } from '@starter/nestjs-error-handling'

import { IWorkspaceRepository } from '@/ports/database/workspace'
import { IWorkspaceService } from '@/core/workspace/workspace.service.interface'
import { IUserService } from '@/core/user/user.service.interface'

@Injectable()
export class WorkspaceService implements IWorkspaceService {
  constructor(
    @Inject('WORKSPACE_REPOSITORY') private readonly workspaceRepository: IWorkspaceRepository,
    @Inject('USER_SERVICE') private readonly userService: IUserService,
  ) {}

  getPaginatedWorkspaces: IWorkspaceService['getPaginatedWorkspaces'] = async (input) => {
    const result = await this.workspaceRepository.findAllPaginated(input)

    return result
  }

  getWorkspace: IWorkspaceService['getWorkspace'] = async (workspaceId) => {
    const workspace = await this.workspaceRepository.findById(workspaceId)

    return workspace
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

    const result = await this.workspaceRepository.updateById(workspace.workspaceId, input)

    return result
  }
}
