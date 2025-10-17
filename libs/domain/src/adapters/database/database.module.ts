import { type DynamicModule, Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import {
	addTransactionalDataSource,
	initializeTransactionalContext,
	StorageDriver,
} from 'typeorm-transactional'

import {
	type CreateDataSourceConfigOptions,
	createDataSourceConfig,
} from '@/adapters/database/data-source.config'
// Importar todas as entidades
import { InvoiceEntity } from '@/adapters/database/invoice/invoice.typeorm.entity'
import { OrganizationEntity } from '@/adapters/database/organization/organization.typeorm.entity'
import { OTPEntity } from '@/adapters/database/otp/otp.typeorm.entity'
import { PermissionEntity } from '@/adapters/database/permission/permission.typeorm.entity'
import { PlanEntity } from '@/adapters/database/plan/plan.typeorm.entity'
import { PlanFeatureEntity } from '@/adapters/database/plan/plan-feature.typeorm.entity'
import { PlanIntervalEntity } from '@/adapters/database/plan/plan-interval.typeorm.entity'
import { RoleEntity } from '@/adapters/database/role/role.typeorm.entity'
import { RoleOrganizationEntity } from '@/adapters/database/role/role-organization.typeorm.entity'
import { RolePermissionEntity } from '@/adapters/database/role/role-permission.typeorm.entity'
import { SubscriptionEntity } from '@/adapters/database/subscription/subscription.typeorm.entity'
import { UserEntity } from '@/adapters/database/user/user.typeorm.entity'
import { UserAddressEntity } from '@/adapters/database/user/user-address.typeorm.entity'
import { UserOrganizationEntity } from '@/adapters/database/user/user-organization.typeorm.entity'
import { UserPermissionEntity } from '@/adapters/database/user/user-permission.typeorm.entity'
import { WorkspaceEntity } from '@/adapters/database/workspace/workspace.typeorm.entity'
import { WorkspaceAddressEntity } from '@/adapters/database/workspace/workspace-address.typeorm.entity'

const allEntities = [
	InvoiceEntity,
	OrganizationEntity,
	OTPEntity,
	PermissionEntity,
	PlanEntity,
	PlanFeatureEntity,
	PlanIntervalEntity,
	RoleEntity,
	RoleOrganizationEntity,
	RolePermissionEntity,
	SubscriptionEntity,
	UserEntity,
	UserAddressEntity,
	UserOrganizationEntity,
	UserPermissionEntity,
	WorkspaceEntity,
	WorkspaceAddressEntity,
]

@Global()
@Module({})
export class DatabaseModule {
	static register(options: CreateDataSourceConfigOptions): DynamicModule {
		return {
			global: true,
			module: DatabaseModule,
			imports: [
				TypeOrmModule.forRootAsync({
					useFactory: () => createDataSourceConfig(options),
					async dataSourceFactory(options) {
						return addTransactionalDataSource(new DataSource(options!))
					},
				}),
				TypeOrmModule.forFeature(allEntities),
			],
			exports: [
				TypeOrmModule,
			],
		}
	}
}

export const setupDatabaseTransaction = () => {
	initializeTransactionalContext({
		storageDriver: StorageDriver.AUTO,
	})
}
