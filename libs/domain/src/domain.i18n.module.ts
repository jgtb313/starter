import { type DynamicModule, Global, Module } from '@nestjs/common'
import type { I18nDict } from '@starter/i18n'
import {
	NestjsI18nModule,
	type NestjsI18nModuleOptions,
} from '@starter/nestjs-i18n'
import { en, es, ptBR } from 'i18n/i18n.domain'

@Global()
@Module({})
export class I18nDomainModule {
	static forRoot<T extends I18nDict>(
		options?: NestjsI18nModuleOptions<T>,
	): DynamicModule {
		const i18nModule = NestjsI18nModule.register(
			'DOMAIN_I18N',
			{
				en,
				es,
				'pt-BR': ptBR,
			} as unknown as T,
			options,
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
