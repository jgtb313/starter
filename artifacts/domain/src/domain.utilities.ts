import KSUID from 'ksuid'
import { ZodSchema } from '@starter/schema'
import { PickNullable, PickNotNullable } from '@starter/shared'

export type SetupDomain<T, P extends keyof T = never> = {
  [K in keyof PickNullable<Omit<T, 'createdAt' | 'updatedAt' | P>>]?: Exclude<T[K], null> | null
} & {
  [K in keyof PickNotNullable<Omit<T, 'id' | 'createdAt' | 'updatedAt' | P>>]: T[K]
} & {
  [K in P]?: T[K]
} & {
  id?: string
}

export const setupDomain = <T>(value: T, schema: ZodSchema) => {
  return schema.parse({ id: KSUID.randomSync().string, createdAt: new Date(), updatedAt: new Date(), ...value })
}
