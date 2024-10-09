import { ClientSession } from 'mongodb'
import { WorkspaceSchema } from '@starter/schema'

import { NotFoundError } from '@/support/errors'
import { Workspace } from '@/core/workspace/domain'
import { IWorkspaceRepository } from '@/ports/database/modules/Workspace.repository'
import { MongoDB, CollectionsType, ICollections } from '../MongoDB.support'

type Document = ICollections['workspace']
const WorkspaceSearch = MongoDB.makeSearch<Workspace['state']>(['name'])

const Pipelines = [] as []

const parseDomain = (model: Document) => {
  return new Workspace({
    ...model,
  })
}

export const workspace = (Collections: CollectionsType) => (): ReturnType<IWorkspaceRepository> => ({
  async index(input, options) {
    const $match = MongoDB.makeMatch({
      ...input,
    })

    const data = await Collections.workspace
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

    const total = await Collections.workspace
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

    const data = await Collections.workspace
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

    const [model] = await Collections.workspace
      .aggregate<Document>([{ $match }, ...Pipelines], {
        session: options?.session as ClientSession,
      })
      .toArray()

    if (!model) {
      throw new NotFoundError(`Workspace ${id} not found`)
    }

    return parseDomain(model)
  },

  async create({ state }, options) {
    const input = WorkspaceSchema.parse({
      ...state,
      ...MongoDB.createTimestamps(),
    })

    await Collections.workspace.insertOne(
      {
        ...input,
        search: WorkspaceSearch(state),
      },
      {
        session: options?.session as ClientSession,
      },
    )

    return this.findById(state.id, options)
  },

  async updateById(id, { state }, options) {
    const input = WorkspaceSchema.parse({
      ...state,
      ...MongoDB.updateTimestamps(),
    })

    const $match = MongoDB.makeMatch({
      id,
    })

    await Collections.workspace.findOneAndUpdate(
      $match,
      {
        $set: {
          ...input,
          search: WorkspaceSearch(state),
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

    await Collections.workspace.findOneAndUpdate($match, { session: options?.session as ClientSession })

    return
  },
})
