import { StoreSchema } from '@starter/schema'

import { NotFoundError } from '@/support/errors'
import { Store } from '@/core/store/domain'
import { IStoreRepository } from '@/ports/database/modules/Store.repository'
import { MongoDB, CollectionsTypes } from '../MongoDB.support'
import { makeMatch } from '../MongoDB.match'

type Document = CollectionsTypes['store']
const StoreSearch = MongoDB.makeSearch<Store['state']>(['name'])

const Pipelines = [] as []

const parseDomain = (model: Document) => {
  return new Store({
    ...model
  })
}

export const store: IStoreRepository = () => ({
  async index(input) {
    const $match = makeMatch({
      ...input
    })

    const data = await MongoDB.Collections.store
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
    const $match = makeMatch({
      ...input
    })

    const total = 0

    const data = await MongoDB.Collections.store
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

    const [model] = await MongoDB.Collections.store.aggregate<Document>([{ $match }, ...Pipelines]).toArray()

    if (!model) {
      throw new NotFoundError('Loja não encontrada')
    }

    return parseDomain(model)
  },

  async findByRcky(rcky) {
    const $match = makeMatch({
      rcky
    })

    const [model] = await MongoDB.Collections.store
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

  async findByDocument(document) {
    const $match = makeMatch({
      document
    })

    const [model] = await MongoDB.Collections.store
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

  async rckyExists(rcky, { exclude } = {}) {
    const conditionalExclude = exclude && {
      id: { $ne: exclude }
    }

    const $match = makeMatch({
      ...conditionalExclude,
      rcky
    })

    const model = await MongoDB.Collections.store.findOne($match)

    return !!model
  },

  async documentExists(document, { exclude } = {}) {
    const conditionalExclude = exclude && {
      id: { $ne: exclude }
    }

    const $match = makeMatch({
      ...conditionalExclude,
      document
    })

    const model = await MongoDB.Collections.store.findOne($match)

    return !!model
  },

  async create({ state }) {
    const input = StoreSchema.parse({
      ...state,
      ...MongoDB.createTimestamps()
    })

    await MongoDB.Collections.store.insertOne({
      ...input,
      search: StoreSearch(state)
    })

    return this.findById(state.id)
  },

  async updateById(id, { state }) {
    const input = StoreSchema.parse({
      ...state,
      ...MongoDB.updateTimestamps()
    })

    const $match = makeMatch({
      id
    })

    await MongoDB.Collections.store.findOneAndUpdate($match, {
      $set: {
        ...input,
        search: StoreSearch(state)
      }
    })

    return this.findById(id)
  }
})
