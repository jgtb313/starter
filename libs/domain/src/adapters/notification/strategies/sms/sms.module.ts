import { Module } from '@nestjs/common'

import { SMSStrategy } from './sms.strategy'
import { TwilioSMSModule } from './twilio-sms.adapter.module'
import { TwilioSMSAdapter } from './twilio-sms.adapter'

@Module({
  imports: [TwilioSMSModule],
  providers: [{ provide: 'SMS', useClass: TwilioSMSAdapter }, SMSStrategy],
  exports: [SMSStrategy],
})
export class SMSModule {}
