import { Injectable, NotFoundException } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

import { OTPSchema } from '@/core/otp/otp.schema'
import { IOTPRepository } from '@/ports/database/otp'
import { OTPEntity } from '@/adapters/database/otp/otp.typeorm.entity'

@Injectable()
export class OTPTypeorm implements IOTPRepository {
  private readonly repository: Repository<OTPEntity>

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(OTPEntity)
  }

  findById: IOTPRepository['findById'] = async (otpId) => {
    const otp = await this.repository.findOne({ where: { otpId } })

    if (!otp) {
      throw new NotFoundException(`OTP ${otpId} not found`)
    }

    return OTPSchema.parse(otp)
  }

  findMostRecent: IOTPRepository['findMostRecent'] = async (recipient, context) => {
    const otp = await this.repository.findOne({ where: { recipient, context }, order: { createdAt: 'DESC' } })

    if (!otp) {
      return null
    }

    return OTPSchema.parse(otp)
  }

  countTodayAttempts: IOTPRepository['countTodayAttempts'] = async (recipient, context) => {
    return this.repository.count({ where: { recipient, context } })
  }

  create: IOTPRepository['create'] = async (input) => {
    const data = this.repository.create(input)

    const otp = await this.repository.save(data)

    return OTPSchema.parse(otp)
  }

  updateById: IOTPRepository['updateById'] = async (otpId, input) => {
    const otp = await this.findById(otpId)

    await this.repository.update(otp.otpId, input)

    return this.findById(otp.otpId)
  }
}
