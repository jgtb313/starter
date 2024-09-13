import { z } from '@/zod'

import { createEnumOptions } from '@/support'

export enum DocumentTypeEnum {
  INDIVIDUAL = 'INDIVIDUAL',
  COMPANY = 'COMPANY'
}

export enum DocumentTypeCNPJEnum {
  COMPANY = 'COMPANY'
}

export enum DocumentTypeCPFEnum {
  INDIVIDUAL = 'INDIVIDUAL'
}

export const DocumentType = createEnumOptions<DocumentTypeEnum>([
  {
    label: 'CPF',
    value: DocumentTypeEnum.INDIVIDUAL
  },
  {
    label: 'CNPJ',
    value: DocumentTypeEnum.COMPANY
  }
])

export const DocumentTypeCompany = createEnumOptions<DocumentTypeEnum>([
  {
    label: 'Pessoa Física',
    value: DocumentTypeEnum.INDIVIDUAL
  },
  {
    label: 'Pessoa Jurídica',
    value: DocumentTypeEnum.COMPANY
  }
])

export const DocumentTypeSchema = z.nativeEnum(DocumentTypeEnum).openapi({
  description: 'Represents document types for individuals or companies'
})

export const DocumentTypeCNPJSchema = z.nativeEnum(DocumentTypeCNPJEnum).openapi({
  description: 'Represents document types for individuals or companies'
})

export const DocumentTypeCPFSchema = z.nativeEnum(DocumentTypeCPFEnum).openapi({
  description: 'Represents document types for individuals or companies'
})
