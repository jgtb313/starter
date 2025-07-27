import { DynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

import { InvoiceEntity } from '@/adapters/database/invoice/invoice.typeorm.entity'
import { OrganizationEntity } from '@/adapters/database/organization/organization.typeorm.entity'
import { OTPEntity } from '@/adapters/database/otp/otp.typeorm.entity'
import { PlanEntity } from '@/adapters/database/plan/plan.typeorm.entity'
import { RoleEntity } from '@/adapters/database/role/role.typeorm.entity'
import { RoleOrganizationEntity } from '@/adapters/database/role/role-organization.typeorm.entity'
import { RolePermissionEntity } from '@/adapters/database/role/role-permission.typeorm.entity'
import { SubscriptionEntity } from '@/adapters/database/subscription/subscription.typeorm.entity'
import { UserEntity } from '@/adapters/database/user/user.typeorm.entity'
import { WorkspaceEntity } from '@/adapters/database/workspace/workspace.typeorm.entity'

@Module({})
export class InMemoryDatabaseModule {
  static register(): DynamicModule {
    return {
      module: InMemoryDatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            const dataSource = new DataSource({
              type: 'sqlite',
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
              ],
              dropSchema: true,
              synchronize: true,
            })

            await dataSource.initialize()

            return dataSource.options
          },
        }),
      ],
    }
  }
}
