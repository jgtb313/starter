import { type DynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

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

@Module({})
export class InMemoryDatabaseModule {
	static register(): DynamicModule {
		return {
			module: InMemoryDatabaseModule,
			imports: [
				TypeOrmModule.forRootAsync({
					useFactory: async () => ({
						type: 'better-sqlite3',
						database: ':memory:',
						entities: [
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
						],
						dropSchema: true,
						synchronize: true,
					}),
				}),
			],
		}
	}
}
