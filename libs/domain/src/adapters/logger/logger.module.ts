import { Module } from '@nestjs/common'

import { LoggerService } from '@/adapters/logger/logger.service'
import { PinoESModule } from '@/adapters/logger/pino-es.adapter.module'
import { PinoESAdapter } from '@/adapters/logger/pino-es.adapter'

@Module({
  imports: [PinoESModule],
  providers: [{ provide: 'Logger', useClass: PinoESAdapter }, LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
