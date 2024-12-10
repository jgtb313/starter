import { OTPSchema } from '@starter/schema'
import { startOfToday, endOfToday } from '@starter/shared'

import { NotFoundError } from '../../../domain.errors'
import { OTP } from '../../../core/otp'
import { IOTPRepository } from '../../../ports/database/modules/OTP.repository'
import { MongoDB } from '../MongoDB.support'
import { CollectionsType } from '../MongoDB.collections'

export const otp = (Collections: CollectionsType) => (): ReturnType<IOTPRepository> => ({
  async findById(id) {
    const $match = MongoDB.makeMatch({ id })

    const model = await Collections.otp.findOne($match)

    if (!model) {
      throw new NotFoundError(`OTP ${id} not found`)
    }

    return new OTP(model)
  },

  async dailyCount(email, context) {
    const start = startOfToday()
    const end = endOfToday()

    const $match = MongoDB.makeMatch({ email, context, createdAt: { $gte: start, $lte: end } })

    return Collections.otp.countDocuments($match)
  },

  async mostRecent(email, context) {
    const $match = MongoDB.makeMatch({ email, context })

    const [model] = await Collections.otp.find($match, { sort: { createdAt: -1 } }).toArray()

    if (!model) {
      return
    }

    return new OTP(model)
  },

  async create({ state }) {
    const input = OTPSchema.parse({
      ...state,
      ...MongoDB.createTimestamps(),
    })

    await Collections.otp.insertOne({
      ...input,
      search: {},
    })

    return this.findById(state.id)
  },

  async updateById(id, { state }) {
    const input = OTPSchema.partial().parse({
      ...state,
      ...MongoDB.updateTimestamps(),
    })

    const $match = MongoDB.makeMatch({ id })

    await Collections.otp.findOneAndUpdate($match, { $set: input })

    return this.findById(id)
  },
})
