import { Module } from '@nestjs/common'

import { ExpoMobilePushAdapter } from './expo-mobile-push.adapter'
import { ExpoModule } from './expo-mobile-push.adapter.module'
import { MobilePushStrategy } from './mobile-push.strategy'

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
