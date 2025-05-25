import { Injectable, NotFoundException } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

import { deepMapDatesToISOString } from '@/support/utilities'
import { IOTPRepository } from '@/ports/database/otp'
import { OTPEntity } from '@/adapters/database/otp/otp.typeorm.entity'
import { OTPDomain } from '@/core/otp/otp.domain'

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

    return this.toOTPDomain(otp)
  }

  findMostRecent: IOTPRepository['findMostRecent'] = async (recipient, context) => {
    const otp = await this.repository.findOne({ where: { recipient, context }, order: { createdAt: 'DESC' } })

    if (!otp) {
      return null
    }

    return this.toOTPDomain(otp)
  }

  countTodayAttempts: IOTPRepository['countTodayAttempts'] = async (recipient, context) => {
    return this.repository.count({ where: { recipient, context } })
  }

  create: IOTPRepository['create'] = async (input) => {
    const data = this.repository.create(input)

    const otp = await this.repository.save(data)

    return this.toOTPDomain(otp)
  }

  updateById: IOTPRepository['updateById'] = async (otpId, input) => {
    const otp = await this.findById(otpId)

    await this.repository.update(otp.state.otpId, input)

    return this.findById(otp.state.otpId)
  }

  private toOTPDomain(model: OTPEntity) {
    return new OTPDomain(deepMapDatesToISOString(model))
  }
}
