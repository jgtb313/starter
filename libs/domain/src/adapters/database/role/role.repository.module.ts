import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RoleTypeorm } from '@/adapters/database/role/role.typeorm.adapter'
import { RoleEntity } from '@/adapters/database/role/role.typeorm.entity'
import { RoleOrganizationEntity } from '@/adapters/database/role/role-organization.typeorm.entity'
import { RolePermissionEntity } from '@/adapters/database/role/role-permission.typeorm.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([
			RoleEntity,
			RoleOrganizationEntity,
			RolePermissionEntity,
		]),
	],
	providers: [
		{
			provide: 'ROLE_REPOSITORY',
			useClass: RoleTypeorm,
		},
	],
	exports: [
		'ROLE_REPOSITORY',
	],
})
export class RoleRepositoryModule {}
