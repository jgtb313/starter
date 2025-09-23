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

@Global()
@Module({})
export class I18nDomainModule {
	static forRoot<T extends I18nDict>(
		options?: I18nDomainModuleOptions<T>,
	): DynamicModule {
		const dict = {
			en,
			es,
			'pt-BR': ptBR,
		} as unknown as T

		const i18nModule = NestjsI18nModule.register(
			'DOMAIN_I18N',
			dict as unknown as T,
			options ? options(dict) : undefined,
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
