import { isBoolean } from '@starter/common'

export type Types = string | number | boolean | Date

export type Fields<T> = {
  [K in keyof T]?: undefined extends T[K]
    ? boolean | undefined
    : T[K] extends Types
      ? boolean
      : T[K] extends Array<infer G>
        ? Fields<G>[]
        : Fields<T[K]>
}

export type WithFields<Input, Output> = Output extends void
  ? Input & { fields?: never }
  : Output extends { values: any[] }
    ? Input & { fields?: Fields<Output['values'][number]> }
    : Input & { fields?: Fields<Output> }

export type WithFieldsInput<T> = {
  fields?: string
} & T

type IFields = boolean | undefined | { [k: string]: IFields }
type IFieldsOptions = { parent?: string }

export const formatFields = (fields?: IFields, options?: IFieldsOptions): string => {
  if (!fields) {
    return ''
  }

  return Object.entries(fields)
    .filter(([_, value]) => value)
    .map(([key, value]) => {
      const path = options?.parent ? `${options.parent}.${key}` : key

      if (isBoolean(value)) {
        return path
      }

      return formatFields(value, { parent: path })
    })
    .join(',')
}
