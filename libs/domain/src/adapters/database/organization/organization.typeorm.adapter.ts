import { Injectable, NotFoundException } from '@nestjs/common'
import { DataSource, Repository, ILike, FindOptionsWhere } from 'typeorm'

import { OrganizationSchema } from '@/schemas'
import { PaginationService } from '@/support/pagination'
import { IOrganizationRepository } from '@/ports/database/organization'
import { OrganizationEntity } from './organization.typeorm.entity'

@Injectable()
export class OrganizationTypeorm implements IOrganizationRepository {
  private readonly repository: Repository<OrganizationEntity>

  constructor(
    private readonly dataSource: DataSource,
    private readonly paginationService: PaginationService,
  ) {
    this.repository = this.dataSource.getRepository(OrganizationEntity)
  }

  findAll: IOrganizationRepository['findAll'] = async ({ offset, limit, ...query }) => {
    const { name, status } = query

    const where: FindOptionsWhere<OrganizationEntity> = {}

    if (name) {
      where.name = ILike(`%${name}%`)
    }

    if (status) {
      where.status = status
    }

    const { values, meta } = await this.paginationService.paginate(this.repository, {
      where,
      offset,
      limit,
    })

    return {
      values: values.map((organization) => OrganizationSchema.parse(organization)),
      meta,
    }
  }

  findById: IOrganizationRepository['findById'] = async (organizationId) => {
    const model = await this.repository.findOne({ where: { organizationId } })

    if (!model) {
      throw new NotFoundException(`Organization ${organizationId} not found`)
    }

    return OrganizationSchema.parse(model)
  }

  findOne: IOrganizationRepository['findOne'] = async (input) => {
    const where = input as FindOptionsWhere<OrganizationEntity>

    const model = await this.repository.findOne({ where })

    if (!model) {
      return null
    }

    return OrganizationSchema.parse(model)
  }

  create: IOrganizationRepository['create'] = async (input) => {
    const data = this.repository.create(input)

    const model = await this.repository.save(data)

    return OrganizationSchema.parse(model)
  }

  updateById: IOrganizationRepository['updateById'] = async (organizationId, input) => {
    const organization = await this.findById(organizationId)

    await this.repository.update(organization.organizationId, input)

    return this.findById(organization.organizationId)
  }

  deleteById: IOrganizationRepository['deleteById'] = async (organizationId) => {
    await this.repository.softDelete({ organizationId })
  }
}
