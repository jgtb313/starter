import { extendI18nDict } from '@starter/schema'
import type { NestjsI18nModuleOptions } from '@starter/nestjs-i18n'
import type { I18nDict } from '@starter/i18n'

import { type DynamicModule, Module } from '@nestjs/common'

import { i18nDict } from '@/~i18n/domain.i18n.schema'
import { DomainContextInitializer } from '@/support/base-domain'
import type { CreateDataSourceConfigOptions } from '@/adapters/database/data-source.config'
import { DatabaseModule } from '@/adapters/database/database.module'

import { I18nDomainModule } from './domain.i18n.module'

type DomainModuleOptions = {
	database: CreateDataSourceConfigOptions
	i18n?: (dict: I18nDict) => NestjsI18nModuleOptions<I18nDict>
}

@Module({})
export class DomainModule {
	static register(options: DomainModuleOptions): DynamicModule {
		extendI18nDict(i18nDict)

		return {
			module: DomainModule,
			imports: [
				DatabaseModule.register(options.database),
				I18nDomainModule.register(options.i18n),
			],
			providers: [
				DomainContextInitializer,
			],
			exports: [
				DomainContextInitializer,
			],
		}
	}
}
