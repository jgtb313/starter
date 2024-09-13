export type Types = string | number | boolean | Date

export type Fields<T> = {
  [K in keyof Partial<T>]: T[K] extends Types ? boolean : T[K] extends Array<infer G> ? Fields<Array<G>[number]> : Fields<T[K] | boolean>
}

export type WithFields<Input, Output> = {
  fields?: Fields<Output>
} & Input

export type WithFieldsInput<T> = {
  fields?: string
} & T

type IFields = boolean | undefined | { [k: string]: IFields }
type IFieldsOptions = { parent?: string }

export const formatFields = (fields: IFields, options?: IFieldsOptions): string => {
  if (!fields) {
    return ''
  }

  return Object.entries(fields)
    .filter(([_, value]) => value)
    .map(([key, value]) => {
      const isBoolean = typeof value === 'boolean'

      const path = options?.parent ? `${parent}.${key}` : key

      if (isBoolean) {
        return path
      }

      return formatFields(value, { parent: path })
    })
    .join(',')
}

export const withFields =
  <Input, Output, Fields = Output>(callback: (input: WithFieldsInput<Input>) => Promise<Output>) =>
  async ({ fields, ...input }: WithFields<Input, Awaited<Fields>>): Promise<Awaited<Output>> => {
    return callback({ ...input, fields: formatFields(fields) } as WithFieldsInput<Input>) as Awaited<Output>
  }
