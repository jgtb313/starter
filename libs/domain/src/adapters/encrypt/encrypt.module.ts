import { Module } from '@nestjs/common'

import { BcryptAdapter } from '@/adapters/encrypt/bcrypt.adapter'
import {
	EncryptService,
	EncryptServiceSymbol,
} from '@/adapters/encrypt/encrypt.service'

@Module({
	providers: [
		{
			provide: EncryptServiceSymbol,
			useClass: BcryptAdapter,
		},
		EncryptService,
	],
	exports: [
		EncryptService,
	],
})
export class EncryptModule {}
