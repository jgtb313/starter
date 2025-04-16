import { z } from '@starter/schema'
import { type PickNullable, type PickNotNullable } from '@starter/common'

export type BaseSchema<K extends keyof T, T, P extends keyof T = never> = {
  [Key in keyof PickNullable<Omit<T, 'createdAt' | 'updatedAt' | P | K>>]?: Exclude<T[Key], null> | null
} & {
  [Key in keyof PickNotNullable<Omit<T, 'createdAt' | 'updatedAt' | P | K>>]: T[Key]
} & {
  [Key in P]?: T[Key]
} & {
  [Key in K]?: string
}

export const ID = (resourceName: string) => {
  return z.string().uuid().describe(`Unique identifier for ${resourceName}`)
}

export const CreatedAt = z.coerce.date()

export const UpdatedAt = z.coerce.date()

export const DeletedAt = z.coerce
  .date()
  .nullish()
  .transform((value) => value ?? null)
