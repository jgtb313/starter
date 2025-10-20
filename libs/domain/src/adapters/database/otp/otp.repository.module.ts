import { Module } from '@nestjs/common'

import { OTPPrisma } from '@/adapters/database/otp/otp.prisma.adapter'

@Module({
	providers: [
		{
			provide: 'OTP_REPOSITORY',
			useClass: OTPPrisma,
		},
	],
	exports: [
		'OTP_REPOSITORY',
	],
})
export class OTPRepositoryModule {}
