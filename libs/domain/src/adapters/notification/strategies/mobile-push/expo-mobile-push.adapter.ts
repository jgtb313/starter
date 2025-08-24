import { ConflictException, Inject } from '@nestjs/common'
import { Expo } from 'expo-server-sdk'

import type { IMobilePushAdapter } from '@/ports/notification'

export class ExpoMobilePushAdapter implements IMobilePushAdapter {
  constructor(@Inject('EXPO_CLIENT') private readonly client: Expo) {}

  send: IMobilePushAdapter['send'] = async ({ to, body, props }) => {
    if (!Expo.isExpoPushToken(to)) {
      throw new ConflictException(`Invalid Expo push token: ${to}`)
    }

    await this.client.sendPushNotificationsAsync([
      {
        sound: 'default',
        to,
        body,
        data: props,
      },
    ])
  }
}
