import { ClientSession } from 'mongodb'
import { CategorySchema } from '@starter/schema'

import { NotFoundError } from '@/support/errors'
import { Category } from '@/core/category/domain'
import { ICategoryRepository } from '@/ports/database/modules/Category.repository'
import { MongoDB, CollectionsTypes } from '../MongoDB.support'

type Document = CollectionsTypes['category']
const CategorySearch = MongoDB.makeSearch<Category['state']>(['name'])

const Pipelines = [] as []

const parseDomain = (model: Document) => {
  return new Category({
    ...model
  })
}

export const category: ICategoryRepository = () => ({
  async index(input, options) {
    const $match = MongoDB.makeMatch({
      ...input
    })

    const data = await MongoDB.Collections.category
      .aggregate<Document>(
        [
          { $match: { status: { $ne: 'DELETED' } } },
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

    const data = await MongoDB.Collections.category
      .aggregate<Document>(
        [
          { $match: { status: { $ne: 'DELETED' } } },
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

    const [model] = await MongoDB.Collections.category
      .aggregate<Document>([{ $match: { status: { $ne: 'DELETED' } } }, { $match }, ...Pipelines], {
        session: options?.session as ClientSession
      })
      .toArray()

    if (!model) {
      throw new NotFoundError(`Category ${id} not found`)
    }

    return parseDomain(model)
  },

  async findOne(input, options) {
    const $match = MongoDB.makeMatch({
      ...input
    })

    const [model] = await MongoDB.Collections.category
      .aggregate<Document>([{ $match: { status: { $ne: 'DELETED' } } }, ...Pipelines, { $match }], {
        session: options?.session as ClientSession
      })
      .toArray()

    if (!model) {
      return
    }

    return parseDomain(model)
  },

  async create({ state }, options) {
    const input = CategorySchema.parse({
      ...state,
      ...MongoDB.createTimestamps()
    })

    await MongoDB.Collections.category.insertOne(
      {
        ...input,
        search: CategorySearch(state)
      },
      {
        session: options?.session as ClientSession
      }
    )

    return this.findById(state.id, options)
  },

  async updateById(id, { state }, options) {
    const input = CategorySchema.parse({
      ...state,
      ...MongoDB.updateTimestamps()
    })

    const $match = MongoDB.makeMatch({
      id
    })

    await MongoDB.Collections.category.findOneAndUpdate(
      $match,
      {
        $set: {
          ...input,
          search: CategorySearch(state)
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

    await MongoDB.Collections.category.findOneAndDelete($match, { session: options?.session as ClientSession })

    return
  }
})
