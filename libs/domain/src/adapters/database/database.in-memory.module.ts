import { DynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

import { InvoiceEntity } from '@/adapters/database/invoice/invoice.typeorm.entity'
import { OrganizationEntity } from '@/adapters/database/organization/organization.typeorm.entity'
import { OTPEntity } from '@/adapters/database/otp/otp.typeorm.entity'
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
              entities: [InvoiceEntity, OrganizationEntity, OTPEntity, WorkspaceEntity],
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
