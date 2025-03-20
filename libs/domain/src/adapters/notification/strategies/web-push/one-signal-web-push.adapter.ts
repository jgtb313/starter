import { Inject } from '@nestjs/common'
import OneSignal from 'onesignal-node'

import { IWebPushAdapter } from '@/ports/notification'

export class OneSignalWebPushAdapter implements IWebPushAdapter {
  constructor(@Inject('ONE_SIGNAL_CLIENT') private readonly client: OneSignal.Client) {}

  send: IWebPushAdapter['send'] = async ({ to, body, props }) => {
    await this.client.createNotification({
      contents: { en: body },
      include_player_ids: [to],
      data: props,
    })
  }
}
