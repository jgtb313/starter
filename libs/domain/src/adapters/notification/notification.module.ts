import { Module } from '@nestjs/common'

import { EmailModule, MobilePushModule, SMSModule, WebPushModule, WhatsappModule } from '@/adapters/notification/strategies'
import { NotificationService } from '@/adapters/notification/notification.service'

@Module({
  imports: [EmailModule, MobilePushModule, SMSModule, WebPushModule, WhatsappModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
