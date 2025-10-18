import { Module } from '@nestjs/common'

import { SMSStrategy } from '@/adapters/notification/strategies/sms/sms.strategy'
import { TwilioSMSAdapter } from '@/adapters/notification/strategies/sms/twilio-sms.adapter'
import { TwilioSMSModule } from '@/adapters/notification/strategies/sms/twilio-sms.adapter.module'

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
