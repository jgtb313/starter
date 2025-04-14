import { IWorkspaceRepository } from '@/ports/database/workspace'
import { UserService } from '../user'
import { WorkspaceService } from './workspace.service'

export const WorkspaceServiceProvider = {
  provide: WorkspaceService,
  useFactory: (workspaceRepository: IWorkspaceRepository, userService: UserService) => new WorkspaceService(workspaceRepository, userService),
  inject: ['WORKSPACE_REPOSITORY', UserService],
}
