import { toZonedTime } from 'date-fns-tz'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { setupLocale } from './~state/common.state'
import { getDate } from './get-date'

vi.mock('date-fns-tz', () => ({
	toZonedTime: vi.fn((date) => new Date(date)),
}))

describe('getDate', () => {
	beforeEach(() => {
		setupLocale('en')
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('converts UTC date to default America/Sao_Paulo timezone', () => {
		const utcDate = new Date('2023-05-15T10:30:00Z')

		getDate(utcDate)

		expect(toZonedTime).toHaveBeenCalledWith(utcDate, 'America/New_York')
	})

	it('handles date string input with default timezone', () => {
		const dateString = '2023-05-15T10:30:00Z'

		getDate(dateString)

		expect(toZonedTime).toHaveBeenCalledWith(dateString, 'America/New_York')
	})

	it('handles ISO date string with default timezone', () => {
		const isoString = '2023-05-15'

		getDate(isoString)

		expect(toZonedTime).toHaveBeenCalledWith(isoString, 'America/New_York')
	})

	it('returns a Date object', () => {
		const result = getDate('2023-05-15T10:30:00Z')

		expect(result).toBeInstanceOf(Date)
	})

	it('maintains the correct time after conversion', () => {
		const originalDate = new Date('2023-05-15T10:30:00Z')
		const result = getDate(originalDate)

		expect(result.getUTCHours()).toBe(10)
		expect(result.getUTCMinutes()).toBe(30)
	})

	it.each([
		'2023-05-15',
		'2023-05-15T10:30:00',
		'2023-05-15T10:30:00Z',
		'2023-05-15T10:30:00+00:00',
	])('handles date format $s with default timezone', (format) => {
		getDate(format)
		expect(toZonedTime).toHaveBeenCalledWith(format, 'America/New_York')
	})

	it('uses locale from state when none provided', () => {
		setupLocale('pt-BR')
		const stateDate = new Date('2023-05-15T10:30:00Z')

		getDate(stateDate)

		expect(toZonedTime).toHaveBeenCalledWith(stateDate, 'America/Sao_Paulo')
	})

	it('uses provided locale when passed explicitly', () => {
		const customDate = new Date('2023-05-15T10:30:00Z')

		getDate(customDate, 'es')

		expect(toZonedTime).toHaveBeenCalledWith(customDate, 'America/Mexico_City')
	})

	it('handles date string with provided locale', () => {
		const dateString = '2023-05-15T10:30:00Z'

		getDate(dateString, 'pt-BR')

		expect(toZonedTime).toHaveBeenCalledWith(dateString, 'America/Sao_Paulo')
	})
})
