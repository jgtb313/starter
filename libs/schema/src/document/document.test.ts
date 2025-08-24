import { describe, expect, it } from 'vitest'

import {
	DocumentCNPJSchema,
	DocumentCPFSchema,
	DocumentExplicitSchema,
	DocumentSchema,
} from './document'

import { DocumentTypeEnum } from '../document-type'

describe('Document', () => {
	describe('DocumentSchema', () => {
		it('should validate a valid CPF', () => {
			const validCPF = '123.456.789-09'
			const result = DocumentSchema.safeParse(validCPF)
			expect(result.success).toBe(true)
			expect(result.data).toBe('12345678909')
		})

		it('should validate a valid CNPJ', () => {
			const validCNPJ = '12.345.678/0001-95'
			const result = DocumentSchema.safeParse(validCNPJ)
			expect(result.success).toBe(true)
			expect(result.data).toBe('12345678000195')
		})

		it('should fail validation for an invalid document', () => {
			const invalidDocument = '1234'
			const result = DocumentSchema.safeParse(invalidDocument)
			expect(result.success).toBe(false)
		})
	})

	describe('DocumentExplicitSchema', () => {
		it('should validate CPF when type is INDIVIDUAL', () => {
			const validDocument = {
				number: '123.456.789-09',
				type: DocumentTypeEnum.INDIVIDUAL,
			}
			const result = DocumentExplicitSchema.safeParse(validDocument)
			expect(result.success).toBe(true)
		})

		it('should validate CNPJ when type is COMPANY', () => {
			const validDocument = {
				number: '12.345.678/0001-95',
				type: DocumentTypeEnum.COMPANY,
			}
			const result = DocumentExplicitSchema.safeParse(validDocument)
			expect(result.success).toBe(true)
		})

		it('should fail validation for an invalid CPF when type is INDIVIDUAL', () => {
			const invalidDocument = {
				number: '12.345.678/0001-95',
				type: DocumentTypeEnum.INDIVIDUAL,
			}
			const result = DocumentExplicitSchema.safeParse(invalidDocument)
			expect(result.success).toBe(false)
		})

		it('should fail validation for an invalid CNPJ when type is COMPANY', () => {
			const invalidDocument = {
				number: '123.456.789-09',
				type: DocumentTypeEnum.COMPANY,
			}
			const result = DocumentExplicitSchema.safeParse(invalidDocument)
			expect(result.success).toBe(false)
		})
	})

	describe('DocumentCNPJSchema', () => {
		it('should validate CNPJ correctly', () => {
			const validCNPJ = {
				number: '12.345.678/0001-95',
				type: DocumentTypeEnum.COMPANY,
			}
			const result = DocumentCNPJSchema.safeParse(validCNPJ)
			expect(result.success).toBe(true)
		})

		it('should fail validation for an invalid CNPJ', () => {
			const invalidCNPJ = {
				number: '123.456.789-09',
				type: DocumentTypeEnum.COMPANY,
			}
			const result = DocumentCNPJSchema.safeParse(invalidCNPJ)
			expect(result.success).toBe(false)
		})
	})

	describe('DocumentCPFSchema', () => {
		it('should validate CPF correctly', () => {
			const validCPF = {
				number: '123.456.789-09',
				type: DocumentTypeEnum.INDIVIDUAL,
			}
			const result = DocumentCPFSchema.safeParse(validCPF)
			expect(result.success).toBe(true)
		})

		it('should fail validation for an invalid CPF', () => {
			const invalidCPF = {
				number: '12.345.678/0001-95',
				type: DocumentTypeEnum.INDIVIDUAL,
			}
			const result = DocumentCPFSchema.safeParse(invalidCPF)
			expect(result.success).toBe(false)
		})
	})
})
