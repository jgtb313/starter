import { beforeEach, describe, expect, it } from 'vitest'

import { setupLocale } from './~state/common.state'
import { formatDateRange } from './format-date-range'

describe('formatDateRange', () => {
	// Datas no meio do dia em UTC para evitar mudança de data ao ajustar para o fuso
	const date1 = new Date(Date.UTC(2023, 0, 1, 12)) // 2023-01-01T12:00:00Z
	const date2 = new Date(Date.UTC(2023, 11, 31, 12)) // 2023-12-31T12:00:00Z

	beforeEach(() => {
		setupLocale('pt-BR')
	})

	it('formats date range with default options (pt-BR)', () => {
		const result = formatDateRange(date1, date2)
		expect(result).toBe('01/01/2023 • 31/12/2023')
	})

	it('formats date range with default options (en)', () => {
		setupLocale('en')
		const result = formatDateRange(date1, date2)
		// note: en uses MM/dd/yyyy in your dateFnsFormat
		expect(result).toBe('01/01/2023 • 12/31/2023')
	})

	it('formats date range with default options (es)', () => {
		setupLocale('es')
		const result = formatDateRange(date1, date2)
		expect(result).toBe('01/01/2023 • 31/12/2023')
	})

	it('formats date range with custom format string', () => {
		const result = formatDateRange(date1, date2, 'yyyy-MM-dd')
		expect(result).toBe('2023-01-01 • 2023-12-31')
	})

	it('formats date range with custom options object', () => {
		const result = formatDateRange(date1, date2, {
			format: 'dd.MM.yyyy',
			separator: 'to',
		})
		// formatDateRange adiciona espaços ao redor do separator: `${...} ${separator} ${...}`
		expect(result).toBe('01.01.2023 to 31.12.2023')
	})

	it('handles string dates', () => {
		// month names depend on locale; em pt-BR "MMMM d, yyyy" costuma gerar "janeiro 1, 2023"
		const result = formatDateRange('2023-01-01', '2023-12-31', 'MMMM d, yyyy')
		expect(result).toBe('janeiro 1, 2023 • dezembro 31, 2023')
	})

	it('uses default separator when only format is provided in options object', () => {
		const result = formatDateRange(date1, date2, {
			format: 'yyyy/MM/dd',
		})
		expect(result).toBe('2023/01/01 • 2023/12/31')
	})

	it('uses default format when only separator is provided in options object', () => {
		const result = formatDateRange(date1, date2, {
			separator: '-',
		})
		expect(result).toBe('01/01/2023 - 31/12/2023')
	})

	it('handles dates in different years (en, abbreviated months)', () => {
		setupLocale('en')
		const start = new Date(Date.UTC(2023, 0, 1, 12))
		const end = new Date(Date.UTC(2024, 5, 15, 12)) // 2024-06-15T12:00:00Z
		const result = formatDateRange(start, end, 'MMM d, yyyy')
		// em enUS 'MMM' produz 'Jan', 'Jun' (capitalized)
		expect(result).toBe('Jan 1, 2023 • Jun 15, 2024')
	})

	it('formats date range with same start and end date', () => {
		const result = formatDateRange(date1, date1, 'dd/MM/yyyy')
		expect(result).toBe('01/01/2023 • 01/01/2023')
	})
})
