import { generateSchema } from '@anatine/zod-openapi'

export { z, ZodSchema } from './zod'

export const zodSchemaToInstance = generateSchema

export * from './auth'
export * from './delivery'
export * from './delivery-product'
export * from './file'
export * from './inventory'
export * from './inventory-product'
export * from './invoice'
export * from './invoice-product'
export * from './otp'
export * from './plan'
export * from './product'
export * from './role'
export * from './shared'
export * from './store'
export * from './subscription'
export * from './user'
