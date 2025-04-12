import { Module } from '@nestjs/common'

import { NotificationService } from '@/adapters/notification'
import { EmailModule, SMSModule, WhatsappModule, WebPushModule, MobilePushModule } from '@/adapters/notification/strategies'

@Module({
  imports: [EmailModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
