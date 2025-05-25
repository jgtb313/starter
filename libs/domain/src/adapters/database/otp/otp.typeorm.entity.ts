import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { OTP, OTPChannelEnum, OTPContextEnum } from '@/core/otp/otp.schema'

@Entity('otps')
export class OTPEntity {
  @PrimaryGeneratedColumn('uuid')
  otpId: OTP['otpId']

  @Column({ type: 'uuid', nullable: true })
  userId: OTP['userId']

  @Column({ type: 'enum', enum: OTPChannelEnum })
  channel: OTP['channel']

  @Column({ type: 'enum', enum: OTPContextEnum })
  context: OTP['context']

  @Column({ type: 'varchar' })
  recipient: OTP['recipient']

  @Column({ type: 'varchar' })
  code: OTP['code']

  @Column({ type: 'int' })
  attempts: OTP['attempts']

  @Column({ type: 'int' })
  maxAttempts: OTP['maxAttempts']

  @Column({ type: 'int' })
  resendIntervalSeconds: OTP['resendIntervalSeconds']

  @Column({ type: 'int' })
  dailyLimitAttempts: OTP['dailyLimitAttempts']

  @Column({
    type: 'datetime',
  })
  expiresAt: OTP['expiresAt']

  @CreateDateColumn({})
  createdAt: OTP['createdAt']

  @UpdateDateColumn({})
  updatedAt: OTP['updatedAt']
}
