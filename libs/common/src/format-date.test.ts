import { beforeEach, describe, expect, it } from 'vitest'

import { setupLocale } from './~state/common.state'
import { formatDate } from './format-date'

describe('formatDate', () => {
	beforeEach(() => {
		setupLocale('en')
	})

	it('formats date with default format and locale en', () => {
		const date = new Date('2025-09-24T12:00:00Z')
		const result = formatDate(date)

		expect(result).toBe('09/24/2025')
	})

	it('formats date with custom format and locale es', () => {
		setupLocale('es')

		const date = new Date('2025-09-24T12:00:00Z')
		const result = formatDate(date, 'yyyy-MM-dd')

		expect(result).toBe('2025-09-24')
	})

	it('formats string date with locale pt-BR', () => {
		setupLocale('pt-BR')

		const dateString = '2025-09-24T12:00:00Z'
		const result = formatDate(dateString)
		expect(result).toBe('24/09/2025')
	})

	it('uses default format when none provided', () => {
		setupLocale('en')

		const date = new Date('2025-09-24T12:00:00Z')
		const result = formatDate(date)

		expect(result).toBe('09/24/2025')
	})
})
