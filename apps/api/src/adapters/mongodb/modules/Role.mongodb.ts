import { ClientSession } from 'mongodb'
import { RoleSchema } from '@starter/schema'

import { NotFoundError } from '@/support/errors'
import { Role } from '@/core/role/domain'
import { IRoleRepository } from '@/ports/database/modules/Role.repository'
import { MongoDB, CollectionsTypes } from '../MongoDB.support'

type Document = CollectionsTypes['role']
const RoleSearch = MongoDB.makeSearch<Role['state']>(['name'])

const Pipelines = [] as []

const parseDomain = (model: Document) => {
  return new Role({
    ...model
  })
}

export const role: IRoleRepository = () => ({
  async index(input, options) {
    const $match = MongoDB.makeMatch({
      ...input
    })

    const data = await MongoDB.Collections.role
      .aggregate<Document>(
        [
          ...Pipelines,
          {
            $match
          },
          {
            $sort: {
              name: -1
            }
          }
        ],
        {
          session: options?.session as ClientSession
        }
      )
      .toArray()

    const values = data.map(parseDomain)

    return values
  },

  async find({ offset = 0, limit = 10, sort, ...input }, options) {
    const $match = MongoDB.makeMatch({
      ...input
    })

    const total = 0

    const data = await MongoDB.Collections.role
      .aggregate<Document>(
        [
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
        ],
        {
          session: options?.session as ClientSession
        }
      )
      .toArray()

    const values = data.map((model) => parseDomain(model))

    return {
      values,
      total
    }
  },

  async findById(id, options) {
    const $match = MongoDB.makeMatch({
      id
    })

    const [model] = await MongoDB.Collections.role
      .aggregate<Document>([{ $match }, ...Pipelines], {
        session: options?.session as ClientSession
      })
      .toArray()

    if (!model) {
      throw new NotFoundError(`Role ${id} not found`)
    }

    return parseDomain(model)
  },

  async findOne(input, options) {
    const $match = MongoDB.makeMatch({
      ...input
    })

    const [model] = await MongoDB.Collections.role
      .aggregate<Document>([{ $match }, ...Pipelines], {
        session: options?.session as ClientSession
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
      ...MongoDB.createTimestamps()
    })

    await MongoDB.Collections.role.insertOne(
      {
        ...input,
        search: RoleSearch(state)
      },
      {
        session: options?.session as ClientSession
      }
    )

    return this.findById(state.id, options)
  },

  async updateById(id, { state }, options) {
    const input = RoleSchema.parse({
      ...state,
      ...MongoDB.updateTimestamps()
    })

    const $match = MongoDB.makeMatch({
      id
    })

    await MongoDB.Collections.role.findOneAndUpdate(
      $match,
      {
        $set: {
          ...input,
          search: RoleSearch(state)
        }
      },
      {
        session: options?.session as ClientSession
      }
    )

    return this.findById(id)
  },

  async deleteById(id, options) {
    const $match = MongoDB.makeMatch({
      id
    })

    await MongoDB.Collections.role.findOneAndDelete($match)

    return this.findById(id, options)
  }
})
