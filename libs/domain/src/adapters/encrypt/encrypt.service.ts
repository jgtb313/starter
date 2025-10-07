import { Inject, Injectable } from '@nestjs/common'

import type { IEncryptAdapter } from '@/adapters/encrypt/encrypt.adapter'
import type { IEncrypt } from '@/ports/encrypt'

import { EncryptSymbol } from './encrypt.module'

@Injectable()
export class EncryptService implements IEncrypt {
	constructor(
		@Inject(EncryptSymbol) private readonly encrypt: IEncryptAdapter,
	) {}

	hash: IEncrypt['hash'] = (plainText) => {
		return this.encrypt.hash(plainText)
	}

	compare: IEncrypt['compare'] = (plainText, hash) => {
		return this.encrypt.compare(plainText, hash)
	}
}
