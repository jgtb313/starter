import { z } from '@starter/schema'
import type { PickNullable, PickNotNullable } from '@starter/common'

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
  return z.uuid().meta({
    description: `Unique identifier for ${resourceName}`,
    example: '96738ebc-7da1-48e2-8685-705c7b9268cb',
  })
}

export const CreatedAt = z.iso.datetime().transform((value) => new Date(value))

export const UpdatedAt = z.iso.datetime().transform((value) => new Date(value))

export const DeletedAt = z.iso
  .datetime()
  .nullish()
  .transform((value) => (value ? new Date(value) : null))
