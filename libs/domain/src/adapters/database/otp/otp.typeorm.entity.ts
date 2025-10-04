import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { UserEntity } from '@/adapters/database/user/user.typeorm.entity'
import type { OTP } from '@/core/otp/otp.schema'

@Entity('otps')
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
	user?: UserEntity

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
		type: 'datetime',
	})
	expiresAt: OTP['expiresAt']

	@CreateDateColumn()
	createdAt: OTP['createdAt']

	@UpdateDateColumn()
	updatedAt: OTP['updatedAt']
}
