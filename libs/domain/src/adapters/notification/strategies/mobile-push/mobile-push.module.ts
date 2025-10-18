import { Module } from '@nestjs/common'

import { ExpoMobilePushAdapter } from '@/adapters/notification/strategies/mobile-push/expo-mobile-push.adapter'
import { ExpoModule } from '@/adapters/notification/strategies/mobile-push/expo-mobile-push.adapter.module'
import { MobilePushStrategy } from '@/adapters/notification/strategies/mobile-push/mobile-push.strategy'

@Module({
	imports: [
		ExpoModule,
	],
	providers: [
		{
			provide: 'MobilePush',
			useClass: ExpoMobilePushAdapter,
		},
		MobilePushStrategy,
	],
	exports: [
		MobilePushStrategy,
	],
})
export class MobilePushModule {}
