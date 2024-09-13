import { SortInput, PaginationInput } from '@starter/schema'
import { Required } from '@starter/shared'

export const calculateSkip = (page = 1, limit = 10) => {
  return +((page - 1) * limit)
}

export type Primitive = string | number | boolean | Date
export type DatabaseType<T> = T | { $in?: T[]; $nin?: T[]; $eq?: T; $ne?: T; $gt?: T; $gte?: T; $lt?: T; $lte?: T }
export type DatabaseFieldType<T> = { search?: DatabaseSearchType<T> } & {
  [K in keyof Partial<T>]: Required<T[K]> extends Primitive
    ? DatabaseType<T[K]>
    : T[K] extends Array<infer G>
    ? DatabaseFieldType<Array<G>[number]>
    : DatabaseFieldType<T[K]>
}
type DatabaseSearchStrings<T> = {
  [K in keyof T]: Required<T[K]> extends string ? K : never
}[keyof T]
export type DatabaseSearchType<T> = Partial<Pick<T, DatabaseSearchStrings<T>>>
export type DatabaseFilterInput<T> = Partial<T> | (DatabaseFieldType<T> & { $or?: DatabaseFieldType<T>[]; $and?: DatabaseFieldType<T>[] })

export type BulkUpdateInput<T> = {
  filter: Partial<Record<keyof T, any>>
  update: Partial<T>
}[]

export type SortPaginationInput<T> = SortInput & PaginationInput<T>
