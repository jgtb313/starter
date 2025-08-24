import { z } from '@/zod'

export enum DocumentTypeEnum {
	INDIVIDUAL = 'INDIVIDUAL',
	COMPANY = 'COMPANY',
}

export enum DocumentTypeCNPJEnum {
	COMPANY = 'COMPANY',
}

export enum DocumentTypeCPFEnum {
	INDIVIDUAL = 'INDIVIDUAL',
}

export const DocumentTypeSchema = z.nativeEnum(DocumentTypeEnum).meta({
	description: 'Represents document types for individuals or companies',
})

export const DocumentTypeCNPJSchema = z.nativeEnum(DocumentTypeCNPJEnum).meta({
	description: 'Represents document types for individuals or companies',
})

export const DocumentTypeCPFSchema = z.nativeEnum(DocumentTypeCPFEnum).meta({
	description: 'Represents document types for individuals or companies',
})
