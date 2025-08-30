import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'

import type { IEncryptAdapter } from '@/adapters/encrypt/encrypt.adapter'

@Injectable()
export class BcryptAdapter implements IEncryptAdapter {
	private readonly saltRounds = 10

	hash: IEncryptAdapter['hash'] = (plainText) => {
		return bcrypt.hash(plainText, this.saltRounds)
	}

	compare: IEncryptAdapter['compare'] = (plainText, hash) => {
		return bcrypt.compare(plainText, hash)
	}
}
