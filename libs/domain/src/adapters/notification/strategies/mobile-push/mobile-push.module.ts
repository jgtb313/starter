import { Module } from '@nestjs/common'

import { MobilePushStrategy } from './mobile-push.strategy'
import { ExpoModule } from './expo-mobile-push.adapter.module'
import { ExpoMobilePushAdapter } from './expo-mobile-push.adapter'

@Module({
  imports: [ExpoModule],
  providers: [{ provide: 'MobilePush', useClass: ExpoMobilePushAdapter }, MobilePushStrategy],
  exports: [MobilePushStrategy],
})
export class MobilePushModule {}
