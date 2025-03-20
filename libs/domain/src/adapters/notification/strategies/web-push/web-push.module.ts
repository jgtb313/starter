import { Module } from '@nestjs/common'

import { WebPushStrategy } from './web-push.strategy'
import { OneSignalWebPushModule } from './one-signal-web-push.adapter.module'
import { OneSignalWebPushAdapter } from './one-signal-web-push.adapter'

@Module({
  imports: [OneSignalWebPushModule],
  providers: [{ provide: 'WebPush', useClass: OneSignalWebPushAdapter }, WebPushStrategy],
  exports: [WebPushStrategy],
})
export class WebPushModule {}
