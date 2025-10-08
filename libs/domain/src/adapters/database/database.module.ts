import { type DynamicModule, Module } from '@nestjs/common'
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

@Module({})
export class DatabaseModule {
	static register(options: CreateDataSourceConfigOptions): DynamicModule {
		return {
			module: DatabaseModule,
			imports: [
				TypeOrmModule.forRootAsync({
					useFactory: () => createDataSourceConfig(options),
					async dataSourceFactory(options) {
						return addTransactionalDataSource(new DataSource(options!))
					},
				}),
			],
		}
	}
}

export const setupDatabaseTransaction = () => {
	initializeTransactionalContext({
		storageDriver: StorageDriver.AUTO,
	})
}
