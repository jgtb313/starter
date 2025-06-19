import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OrganizationTypeorm } from '@/adapters/database/organization/organization.typeorm.adapter'
import { OrganizationEntity } from '@/adapters/database/organization/organization.typeorm.entity'

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationEntity])],
  providers: [
    {
      provide: 'ORGANIZATION_REPOSITORY',
      useClass: OrganizationTypeorm,
    },
  ],
  exports: ['ORGANIZATION_REPOSITORY'],
})
export class OrganizationRepositoryModule {}
