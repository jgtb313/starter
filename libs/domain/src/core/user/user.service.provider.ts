import { IUserRepository } from '@/ports/database/user'
import { EncryptService } from '@/adapters/encrypt'
import { UserService } from './user.service'
import { WorkspaceService } from '../workspace'

export const UserServiceProvider = {
  provide: UserService,
  useFactory: (userRepository: IUserRepository, encrypt: EncryptService, workspaceService: WorkspaceService) =>
    new UserService(userRepository, encrypt, workspaceService),
  inject: ['USER_REPOSITORY', EncryptService, WorkspaceService],
}
