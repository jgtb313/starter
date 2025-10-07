import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserTypeorm } from '@/adapters/database/user/user.typeorm.adapter'
import { UserEntity } from '@/adapters/database/user/user.typeorm.entity'
import { UserAddressEntity } from '@/adapters/database/user/user-address.entity'
import { UserOrganizationEntity } from '@/adapters/database/user/user-organization.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([
			UserEntity,
			UserAddressEntity,
			UserOrganizationEntity,
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
