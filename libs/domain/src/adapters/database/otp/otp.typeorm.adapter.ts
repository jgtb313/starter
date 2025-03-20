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

  dailyCount: IOTPRepository['dailyCount'] = async (recipient, context) => {
    return this.repository.count({ where: { recipient, context } })
  }

  mostRecent: IOTPRepository['mostRecent'] = async (recipient, context) => {
    const model = await this.repository.findOne({ where: { recipient, context }, order: { createdAt: 'DESC' } })

    if (!model) {
      return null
    }

    return OTPSchema.parse(model)
  }

  create: IOTPRepository['create'] = async (input) => {
    const data = this.repository.create(input)

    const model = await this.repository.save(data)

    return OTPSchema.parse(model)
  }

  updateById: IOTPRepository['updateById'] = async (otpId, input) => {
    const otp = await this.findById(otpId)

    await this.repository.update(otp.otpId, input)

    return this.findById(otp.otpId)
  }
}
