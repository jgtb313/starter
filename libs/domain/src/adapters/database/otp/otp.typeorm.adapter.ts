import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { DeepPartial, Repository } from 'typeorm'
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { deepMapDatesToISOString } from '@/support/utilities'

import { OTPEntity } from '@/adapters/database/otp/otp.typeorm.entity'
import { OTPDomain } from '@/core/otp/otp.domain'
import type { BaseOTP, OTP } from '@/core/otp/otp.schema'
import type { IOTPRepository } from '@/ports/database/otp'

@Injectable()
export class OTPTypeorm implements IOTPRepository {
  constructor(
    @InjectRepository(OTPEntity)
    private readonly repository: Repository<OTPEntity>,
  ) {}

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
    const data = this.repository.create(this.toOTPEntity(input))

    const otp = await this.repository.save(data)

    return this.toOTPDomain(otp)
  }

  updateById: IOTPRepository['updateById'] = async (otpId, input) => {
    const otp = await this.findById(otpId)

    await this.repository.update(otp.state.otpId, this.toPartialOTPEntity(input))

    return this.findById(otp.state.otpId)
  }

  private toOTPEntity(otp: BaseOTP): DeepPartial<OTPEntity> {
    return {
      ...otp,
    }
  }

  private toPartialOTPEntity(otp: Partial<OTP>): QueryDeepPartialEntity<OTPEntity> {
    return {
      ...otp,
    }
  }

  private toOTPDomain(model: OTPEntity) {
    return new OTPDomain(deepMapDatesToISOString(model))
  }
}
