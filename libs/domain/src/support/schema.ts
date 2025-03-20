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
  return z
    .string()
    .uuid()
    .openapi({ description: `Unique identifier for ${resourceName}`, example: '1155acc8-1852-4603-85b6-afd71f9720d3' })
}

export const CreatedAt = z.date()

export const UpdatedAt = z.date()

export const DeletedAt = z
  .date()
  .nullish()
  .transform((value) => value ?? null)
