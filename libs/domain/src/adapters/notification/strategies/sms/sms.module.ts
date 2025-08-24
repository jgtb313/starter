import { Module } from '@nestjs/common'

import { SMSStrategy } from './sms.strategy'
import { TwilioSMSAdapter } from './twilio-sms.adapter'
import { TwilioSMSModule } from './twilio-sms.adapter.module'

@Module({
	imports: [
		TwilioSMSModule,
	],
	providers: [
		{
			provide: 'SMS',
			useClass: TwilioSMSAdapter,
		},
		SMSStrategy,
	],
	exports: [
		SMSStrategy,
	],
})
export class SMSModule {}
