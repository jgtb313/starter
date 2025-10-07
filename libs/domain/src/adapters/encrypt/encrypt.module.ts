import { Module } from '@nestjs/common'

import { BcryptAdapter } from '@/adapters/encrypt/bcrypt.adapter'
import { EncryptService } from '@/adapters/encrypt/encrypt.service'

export const EncryptSymbol = Symbol('Encrypt')

@Module({
	providers: [
		{
			provide: EncryptSymbol,
			useClass: BcryptAdapter,
		},
		EncryptService,
	],
	exports: [
		EncryptService,
	],
})
export class EncryptModule {}
