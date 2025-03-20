import { Injectable, Inject } from '@nestjs/common'

import { IEncrypt } from '@/ports/encrypt'

@Injectable()
export class EncryptService implements IEncrypt {
  constructor(@Inject('Encrypt') private readonly encrypt: IEncrypt) {}

  hash: IEncrypt['hash'] = (plainText) => {
    return this.encrypt.hash(plainText)
  }

  compare: IEncrypt['compare'] = (plainText, hash) => {
    return this.encrypt.compare(plainText, hash)
  }
}
