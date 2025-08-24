import { Module } from '@nestjs/common'

import { NotificationService } from '@/adapters/notification/notification.service'
import {
	EmailModule,
	MobilePushModule,
	SMSModule,
	WebPushModule,
	WhatsappModule,
} from '@/adapters/notification/strategies'

@Module({
	imports: [
		EmailModule,
		MobilePushModule,
		SMSModule,
		WebPushModule,
		WhatsappModule,
	],
	providers: [
		NotificationService,
	],
	exports: [
		NotificationService,
	],
})
export class NotificationModule {}
