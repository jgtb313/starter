import { z } from '@/zod'

export const DocumentTypeSchema = z.enum([
	'INDIVIDUAL',
	'COMPANY',
])
export type DocumentType = z.infer<typeof DocumentTypeSchema>

export const DocumentTypeCNPJSchema = z.enum([
	'COMPANY',
])
export type DocumentTypeCNPJ = z.infer<typeof DocumentTypeCNPJSchema>

export const DocumentTypeCPFSchema = z.enum([
	'INDIVIDUAL',
])
export type DocumentTypeCPF = z.infer<typeof DocumentTypeCPFSchema>
