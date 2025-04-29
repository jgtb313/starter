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
  resendTime: OTP['resendTime']

  @Column({ type: 'int' })
  dailyLimitAttempts: OTP['dailyLimitAttempts']

  @Column({
    type: 'timestamp',
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.toISOString(),
    },
  })
  expiresIn: OTP['expiresIn']

  @CreateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.toISOString(),
    },
  })
  createdAt: OTP['createdAt']

  @UpdateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.toISOString(),
    },
  })
  updatedAt: OTP['updatedAt']
}
