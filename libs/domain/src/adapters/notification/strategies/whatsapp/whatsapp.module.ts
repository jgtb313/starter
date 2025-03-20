import { Module } from '@nestjs/common'

import { WhatsappStrategy } from './whatsapp.strategy'
import { TwilioWhatsappModule } from './twilio-whatsapp.adapter.module'
import { TwillioWhatsappAdapter } from './twilio-whatsapp.adapter'

@Module({
  imports: [TwilioWhatsappModule],
  providers: [{ provide: 'WHATSAPP', useClass: TwillioWhatsappAdapter }, WhatsappStrategy],
  exports: [WhatsappStrategy],
})
export class WhatsappModule {}
