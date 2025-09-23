import { type DynamicModule, Module, type Scope } from '@nestjs/common'
import type { I18nDict } from '@starter/i18n'

import { I18nService } from './i18n.service'

export type NestjsI18nModuleOptions<T extends I18nDict> = {
	scope: Scope
	inject: string[]
	useFactory: (...args: any[]) => I18nService<T>
}

@Module({})
export class NestjsI18nModule {
	static register<T extends I18nDict>(
		provide: string,
		dict: T,
		options?: NestjsI18nModuleOptions<T>,
	): DynamicModule {
		return {
			module: NestjsI18nModule,
			providers: [
				{
					provide,
					scope: options?.scope,
					inject: options?.inject,
					useFactory: options?.useFactory
						? options.useFactory
						: () => new I18nService(dict),
				},
			],
			exports: [
				provide,
			],
		}
	}
}
