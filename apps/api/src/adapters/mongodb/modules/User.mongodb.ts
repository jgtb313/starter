import { ClientSession } from 'mongodb'
import { UserSchema } from '@starter/schema'

import { NotFoundError } from '@/support/errors'
import { User } from '@/core/user/domain'
import { IUserRepository } from '@/ports/database/modules/User.repository'
import { MongoDB, CollectionsType, ICollections } from '../MongoDB.support'

type Document = ICollections['user']
const UserSearch = MongoDB.makeSearch<User['state']>(['name'])

const Pipelines = [] as []

const parseDomain = (model: Document) => {
  return new User({
    ...model,
  })
}

export const user = (Collections: CollectionsType) => (): ReturnType<IUserRepository> => ({
  async index(input, options) {
    const $match = MongoDB.makeMatch({
      ...input,
    })

    const data = await Collections.user
      .aggregate<Document>(
        [
          ...Pipelines,
          {
            $match,
          },
          {
            $sort: {
              name: -1,
            },
          },
        ],
        {
          session: options?.session as ClientSession,
        },
      )
      .toArray()

    const values = data.map(parseDomain)

    return values
  },

  async find({ offset = 0, limit = 10, sort, ...input }, options) {
    const $match = MongoDB.makeMatch({
      ...input,
    })

    const total = await Collections.user
      .aggregate<{ value: number }>([
        { $match: { status: { $ne: 'DELETED' } } },
        ...Pipelines,
        {
          $match,
        },
        { $group: { _id: null, value: { $sum: 1 } } },
      ])
      .next()
      .then((response) => response?.value ?? 0)

    const data = await Collections.user
      .aggregate<Document>(
        [
          ...Pipelines,
          {
            $match,
          },
          {
            $sort: sort ?? { createdAt: -1 },
          },
          {
            $skip: offset,
          },
          { $limit: limit },
        ],
        {
          session: options?.session as ClientSession,
        },
      )
      .toArray()

    const values = data.map((model) => parseDomain(model))

    return {
      values,
      total,
    }
  },

  async findById(id, options) {
    const $match = MongoDB.makeMatch({
      id,
    })

    const [model] = await Collections.user
      .aggregate<Document>([{ $match }, ...Pipelines], {
        session: options?.session as ClientSession,
      })
      .toArray()

    if (!model) {
      throw new NotFoundError(`User ${id} not found`)
    }

    return parseDomain(model)
  },

  async findOne(input, options) {
    const $match = MongoDB.makeMatch({
      ...input,
    })

    const [model] = await Collections.user
      .aggregate<Document>([{ $match }, ...Pipelines], {
        session: options?.session as ClientSession,
      })
      .toArray()

    if (!model) {
      return
    }

    return parseDomain(model)
  },

  async create({ state }, options) {
    const input = UserSchema.parse({
      ...state,
      ...MongoDB.createTimestamps(),
    }) as User['state']

    await Collections.user.insertOne(
      {
        ...input,
        search: UserSearch(state),
      },
      {
        session: options?.session as ClientSession,
      },
    )

    return this.findById(state.id, options)
  },

  async updateById(id, { state }, options) {
    const input = UserSchema.parse({
      ...state,
      ...MongoDB.updateTimestamps(),
    })

    const $match = MongoDB.makeMatch({
      id,
    })

    await Collections.user.findOneAndUpdate(
      $match,
      {
        $set: {
          ...input,
          search: UserSearch(state),
        },
      },
      {
        session: options?.session as ClientSession,
      },
    )

    return this.findById(id)
  },

  async deleteById(id, options) {
    const $match = MongoDB.makeMatch({
      id,
    })

    await Collections.user.findOneAndDelete($match)

    return this.findById(id, options)
  },
})
