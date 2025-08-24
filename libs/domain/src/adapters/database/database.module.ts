import { type DynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import {
	type CreateDataSourceConfigOptions,
	createDataSourceConfig,
} from './data-source.config'

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
