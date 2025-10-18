import { extendI18nDict } from '@starter/schema'

import { type DynamicModule, Module } from '@nestjs/common'
import { vi } from 'vitest'

import { i18nDict } from '@/~i18n/domain.i18n.schema'
import { LoggerService } from '@/adapters/logger/logger.service'
import type { ILogger } from '@/ports/logger/logger.port'
import { I18nDomainModule } from '@/domain.i18n.module'

const loggerServiceMock: ILogger = {
	info: vi.fn(),
	warn: vi.fn(),
	error: vi.fn(),
}

@Module({})
export class DomainTestModule {
	static register(): DynamicModule {
		extendI18nDict(i18nDict)

		const imports = [
			I18nDomainModule.register(),
		]

		return {
			module: DomainTestModule,
			imports,
			providers: [
				{
					provide: LoggerService,
					useValue: loggerServiceMock,
				},
			],
			exports: [
				{
					provide: LoggerService,
					useValue: loggerServiceMock,
				},
			],
		}
	}
}
