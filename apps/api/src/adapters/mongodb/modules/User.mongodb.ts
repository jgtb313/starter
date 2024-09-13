import { UserSchema } from '@starter/schema'

import { NotFoundError } from '@/support/errors'
import { User } from '@/core/user/domain'
import { IUserRepository } from '@/ports/database/modules/User.repository'
import { MongoDB, CollectionsTypes } from '../MongoDB.support'
import { makeMatch } from '../MongoDB.match'

type Document = CollectionsTypes['user']
const UserSearch = MongoDB.makeSearch<User['state']>(['name', 'email'])

const Pipelines = [] as []

const parseDomain = (model: Document) => {
  return new User({
    ...model
  })
}

export const user: IUserRepository = () => ({
  async find({ offset = 0, limit = 10, sort, ...input }) {
    const $match = makeMatch({
      ...input
    })

    const total = await MongoDB.Collections.user.countDocuments($match)

    const data = await MongoDB.Collections.user
      .aggregate<Document>([
        ...Pipelines,
        {
          $match
        },
        {
          $sort: sort ?? { _id: -1 }
        },
        {
          $skip: offset
        },
        { $limit: limit }
      ])
      .toArray()

    const values = data.map(parseDomain)

    return {
      values,
      total
    }
  },

  async findById(id) {
    const $match = makeMatch({
      id
    })

    const [model] = await MongoDB.Collections.user.aggregate<Document>([{ $match }, ...Pipelines]).toArray()

    if (!model) {
      throw new NotFoundError('Usuário não encontrado')
    }

    return parseDomain(model)
  },

  async findBySocial(strategy, id) {
    const $match = makeMatch({
      [`socialLogin.${String(strategy).toLowerCase()}.id`]: id
    })

    const [model] = await MongoDB.Collections.user
      .aggregate<Document>([
        {
          $match
        },
        ...Pipelines
      ])
      .toArray()

    if (!model) {
      return
    }

    return parseDomain(model)
  },

  async findByEmail(email) {
    const $match = makeMatch({
      email
    })

    const [model] = await MongoDB.Collections.user
      .aggregate<Document>([
        {
          $match
        },
        ...Pipelines
      ])
      .toArray()

    if (!model) {
      return
    }

    return parseDomain(model)
  },

  async emailExists(email, { exclude } = {}) {
    const conditionalExclude = exclude && {
      id: { $ne: exclude }
    }

    const $match = makeMatch({
      ...conditionalExclude,
      email
    })

    const model = await MongoDB.Collections.user.findOne($match)

    return !!model
  },

  async create({ state }) {
    const input = UserSchema.parse({
      ...state,
      ...MongoDB.createTimestamps()
    })

    await MongoDB.Collections.user.insertOne({
      ...input,
      search: UserSearch(state)
    })

    return this.findById(state.id)
  },

  async updateById(id, { state }) {
    const input = UserSchema.parse({
      ...state,
      ...MongoDB.updateTimestamps()
    })

    const $match = makeMatch({
      id
    })

    await MongoDB.Collections.user.findOneAndUpdate($match, {
      $set: {
        ...input,
        search: UserSearch(state)
      }
    })

    return this.findById(id)
  }
})
