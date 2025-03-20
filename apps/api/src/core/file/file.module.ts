import { Module } from '@nestjs/common'

import { FileServiceModule } from './file.service.module'
import { FileController } from './file.controller'

@Module({
  imports: [FileServiceModule],
  controllers: [FileController],
})
export class FileModule {}
