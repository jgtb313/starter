import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OTPTypeorm } from './otp.typeorm.adapter'
import { OTPEntity } from './otp.typeorm.entity'

@Module({
  imports: [TypeOrmModule.forFeature([OTPEntity])],
  providers: [
    {
      provide: 'OTP_REPOSITORY',
      useClass: OTPTypeorm,
    },
  ],
  exports: ['OTP_REPOSITORY'],
})
export class OTPRepositoryModule {}
