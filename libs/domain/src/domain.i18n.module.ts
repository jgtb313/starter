import { type DynamicModule, Global, Module } from '@nestjs/common'
import type { I18nDict } from '@starter/i18n'
import {
	NestjsI18nModule,
	type NestjsI18nModuleOptions,
} from '@starter/nestjs-i18n'
import { en, es, ptBR } from 'i18n/i18n.domain'

type I18nDomainModuleOptions<T extends I18nDict> = (
	dict: T,
) => NestjsI18nModuleOptions<T>

export const I18nServiceSymbol = Symbol('DOMAIN_I18N')

@Global()
@Module({})
export class I18nDomainModule {
	static register<T extends I18nDict>(
		options?: I18nDomainModuleOptions<T>,
	): DynamicModule {
		const dict = {
			en,
			es,
			'pt-BR': ptBR,
		} as unknown as T

		const nestjsI18nModuleOptions = options
			? options(dict)
			: {
					dict,
				}

		const i18nModule = NestjsI18nModule.register(
			I18nServiceSymbol.toString(),
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
