import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { deepMapDatesToISOString } from '@/support/utilities'
import { IPermissionRepository } from '@/ports/database/permission'
import { PermissionEntity } from '@/adapters/database/permission/permission.typeorm.entity'
import { PermissionDomain } from '@/core/permission/permission.domain'

@Injectable()
export class PermissionTypeorm implements IPermissionRepository {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly repository: Repository<PermissionEntity>,
  ) {}

  findAll: IPermissionRepository['findAll'] = async () => {
    const values = await this.repository.find()

    return values.map(this.toPermissionDomain)
  }

  validatePermissionIds: IPermissionRepository['validatePermissionIds'] = async (permissionIds) => {
    const values = await this.repository.find({
      where: {
        permissionId: In(permissionIds),
      },
    })

    if (values.length !== permissionIds.length) {
      throw new NotFoundException(
        'The following permissions were not found: ' +
          permissionIds.filter((permissionId) => !values.some((value) => value.permissionId === permissionId)).join(', '),
      )
    }
  }

  private toPermissionDomain(permission: PermissionEntity): PermissionDomain {
    return new PermissionDomain(deepMapDatesToISOString(permission))
  }
}
