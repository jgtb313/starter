import { type DynamicModule, Global, Module } from '@nestjs/common'
import type { I18nDict } from '@starter/i18n'
import {
	type I18nService,
	NestjsI18nModule,
	type NestjsI18nModuleOptions,
} from '@starter/nestjs-i18n'

import { type I18nDomain, i18nDict } from '@/~i18n/domain.i18n'

type I18nDomainModuleOptions<T extends I18nDict> = (
	dict: T,
) => NestjsI18nModuleOptions<T>

export const I18nDomainSymbol = Symbol('DOMAIN_I18N')
export type I18nDomainService = I18nService<I18nDomain>

@Global()
@Module({})
export class I18nDomainModule {
	static register<T extends I18nDict>(
		options?: I18nDomainModuleOptions<T>,
	): DynamicModule {
		const dict = i18nDict as unknown as T

		const nestjsI18nModuleOptions = options
			? options(dict)
			: {
					dict: dict,
				}

		const i18nModule = NestjsI18nModule.register(
			'DOMAIN_I18N',
			nestjsI18nModuleOptions,
		)

		return {
			module: I18nDomainModule,
			imports: [
				i18nModule,
			],
			exports: [
				i18nModule,
			],
		}
	}
}
