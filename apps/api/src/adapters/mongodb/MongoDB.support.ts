import { clearSpecialChars, get, set } from '@starter/shared'

import { makeMatch } from './MongoDB.match'
import { ICollections, CollectionsType } from './MongoDB.collections'

const makeSearch =
  <T>(fields: string[]) =>
  (document?: Partial<T>) => {
    const search: Record<string, string> = {}

    fields.forEach((field) => {
      const value = get(document, field)

      set(search, field, clearSpecialChars(value.toLocaleLowerCase()))
    })

    return search
  }

const createTimestamps = () => ({
  createdAt: new Date(),
  updatedAt: new Date(),
})

const updateTimestamps = () => ({ updatedAt: new Date() })

export const MongoDB = {
  makeMatch,
  makeSearch,

  createTimestamps,
  updateTimestamps,
}

export { ICollections, CollectionsType }
