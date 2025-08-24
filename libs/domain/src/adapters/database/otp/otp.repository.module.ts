import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OTPTypeorm } from '@/adapters/database/otp/otp.typeorm.adapter'
import { OTPEntity } from '@/adapters/database/otp/otp.typeorm.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([
			OTPEntity,
		]),
	],
	providers: [
		{
			provide: 'OTP_REPOSITORY',
			useClass: OTPTypeorm,
		},
	],
	exports: [
		'OTP_REPOSITORY',
	],
})
export class OTPRepositoryModule {}
