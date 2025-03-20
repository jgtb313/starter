import { Module } from '@nestjs/common'
import { Expo } from 'expo-server-sdk'

@Module({
  providers: [
    {
      provide: 'EXPO_CLIENT',
      useClass: Expo,
    },
  ],
  exports: ['EXPO_CLIENT'],
})
export class ExpoModule {}
