import { forwardRef, Module } from '@nestjs/common'

import { RoleServiceModule } from '@/core/role/role.service.module'
import { UserService } from '@/core/user/user.service'
import { WorkspaceServiceModule } from '@/core/workspace/workspace.service.module'
import { UserRepositoryModule } from '@/adapters/database/user'
import { EncryptModule } from '@/adapters/encrypt'

@Module({
	imports: [
		UserRepositoryModule,
		EncryptModule,
		forwardRef(() => WorkspaceServiceModule),
		forwardRef(() => RoleServiceModule),
	],
	providers: [
		UserService,
	],
	exports: [
		UserService,
	],
})
export class UserServiceModule {}
