import { Global, Module } from '@nestjs/common'

import { i18nProvider } from './nestjs-server-hoisting-i18n.provider'

@Global()
@Module({
	providers: [
		i18nProvider,
	],
	exports: [
		i18nProvider,
	],
})
export class NestServerHoistingModule {}
