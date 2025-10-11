import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserTypeorm } from '@/adapters/database/user/user.typeorm.adapter'
import { UserEntity } from '@/adapters/database/user/user.typeorm.entity'
import { UserAddressEntity } from '@/adapters/database/user/user-address.typeorm.entity'
import { UserOrganizationEntity } from '@/adapters/database/user/user-organization.typeorm.entity'
import { UserPermissionEntity } from '@/adapters/database/user/user-permission.typeorm.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([
			UserEntity,
			UserAddressEntity,
			UserOrganizationEntity,
			UserPermissionEntity,
		]),
	],
	providers: [
		{
			provide: 'USER_REPOSITORY',
			useClass: UserTypeorm,
		},
	],
	exports: [
		'USER_REPOSITORY',
	],
})
export class UserRepositoryModule {}
