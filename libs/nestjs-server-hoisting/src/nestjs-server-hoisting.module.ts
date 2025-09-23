import { type DynamicModule, Global, Module } from '@nestjs/common'
import type { I18nDict } from '@starter/i18n'

import {
	NestjsServerHoistingI18nModule,
	type NestjsServerHoistingI18nModuleOptions,
} from './nestjs-server-hoisting.i18n.module'

type NestjsServerHoistingModuleOptions<T extends I18nDict> = {
	i18n: NestjsServerHoistingI18nModuleOptions<T>
}

@Global()
@Module({})
export class NestServerHoistingModule {
	static register(
		options: NestjsServerHoistingModuleOptions<I18nDict>,
	): DynamicModule {
		return {
			module: NestServerHoistingModule,
			imports: [
				NestjsServerHoistingI18nModule.register(options.i18n),
			],
			global: true,
		}
	}
}
