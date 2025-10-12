import type { I18nDict } from '@starter/i18n'

import {
	type DynamicModule,
	Global,
	type InjectionToken,
	Module,
	type Scope,
} from '@nestjs/common'

import { I18nService } from './nestjs-i18n.service'

export type NestjsI18nModuleOptions<T extends I18nDict> =
	| {
			dict: T
	  }
	| {
			scope: Scope
			inject: string[]
			useFactory: (...args: any[]) => I18nService<T>
	  }

@Global()
@Module({})
export class NestjsI18nModule {
	static register<T extends I18nDict>(
		provide: InjectionToken,
		options: NestjsI18nModuleOptions<T>,
	): DynamicModule {
		if ('dict' in options) {
			return {
				module: NestjsI18nModule,
				providers: [
					{
						provide,
						useFactory: () => new I18nService(options.dict),
					},
				],
				exports: [
					provide,
				],
			}
		}

		return {
			module: NestjsI18nModule,
			providers: [
				{
					...options,
					provide,
					useFactory: options?.useFactory,
				},
			],
			exports: [
				provide,
			],
		}
	}
}
