import { Module } from '@nestjs/common'

import { TwillioWhatsappAdapter } from './twilio-whatsapp.adapter'
import { TwilioWhatsappModule } from './twilio-whatsapp.adapter.module'
import { WhatsappStrategy } from './whatsapp.strategy'

@Module({
	imports: [
		TwilioWhatsappModule,
	],
	providers: [
		{
			provide: 'WHATSAPP',
			useClass: TwillioWhatsappAdapter,
		},
		WhatsappStrategy,
	],
	exports: [
		WhatsappStrategy,
	],
})
export class WhatsappModule {}
