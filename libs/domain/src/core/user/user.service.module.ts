import { forwardRef, Module } from '@nestjs/common'

import { PermissionServiceModule } from '@/core/permission/permission.service.module'
import { UserService } from '@/core/user/user.service'
import { WorkspaceServiceModule } from '@/core/workspace/workspace.service.module'
import { UserRepositoryModule } from '@/adapters/database/user/user.repository.module'
import { EncryptModule } from '@/adapters/encrypt'

@Module({
	imports: [
		UserRepositoryModule,
		EncryptModule,
		forwardRef(() => WorkspaceServiceModule),
		forwardRef(() => PermissionServiceModule),
	],
	providers: [
		UserService,
	],
	exports: [
		UserService,
	],
})
export class UserServiceModule {}
