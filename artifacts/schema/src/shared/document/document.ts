import { z } from '@/zod'
import { clearSpecialChars, isCNPJ, isCPF, isCPFOrCNPJ } from '@starter/shared'

import { DocumentTypeSchema, DocumentTypeCNPJSchema, DocumentTypeCPFSchema, DocumentTypeEnum } from '../documentType'

export const DocumentSchema = z.string().min(1).refine(isCPFOrCNPJ, { message: 'Documento inválido' }).transform(clearSpecialChars)
export type DocumentInput = z.infer<typeof DocumentSchema>

export const DocumentExclusiveSchema = z
  .object({
    number: DocumentSchema,
    type: DocumentTypeSchema
  })
  .refine(
    ({ number, type }) => {
      if (type === DocumentTypeEnum.INDIVIDUAL) {
        return isCPF(number)
      } else {
        return isCNPJ(number)
      }
    },
    { path: ['number'], message: 'Documento inválido' }
  )
export type DocumentExclusiveInput = z.infer<typeof DocumentExclusiveSchema>

export const DocumentCNPJSchema = z
  .object({
    number: DocumentSchema,
    type: DocumentTypeCNPJSchema
  })
  .refine(
    ({ number }) => {
      return isCNPJ(number)
    },
    { path: ['number'], message: 'CNPJ inválido' }
  )
export type DocumentCNPJInput = z.infer<typeof DocumentCNPJSchema>

export const DocumentCPFSchema = z
  .object({
    number: DocumentSchema,
    type: DocumentTypeCPFSchema
  })
  .refine(
    ({ number }) => {
      return isCPF(number)
    },
    { path: ['number'], message: 'CPF inválido' }
  )
export type DocumentCPFInput = z.infer<typeof DocumentCPFSchema>
