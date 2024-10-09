import { ClientSession } from 'mongodb'
import { RoleSchema } from '@starter/schema'

import { NotFoundError } from '@/support/errors'
import { Role } from '@/core/role/domain'
import { IRoleRepository } from '@/ports/database/modules/Role.repository'
import { MongoDB, CollectionsType, ICollections } from '../MongoDB.support'

type Document = ICollections['role']
const RoleSearch = MongoDB.makeSearch<Role['state']>(['name'])

const Pipelines = [] as []

const parseDomain = (model: Document) => {
  return new Role({
    ...model,
  })
}

export const role = (Collections: CollectionsType) => (): ReturnType<IRoleRepository> => ({
  async index(input, options) {
    const $match = MongoDB.makeMatch({
      ...input,
    })

    const data = await Collections.role
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

    const total = await Collections.role
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

    const data = await Collections.role
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

    const [model] = await Collections.role
      .aggregate<Document>([{ $match }, ...Pipelines], {
        session: options?.session as ClientSession,
      })
      .toArray()

    if (!model) {
      throw new NotFoundError(`Role ${id} not found`)
    }

    return parseDomain(model)
  },

  async findOne(input, options) {
    const $match = MongoDB.makeMatch({
      ...input,
    })

    const [model] = await Collections.role
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
    const input = RoleSchema.parse({
      ...state,
      ...MongoDB.createTimestamps(),
    })

    await Collections.role.insertOne(
      {
        ...input,
        search: RoleSearch(state),
      },
      {
        session: options?.session as ClientSession,
      },
    )

    return this.findById(state.id, options)
  },

  async updateById(id, { state }, options) {
    const input = RoleSchema.parse({
      ...state,
      ...MongoDB.updateTimestamps(),
    })

    const $match = MongoDB.makeMatch({
      id,
    })

    await Collections.role.findOneAndUpdate(
      $match,
      {
        $set: {
          ...input,
          search: RoleSearch(state),
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

    await Collections.role.findOneAndDelete($match)

    return this.findById(id, options)
  },
})
