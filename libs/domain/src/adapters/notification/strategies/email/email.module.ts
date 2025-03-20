import { Module } from '@nestjs/common'

import { EmailStrategy } from './email.strategy'
import { GoogleEmailModule } from './google-email.adapter.module'
import { GoogleEmailAdapter } from './google-email.adapter'

@Module({
  imports: [GoogleEmailModule],
  providers: [EmailStrategy, { provide: 'Email', useClass: GoogleEmailAdapter }],
  exports: [EmailStrategy],
})
export class EmailModule {}
