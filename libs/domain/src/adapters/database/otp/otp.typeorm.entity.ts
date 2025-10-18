import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import type { OTP } from '@/core/otp/otp.schema'
import { UserEntity } from '@/adapters/database/user/user.typeorm.entity'

@Entity('otp')
export class OTPEntity {
	@PrimaryGeneratedColumn('uuid')
	otpId: OTP['otpId']

	@ManyToOne(
		() => UserEntity,
		(user) => user.otps,
		{
			nullable: true,
		},
	)
	@JoinColumn({
		name: 'userId',
	})
	user: UserEntity

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
