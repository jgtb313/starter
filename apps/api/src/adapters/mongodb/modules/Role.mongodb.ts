import { Role } from '@/core/role/domain'
import { IRoleRepository } from '@/ports/database/modules/Role.repository'
import { MongoDB, CollectionsTypes } from '../MongoDB.support'
import { makeMatch } from '../MongoDB.match'

type Document = CollectionsTypes['role']

const Pipelines = [] as []

const parseDomain = (model: Document) => {
  return new Role({ ...model })
}

export const role: IRoleRepository = () => ({
  async index(input) {
    const $match = makeMatch({
      ...input
    })

    const data = await MongoDB.Collections.role
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
  }
})
