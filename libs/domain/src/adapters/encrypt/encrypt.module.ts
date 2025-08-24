import { Module } from '@nestjs/common'

import { BcryptAdapter } from '@/adapters/encrypt/bcrypt.adapter'
import { EncryptService } from '@/adapters/encrypt/encrypt.service'

@Module({
	providers: [
		{
			provide: 'Encrypt',
			useClass: BcryptAdapter,
		},
		EncryptService,
	],
	exports: [
		EncryptService,
	],
})
export class EncryptModule {}
