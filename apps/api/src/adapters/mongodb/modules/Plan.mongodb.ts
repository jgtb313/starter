import { ClientSession } from 'mongodb'
import { PlanSchema } from '@starter/schema'

import { NotFoundError } from '@/support/errors'
import { Plan } from '@/core/plan/domain'
import { IPlanRepository } from '@/ports/database/modules/Plan.repository'
import { MongoDB, CollectionsType, ICollections } from '../MongoDB.support'

type Document = ICollections['plan']
const PlanSearch = MongoDB.makeSearch<Plan['state']>(['name'])

const Pipelines = [] as []

const parseDomain = (model: Document) => {
  return new Plan({
    ...model,
  })
}

export const plan = (Collections: CollectionsType) => (): ReturnType<IPlanRepository> => ({
  async index(input, options) {
    const $match = MongoDB.makeMatch({
      ...input,
    })

    const data = await Collections.plan
      .aggregate<Document>(
        [
          { $match: { status: { $ne: 'DELETED' } } },
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

    const total = 0

    const data = await Collections.plan
      .aggregate<Document>(
        [
          { $match: { status: { $ne: 'DELETED' } } },
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

    const [model] = await Collections.plan
      .aggregate<Document>([{ $match: { status: { $ne: 'DELETED' } } }, { $match }, ...Pipelines], {
        session: options?.session as ClientSession,
      })
      .toArray()

    if (!model) {
      throw new NotFoundError(`Plan ${id} not found`)
    }

    return parseDomain(model)
  },

  async findOne(input, options) {
    const $match = MongoDB.makeMatch({
      ...input,
    })

    const [model] = await Collections.plan
      .aggregate<Document>([{ $match: { status: { $ne: 'DELETED' } } }, ...Pipelines, { $match }], {
        session: options?.session as ClientSession,
      })
      .toArray()

    if (!model) {
      return
    }

    return parseDomain(model)
  },

  async create({ state }, options) {
    const input = PlanSchema.parse({
      ...state,
      ...MongoDB.createTimestamps(),
    })

    await Collections.plan.insertOne(
      {
        ...input,
        search: PlanSearch(state),
      },
      {
        session: options?.session as ClientSession,
      },
    )

    return this.findById(state.id, options)
  },

  async updateById(id, { state }, options) {
    const input = PlanSchema.parse({
      ...state,
      ...MongoDB.updateTimestamps(),
    })

    const $match = MongoDB.makeMatch({
      id,
    })

    await Collections.plan.findOneAndUpdate(
      $match,
      {
        $set: {
          ...input,
          search: PlanSearch(state),
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

    await Collections.plan.findOneAndDelete($match, { session: options?.session as ClientSession })

    return
  },
})
