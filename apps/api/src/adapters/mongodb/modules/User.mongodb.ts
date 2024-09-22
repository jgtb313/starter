import { ClientSession } from 'mongodb'
import { UserSchema } from '@starter/schema'

import { NotFoundError } from '@/support/errors'
import { User } from '@/core/user/domain'
import { IUserRepository } from '@/ports/database/modules/User.repository'
import { MongoDB, CollectionsTypes } from '../MongoDB.support'

type Document = CollectionsTypes['user']
const UserSearch = MongoDB.makeSearch<User['state']>(['name'])

const Pipelines = [] as []

const parseDomain = (model: Document) => {
  return new User({
    ...model
  })
}

export const user: IUserRepository = () => ({
  async index(input) {
    const $match = MongoDB.makeMatch({
      ...input
    })

    const data = await MongoDB.Collections.user
      .aggregate<Document>([
        ...Pipelines,
        {
          $match
        },
        {
          $sort: {
            name: -1
          }
        }
      ])
      .toArray()

    const values = data.map(parseDomain)

    return values
  },

  async find({ offset = 0, limit = 10, sort, ...input }) {
    const $match = MongoDB.makeMatch({
      ...input
    })

    const total = 0

    const data = await MongoDB.Collections.user
      .aggregate<Document>([
        ...Pipelines,
        {
          $match
        },
        {
          $sort: sort ?? { createdAt: -1 }
        },
        {
          $skip: offset
        },
        { $limit: limit }
      ])
      .toArray()

    const values = data.map((model) => parseDomain(model))

    return {
      values,
      total
    }
  },

  async findById(id) {
    const $match = MongoDB.makeMatch({
      id
    })

    const [model] = await MongoDB.Collections.user.aggregate<Document>([{ $match }, ...Pipelines]).toArray()

    if (!model) {
      throw new NotFoundError(`User ${id} not found`)
    }

    return parseDomain(model)
  },

  async create({ state }, options) {
    const input = UserSchema.parse({
      ...state,
      ...MongoDB.createTimestamps()
    })

    await MongoDB.Collections.user.insertOne(
      {
        ...input,
        search: UserSearch(state)
      },
      {
        session: options?.session as ClientSession
      }
    )

    return this.findById(state.id)
  },

  async updateById(id, { state }) {
    const input = UserSchema.parse({
      ...state,
      ...MongoDB.updateTimestamps()
    })

    const $match = MongoDB.makeMatch({
      id
    })

    await MongoDB.Collections.user.findOneAndUpdate($match, {
      $set: {
        ...input,
        search: UserSearch(state)
      }
    })

    return this.findById(id)
  },

  async deleteById(id) {
    const $match = MongoDB.makeMatch({
      id
    })

    await MongoDB.Collections.user.findOneAndDelete($match)

    return this.findById(id)
  }
})
