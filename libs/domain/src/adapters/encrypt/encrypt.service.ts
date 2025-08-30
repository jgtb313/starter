import { Inject, Injectable } from '@nestjs/common'

import type { IEncryptAdapter } from '@/adapters/encrypt/encrypt.adapter'
import type { IEncrypt } from '@/ports/encrypt'

@Injectable()
export class EncryptService implements IEncrypt {
	constructor(@Inject('Encrypt') private readonly encrypt: IEncryptAdapter) {}

	hash: IEncrypt['hash'] = (plainText) => {
		return this.encrypt.hash(plainText)
	}

	compare: IEncrypt['compare'] = (plainText, hash) => {
		return this.encrypt.compare(plainText, hash)
	}
}
