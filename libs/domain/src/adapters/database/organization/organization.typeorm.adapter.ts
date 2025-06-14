import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike, In, FindOptionsWhere } from 'typeorm'
import { PaginationSchemaTransform } from '@starter/schema'

import { deepMapDatesToISOString } from '@/support/utilities'
import { IOrganizationRepository } from '@/ports/database/organization'
import { OrganizationEntity } from '@/adapters/database/organization/organization.typeorm.entity'
import { OrganizationDomain } from '@/core/organization/organization.domain'

@Injectable()
export class OrganizationTypeorm implements IOrganizationRepository {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly repository: Repository<OrganizationEntity>,
  ) {}

  findAllPaginated: IOrganizationRepository['findAllPaginated'] = async ({ offset, limit, ...input }) => {
    const { name, status } = input

    const where: FindOptionsWhere<OrganizationEntity> = {}

    if (name) {
      where.name = ILike(`%${name}%`)
    }

    if (status) {
      where.status = status
    }

    const paginate = PaginationSchemaTransform.parse({ offset, limit })

    const skip = paginate.offset
    const take = paginate.limit

    const [values, total] = await this.repository.findAndCount({
      where,
      take,
      skip,
    })

    return {
      values: values.map((organization) => this.toOrganizationDomain(organization)),
      meta: {
        ...paginate,
        total,
      },
    }
  }

  findAll: IOrganizationRepository['findAll'] = async (input) => {
    const { name, status } = input

    const where: FindOptionsWhere<OrganizationEntity> = {}

    if (name) {
      where.name = ILike(`%${name}%`)
    }

    if (status) {
      where.status = status
    }

    const values = await this.repository.find({ where })

    return values.map((organization) => this.toOrganizationDomain(organization))
  }

  findById: IOrganizationRepository['findById'] = async (organizationId) => {
    const organization = await this.repository.findOne({ where: { organizationId } })

    if (!organization) {
      throw new NotFoundException(`Organization ${organizationId} not found`)
    }

    return this.toOrganizationDomain(organization)
  }

  create: IOrganizationRepository['create'] = async (input) => {
    const data = this.repository.create(input)

    const organization = await this.repository.save(data)

    return this.toOrganizationDomain(organization)
  }

  updateById: IOrganizationRepository['updateById'] = async (organizationId, input) => {
    const organization = await this.findById(organizationId)

    await this.repository.update(organization.state.organizationId, input)

    return this.findById(organization.state.organizationId)
  }

  deleteById: IOrganizationRepository['deleteById'] = async (organizationId) => {
    const organization = await this.findById(organizationId)

    await this.repository.softDelete({ organizationId: organization.state.organizationId })
  }

  validateIds: IOrganizationRepository['validateIds'] = async (organizationIds) => {
    const organizations = await this.repository.find({ where: { organizationId: In(organizationIds) } })

    const foundOrganizationIds = organizations.map((organization) => organization.organizationId)
    const missingOrganizationIds = organizationIds.filter((organizationId) => !foundOrganizationIds.includes(organizationId))

    if (missingOrganizationIds.length) {
      throw new NotFoundException(`The following organizationIds were not found: ${missingOrganizationIds.join(', ')}`)
    }
  }

  private toOrganizationDomain(model: OrganizationEntity) {
    return new OrganizationDomain(deepMapDatesToISOString(model))
  }
}
