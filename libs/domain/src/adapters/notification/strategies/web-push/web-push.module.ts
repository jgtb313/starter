import { Module } from '@nestjs/common'

import { OneSignalWebPushAdapter } from './one-signal-web-push.adapter'
import { OneSignalWebPushModule } from './one-signal-web-push.adapter.module'
import { WebPushStrategy } from './web-push.strategy'

@Module({
	imports: [
		OneSignalWebPushModule,
	],
	providers: [
		{
			provide: 'WebPush',
			useClass: OneSignalWebPushAdapter,
		},
		WebPushStrategy,
	],
	exports: [
		WebPushStrategy,
	],
})
export class WebPushModule {}
