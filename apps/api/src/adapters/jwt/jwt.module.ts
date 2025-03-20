import { Module } from '@nestjs/common'

import { JoseModule } from './jose.adapter.module'
import { JWTService } from './jwt.service'

@Module({
  imports: [JoseModule],
  providers: [JWTService],
  exports: [JWTService],
})
export class JWTModule {}
