import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { OTP } from '@/core/otp/otp.schema'

@Entity('otps')
export class OTPEntity {
	@PrimaryGeneratedColumn('uuid')
	otpId: OTP['otpId']

	@Column({
		type: 'uuid',
		nullable: true,
	})
	userId: OTP['userId']

	@Column({
		type: 'varchar',
	})
	channel: OTP['channel']

	@Column({
		type: 'varchar',
	})
	context: OTP['context']

	@Column({
		type: 'varchar',
	})
	recipient: OTP['recipient']

	@Column({
		type: 'varchar',
	})
	code: OTP['code']

	@Column({
		type: 'int',
	})
	validationAttempts: OTP['validationAttempts']

	@Column({
		type: 'int',
	})
	maxValidationAttempts: OTP['maxValidationAttempts']

	@Column({
		type: 'int',
	})
	resendCooldownSeconds: OTP['resendCooldownSeconds']

	@Column({
		type: 'int',
	})
	maxRequestsPerDay: OTP['maxRequestsPerDay']

	@Column({
		type: 'timestamp',
	})
	expiresAt: OTP['expiresAt']

	@CreateDateColumn()
	createdAt: OTP['createdAt']

	@UpdateDateColumn()
	updatedAt: OTP['updatedAt']
}
