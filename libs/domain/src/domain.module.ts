import { type DynamicModule, Module } from '@nestjs/common'
import type { I18nDict } from '@starter/i18n'
import type { NestjsI18nModuleOptions } from '@starter/nestjs-i18n'

import { I18nDomainModule } from './domain.i18n.module'

import type { CreateDataSourceConfigOptions } from '@/adapters/database/data-source.config'
import { DatabaseModule } from '@/adapters/database/database.module'

type DomainModuleOptions = {
	database: CreateDataSourceConfigOptions
	i18n?: NestjsI18nModuleOptions<I18nDict>
}

@Module({})
export class DomainModule {
	static register(options: DomainModuleOptions): DynamicModule {
		return {
			module: DomainModule,
			imports: [
				DatabaseModule.register(options.database),
				I18nDomainModule.forRoot(options.i18n),
			],
		}
	}
}
