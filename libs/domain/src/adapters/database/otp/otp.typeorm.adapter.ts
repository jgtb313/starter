import { Injectable, NotFoundException } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

import { OTPSchema } from '@/schemas'
import { IOTPRepository } from '@/ports/database/otp'
import { OTPEntity } from './otp.typeorm.entity'

@Injectable()
export class OTPTypeorm implements IOTPRepository {
  private readonly repository: Repository<OTPEntity>

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(OTPEntity)
  }

  findById: IOTPRepository['findById'] = async (otpId) => {
    const model = await this.repository.findOne({ where: { otpId } })

    if (!model) {
      throw new NotFoundException(`OTP ${otpId} not found`)
    }

    return OTPSchema.parse(model)
  }

  findMostRecent: IOTPRepository['findMostRecent'] = async (recipient, context) => {
    const model = await this.repository.findOne({ where: { recipient, context }, order: { createdAt: 'DESC' } })

    if (!model) {
      return null
    }

    return OTPSchema.parse(model)
  }

  countTodayAttempts: IOTPRepository['countTodayAttempts'] = async (recipient, context) => {
    return this.repository.count({ where: { recipient, context } })
  }

  create: IOTPRepository['create'] = async (input) => {
    const data = this.repository.create(input)

    const model = await this.repository.save(data)

    return OTPSchema.parse(model)
  }

  updateById: IOTPRepository['updateById'] = async (otpId, input) => {
    const model = await this.findById(otpId)

    await this.repository.update(model.otpId, input)

    return this.findById(model.otpId)
  }
}
