import { Module } from '@nestjs/common'
import { PlanServiceModule } from '@starter/domain'
import { NestServerHoistingModule } from '@starter/nestjs-server-hoisting'

import { PlanController } from './plan.controller'

const en = {
	hello: 'Hello',
}
const es = {
	hello: 'Hola',
}
const ptBR = {
	hello: 'Olá',
}

@Module({
	imports: [
		NestServerHoistingModule.register({
			i18n: {
				provider: 'API_I18N',
				dict: {
					en,
					es,
					'pt-BR': ptBR,
				},
			},
		}),
		PlanServiceModule,
	],
	controllers: [
		PlanController,
	],
})
export class PlanModule {}
