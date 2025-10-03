import { type DynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

import { InvoiceEntity } from '@/adapters/database/invoice/invoice.typeorm.entity'
import { OrganizationEntity } from '@/adapters/database/organization/organization.typeorm.entity'
import { OTPEntity } from '@/adapters/database/otp/otp.typeorm.entity'
import { PermissionEntity } from '@/adapters/database/permission/permission.typeorm.entity'
import { PlanEntity } from '@/adapters/database/plan/plan.typeorm.entity'
import { RoleEntity } from '@/adapters/database/role/role.typeorm.entity'
import { RoleOrganizationEntity } from '@/adapters/database/role/role-organization.typeorm.entity'
import { RolePermissionEntity } from '@/adapters/database/role/role-permission.typeorm.entity'
import { SubscriptionEntity } from '@/adapters/database/subscription/subscription.typeorm.entity'
import { UserEntity } from '@/adapters/database/user/user.typeorm.entity'
import { WorkspaceEntity } from '@/adapters/database/workspace/workspace.typeorm.entity'
import { organizationMocks } from '@/core/organization/organization.mock'
import { permissionMocks } from '@/core/permission/permission.mock'
import { roleMocks } from '@/core/role/role.mock'
import { workspaceMocks } from '@/core/workspace/workspace.mock'
import { DomainFactoryModule } from '@/support/base-domain'

const seedDatabase = async (dataSource: DataSource) => {
	await dataSource
		.getRepository(PermissionEntity)
		.insert(permissionMocks.map((permission) => permission.toJSON()))

	await dataSource
		.getRepository(OrganizationEntity)
		.insert(organizationMocks.map((organization) => organization.toJSON()))

	await dataSource.getRepository(RoleEntity).insert(
		roleMocks.map((role) => {
			const { organizations, permissions, ...state } = role.toJSON()
			return {
				...state,
			}
		}),
	)

	const roleOrganizations = roleMocks.flatMap((role) =>
		role.toJSON().organizations.map((organization) => ({
			roleId: role.toJSON().roleId,
			organizationId: organization.organizationId,
		})),
	)

	const rolePermissions = roleMocks.flatMap((role) =>
		role.toJSON().permissions.map((permission) => ({
			roleId: role.toJSON().roleId,
			permissionId: permission.permissionId,
		})),
	)

	await dataSource
		.getRepository(RoleOrganizationEntity)
		.insert(roleOrganizations)
	await dataSource.getRepository(RolePermissionEntity).insert(rolePermissions)

	await dataSource.getRepository(WorkspaceEntity).insert(workspaceMocks)
}

@Module({})
export class InMemoryDatabaseModule {
	static register(): DynamicModule {
		return {
			module: InMemoryDatabaseModule,
			imports: [
				DomainFactoryModule,
				TypeOrmModule.forRootAsync({
					useFactory: async () => ({
						type: 'better-sqlite3',
						database: ':memory:',
						entities: [
							InvoiceEntity,
							OrganizationEntity,
							OTPEntity,
							PlanEntity,
							RoleEntity,
							RoleOrganizationEntity,
							RolePermissionEntity,
							SubscriptionEntity,
							UserEntity,
							WorkspaceEntity,
							PermissionEntity,
						],
						dropSchema: true,
						synchronize: true,
					}),
				}),
			],
			providers: [
				{
					provide: 'SEED_DATABASE',
					inject: [
						DataSource,
					],
					useFactory: async (dataSource: DataSource) => {
						await seedDatabase(dataSource)
						return true
					},
				},
			],
		}
	}
}
