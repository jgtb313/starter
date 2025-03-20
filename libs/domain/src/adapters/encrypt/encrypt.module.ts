import { Module } from '@nestjs/common'

import { EncryptService } from '@/adapters/encrypt/encrypt.service'
import { BcryptAdapter } from '@/adapters/encrypt/bcrypt.adapter'

@Module({
  providers: [{ provide: 'Encrypt', useClass: BcryptAdapter }, EncryptService],
  exports: [EncryptService],
})
export class EncryptModule {}
