import { DynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { createDataSourceConfig, CreateDataSourceConfigOptions } from './data-source.config'

@Module({})
export class DatabaseModule {
  static register(options: CreateDataSourceConfigOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => createDataSourceConfig(options),
        }),
      ],
    }
  }
}
