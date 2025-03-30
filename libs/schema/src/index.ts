import { generateSchema } from '@anatine/zod-openapi'

export { z, ZodSchema, ZodType } from './zod'

export const zodSchemaToOpenapiSchema = generateSchema

export * from './address'
export * from './birthday'
export * from './boleto'
export * from './credit-card'
export * from './date'
export * from './document'
export * from './document-type'
export * from './email'
export * from './pagination'
export * from './password'
export * from './phone'
export * from './pix'
export * from './sort'
