import { type DynamicModule, Global, Module } from '@nestjs/common'

export type DatabaseModuleOptions = {}

@Global()
@Module({})
export class DatabaseModule {
	static register(options?: DatabaseModuleOptions): DynamicModule {
		return {
			global: true,
			module: DatabaseModule,
		}
	}
}

export const setupDatabaseTransaction = () => {}
