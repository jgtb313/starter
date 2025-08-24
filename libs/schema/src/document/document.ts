import { clearSpecialChars, isCNPJ, isCPF, isCPFOrCNPJ } from '@starter/common'

import { z } from '@/zod'
import {
	DocumentTypeCNPJSchema,
	DocumentTypeCPFSchema,
	DocumentTypeEnum,
	DocumentTypeSchema,
} from '../document-type'

export const DocumentSchema = z
	.string()
	.min(1)
	.refine(isCPFOrCNPJ)
	.transform(clearSpecialChars)

export const DocumentExplicitSchema = z
	.object({
		number: DocumentSchema,
		type: DocumentTypeSchema,
	})
	.refine(
		({ number, type }) => {
			if (type === DocumentTypeEnum.INDIVIDUAL) {
				return isCPF(number)
			} else {
				return isCNPJ(number)
			}
		},
		{
			path: [
				'number',
			],
		},
	)
export type DocumentExplicit = z.infer<typeof DocumentExplicitSchema>

export const DocumentCNPJSchema = z
	.object({
		number: DocumentSchema,
		type: DocumentTypeCNPJSchema,
	})
	.refine(
		({ number }) => {
			return isCNPJ(number)
		},
		{
			path: [
				'number',
			],
		},
	)
export type DocumentCNPJ = z.infer<typeof DocumentCNPJSchema>

export const DocumentCPFSchema = z
	.object({
		number: DocumentSchema,
		type: DocumentTypeCPFSchema,
	})
	.refine(
		({ number }) => {
			return isCPF(number)
		},
		{
			path: [
				'number',
			],
		},
	)
export type DocumentCPF = z.infer<typeof DocumentCPFSchema>
