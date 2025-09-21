export type { ZodSchema, ZodType } from 'zod'

export * from './address'
export * from './birthday'
export * from './boleto'
export * from './date'
export * from './document'
export * from './document-type'
export * from './email'
export * from './locale'
export { getLocaleHandler } from './locales.schema'
export * from './pagination'
export * from './password'
export * from './payment-card'
export * from './phone'
export * from './pix'
export * from './sort'
export * from './translations'
export {
	setupLocale as setupSchemaLocale,
	z,
} from './zod'
