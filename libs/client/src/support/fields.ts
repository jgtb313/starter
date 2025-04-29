import { isBoolean } from '@starter/common'

export type Fields<T> = T extends Date
  ? boolean
  : T extends object
    ? T extends Array<infer U>
      ? Fields<U>
      : { [K in keyof T]?: boolean | Fields<T[K]> }
    : boolean

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

type User = {
  id: string
  age: number
  isActive: boolean
  email: string | null
  phone?: string
  createdAt: Date
  updatedAt: Date | null
  role: 'admin' | 'user' | 'guest'
  tags: string[]
  metadata: Record<string, any>
  preferences: {
    darkMode: boolean
    notifications: boolean
  }
  status: symbol
  bigNumber: bigint
}

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
